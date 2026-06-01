import { useGameStore } from '../../store/gameStore'
import { getCar } from '../../data/cars'

/**
 * Circular arc speedometer with animated needle, RPM, gear indicator.
 * SVG arc path driven by speed percentage.
 */
export default function Speedometer() {
  const speed    = useGameStore((s) => Math.abs(s.car.speed))
  const rpm      = useGameStore((s) => s.car.engineRPM)
  const isNitro  = useGameStore((s) => s.car.isNitroActive)
  const carId    = useGameStore((s) => s.selectedCarId)
  const maxSpeed = getCar(carId).stats.topSpeed

  const pct  = Math.min(speed / maxSpeed, 1)
  const R    = 52
  const CIRC = 2 * Math.PI * R
  const ARC  = CIRC * 0.75   // 270° sweep
  const rpmPct = rpm / 8000

  // Color: green → yellow → red
  const hue   = 120 - pct * 120
  const color = `hsl(${hue},100%,55%)`

  // Gear estimate (simplified)
  const gear = speed < 30 ? 1 : speed < 60 ? 2 : speed < 100 ? 3 : speed < 140 ? 4 : speed < 170 ? 5 : 6

  return (
    <div className={`hud-panel relative select-none w-32 h-32 md:w-36 md:h-36 flex items-center justify-center border rounded-full ${isNitro ? 'border-neon-orange animate-glow-orange' : 'border-white/10'}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer ring SVG */}
        <svg className="w-full h-full transform -rotate-225" viewBox="0 0 120 120">
          {/* Background track */}
          <circle
            cx="60" cy="60" r={R}
            fill="transparent"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
            strokeDasharray={`${ARC} ${CIRC}`}
            strokeLinecap="round"
          />
          {/* RPM inner track */}
          <circle
            cx="60" cy="60" r={R - 8}
            fill="transparent"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="3"
            strokeDasharray={`${ARC} ${CIRC}`}
          />
          {/* RPM fill */}
          <circle
            cx="60" cy="60" r={R - 8}
            fill="transparent"
            stroke={rpm > 6000 ? '#ff073a' : '#ff6600'}
            strokeWidth="4"
            strokeDasharray={`${(CIRC-14)*0.75*rpmPct} ${CIRC}`}
            strokeLinecap="round"
            style={{ filter:`drop-shadow(0 0 3px ${rpm > 6000 ? '#ff073a' : '#ff6600'})`, transition:'stroke-dasharray 0.08s' }}
          />
          {/* Speed arc */}
          <circle
            cx="60" cy="60" r={R}
            fill="transparent"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${ARC * pct} ${CIRC}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${color})`, transition: 'stroke-dasharray 0.08s' }}
          />
        </svg>
        {/* Center Text Panel */}
        <div className="absolute flex flex-col items-center text-center font-game select-none pointer-events-none">
          <span className="text-2xl md:text-3xl font-black text-white leading-none tracking-tighter">
            {Math.round(speed)}
          </span>
          <span className="text-[8px] tracking-wider text-white/55 uppercase font-medium">km/h</span>
          <span className="text-xs md:text-sm font-bold text-neon-blue mt-0.5">G{gear}</span>
          {isNitro && (
            <span className="text-[7px] font-black text-neon-orange animate-pulse">NITRO</span>
          )}
        </div>
      </div>
    </div>
  )
}
