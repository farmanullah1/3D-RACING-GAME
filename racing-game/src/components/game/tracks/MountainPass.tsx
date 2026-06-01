import { useMemo } from 'react'
import * as THREE from 'three'
import { TRACK_DEFINITIONS } from '../../../data/tracks'
import { buildTrackMesh, StartGate, useTrackTextures } from './TrackBase'

const def = TRACK_DEFINITIONS.find(t => t.id === 'mountain_pass')!

/** Procedural pine tree */
function PineTree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.22, 1.6, 8]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
      </mesh>
      {/* Leaves - bottom layer */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <coneGeometry args={[1.2, 1.8, 8]} />
        <meshStandardMaterial color="#133d1c" roughness={0.8} />
      </mesh>
      {/* Leaves - middle layer */}
      <mesh position={[0, 3.0, 0]} castShadow>
        <coneGeometry args={[0.9, 1.5, 8]} />
        <meshStandardMaterial color="#1a4f27" roughness={0.8} />
      </mesh>
      {/* Leaves - top layer */}
      <mesh position={[0, 3.9, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial color="#226031" roughness={0.7} />
      </mesh>
    </group>
  )
}

/** Cliff face rock */
function CliffRock({ position, scale = [1,1,1], rotation = [0,0,0] }:
  { position: [number, number, number]; scale?: [number,number,number]; rotation?: [number,number,number] }
) {
  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[10, 15, 10]} />
      <meshStandardMaterial color="#4a4d50" roughness={0.95} metalness={0.1} />
    </mesh>
  )
}

export function MountainPass() {
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

      {/* ── Wooden guardrails ─────────────────────────────────────────── */}
      <mesh receiveShadow castShadow geometry={track.leftBarrierGeo}>
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      <mesh receiveShadow castShadow geometry={track.rightBarrierGeo}>
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* ── Start Gate ────────────────────────────────────────────────── */}
      <StartGate position={startPos} rotation={startRot} />

      {/* ── Pine trees scattered along outer track bounds ────────────── */}
      {Array.from({length:32}, (_,i) => {
        const t  = i / 32
        const p  = track.getPointAt(t)
        const leftNo  = track.getNormalAt(t, -8 - Math.random()*6)
        const rightNo = track.getNormalAt(t, 8 + Math.random()*6)
        return (
          <group key={i}>
            <PineTree position={[p.x + leftNo.x, p.y + leftNo.y, p.z + leftNo.z]} scale={0.7 + Math.random()*0.6} />
            <PineTree position={[p.x + rightNo.x, p.y + rightNo.y, p.z + rightNo.z]} scale={0.7 + Math.random()*0.6} />
          </group>
        )
      })}

      {/* ── Large cliff rocks blocking bounds ────────────────────────── */}
      <CliffRock position={[-50, -2, -90]} scale={[2, 2.5, 2]} />
      <CliffRock position={[50, -2, -100]} scale={[2.5, 3.0, 1.8]} />
      <CliffRock position={[-95, -2, 20]} scale={[1.8, 2.0, 2.5]} />
      <CliffRock position={[90, -2, 50]} scale={[2.2, 2.8, 2.2]} />
      <CliffRock position={[-10, -5, 110]} scale={[3, 1.5, 2]} />

      {/* ── Ground fog patches ────────────────────────────────────────── */}
      {Array.from({length:6}, (_,i) => {
        const t = (i / 6) + 0.05
        const p = track.getPointAt(t)
        return (
          <mesh key={i} position={[p.x, 0.4, p.z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[25, 25]} />
            <meshStandardMaterial color="#ffd090" roughness={1.0} transparent opacity={0.12} />
          </mesh>
        )
      })}
    </group>
  )
}
