import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { TRACKS } from '../../utils/tracks'
import {
  computeSpeedDelta,
  computeSteeringDelta,
  shouldDrift,
  clamp,
  lerp,
  PHYSICS,
} from '../../utils/physics'

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Single wheel with rotation animation */
function Wheel({
  position,
  isSteering = false,
  steerAngle = 0,
}: {
  position: [number, number, number]
  isSteering?: boolean
  steerAngle?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = useGameStore.getState().car.speed
      meshRef.current.rotation.x -= (speed / 20) * delta * 5
    }
  })

  return (
    <group position={position} rotation={[0, isSteering ? steerAngle : 0, 0]}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.32, 0.32, 0.22, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.24, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  )
}

/** Car body + details */
function CarBody({
  isDrifting,
  speed,
  isNightMode,
}: {
  isDrifting: boolean
  speed: number
  isNightMode: boolean
}) {
  const bodyColor = '#c0392b'    // Racing red
  const accentColor = '#ff6600'  // Orange accent

  return (
    <group>
      {/* Main body */}
      <mesh castShadow position={[0, 0.28, 0]}>
        <boxGeometry args={[1.8, 0.45, 4.2]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.95}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1.0}
        />
      </mesh>

      {/* Cabin / roof */}
      <mesh castShadow position={[0, 0.65, -0.2]}>
        <boxGeometry args={[1.55, 0.38, 2.1]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.4}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
        />
      </mesh>

      {/* Windshield (glass) */}
      <mesh position={[0, 0.62, 0.85]}>
        <boxGeometry args={[1.5, 0.35, 0.05]} />
        <meshPhysicalMaterial
          color="#88ccff"
          metalness={0.0}
          roughness={0.0}
          transmission={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Rear windshield */}
      <mesh position={[0, 0.62, -1.25]}>
        <boxGeometry args={[1.5, 0.32, 0.05]} />
        <meshPhysicalMaterial
          color="#88ccff"
          metalness={0.0}
          roughness={0.0}
          transmission={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Front bumper */}
      <mesh castShadow position={[0, 0.15, 2.15]}>
        <boxGeometry args={[1.85, 0.28, 0.18]} />
        <meshStandardMaterial color={accentColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Rear spoiler */}
      <mesh castShadow position={[0, 0.72, -2.1]}>
        <boxGeometry args={[1.6, 0.08, 0.5]} />
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Spoiler stands */}
      <mesh castShadow position={[-0.65, 0.52, -2.1]}>
        <boxGeometry args={[0.06, 0.35, 0.12]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0.65, 0.52, -2.1]}>
        <boxGeometry args={[0.06, 0.35, 0.12]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.55, 0.32, 2.12]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.55, 0.32, 2.12]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Tail lights */}
      <mesh position={[-0.55, 0.32, -2.12]}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.55, 0.32, -2.12]}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>

      {/* Headlight point lights / spotlights with shadows for Night Mode */}
      {isNightMode ? (
        <pointLight
          position={[0, 0.35, 3.2]}
          intensity={speed > 2 ? 8 : 4}
          color="#fffaed"
          distance={40}
          decay={1.4}
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.002}
        />
      ) : (
        <>
          <pointLight position={[-0.55, 0.35, 2.5]} intensity={speed > 5 ? 4 : 0} color="#ffffff" distance={18} decay={2} />
          <pointLight position={[0.55, 0.35, 2.5]} intensity={speed > 5 ? 4 : 0} color="#ffffff" distance={18} decay={2} />
        </>
      )}

      {/* Tail brake light */}
      <pointLight position={[0, 0.3, -2.5]} intensity={isDrifting ? 3 : 1} color="#ff2200" distance={8} decay={2} />
    </group>
  )
}

// Checkpoint layout coordinates (aligned with the 3D Track CatmullRom checkpoints)
// ─── Main Car Component ────────────────────────────────────────────────────────
export default function Car() {
  const groupRef = useRef<THREE.Group>(null)
  const steerAngleRef = useRef(0)
  const driftScoreTimer = useRef(0)
  const lastCollisionTime = useRef(0)
  
  const [isColliding, setIsColliding] = useState(false)

  const { updateCar, addScore, game } = useGameStore()
  const isNightMode = game.isNightMode
  const selectedTrackId = game.selectedTrackId

  const activeTrack = useMemo(() => {
    return TRACKS[selectedTrackId] || TRACKS[0]
  }, [selectedTrackId])

  // Spawn reset effect when track selection or game phases change
  useEffect(() => {
    if (groupRef.current) {
      const startPt = activeTrack.points[0]
      groupRef.current.position.set(startPt[0], 0.4, startPt[2])
      groupRef.current.rotation.set(0, 0, 0)
      
      // Sync store states back to zero
      useGameStore.getState().updateCar({
        speed: 0,
        lapTime: 0,
        currentLap: 1,
        checkpointsPassed: [],
      })
    }
  }, [selectedTrackId, game.phase])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (game.phase !== 'racing' && game.phase !== 'countdown') return

    const { controls, car, passCheckpoint } = useGameStore.getState()
    const { forward, backward, left, right, nitro, drift, brake } = controls

    // ── Speed update ─────────────────────────────────────────────────────────
    const isTurning = left || right
    const isDrifting = shouldDrift(car.speed, drift, isTurning)
    const nitroAvailable = car.nitro > 5

    const speedDelta = computeSpeedDelta(
      car.speed, forward, backward, brake, nitro, nitroAvailable, delta
    )
    let newSpeed = clamp(
      car.speed + speedDelta,
      -PHYSICS.MAX_REVERSE_SPEED,
      PHYSICS.MAX_SPEED
    )

    // ── Nitro ────────────────────────────────────────────────────────────────
    let newNitro = car.nitro
    if (nitro && nitroAvailable && forward) {
      newNitro = clamp(car.nitro - PHYSICS.NITRO_DRAIN * delta, 0, 100)
    } else {
      newNitro = clamp(car.nitro + PHYSICS.NITRO_RECHARGE * delta, 0, 100)
    }

    // ── Steering ─────────────────────────────────────────────────────────────
    const steerDelta = computeSteeringDelta(newSpeed, left, right, isDrifting, delta)
    groupRef.current.rotation.y += steerDelta

    // Animate front wheel steering
    const targetSteer = (left ? 0.45 : right ? -0.45 : 0)
    steerAngleRef.current = lerp(steerAngleRef.current, targetSteer, delta * 8)

    // ── Position update ──────────────────────────────────────────────────────
    const direction = new THREE.Vector3(
      Math.sin(groupRef.current.rotation.y),
      0,
      Math.cos(groupRef.current.rotation.y)
    )

    // Drift slide: add lateral offset
    if (isDrifting) {
      const lateral = new THREE.Vector3(
        Math.sin(groupRef.current.rotation.y + Math.PI / 2),
        0,
        Math.cos(groupRef.current.rotation.y + Math.PI / 2)
      )
      const slideStrength = (newSpeed / PHYSICS.MAX_SPEED) * 0.3
      direction.add(lateral.multiplyScalar(right ? slideStrength : -slideStrength)).normalize()
    }

    const moveAmount = (newSpeed / 3.6) * delta  // convert km/h → m/s
    groupRef.current.position.addScaledVector(direction, moveAmount)

    // Keep car above ground
    groupRef.current.position.y = 0.4

    // ── Car tilt on steering ─────────────────────────────────────────────────
    const tiltTarget = (right ? -0.06 : left ? 0.06 : 0) * (newSpeed / 100)
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, tiltTarget, delta * 5)

    // ── Score for drifting ───────────────────────────────────────────────────
    if (isDrifting) {
      driftScoreTimer.current += delta
      if (driftScoreTimer.current >= 1) {
        addScore({
          type: 'drift',
          points: PHYSICS.DRIFT_SCORE_PER_SECOND * activeTrack.scoreMultiplier,
          timestamp: Date.now(),
          message: `🔥 DRIFTING +${Math.round(PHYSICS.DRIFT_SCORE_PER_SECOND * activeTrack.scoreMultiplier)}`,
        })
        driftScoreTimer.current = 0
      }
    } else {
      driftScoreTimer.current = 0
    }

    // ── Wall Collision Boundary Check ────────────────────────────────────────
    const currentPos = groupRef.current.position
    let closestPoint = new THREE.Vector3()
    let minDistance = Infinity
    activeTrack.points.forEach(([px, , pz]) => {
      const dx = currentPos.x - px
      const dz = currentPos.z - pz
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < minDistance) {
        minDistance = dist
        closestPoint.set(px, 0.4, pz)
      }
    })

    if (minDistance > 6.4) {
      const now = Date.now()
      if (now - lastCollisionTime.current > 1200) {
        lastCollisionTime.current = now
        setIsColliding(true)
        setTimeout(() => setIsColliding(false), 300)

        addScore({
          type: 'drift',
          points: -50,
          timestamp: Date.now(),
          message: '💥 WALL COLLISION -50',
        })
      }

      // Snap back slightly towards track center and penalize speed
      const pushDir = new THREE.Vector3().subVectors(closestPoint, currentPos).normalize()
      groupRef.current.position.addScaledVector(pushDir, 0.4)
      newSpeed = newSpeed * 0.65
    }

    // ── Checkpoints Collision Detection ──────────────────────────────────────
    const { checkpointsPassed } = car

    activeTrack.checkpoints.forEach((cp) => {
      const dx = currentPos.x - cp.x
      const dz = currentPos.z - cp.z
      const distance = Math.sqrt(dx * dx + dz * dz)

      if (distance < 12) {
        if (cp.id === 1 && !checkpointsPassed.includes(1)) {
          passCheckpoint(1)
          addScore({
            type: 'overtake',
            points: Math.round(100 * activeTrack.scoreMultiplier),
            timestamp: Date.now(),
            message: `🧡 CHECKPOINT 1 +${Math.round(100 * activeTrack.scoreMultiplier)}`,
          })
        } else if (cp.id === 2 && checkpointsPassed.includes(1) && !checkpointsPassed.includes(2)) {
          passCheckpoint(2)
          addScore({
            type: 'overtake',
            points: Math.round(100 * activeTrack.scoreMultiplier),
            timestamp: Date.now(),
            message: `💚 CHECKPOINT 2 +${Math.round(100 * activeTrack.scoreMultiplier)}`,
          })
        } else if (cp.id === 3 && checkpointsPassed.includes(2) && !checkpointsPassed.includes(3)) {
          passCheckpoint(3)
          addScore({
            type: 'overtake',
            points: Math.round(100 * activeTrack.scoreMultiplier),
            timestamp: Date.now(),
            message: `💜 CHECKPOINT 3 +${Math.round(100 * activeTrack.scoreMultiplier)}`,
          })
        } else if (cp.id === 0 && checkpointsPassed.includes(1) && checkpointsPassed.includes(2) && checkpointsPassed.includes(3)) {
          const { completeLap } = useGameStore.getState()
          completeLap()
        }
      }
    })

    // ── Sync state to store ──────────────────────────────────────────────────
    updateCar({
      position: {
        x: groupRef.current.position.x,
        y: groupRef.current.position.y,
        z: groupRef.current.position.z,
      },
      rotation: {
        x: groupRef.current.rotation.x,
        y: groupRef.current.rotation.y,
        z: groupRef.current.rotation.z,
      },
      speed: newSpeed,
      nitro: newNitro,
      isDrifting,
      isNitroActive: nitro && nitroAvailable && forward,
    })
  })

  const { car } = useGameStore()

  return (
    <group ref={groupRef}>
      <CarBody isDrifting={car.isDrifting} speed={car.speed} isNightMode={isNightMode} />

      {/* ── Wheels ──────────────────────────────────────────────────────── */}
      {/* Front left */}
      <Wheel position={[-0.92, 0, 1.3]} isSteering steerAngle={steerAngleRef.current} />
      {/* Front right */}
      <Wheel position={[0.92, 0, 1.3]} isSteering steerAngle={steerAngleRef.current} />
      {/* Rear left */}
      <Wheel position={[-0.92, 0, -1.3]} />
      {/* Rear right */}
      <Wheel position={[0.92, 0, -1.3]} />

      {/* ── Exhaust Trail ───────────────────────────────────────────────── */}
      {car.speed > 60 && (
        <>
          <Trail
            width={0.3}
            length={6}
            color={car.isNitroActive ? '#ff6600' : '#888888'}
            attenuation={(t) => t * t}
          >
            <mesh position={[-0.3, 0.12, -2.15]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={car.isNitroActive ? '#ff6600' : '#666'} />
            </mesh>
          </Trail>
          <Trail
            width={0.3}
            length={6}
            color={car.isNitroActive ? '#ff6600' : '#888888'}
            attenuation={(t) => t * t}
          >
            <mesh position={[0.3, 0.12, -2.15]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={car.isNitroActive ? '#ff6600' : '#666'} />
            </mesh>
          </Trail>
        </>
      )}

      {/* ── Drift Sparks ────────────────────────────────────────────────── */}
      {car.isDrifting && (
        <Sparkles
          count={30}
          size={3}
          speed={2}
          opacity={0.9}
          color="#ffaa00"
          scale={[1.5, 0.3, 1.5]}
          position={[0, 0, -1.5]}
        />
      )}

      {/* ── Bumper Collision Sparks ─────────────────────────────────────── */}
      {isColliding && (
        <Sparkles
          count={45}
          size={4.5}
          speed={3.5}
          opacity={0.95}
          color="#ff3300"
          scale={[1.2, 0.6, 1.2]}
          position={[0, 0.2, 2.1]}
        />
      )}

      {/* ── Nitro Glow ──────────────────────────────────────────────────── */}
      {car.isNitroActive && (
        <pointLight position={[0, 0.2, -2.2]} color="#ff6600" intensity={6} distance={5} decay={2} />
      )}
    </group>
  )
}
