import { Suspense } from 'react'
import Scene from './components/game/Scene'
import HUD from './components/HUD'
import LoadingScreen from './components/screens/LoadingScreen'
import MainMenu from './components/screens/MainMenu'
import GameOver from './components/screens/GameOver'
import EngineAudio from './components/game/EngineAudio'
import { useGameStore } from './store/gameStore'

export default function App() {
  const phase = useGameStore((s) => s.game.phase)

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none">
      {/* Procedural Engine Synthesizer */}
      <EngineAudio />

      {/* 3D Canvas — always rendered */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Loading screen */}
      {phase === 'loading' && <LoadingScreen />}

      {/* Main menu */}
      {phase === 'menu' && <MainMenu />}

      {/* In-game HUD */}
      {(phase === 'racing' || phase === 'countdown' || phase === 'paused') && <HUD />}

      {/* Game over / finish screen */}
      {phase === 'finished' && <GameOver />}
    </div>
  )
}
