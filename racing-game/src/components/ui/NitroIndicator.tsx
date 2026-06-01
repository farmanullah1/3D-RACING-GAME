import { useGameStore } from '../../store/gameStore'

export default function NitroIndicator() {
  const nitro = useGameStore((s) => s.car.nitro)
  const isActive = useGameStore((s) => s.car.isNitroActive)
  const isDrifting = useGameStore((s) => s.car.isDrifting)

  const color = nitro > 60 ? '#00d4ff' : nitro > 25 ? '#ff6600' : '#ff073a'
  const label = isActive ? 'NITRO ACTIVE' : nitro < 10 ? 'RECHARGING' : 'NITRO READY'

  return (
    <div className={`glass-panel border p-2.5 min-w-[150px] ${isActive ? 'neon-border-orange animate-pulse-fast' : 'neon-border-blue'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">⚡ Boost</span>
        <span
          className="font-game text-[9px] font-bold uppercase tracking-wide"
          style={{ color, textShadow: `0 0 8px ${color}` }}
        >
          {label}
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-0.5">
        {Array.from({ length: 20 }).map((_, i) => {
          const filled = (i / 20) * 100 < nitro
          return (
            <div
              key={i}
              className="flex-1 h-3 rounded-[2px] transition-all duration-75"
              style={{
                background: filled ? color : 'rgba(255,255,255,0.06)',
                boxShadow: filled ? `0 0 4px ${color}80` : 'none',
              }}
            />
          )
        })}
      </div>

      {/* Percentage */}
      <div className="flex justify-end mt-1">
        <span
          className="font-game text-[9px] font-bold"
          style={{ color, textShadow: `0 0 8px ${color}` }}
        >
          {Math.round(nitro)}%
        </span>
      </div>

      {/* Drift indicator */}
      {isDrifting && (
        <div className="mt-1 text-center">
          <span className="font-game text-[9px] neon-text-orange animate-pulse-fast uppercase tracking-widest">
            🔥 DRIFTING
          </span>
        </div>
      )}
    </div>
  )
}
