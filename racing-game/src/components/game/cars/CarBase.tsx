import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../../store/gameStore'
import { useGarageStore } from '../../../store/garageStore'
import { controls } from '../../../hooks/useKeyboard'
import { useReplay } from '../../../hooks/useReplay'
import { useAudio } from '../../../hooks/useAudio'
import {
  computeSpeedDelta, computeSteering, checkDrift,
  getSurfaceFriction, getEngineRPM, clamp, lerp, PHYSICS
} from '../../../utils/physics'
import { getTrack } from '../../../data/tracks'
import type { CarDefinition } from '../../../types'

export interface CarBaseProps {
  /** Render the visual car body (called as a child) */
  renderBody: (opts: {
    color: string
    isDrifting: boolean
    isNitro: boolean
    speed: number
    damage: number
    steerAngle: number
  }) => React.ReactNode
  carDef: CarDefinition
  startPosition: [number, number, number]
  startRotation: [number, number, number]
}

/** Animated wheel with tire + rim */
export function Wheel({ pos, steer = 0, driven: _driven = false, spin = 0 }:
  { pos: [number, number, number]; steer?: number; driven?: boolean; spin?: number }
) {
  return (
    <group position={pos} rotation={[0, steer, 0]}>
      <group rotation={[spin, 0, 0]}>
        {/* Tire */}
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.24, 24]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        {/* Rim */}
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.25, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Center cap */}
        <mesh position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 8]} />
          <meshStandardMaterial color="#222222" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

export default function CarBase({ renderBody, carDef, startPosition, startRotation }: CarBaseProps) {
  const groupRef    = useRef<THREE.Group>(null)
  const steerRef    = useRef(0)
  const speedRef    = useRef(0)
  const nitroRef    = useRef(carDef.stats.nitroCapacity)
  const damageRef   = useRef(0)
  const driftTimer  = useRef(0)
  const driftCombo  = useRef(0)
  const wasNitro    = useRef(false)

  const { updateCar, addScore, selectedTrackId } = useGameStore.getState()
  const track = getTrack(selectedTrackId)
  const surface = getSurfaceFriction(track.surface)
  const garageEntry = useGarageStore.getState().getEntry(carDef.id)
  const { recordFrame } = useReplay(selectedTrackId, carDef.id)
  const { updateEngineSound } = useAudio()

  // Set initial position
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...startPosition)
      groupRef.current.rotation.set(...startRotation)
    }
  }, [startPosition, startRotation])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const phase = useGameStore.getState().phase
    if (phase !== 'racing' && phase !== 'countdown') return

    const { forward, backward, left, right, nitro, drift, brake } = controls
    const car   = useGameStore.getState().car
    const stats = carDef.stats
    const isTurning = left || right

    // ── Speed update ─────────────────────────────────────────────────────────
    const nitroActive = nitro && nitroRef.current > 2
    const speedDelta = computeSpeedDelta({
      speed: speedRef.current,
      forward, backward, brake,
      nitroActive, nitroFuel: nitroRef.current,
      carTopSpeed:  stats.topSpeed,
      carAccel:     stats.acceleration,
      carBraking:   stats.braking,
      surfaceFriction: surface,
      damageRatio:  damageRef.current / 100,
      delta,
    })
    speedRef.current = clamp(speedRef.current + speedDelta, -PHYSICS.REVERSE_SPEED, stats.topSpeed)

    // ── Nitro management ─────────────────────────────────────────────────────
    if (nitroActive && forward) {
      nitroRef.current = clamp(nitroRef.current - stats.nitroBoost * PHYSICS.NITRO_DRAIN * delta, 0, stats.nitroCapacity)
      if (!wasNitro.current) { addScore('nitro_boost', 50, '⚡ NITRO +50'); wasNitro.current = true }
    } else {
      nitroRef.current = clamp(nitroRef.current + PHYSICS.NITRO_RECHARGE * delta, 0, stats.nitroCapacity)
      wasNitro.current = false
    }

    // ── Drift detection ───────────────────────────────────────────────────────
    const isDrifting = checkDrift(speedRef.current, drift, isTurning, stats.driftFactor)

    // Drift scoring
    if (isDrifting) {
      driftTimer.current += delta
      if (driftTimer.current >= 1) {
        driftCombo.current = Math.min(driftCombo.current + 1, 5)
        const pts = 10 * driftCombo.current
        addScore('drift_combo', pts, `🔥 DRIFT x${driftCombo.current} +${pts}`)
        driftTimer.current = 0
      }
    } else {
      driftTimer.current = 0
      driftCombo.current = 0
    }

    // ── Steering ──────────────────────────────────────────────────────────────
    const steerDelta = computeSteering({
      speed: speedRef.current, left, right, isDrifting,
      driftFactor: stats.driftFactor,
      turningRadius: stats.turningRadius,
      delta,
    })
    groupRef.current.rotation.y += steerDelta

    // Animated front wheel steer angle
    const targetSteer = left ? 0.42 : right ? -0.42 : 0
    steerRef.current  = lerp(steerRef.current, targetSteer, delta * 8)

    // ── Position ──────────────────────────────────────────────────────────────
    const ry  = groupRef.current.rotation.y
    const dir = new THREE.Vector3(Math.sin(ry), 0, Math.cos(ry))

    // Drift lateral slide
    if (isDrifting) {
      const lateral = new THREE.Vector3(Math.cos(ry), 0, -Math.sin(ry))
      const slide = (speedRef.current / stats.topSpeed) * 0.25
      dir.add(lateral.multiplyScalar(right ? -slide : slide)).normalize()
    }

    const moveAmount = (speedRef.current / 3.6) * delta
    groupRef.current.position.addScaledVector(dir, moveAmount)
    groupRef.current.position.y = startPosition[1]  // lock to ground

    // Roll/tilt on steering
    const tiltTarget = (right ? -0.05 : left ? 0.05 : 0) * clamp(speedRef.current / 100, 0, 1)
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, tiltTarget, delta * 6)

    // ── Engine sound ──────────────────────────────────────────────────────────
    const rpm = getEngineRPM(speedRef.current, stats.topSpeed)
    updateEngineSound(rpm, useGameStore.getState().quality !== 'low' ? 0.7 : 0.4)

    // ── Sync to store ─────────────────────────────────────────────────────────
    const pos = groupRef.current.position
    const rot = groupRef.current.rotation
    updateCar({
      position:     [pos.x, pos.y, pos.z],
      rotation:     [rot.x, rot.y, rot.z],
      speed:        speedRef.current,
      nitro:        nitroRef.current,
      damage:       damageRef.current,
      isDrifting,
      isNitroActive:nitroActive && forward,
      engineRPM:    rpm,
      wheelSpin:    car.wheelSpin + (speedRef.current / 20) * delta * 5,
    })

    // ── Replay recording ──────────────────────────────────────────────────────
    recordFrame(pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, speedRef.current)
  })

  const car = useGameStore((s) => s.car)

  return (
    <group ref={groupRef}>
      {/* Visual car body (provided by each car subcomponent) */}
      {renderBody({
        color:      garageEntry.color,
        isDrifting: car.isDrifting,
        isNitro:    car.isNitroActive,
        speed:      car.speed,
        damage:     car.damage,
        steerAngle: steerRef.current,
      })}

      {/* ── Exhaust trail ──────────────────────────────────────────────── */}
      {Math.abs(car.speed) > 50 && (
        <>
          <Trail
            width={car.isNitroActive ? 0.5 : 0.2}
            length={8}
            color={car.isNitroActive ? carDef.exhaustColor : '#666666'}
            attenuation={(t) => t * t}
          >
            <mesh position={[-0.4, 0.15, -1.8]} />
          </Trail>
          <Trail
            width={car.isNitroActive ? 0.5 : 0.2}
            length={8}
            color={car.isNitroActive ? carDef.exhaustColor : '#666666'}
            attenuation={(t) => t * t}
          >
            <mesh position={[0.4, 0.15, -1.8]} />
          </Trail>
        </>
      )}

      {/* ── Drift sparks ───────────────────────────────────────────────── */}
      {car.isDrifting && (
        <group position={[0, -0.2, -1.2]}>
          <Sparkles count={15} scale={1.5} size={3} speed={2} color="#ffaa00" />
        </group>
      )}

      {/* ── Nitro glow ─────────────────────────────────────────────────── */}
      {car.isNitroActive && (
        <>
          <pointLight position={[0, 0.3, -1.8]} intensity={3} color={carDef.exhaustColor} distance={4} />
          <Sparkles count={30} scale={2} size={4} speed={3} color={carDef.exhaustColor} />
        </>
      )}

      {/* ── Neon Blaze underglow ────────────────────────────────────────── */}
      {carDef.id === 'neon_blaze' && (
        <pointLight position={[0, -0.3, 0]} intensity={4} color="#39ff14" distance={5} />
      )}

      {/* ── Headlights ──────────────────────────────────────────────── Headlights */}
      <spotLight position={[-0.45, 0.5, 1.8]} angle={0.4} intensity={car.speed > 5 ? 6 : 0} distance={20} decay={2} />
      <spotLight position={[0.45, 0.5, 1.8]} angle={0.4} intensity={car.speed > 5 ? 6 : 0} distance={20} decay={2} />
    </group>
  )
}
