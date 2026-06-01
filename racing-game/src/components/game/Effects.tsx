import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useGameStore } from '../../store/gameStore'

/**
 * Post-processing effects stack.
 * Quality adapts based on store's game.quality setting.
 */
export default function Effects() {
  const quality = useGameStore((s) => s.game.quality)
  const isDrifting = useGameStore((s) => s.car.isDrifting)
  const isNitro = useGameStore((s) => s.car.isNitroActive)
  const speed = useGameStore((s) => s.car.speed)

  // Dynamic effect intensity based on speed and state
  const bloomIntensity = quality === 'low' ? 0.8 : isDrifting ? 2.5 : isNitro ? 3.0 : 1.5
  const chromaOffset = speed > 120 ? 0.004 : isNitro ? 0.006 : 0.002

  if (quality === 'low') {
    return (
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>
    )
  }

  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.05}
        bokehScale={quality === 'high' ? 3 : 1.5}
        height={quality === 'high' ? 480 : 240}
      />
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.7}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[chromaOffset, chromaOffset] as unknown as import('three').Vector2}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.35} darkness={0.8} />
    </EffectComposer>
  )
}
