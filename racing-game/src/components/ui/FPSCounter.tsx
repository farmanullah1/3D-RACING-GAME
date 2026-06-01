import { useGameStore } from '../../store/gameStore'

/** Development-only FPS + quality indicator */
export default function FPSCounter() {
  const fps = useGameStore((s) => s.game.fps)
  const quality = useGameStore((s) => s.game.quality)

  const fpsColor = fps >= 55 ? '#39ff14' : fps >= 40 ? '#ff6600' : '#ff073a'
  const qualityEmoji = quality === 'high' ? '🟢' : quality === 'medium' ? '🟡' : '🔴'

  return (
    <div className="glass-panel border border-white/10 px-2 py-1 text-right">
      <div className="font-game text-[10px] font-bold" style={{ color: fpsColor }}>
        {fps} FPS
      </div>
      <div className="font-game text-[8px] text-white/40 uppercase">
        {qualityEmoji} {quality}
      </div>
    </div>
  )
}
