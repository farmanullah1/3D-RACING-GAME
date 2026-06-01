import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { RaceState, GamePhase, CarDynamics, ScoreEvent } from '../types'

function generateEventId(): string { return Math.random().toString(36).slice(2,8) }

const defaultCar: CarDynamics = {
  position:     [0, 0.4, -50],
  rotation:     [0, 0, 0],
  velocity:     [0, 0, 0],
  speed:        0,
  nitro:        100,
  damage:       0,
  isDrifting:   false,
  isNitroActive:false,
  driftAngle:   0,
  wheelSpin:    0,
  engineRPM:    800,
}

const defaultRace: Omit<RaceState, 'phase'> = {
  selectedCarId:    'phantom_gt',
  selectedTrackId:  'city_circuit',
  car:              { ...defaultCar },
  currentLap:       1,
  totalLaps:        3,
  lapHistory:       [],
  currentLapStart:  0,
  bestLapTime:      Infinity,
  checkpointsPassed:[],
  raceStartTime:    0,
  raceFinishTime:   null,
  score:            0,
  scoreEvents:      [],
  fps:              60,
  quality:          'high',
  ghostActive:      false,
}

export interface GameActions {
  setPhase:        (phase: GamePhase)       => void
  selectCar:       (id: string)             => void
  selectTrack:     (id: string)             => void
  startRace:       ()                       => void
  updateCar:       (p: Partial<CarDynamics>)=> void
  addScore:        (type: ScoreEvent['type'], pts: number, msg: string) => void
  passCheckpoint:  (id: number)             => void
  completeLap:     ()                       => void
  takeDamage:      (amount: number)         => void
  updateFPS:       (fps: number)            => void
  setQuality:      (q: RaceState['quality'])=> void
  resetRace:       ()                       => void
  toggleGhost:     ()                       => void
}

export const useGameStore = create<any>()(
  subscribeWithSelector<any, any>((set, get) => ({
    phase: 'loading' as GamePhase,
    ...defaultRace,

    setPhase:    (phase: GamePhase)    => set({ phase }),
    selectCar:   (id: string)       => set({ selectedCarId: id }),
    selectTrack: (id: string)       => set({ selectedTrackId: id }),

    startRace: () => set({
      ...defaultRace,
      selectedCarId:   get().selectedCarId,
      selectedTrackId: get().selectedTrackId,
      raceStartTime:   Date.now(),
      currentLapStart: Date.now(),
      phase:           'countdown',
    }),

    updateCar: (p: Partial<CarDynamics>) => set((s: any) => ({ car: { ...s.car, ...p } })),

    addScore: (type: ScoreEvent['type'], pts: number, msg: string) => {
      set((s: any) => {
        const event: ScoreEvent = {
          id: generateEventId(), type, points: pts, message: msg, timestamp: Date.now(),
        }
        return {
          score:       s.score + pts,
          scoreEvents: [...s.scoreEvents.slice(-8), event],
        }
      })
    },

    passCheckpoint: (id: number) => set((s: any) => ({
      checkpointsPassed: s.checkpointsPassed.includes(id)
        ? s.checkpointsPassed
        : [...s.checkpointsPassed, id],
    })),

    completeLap: () => {
      const s = get()
      const now = Date.now()
      const lapTime = now - s.currentLapStart
      const isNewBest = lapTime < s.bestLapTime
      const newBest = isNewBest ? lapTime : s.bestLapTime

      if (isNewBest) get().addScore('best_lap', 500, '🏆 BEST LAP! +500')
      else           get().addScore('clean_lap', 100, '✅ LAP COMPLETE +100')

      if (s.currentLap >= s.totalLaps) {
        set({ bestLapTime: newBest, raceFinishTime: now, phase: 'results' })
      } else {
        set({ currentLap: s.currentLap + 1, currentLapStart: now, bestLapTime: newBest, checkpointsPassed: [] })
      }
    },

    takeDamage: (amount: number) => set((s: any) => ({
      car: { ...s.car, damage: Math.min(100, s.car.damage + amount) },
    })),

    updateFPS: (fps: number) => {
      const q = fps < 30 ? 'low' : fps < 50 ? 'medium' : 'high'
      set((s: any) => ({ fps, quality: s.quality !== q ? q : s.quality }))
    },

    setQuality: (q: RaceState['quality']) => set({ quality: q }),

    resetRace: () => set({ ...defaultRace, phase: 'menu', selectedCarId: get().selectedCarId, selectedTrackId: get().selectedTrackId }),

    toggleGhost: () => set((s: any) => ({ ghostActive: !s.ghostActive })),
  }))
)
