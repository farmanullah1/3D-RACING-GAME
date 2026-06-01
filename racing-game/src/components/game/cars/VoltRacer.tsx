import CarBase, { Wheel } from './CarBase'
import { getCar } from '../../../data/cars'
import { useGameStore } from '../../../store/gameStore'

const carDef = getCar('volt_racer')

interface VoltBodyProps {
  color: string
  steerAngle: number
  isDrifting: boolean
  isNitro: boolean
  speed: number
  damage: number
}

function VoltBody({ color, steerAngle }: VoltBodyProps) {
  const wheelSpin = useGameStore((s) => s.car.wheelSpin)
  return (
    <group>
      {/* Main body — low aerodynamic teardrop */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1.46, 0.35, 3.9]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1.0}
          transmission={0.1}
          thickness={0.5}
        />
      </mesh>
      {/* Aerodynamic canopy */}
      <mesh castShadow receiveShadow position={[0, 0.5, -0.15]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.0, 0.35, 2.0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.02}
          clearcoat={1.0}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Front wing / aero splitter */}
      <mesh castShadow receiveShadow position={[0, 0.06, 1.98]}>
        <boxGeometry args={[1.5, 0.05, 0.3]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} roughness={0.5} />
      </mesh>
      {/* Glowing neon side strips */}
      {[-0.74, 0.74].map((x, i) => (
        <mesh key={i} position={[x, 0.2, 0]}>
          <boxGeometry args={[0.02, 0.06, 3.0]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} />
        </mesh>
      ))}
      {/* Headlights */}
      {[[-0.5, 2.0], [0.5, 2.0]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.18, z]}>
          <boxGeometry args={[0.16, 0.04, 0.04]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
        </mesh>
      ))}
      {/* Taillights */}
      {[[-0.5, -1.96], [0.5, -1.96]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <boxGeometry args={[0.2, 0.05, 0.02]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2.5} />
        </mesh>
      ))}
      {/* Wheels */}
      <Wheel pos={[-0.78, 0.08, 1.15]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[0.78, 0.08, 1.15]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[-0.78, 0.08, -1.15]} spin={wheelSpin} />
      <Wheel pos={[0.78, 0.08, -1.15]} spin={wheelSpin} />
    </group>
  )
}

export default function VoltRacer({ startPosition = [0, 0.35, -50] as [number, number, number], startRotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <CarBase
      carDef={carDef}
      startPosition={startPosition}
      startRotation={startRotation}
      renderBody={(opts) => <VoltBody {...opts} />}
    />
  )
}
