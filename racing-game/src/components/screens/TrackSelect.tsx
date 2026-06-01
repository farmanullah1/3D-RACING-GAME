import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import { useAuthStore }     from '../../store/authStore'
import { playUIClick, playUIHover } from '../../utils/audio'
import { difficultyStars, formatTime } from '../../utils/helpers'

export default function TrackSelect() {
  const { selectTrack, selectedTrackId, setPhase, startRace } = useGameStore()
  const [selected, setSelected] = useState(selectedTrackId)
  const user = useAuthStore((s) => s.user)
  const track = TRACK_DEFINITIONS.find(t => t.id === selected) ?? TRACK_DEFINITIONS[0]

  const WEATHER_ICONS: Record<string, string> = { clear:'☀️', rain:'🌧️', fog:'🌫️', sandstorm:'🏜️' }
  const TIME_ICONS:    Record<string, string> = { day:'🌞', golden_hour:'🌅', night:'🌙' }

  return (
    <div className="absolute inset-0 flex flex-col bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <button className="btn-secondary px-4 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); setPhase('car_select') }}>
          ← Cars
        </button>
        <h2 className="font-game font-black text-2xl text-white tracking-widest">SELECT TRACK</h2>
        <button className="btn-primary px-6 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); selectTrack(selected); startRace() }}>
          RACE →
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Track cards grid */}
        <div className="lg:col-span-2 overflow-y-auto pr-2 flex flex-col gap-3 h-full pb-8">
          {TRACK_DEFINITIONS.map(t => (
            <div key={t.id}
              onClick={() => { setSelected(t.id); playUIClick() }}
              onMouseEnter={playUIHover}
              className="glass-card border cursor-pointer p-4 transition-all duration-300 flex items-center justify-between border-white/5"
              style={{ borderColor: selected === t.id ? t.accentColor : undefined, boxShadow: selected === t.id ? `0 0 15px ${t.accentColor}30` : undefined }}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl select-none">
                  {t.theme === 'city' ? '🏙️' : t.theme === 'mountain' ? '🏔️' : t.theme === 'desert' ? '🏜️' : '🌌'}
                </div>
                <div>
                  <h3 className="font-game font-black text-base text-white">{t.name}</h3>
                  <span className="text-[10px] tracking-widest text-white/40 uppercase">{t.subtitle}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-neon-orange font-mono text-xs">
                  {difficultyStars(t.difficulty)}
                </span>
                {user?.bestLapTimes[t.id] && (
                  <span className="font-mono text-[10px] text-white/40 font-bold uppercase">
                    PB: {formatTime(user.bestLapTimes[t.id])}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Track detail */}
        <div className="glass border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-full bg-ui-surface overflow-y-auto">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">
                {track.theme === 'city' ? '🏙️' : track.theme === 'mountain' ? '🏔️' : track.theme === 'desert' ? '🏜️' : '🌌'}
              </div>
              <div>
                <h3 className="font-game font-black text-xl text-white">{track.name}</h3>
                <span className="text-[10px] tracking-widest text-neon-blue uppercase font-bold">{track.subtitle}</span>
              </div>
            </div>
            
            <p className="text-xs text-white/50 leading-relaxed mb-6 font-medium">
              {track.description}
            </p>

            {/* Track meta */}
            <div className="flex flex-col gap-3.5 border-t border-b border-white/5 py-4 mb-6">
              {[
                ['🛣️ Surface', track.surface.replace('_',' ')],
                [`${TIME_ICONS[track.timeOfDay]} Time`, track.timeOfDay.replace('_',' ')],
                [`${WEATHER_ICONS[track.weather]} Weather`, track.weather],
                ['📏 Difficulty', `${track.difficulty}/5`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center text-xs">
                  <span className="text-white/40 uppercase tracking-widest text-[9px] font-semibold">{label}</span>
                  <span className="text-white font-bold capitalize">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="glass border border-white/5 px-4 py-3 rounded-xl flex justify-between items-center text-xs">
              <span className="text-white/40 font-game font-black text-[9px] uppercase tracking-wider">🏆 Track Record</span>
              <span className="font-mono font-bold text-neon-green">{formatTime(track.bestLapRecord)}</span>
            </div>
            {user?.bestLapTimes[track.id] && (
              <div className="glass border border-white/5 px-4 py-3 rounded-xl flex justify-between items-center text-xs mt-2">
                <span className="text-white/40 font-game font-black text-[9px] uppercase tracking-wider">Your Best</span>
                <span className="font-mono font-bold text-neon-orange">{formatTime(user.bestLapTimes[track.id])}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
