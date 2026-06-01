import CarBase, { Wheel } from './CarBase'
import { getCar } from '../../../data/cars'
import { useGameStore } from '../../../store/gameStore'

const carDef = getCar('shadow_drift')

interface ShadowBodyProps {
  color: string
  steerAngle: number
  isDrifting: boolean
  isNitro: boolean
  speed: number
  damage: number
}

function ShadowBody({ color, steerAngle }: ShadowBodyProps) {
  const wheelSpin = useGameStore((s) => s.car.wheelSpin)
  return (
    <group>
      {/* Main body — low widebody chassis */}
      <mesh castShadow receiveShadow position={[0, 0.18, 0]}>
        <boxGeometry args={[1.62, 0.38, 3.8]} />
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.9} clearcoat={0.8} />
      </mesh>
      {/* Sleek roof cabin */}
      <mesh castShadow receiveShadow position={[0, 0.52, -0.2]}>
        <boxGeometry args={[1.2, 0.32, 1.8]} />
        <meshPhysicalMaterial color={color} roughness={0.25} clearcoat={0.9} />
      </mesh>
      {/* Exaggerated fender flares (front) */}
      {[-0.82, 0.82].map((x, i) => (
        <mesh key={i} position={[x, 0.18, 1.15]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.15, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
        </mesh>
      ))}
      {/* Exaggerated fender flares (rear) */}
      {[-0.82, 0.82].map((x, i) => (
        <mesh key={i} position={[x, 0.18, -1.15]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.18, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
        </mesh>
      ))}
      {/* Ducktail spoiler */}
      <mesh castShadow receiveShadow position={[0, 0.42, -1.82]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[1.5, 0.18, 0.12]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      {/* Purple underglow strip */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.2, 0.02, 2.5]} />
        <meshStandardMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={2.5} />
      </mesh>
      {pointLightForUnderglow()}
      {/* Headlights (cool pink-purple) */}
      {[[-0.55, 1.91], [0.55, 1.91]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.22, z]}>
          <boxGeometry args={[0.18, 0.05, 0.03]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={3} />
        </mesh>
      ))}
      {/* Taillights */}
      {[[-0.55, -1.91], [0.55, -1.91]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.22, z]}>
          <boxGeometry args={[0.2, 0.06, 0.02]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={2.5} />
        </mesh>
      ))}
      {/* Wheels — front wheels standard, rear wheels wider stretched look */}
      <Wheel pos={[-0.82, 0.08, 1.15]} steer={steerAngle} spin={wheelSpin} />
      <Wheel pos={[0.82, 0.08, 1.15]} steer={steerAngle} spin={wheelSpin} />
      {/* Rear wheels with larger width for drift stance */}
      <group position={[-0.82, 0.08, -1.15]}>
        <group rotation={[wheelSpin, 0, 0]}>
          <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.35, 24]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
        </group>
      </group>
      <group position={[0.82, 0.08, -1.15]}>
        <group rotation={[wheelSpin, 0, 0]}>
          <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.35, 24]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function pointLightForUnderglow() {
  return <pointLight position={[0, -0.1, 0]} intensity={2.0} color="#ff00aa" distance={3} />
}

export default function ShadowDrift({ startPosition = [0, 0.32, -50] as [number, number, number], startRotation = [0, 0, 0] as [number, number, number] }) {
  return (
    <CarBase
      carDef={carDef}
      startPosition={startPosition}
      startRotation={startRotation}
      renderBody={(opts) => <ShadowBody {...opts} />}
    />
  )
}
