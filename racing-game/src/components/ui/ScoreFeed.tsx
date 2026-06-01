import { useGameStore } from '../../store/gameStore'

export default function ScoreFeed() {
  const events = useGameStore((s) => s.scoreEvents)
  const recent = [...events].reverse().slice(0, 5)

  return (
    <div className="flex flex-col gap-1 items-center select-none text-center h-20 overflow-hidden">
      {recent.map((ev, i) => {
        const age     = Date.now() - ev.timestamp
        const opacity = Math.max(0, 1 - i * 0.22 - age / 4000)
        const color   = ev.type === 'drift_combo' ? '#ff6600'
          : ev.type === 'best_lap'   ? '#39ff14'
          : ev.type === 'nitro_boost'? '#00d4ff'
          : '#ffffff'
        return (
          <div
            key={ev.id}
            className="font-game font-black text-xs md:text-sm tracking-widest transition-all duration-300 transform scale-in"
            style={{ color, opacity, textShadow: `0 0 8px ${color}60` }}
          >
            {ev.message}
          </div>
        )
      })}
    </div>
  )
}
