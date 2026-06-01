import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky, Cloud, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { generateGrassTexture } from '../../utils/textures'
import { useGameStore } from '../../store/gameStore'
import { TRACKS } from '../../utils/tracks'

/**
 * Game world environment:
 * - Procedural sky with animated sun position (replaces with night sky in Night Mode)
 * - Dynamic clouds
 * - Stars (night atmosphere, intensifies in Night Mode)
 * - Directional + ambient + fill lights with shadows (dims dynamically)
 * - Ground plane with grass texture (darkens in Night Mode)
 * - Dust/sparkle particle effect
 */
export default function Environment() {
  const sunRef = useRef({ elevation: 12, azimuth: 180 })
  const dirLightRef = useRef<THREE.DirectionalLight>(null)
  const grassTexture = generateGrassTexture()
  
  const isNightMode = useGameStore((s) => s.game.isNightMode)
  const selectedTrackId = useGameStore((s) => s.game.selectedTrackId)
  
  const activeTrack = useMemo(() => {
    return TRACKS[selectedTrackId] || TRACKS[0]
  }, [selectedTrackId])

  useFrame(({ clock }) => {
    // Very slowly animate sun (subtle day progression)
    const t = clock.getElapsedTime() * 0.005
    let baseElevation = 12
    if (isNightMode) baseElevation = -15
    else if (activeTrack.decorations === 'rocks') baseElevation = 4 // Sunset low sun
    else if (activeTrack.decorations === 'city') baseElevation = -25 // City night
    
    sunRef.current.elevation = baseElevation + Math.sin(t) * 2
    sunRef.current.azimuth = 180 + t * 5

    // Update directional light position to match sun
    if (dirLightRef.current) {
      const phi = THREE.MathUtils.degToRad(90 - sunRef.current.elevation)
      const theta = THREE.MathUtils.degToRad(sunRef.current.azimuth)
      dirLightRef.current.position.setFromSphericalCoords(50, phi, theta)
    }
  })

  // Dynamic colors and light intensities based on active track and Night Mode
  const sunPosition = useMemo<[number, number, number]>(() => {
    if (isNightMode) return [100, -35, -100]
    if (activeTrack.decorations === 'rocks') return [100, 5, -100]
    if (activeTrack.decorations === 'city') return [100, -25, -100]
    return [100, 20, -100]
  }, [isNightMode, activeTrack])

  const ambientColor = useMemo(() => {
    if (isNightMode) return '#101d3a'
    if (activeTrack.decorations === 'rocks') return '#ffa07a'
    if (activeTrack.decorations === 'city') return '#1b1035'
    return '#b0c8ff'
  }, [isNightMode, activeTrack])

  const ambientIntensity = useMemo(() => {
    if (isNightMode) return 0.08
    if (activeTrack.decorations === 'city') return 0.25
    return 0.4
  }, [isNightMode, activeTrack])

  const dirLightColor = useMemo(() => {
    if (isNightMode) return '#5e85c8'
    if (activeTrack.decorations === 'rocks') return '#ff5500'
    if (activeTrack.decorations === 'city') return '#bf00ff'
    return '#fff5e0'
  }, [isNightMode, activeTrack])

  const dirLightIntensity = useMemo(() => {
    if (isNightMode) return 0.08
    if (activeTrack.decorations === 'rocks') return 1.8
    if (activeTrack.decorations === 'city') return 0.5
    return 2.2
  }, [isNightMode, activeTrack])

  const sparklesColor = useMemo(() => {
    if (activeTrack.decorations === 'city') return '#bf00ff'
    if (activeTrack.decorations === 'rocks') return '#ff9900'
    return '#ffffff'
  }, [activeTrack])

  const groundColor = useMemo(() => {
    if (isNightMode) {
      if (activeTrack.decorations === 'rocks') return '#503020'
      if (activeTrack.decorations === 'city') return '#02020a'
      return '#0c1b0a'
    }
    return activeTrack.groundColor
  }, [isNightMode, activeTrack])

  return (
    <>
      {/* ── Sky ─────────────────────────────────────────── */}
      <Sky
        sunPosition={sunPosition}
        turbidity={activeTrack.decorations === 'rocks' ? 25 : isNightMode ? 20 : 8}
        rayleigh={activeTrack.decorations === 'rocks' ? 6 : isNightMode ? 5 : 2}
        mieCoefficient={activeTrack.decorations === 'rocks' ? 0.08 : isNightMode ? 0.05 : 0.005}
        mieDirectionalG={activeTrack.decorations === 'rocks' ? 0.98 : isNightMode ? 0.95 : 0.85}
        inclination={isNightMode ? 0.6 : 0.49}
        azimuth={0.25}
      />

      {/* ── Stars (for atmosphere) ────────────────────── */}
      <Stars
        radius={200}
        depth={60}
        count={isNightMode || activeTrack.decorations === 'city' ? 6000 : 3000}
        factor={isNightMode || activeTrack.decorations === 'city' ? 6 : 4}
        saturation={isNightMode || activeTrack.decorations === 'city' ? 0.4 : 0}
        fade
        speed={0.5}
      />

      {/* ── Clouds ───────────────────────────────────── */}
      <Cloud position={[-30, 25, -80]} speed={0.2} opacity={isNightMode ? 0.2 : activeTrack.decorations === 'rocks' ? 0.5 : 0.6} segments={10} />
      <Cloud position={[60, 30, -120]} speed={0.15} opacity={isNightMode ? 0.15 : activeTrack.decorations === 'rocks' ? 0.4 : 0.4} segments={8} />
      <Cloud position={[0, 28, -50]} speed={0.25} opacity={isNightMode ? 0.2 : activeTrack.decorations === 'rocks' ? 0.4 : 0.5} segments={12} />
      <Cloud position={[-70, 22, -60]} speed={0.1} opacity={isNightMode ? 0.1 : activeTrack.decorations === 'rocks' ? 0.3 : 0.3} segments={7} />

      {/* ── Lighting ─────────────────────────────────── */}
      {/* Ambient: soft global fill */}
      <ambientLight
        intensity={ambientIntensity}
        color={ambientColor}
      />

      {/* Sun/Moon: main directional with shadows */}
      <directionalLight
        ref={dirLightRef}
        position={[50, 40, 30]}
        intensity={dirLightIntensity}
        color={dirLightColor}
        castShadow={!isNightMode && activeTrack.decorations !== 'city'}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-bias={-0.0005}
      />

      {/* Fill light: sky-like fill from above */}
      <directionalLight
        position={[-30, 20, -20]}
        intensity={isNightMode ? 0.04 : activeTrack.decorations === 'city' ? 0.2 : 0.6}
        color={isNightMode ? '#182b5c' : activeTrack.decorations === 'city' ? '#5b0088' : '#a8c8ff'}
      />

      {/* Bounce light: warm low fill from ground */}
      <directionalLight
        position={[10, -5, 10]}
        intensity={isNightMode ? 0.01 : 0.3}
        color={isNightMode ? '#0a0d17' : activeTrack.decorations === 'rocks' ? '#d35400' : '#ffddaa'}
      />

      {/* Track accent: subtle colored rim lights */}
      <pointLight position={[0, 8, 0]} intensity={isNightMode ? 1.5 : 0.8} color="#00d4ff" distance={50} decay={2} />

      {/* ── Ground Plane ──────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[500, 500, 1, 1]} />
        <meshStandardMaterial
          map={grassTexture}
          roughness={activeTrack.decorations === 'city' ? 0.4 : 0.95}
          metalness={activeTrack.decorations === 'city' ? 0.8 : 0}
          color={groundColor}
        />
      </mesh>

      {/* ── Dust Particles ────────────────────────────── */}
      <Sparkles
        count={isNightMode || activeTrack.decorations === 'city' ? 250 : 150}
        size={isNightMode ? 2.0 : 1.5}
        speed={0.1}
        opacity={isNightMode ? 0.3 : 0.15}
        color={sparklesColor}
        scale={[100, 5, 100]}
        position={[0, 1, 0]}
      />
    </>
  )
}
