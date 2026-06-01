import { useEffect, useState } from 'react'
import { useGameStore } from '../../store/gameStore'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const setPhase = useGameStore((s) => s.setPhase)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 1200 // 1.2s smooth loading simulation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const current = Math.min((elapsed / duration) * 100, 100)
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
        const t = setTimeout(() => setPhase('menu'), 400)
        return () => clearTimeout(t)
      }
    }, 16) // ~60fps smooth progression

    return () => clearInterval(interval)
  }, [setPhase])

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black animate-fade-in">
      {/* Logo */}
      <div className="mb-10 text-center">
        <h1 className="font-game font-black text-5xl md:text-7xl neon-text-blue mb-2 tracking-wider">
          APEX<span className="neon-text-orange">RUSH</span>
        </h1>
        <p className="font-game text-white/30 text-sm uppercase tracking-[0.4em]">Racing Experience</p>
      </div>

      {/* Loading bar */}
      <div className="w-64 md:w-96 glass-panel border neon-border-blue p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-game text-[10px] text-white/40 uppercase tracking-widest">Loading</span>
          <span className="font-game text-sm neon-text-blue font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00d4ff, #bf00ff)',
              boxShadow: '0 0 10px #00d4ff',
            }}
          />
        </div>
        <p className="font-game text-[9px] text-white/30 mt-2 uppercase tracking-widest">
          {progress < 40
            ? 'Initializing engine systems...'
            : progress < 80
            ? 'Compiling shaders & procedural assets...'
            : 'Preloading textures... Ready!'}
        </p>
      </div>

      {/* Animated car silhouette */}
      <div className="mt-16 text-6xl animate-spin-slow opacity-20">🏎️</div>
    </div>
  )
}
