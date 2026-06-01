import { useGameStore } from '../../store/gameStore'
import { useSettingsStore } from '../../store/settingsStore'

export default function DamageBar() {
  const damage = useGameStore((s) => s.car.damage)
  const show   = useSettingsStore((s) => s.display.showDamage)

  if (!show || damage < 5) return null
  const color = damage > 70 ? '#ff073a' : damage > 40 ? '#ff6600' : '#ffe600'

  return (
    <div className="hud-panel flex flex-col gap-1 min-w-[130px] select-none text-white border border-neon-red shadow-neon-red">
      <div className="flex justify-between items-center text-[9px] font-game font-black text-neon-red">
        <span>⚠ Damage</span>
        <span>{Math.round(damage)}%</span>
      </div>
      <div className="stat-bar-track h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="stat-bar-fill h-full rounded-full transition-all duration-300"
          style={{ width: `${damage}%`, backgroundColor: color }}
        />
      </div>
      {damage > 80 && (
        <span className="text-[7px] text-center font-black text-neon-red animate-pulse-fast mt-0.5">
          CRITICAL — PIT STOP
        </span>
      )}
    </div>
  )
}
