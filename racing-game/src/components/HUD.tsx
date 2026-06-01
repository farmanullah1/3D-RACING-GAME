import { useState, useEffect } from 'react'
import Speedometer from './ui/Speedometer'
import LapTimer from './ui/LapTimer'
import NitroIndicator from './ui/NitroIndicator'
import Minimap from './ui/Minimap'
import FPSCounter from './ui/FPSCounter'
import ScoreFeed from './ui/ScoreFeed'
import { useMobileControls } from '../hooks/useMobileControls'
import { useGameStore } from '../store/gameStore'

/** Touch-friendly directional button */
function TouchBtn({
  label,
  controlKey,
  className = '',
}: {
  label: string
  controlKey: keyof import('../types/game.types').Controls
  className?: string
}) {
  const { press, release } = useMobileControls()
  return (
    <button
      className={`glass-panel border border-white/20 font-game font-bold text-white text-xl select-none touch-none active:bg-white/20 transition-all ${className}`}
      onTouchStart={press(controlKey)}
      onTouchEnd={release(controlKey)}
      onMouseDown={press(controlKey)}
      onMouseUp={release(controlKey)}
      onMouseLeave={release(controlKey)}
    >
      {label}
    </button>
  )
}

export default function HUD() {
  const phase = useGameStore((s) => s.game.phase)
  const isPaused = phase === 'paused'
  
  const isNightMode = useGameStore((s) => s.game.isNightMode)
  const isMuted = useGameStore((s) => s.game.isMuted)
  const quality = useGameStore((s) => s.game.quality)
  
  const toggleNightMode = useGameStore((s) => s.toggleNightMode)
  const toggleMuted = useGameStore((s) => s.toggleMuted)
  const updateGame = useGameStore((s) => s.updateGame)

  if (phase === 'menu' || phase === 'loading' || phase === 'finished') return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20 p-3 md:p-4">

      {/* ── Top Row ───────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start">
        {/* Top-left: Lap Timer + Quick HUD toggles */}
        <div className="flex flex-col gap-2 pointer-events-auto animate-slide-in">
          <LapTimer />
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2">
              <button
                onClick={toggleNightMode}
                className={`flex-1 font-game text-[9px] uppercase tracking-wider py-1.5 px-2.5 glass-panel border hover:bg-white/10 transition-all cursor-pointer active:scale-95 ${
                  isNightMode ? 'neon-border-orange neon-text-orange' : 'border-white/10 text-white/40'
                }`}
              >
                {isNightMode ? '🌙 Night' : '☀️ Day'}
              </button>
              <button
                onClick={toggleMuted}
                className={`flex-1 font-game text-[9px] uppercase tracking-wider py-1.5 px-2.5 glass-panel border hover:bg-white/10 transition-all cursor-pointer active:scale-95 ${
                  isMuted ? 'neon-border-red neon-text-red' : 'neon-border-blue neon-text-blue'
                }`}
              >
                {isMuted ? '🔇 Muted' : '🔊 Sound'}
              </button>
            </div>
            {/* Graphics Preset Selector */}
            <button
              onClick={() => {
                const nextQuality = quality === 'high' ? 'medium' : quality === 'medium' ? 'low' : 'high'
                updateGame({ quality: nextQuality })
              }}
              className="font-game text-[9px] uppercase tracking-wider py-1.5 px-2.5 glass-panel border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Quality:</span>
              <span className={quality === 'high' ? 'neon-text-green font-bold' : quality === 'medium' ? 'neon-text-orange font-bold' : 'neon-text-red font-bold'}>
                {quality === 'high' ? '🟢 H' : quality === 'medium' ? '🟡 M' : '🔴 L'}
              </span>
            </button>
          </div>
        </div>

        {/* Top-center: Score feed */}
        <div className="flex-1 flex justify-center pointer-events-none mt-1">
          <ScoreFeed />
        </div>

        {/* Top-right: Minimap + FPS */}
        <div className="flex flex-col gap-2 items-end pointer-events-auto animate-slide-in">
          <Minimap />
          {import.meta.env.DEV && <FPSCounter />}
        </div>
      </div>

      {/* ── Bottom Row ────────────────────────────────────────────────────── */}
      <div className="absolute bottom-3 md:bottom-4 left-3 right-3 md:left-4 md:right-4 flex justify-between items-end">
        {/* Bottom-left: Nitro */}
        <div className="pointer-events-auto animate-slide-in">
          <NitroIndicator />
        </div>

        {/* Bottom-center: Keyboard hint (desktop only) */}
        <div className="hidden md:flex glass-panel border border-white/8 px-4 py-2 text-center">
          <span className="font-game text-[9px] text-white/25 uppercase tracking-widest">
            ↑↓←→ Drive · SPACE Nitro · SHIFT Drift · ESC Pause
          </span>
        </div>

        {/* Bottom-right: Speedometer */}
        <div className="pointer-events-auto animate-slide-in">
          <Speedometer />
        </div>
      </div>

      {/* ── Mobile Touch Controls (shown only on mobile) ─────────────────── */}
      <div className="mobile-controls absolute bottom-4 left-0 right-0 pointer-events-auto px-4 flex justify-between items-end">
        {/* Left: D-pad */}
        <div className="grid grid-cols-3 gap-1" style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
          <div />
          <TouchBtn label="▲" controlKey="forward" className="w-14 h-14 rounded-lg text-2xl" />
          <div />
          <TouchBtn label="◄" controlKey="left" className="w-14 h-14 rounded-lg text-xl" />
          <TouchBtn label="▼" controlKey="backward" className="w-14 h-14 rounded-lg text-2xl" />
          <TouchBtn label="►" controlKey="right" className="w-14 h-14 rounded-lg text-xl" />
        </div>

        {/* Right: Action buttons */}
        <div className="flex flex-col gap-2 items-center">
          <TouchBtn label="⚡" controlKey="nitro" className="w-16 h-16 rounded-full text-3xl neon-border-orange" />
          <TouchBtn label="🔥" controlKey="drift" className="w-14 h-14 rounded-full text-2xl neon-border-red" />
        </div>
      </div>

      {/* ── Pause overlay ─────────────────────────────────────────────────── */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
          <div className="glass-panel border neon-border-blue p-8 text-center">
            <h2 className="font-game font-black text-4xl neon-text-blue mb-4 tracking-widest">PAUSED</h2>
            <p className="font-game text-white/40 text-xs uppercase tracking-widest mb-6">
              Press ESC or P to resume
            </p>
            <button
              onClick={() => useGameStore.getState().setPhase('racing')}
              className="font-game text-sm uppercase tracking-widest py-3 px-8 glass-panel border neon-border-blue neon-text-blue hover:bg-white/10 transition-all"
            >
              ▶ Resume
            </button>
          </div>
        </div>
      )}

      {/* ── Countdown ─────────────────────────────────────────────────────── */}
      {phase === 'countdown' && <CountdownOverlay />}
    </div>
  )
}

function CountdownOverlay() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(timer)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-xs transition-all duration-500 animate-fade-in">
      <div 
        className="font-game font-black text-9xl select-none"
        style={{
          color: count > 0 ? '#ff6600' : '#39ff14',
          textShadow: count > 0 ? '0 0 30px #ff6600' : '0 0 30px #39ff14',
          animation: 'pulse 0.8s ease-in-out infinite',
        }}
      >
        {count > 0 ? count : 'GO!'}
      </div>
    </div>
  )
}
