import { useEffect, useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { playCountdown } from '../../utils/audio'

export default function RaceCountdown() {
  const [count, setCount] = useState(3)
  const setPhase = useGameStore((s) => s.setPhase)

  useEffect(() => {
    playCountdown(3)
    const timers = [3,2,1,0].map((n, i) =>
      setTimeout(() => {
        setCount(n === 0 ? 0 : n)
        playCountdown(n)
        if (n === 0) {
          setTimeout(() => setPhase('racing'), 600)
        }
      }, i * 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [setPhase])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/35 backdrop-blur-[2px] z-20 overflow-hidden select-none">
      <div
        className="font-game font-black text-9xl tracking-tight"
        style={{
          color: count === 0 ? '#39ff14' : '#ff6600',
          textShadow: count === 0 ? '0 0 40px #39ff14' : '0 0 40px #ff6600',
          animation: 'count-flip 0.3s ease-in-out'
        }}
      >
        {count === 0 ? 'GO!' : count}
      </div>
      {count > 0 && (
        <span className="font-game text-xs tracking-[0.4em] text-white/50 font-bold uppercase mt-6 animate-pulse">
          GET READY
        </span>
      )}
    </div>
  )
}
