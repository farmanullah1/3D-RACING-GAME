import { useGameStore } from '../../store/gameStore'
import { formatTime } from '../../utils/helpers'
import { TRACKS } from '../../utils/tracks'

export default function LapTimer() {
  const lapTime = useGameStore((s) => s.car.lapTime)
  const bestLapTime = useGameStore((s) => s.car.bestLapTime)
  const currentLap = useGameStore((s) => s.car.currentLap)
  const totalLaps = useGameStore((s) => s.car.totalLaps)
  const score = useGameStore((s) => s.game.score)
  const highScore = useGameStore((s) => s.game.highScore)
  const selectedTrackId = useGameStore((s) => s.game.selectedTrackId)

  const activeTrack = TRACKS[selectedTrackId] || TRACKS[0]
  const isNewBest = isFinite(bestLapTime) && lapTime > bestLapTime * 0.9 && lapTime < bestLapTime

  const diffClass = activeTrack.difficulty === 'Easy'
    ? 'neon-border-green neon-text-green bg-emerald-950/20'
    : activeTrack.difficulty === 'Medium'
    ? 'neon-border-orange neon-text-orange bg-amber-950/20'
    : 'neon-border-red neon-text-red bg-rose-950/20'

  return (
    <div className="glass-panel border neon-border-blue p-3 min-w-[160px] animate-slide-in">
      {/* Track Multiplier badge */}
      <div className={`text-center border rounded py-1 px-2 mb-2.5 text-[8.5px] font-game font-bold uppercase tracking-widest ${diffClass}`}>
        {activeTrack.name} • {activeTrack.scoreMultiplier.toFixed(1)}x
      </div>

      {/* Lap counter */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-game text-[10px] text-white/40 uppercase tracking-widest">Lap</span>
        <span className="font-game font-bold text-lg neon-text-blue">
          {currentLap} <span className="text-white/30 text-sm">/ {totalLaps}</span>
        </span>
      </div>

      {/* Current lap time */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Current</span>
        <span className={`font-game text-sm font-semibold ${isNewBest ? 'neon-text-green' : 'text-white'}`}>
          {formatTime(lapTime)}
        </span>
      </div>

      {/* Best lap */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Best</span>
        <span className="font-game text-sm font-semibold neon-text-orange">
          {isFinite(bestLapTime) ? formatTime(bestLapTime) : '--:--.---'}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 my-1" />

      {/* Score */}
      <div className="flex items-center justify-between">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Score</span>
        <span className="font-game text-sm font-bold neon-text-blue">{score.toLocaleString()}</span>
      </div>
      {highScore > 0 && (
        <div className="flex items-center justify-between mt-0.5">
          <span className="font-game text-[8px] text-white/30 uppercase tracking-widest">Best</span>
          <span className="font-game text-[11px] text-white/50">{highScore.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}
