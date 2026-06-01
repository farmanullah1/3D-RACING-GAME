import { useGameStore } from '../../store/gameStore'
import { formatTime } from '../../utils/helpers'
import { useRef, useEffect } from 'react'

export default function LapTimer() {
  const currentLap    = useGameStore((s) => s.currentLap)
  const bestLap       = useGameStore((s) => s.bestLapTime)
  const score         = useGameStore((s) => s.score)
  const lapStartTime  = useGameStore((s) => s.currentLapStart)
  const phase         = useGameStore((s) => s.phase)
  const laps          = useGameStore((s) => s.totalLaps)
  const lapHistory    = useGameStore((s) => s.lapHistory)

  // Live current lap timer (not stored — computed from lapStart)
  const displayRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf: number
    const tick = () => {
      if (displayRef.current && phase === 'racing') {
        const elapsed = Date.now() - lapStartTime
        displayRef.current.textContent = formatTime(elapsed)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [lapStartTime, phase])

  return (
    <div className="hud-panel flex flex-col gap-1 md:gap-1.5 min-w-[140px] text-white select-none">
      {/* Lap counter */}
      <div className="flex justify-between items-center text-[10px] tracking-wider uppercase font-semibold text-white/50">
        <span>Lap</span>
        <span className="font-game font-black text-neon-blue text-sm">
          {currentLap} / {laps}
        </span>
      </div>
      {/* Live timer */}
      <div className="flex flex-col border-y border-white/5 py-1">
        <span className="text-[8px] uppercase tracking-widest text-white/40">Time</span>
        <div ref={displayRef} className="font-mono text-lg font-bold text-white tracking-tight">
          00:00.000
        </div>
      </div>
      {/* Best lap */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-[8px] uppercase tracking-widest text-white/40">Best</span>
        <span className="font-mono font-bold text-neon-green">
          {isFinite(bestLap) ? formatTime(bestLap) : '--:--.---'}
        </span>
      </div>
      {/* Previous laps */}
      {lapHistory.slice(-2).map((lap: any, i: number) => (
        <div key={i} className="flex justify-between items-center text-[10px] text-white/40 font-mono">
          <span>L{lap.lapNumber}</span>
          <span>{formatTime(lap.endTime ? (lap.endTime - lap.startTime) : 0)}</span>
        </div>
      ))}
      {/* Score */}
      <div className="flex justify-between items-center pt-1 border-t border-white/5">
        <span className="text-[8px] uppercase tracking-widest text-white/40">Score</span>
        <span className="font-mono font-bold text-neon-orange">{score.toLocaleString()}</span>
      </div>
    </div>
  )
}
