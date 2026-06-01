import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky, Stars, Cloud, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { getTrack } from '../../data/tracks'
import { makeGrassTex } from '../../utils/textures'

/**
 * Dynamic environment that adapts to the selected track's theme.
 * - City: night sky, rain
 * - Mountain: golden hour, fog
 * - Desert: harsh sun, sandstorm
 * - Neon: pure black sky, neon ambiance
 */
export default function Environment() {
  const trackId  = useGameStore((s) => s.selectedTrackId)
  const track    = getTrack(trackId)
  const dirRef   = useRef<THREE.DirectionalLight>(null)
  const grassTex = makeGrassTex()

  useFrame(({ clock }) => {
    if (dirRef.current && track.timeOfDay !== 'night') {
      dirRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.01) * 80
    }
  })

  const isNight   = track.timeOfDay === 'night'
  const isDesert  = track.theme === 'desert'
  const isMountain = track.theme === 'mountain'

  return (
    <>
      {/* ── Sky ──────────────────────────────────────────────────────── */}
      {!isNight && (
        <Sky
          sunPosition={track.sunDirection}
          turbidity={isDesert ? 25 : 8}
          rayleigh={isDesert ? 6 : 2}
          mieCoefficient={isDesert ? 0.08 : 0.005}
          mieDirectionalG={0.8}
        />
      )}
      {isNight && (
        <color attach="background" args={[track.skyColor as any]} />
      )}

      {/* ── Stars ─────────────────────────────────────────────────────── */}
      {isNight && <Stars radius={200} depth={50} count={5000} factor={6} saturation={0.5} fade speed={0.5} />}
      {isMountain && <Stars radius={200} depth={50} count={2000} factor={3} saturation={0.1} fade speed={0.2} />}

      {/* ── Clouds ────────────────────────────────────────────────────── */}
      {!isDesert && !isNight && <>
        <Cloud position={[-30, 20, -60]} speed={0.2} opacity={0.4} segments={6} />
        <Cloud position={[50, 25, -90]} speed={0.15} opacity={0.3} segments={6} />
        <Cloud position={[0, 22, -40]} speed={0.25} opacity={0.5} segments={8} />
      </>}

      {/* Desert dust clouds */}
      {isDesert && <>
        <Cloud position={[-40, 10, -50]} speed={0.4} opacity={0.2} color="#c8a050" segments={5} />
        <Cloud position={[40, 12, -70]} speed={0.3} opacity={0.25} color="#d4b46a" segments={5} />
      </>}

      {/* ── Fog ───────────────────────────────────────────────────────── */}
      <fogExp2 attach="fog" args={[track.fogColor, track.fogDensity]} />

      {/* ── Lighting ──────────────────────────────────────────────────── */}
      <ambientLight intensity={track.ambientIntensity} color={track.accentColor} />

      {/* Main directional light */}
      <directionalLight
        ref={dirRef}
        position={track.sunDirection}
        intensity={isNight ? 0.2 : isDesert ? 2.5 : 1.8}
        color={isMountain ? '#ffaa60' : '#ffffff'}
        castShadow={!isNight}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />

      {/* Fill / sky light */}
      <directionalLight
        position={[-30, 30, -20]}
        intensity={isNight ? 0.05 : 0.4}
        color={track.accentColor}
      />

      {/* Neon track accent lights */}
      {track.theme === 'neon' && <>
        <pointLight position={[0, 15, 0]} intensity={4.0} color="#bf00ff" distance={80} />
        <pointLight position={[-40, 10, 40]} intensity={3.0} color="#ff00aa" distance={50} />
        <pointLight position={[40, 10, -40]} intensity={3.0} color="#00ffff" distance={50} />
      </>}

      {/* ── Ground ────────────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[600, 600]} />
        <meshStandardMaterial
          map={grassTex}
          color={isDesert ? '#c8a050' : isNight ? '#091509' : '#1b3b10'}
          roughness={0.9}
        />
      </mesh>

      {/* ── Ambient particles ─────────────────────────────────────────── */}
      {!isNight && !isDesert && (
        <Sparkles count={80} size={1.5} speed={0.1} color="#ffffff" scale={[200, 10, 200]} position={[0, 2, 0]} />
      )}
      {isDesert && (
        <Sparkles count={200} size={2.5} speed={1.5} color="#c8a050" scale={[200, 8, 200]} position={[0, 2, 0]} />
      )}
    </>
  )
}
