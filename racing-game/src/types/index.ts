// ═══════════════════════════════════════════════════════
// APEXRUSH PRO — TypeScript Type Definitions
// ═══════════════════════════════════════════════════════

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  username: string
  email: string
  avatar: string           // emoji character e.g. "🦊"
  createdAt: number        // timestamp
  totalRaces: number
  totalWins: number
  unlockedCars: string[]   // array of car IDs
  garageColors: Record<string, string>  // carId → hex color
  bestLapTimes: Record<string, number>  // trackId → ms
  xp: number               // experience points
  level: number
}

export interface AuthState {
  user: User | null
  token: string | null
  isGuest: boolean
  isLoading: boolean
  error: string | null
}

// ─── Car Definitions ──────────────────────────────────────────────────────────
export interface CarStats {
  topSpeed: number         // 0–220 km/h
  acceleration: number     // 0–10 scale
  handling: number         // 0–10 scale
  braking: number          // 0–10 scale
  nitroCapacity: number    // 0–150
  nitroBoost: number       // multiplier 1.0–2.5
  mass: number             // affects collision response
  driftFactor: number      // 0–1, how easily it drifts
  turningRadius: number    // degrees/second
}

export interface CarDefinition {
  id: string
  name: string
  tagline: string
  stats: CarStats
  defaultColor: string     // hex
  accentColor: string      // hex
  bodyStyle: 'sports' | 'muscle' | 'drift' | 'electric' | 'suv' | 'supercar'
  exhaustColor: string
  unlockRequirement: number  // races needed (0 = default unlocked)
  price: number            // XP cost
  description: string
  emoji: string
}

export interface GarageEntry {
  carId: string
  color: string
  upgrades: {
    engine: number   // 0–3
    tires: number    // 0–3
    nitro: number    // 0–3
    aero: number     // 0–3
  }
}

// ─── Track Definitions ────────────────────────────────────────────────────────
export interface CheckpointDef {
  id: number
  position: [number, number, number]
  normal: [number, number, number]  // direction car must be moving to pass
  isStart: boolean
  isFinish: boolean
}

export type TrackSurface = 'asphalt' | 'wet_asphalt' | 'gravel' | 'sand' | 'ice'
export type TrackTheme   = 'city' | 'mountain' | 'desert' | 'neon'
export type TimeOfDay    = 'day' | 'golden_hour' | 'night'
export type WeatherType  = 'clear' | 'rain' | 'fog' | 'sandstorm'

export interface TrackDefinition {
  id: string
  name: string
  subtitle: string
  theme: TrackTheme
  difficulty: 1 | 2 | 3 | 4 | 5
  laps: number
  surface: TrackSurface
  timeOfDay: TimeOfDay
  weather: WeatherType
  controlPoints: [number, number, number][]  // CatmullRom spline
  trackWidth: number
  description: string
  accentColor: string      // theme color for UI
  skyColor: string
  fogColor: string
  fogDensity: number
  ambientIntensity: number
  sunDirection: [number, number, number]
  bestLapRecord: number    // ms (preset leaderboard entry)
}

// ─── Race State ───────────────────────────────────────────────────────────────
export type GamePhase =
  | 'loading'
  | 'auth'
  | 'menu'
  | 'car_select'
  | 'track_select'
  | 'countdown'
  | 'racing'
  | 'paused'
  | 'results'
  | 'garage'
  | 'leaderboard'
  | 'settings'
  | 'profile'

export interface CarDynamics {
  position:  [number, number, number]
  rotation:  [number, number, number]
  velocity:  [number, number, number]
  speed:     number         // km/h
  nitro:     number         // 0–capacity
  damage:    number         // 0–100 (100 = destroyed)
  isDrifting: boolean
  isNitroActive: boolean
  driftAngle: number        // radians
  wheelSpin:  number        // cumulative rotation
  engineRPM:  number        // 0–8000
}

export interface LapData {
  lapNumber: number
  startTime: number
  endTime:   number | null
  splits:    number[]       // split times at each checkpoint
  isValid:   boolean        // false if checkpoints missed
}

export interface RaceState {
  phase:             GamePhase
  selectedCarId:     string
  selectedTrackId:   string
  car:               CarDynamics
  currentLap:        number
  totalLaps:         number
  lapHistory:        LapData[]
  currentLapStart:   number
  bestLapTime:       number
  checkpointsPassed: number[]
  raceStartTime:     number
  raceFinishTime:    number | null
  score:             number
  scoreEvents:       ScoreEvent[]
  fps:               number
  quality:           'low' | 'medium' | 'high'
  ghostActive:       boolean
}

// ─── Replay / Ghost ───────────────────────────────────────────────────────────
export interface ReplayFrame {
  t:  number    // time offset in ms
  px: number; py: number; pz: number   // position
  rx: number; ry: number; rz: number   // rotation
  sp: number                           // speed
}

export interface ReplayData {
  trackId:   string
  carId:     string
  lapTime:   number
  frames:    ReplayFrame[]
  recordedAt: number
}

// ─── Score ────────────────────────────────────────────────────────────────────
export type ScoreEventType =
  | 'drift_start' | 'drift_combo' | 'nitro_boost'
  | 'clean_lap' | 'best_lap' | 'near_miss'
  | 'speed_bonus' | 'air_time'

export interface ScoreEvent {
  id:        string
  type:      ScoreEventType
  points:    number
  message:   string
  timestamp: number
  position?: [number, number]   // screen coords for popup
}

// ─── Controls ────────────────────────────────────────────────────────────────
export interface Controls {
  forward:  boolean
  backward: boolean
  left:     boolean
  right:    boolean
  nitro:    boolean
  drift:    boolean
  brake:    boolean
  pause:    boolean
  camera:   boolean   // toggle camera mode
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export interface SettingsState {
  graphics: {
    quality:        'low' | 'medium' | 'high' | 'ultra'
    shadows:        boolean
    postProcessing: boolean
    particles:      boolean
    motionBlur:     boolean
    reflections:    boolean
    fov:            number   // 60–100
  }
  audio: {
    masterVolume: number    // 0–1
    engineVolume: number    // 0–1
    musicVolume:  number    // 0–1
    sfxVolume:    number    // 0–1
    muted:        boolean
  }
  controls: {
    invertY:      boolean
    sensitivity:  number    // 0.5–2.0
    vibration:    boolean
  }
  display: {
    showFPS:      boolean
    showMinimap:  boolean
    showDamage:   boolean
    hudScale:     number    // 0.7–1.3
  }
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  rank:       number
  username:   string
  avatar:     string
  carId:      string
  lapTime:    number      // ms
  date:       number      // timestamp
  isPlayer:   boolean
}

// ─── Achievement ──────────────────────────────────────────────────────────────
export interface Achievement {
  id:          string
  name:        string
  description: string
  icon:        string
  condition:   (user: User, race: RaceState) => boolean
  xpReward:    number
  unlocked:    boolean
  unlockedAt?: number
}
