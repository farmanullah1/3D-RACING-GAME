import CarBase, { Wheel } from './CarBase'
import { getCar } from '../../../data/cars'
import { useGameStore } from '../../../store/gameStore'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const carDef = getCar('neon_blaze')

interface NeonBodyProps {
  color: string
  steerAngle: number
  isDrifting: boolean
  isNitro: boolean
  speed: number
  damage: number
}

function NeonBody({ color, steerAngle, speed }: NeonBodyProps) {
  const wheelSpin = useGameStore((s) => s.car.wheelSpin)
  const wingRef   = useRef<THREE.Group>(null)

  // Active aero wing tilts based on speed
  useFrame((_, delta) => {
    if (wingRef.current) {
      const targetRotation = (Math.min(speed, 200) / 200) * -0.22
      wingRef.current.rotation.x = THREE.MathUtils.lerp(wingRef.current.rotation.x, targetRotation, delta * 5)
    }
  })

  return (
    <group>
      {/* Main body — extremely low, wide supercar shape */}
      <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
        <boxGeometry args={[1.9, 0.32, 4.0]} />
        <meshPhysicalMaterial color={color} roughness={0.08} metalness={0.95} clearcoat={1.0} />
      </mesh>
      {/* Sleek low cockpit cabin */}
      <mesh castShadow receiveShadow position={[0, 0.45, -0.2]}>
        <boxGeometry args={[1.35, 0.28, 1.8]} />
        <meshPhysicalMaterial color={color} roughness={0.05} metalness={0.9} />
      </mesh>
      {/* Massive Rear Diffuser */}
      <mesh castShadow receiveShadow position={[0, 0.08, -1.98]}>
        <boxGeometry args={[1.75, 0.15, 0.2]} />
        <meshStandardMaterial color="#0b0b0b" roughness={0.8} />
      </mesh>
      {/* LED Neon Green stripe along full length of body sides */}
      {[-0.96, 0.96].map((x, i) => (
        <mesh key={i} position={[x, 0.16, 0]}>
          <boxGeometry args={[0.02, 0.04, 3.2]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={2.5} />
        </mesh>
      ))}
      {/* Active Aero Spoiler */}
      <group ref={wingRef} position={[0, 0.58, -1.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.96, 0.03, 0.35]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </mesh>
      </group>
      {/* Spoiler side plates */}
      {[-0.98, 0.98].map((x, i) => (
        <mesh key={i} position={[x, 0.55, -1.8]}>
          <boxGeometry args={[0.02, 0.15, 0.38]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={1} />
        </mesh>
      ))}
      {/* Headlights (acid green lasers) */}
      {[[-0.65, 2.01], [0.65, 2.01]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.18, z]}>
          <boxGeometry args={[0.22, 0.03, 0.03]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={3} />
        </mesh>
      ))}
      {/* Taillights */}
      {[[-0.65, -2.01], [0.65, -2.01]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <boxGeometry args={[0.24, 0.04, 0.02]} />
          <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={2} />
        </mesh>
      ))}
      {/* Wheels — with custom green glowing rims */}
      <Wheel pos={[-0.95, 0.06, 1.15]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[0.95, 0.06, 1.15]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[-0.95, 0.06, -1.15]} spin={wheelSpin} />
      <Wheel pos={[0.95, 0.06, -1.15]} spin={wheelSpin} />
    </group>
  )
}

export default function NeonBlaze({ startPosition = [0, 0.3, -50] as [number, number, number], startRotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <CarBase
      carDef={carDef}
      startPosition={startPosition}
      startRotation={startRotation}
      renderBody={(opts) => <NeonBody {...opts} />}
    />
  )
}
