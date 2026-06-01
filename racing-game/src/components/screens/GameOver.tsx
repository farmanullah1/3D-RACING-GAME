import { useGameStore } from '../../store/gameStore'
import { formatTime } from '../../utils/helpers'

export default function GameOver() {
  const { resetGame, car, game } = useGameStore()

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel border neon-border-blue p-8 text-center max-w-sm w-full mx-4">
        <h2 className="font-game font-black text-4xl neon-text-blue mb-1 tracking-wider">RACE OVER</h2>
        <p className="font-game text-white/30 text-xs uppercase tracking-widest mb-6">Final Results</p>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center glass-panel-bright px-4 py-2">
            <span className="font-game text-xs text-white/50 uppercase">Total Score</span>
            <span className="font-game font-bold neon-text-orange text-lg">{game.score.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center glass-panel-bright px-4 py-2">
            <span className="font-game text-xs text-white/50 uppercase">Best Lap</span>
            <span className="font-game font-bold neon-text-green text-sm">
              {isFinite(car.bestLapTime) ? formatTime(car.bestLapTime) : '--:--.---'}
            </span>
          </div>
          <div className="flex justify-between items-center glass-panel-bright px-4 py-2">
            <span className="font-game text-xs text-white/50 uppercase">Laps Completed</span>
            <span className="font-game font-bold text-white text-sm">{car.currentLap - 1} / {car.totalLaps}</span>
          </div>
          {game.score >= game.highScore && (
            <div className="text-center py-2 glass-panel-bright">
              <span className="font-game text-sm neon-text-orange animate-pulse-fast">🏆 NEW HIGH SCORE!</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => { resetGame(); setTimeout(() => useGameStore.getState().setPhase('racing'), 100) }}
            className="font-game font-bold text-xs uppercase tracking-widest py-3 glass-panel border neon-border-blue neon-text-blue hover:bg-white/10 transition-all"
          >
            ▶ RACE AGAIN
          </button>
          <button
            onClick={resetGame}
            className="font-game text-xs uppercase tracking-widest py-3 glass-panel border border-white/10 text-white/40 hover:text-white/60 transition-all"
          >
            ← MAIN MENU
          </button>
        </div>
      </div>
    </div>
  )
}
