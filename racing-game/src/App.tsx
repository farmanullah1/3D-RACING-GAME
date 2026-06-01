import { Suspense, useEffect } from 'react'
import Scene from './components/game/Scene'
import HUD from './components/HUD'
import LoadingScreen from './components/screens/LoadingScreen'
import AuthScreen from './components/screens/AuthScreen'
import MainMenu from './components/screens/MainMenu'
import CarSelect from './components/screens/CarSelect'
import TrackSelect from './components/screens/TrackSelect'
import Garage from './components/screens/Garage'
import Leaderboard from './components/screens/Leaderboard'
import Settings from './components/screens/Settings'
import Profile from './components/screens/Profile'
import RaceResults from './components/screens/RaceResults'
import RaceCountdown from './components/screens/RaceCountdown'
import { useGameStore } from './store/gameStore'
import { useAuthStore } from './store/authStore'

export default function App() {
  const phase = useGameStore((s) => s.phase)
  const setPhase = useGameStore((s) => s.setPhase)
  const token = useAuthStore((s) => s.token)
  const isGuest = useAuthStore((s) => s.isGuest)

  useEffect(() => {
    // Intercept menu and force auth screen if not logged in / not guest
    if (phase === 'menu' && !token && !isGuest) {
      setPhase('auth')
    }
  }, [phase, token, isGuest, setPhase])

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none">
      {/* 3D Canvas — always rendered */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Loading screen */}
      {phase === 'loading' && <LoadingScreen />}

      {/* Auth screen */}
      {phase === 'auth' && <AuthScreen />}

      {/* Main menu */}
      {phase === 'menu' && <MainMenu />}

      {/* Car Selection */}
      {phase === 'car_select' && <CarSelect />}

      {/* Track Selection */}
      {phase === 'track_select' && <TrackSelect />}

      {/* Garage Screen */}
      {phase === 'garage' && <Garage />}

      {/* Leaderboard Screen */}
      {phase === 'leaderboard' && <Leaderboard />}

      {/* Settings Screen */}
      {phase === 'settings' && <Settings />}

      {/* Profile Screen */}
      {phase === 'profile' && <Profile />}

      {/* Race Countdown Overlay */}
      {phase === 'countdown' && <RaceCountdown />}

      {/* Race countdown, racing, and paused states show HUD */}
      {(phase === 'racing' || phase === 'countdown' || phase === 'paused') && <HUD />}

      {/* Results screen */}
      {phase === 'results' && <RaceResults />}
    </div>
  )
}
