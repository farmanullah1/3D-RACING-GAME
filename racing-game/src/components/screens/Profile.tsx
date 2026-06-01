import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useGameStore } from '../../store/gameStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import { ACHIEVEMENTS } from '../../data/achievements'
import { formatTime } from '../../utils/helpers'
import { playUIClick, playUIHover } from '../../utils/audio'

const EMOJIS = ['🦊','🐆','🐺','🦁','🐉','🦅','🦋','🐬','🦂','🐍','🏎️','⚡','🔥','👤','✨','🏆']

export default function Profile() {
  const user = useAuthStore((s) => s.user)
  const setPhase = useGameStore((s) => s.setPhase)
  const { updateUser } = useAuthStore()

  const [username, setUsername] = useState(user?.username ?? '')
  const [avatar, setAvatar] = useState(user?.avatar ?? '🦊')
  const [isEditing, setIsEditing] = useState(false)
  const [showAvatarSelect, setShowAvatarSelect] = useState(false)

  if (!user) return null

  const handleSave = () => {
    if (username.trim().length >= 2) {
      updateUser({ username: username.trim(), avatar })
      setIsEditing(false)
      playUIClick()
    }
  }

  const handleAvatarClick = (emoji: string) => {
    setAvatar(emoji)
    setShowAvatarSelect(false)
    updateUser({ avatar: emoji })
    playUIClick()
  }

  // Calculate stats
  const winRate = user.totalRaces ? Math.round((user.totalWins / user.totalRaces) * 100) : 0

  return (
    <div className="absolute inset-0 flex flex-col bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4 select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <button className="btn-secondary px-4 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); setPhase('menu') }}>
          ← Back
        </button>
        <h2 className="font-game font-black text-2xl text-white tracking-widest">DRIVER PROFILE</h2>
        <div className="w-[80px]" /> {/* Spacer */}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto pb-12 animate-scale-in">
        {/* Left column: Avatar and Account info */}
        <div className="glass border border-white/10 rounded-2xl p-6 bg-ui-surface flex flex-col gap-6 items-center text-center h-fit">
          <div className="relative">
            <div 
              onClick={() => { playUIClick(); setShowAvatarSelect(!showAvatarSelect) }}
              onMouseEnter={playUIHover}
              className="w-24 h-24 rounded-full bg-glass-100 border border-white/15 flex items-center justify-center text-5xl cursor-pointer hover:border-neon-blue hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {avatar}
            </div>
            <button 
              onClick={() => { playUIClick(); setShowAvatarSelect(!showAvatarSelect) }}
              className="absolute bottom-0 right-0 bg-neon-blue text-black font-black text-[9px] px-2 py-0.5 rounded-full border border-black cursor-pointer uppercase shadow"
            >
              EDIT
            </button>
          </div>

          {/* Avatar selector modal/overlay inside left panel */}
          {showAvatarSelect && (
            <div className="glass-sm border border-white/10 p-3 rounded-xl w-full grid grid-cols-4 gap-2 animate-scale-in bg-ui-panel">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => handleAvatarClick(e)}
                  className="w-10 h-10 rounded-full hover:bg-glass-100 flex items-center justify-center text-2xl cursor-pointer transition-all active:scale-90"
                >
                  {e}
                </button>
              ))}
            </div>
          )}

          <div className="w-full">
            {isEditing ? (
              <div className="flex gap-2 w-full justify-center">
                <input
                  type="text"
                  maxLength={15}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="game-input text-center max-w-[180px]"
                />
                <button className="btn-primary py-2 px-4 text-xs font-semibold w-auto" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-game font-black text-xl text-white tracking-wide">{user.username}</h3>
                <button 
                  onClick={() => { playUIClick(); setIsEditing(true) }}
                  onMouseEnter={playUIHover}
                  className="text-neon-blue hover:text-white text-xs cursor-pointer"
                >
                  ✏️
                </button>
              </div>
            )}
            <span className="text-[10px] text-white/40 tracking-wider font-semibold block mt-1">{user.email}</span>
          </div>

          <div className="w-full border-t border-white/5 pt-4 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-game font-bold text-white/50 uppercase tracking-widest text-[9px]">Driver Level</span>
              <span className="font-game font-black text-neon-green text-sm">LEVEL {user.level}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-game font-bold text-white/50 uppercase tracking-widest text-[9px]">Experience Points</span>
              <span className="font-mono text-white/80 font-bold">{user.xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>

        {/* Middle column: Career Stats & Achievements */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Races', value: user.totalRaces, color: '#00d4ff', shadow: 'shadow-neon-blue' },
              { label: 'Total Wins', value: user.totalWins, color: '#ffe600', shadow: 'shadow-neon-yellow' },
              { label: 'Win Rate', value: `${winRate}%`, color: '#39ff14', shadow: 'shadow-neon-green' },
              { label: 'XP Reward', value: user.xp, color: '#bf00ff', shadow: 'shadow-neon-purple' },
            ].map((s, i) => (
              <div key={i} className="glass border border-white/10 rounded-2xl p-4 bg-ui-surface flex flex-col gap-1 items-center justify-center text-center">
                <span className="font-game text-[9px] uppercase tracking-widest text-white/40">{s.label}</span>
                <span className="font-mono text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Tab Content: Laps & Achievements */}
          <div className="flex-1 glass border border-white/10 rounded-2xl p-6 bg-ui-surface flex flex-col gap-5 overflow-hidden">
            {/* Laps */}
            <div>
              <h3 className="font-game font-black text-xs text-neon-blue uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
                🏆 Best Lap Times
              </h3>
              <div className="flex flex-col gap-2">
                {TRACK_DEFINITIONS.map(track => {
                  const time = user.bestLapTimes[track.id]
                  return (
                    <div key={track.id} className="glass border border-white/5 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-game font-bold text-sm text-white block">{track.name}</span>
                        <span className="text-[8px] uppercase tracking-widest text-white/30 font-medium">Difficulty: {'★'.repeat(track.difficulty)}</span>
                      </div>
                      <span className={`font-mono font-bold text-sm ${time ? 'text-neon-green' : 'text-white/20'}`}>
                        {time && time < Infinity ? formatTime(time) : 'No time recorded'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="flex-1 overflow-y-auto mt-2">
              <h3 className="font-game font-black text-xs text-neon-orange uppercase tracking-widest border-b border-white/5 pb-2 mb-3">
                🏅 Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ACHIEVEMENTS.map(ach => {
                  // Fake race state to evaluate condition
                  const mockRace = {
                    selectedCarId: 'phantom_gt',
                    selectedTrackId: 'city_circuit',
                    car: { speed: 0, isDrifting: false } as any,
                    bestLapTime: Infinity,
                  } as any
                  const unlocked = ach.condition(user, mockRace)

                  return (
                    <div key={ach.id} className={`glass border p-3 rounded-xl flex items-center gap-3 transition-all ${
                      unlocked ? 'border-neon-orange/30 bg-neon-orange/5' : 'border-white/5 opacity-55'
                    }`}>
                      <span className="text-2xl select-none">{ach.icon}</span>
                      <div className="flex-1">
                        <span className="font-game font-bold text-[11px] text-white block leading-tight">{ach.name}</span>
                        <span className="text-[9px] text-white/40 block leading-tight mt-0.5">{ach.description}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[9px] font-black text-neon-orange block">+{ach.xpReward} XP</span>
                        <span className={`text-[7px] font-game font-black uppercase px-1 py-0.5 rounded ${
                          unlocked ? 'bg-neon-orange/20 text-neon-orange' : 'bg-white/10 text-white/30'
                        }`}>
                          {unlocked ? 'UNLOCKED' : 'LOCKED'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
