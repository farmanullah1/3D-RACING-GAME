import { useGameStore } from '../../store/gameStore'

export default function PositionIndicator() {
  const speed = useGameStore((s) => s.car.speed)
  const rev   = speed < 0

  return (
    <div className="hud-panel flex flex-col items-center justify-center min-w-[90px] select-none text-white border border-white/10">
      <span className="text-[8px] uppercase tracking-widest text-white/50">Position</span>
      <div className="font-game font-black text-2xl text-neon-blue">
        1st
      </div>
      {rev && (
        <span className="text-[8px] font-black text-neon-red animate-pulse mt-0.5">
          REVERSE
        </span>
      )}
    </div>
  )
}
