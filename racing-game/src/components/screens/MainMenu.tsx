import { useAuthStore }  from '../../store/authStore'
import { useGameStore }  from '../../store/gameStore'
import { playUIClick, playUIHover } from '../../utils/audio'

export default function MainMenu() {
  const user     = useAuthStore((s) => s.user)
  const isGuest  = useAuthStore((s) => s.isGuest)
  const logout   = useAuthStore((s) => s.logout)
  const setPhase = useGameStore((s) => s.setPhase)

  const nav = (phase: import('../../types').GamePhase) => { playUIClick(); setPhase(phase) }

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4">
      {/* Background neon orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-90 h-90 rounded-full bg-neon-blue/10 blur-[90px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[20%] w-90 h-90 rounded-full bg-neon-purple/10 blur-[100px] animate-pulse-slow" />
      </div>

      {/* Logo */}
      <div className="text-center mb-10 select-none animate-slide-down">
        <h1 className="font-game font-black text-6xl text-white tracking-widest leading-none">
          APEX<span className="text-neon-blue neon-blue">RUSH</span>
        </h1>
        <div className="font-game text-[10px] tracking-[0.45em] text-white/50 font-bold mt-1">
          PRO RACING EXPERIENCE
        </div>
        {user && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider text-neon-blue uppercase">
            <span>Welcome back, {user.avatar} {user.username}</span>
            <span className="text-white/20">·</span>
            <span className="text-neon-green">Lvl {user.level}</span>
          </div>
        )}
      </div>

      {/* Menu items */}
      <div className="w-full max-w-xs flex flex-col gap-3 select-none animate-scale-in">
        <button
          className="btn-primary text-base py-4 cursor-pointer"
          onMouseEnter={playUIHover}
          onClick={() => nav('car_select')}
        >
          🏁 START RACE
        </button>
        <button
          className="btn-secondary py-3 cursor-pointer"
          onMouseEnter={playUIHover}
          onClick={() => nav('garage')}
        >
          🚗 GARAGE
        </button>
        <button
          className="btn-secondary py-3 cursor-pointer"
          onMouseEnter={playUIHover}
          onClick={() => nav('leaderboard')}
        >
          🏆 LEADERBOARD
        </button>
        {!isGuest && (
          <button
            className="btn-secondary py-3 cursor-pointer"
            onMouseEnter={playUIHover}
            onClick={() => nav('profile')}
          >
            👤 PROFILE
          </button>
        )}
        <button
          className="btn-secondary py-3 cursor-pointer"
          onMouseEnter={playUIHover}
          onClick={() => nav('settings')}
        >
          ⚙️ SETTINGS
        </button>
        {!isGuest && (
          <button
            className="font-game text-[10px] text-white/25 uppercase tracking-widest py-2 hover:text-white/50 transition-colors cursor-pointer text-center"
            onClick={() => { logout(); setPhase('auth') }}
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Version */}
      <div className="absolute bottom-4 font-game text-[9px] text-white/20 tracking-widest uppercase">
        ApexRush Pro v2.0
      </div>
    </div>
  )
}
