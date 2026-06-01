import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'
import { useSettingsStore } from '../store/settingsStore'
import {
  initAudio, updateEngineSound as _updateEngineSound,
  muteAudio
} from '../utils/audio'

export function useAudio() {
  const muted = useSettingsStore((s) => s.audio.muted)

  useEffect(() => {
    const handleInteraction = () => { initAudio(); window.removeEventListener('click', handleInteraction) }
    window.addEventListener('click', handleInteraction)
    return () => window.removeEventListener('click', handleInteraction)
  }, [])

  useEffect(() => { muteAudio(muted) }, [muted])

  useFrame(() => {
    const { car, phase } = useGameStore.getState()
    const { audio } = useSettingsStore.getState()
    if (phase !== 'racing') return
    _updateEngineSound(car.engineRPM, audio.engineVolume * audio.masterVolume)
  })

  return { updateEngineSound: _updateEngineSound }
}
