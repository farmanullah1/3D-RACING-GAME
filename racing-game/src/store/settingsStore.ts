import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SettingsState } from '../types'

const defaultSettings: SettingsState = {
  graphics: { quality: 'high', shadows: true, postProcessing: true, particles: true, motionBlur: false, reflections: true, fov: 75 },
  audio:    { masterVolume: 0.8, engineVolume: 0.7, musicVolume: 0.4, sfxVolume: 0.8, muted: false },
  controls: { invertY: false, sensitivity: 1.0, vibration: true },
  display:  { showFPS: false, showMinimap: true, showDamage: true, hudScale: 1.0 },
}

export interface SettingsActions {
  updateGraphics: (p: Partial<SettingsState['graphics']>) => void
  updateAudio:    (p: Partial<SettingsState['audio']>)    => void
  updateControls: (p: Partial<SettingsState['controls']>) => void
  updateDisplay:  (p: Partial<SettingsState['display']>)  => void
  resetSettings:  () => void
}

export const useSettingsStore = create<any>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateGraphics: (p: any) => set((s: any) => ({ graphics: { ...s.graphics, ...p } })),
      updateAudio:    (p: any) => set((s: any) => ({ audio:    { ...s.audio,    ...p } })),
      updateControls: (p: any) => set((s: any) => ({ controls: { ...s.controls, ...p } })),
      updateDisplay:  (p: any) => set((s: any) => ({ display:  { ...s.display,  ...p } })),
      resetSettings:  ()  => set(defaultSettings),
    }),
    { name: 'apexrush_settings' }
  )
)
