// ─── Car State ────────────────────────────────────────────────────────────────
export interface CarPosition {
  x: number
  y: number
  z: number
}

export interface CarRotation {
  x: number
  y: number
  z: number
}

export interface CarState {
  position: CarPosition
  rotation: CarRotation
  speed: number           // km/h, range -50 to 200
  nitro: number           // 0–100
  lapTime: number         // ms
  bestLapTime: number     // ms
  currentLap: number      // 1-based
  totalLaps: number       // race config
  isDrifting: boolean
  isNitroActive: boolean
  checkpointsPassed: number[]
}

// ─── Game State ───────────────────────────────────────────────────────────────
export type GamePhase = 'menu' | 'loading' | 'countdown' | 'racing' | 'paused' | 'finished'

export interface GameState {
  phase: GamePhase
  score: number
  highScore: number
  totalTime: number       // ms
  fps: number
  quality: 'low' | 'medium' | 'high'
  isNightMode: boolean
  isMuted: boolean
  selectedTrackId: number
}

// ─── Controls ─────────────────────────────────────────────────────────────────
export interface Controls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  nitro: boolean
  drift: boolean
  brake: boolean
  pause: boolean
}

// ─── Track ────────────────────────────────────────────────────────────────────
export interface Checkpoint {
  id: number
  position: [number, number, number]
  rotation: [number, number, number]
  isStart: boolean
}

export interface TrackConfig {
  name: string
  checkpoints: Checkpoint[]
  totalLaps: number
  difficultyMultiplier: number
}

// ─── Score Event ──────────────────────────────────────────────────────────────
export type ScoreEventType = 'drift' | 'nitro_boost' | 'clean_lap' | 'fast_lap' | 'overtake'

export interface ScoreEvent {
  type: ScoreEventType
  points: number
  timestamp: number
  message: string
}

// ─── Complete Store Shape ─────────────────────────────────────────────────────
export interface GameStore {
  car: CarState
  game: GameState
  controls: Controls
  scoreEvents: ScoreEvent[]

  // Actions
  updateCar: (partial: Partial<CarState>) => void
  updateGame: (partial: Partial<GameState>) => void
  setPhase: (phase: GamePhase) => void
  addScore: (event: ScoreEvent) => void
  resetGame: () => void
  completeLap: () => void
  passCheckpoint: (id: number) => void
  toggleNightMode: () => void
  toggleMuted: () => void
  setSelectedTrackId: (id: number) => void
}
