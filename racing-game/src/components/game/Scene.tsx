import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import Environment from './Environment'
import Effects from './Effects'
import CameraController from './CameraController'
import GhostCar from './GhostCar'
import Particles from './Particles'
import { CityCircuit } from './tracks/CityCircuit'
import { MountainPass } from './tracks/MountainPass'
import { DesertDunes } from './tracks/DesertDunes'
import { NightNeon } from './tracks/NightNeon'
import PhantomGT from './cars/PhantomGT'
import VoltRacer from './cars/VoltRacer'
import InfernoV8 from './cars/InfernoV8'
import ShadowDrift from './cars/ShadowDrift'
import ArcticFox from './cars/ArcticFox'
import NeonBlaze from './cars/NeonBlaze'
import { useGameStore } from '../../store/gameStore'
import { useSettingsStore } from '../../store/settingsStore'
import { useKeyboard } from '../../hooks/useKeyboard'
import { useGameLoop } from '../../hooks/useGameLoop'
import { useAudio } from '../../hooks/useAudio'
import { getTrack } from '../../data/tracks'

const TRACK_COMPONENTS: Record<string, any> = {
  city_circuit:  CityCircuit,
  mountain_pass: MountainPass,
  desert_dunes:  DesertDunes,
  night_neon:    NightNeon,
}

const CAR_COMPONENTS: Record<string, any> = {
  phantom_gt:  PhantomGT,
  volt_racer:  VoltRacer,
  inferno_v8:  InfernoV8,
  shadow_drift: ShadowDrift,
  arctic_fox:  ArcticFox,
  neon_blaze:  NeonBlaze,
}

/** Must be inside Canvas to access R3F context */
function GameWorld() {
  useKeyboard()
  useGameLoop()
  useAudio()

  const phase    = useGameStore((s) => s.phase)
  const carId    = useGameStore((s) => s.selectedCarId)
  const trackId  = useGameStore((s) => s.selectedTrackId)
  const track    = getTrack(trackId)

  const TrackComp = TRACK_COMPONENTS[trackId] ?? CityCircuit
  const CarComp   = CAR_COMPONENTS[carId]     ?? PhantomGT
  const startPos  = track.controlPoints[0] as [number,number,number]

  const showGame  = ['racing','countdown','paused','results'].includes(phase)

  return (
    <>
      <Environment />
      {showGame && <TrackComp />}
      {showGame && <CarComp startPosition={startPos} startRotation={[0, Math.atan2(track.controlPoints[1][0] - startPos[0], track.controlPoints[1][2] - startPos[2]), 0]} />}
      {showGame && <GhostCar />}
      {showGame && <Particles />}
      <CameraController />
      <Effects />
    </>
  )
}

export default function Scene() {
  const quality  = useGameStore((s) => s.quality)
  const settings = useSettingsStore((s) => s.graphics)

  return (
    <Canvas
      shadows={settings.shadows}
      camera={{ fov: 75, near: 0.1, far: 600 }}
      dpr={quality === 'low' ? [0.5,1] : quality === 'medium' ? [1,1.5] : [1,2]}
      gl={{ antialias: quality !== 'low', powerPreference:'high-performance', alpha:false }}
      style={{ position:'absolute', inset:0 }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <GameWorld />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
