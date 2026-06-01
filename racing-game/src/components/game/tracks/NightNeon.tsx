import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { TRACK_DEFINITIONS } from '../../../data/tracks'
import { buildTrackMesh, StartGate, useTrackTextures } from './TrackBase'
import { useFrame } from '@react-three/fiber'

const def = TRACK_DEFINITIONS.find(t => t.id === 'night_neon')!

/** Color-cycling Cyberpunk Portal Arch */
function CyberArch({ position, rotation }: { position: [number, number, number]; rotation: THREE.Euler }) {
  const lightRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const mat = lightRef.current.material as THREE.MeshStandardMaterial
      // Cycle emissive color
      const hue = (clock.getElapsedTime() * 0.15) % 1
      const c = new THREE.Color().setHSL(hue, 1, 0.5)
      mat.emissive.copy(c)
      mat.emissiveIntensity = 2.0 + Math.sin(clock.getElapsedTime() * 8) * 0.8
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Left pillar */}
      <mesh position={[-5.8, 3, 0]}>
        <boxGeometry args={[0.3, 6, 0.6]} />
        <meshStandardMaterial color="#0c0c16" metalness={0.9} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[5.8, 3, 0]}>
        <boxGeometry args={[0.3, 6, 0.6]} />
        <meshStandardMaterial color="#0c0c16" metalness={0.9} />
      </mesh>
      {/* Top lintel */}
      <mesh position={[0, 6, 0]}>
        <boxGeometry args={[11.9, 0.4, 0.6]} />
        <meshStandardMaterial color="#0c0c16" metalness={0.9} />
      </mesh>
      {/* Neon glowing lining */}
      <mesh ref={lightRef} position={[0, 5.8, 0.02]}>
        <boxGeometry args={[11.5, 0.08, 0.62]} />
        <meshStandardMaterial color="#bf00ff" emissive="#bf00ff" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

/** Glowing Pink Cherry Blossom Tree */
function NeonCherryTree({ position, scale = 1 }: { position:[number,number,number]; scale?:number }) {
  const crownRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (crownRef.current) {
      const mat = crownRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.0 + Math.sin(clock.getElapsedTime() * 1.5 + position[0]) * 0.3
    }
  })
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Dark trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.15, 2, 8]} />
        <meshStandardMaterial color="#111118" roughness={0.9} />
      </mesh>
      {/* Emissive pink foliage */}
      <mesh ref={crownRef} position={[0, 2.3, 0]} castShadow>
        <sphereGeometry args={[1.0, 10, 10]} />
        <meshStandardMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={1.2} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function NightNeon() {
  const track = useMemo(() => buildTrackMesh(def), [])
  const mat   = useTrackTextures(def)
  const startPos = track.getPointAt(0)
  const startTan = track.getTangentAt(0)
  const startRot = new THREE.Euler(0, Math.atan2(startTan.x, startTan.z), 0)

  return (
    <group>
      {/* ── Road ──────────────────────────────────────────────────────── */}
      <mesh receiveShadow geometry={track.roadGeometry}>
        <meshStandardMaterial {...mat} />
      </mesh>

      {/* ── Glowing alternating barriers ────────────────────────────────── */}
      <mesh receiveShadow castShadow geometry={track.leftBarrierGeo}>
        <meshStandardMaterial color="#0c0c16" emissive="#bf00ff" emissiveIntensity={1.5} roughness={0.2} />
      </mesh>
      <mesh receiveShadow castShadow geometry={track.rightBarrierGeo}>
        <meshStandardMaterial color="#0c0c16" emissive="#ff007f" emissiveIntensity={1.5} roughness={0.2} />
      </mesh>

      {/* ── Start Gate ────────────────────────────────────────────────── */}
      <StartGate position={startPos} rotation={startRot} />

      {/* ── Neon Arches Portal Frames ──────────────────────────────────── */}
      {Array.from({length:6}, (_,i) => {
        if (i === 0) return null // start gate covers it
        const t = i / 6
        const p = track.getPointAt(t)
        const tan = track.getTangentAt(t)
        const rot = new THREE.Euler(0, Math.atan2(tan.x, tan.z), 0)
        return (
          <CyberArch key={i} position={[p.x, p.y, p.z]} rotation={rot} />
        )
      })}

      {/* ── Glowing cherry blossom trees ──────────────────────────────── */}
      {Array.from({length:24}, (_,i) => {
        const t = (i / 24) + 0.02
        const p = track.getPointAt(t)
        const leftNo = track.getNormalAt(t, -8 - Math.random()*4)
        const rightNo = track.getNormalAt(t, 8 + Math.random()*4)
        return (
          <group key={i}>
            <NeonCherryTree position={[p.x + leftNo.x, p.y + leftNo.y, p.z + leftNo.z]} scale={0.85 + Math.random()*0.3} />
            <NeonCherryTree position={[p.x + rightNo.x, p.y + rightNo.y, p.z + rightNo.z]} scale={0.85 + Math.random()*0.3} />
          </group>
        )
      })}

      {/* ── Neon barrier localized lights ────────────────────────────── */}
      {Array.from({length:10}, (_,i) => {
        const t = i / 10
        const p = track.getPointAt(t)
        const no = track.getNormalAt(t, 5.5)
        return (
          <pointLight key={i} position={[p.x + no.x, p.y + 1, p.z + no.z]} intensity={3} distance={12} color="#bf00ff" />
        )
      })}
    </group>
  )
}
export default NightNeon
