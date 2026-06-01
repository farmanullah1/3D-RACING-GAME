import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { TRACK_DEFINITIONS } from '../../../data/tracks'
import { buildTrackMesh, StartGate, useTrackTextures } from './TrackBase'
import { useFrame } from '@react-three/fiber'

const def = TRACK_DEFINITIONS.find(t => t.id === 'city_circuit')!

/** Neon sign billboard */
function NeonSign({ position, color, label: _label }: { position:[number,number,number]; color:string; label:string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 2 + position[0]) * 0.4
    }
  })
  return (
    <group position={position}>
      {/* Sign support */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 4, 8]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Sign backing */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4.2, 1.4, 0.2]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
      {/* Glowing frame */}
      <mesh ref={ref} position={[0, 0.5, 0.12]}>
        <boxGeometry args={[4.0, 1.2, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      {/* Text label would go here, we display neon blocks */}
      <mesh position={[0, 0.5, 0.15]}>
        <boxGeometry args={[3.2, 0.5, 0.02]} />
        <meshStandardMaterial color="#000000" roughness={0.9} />
      </mesh>
    </group>
  )
}

/** City building silhouette */
function Building({ pos, w, h, d, color='#0a0a1a' }: { pos:[number,number,number]; w:number; h:number; d:number; color?:string }) {
  return (
    <group position={pos}>
      <mesh castShadow receiveShadow position={[0, h/2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Window grid (emissive dots) */}
      {Array.from({length:Math.floor(h/3)}).map((_,row) =>
        Array.from({length:Math.floor(w/2)}).map((_,col) =>
          Math.random() > 0.4 ? (
            <mesh key={`${row}-${col}`} position={[
              -w/2 + 1 + col*2, row*3 + 2, d/2 + 0.05
            ]}>
              <planeGeometry args={[0.4, 0.6]} />
              <meshStandardMaterial color="#ffe600" emissive="#ffe600" emissiveIntensity={2.5} />
            </mesh>
          ) : null
        )
      )}
    </group>
  )
}

export function CityCircuit() {
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

      {/* ── Barriers: blue-white striped Jersey barriers ──────────────── */}
      <mesh receiveShadow castShadow geometry={track.leftBarrierGeo}>
        <meshStandardMaterial color="#00d4ff" roughness={0.7} />
      </mesh>
      <mesh receiveShadow castShadow geometry={track.rightBarrierGeo}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>

      {/* ── Start gate ────────────────────────────────────────────────── */}
      <StartGate position={startPos} rotation={startRot} />

      {/* ── Streetlights along track ──────────────────────────────────── */}
      {Array.from({length:20}, (_,i) => {
        const t  = i / 20
        const p  = track.getPointAt(t)
        const no = track.getNormalAt(t, 7)
        return (
          <group key={i} position={[p.x + no.x, p.y + no.y, p.z + no.z]}>
            {/* Pole */}
            <mesh position={[0, 3, 0]}>
              <cylinderGeometry args={[0.06, 0.1, 6, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.6} />
            </mesh>
            {/* Light head */}
            <mesh position={[0.5, 6, 0]}>
              <boxGeometry args={[1.2, 0.2, 0.4]} />
              <meshStandardMaterial color="#222222" />
            </mesh>
            <pointLight position={[0.5, 5.8, 0]} intensity={4.0} distance={15} color="#00ffff" decay={2} />
          </group>
        )
      })}

      {/* ── Neon signs positioned mathematically outside the barriers ── */}
      {Array.from({length: 4}, (_, i) => {
        const t = 0.12 + (i * 0.25)
        const p = track.getPointAt(t)
        const side = i % 2 === 0 ? -1 : 1
        const no = track.getNormalAt(t, side * 10)
        const colors = ["#00d4ff", "#ff00aa", "#39ff14", "#bf00ff"]
        const labels = ["APEXRUSH", "TURBO", "DRIFT", "NEON"]
        return (
          <NeonSign 
            key={i} 
            position={[p.x + no.x, 4, p.z + no.z]} 
            color={colors[i]} 
            label={labels[i]} 
          />
        )
      })}

      {/* ── City buildings (skyline canyon) mathematically aligned to track bounds ── */}
      {Array.from({length: 12}, (_, i) => {
        const t = (i / 12) + 0.04
        const p = track.getPointAt(t)
        const side = i % 2 === 0 ? -1 : 1
        // Places buildings safely at least 26 units from the road center
        const offset = side * (26 + (i * 1.5) % 10)
        const no = track.getNormalAt(t, offset)
        
        // Balanced procedural sizes for stunning urban skylines
        const w = 22 + (i * 7) % 12
        const h = 50 + (i * 13) % 45
        const d = 22 + (i * 7) % 12
        
        return (
          <Building 
            key={i} 
            pos={[p.x + no.x, 0, p.z + no.z]} 
            w={w} 
            h={h} 
            d={d} 
          />
        )
      })}

      {/* ── Rain puddle reflection planes ────────────────────────────── */}
      {Array.from({length:8}, (_,i) => {
        const t = i / 8
        const p = track.getPointAt(t)
        return (
          <mesh key={i} position={[p.x, 0.05, p.z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[14, 14]} />
            <meshStandardMaterial color="#001122" roughness={0.02} metalness={0.9} transparent opacity={0.35} />
          </mesh>
        )
      })}
    </group>
  )
}
