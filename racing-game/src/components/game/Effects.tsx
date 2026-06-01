import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { useSettingsStore } from '../../store/settingsStore'

export default function Effects() {
  const quality     = useGameStore((s) => s.quality)
  const isDrifting  = useGameStore((s) => s.car.isDrifting)
  const isNitro     = useGameStore((s) => s.car.isNitroActive)
  const speed       = useGameStore((s) => s.car.speed)
  const trackId     = useGameStore((s) => s.selectedTrackId)
  const settings    = useSettingsStore((s) => s.graphics)

  if (!settings.postProcessing || quality === 'low') {
    return (
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.5} />
        <Vignette offset={0.3} darkness={0.6} />
      </EffectComposer>
    )
  }

  const isNeon      = trackId === 'night_neon'
  const chromaOff   = speed > 150 ? 0.005 : isNitro ? 0.007 : isDrifting ? 0.004 : 0.002
  const bloomInt    = isNeon ? 2.5 : isDrifting ? 2.2 : isNitro ? 3.0 : 1.4

  return (
    <EffectComposer multisampling={quality === 'high' ? 4 : 0}>
      <DepthOfField focusDistance={0.02} focalLength={0.05}
        bokehScale={quality === 'high' ? 2.5 : 1.5}
        height={quality === 'high' ? 480 : 240} />
      <Bloom intensity={bloomInt} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(chromaOff, chromaOff)}
      />
      <Vignette offset={0.35} darkness={0.75} />
    </EffectComposer>
  )
}
