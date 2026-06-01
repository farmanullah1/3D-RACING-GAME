import { useMemo } from 'react'
import * as THREE from 'three'
import { TRACK_DEFINITIONS } from '../../../data/tracks'
import { buildTrackMesh, StartGate, useTrackTextures } from './TrackBase'

const def = TRACK_DEFINITIONS.find(t => t.id === 'desert_dunes')!

/** Procedural Cactus */
function Cactus({ position, scale = 1 }: { position:[number,number,number]; scale?:number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Main stalk */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 2.4, 8]} />
        <meshStandardMaterial color="#2d5e27" roughness={0.8} />
      </mesh>
      {/* Left arm */}
      <group position={[-0.4, 1.4, 0]}>
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
          <meshStandardMaterial color="#2d5e27" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#2d5e27" roughness={0.8} />
        </mesh>
      </group>
      {/* Right arm */}
      <group position={[0.4, 1.7, 0]}>
        <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
          <meshStandardMaterial color="#2d5e27" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#2d5e27" roughness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

/** Palm tree */
function PalmTree({ position, scale = 1 }: { position:[number,number,number]; scale?:number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk (slanted) */}
      <mesh position={[0.2, 2, 0]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.12, 0.22, 4, 8]} />
        <meshStandardMaterial color="#6e5030" roughness={0.8} />
      </mesh>
      {/* Crown leaf cluster */}
      <mesh position={[0.4, 4, 0]} castShadow>
        <sphereGeometry args={[1.1, 12, 8]} />
        <meshStandardMaterial color="#3f7215" roughness={0.9} />
      </mesh>
    </group>
  )
}

export function DesertDunes() {
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

      {/* ── Orange concrete barriers ───────────────────────────────────── */}
      <mesh receiveShadow castShadow geometry={track.leftBarrierGeo}>
        <meshStandardMaterial color="#c0392b" roughness={0.8} emissive="#ff4400" emissiveIntensity={0.2} />
      </mesh>
      <mesh receiveShadow castShadow geometry={track.rightBarrierGeo}>
        <meshStandardMaterial color="#c0392b" roughness={0.8} emissive="#ff4400" emissiveIntensity={0.2} />
      </mesh>

      {/* ── Start Gate ────────────────────────────────────────────────── */}
      <StartGate position={startPos} rotation={startRot} />

      {/* ── Cacti along side bounds ────────────────────────────────────── */}
      {Array.from({length:24}, (_,i) => {
        const t = i / 24
        const p = track.getPointAt(t)
        const no = track.getNormalAt(t, 9 + Math.random()*5)
        return (
          <Cactus key={i} position={[p.x + no.x, p.y + no.y, p.z + no.z]} scale={0.8 + Math.random()*0.4} />
        )
      })}

      {/* ── Oasis checkpoint ──────────────────────────────────────────── */}
      {Array.from({length:3}, (_,i) => {
        const t = 0.5 + (i * 0.02)
        const p = track.getPointAt(t)
        const leftNo = track.getNormalAt(t, -8)
        const rightNo = track.getNormalAt(t, 8)
        return (
          <group key={i}>
            <PalmTree position={[p.x + leftNo.x, p.y + leftNo.y, p.z + leftNo.z]} />
            <PalmTree position={[p.x + rightNo.x, p.y + rightNo.y, p.z + rightNo.z]} />
            {/* Water puddle look */}
            {i === 1 && (
              <mesh position={[p.x + leftNo.x*1.5, 0.05, p.z + leftNo.z*1.5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 8]} />
                <meshStandardMaterial color="#0066aa" roughness={0.05} transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        )
      })}

      {/* ── Large sand mounds ─────────────────────────────────────────── */}
      {Array.from({length:10}, (_,i) => {
        const t = i / 10
        const p = track.getPointAt(t)
        const no = track.getNormalAt(t, -25 - Math.random()*20)
        return (
          <mesh key={i} position={[p.x + no.x, -2, p.z + no.z]} scale={[4, 0.6, 4]} castShadow receiveShadow>
            <sphereGeometry args={[12, 16, 12]} />
            <meshStandardMaterial color="#d4b46a" roughness={0.99} />
          </mesh>
        )
      })}
    </group>
  )
}
