import { useGameStore } from '../../store/gameStore'

/**
 * Circular speedometer with arc progress indicator.
 * Shows speed in km/h, gear-like needle arc using SVG.
 */
export default function Speedometer() {
  const speed = useGameStore((s) => Math.abs(s.car.speed))
  const isNitro = useGameStore((s) => s.car.isNitroActive)
  const maxSpeed = 200

  const percentage = Math.min(speed / maxSpeed, 1)
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * 0.75  // 270 degree arc

  // Color shifts red as speed increases
  const speedColor = speed > 160 ? '#ff073a' : speed > 100 ? '#ff6600' : '#39ff14'

  return (
    <div className={`glass-panel p-3 select-none ${isNitro ? 'neon-border-orange animate-glow' : 'neon-border-green'} border`}>
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background arc */}
        <svg className="absolute inset-0 w-full h-full -rotate-[135deg]" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Speed arc */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={speedColor}
            strokeWidth="8"
            strokeDasharray={`${arcLength * percentage} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${speedColor})`,
              transition: 'stroke-dasharray 0.1s ease-out, stroke 0.3s ease',
            }}
          />
        </svg>

        {/* Center display */}
        <div className="flex flex-col items-center z-10">
          <span
            className="font-game font-bold text-2xl leading-none"
            style={{ color: speedColor, textShadow: `0 0 10px ${speedColor}` }}
          >
            {Math.round(speed)}
          </span>
          <span className="font-game text-[9px] text-white/50 mt-0.5 uppercase tracking-widest">km/h</span>
          {isNitro && (
            <span className="font-game text-[8px] neon-text-orange uppercase tracking-widest animate-pulse-fast mt-0.5">
              NITRO
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
