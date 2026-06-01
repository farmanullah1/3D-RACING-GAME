import { useGameStore } from '../../store/gameStore'

/** Animated score popup feed */
export default function ScoreFeed() {
  const scoreEvents = useGameStore((s) => s.scoreEvents)
  const recent = scoreEvents.slice(-4).reverse()

  return (
    <div className="flex flex-col items-center gap-1 pointer-events-none">
      {recent.map((event, i) => (
        <div
          key={event.timestamp}
          className="font-game text-sm font-bold px-3 py-1 glass-panel border border-white/10 animate-slide-in"
          style={{
            opacity: Math.max(0, 1 - i * 0.3),
            color: event.type === 'drift' ? '#ff6600'
              : event.type === 'clean_lap' ? '#39ff14'
              : '#00d4ff',
            textShadow: `0 0 10px currentColor`,
          }}
        >
          {event.message}
        </div>
      ))}
    </div>
  )
}
