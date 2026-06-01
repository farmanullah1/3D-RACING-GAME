import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useAuthStore } from '../../store/authStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import { formatTime } from '../../utils/helpers'
import { playUIClick, playUIHover } from '../../utils/audio'

// Generate fake leaderboard entries for demo
function generateLeaderboard(trackId: string) {
  const NAMES = ['ShadowDrifter','NeonKing','ApexHunter','BlazeMaster','VoltRider',
                 'IceViper','DustDevil','NightRacer','SpeedFreak','GhostLap']
  const CARS  = ['phantom_gt','volt_racer','inferno_v8','shadow_drift','neon_blaze']
  const base  = TRACK_DEFINITIONS.find(t => t.id === trackId)?.bestLapRecord ?? 80000
  return NAMES.map((name, i) => ({
    rank: i+1,
    username: name,
    avatar: ['🦊','🐆','🐺','🦁','🐉','🦅','🦋','🐬','🦂','🐍'][i],
    carId: CARS[i % CARS.length],
    lapTime: base + i * 1200 + Math.random()*800|0,
    date: Date.now() - i * 86400000,
    isPlayer: false,
  }))
}

export default function Leaderboard() {
  const user = useAuthStore((s) => s.user)
  const setPhase = useGameStore((s) => s.setPhase)
  const selectedTrackId = useGameStore((s) => s.selectedTrackId)
  
  const [trackTab, setTrackTab] = useState(selectedTrackId)

  const rawEntries = generateLeaderboard(trackTab)

  // Inject player's best time if they have one
  const playerTime = user?.bestLapTimes[trackTab]
  const entries = [...rawEntries]
  if (playerTime && playerTime < Infinity) {
    const playerEntry = {
      rank: 0,
      username: user.username,
      avatar: user.avatar,
      carId: user.favoriteCarId ?? 'phantom_gt',
      lapTime: playerTime,
      date: Date.now(),
      isPlayer: true,
    }
    entries.push(playerEntry)
    // Sort and re-rank
    entries.sort((a, b) => a.lapTime - b.lapTime)
    entries.forEach((e, idx) => {
      e.rank = idx + 1
    })
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4 select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <button className="btn-secondary px-4 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); setPhase('menu') }}>
          ← Back
        </button>
        <h2 className="font-game font-black text-2xl text-white tracking-widest">LEADERBOARD</h2>
        <div className="w-[80px]" /> {/* spacer */}
      </div>

      {/* Track tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-white/5 animate-slide-down">
        {TRACK_DEFINITIONS.map(t => (
          <button
            key={t.id}
            onClick={() => { setTrackTab(t.id); playUIClick() }}
            onMouseEnter={playUIHover}
            className={`font-game text-[9px] uppercase tracking-widest px-4 py-2.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              trackTab === t.id ? 'bg-neon-blue/10 border-neon-blue text-neon-blue font-bold shadow-neon-blue' : 'border-white/5 text-white/40 hover:text-white/60'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Leaderboard entries */}
      <div className="flex-1 glass border border-white/10 rounded-2xl p-4 md:p-6 bg-ui-surface overflow-y-auto h-full pb-8 animate-scale-in">
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4 text-[9px] font-game font-black text-white/40 uppercase tracking-wider">
          <span>Rank & Driver</span>
          <span>Lap Time</span>
        </div>

        <div className="flex flex-col gap-2">
          {entries.slice(0, 10).map((entry) => {
            const rankColor = entry.rank === 1 ? 'text-neon-gold' : entry.rank === 2 ? 'text-white/80' : entry.rank === 3 ? 'text-neon-orange' : 'text-white/40'
            return (
              <div
                key={entry.username}
                className={`glass border p-3 rounded-xl flex items-center justify-between transition-all ${
                  entry.isPlayer ? 'border-neon-blue bg-neon-blue/5 shadow-inner-neon' : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`font-game font-black text-base w-6 text-center ${rankColor}`}>
                    #{entry.rank}
                  </span>
                  <span className="text-xl select-none">{entry.avatar}</span>
                  <div>
                    <span className="font-game font-bold text-sm text-white flex items-center gap-2">
                      {entry.username}
                      {entry.isPlayer && (
                        <span className="text-[7px] font-black text-neon-blue bg-neon-blue/15 px-1 py-0.5 rounded">YOU</span>
                      )}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-white/30 font-medium">
                      {entry.carId.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <span className={`font-mono font-bold text-sm ${entry.rank === 1 ? 'text-neon-gold' : 'text-neon-blue'}`}>
                  {formatTime(entry.lapTime)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export { generateLeaderboard }
