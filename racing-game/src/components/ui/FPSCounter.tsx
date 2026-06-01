import { useGameStore } from '../../store/gameStore'
import { useSettingsStore } from '../../store/settingsStore'

export default function FPSCounter() {
  const fps     = useGameStore((s) => s.fps)
  const quality = useGameStore((s) => s.quality)
  const show    = useSettingsStore((s) => s.display.showFPS)
  if (!show && !import.meta.env.DEV) return null
  const color = fps >= 55 ? '#39ff14' : fps >= 40 ? '#ff6600' : '#ff073a'
  return (
    <div className="hud-panel select-none text-[10px] font-mono flex items-center gap-1.5 border border-white/10 px-2 py-1 text-white">
      <span style={{ color }}>●</span>
      <span>{fps} FPS</span>
      <span className="text-white/30">·</span>
      <span className="uppercase text-white/50">{quality}</span>
    </div>
  )
}
