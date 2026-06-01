import { useGameStore } from '../../store/gameStore'
import { getCar } from '../../data/cars'

export default function NitroBar() {
  const nitro    = useGameStore((s) => s.car.nitro)
  const isActive = useGameStore((s) => s.car.isNitroActive)
  const isDrift  = useGameStore((s) => s.car.isDrifting)
  const carId    = useGameStore((s) => s.selectedCarId)
  const maxNitro = getCar(carId).stats.nitroCapacity

  const pct   = (nitro / maxNitro) * 100
  const color = nitro > maxNitro * 0.6 ? '#00d4ff' : nitro > maxNitro * 0.25 ? '#ff6600' : '#ff073a'
  const segs  = 20

  return (
    <div className={`hud-panel border min-w-[150px] flex flex-col gap-1.5 ${isActive ? 'border-neon-orange animate-glow-orange' : 'border-white/10'}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-game font-black text-[9px] tracking-wider text-white">⚡ Nitro</span>
        <span className="font-game font-bold text-[8px] text-white/50">
          {isActive ? 'ACTIVE' : nitro < maxNitro * 0.1 ? 'RECHARGE' : 'READY'}
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-0.5 h-3 items-center">
        {Array.from({length:segs}).map((_,i) => {
          const filled = (i / segs) * 100 < pct
          return (
            <div
              key={i}
              className="flex-1 h-full rounded-sm transition-all"
              style={{
                background: filled ? color : 'rgba(255,255,255,0.04)',
                boxShadow: filled && isActive ? `0 0 4px ${color}` : undefined
              }}
            />
          )
        })}
      </div>

      {/* Pct + drift indicator */}
      <div className="flex justify-between items-center text-[10px] font-mono font-bold">
        <span>
          <span className="text-white">{Math.round(pct)}</span>
          <span className="text-white/30">%</span>
        </span>
        {isDrift && (
          <span className="animate-pulse-fast text-neon-orange font-game text-[8px] font-black">
            🔥 DRIFT
          </span>
        )}
      </div>
    </div>
  )
}
