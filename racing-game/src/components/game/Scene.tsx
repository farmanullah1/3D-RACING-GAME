import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import Environment from './Environment'
import Track from './Track'
import Car from './Car'
import CameraController from './CameraController'
import Effects from './Effects'
import { useGameStore } from '../../store/gameStore'
import { useKeyboard } from '../../hooks/useKeyboard'
import { useGameLoop } from '../../hooks/useGameLoop'

/** Inner component (has access to R3F context) */
function GameWorld() {
  useKeyboard()
  useGameLoop()
  return (
    <>
      <Environment />
      <Track />
      <Car />
      <CameraController />
      <Effects />
    </>
  )
}

export default function Scene() {
  const quality = useGameStore((s) => s.game.quality)

  return (
    <Canvas
      shadows
      camera={{ fov: 75, near: 0.1, far: 500 }}
      dpr={quality === 'low' ? [0.5, 1] : quality === 'medium' ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: quality !== 'low',
        powerPreference: 'high-performance',
        alpha: false,
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.5, restitution: 0.1 }}>
          <GameWorld />
        </Physics>
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
