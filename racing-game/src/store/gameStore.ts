import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { GameStore, CarState, GameState, Controls } from '../types/game.types'

// ─── Default States ────────────────────────────────────────────────────────────
const defaultCar: CarState = {
  position: { x: 0, y: 0.5, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  speed: 0,
  nitro: 100,
  lapTime: 0,
  bestLapTime: Infinity,
  currentLap: 1,
  totalLaps: 3,
  isDrifting: false,
  isNitroActive: false,
  checkpointsPassed: [],
}

const defaultGame: GameState = {
  phase: 'loading',
  score: 0,
  highScore: parseInt(localStorage.getItem('highScore') || '0'),
  totalTime: 0,
  fps: 60,
  quality: 'high',
  isNightMode: false,
  isMuted: false,
  selectedTrackId: 0,
}

const defaultControls: Controls = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  nitro: false,
  drift: false,
  brake: false,
  pause: false,
}

// ─── Store ─────────────────────────────────────────────────────────────────────
export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    car: { ...defaultCar },
    game: { ...defaultGame },
    controls: { ...defaultControls },
    scoreEvents: [],

    updateCar: (partial) =>
      set((state) => ({ car: { ...state.car, ...partial } })),

    updateGame: (partial) =>
      set((state) => ({ game: { ...state.game, ...partial } })),

    setPhase: (phase) =>
      set((state) => ({ game: { ...state.game, phase } })),

    addScore: (event) => {
      set((state) => {
        const newScore = state.game.score + event.points
        const newHighScore = Math.max(newScore, state.game.highScore)
        if (newHighScore > state.game.highScore) {
          localStorage.setItem('highScore', String(newHighScore))
        }
        return {
          game: { ...state.game, score: newScore, highScore: newHighScore },
          scoreEvents: [...state.scoreEvents.slice(-9), event], // keep last 10
        }
      })
    },

    completeLap: () => {
      const { car } = get()
      const isNewBest = car.lapTime < car.bestLapTime
      const newBestLap = isNewBest ? car.lapTime : car.bestLapTime

      // Award clean lap bonus
      const bonusPoints = isNewBest ? 500 : 100
      get().addScore({
        type: 'clean_lap',
        points: bonusPoints,
        timestamp: Date.now(),
        message: isNewBest ? '🏆 NEW BEST LAP! +500' : '✅ LAP COMPLETE +100',
      })

      if (car.currentLap >= car.totalLaps) {
        set((state) => ({
          car: { ...state.car, bestLapTime: newBestLap },
          game: { ...state.game, phase: 'finished' },
        }))
      } else {
        set((state) => ({
          car: {
            ...state.car,
            currentLap: state.car.currentLap + 1,
            lapTime: 0,
            bestLapTime: newBestLap,
            checkpointsPassed: [],
          },
        }))
      }
    },

    passCheckpoint: (id) => {
      set((state) => ({
        car: {
          ...state.car,
          checkpointsPassed: [...state.car.checkpointsPassed, id],
        },
      }))
    },

    toggleNightMode: () =>
      set((state) => ({ game: { ...state.game, isNightMode: !state.game.isNightMode } })),

    toggleMuted: () =>
      set((state) => ({ game: { ...state.game, isMuted: !state.game.isMuted } })),

    setSelectedTrackId: (selectedTrackId) =>
      set((state) => ({ game: { ...state.game, selectedTrackId } })),

    resetGame: () => {
      set({
        car: { ...defaultCar },
        game: {
          ...defaultGame,
          highScore: get().game.highScore,
          isNightMode: get().game.isNightMode,
          isMuted: get().game.isMuted,
          selectedTrackId: get().game.selectedTrackId,
          phase: 'menu',
        },
        controls: { ...defaultControls },
        scoreEvents: [],
      })
    },
  }))
)
