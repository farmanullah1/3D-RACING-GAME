import { useGameStore }  from '../../store/gameStore'
import { useAuthStore }  from '../../store/authStore'
import { formatTime }    from '../../utils/helpers'
import { playLapComplete, playUnlock } from '../../utils/audio'
import { useEffect, useState } from 'react'
import { getCar }  from '../../data/cars'
import { getTrack } from '../../data/tracks'

export default function RaceResults() {
  const { score, bestLapTime, lapHistory, selectedCarId, selectedTrackId, resetRace, startRace } = useGameStore()
  const { user, completeRace, addXP } = useAuthStore()
  const [showUnlock, setShowUnlock] = useState<string | null>(null)

  const car   = getCar(selectedCarId)
  const track = getTrack(selectedTrackId)
  const xpGained = Math.floor(score / 10) + (lapHistory.length >= track.laps ? 200 : 50)

  useEffect(() => {
    playLapComplete()
    if (user) {
      completeRace(selectedTrackId, bestLapTime, true)
      addXP(xpGained)
      // Check for new unlocks
      const newRaces = (user.totalRaces ?? 0) + 1
      const unlockable = ['inferno_v8','shadow_drift','arctic_fox','neon_blaze']
        .find(id => {
          const def = getCar(id)
          return def.unlockRequirement === newRaces && !user.unlockedCars.includes(id)
        })
      if (unlockable) {
        setTimeout(() => { setShowUnlock(unlockable); playUnlock() }, 1200)
      }
    }
  }, [])

  const lapCount = lapHistory.length

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4 select-none">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[25%] w-80 h-80 rounded-full bg-neon-blue/10 blur-[80px]" />
        <div className="absolute bottom-[20%] right-[25%] w-90 h-90 rounded-full bg-neon-purple/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-4 animate-scale-in z-10">
        <div className="glass border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-glass-lg bg-ui-surface">
          {/* Header */}
          <div className="text-center">
            <div className="text-4xl mb-1 select-none">
              {lapCount >= track.laps ? '🏆' : '⏱️'}
            </div>
            <h2 className="font-game font-black text-2xl text-white tracking-widest leading-none">
              {lapCount >= track.laps ? 'RACE COMPLETE' : 'RACE OVER'}
            </h2>
            <span className="font-game text-[9px] tracking-widest text-white/40 uppercase mt-1.5 block">
              {track.name} · {car.emoji} {car.name}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ['🏁 Best Lap',     formatTime(bestLapTime),           'text-neon-orange'],
              ['📊 Total Score',  score.toLocaleString() + ' pts',   'text-neon-blue'],
              ['✨ XP Gained',    `+${xpGained} XP`,                 'text-neon-green'],
              ['📏 Laps Done',    `${lapCount} / ${track.laps}`,      'text-white'],
            ].map(([label, val, colorCls]) => (
              <div key={label} className="glass border border-white/5 p-3 rounded-xl flex flex-col gap-0.5">
                <span className="text-[8px] uppercase tracking-widest text-white/40 font-semibold">{label}</span>
                <span className={`font-mono font-bold text-sm ${colorCls}`}>{val}</span>
              </div>
            ))}
          </div>

          {/* Lap breakdown */}
          {lapHistory.length > 0 && (
            <div className="glass border border-white/5 p-4 rounded-xl flex flex-col gap-2">
              <h3 className="font-game font-black text-[9px] uppercase tracking-wider text-white/50 mb-1">Lap Times</h3>
              {lapHistory.map((lap: any, i: number) => {
                const t = lap.endTime ? lap.endTime - lap.startTime : 0
                const isBest = t === bestLapTime
                return (
                  <div key={i} className={`flex justify-between items-center text-xs ${isBest ? 'text-neon-orange font-bold' : 'text-white/60'}`}>
                    <span className="font-game text-[9px] tracking-wider">LAP {lap.lapNumber}</span>
                    <span className="font-mono">{formatTime(t)}</span>
                    {isBest && <span className="text-[8px] font-black text-neon-orange bg-neon-orange/10 px-1.5 py-0.5 rounded-md">BEST</span>}
                  </div>
                )
              })}
            </div>
          )}

          {/* Car unlock notification */}
          {showUnlock && (
            <div className="glass border border-neon-green px-4 py-3.5 rounded-xl flex items-center gap-4 bg-neon-green/5 animate-pulse">
              <div className="text-3xl">{getCar(showUnlock).emoji}</div>
              <div>
                <h4 className="font-game font-black text-sm text-neon-green leading-none">UNLOCKED CAR!</h4>
                <span className="text-[10px] text-white/70 font-semibold mt-1 block">You unlocked the {getCar(showUnlock).name}!</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button className="btn-primary w-full cursor-pointer" onClick={() => { startRace() }}>
              🔄 Race Again
            </button>
            <button className="btn-secondary w-full cursor-pointer" onClick={() => resetRace()}>
              ← Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
