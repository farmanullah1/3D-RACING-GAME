import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { getTrack } from '../../data/tracks'

/**
 * Particle systems that adapt to the current track's weather:
 * - Rain: city_circuit, night_neon
 * - Sandstorm: desert_dunes
 * - Fog particles: mountain_pass
 */
export default function Particles() {
  const trackId = useGameStore((s) => s.selectedTrackId)
  const track   = getTrack(trackId)

  if (track.weather === 'rain')       return <RainSystem />
  if (track.weather === 'sandstorm')  return <SandstormSystem />
  if (track.weather === 'fog')        return <FogMistSystem />
  return null
}

function RainSystem() {
  const COUNT  = 3000
  const posRef = useRef<THREE.BufferGeometry>(null)
  const velocities = useRef(Float32Array.from({length:COUNT*3}, () => (Math.random()-0.5)*0.5))
  const positions  = useRef(Float32Array.from({length:COUNT*3}, (_,i) => {
    if (i%3===0) return (Math.random()-0.5)*200
    if (i%3===1) return Math.random()*60
    return (Math.random()-0.5)*200
  }))

  useFrame(() => {
    const pos = positions.current
    for (let i = 0; i < COUNT; i++) {
      pos[i*3+1] -= 0.6  // fall speed
      if (pos[i*3+1] < 0) pos[i*3+1] = 60  // reset to top
      pos[i*3]   += velocities.current[i*3]   * 0.1
      pos[i*3+2] += velocities.current[i*3+2] * 0.1
    }
    if (posRef.current) posRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={posRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} transparent opacity={0.6} color="#77ccff" sizeAttenuation />
    </points>
  )
}

function SandstormSystem() {
  const COUNT = 2000
  const posRef = useRef<THREE.BufferGeometry>(null)
  const pos = useRef(Float32Array.from({length:COUNT*3}, (_,i) => {
    if (i%3===0) return (Math.random()-0.5)*160
    if (i%3===1) return Math.random()*8
    return (Math.random()-0.5)*160
  }))

  useFrame(() => {
    const p = pos.current
    for (let i = 0; i < COUNT; i++) {
      p[i*3]   += 0.15   // blow sideways
      p[i*3+1] += (Math.random()-0.5)*0.05
      if (p[i*3] > 80) p[i*3] = -80
    }
    if (posRef.current) posRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points position={[0, 0, 0]}>
      <bufferGeometry ref={posRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[pos.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.25} transparent opacity={0.3} color="#c8a050" sizeAttenuation />
    </points>
  )
}

function FogMistSystem() {
  return (
    <group>
      {Array.from({length:6},(_,i) => (
        <group key={i} position={[(Math.random()-0.5)*120, 1.5, (Math.random()-0.5)*120]}>
          <mesh>
            <boxGeometry args={[30, 2, 30]} />
            <meshStandardMaterial color="#eeeeee" transparent opacity={0.06} roughness={1.0} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
