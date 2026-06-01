# 🏎️ RACING GAME — COMPLETE AGENT BUILD PROMPT
> **Instructions for AI Agent (e.g. Gemini Flash / GPT / Claude):**
> This file is your complete specification. Read it fully before starting. Execute each **Phase** one at a time in order. Do NOT skip phases. After completing each phase, confirm with: `✅ Phase [N] complete.` then proceed to the next.

---

## 🧭 AGENT OPERATING RULES

1. **Execute phases sequentially** — Phase 1 → 2 → 3 ... → 12
2. **Never skip a step** within a phase
3. **Write all code** — do not stub, mock, or leave TODOs
4. **Use exact filenames and folder paths** as specified
5. **Fix TypeScript errors immediately** before moving to the next phase
6. **After each phase**, run `npm run build` to verify zero errors
7. **Comment every non-trivial block** of code
8. If a dependency version conflict occurs, use `--legacy-peer-deps`
9. All UI must be **mobile-first responsive** — test at 375px, 768px, 1280px widths
10. Target **60 FPS** — avoid layout thrashing, use `useFrame` hooks efficiently

---

## 📐 FINAL DELIVERABLE OVERVIEW

A production-grade, visually stunning **3D web-based car racing game** with:
- Realistic car physics (acceleration, braking, steering, drifting, nitro)
- Curved closed-loop track with decorations (trees, barriers, checkpoints)
- Post-processing FX: Bloom, Depth of Field, Chromatic Aberration
- Glassmorphic HUD: Speedometer, Lap Timer, Nitro Bar, Minimap
- Zustand global state, TypeScript strict mode, Tailwind CSS
- Smooth third-person follow camera with lerp interpolation
- Loading screen, FPS counter (dev), mobile on-screen controls
- Responsive, modern, polished UI — feels like a real game product

---

## 🗂️ EXACT FOLDER STRUCTURE (Create This Exactly)

```
racing-game/
├── public/
│   ├── textures/
│   │   └── (asphalt-diffuse.jpg, asphalt-normal.jpg, asphalt-rough.jpg — generate procedurally if not available)
│   └── sounds/ (optional)
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Scene.tsx
│   │   │   ├── Car.tsx
│   │   │   ├── Track.tsx
│   │   │   ├── Environment.tsx
│   │   │   ├── Effects.tsx
│   │   │   └── CameraController.tsx
│   │   ├── ui/
│   │   │   ├── Speedometer.tsx
│   │   │   ├── LapTimer.tsx
│   │   │   ├── NitroIndicator.tsx
│   │   │   ├── Minimap.tsx
│   │   │   └── FPSCounter.tsx
│   │   ├── screens/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── MainMenu.tsx
│   │   │   └── GameOver.tsx
│   │   └── HUD.tsx
│   ├── hooks/
│   │   ├── useKeyboard.ts
│   │   ├── useGameLoop.ts
│   │   └── useMobileControls.ts
│   ├── store/
│   │   └── gameStore.ts
│   ├── utils/
│   │   ├── physics.ts
│   │   ├── helpers.ts
│   │   └── textures.ts
│   ├── types/
│   │   └── game.types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

---

# PHASE 1 — Project Scaffold & Configuration

## Goal
Bootstrap the Vite + React + TypeScript project, install all dependencies, configure Tailwind, and verify the dev server runs without errors.

## Steps

### 1.1 — Create Project
```bash
npm create vite@latest racing-game -- --template react-ts
cd racing-game
```

### 1.2 — Install All Dependencies
```bash
npm install three @react-three/fiber @react-three/drei @react-three/cannon zustand @react-three/postprocessing
npm install -D @types/three tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

If peer dependency errors occur:
```bash
npm install --legacy-peer-deps
```

### 1.3 — Configure `tailwind.config.js`
Replace the file entirely with:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ['"Orbitron"', 'monospace'],
      },
      colors: {
        neon: {
          blue: '#00d4ff',
          green: '#39ff14',
          red: '#ff073a',
          orange: '#ff6600',
          purple: '#bf00ff',
        },
        glass: {
          white: 'rgba(255,255,255,0.08)',
          dark: 'rgba(0,0,0,0.45)',
          border: 'rgba(255,255,255,0.15)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-fast': 'pulse 0.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,212,255,0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(0,212,255,0.9), 0 0 40px rgba(0,212,255,0.4)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
```

### 1.4 — Replace `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  font-family: 'Orbitron', monospace;
}

/* Glassmorphism utility classes */
.glass-panel {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
}

.glass-panel-bright {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
}

.neon-text-blue { color: #00d4ff; text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff80; }
.neon-text-green { color: #39ff14; text-shadow: 0 0 10px #39ff14, 0 0 20px #39ff1480; }
.neon-text-red { color: #ff073a; text-shadow: 0 0 10px #ff073a, 0 0 20px #ff073a80; }
.neon-text-orange { color: #ff6600; text-shadow: 0 0 10px #ff6600, 0 0 20px #ff660080; }

.neon-border-blue { border-color: #00d4ff; box-shadow: 0 0 8px #00d4ff60, inset 0 0 8px #00d4ff20; }
.neon-border-green { border-color: #39ff14; box-shadow: 0 0 8px #39ff1460, inset 0 0 8px #39ff1420; }
.neon-border-red { border-color: #ff073a; box-shadow: 0 0 8px #ff073a60, inset 0 0 8px #ff073a20; }
.neon-border-orange { border-color: #ff6600; box-shadow: 0 0 8px #ff660060, inset 0 0 8px #ff660020; }

/* Scrollbar styling */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
::-webkit-scrollbar-thumb { background: #00d4ff60; border-radius: 2px; }

/* Mobile controls overlay */
.mobile-controls {
  display: none;
}

@media (max-width: 768px) {
  .mobile-controls {
    display: flex;
  }
}

/* Canvas full screen */
canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
```

### 1.5 — Update `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@react-three/cannon'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          fiber: ['@react-three/fiber'],
          drei: ['@react-three/drei'],
        }
      }
    }
  }
})
```

### 1.6 — Verify
Run `npm run dev` — browser should open with default Vite page. No errors.

✅ **Phase 1 complete.**

---

---

# PHASE 2 — TypeScript Types & Zustand Store

## Goal
Define all TypeScript interfaces and create the global Zustand game state store.

## Steps

### 2.1 — Create `src/types/game.types.ts`

```ts
import { Vector3, Euler } from 'three'

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
}
```

### 2.2 — Create `src/store/gameStore.ts`

```ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { GameStore, CarState, GameState, Controls, ScoreEvent } from '../types/game.types'

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
  phase: 'menu',
  score: 0,
  highScore: parseInt(localStorage.getItem('highScore') || '0'),
  totalTime: 0,
  fps: 60,
  quality: 'high',
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
      const { car, game } = get()
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

    resetGame: () => {
      set({
        car: { ...defaultCar },
        game: { ...defaultGame, highScore: get().game.highScore, phase: 'menu' },
        controls: { ...defaultControls },
        scoreEvents: [],
      })
    },
  }))
)
```

✅ **Phase 2 complete.**

---

---

# PHASE 3 — Hooks (Keyboard, Game Loop, Mobile Controls)

## Goal
Create all custom React hooks for input and frame updates.

## Steps

### 3.1 — Create `src/hooks/useKeyboard.ts`

```ts
import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'

// Maps keyboard keys to control names
const KEY_MAP: Record<string, keyof import('../types/game.types').Controls> = {
  ArrowUp: 'forward',
  KeyW: 'forward',
  ArrowDown: 'backward',
  KeyS: 'backward',
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  Space: 'nitro',
  ShiftLeft: 'drift',
  ShiftRight: 'drift',
  KeyX: 'brake',
  Escape: 'pause',
  KeyP: 'pause',
}

export function useKeyboard() {
  const { setPhase, game, updateGame } = useGameStore()
  const controlsRef = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser defaults for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault()
      }

      const control = KEY_MAP[e.code]
      if (!control) return

      if (control === 'pause') {
        const phase = useGameStore.getState().game.phase
        if (phase === 'racing') setPhase('paused')
        else if (phase === 'paused') setPhase('racing')
        return
      }

      controlsRef.current[control] = true

      // Sync to store (batched — done in useGameLoop instead for performance)
      useGameStore.setState((state) => ({
        controls: { ...state.controls, [control]: true },
      }))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const control = KEY_MAP[e.code]
      if (!control || control === 'pause') return

      controlsRef.current[control] = false
      useGameStore.setState((state) => ({
        controls: { ...state.controls, [control]: false },
      }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [setPhase])

  return controlsRef
}
```

### 3.2 — Create `src/hooks/useGameLoop.ts`

```ts
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

/**
 * Frame-independent game loop hook.
 * Tracks delta time, updates lap timer, monitors FPS.
 * Only active when game phase is 'racing'.
 */
export function useGameLoop() {
  const fpsBuffer = useRef<number[]>([])
  const lastFpsUpdate = useRef(0)

  useFrame((_, delta) => {
    const { game, car, updateCar, updateGame } = useGameStore.getState()
    if (game.phase !== 'racing') return

    // Update lap timer
    updateCar({ lapTime: car.lapTime + delta * 1000 })

    // FPS tracking (update every 500ms)
    const now = performance.now()
    fpsBuffer.current.push(1 / delta)
    if (now - lastFpsUpdate.current > 500) {
      const avgFps = fpsBuffer.current.reduce((a, b) => a + b, 0) / fpsBuffer.current.length
      fpsBuffer.current = []
      lastFpsUpdate.current = now

      updateGame({ fps: Math.round(avgFps) })

      // Adaptive quality scaling
      if (avgFps < 40 && game.quality !== 'low') {
        updateGame({ quality: avgFps < 30 ? 'low' : 'medium' })
      } else if (avgFps > 58 && game.quality !== 'high') {
        updateGame({ quality: 'high' })
      }
    }
  })
}
```

### 3.3 — Create `src/hooks/useMobileControls.ts`

```ts
import { useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import type { Controls } from '../types/game.types'

/**
 * Provides press/release handlers for on-screen mobile buttons.
 * Returns setControl function to update individual controls.
 */
export function useMobileControls() {
  const setControl = useCallback((key: keyof Controls, value: boolean) => {
    useGameStore.setState((state) => ({
      controls: { ...state.controls, [key]: value },
    }))
  }, [])

  const press = useCallback(
    (key: keyof Controls) => (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()
      setControl(key, true)
    },
    [setControl]
  )

  const release = useCallback(
    (key: keyof Controls) => (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()
      setControl(key, false)
    },
    [setControl]
  )

  return { press, release }
}
```

✅ **Phase 3 complete.**

---

---

# PHASE 4 — Utility Functions

## Goal
Build physics formulas, time formatters, and procedural texture generation utilities.

## Steps

### 4.1 — Create `src/utils/physics.ts`

```ts
/**
 * Physics utility functions for car simulation.
 * All values are in SI units unless noted.
 */

// ─── Constants ─────────────────────────────────────────────────────────────────
export const PHYSICS = {
  MAX_SPEED: 200,          // km/h
  MAX_REVERSE_SPEED: 60,   // km/h
  ACCELERATION: 60,        // km/h per second
  BRAKING: 120,            // km/h per second
  FRICTION: 30,            // km/h per second (natural deceleration)
  STEERING_SPEED: 2.5,     // radians per second
  DRIFT_STEERING: 4.0,     // radians per second (while drifting)
  DRIFT_FRICTION: 0.97,    // multiplier per frame
  NITRO_MULTIPLIER: 1.8,   // speed multiplier
  NITRO_DRAIN: 25,         // nitro % per second
  NITRO_RECHARGE: 12,      // nitro % per second (auto recharge)
  DRIFT_SCORE_PER_SECOND: 10,
  MIN_DRIFT_SPEED: 60,     // km/h minimum to initiate drift
}

/**
 * Compute acceleration delta for a given frame.
 * @param currentSpeed - current speed in km/h
 * @param isForward - whether forward key is held
 * @param isBackward - whether backward key is held
 * @param isBrake - whether brake key is held
 * @param isNitro - whether nitro is active
 * @param nitroAvailable - whether nitro fuel remains
 * @param delta - frame time in seconds
 */
export function computeSpeedDelta(
  currentSpeed: number,
  isForward: boolean,
  isBackward: boolean,
  isBrake: boolean,
  isNitro: boolean,
  nitroAvailable: boolean,
  delta: number
): number {
  const nitroBoost = (isNitro && nitroAvailable) ? PHYSICS.NITRO_MULTIPLIER : 1.0
  let acceleration = 0

  if (isForward) {
    acceleration = PHYSICS.ACCELERATION * nitroBoost
  } else if (isBackward) {
    if (currentSpeed > 0) {
      acceleration = -PHYSICS.BRAKING  // braking while going forward
    } else {
      acceleration = -PHYSICS.ACCELERATION * 0.6  // reverse
    }
  } else if (isBrake) {
    acceleration = currentSpeed > 0 ? -PHYSICS.BRAKING * 1.5 : PHYSICS.BRAKING * 1.5
  } else {
    // Natural friction deceleration
    const frictionDir = currentSpeed > 0 ? -1 : 1
    acceleration = frictionDir * PHYSICS.FRICTION
    // Snap to 0 if near-zero
    if (Math.abs(currentSpeed) < PHYSICS.FRICTION * delta) return 0
  }

  return acceleration * delta
}

/**
 * Compute steering rotation delta.
 */
export function computeSteeringDelta(
  currentSpeed: number,
  isLeft: boolean,
  isRight: boolean,
  isDrifting: boolean,
  delta: number
): number {
  if (!isLeft && !isRight) return 0
  if (Math.abs(currentSpeed) < 2) return 0  // no steering when stopped

  const direction = isLeft ? 1 : -1
  const speedFactor = Math.min(Math.abs(currentSpeed) / 80, 1)  // speed-sensitive steering
  const steeringRate = isDrifting ? PHYSICS.DRIFT_STEERING : PHYSICS.STEERING_SPEED
  return direction * steeringRate * speedFactor * delta * (currentSpeed < 0 ? -1 : 1)
}

/**
 * Check whether drift should activate.
 */
export function shouldDrift(
  speed: number,
  isDriftKeyHeld: boolean,
  isTurning: boolean
): boolean {
  return isDriftKeyHeld && Math.abs(speed) > PHYSICS.MIN_DRIFT_SPEED && isTurning
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Linear interpolation.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
```

### 4.2 — Create `src/utils/helpers.ts`

```ts
/**
 * Format milliseconds as MM:SS:mmm
 */
export function formatTime(ms: number): string {
  if (!isFinite(ms) || ms < 0) return '--:--.---'
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const millis = Math.floor(ms % 1000)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
}

/**
 * Convert internal speed (units/s) to km/h for display.
 * Internal unit = Three.js units per second.
 * Scale factor: 1 unit ≈ 1 m → multiply by 3.6 to get km/h.
 */
export function toKmh(unitsPerSecond: number): number {
  return Math.round(Math.abs(unitsPerSecond) * 3.6 * 10) / 10
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

/**
 * Returns a color string interpolating from green → yellow → red based on ratio 0–1.
 */
export function heatColor(ratio: number): string {
  const r = Math.round(255 * Math.min(ratio * 2, 1))
  const g = Math.round(255 * Math.min(2 - ratio * 2, 1))
  return `rgb(${r},${g},0)`
}

/**
 * Throttle: returns a function that calls fn at most once per ms.
 */
export function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let last = 0
  return ((...args) => {
    const now = Date.now()
    if (now - last >= ms) { last = now; fn(...args) }
  }) as T
}
```

### 4.3 — Create `src/utils/textures.ts`

```ts
/**
 * Procedurally generates canvas-based PBR-like textures.
 * Used as fallback when no external texture files are provided.
 */
import * as THREE from 'three'

/**
 * Generate a tiled asphalt diffuse texture.
 */
export function generateAsphaltTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Base dark gray
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, size, size)

  // Add noise for asphalt texture
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = Math.random() * 1.5
    const gray = Math.floor(Math.random() * 60 + 20)
    ctx.fillStyle = `rgb(${gray},${gray},${gray})`
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Lane marking (center dashes)
  ctx.strokeStyle = '#ffdd00'
  ctx.lineWidth = 4
  ctx.setLineDash([40, 30])
  ctx.beginPath()
  ctx.moveTo(size / 2, 0)
  ctx.lineTo(size / 2, size)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
}

/**
 * Generate a grass texture.
 */
export function generateGrassTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#1a3a10'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const g = Math.floor(Math.random() * 40 + 20)
    ctx.fillStyle = `rgb(${g}, ${g * 2 + 10}, ${g})`
    ctx.fillRect(x, y, 2, Math.random() * 8 + 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(20, 20)
  return texture
}

/**
 * Generate a road normal map (subtle bumps).
 */
export function generateNormalMap(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const imageData = ctx.createImageData(size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = 128 + (Math.random() * 10 - 5)     // R (x normal)
    imageData.data[i+1] = 128 + (Math.random() * 10 - 5)   // G (y normal)
    imageData.data[i+2] = 255                                // B (z normal - up)
    imageData.data[i+3] = 255
  }
  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
}
```

✅ **Phase 4 complete.**

---

---

# PHASE 5 — 3D Scene: Environment & Track

## Goal
Build the game world — sky, lighting, ground, and the closed-loop curved racing track with barriers and decorations.

## Steps

### 5.1 — Create `src/components/game/Environment.tsx`

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky, Cloud, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { generateGrassTexture } from '../../utils/textures'

/**
 * Game world environment:
 * - Procedural sky with animated sun position
 * - Dynamic clouds
 * - Stars (night atmosphere)
 * - Directional + ambient + fill lights with shadows
 * - Ground plane with grass texture
 * - Dust/sparkle particle effect
 */
export default function Environment() {
  const sunRef = useRef({ elevation: 12, azimuth: 180 })
  const dirLightRef = useRef<THREE.DirectionalLight>(null)
  const grassTexture = generateGrassTexture()

  useFrame(({ clock }) => {
    // Very slowly animate sun (subtle day progression)
    const t = clock.getElapsedTime() * 0.005
    sunRef.current.elevation = 12 + Math.sin(t) * 4
    sunRef.current.azimuth = 180 + t * 5

    // Update directional light position to match sun
    if (dirLightRef.current) {
      const phi = THREE.MathUtils.degToRad(90 - sunRef.current.elevation)
      const theta = THREE.MathUtils.degToRad(sunRef.current.azimuth)
      dirLightRef.current.position.setFromSphericalCoords(50, phi, theta)
    }
  })

  return (
    <>
      {/* ── Sky ─────────────────────────────────────────── */}
      <Sky
        sunPosition={[100, 20, -100]}
        turbidity={8}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.85}
        inclination={0.49}
        azimuth={0.25}
      />

      {/* ── Stars (for atmosphere) ────────────────────── */}
      <Stars radius={200} depth={60} count={3000} factor={4} saturation={0} fade speed={0.5} />

      {/* ── Clouds ───────────────────────────────────── */}
      <Cloud position={[-30, 25, -80]} speed={0.2} opacity={0.6} segments={10} />
      <Cloud position={[60, 30, -120]} speed={0.15} opacity={0.4} segments={8} />
      <Cloud position={[0, 28, -50]} speed={0.25} opacity={0.5} segments={12} />
      <Cloud position={[-70, 22, -60]} speed={0.1} opacity={0.3} segments={7} />

      {/* ── Lighting ─────────────────────────────────── */}
      {/* Ambient: soft global fill */}
      <ambientLight intensity={0.4} color="#b0c8ff" />

      {/* Sun: main directional with shadows */}
      <directionalLight
        ref={dirLightRef}
        position={[50, 40, 30]}
        intensity={2.2}
        color="#fff5e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-bias={-0.0005}
      />

      {/* Fill light: blue sky-like fill from above */}
      <directionalLight position={[-30, 20, -20]} intensity={0.6} color="#a8c8ff" />

      {/* Bounce light: warm low fill from ground */}
      <directionalLight position={[10, -5, 10]} intensity={0.3} color="#ffddaa" />

      {/* Track accent: subtle colored rim lights */}
      <pointLight position={[0, 8, 0]} intensity={0.8} color="#00d4ff" distance={50} decay={2} />

      {/* ── Ground Plane ──────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[500, 500, 1, 1]} />
        <meshStandardMaterial
          map={grassTexture}
          roughness={0.95}
          metalness={0}
          color="#2d5a1b"
        />
      </mesh>

      {/* ── Dust Particles ────────────────────────────── */}
      <Sparkles
        count={150}
        size={1.5}
        speed={0.1}
        opacity={0.15}
        color="#ffffff"
        scale={[100, 5, 100]}
        position={[0, 1, 0]}
      />
    </>
  )
}
```

### 5.2 — Create `src/components/game/Track.tsx`

```tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { generateAsphaltTexture, generateNormalMap } from '../../utils/textures'

/**
 * Track control points (closed loop).
 * These form a large figure-8-ish oval circuit.
 */
const TRACK_POINTS: [number, number, number][] = [
  [0, 0, -40],
  [20, 0, -55],
  [50, 0, -50],
  [70, 0, -30],
  [75, 0, 0],
  [70, 0, 30],
  [50, 0, 50],
  [20, 0, 60],
  [0, 0, 55],
  [-20, 0, 60],
  [-50, 0, 50],
  [-70, 0, 30],
  [-75, 0, 0],
  [-70, 0, -30],
  [-50, 0, -50],
  [-20, 0, -55],
]

const TRACK_WIDTH = 10    // meters
const TRACK_SEGMENTS = 300
const BARRIER_HEIGHT = 1.5

/**
 * Tree positions around the outside of the track.
 */
const TREE_POSITIONS: [number, number, number][] = [
  [85, 0, 0], [80, 0, 40], [60, 0, 65], [25, 0, 75], [-25, 0, 75],
  [-60, 0, 65], [-80, 0, 40], [-85, 0, 0], [-80, 0, -40], [-60, 0, -65],
  [-25, 0, -70], [25, 0, -70], [60, 0, -65], [80, 0, -40],
  [30, 0, 10], [-30, 0, -10], [0, 0, 20],
]

/** Single tree mesh */
function Tree({ position }: { position: [number, number, number] }) {
  const height = 4 + Math.random() * 3
  const radius = 0.25 + Math.random() * 0.15
  const crownRadius = 1.2 + Math.random() * 0.8

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh castShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius * 0.6, radius, height, 6]} />
        <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
      </mesh>
      {/* Crown (cone) */}
      <mesh castShadow position={[0, height + crownRadius * 0.8, 0]}>
        <coneGeometry args={[crownRadius, crownRadius * 2, 7]} />
        <meshStandardMaterial color="#1a5c0a" roughness={0.85} />
      </mesh>
      {/* Second crown layer */}
      <mesh castShadow position={[0, height + crownRadius * 1.8, 0]}>
        <coneGeometry args={[crownRadius * 0.7, crownRadius * 1.5, 7]} />
        <meshStandardMaterial color="#236b0e" roughness={0.85} />
      </mesh>
    </group>
  )
}

/** Glowing checkpoint gate */
function CheckpointGate({ position, rotation }: { position: THREE.Vector3, rotation: THREE.Euler }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      // Pulse opacity
      const mat = ref.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 3) * 0.2
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Left post */}
      <mesh position={[-TRACK_WIDTH / 2 - 0.5, BARRIER_HEIGHT + 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 4, 8]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} />
      </mesh>
      {/* Right post */}
      <mesh position={[TRACK_WIDTH / 2 + 0.5, BARRIER_HEIGHT + 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 4, 8]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} />
      </mesh>
      {/* Top beam */}
      <mesh ref={ref} position={[0, BARRIER_HEIGHT + 3, 0]}>
        <boxGeometry args={[TRACK_WIDTH + 2, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* START/FINISH text light */}
      <pointLight position={[0, BARRIER_HEIGHT + 2, 0]} color="#00d4ff" intensity={3} distance={15} decay={2} />
    </group>
  )
}

export default function Track() {
  const asphaltTexture = useMemo(() => generateAsphaltTexture(512), [])
  const normalMap = useMemo(() => generateNormalMap(512), [])

  // ── Build the closed curve ──────────────────────────────────────────────────
  const curve = useMemo(() => {
    const points = TRACK_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z))
    return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5)
  }, [])

  // ── Road surface (extruded along curve) ────────────────────────────────────
  const roadGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-TRACK_WIDTH / 2, 0)
    shape.lineTo(TRACK_WIDTH / 2, 0)
    shape.lineTo(TRACK_WIDTH / 2, 0.15)  // road thickness
    shape.lineTo(-TRACK_WIDTH / 2, 0.15)
    shape.closePath()

    const extrudeSettings = {
      steps: TRACK_SEGMENTS,
      extrudePath: curve,
      bevelEnabled: false,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [curve])

  // ── Barrier geometry (left & right sides) ──────────────────────────────────
  const barrierGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(0.4, 0)
    shape.lineTo(0.4, BARRIER_HEIGHT)
    shape.lineTo(0, BARRIER_HEIGHT)
    shape.closePath()

    const makeBarrier = (offset: number) => {
      const offsetCurve = new THREE.CatmullRomCurve3(
        curve.getPoints(TRACK_SEGMENTS).map((p, i) => {
          const t = i / TRACK_SEGMENTS
          const tangent = curve.getTangentAt(t)
          const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
          return p.clone().add(normal.multiplyScalar(offset))
        }),
        true
      )
      return new THREE.ExtrudeGeometry(shape, {
        steps: TRACK_SEGMENTS,
        extrudePath: offsetCurve,
        bevelEnabled: false,
      })
    }
    return { left: makeBarrier(-TRACK_WIDTH / 2 - 0.5), right: makeBarrier(TRACK_WIDTH / 2 + 0.1) }
  }, [curve])

  // ── Start/finish gate position ──────────────────────────────────────────────
  const startGate = useMemo(() => {
    const point = curve.getPointAt(0)
    const tangent = curve.getTangentAt(0)
    const angle = Math.atan2(tangent.x, tangent.z)
    return {
      position: point.clone().setY(0),
      rotation: new THREE.Euler(0, angle, 0),
    }
  }, [curve])

  return (
    <group>
      {/* ── Road Surface ─────────────────────────────────────────────────── */}
      <mesh geometry={roadGeometry} receiveShadow castShadow>
        <meshStandardMaterial
          map={asphaltTexture}
          normalMap={normalMap}
          roughness={0.75}
          metalness={0.05}
          color="#333333"
        />
      </mesh>

      {/* ── Barriers ─────────────────────────────────────────────────────── */}
      <mesh geometry={barrierGeometry.left} castShadow receiveShadow>
        <meshStandardMaterial
          color="#cc2222"
          roughness={0.6}
          metalness={0.1}
          emissive="#880000"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh geometry={barrierGeometry.right} castShadow receiveShadow>
        <meshStandardMaterial
          color="#cc2222"
          roughness={0.6}
          metalness={0.1}
          emissive="#880000"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* ── Start/Finish Gate ─────────────────────────────────────────────── */}
      <CheckpointGate position={startGate.position} rotation={startGate.rotation} />

      {/* ── Trees ────────────────────────────────────────────────────────── */}
      {TREE_POSITIONS.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}

      {/* ── Track edge white lines ────────────────────────────────────────── */}
      {/* Rendered via the asphalt texture lane markings */}
    </group>
  )
}
```

✅ **Phase 5 complete.**

---

---

# PHASE 6 — Car Component with Physics

## Goal
Build the detailed car mesh with PBR materials, physics-based movement using `useFrame`, exhaust/drift particle effects, and headlights.

## Steps

### 6.1 — Create `src/components/game/Car.tsx`

```tsx
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import {
  computeSpeedDelta,
  computeSteeringDelta,
  shouldDrift,
  clamp,
  lerp,
  PHYSICS,
} from '../../utils/physics'

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Single wheel with rotation animation */
function Wheel({
  position,
  isSteering = false,
  steerAngle = 0,
}: {
  position: [number, number, number]
  isSteering?: boolean
  steerAngle?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = useGameStore.getState().car.speed
      meshRef.current.rotation.x -= (speed / 20) * delta * 5
    }
  })

  return (
    <group position={position} rotation={[0, isSteering ? steerAngle : 0, 0]}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.32, 0.32, 0.22, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.24, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.15} />
      </mesh>
    </group>
  )
}

/** Car body + details */
function CarBody({ isDrifting, speed }: { isDrifting: boolean; speed: number }) {
  const bodyColor = '#c0392b'    // Racing red
  const accentColor = '#ff6600'  // Orange accent

  return (
    <group>
      {/* Main body */}
      <mesh castShadow position={[0, 0.28, 0]}>
        <boxGeometry args={[1.8, 0.45, 4.2]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.95}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1.0}
        />
      </mesh>

      {/* Cabin / roof */}
      <mesh castShadow position={[0, 0.65, -0.2]}>
        <boxGeometry args={[1.55, 0.38, 2.1]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.4}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
        />
      </mesh>

      {/* Windshield (glass) */}
      <mesh position={[0, 0.62, 0.85]}>
        <boxGeometry args={[1.5, 0.35, 0.05]} />
        <meshPhysicalMaterial
          color="#88ccff"
          metalness={0.0}
          roughness={0.0}
          transmission={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Rear windshield */}
      <mesh position={[0, 0.62, -1.25]}>
        <boxGeometry args={[1.5, 0.32, 0.05]} />
        <meshPhysicalMaterial
          color="#88ccff"
          metalness={0.0}
          roughness={0.0}
          transmission={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Front bumper */}
      <mesh castShadow position={[0, 0.15, 2.15]}>
        <boxGeometry args={[1.85, 0.28, 0.18]} />
        <meshStandardMaterial color={accentColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Rear spoiler */}
      <mesh castShadow position={[0, 0.72, -2.1]}>
        <boxGeometry args={[1.6, 0.08, 0.5]} />
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Spoiler stands */}
      <mesh castShadow position={[-0.65, 0.52, -2.1]}>
        <boxGeometry args={[0.06, 0.35, 0.12]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0.65, 0.52, -2.1]}>
        <boxGeometry args={[0.06, 0.35, 0.12]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.55, 0.32, 2.12]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.55, 0.32, 2.12]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Tail lights */}
      <mesh position={[-0.55, 0.32, -2.12]}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.55, 0.32, -2.12]}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>

      {/* Headlight point lights */}
      <pointLight position={[-0.55, 0.35, 2.5]} intensity={speed > 5 ? 4 : 0} color="#ffffff" distance={18} decay={2} />
      <pointLight position={[0.55, 0.35, 2.5]} intensity={speed > 5 ? 4 : 0} color="#ffffff" distance={18} decay={2} />
      {/* Tail brake light */}
      <pointLight position={[0, 0.3, -2.5]} intensity={isDrifting ? 3 : 1} color="#ff2200" distance={8} decay={2} />
    </group>
  )
}

// ─── Main Car Component ────────────────────────────────────────────────────────
export default function Car() {
  const groupRef = useRef<THREE.Group>(null)
  const steerAngleRef = useRef(0)
  const velocityRef = useRef(new THREE.Vector3())
  const driftScoreTimer = useRef(0)

  const { updateCar, addScore, game } = useGameStore()

  useEffect(() => {
    // Set initial car position
    if (groupRef.current) {
      groupRef.current.position.set(0, 0.4, -40)
    }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (game.phase !== 'racing' && game.phase !== 'countdown') return

    const { controls, car } = useGameStore.getState()
    const { forward, backward, left, right, nitro, drift, brake } = controls

    // ── Speed update ─────────────────────────────────────────────────────────
    const isTurning = left || right
    const isDrifting = shouldDrift(car.speed, drift, isTurning)
    const nitroAvailable = car.nitro > 5

    const speedDelta = computeSpeedDelta(
      car.speed, forward, backward, brake, nitro, nitroAvailable, delta
    )
    const newSpeed = clamp(
      car.speed + speedDelta,
      -PHYSICS.MAX_REVERSE_SPEED,
      PHYSICS.MAX_SPEED
    )

    // ── Nitro ────────────────────────────────────────────────────────────────
    let newNitro = car.nitro
    if (nitro && nitroAvailable && forward) {
      newNitro = clamp(car.nitro - PHYSICS.NITRO_DRAIN * delta, 0, 100)
    } else {
      newNitro = clamp(car.nitro + PHYSICS.NITRO_RECHARGE * delta, 0, 100)
    }

    // ── Steering ─────────────────────────────────────────────────────────────
    const steerDelta = computeSteeringDelta(newSpeed, left, right, isDrifting, delta)
    groupRef.current.rotation.y += steerDelta

    // Animate front wheel steering
    const targetSteer = (left ? 0.45 : right ? -0.45 : 0)
    steerAngleRef.current = lerp(steerAngleRef.current, targetSteer, delta * 8)

    // ── Position update ──────────────────────────────────────────────────────
    const direction = new THREE.Vector3(
      Math.sin(groupRef.current.rotation.y),
      0,
      Math.cos(groupRef.current.rotation.y)
    )

    // Drift slide: add lateral offset
    if (isDrifting) {
      const lateral = new THREE.Vector3(
        Math.sin(groupRef.current.rotation.y + Math.PI / 2),
        0,
        Math.cos(groupRef.current.rotation.y + Math.PI / 2)
      )
      const slideStrength = (newSpeed / PHYSICS.MAX_SPEED) * 0.3
      direction.add(lateral.multiplyScalar(right ? slideStrength : -slideStrength)).normalize()
    }

    const moveAmount = (newSpeed / 3.6) * delta  // convert km/h → m/s
    groupRef.current.position.addScaledVector(direction, moveAmount)

    // Keep car above ground
    groupRef.current.position.y = 0.4

    // ── Car tilt on steering ─────────────────────────────────────────────────
    const tiltTarget = (right ? -0.06 : left ? 0.06 : 0) * (newSpeed / 100)
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, tiltTarget, delta * 5)

    // ── Score for drifting ───────────────────────────────────────────────────
    if (isDrifting) {
      driftScoreTimer.current += delta
      if (driftScoreTimer.current >= 1) {
        addScore({
          type: 'drift',
          points: PHYSICS.DRIFT_SCORE_PER_SECOND,
          timestamp: Date.now(),
          message: `🔥 DRIFTING +${PHYSICS.DRIFT_SCORE_PER_SECOND}`,
        })
        driftScoreTimer.current = 0
      }
    } else {
      driftScoreTimer.current = 0
    }

    // ── Sync state to store ──────────────────────────────────────────────────
    updateCar({
      position: {
        x: groupRef.current.position.x,
        y: groupRef.current.position.y,
        z: groupRef.current.position.z,
      },
      rotation: {
        x: groupRef.current.rotation.x,
        y: groupRef.current.rotation.y,
        z: groupRef.current.rotation.z,
      },
      speed: newSpeed,
      nitro: newNitro,
      isDrifting,
      isNitroActive: nitro && nitroAvailable && forward,
    })
  })

  const { car } = useGameStore()

  return (
    <group ref={groupRef}>
      <CarBody isDrifting={car.isDrifting} speed={car.speed} />

      {/* ── Wheels ──────────────────────────────────────────────────────── */}
      {/* Front left */}
      <Wheel position={[-0.92, 0, 1.3]} isSteering steerAngle={steerAngleRef.current} />
      {/* Front right */}
      <Wheel position={[0.92, 0, 1.3]} isSteering steerAngle={steerAngleRef.current} />
      {/* Rear left */}
      <Wheel position={[-0.92, 0, -1.3]} />
      {/* Rear right */}
      <Wheel position={[0.92, 0, -1.3]} />

      {/* ── Exhaust Trail ───────────────────────────────────────────────── */}
      {car.speed > 60 && (
        <>
          <Trail
            width={0.3}
            length={6}
            color={car.isNitroActive ? '#ff6600' : '#888888'}
            attenuation={(t) => t * t}
          >
            <mesh position={[-0.3, 0.12, -2.15]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={car.isNitroActive ? '#ff6600' : '#666'} />
            </mesh>
          </Trail>
          <Trail
            width={0.3}
            length={6}
            color={car.isNitroActive ? '#ff6600' : '#888888'}
            attenuation={(t) => t * t}
          >
            <mesh position={[0.3, 0.12, -2.15]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={car.isNitroActive ? '#ff6600' : '#666'} />
            </mesh>
          </Trail>
        </>
      )}

      {/* ── Drift Sparks ────────────────────────────────────────────────── */}
      {car.isDrifting && (
        <Sparkles
          count={30}
          size={3}
          speed={2}
          opacity={0.9}
          color="#ffaa00"
          scale={[1.5, 0.3, 1.5]}
          position={[0, 0, -1.5]}
        />
      )}

      {/* ── Nitro Glow ──────────────────────────────────────────────────── */}
      {car.isNitroActive && (
        <pointLight position={[0, 0.2, -2.2]} color="#ff6600" intensity={6} distance={5} decay={2} />
      )}
    </group>
  )
}
```

✅ **Phase 6 complete.**

---

---

# PHASE 7 — Camera Controller & Post-Processing Effects

## Steps

### 7.1 — Create `src/components/game/CameraController.tsx`

```tsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { lerp } from '../../utils/physics'

const CAMERA_OFFSET = new THREE.Vector3(0, 3.5, 8)
const CAMERA_LOOK_AHEAD = 3   // how far ahead of car to look

export default function CameraController() {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 4, 10))
  const targetLook = useRef(new THREE.Vector3())
  const lerpSpeed = 0.08  // smooth camera follow

  useFrame(() => {
    const { car, game } = useGameStore.getState()
    if (game.phase !== 'racing' && game.phase !== 'countdown' && game.phase !== 'finished') return

    const { position, rotation, speed } = car
    const rotY = rotation.y

    // Compute desired camera position behind the car
    // Offset gets farther at higher speeds for dramatic effect
    const speedOffset = Math.min(Math.abs(speed) / 150, 1) * 2
    const desiredX = position.x - Math.sin(rotY) * (CAMERA_OFFSET.z + speedOffset)
    const desiredY = position.y + CAMERA_OFFSET.y
    const desiredZ = position.z - Math.cos(rotY) * (CAMERA_OFFSET.z + speedOffset)

    // Look slightly ahead of the car
    const lookX = position.x + Math.sin(rotY) * CAMERA_LOOK_AHEAD
    const lookY = position.y + 0.8
    const lookZ = position.z + Math.cos(rotY) * CAMERA_LOOK_AHEAD

    // Smooth lerp
    targetPos.current.set(
      lerp(targetPos.current.x, desiredX, lerpSpeed),
      lerp(targetPos.current.y, desiredY, lerpSpeed),
      lerp(targetPos.current.z, desiredZ, lerpSpeed)
    )
    targetLook.current.set(
      lerp(targetLook.current.x, lookX, lerpSpeed * 1.2),
      lerp(targetLook.current.y, lookY, lerpSpeed * 1.2),
      lerp(targetLook.current.z, lookZ, lerpSpeed * 1.2)
    )

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLook.current)
  })

  return null
}
```

### 7.2 — Create `src/components/game/Effects.tsx`

```tsx
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useGameStore } from '../../store/gameStore'

/**
 * Post-processing effects stack.
 * Quality adapts based on store's game.quality setting.
 */
export default function Effects() {
  const quality = useGameStore((s) => s.game.quality)
  const isDrifting = useGameStore((s) => s.car.isDrifting)
  const isNitro = useGameStore((s) => s.car.isNitroActive)
  const speed = useGameStore((s) => s.car.speed)

  // Dynamic effect intensity based on speed and state
  const bloomIntensity = quality === 'low' ? 0.8 : isDrifting ? 2.5 : isNitro ? 3.0 : 1.5
  const chromaOffset = speed > 120 ? 0.004 : isNitro ? 0.006 : 0.002

  if (quality === 'low') {
    return (
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>
    )
  }

  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.05}
        bokehScale={quality === 'high' ? 3 : 1.5}
        height={quality === 'high' ? 480 : 240}
      />
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.7}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[chromaOffset, chromaOffset] as unknown as import('three').Vector2}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette eskil={false} offset={0.35} darkness={0.8} />
    </EffectComposer>
  )
}
```

### 7.3 — Create `src/components/game/Scene.tsx`

```tsx
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import Environment from './Environment'
import Track from './Track'
import Car from './Car'
import CameraController from './CameraController'
import Effects from './Effects'
import { useGameStore } from '../../store/gameStore'
import { useKeyboard } from '../../hooks/useKeyboard'
import { useGameLoop } from '../../hooks/useGameLoop'

/** Inner component (has access to R3F context) */
function GameWorld() {
  useKeyboard()
  useGameLoop()
  return (
    <>
      <Environment />
      <Track />
      <Car />
      <CameraController />
      <Effects />
    </>
  )
}

export default function Scene() {
  const quality = useGameStore((s) => s.game.quality)

  return (
    <Canvas
      shadows
      camera={{ fov: 75, near: 0.1, far: 500 }}
      dpr={quality === 'low' ? [0.5, 1] : quality === 'medium' ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: quality !== 'low',
        powerPreference: 'high-performance',
        alpha: false,
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0.5, restitution: 0.1 }}>
          <GameWorld />
        </Physics>
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
```

✅ **Phase 7 complete.**

---

---

# PHASE 8 — HUD UI Components

## Goal
Build all glassmorphic HUD elements: Speedometer, Lap Timer, Nitro Bar, Minimap, Score Feed, FPS Counter, and the mobile controls overlay.

## Steps

### 8.1 — Create `src/components/ui/Speedometer.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { mapRange } from '../../utils/helpers'

/**
 * Circular speedometer with arc progress indicator.
 * Shows speed in km/h, gear-like needle arc using SVG.
 */
export default function Speedometer() {
  const speed = useGameStore((s) => Math.abs(s.car.speed))
  const isNitro = useGameStore((s) => s.car.isNitroActive)
  const maxSpeed = 200

  const percentage = Math.min(speed / maxSpeed, 1)
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const arcLength = circumference * 0.75  // 270 degree arc
  const offset = circumference - arcLength * percentage

  // Color shifts red as speed increases
  const speedColor = speed > 160 ? '#ff073a' : speed > 100 ? '#ff6600' : '#39ff14'

  return (
    <div className={`glass-panel p-3 select-none ${isNitro ? 'neon-border-orange animate-glow' : 'neon-border-green'} border`}>
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background arc */}
        <svg className="absolute inset-0 w-full h-full -rotate-[135deg]" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Speed arc */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={speedColor}
            strokeWidth="8"
            strokeDasharray={`${arcLength * percentage} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${speedColor})`,
              transition: 'stroke-dasharray 0.1s ease-out, stroke 0.3s ease',
            }}
          />
        </svg>

        {/* Center display */}
        <div className="flex flex-col items-center z-10">
          <span
            className="font-game font-bold text-2xl leading-none"
            style={{ color: speedColor, textShadow: `0 0 10px ${speedColor}` }}
          >
            {Math.round(speed)}
          </span>
          <span className="font-game text-[9px] text-white/50 mt-0.5 uppercase tracking-widest">km/h</span>
          {isNitro && (
            <span className="font-game text-[8px] neon-text-orange uppercase tracking-widest animate-pulse-fast mt-0.5">
              NITRO
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
```

### 8.2 — Create `src/components/ui/LapTimer.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { formatTime } from '../../utils/helpers'

export default function LapTimer() {
  const lapTime = useGameStore((s) => s.car.lapTime)
  const bestLapTime = useGameStore((s) => s.car.bestLapTime)
  const currentLap = useGameStore((s) => s.car.currentLap)
  const totalLaps = useGameStore((s) => s.car.totalLaps)
  const score = useGameStore((s) => s.game.score)
  const highScore = useGameStore((s) => s.game.highScore)

  const isNewBest = isFinite(bestLapTime) && lapTime > bestLapTime * 0.9 && lapTime < bestLapTime

  return (
    <div className="glass-panel border neon-border-blue p-3 min-w-[160px] animate-slide-in">
      {/* Lap counter */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-game text-[10px] text-white/40 uppercase tracking-widest">Lap</span>
        <span className="font-game font-bold text-lg neon-text-blue">
          {currentLap} <span className="text-white/30 text-sm">/ {totalLaps}</span>
        </span>
      </div>

      {/* Current lap time */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Current</span>
        <span className={`font-game text-sm font-semibold ${isNewBest ? 'neon-text-green' : 'text-white'}`}>
          {formatTime(lapTime)}
        </span>
      </div>

      {/* Best lap */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Best</span>
        <span className="font-game text-sm font-semibold neon-text-orange">
          {isFinite(bestLapTime) ? formatTime(bestLapTime) : '--:--.---'}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 my-1" />

      {/* Score */}
      <div className="flex items-center justify-between">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Score</span>
        <span className="font-game text-sm font-bold neon-text-blue">{score.toLocaleString()}</span>
      </div>
      {highScore > 0 && (
        <div className="flex items-center justify-between mt-0.5">
          <span className="font-game text-[8px] text-white/30 uppercase tracking-widest">Best</span>
          <span className="font-game text-[11px] text-white/50">{highScore.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}
```

### 8.3 — Create `src/components/ui/NitroIndicator.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function NitroIndicator() {
  const nitro = useGameStore((s) => s.car.nitro)
  const isActive = useGameStore((s) => s.car.isNitroActive)
  const isDrifting = useGameStore((s) => s.car.isDrifting)

  const color = nitro > 60 ? '#00d4ff' : nitro > 25 ? '#ff6600' : '#ff073a'
  const label = isActive ? 'NITRO ACTIVE' : nitro < 10 ? 'RECHARGING' : 'NITRO READY'

  return (
    <div className={`glass-panel border p-2.5 min-w-[150px] ${isActive ? 'neon-border-orange animate-pulse-fast' : 'neon-border-blue'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">⚡ Boost</span>
        <span
          className="font-game text-[9px] font-bold uppercase tracking-wide"
          style={{ color, textShadow: `0 0 8px ${color}` }}
        >
          {label}
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-0.5">
        {Array.from({ length: 20 }).map((_, i) => {
          const filled = (i / 20) * 100 < nitro
          return (
            <div
              key={i}
              className="flex-1 h-3 rounded-[2px] transition-all duration-75"
              style={{
                background: filled ? color : 'rgba(255,255,255,0.06)',
                boxShadow: filled ? `0 0 4px ${color}80` : 'none',
              }}
            />
          )
        })}
      </div>

      {/* Percentage */}
      <div className="flex justify-end mt-1">
        <span
          className="font-game text-[9px] font-bold"
          style={{ color, textShadow: `0 0 8px ${color}` }}
        >
          {Math.round(nitro)}%
        </span>
      </div>

      {/* Drift indicator */}
      {isDrifting && (
        <div className="mt-1 text-center">
          <span className="font-game text-[9px] neon-text-orange animate-pulse-fast uppercase tracking-widest">
            🔥 DRIFTING
          </span>
        </div>
      )}
    </div>
  )
}
```

### 8.4 — Create `src/components/ui/Minimap.tsx`

```tsx
import { useEffect, useRef } from 'react'
import { useGameStore } from '../../store/gameStore'

// Track points for minimap (scaled down version of 3D track)
const MINIMAP_POINTS = [
  [50, 10], [60, 22], [75, 45], [78, 70], [72, 90],
  [55, 105], [35, 112], [15, 108], [-5, 105], [-25, 112],
  [-45, 105], [-62, 90], [-68, 70], [-65, 45], [-50, 22], [-40, 10],
]

export default function Minimap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const carPos = useGameStore((s) => s.car.position)
  const carRot = useGameStore((s) => s.car.rotation.y)

  const SIZE = 130
  const TRACK_SCALE = 0.7  // scale to fit within minimap

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      const cx = SIZE / 2, cy = SIZE / 2

      // Background
      ctx.fillStyle = 'rgba(0,0,0,0.6)'
      ctx.beginPath()
      ctx.arc(cx, cy, cx - 2, 0, Math.PI * 2)
      ctx.fill()

      // Circular clip
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, cx - 4, 0, Math.PI * 2)
      ctx.clip()

      // Draw track outline
      ctx.strokeStyle = 'rgba(100,100,100,0.5)'
      ctx.lineWidth = 8
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      MINIMAP_POINTS.forEach(([x, y], i) => {
        const mx = cx + (x - 20) * TRACK_SCALE * 0.55
        const my = cy + (y - 60) * TRACK_SCALE * 0.55
        if (i === 0) ctx.moveTo(mx, my)
        else ctx.lineTo(mx, my)
      })
      ctx.closePath()
      ctx.stroke()

      // Track center line
      ctx.strokeStyle = '#00d4ff40'
      ctx.lineWidth = 3
      ctx.setLineDash([4, 4])
      ctx.stroke()
      ctx.setLineDash([])

      // Start line
      const [sx, sy] = MINIMAP_POINTS[0]
      const smx = cx + (sx - 20) * TRACK_SCALE * 0.55
      const smy = cy + (sy - 60) * TRACK_SCALE * 0.55
      ctx.fillStyle = '#00d4ff'
      ctx.shadowColor = '#00d4ff'
      ctx.shadowBlur = 6
      ctx.fillRect(smx - 4, smy - 2, 8, 4)
      ctx.shadowBlur = 0

      // Car dot
      const mapX = cx + carPos.x * TRACK_SCALE * 0.75
      const mapY = cy + carPos.z * TRACK_SCALE * 0.55

      // Car direction arrow
      ctx.save()
      ctx.translate(mapX, mapY)
      ctx.rotate(-carRot)
      ctx.fillStyle = '#ff073a'
      ctx.shadowColor = '#ff073a'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.moveTo(0, -6)
      ctx.lineTo(4, 4)
      ctx.lineTo(0, 2)
      ctx.lineTo(-4, 4)
      ctx.closePath()
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.restore()

      ctx.restore()

      // Border ring
      ctx.strokeStyle = 'rgba(0,212,255,0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, cx - 3, 0, Math.PI * 2)
      ctx.stroke()
    }

    const interval = setInterval(draw, 50) // 20fps for minimap
    return () => clearInterval(interval)
  }, [carPos, carRot])

  return (
    <div className="glass-panel border neon-border-blue p-1.5">
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Map</span>
        <span className="font-game text-[9px] neon-text-blue">◉ Live</span>
      </div>
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        style={{ borderRadius: '50%', display: 'block' }}
      />
    </div>
  )
}
```

### 8.5 — Create `src/components/ui/FPSCounter.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

/** Development-only FPS + quality indicator */
export default function FPSCounter() {
  const fps = useGameStore((s) => s.game.fps)
  const quality = useGameStore((s) => s.game.quality)

  const fpsColor = fps >= 55 ? '#39ff14' : fps >= 40 ? '#ff6600' : '#ff073a'
  const qualityEmoji = quality === 'high' ? '🟢' : quality === 'medium' ? '🟡' : '🔴'

  return (
    <div className="glass-panel border border-white/10 px-2 py-1 text-right">
      <div className="font-game text-[10px] font-bold" style={{ color: fpsColor }}>
        {fps} FPS
      </div>
      <div className="font-game text-[8px] text-white/40 uppercase">
        {qualityEmoji} {quality}
      </div>
    </div>
  )
}
```

### 8.6 — Create `src/components/ui/ScoreFeed.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

/** Animated score popup feed */
export default function ScoreFeed() {
  const scoreEvents = useGameStore((s) => s.scoreEvents)
  const recent = scoreEvents.slice(-4).reverse()

  return (
    <div className="flex flex-col items-center gap-1 pointer-events-none">
      {recent.map((event, i) => (
        <div
          key={event.timestamp}
          className="font-game text-sm font-bold px-3 py-1 glass-panel border border-white/10 animate-slide-in"
          style={{
            opacity: Math.max(0, 1 - i * 0.3),
            color: event.type === 'drift' ? '#ff6600'
              : event.type === 'clean_lap' ? '#39ff14'
              : '#00d4ff',
            textShadow: `0 0 10px currentColor`,
          }}
        >
          {event.message}
        </div>
      ))}
    </div>
  )
}
```

✅ **Phase 8 complete.**

---

---

# PHASE 9 — Screens (Loading, Main Menu, Game Over)

## Steps

### 9.1 — Create `src/components/screens/LoadingScreen.tsx`

```tsx
import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const setPhase = useGameStore((s) => s.setPhase)

  useEffect(() => {
    if (!active && progress === 100) {
      const t = setTimeout(() => setPhase('menu'), 600)
      return () => clearTimeout(t)
    }
  }, [active, progress, setPhase])

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
          Initializing engine systems...
        </p>
      </div>

      {/* Animated car silhouette */}
      <div className="mt-16 text-6xl animate-spin-slow opacity-20">🏎️</div>
    </div>
  )
}
```

### 9.2 — Create `src/components/screens/MainMenu.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function MainMenu() {
  const setPhase = useGameStore((s) => s.setPhase)
  const highScore = useGameStore((s) => s.game.highScore)

  const handleStart = () => {
    setPhase('countdown')
    setTimeout(() => setPhase('racing'), 3000)
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="font-game font-black text-6xl md:text-8xl neon-text-blue tracking-wider mb-2">
          APEX<span className="neon-text-orange">RUSH</span>
        </h1>
        <p className="font-game text-white/40 text-sm md:text-base uppercase tracking-[0.5em]">
          3D Racing Experience
        </p>
        {highScore > 0 && (
          <p className="font-game text-sm neon-text-orange mt-2">
            🏆 Best Score: {highScore.toLocaleString()}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs px-4">
        <button
          onClick={handleStart}
          className="font-game font-bold text-sm uppercase tracking-widest py-4 px-8 glass-panel border neon-border-blue neon-text-blue hover:bg-white/10 transition-all duration-200 active:scale-95"
          style={{ letterSpacing: '0.3em' }}
        >
          ▶ Start Race
        </button>
        <button
          className="font-game text-xs uppercase tracking-widest py-3 px-8 glass-panel border border-white/10 text-white/40 hover:text-white/70 transition-all duration-200"
          onClick={() => alert('Select Track — Coming Soon')}
        >
          🗺 Select Track
        </button>
        <button
          className="font-game text-xs uppercase tracking-widest py-3 px-8 glass-panel border border-white/10 text-white/40 hover:text-white/70 transition-all duration-200"
          onClick={() => alert('Leaderboard — Coming Soon')}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* Controls hint */}
      <div className="mt-10 glass-panel border border-white/10 p-4 max-w-sm mx-4">
        <p className="font-game text-[9px] text-white/30 uppercase tracking-widest mb-2 text-center">Controls</p>
        <div className="grid grid-cols-2 gap-1 text-[10px] font-game text-white/50">
          <span>↑ / W</span><span className="text-white/30">Accelerate</span>
          <span>↓ / S</span><span className="text-white/30">Brake / Reverse</span>
          <span>← → / A D</span><span className="text-white/30">Steer</span>
          <span>SPACE</span><span className="text-white/30">Nitro Boost</span>
          <span>SHIFT</span><span className="text-white/30">Drift</span>
          <span>ESC / P</span><span className="text-white/30">Pause</span>
        </div>
      </div>
    </div>
  )
}
```

### 9.3 — Create `src/components/screens/GameOver.tsx`

```tsx
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
```

✅ **Phase 9 complete.**

---

---

# PHASE 10 — HUD Composition & Mobile Controls

## Steps

### 10.1 — Create `src/components/HUD.tsx`

```tsx
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

  if (phase === 'menu' || phase === 'loading' || phase === 'finished') return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20 p-3 md:p-4">

      {/* ── Top Row ───────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start">
        {/* Top-left: Lap Timer */}
        <div className="pointer-events-auto animate-slide-in">
          <LapTimer />
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
  // Simple countdown display — in real implementation, use useEffect with timer
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="font-game font-black text-9xl neon-text-orange animate-pulse">
        GO!
      </div>
    </div>
  )
}
```

✅ **Phase 10 complete.**

---

---

# PHASE 11 — App Root & Final Integration

## Steps

### 11.1 — Create `src/App.tsx`

```tsx
import { Suspense } from 'react'
import Scene from './components/game/Scene'
import HUD from './components/HUD'
import LoadingScreen from './components/screens/LoadingScreen'
import MainMenu from './components/screens/MainMenu'
import GameOver from './components/screens/GameOver'
import { useGameStore } from './store/gameStore'

export default function App() {
  const phase = useGameStore((s) => s.game.phase)

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none">
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
```

### 11.2 — Update `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### 11.3 — Initialize game phase correctly

In `src/store/gameStore.ts`, change the default phase to `'loading'` so the loading screen shows first:
```ts
// In defaultGame:
phase: 'loading' as GamePhase,
```

### 11.4 — Final build check

```bash
npm run build
```
Zero errors required. Fix all TypeScript issues before proceeding.

✅ **Phase 11 complete.**

---

---

# PHASE 12 — README & Polish

## Steps

### 12.1 — Create `README.md`

Write a README containing:
1. **Project title** with emoji: `🏎️ ApexRush — 3D Web Racing Game`
2. **Live Demo link** placeholder: `https://apexrush.vercel.app`
3. **Feature list** (all implemented features with ✅)
4. **Setup instructions** (clone, npm install, npm run dev)
5. **Controls table** (keyboard layout)
6. **Tech stack badges**
7. **Performance tips**
8. **Folder structure overview**
9. **Portfolio highlights section** listing: PBR materials, adaptive quality, Zustand state, glassmorphism HUD, physics movement, post-processing

### 12.2 — Polish Checklist (verify all items)

```
[ ] Game loads to loading screen → transitions to menu → starts on click
[ ] Car moves with arrow keys / WASD
[ ] Drift activates with Shift (speed > 60 km/h required)
[ ] Nitro boosts speed, bar depletes, auto-recharges
[ ] Speedometer arc animates in real time
[ ] Lap timer counts up, shows best lap
[ ] Score increments on drift (1 pt/s) and lap completion
[ ] Score feed shows animated popups
[ ] Post-processing Bloom visible on neon elements
[ ] Camera smoothly follows car with lerp
[ ] Minimap shows car position and heading
[ ] Mobile controls appear on ≤768px screen
[ ] Pause (ESC/P) works, resumes correctly
[ ] Game Over screen on finishing all laps
[ ] High score persisted in localStorage
[ ] No TypeScript errors
[ ] npm run build succeeds
[ ] 60 FPS on mid-range GPU (Chrome DevTools perf check)
[ ] Glassmorphism HUD panels visible with blur + border
[ ] Trees and barriers render on track
[ ] Exhaust trail appears at high speed
[ ] Drift sparkles appear during drift
[ ] Nitro glow + trail turns orange when active
```

### 12.3 — Optional Enhancements (do after core is working)

If time permits, implement these in order:

1. **Checkpoint collision detection** — use invisible trigger boxes at 4 checkpoints around the track; detect when car passes through using distance checks in `useFrame`
2. **Tire marks** — `DecalGeometry` or canvas-painted quads on the ground when drifting
3. **Engine sound** — use Web Audio API oscillator that pitches up with speed
4. **Night mode toggle** — button in menu toggles ambient light to 0.1, enables headlight shadows, adds star visibility
5. **Ghost car** — record positions array each frame during best lap, replay as semi-transparent mesh

✅ **Phase 12 complete. Full build done.**

---

---

## 🧠 AGENT QUICK REFERENCE

| Phase | What Gets Built | Key Files |
|-------|----------------|-----------|
| 1 | Scaffold + Config | vite.config.ts, tailwind.config.js, index.css |
| 2 | Types + Store | game.types.ts, gameStore.ts |
| 3 | Input Hooks | useKeyboard.ts, useGameLoop.ts, useMobileControls.ts |
| 4 | Utils | physics.ts, helpers.ts, textures.ts |
| 5 | 3D World | Environment.tsx, Track.tsx |
| 6 | Car | Car.tsx |
| 7 | Camera + FX | CameraController.tsx, Effects.tsx, Scene.tsx |
| 8 | HUD | Speedometer, LapTimer, Nitro, Minimap, ScoreFeed, FPS |
| 9 | Screens | LoadingScreen, MainMenu, GameOver |
| 10 | Full HUD + Mobile | HUD.tsx with touch controls |
| 11 | Root + Build | App.tsx, main.tsx |
| 12 | Polish + README | README.md, final checks |

---

## ⚠️ KNOWN GOTCHAS FOR AGENT

1. `@react-three/cannon` may conflict with newer React — use `--legacy-peer-deps`
2. `postprocessing` types: some effects need `as unknown as` casts for Vector2
3. `Trail` component requires a single child mesh, not a group
4. `useFrame` cannot be called outside of `<Canvas>` — all frame hooks must be inside Scene
5. `useGameStore.getState()` (not the hook) must be used inside `useFrame` for performance
6. Canvas `dpr` should use array form `[min, max]` for adaptive resolution
7. Tailwind custom classes (like `glass-panel`) defined in `index.css` won't hot-reload if server isn't restarted — restart after adding new CSS classes
8. `THREE.CatmullRomCurve3` with `closed=true` needs the last point to NOT repeat the first
9. `ExtrudeGeometry` along a path requires `steps` ≥ curve resolution for smooth result
10. On mobile, prevent-default on touchstart for game buttons to avoid scroll interference

---

*End of RACING_GAME_AGENT_PROMPT.md — Feed this file to your agent and say: "Read this file fully, then execute Phase 1. Confirm when done, then proceed to Phase 2."*
