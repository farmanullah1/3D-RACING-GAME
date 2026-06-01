import CarBase, { Wheel } from './CarBase'
import { getCar } from '../../../data/cars'
import { useGameStore } from '../../../store/gameStore'

const carDef = getCar('phantom_gt')

interface PhantomBodyProps {
  color: string
  steerAngle: number
  isDrifting: boolean
  isNitro: boolean
  speed: number
  damage: number
}

function PhantomBody({ color, steerAngle }: PhantomBodyProps) {
  const wheelSpin = useGameStore((s) => s.car.wheelSpin)
  return (
    <group>
      {/* Main body — sleek sports coupe */}
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[1.5, 0.4, 3.8]} />
        <meshPhysicalMaterial color={color} roughness={0.1} metalness={0.8} clearcoat={1.0} clearcoatRoughness={0.1} />
      </mesh>
      {/* Swooping roofline */}
      <mesh castShadow receiveShadow position={[0, 0.6, -0.3]}>
        <boxGeometry args={[1.2, 0.35, 1.8]} />
        <meshPhysicalMaterial color={color} roughness={0.15} metalness={0.7} clearcoat={0.9} />
      </mesh>
      {/* Front splitter */}
      <mesh castShadow receiveShadow position={[0, 0.08, 1.95]}>
        <boxGeometry args={[1.45, 0.06, 0.2]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      {/* Rear diffuser */}
      <mesh castShadow receiveShadow position={[0, 0.08, -1.95]}>
        <boxGeometry args={[1.4, 0.1, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* GT wing */}
      <mesh castShadow receiveShadow position={[0, 0.8, -1.75]}>
        <boxGeometry args={[1.6, 0.05, 0.3]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Wing supports */}
      {[-0.6, 0.6].map((x, i) => (
        <group key={i} position={[x, 0.6, -1.75]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.04, 0.4, 0.08]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        </group>
      ))}
      {/* Headlights */}
      {[[-0.55, 2.08], [0.55, 2.08]].map(([x, z], i) => (
        <group key={i} position={[x, 0.25, z]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
          </mesh>
        </group>
      ))}
      {/* Taillights */}
      {[[-0.55, -2.08], [0.55, -2.08]].map(([x, z], i) => (
        <group key={i} position={[x, 0.25, z]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.2, 0.08, 0.02]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
          </mesh>
        </group>
      ))}
      {/* Windshield */}
      <mesh castShadow receiveShadow position={[0, 0.52, 0.7]} rotation={[-0.6, 0, 0]}>
        <boxGeometry args={[1.16, 0.02, 0.7]} />
        <meshPhysicalMaterial color="#050505" roughness={0.1} transparent opacity={0.65} />
      </mesh>
      {/* Wheels */}
      <Wheel pos={[-0.8, 0.1, 1.1]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[0.8, 0.1, 1.1]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[-0.8, 0.1, -1.1]} spin={wheelSpin} />
      <Wheel pos={[0.8, 0.1, -1.1]} spin={wheelSpin} />
    </group>
  )
}

export default function PhantomGT({ startPosition = [0, 0.4, -50] as [number, number, number], startRotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <CarBase
      carDef={carDef}
      startPosition={startPosition}
      startRotation={startRotation}
      renderBody={(opts) => <PhantomBody {...opts} />}
    />
  )
}
