import CarBase, { Wheel } from './CarBase'
import { getCar } from '../../../data/cars'
import { useGameStore } from '../../../store/gameStore'

const carDef = getCar('arctic_fox')

interface ArcticBodyProps {
  color: string
  steerAngle: number
  isDrifting: boolean
  isNitro: boolean
  speed: number
  damage: number
}

function ArcticBody({ color, steerAngle }: ArcticBodyProps) {
  const wheelSpin = useGameStore((s) => s.car.wheelSpin)
  return (
    <group>
      {/* Main body — robust SUV / off-road chassis */}
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[1.58, 0.58, 3.8]} />
        <meshPhysicalMaterial color={color} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Upright boxy cabin */}
      <mesh castShadow receiveShadow position={[0, 0.95, -0.2]}>
        <boxGeometry args={[1.25, 0.48, 1.9]} />
        <meshPhysicalMaterial color={color} roughness={0.35} metalness={0.5} />
      </mesh>
      {/* Roof Rack */}
      <group position={[0, 1.22, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.05, 1.6]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>
        {/* Roof bars */}
        {[-0.5, 0, 0.5].map((z, i) => (
          <mesh key={i} position={[0, 0.05, z]}>
            <boxGeometry args={[1.15, 0.04, 0.05]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        ))}
      </group>
      {/* Fender Protection / Side Armor strips */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0]}>
          <boxGeometry args={[0.03, 0.1, 3.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      ))}
      {/* Headlights (cool fog light style) */}
      {[[-0.55, 1.91], [0.55, 1.91]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z]}>
          <sphereGeometry args={[0.13, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
      ))}
      {/* Taillights */}
      {[[-0.6, -1.91], [0.6, -1.91]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.45, z]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#cc0000" emissive="#cc0000" emissiveIntensity={2} />
        </mesh>
      ))}
      {/* Wheels — taller stance, wider wheels */}
      <Wheel pos={[-0.82, 0.2, 1.1]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[0.82, 0.2, 1.1]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[-0.82, 0.2, -1.1]} spin={wheelSpin} />
      <Wheel pos={[0.82, 0.2, -1.1]} spin={wheelSpin} />
    </group>
  )
}

export default function ArcticFox({ startPosition = [0, 0.55, -50] as [number, number, number], startRotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <CarBase
      carDef={carDef}
      startPosition={startPosition}
      startRotation={startRotation}
      renderBody={(opts) => <VoltBodyWrap {...opts} />}
    />
  )
}

function VoltBodyWrap(opts: any) {
  return <ArcticBody {...opts} />
}
