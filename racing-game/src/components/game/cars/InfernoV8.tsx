import CarBase, { Wheel } from './CarBase'
import { getCar } from '../../../data/cars'
import { useGameStore } from '../../../store/gameStore'

const carDef = getCar('inferno_v8')

interface InfernoBodyProps {
  color: string
  steerAngle: number
  isDrifting: boolean
  isNitro: boolean
  speed: number
  damage: number
}

function InfernoBody({ color, steerAngle }: InfernoBodyProps) {
  const wheelSpin = useGameStore((s) => s.car.wheelSpin)
  return (
    <group>
      {/* Main body — bulky muscle car chassis */}
      <mesh castShadow receiveShadow position={[0, 0.28, 0]}>
        <boxGeometry args={[1.56, 0.48, 4.0]} />
        <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.9} clearcoat={0.6} />
      </mesh>
      {/* Boxy cabin */}
      <mesh castShadow receiveShadow position={[0, 0.65, -0.2]}>
        <boxGeometry args={[1.25, 0.36, 1.9]} />
        <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Hood Scoop */}
      <mesh castShadow receiveShadow position={[0, 0.56, 1.0]}>
        <boxGeometry args={[0.45, 0.12, 0.7]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>
      {/* Aggressive Front Grille */}
      <mesh castShadow receiveShadow position={[0, 0.22, 2.01]}>
        <boxGeometry args={[1.3, 0.24, 0.04]} />
        <meshStandardMaterial color="#050505" roughness={0.9} metalness={0.3} />
      </mesh>
      {/* Twin Exhaust pipes protruding from rear */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.12, -2.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.24, 8]} />
          <meshStandardMaterial color="#777777" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Massive Rear Spoiler */}
      <mesh castShadow receiveShadow position={[0, 0.85, -1.88]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.7, 0.04, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Spoiler supports */}
      {[-0.65, 0.65].map((x, i) => (
        <mesh key={i} position={[x, 0.68, -1.88]} castShadow>
          <boxGeometry args={[0.05, 0.35, 0.05]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      ))}
      {/* Headlights (harsh yellow) */}
      {[[-0.55, 2.01], [0.55, 2.01]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.28, z]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={2.5} />
        </mesh>
      ))}
      {/* Taillights */}
      {[-0.6, -0.3, 0.3, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.35, -2.01]}>
          <boxGeometry args={[0.18, 0.1, 0.02]} />
          <meshStandardMaterial color="#dd0000" emissive="#dd0000" emissiveIntensity={2.0} />
        </mesh>
      ))}
      {/* Wheels */}
      <Wheel pos={[-0.82, 0.12, 1.2]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[0.82, 0.12, 1.2]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[-0.82, 0.12, -1.2]} spin={wheelSpin} />
      <Wheel pos={[0.82, 0.12, -1.2]} spin={wheelSpin} />
    </group>
  )
}

export default function InfernoV8({ startPosition = [0, 0.45, -50] as [number, number, number], startRotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <CarBase
      carDef={carDef}
      startPosition={startPosition}
      startRotation={startRotation}
      renderBody={(opts) => <InfernoBody {...opts} />}
    />
  )
}
