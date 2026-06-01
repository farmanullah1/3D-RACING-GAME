# 🏎️ APEXRUSH PRO — COMPLETE AGENT BUILD PROMPT v2.0
> **AGENT INSTRUCTIONS:** Read this **entire file** before writing a single line of code.
> Execute phases **strictly in order: Phase 1 → 2 → 3 → … → 18**.
> After each phase confirm: `✅ Phase [N] complete — [brief summary]`
> Never stub, mock, or leave `// TODO`. Every component must be **fully implemented**.
> Run `npm run build` after every phase — **zero TypeScript errors** required before proceeding.

---

## 🧭 AGENT OPERATING RULES (NON-NEGOTIABLE)

1. Execute **Phase 1 through Phase 18** in strict sequential order — no skipping
2. **Write every single line of code** — no placeholders, stubs, or TODOs anywhere
3. After each phase: run `npm run build`, fix ALL TypeScript errors, then confirm completion
4. All UI must be **mobile-first responsive** — verify at 375px, 768px, 1024px, 1440px
5. **60 FPS target** — always use `useGameStore.getState()` (not the React hook) inside `useFrame` callbacks
6. If npm install shows peer-dependency errors: append `--legacy-peer-deps` flag
7. Comment **every exported function, class, and non-obvious code block**
8. Use **exact file paths** as specified in the folder structure — no deviations
9. Implement code blocks **exactly as written** in this document
10. Never hallucinate library APIs — only call methods that exist in the installed versions
11. All colors use the **design token system** defined in Phase 1 — no hardcoded hex except in the token file
12. Every screen must have a transition/loading state — no blank white screens ever
13. **localStorage** is the persistence layer — no external database or API calls needed
14. Zustand state updates must be **immutable** (spread operator or immer)
15. After Phase 18: do a full checklist pass and fix anything incomplete before confirming done

---

## 🎯 FINAL DELIVERABLE — ApexRush Pro

A **AAA-quality web-based 3D racing game** with the following complete feature set:

### 🏁 Core Racing
- 6 unique drivable cars with individual stats
- 4 fully distinct racing tracks
- Realistic physics: acceleration, braking, steering, drift, nitro, surface friction
- 3-lap races with checkpoint validation, split times, best lap memory
- AI ghost car replaying the player's best lap
- Damage system: barrier collisions degrade car performance

### 🔐 Auth & User System
- Login / Register screens with full form validation
- Guest play mode (skip auth, no data saved)
- JWT-style token stored in localStorage (fake auth, no backend needed)
- User profile: avatar emoji, username, stats (races, wins, best laps)
- Per-user unlocked cars and high scores

### 🚗 Cars (6 total)
| # | Name | Speed | Handling | Accel | Nitro Cap | Unlock |
|---|------|-------|----------|-------|-----------|--------|
| 1 | Phantom GT | 170 | 7/10 | 7/10 | 100 | Default |
| 2 | Volt Racer | 140 | 8/10 | 10/10 | 80 | Default |
| 3 | Inferno V8 | 220 | 4/10 | 9/10 | 120 | 5 races |
| 4 | Shadow Drift | 150 | 10/10 | 6/10 | 100 | 10 races |
| 5 | Arctic Fox | 160 | 7/10 | 7/10 | 90 | 15 races |
| 6 | Neon Blaze | 200 | 9/10 | 8/10 | 150 | 25 races |

### 🗺️ Tracks (4 total)
| # | Name | Theme | Difficulty | Length |
|---|------|-------|------------|--------|
| 1 | City Circuit | Urban night, wet roads | ⭐⭐ Medium | Short |
| 2 | Mountain Pass | Hairpins, fog, forest | ⭐⭐⭐⭐ Hard | Long |
| 3 | Desert Dunes | Sand, heat shimmer, oasis | ⭐⭐⭐ Medium-Hard | Medium |
| 4 | Night Neon | Glowing barriers, rain | ⭐⭐⭐⭐⭐ Expert | Long |

### 🖥️ All Screens
Loading → Auth (Login/Register) → Main Menu → Car Select → Track Select → Countdown → Race (with HUD) → Results → [Garage / Leaderboard / Profile / Settings]

---

## 🗂️ EXACT FOLDER STRUCTURE (Create This Precisely)

```
apexrush-pro/
├── public/
│   └── (empty — all assets are procedural)
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Scene.tsx
│   │   │   ├── cars/
│   │   │   │   ├── CarBase.tsx
│   │   │   │   ├── PhantomGT.tsx
│   │   │   │   ├── VoltRacer.tsx
│   │   │   │   ├── InfernoV8.tsx
│   │   │   │   ├── ShadowDrift.tsx
│   │   │   │   ├── ArcticFox.tsx
│   │   │   │   └── NeonBlaze.tsx
│   │   │   ├── tracks/
│   │   │   │   ├── TrackBase.tsx
│   │   │   │   ├── CityCircuit.tsx
│   │   │   │   ├── MountainPass.tsx
│   │   │   │   ├── DesertDunes.tsx
│   │   │   │   └── NightNeon.tsx
│   │   │   ├── Environment.tsx
│   │   │   ├── Effects.tsx
│   │   │   ├── CameraController.tsx
│   │   │   ├── GhostCar.tsx
│   │   │   └── Particles.tsx
│   │   ├── ui/
│   │   │   ├── Speedometer.tsx
│   │   │   ├── LapTimer.tsx
│   │   │   ├── NitroBar.tsx
│   │   │   ├── Minimap.tsx
│   │   │   ├── PositionIndicator.tsx
│   │   │   ├── DamageBar.tsx
│   │   │   ├── ScoreFeed.tsx
│   │   │   └── FPSCounter.tsx
│   │   ├── screens/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── AuthScreen.tsx
│   │   │   ├── MainMenu.tsx
│   │   │   ├── CarSelect.tsx
│   │   │   ├── TrackSelect.tsx
│   │   │   ├── RaceCountdown.tsx
│   │   │   ├── RaceResults.tsx
│   │   │   ├── Garage.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── Profile.tsx
│   │   └── HUD.tsx
│   ├── hooks/
│   │   ├── useKeyboard.ts
│   │   ├── useGameLoop.ts
│   │   ├── useMobileControls.ts
│   │   ├── useAudio.ts
│   │   └── useReplay.ts
│   ├── store/
│   │   ├── gameStore.ts
│   │   ├── authStore.ts
│   │   ├── garageStore.ts
│   │   └── settingsStore.ts
│   ├── data/
│   │   ├── cars.ts
│   │   ├── tracks.ts
│   │   └── achievements.ts
│   ├── utils/
│   │   ├── physics.ts
│   │   ├── helpers.ts
│   │   ├── textures.ts
│   │   └── audio.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---
---

# ═══════════════════════════════════════════════
# PHASE 1 — Project Scaffold, Dependencies & Design System
# ═══════════════════════════════════════════════

## Goal
Bootstrap Vite + React + TypeScript, install every dependency, configure Tailwind with the full design token system, and verify `npm run dev` opens without errors.

---

## 1.1 — Create Project

```bash
npm create vite@latest apexrush-pro -- --template react-ts
cd apexrush-pro
```

## 1.2 — Install All Dependencies

```bash
# Core 3D stack
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# State + utilities
npm install zustand

# Styling
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Type definitions
npm install -D @types/three

# If any peer dep conflicts:
npm install --legacy-peer-deps
```

> **Note on @react-three/cannon:** This library has known peer dep issues with React 18. Instead of cannon, implement custom physics in `useFrame` using velocity vectors and delta-time — this gives MORE control anyway. Do NOT install @react-three/cannon.

## 1.3 — `tailwind.config.js` — Full Design System

Replace the file entirely with this exact content:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ── Typography ──────────────────────────────────────────────────
      fontFamily: {
        game:    ['"Orbitron"', 'monospace'],
        display: ['"Rajdhani"', 'sans-serif'],
        mono:    ['"Share Tech Mono"', 'monospace'],
      },
      // ── Design Tokens ───────────────────────────────────────────────
      colors: {
        // Neon accents
        neon: {
          blue:   '#00d4ff',
          cyan:   '#00ffff',
          green:  '#39ff14',
          lime:   '#b4ff00',
          red:    '#ff073a',
          pink:   '#ff00aa',
          orange: '#ff6600',
          yellow: '#ffe600',
          purple: '#bf00ff',
          white:  '#f0f8ff',
        },
        // Glass surfaces
        glass: {
          50:  'rgba(255,255,255,0.05)',
          100: 'rgba(255,255,255,0.08)',
          200: 'rgba(255,255,255,0.12)',
          300: 'rgba(255,255,255,0.18)',
          dark:    'rgba(0,0,0,0.50)',
          darker:  'rgba(0,0,0,0.70)',
          border:  'rgba(255,255,255,0.13)',
          borderHi:'rgba(255,255,255,0.25)',
        },
        // Game UI backgrounds
        ui: {
          bg:      '#050510',
          surface: '#0a0a1f',
          panel:   '#0f0f2a',
          accent:  '#1a1a3e',
          hover:   '#252550',
        },
        // Track themes
        track: {
          city:     '#00d4ff',
          mountain: '#39ff14',
          desert:   '#ff6600',
          neon:     '#bf00ff',
        },
        // Car colors
        car: {
          phantom: '#c0392b',
          volt:    '#00d4ff',
          inferno: '#ff6600',
          shadow:  '#8000ff',
          arctic:  '#a8d8ea',
          neonblaze: '#39ff14',
        },
      },
      // ── Box Shadows (neon glow) ──────────────────────────────────────
      boxShadow: {
        'neon-blue':   '0 0 8px #00d4ff, 0 0 20px #00d4ff60, 0 0 40px #00d4ff20',
        'neon-green':  '0 0 8px #39ff14, 0 0 20px #39ff1460, 0 0 40px #39ff1420',
        'neon-red':    '0 0 8px #ff073a, 0 0 20px #ff073a60, 0 0 40px #ff073a20',
        'neon-orange': '0 0 8px #ff6600, 0 0 20px #ff660060, 0 0 40px #ff660020',
        'neon-purple': '0 0 8px #bf00ff, 0 0 20px #bf00ff60, 0 0 40px #bf00ff20',
        'neon-pink':   '0 0 8px #ff00aa, 0 0 20px #ff00aa60, 0 0 40px #ff00aa20',
        'glass':       '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-lg':    '0 16px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
        'inner-neon':  'inset 0 0 20px rgba(0,212,255,0.15)',
      },
      // ── Animations ──────────────────────────────────────────────────
      animation: {
        'pulse-fast':   'pulse 0.6s ease-in-out infinite',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'spin-slow':    'spin 4s linear infinite',
        'spin-rev':     'spin 4s linear infinite reverse',
        'glow-blue':    'glowBlue 2s ease-in-out infinite alternate',
        'glow-green':   'glowGreen 2s ease-in-out infinite alternate',
        'glow-orange':  'glowOrange 1.5s ease-in-out infinite alternate',
        'float':        'float 3s ease-in-out infinite',
        'slide-up':     'slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-down':   'slideDown 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-left':   'slideLeft 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-right':  'slideRight 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':      'fadeIn 0.5s ease-out forwards',
        'fade-in-fast': 'fadeIn 0.2s ease-out forwards',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'score-pop':    'scorePop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'shake':        'shake 0.4s ease-in-out',
        'scanline':     'scanline 8s linear infinite',
        'radar-sweep':  'radarSweep 3s linear infinite',
        'count-flip':   'countFlip 0.3s ease-in-out',
        'car-intro':    'carIntro 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        glowBlue:   { '0%': { boxShadow: '0 0 5px #00d4ff40' }, '100%': { boxShadow: '0 0 25px #00d4ff, 0 0 50px #00d4ff60' } },
        glowGreen:  { '0%': { boxShadow: '0 0 5px #39ff1440' }, '100%': { boxShadow: '0 0 25px #39ff14, 0 0 50px #39ff1460' } },
        glowOrange: { '0%': { boxShadow: '0 0 5px #ff660040' }, '100%': { boxShadow: '0 0 20px #ff6600, 0 0 40px #ff660060' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        slideUp:    { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown:  { '0%': { transform: 'translateY(-30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideLeft:  { '0%': { transform: 'translateX(30px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideRight: { '0%': { transform: 'translateX(-30px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        fadeIn:     { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn:    { '0%': { transform: 'scale(0.85)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        scorePop:   { '0%': { transform: 'scale(0.5) translateY(0)', opacity: '1' }, '60%': { transform: 'scale(1.2) translateY(-20px)', opacity: '1' }, '100%': { transform: 'scale(1) translateY(-40px)', opacity: '0' } },
        shake:      { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-8px)' }, '40%': { transform: 'translateX(8px)' }, '60%': { transform: 'translateX(-4px)' }, '80%': { transform: 'translateX(4px)' } },
        scanline:   { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '0 100%' } },
        radarSweep: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        countFlip:  { '0%': { transform: 'rotateX(-90deg) scale(0.5)', opacity: '0' }, '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' } },
        carIntro:   { '0%': { transform: 'translateX(-100px) rotateY(20deg)', opacity: '0' }, '100%': { transform: 'translateX(0) rotateY(0deg)', opacity: '1' } },
      },
      // ── Backdrop Blur ───────────────────────────────────────────────
      backdropBlur: { xs: '2px', '4xl': '80px' },
      // ── Border Radius ───────────────────────────────────────────────
      borderRadius: { '4xl': '2rem', '5xl': '3rem' },
    },
  },
  plugins: [],
}
```

## 1.4 — `src/index.css` — Global Styles

```css
/* ── Google Fonts ─────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Reset ────────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { width: 100%; height: 100%; overflow: hidden; background: #050510; }

/* ── Scrollbar ────────────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
::-webkit-scrollbar-thumb { background: #00d4ff50; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #00d4ff; }

/* ── Glass Utilities ──────────────────────────────────────────────────────── */
@layer components {
  .glass {
    @apply bg-glass-100 backdrop-blur-xl border border-glass-border rounded-2xl shadow-glass;
  }
  .glass-sm {
    @apply bg-glass-50 backdrop-blur-md border border-glass-border rounded-xl shadow-glass;
  }
  .glass-dark {
    @apply bg-glass-dark backdrop-blur-xl border border-glass-border rounded-2xl shadow-glass-lg;
  }
  .glass-panel {
    @apply bg-ui-panel backdrop-blur-xl border border-glass-border rounded-2xl;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .glass-card {
    @apply bg-ui-surface backdrop-blur-xl border border-glass-border rounded-3xl;
    box-shadow: 0 16px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .glass-card:hover {
    @apply border-glass-borderHi;
    box-shadow: 0 20px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.05);
    transform: translateY(-2px);
  }

  /* ── Neon Text ──────────────────────────────────────────────────────────── */
  .neon-blue   { color: #00d4ff; text-shadow: 0 0 10px #00d4ff, 0 0 25px #00d4ff60; }
  .neon-green  { color: #39ff14; text-shadow: 0 0 10px #39ff14, 0 0 25px #39ff1460; }
  .neon-red    { color: #ff073a; text-shadow: 0 0 10px #ff073a, 0 0 25px #ff073a60; }
  .neon-orange { color: #ff6600; text-shadow: 0 0 10px #ff6600, 0 0 25px #ff660060; }
  .neon-purple { color: #bf00ff; text-shadow: 0 0 10px #bf00ff, 0 0 25px #bf00ff60; }
  .neon-pink   { color: #ff00aa; text-shadow: 0 0 10px #ff00aa, 0 0 25px #ff00aa60; }
  .neon-yellow { color: #ffe600; text-shadow: 0 0 10px #ffe600, 0 0 25px #ffe60060; }

  /* ── Neon Borders ───────────────────────────────────────────────────────── */
  .border-neon-blue   { border-color: #00d4ff; box-shadow: 0 0 8px #00d4ff50, inset 0 0 8px #00d4ff15; }
  .border-neon-green  { border-color: #39ff14; box-shadow: 0 0 8px #39ff1450, inset 0 0 8px #39ff1415; }
  .border-neon-red    { border-color: #ff073a; box-shadow: 0 0 8px #ff073a50, inset 0 0 8px #ff073a15; }
  .border-neon-orange { border-color: #ff6600; box-shadow: 0 0 8px #ff660050, inset 0 0 8px #ff660015; }
  .border-neon-purple { border-color: #bf00ff; box-shadow: 0 0 8px #bf00ff50, inset 0 0 8px #bf00ff15; }

  /* ── Buttons ────────────────────────────────────────────────────────────── */
  .btn-primary {
    @apply font-game font-bold uppercase tracking-widest text-sm py-3 px-8;
    @apply glass border border-neon-blue neon-blue;
    @apply transition-all duration-200 active:scale-95 select-none cursor-pointer;
  }
  .btn-primary:hover {
    @apply bg-glass-200;
    box-shadow: 0 0 20px #00d4ff40, 0 0 40px #00d4ff20;
  }
  .btn-secondary {
    @apply font-game font-semibold uppercase tracking-widest text-xs py-2.5 px-6;
    @apply glass-sm border border-glass-border text-white/50;
    @apply transition-all duration-200 active:scale-95 select-none cursor-pointer;
  }
  .btn-secondary:hover { @apply text-white/80 bg-glass-100 border-glass-borderHi; }
  .btn-danger {
    @apply font-game font-bold uppercase tracking-widest text-sm py-3 px-8;
    @apply glass border border-neon-red neon-red;
    @apply transition-all duration-200 active:scale-95 select-none cursor-pointer;
  }

  /* ── Form inputs ────────────────────────────────────────────────────────── */
  .game-input {
    @apply w-full bg-ui-accent border border-glass-border rounded-xl px-4 py-3;
    @apply font-game text-sm text-white placeholder-white/30;
    @apply transition-all duration-200 outline-none;
  }
  .game-input:focus {
    @apply border-neon-blue;
    box-shadow: 0 0 0 2px #00d4ff20, inset 0 0 10px #00d4ff08;
  }
  .game-input.error { @apply border-neon-red; }

  /* ── HUD Elements ───────────────────────────────────────────────────────── */
  .hud-panel {
    @apply glass-panel p-2.5 md:p-3;
    animation: slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* ── Stat Bar ───────────────────────────────────────────────────────────── */
  .stat-bar-track { @apply h-1.5 bg-white/5 rounded-full overflow-hidden; }
  .stat-bar-fill  { @apply h-full rounded-full transition-all duration-700; }

  /* ── Scanlines overlay (CRT effect) ────────────────────────────────────── */
  .scanlines::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
    pointer-events: none;
    z-index: 1;
  }

  /* ── Grid background ────────────────────────────────────────────────────── */
  .grid-bg {
    background-image:
      linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* ── Holographic shimmer ────────────────────────────────────────────────── */
  .holo-shimmer {
    background: linear-gradient(135deg, #00d4ff10 0%, #bf00ff10 50%, #00d4ff10 100%);
    background-size: 200% 200%;
    animation: holoShimmer 4s ease infinite;
  }
}

/* ── Canvas ───────────────────────────────────────────────────────────────── */
canvas { display: block; width: 100% !important; height: 100% !important; }

/* ── Touch controls (mobile only) ─────────────────────────────────────────── */
.touch-controls { display: none; }
@media (max-width: 768px) { .touch-controls { display: flex; } }
.desktop-hint   { display: flex; }
@media (max-width: 768px) { .desktop-hint { display: none; } }

/* ── No select on game UI ──────────────────────────────────────────────────── */
.game-ui * { user-select: none; -webkit-user-select: none; }

/* ── Perspective for 3D card effects ──────────────────────────────────────── */
.perspective { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
```

## 1.5 — `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three:    ['three'],
          r3f:      ['@react-three/fiber', '@react-three/drei'],
          fx:       ['@react-three/postprocessing'],
        },
      },
    },
  },
})
```

## 1.6 — Verify

Run `npm run dev`. Browser opens, no console errors.

✅ **Phase 1 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 2 — TypeScript Types (src/types/index.ts)
# ═══════════════════════════════════════════════

## Goal
Define every TypeScript interface used across the entire app in a single well-organized file.

## `src/types/index.ts` — Complete Implementation

```typescript
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
  garageColors: Record  // carId → hex color
  bestLapTimes: Record  // trackId → ms
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
```

✅ **Phase 2 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 3 — Data Files (Cars, Tracks, Achievements)
# ═══════════════════════════════════════════════

## Goal
Define all static game data: 6 cars, 4 tracks, achievements list.

## 3.1 — `src/data/cars.ts`

```typescript
import type { CarDefinition } from '../types'

export const CAR_DEFINITIONS: CarDefinition[] = [
  {
    id: 'phantom_gt',
    name: 'Phantom GT',
    tagline: 'Born for the apex',
    emoji: '🏎️',
    bodyStyle: 'sports',
    defaultColor: '#c0392b',
    accentColor: '#ff6600',
    exhaustColor: '#888888',
    unlockRequirement: 0,
    price: 0,
    description: 'The perfect all-rounder. Precise handling and strong acceleration make it the go-to car for any track.',
    stats: {
      topSpeed:      170,
      acceleration:  7,
      handling:      7,
      braking:       7,
      nitroCapacity: 100,
      nitroBoost:    1.6,
      mass:          1.0,
      driftFactor:   0.5,
      turningRadius: 2.5,
    },
  },
  {
    id: 'volt_racer',
    name: 'Volt Racer',
    tagline: 'Zero to hero instantly',
    emoji: '⚡',
    bodyStyle: 'electric',
    defaultColor: '#00d4ff',
    accentColor: '#00ffff',
    exhaustColor: '#00d4ff',
    unlockRequirement: 0,
    price: 0,
    description: 'Electric torque delivers instant acceleration. Fragile at high speed but unmatched off the line.',
    stats: {
      topSpeed:      140,
      acceleration:  10,
      handling:      8,
      braking:       9,
      nitroCapacity: 80,
      nitroBoost:    1.4,
      mass:          0.85,
      driftFactor:   0.35,
      turningRadius: 2.8,
    },
  },
  {
    id: 'inferno_v8',
    name: 'Inferno V8',
    tagline: 'Unapologetically brutal',
    emoji: '🔥',
    bodyStyle: 'muscle',
    defaultColor: '#ff6600',
    accentColor: '#ff073a',
    exhaustColor: '#ff4400',
    unlockRequirement: 5,
    price: 1500,
    description: 'Massive V8 power with terrifying top speed. Handling is a challenge but mastery is rewarded.',
    stats: {
      topSpeed:      220,
      acceleration:  9,
      handling:      4,
      braking:       5,
      nitroCapacity: 120,
      nitroBoost:    2.0,
      mass:          1.4,
      driftFactor:   0.7,
      turningRadius: 1.8,
    },
  },
  {
    id: 'shadow_drift',
    name: 'Shadow Drift',
    tagline: 'Angles are my language',
    emoji: '👤',
    bodyStyle: 'drift',
    defaultColor: '#8000ff',
    accentColor: '#ff00aa',
    exhaustColor: '#bf00ff',
    unlockRequirement: 10,
    price: 3000,
    description: 'Built for one thing: sideways. Maximum drift angle, pinpoint steering, chassis that begs for corners.',
    stats: {
      topSpeed:      150,
      acceleration:  6,
      handling:      10,
      braking:       8,
      nitroCapacity: 100,
      nitroBoost:    1.5,
      mass:          0.9,
      driftFactor:   0.95,
      turningRadius: 3.8,
    },
  },
  {
    id: 'arctic_fox',
    name: 'Arctic Fox',
    tagline: 'Built for any terrain',
    emoji: '🦊',
    bodyStyle: 'suv',
    defaultColor: '#a8d8ea',
    accentColor: '#ffffff',
    exhaustColor: '#aaaaaa',
    unlockRequirement: 15,
    price: 4500,
    description: 'All-terrain chassis excels on sand and gravel. Reduced grip penalty on off-road surfaces.',
    stats: {
      topSpeed:      160,
      acceleration:  7,
      handling:      7,
      braking:       7,
      nitroCapacity: 90,
      nitroBoost:    1.5,
      mass:          1.1,
      driftFactor:   0.4,
      turningRadius: 2.3,
    },
  },
  {
    id: 'neon_blaze',
    name: 'Neon Blaze',
    tagline: 'Illuminated excellence',
    emoji: '✨',
    bodyStyle: 'supercar',
    defaultColor: '#39ff14',
    accentColor: '#00ffff',
    exhaustColor: '#39ff14',
    unlockRequirement: 25,
    price: 10000,
    description: 'The pinnacle of ApexRush engineering. Glowing underglow, magnetic handling, and a top speed that defies physics.',
    stats: {
      topSpeed:      200,
      acceleration:  8,
      handling:      9,
      braking:       9,
      nitroCapacity: 150,
      nitroBoost:    2.2,
      mass:          0.95,
      driftFactor:   0.6,
      turningRadius: 3.2,
    },
  },
]

export const getCar = (id: string): CarDefinition =>
  CAR_DEFINITIONS.find(c => c.id === id) ?? CAR_DEFINITIONS[0]
```

## 3.2 — `src/data/tracks.ts`

```typescript
import type { TrackDefinition } from '../types'

// ── Helper: generate oval track points ───────────────────────────────────────
function ovalPoints(
  rx: number, rz: number, segments: number,
  cx = 0, cz = 0
): [number, number, number][] {
  return Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2
    return [
      cx + Math.cos(angle) * rx,
      0,
      cz + Math.sin(angle) * rz,
    ] as [number, number, number]
  })
}

export const TRACK_DEFINITIONS: TrackDefinition[] = [
  // ── TRACK 1: City Circuit ───────────────────────────────────────────────────
  {
    id:          'city_circuit',
    name:        'City Circuit',
    subtitle:    'Urban Concrete Jungle',
    theme:       'city',
    difficulty:  2,
    laps:        3,
    surface:     'wet_asphalt',
    timeOfDay:   'night',
    weather:     'rain',
    trackWidth:  10,
    accentColor: '#00d4ff',
    skyColor:    '#050520',
    fogColor:    '#001030',
    fogDensity:  0.008,
    ambientIntensity: 0.3,
    sunDirection:[0.2, 1, 0.5],
    bestLapRecord: 78000,
    description: 'Wet city streets, sharp chicanes, and glowing neon. Master the rain or hydroplane into the barriers.',
    controlPoints: [
      [0,0,-50],  [20,0,-65],  [50,0,-60],  [75,0,-40],
      [80,0,-10], [75,0,20],   [55,0,45],   [30,0,60],
      [0,0,65],   [-30,0,60],  [-55,0,45],  [-75,0,20],
      [-80,0,-10],[-75,0,-40], [-50,0,-60], [-20,0,-65],
    ],
  },
  // ── TRACK 2: Mountain Pass ──────────────────────────────────────────────────
  {
    id:          'mountain_pass',
    name:        'Mountain Pass',
    subtitle:    'Alpine Hairpin Challenge',
    theme:       'mountain',
    difficulty:  4,
    laps:        2,
    surface:     'asphalt',
    timeOfDay:   'golden_hour',
    weather:     'fog',
    trackWidth:  8,
    accentColor: '#39ff14',
    skyColor:    '#ff6030',
    fogColor:    '#ffaa60',
    fogDensity:  0.015,
    ambientIntensity: 0.6,
    sunDirection:[1, 0.3, 0.2],
    bestLapRecord: 115000,
    description: 'Treacherous hairpins through mountain fog. Elevation changes punish late braking. Narrow roads demand precision.',
    controlPoints: [
      [0,0,-60],   [15,2,-75],   [40,5,-78],   [65,8,-65],
      [80,12,-40], [85,15,-10],  [75,12,20],   [55,8,50],
      [30,5,70],   [0,3,75],     [-30,5,70],   [-55,8,50],
      [-75,12,20], [-85,15,-10], [-80,12,-40], [-65,8,-65],
      [-40,5,-78], [-15,2,-75],
    ],
  },
  // ── TRACK 3: Desert Dunes ───────────────────────────────────────────────────
  {
    id:          'desert_dunes',
    name:        'Desert Dunes',
    subtitle:    'Scorched Earth Rally',
    theme:       'desert',
    difficulty:  3,
    laps:        3,
    surface:     'sand',
    timeOfDay:   'day',
    weather:     'sandstorm',
    trackWidth:  12,
    accentColor: '#ff6600',
    skyColor:    '#ff9930',
    fogColor:    '#ffcc80',
    fogDensity:  0.012,
    ambientIntensity: 1.0,
    sunDirection:[1, 1.5, 0.5],
    bestLapRecord: 92000,
    description: 'Wide sandy corners reward bravery. Sandstorms reduce visibility. Arctic Fox has a secret advantage here.',
    controlPoints: [
      [0,0,-55],   [25,0,-70],   [60,0,-68],   [85,0,-50],
      [95,0,-15],  [90,0,20],    [70,0,50],     [40,0,70],
      [0,0,75],    [-40,0,70],   [-70,0,50],    [-90,0,20],
      [-95,0,-15], [-85,0,-50],  [-60,0,-68],   [-25,0,-70],
    ],
  },
  // ── TRACK 4: Night Neon ─────────────────────────────────────────────────────
  {
    id:          'night_neon',
    name:        'Night Neon',
    subtitle:    'Cyberpunk Speed Circuit',
    theme:       'neon',
    difficulty:  5,
    laps:        3,
    surface:     'wet_asphalt',
    timeOfDay:   'night',
    weather:     'rain',
    trackWidth:  9,
    accentColor: '#bf00ff',
    skyColor:    '#020010',
    fogColor:    '#100020',
    fogDensity:  0.01,
    ambientIntensity: 0.15,
    sunDirection:[0, 1, 0],
    bestLapRecord: 88000,
    description: 'A neon-drenched nightmare. Glowing barriers, reflective puddles, psychedelic light shows at every corner.',
    controlPoints: [
      [0,0,-45],   [18,0,-60],   [45,0,-58],   [68,0,-42],
      [78,0,-15],  [75,0,15],    [58,0,42],     [32,0,58],
      [0,0,62],    [-32,0,58],   [-58,0,42],    [-75,0,15],
      [-78,0,-15], [-68,0,-42],  [-45,0,-58],   [-18,0,-60],
    ],
  },
]

export const getTrack = (id: string): TrackDefinition =>
  TRACK_DEFINITIONS.find(t => t.id === id) ?? TRACK_DEFINITIONS[0]
```

## 3.3 — `src/data/achievements.ts`

```typescript
import type { Achievement, User, RaceState } from '../types'

export const ACHIEVEMENTS: Omit[] = [
  { id: 'first_race',   name: 'First Blood',       description: 'Complete your first race',       icon: '🏁', xpReward: 100, condition: (u) => u.totalRaces >= 1 },
  { id: 'speed_demon',  name: 'Speed Demon',        description: 'Reach 200 km/h',                 icon: '💨', xpReward: 200, condition: (_, r) => r.car.speed >= 200 },
  { id: 'drift_king',   name: 'Drift King',         description: 'Accumulate 60s of drift time',   icon: '🔥', xpReward: 300, condition: (_, r) => r.car.isDrifting },
  { id: 'clean_streak', name: 'Clean Machine',      description: 'Complete 3 clean laps',           icon: '✨', xpReward: 250, condition: (u) => u.totalRaces >= 3 },
  { id: 'night_owl',    name: 'Night Owl',          description: 'Race Night Neon track',          icon: '🌙', xpReward: 150, condition: (_, r) => r.selectedTrackId === 'night_neon' },
  { id: 'collector',    name: 'Collector',          description: 'Unlock 4 cars',                  icon: '🗝️', xpReward: 500, condition: (u) => u.unlockedCars.length >= 4 },
  { id: 'neon_blaze_owner', name: 'Elite Driver',   description: 'Unlock Neon Blaze',              icon: '✨', xpReward: 1000, condition: (u) => u.unlockedCars.includes('neon_blaze') },
  { id: 'perfect_lap',  name: 'Perfect Lap',        description: 'Beat a track record',            icon: '🏆', xpReward: 500, condition: (u, r) => r.bestLapTime < (RECORDS[r.selectedTrackId] ?? Infinity) },
]

const RECORDS: Record = {
  city_circuit: 78000, mountain_pass: 115000, desert_dunes: 92000, night_neon: 88000,
}
```

✅ **Phase 3 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 4 — Zustand Stores (4 stores)
# ═══════════════════════════════════════════════

## Goal
Implement all four Zustand stores. Each must be fully typed and have every action implemented.

## 4.1 — `src/store/authStore.ts`

```typescript
import { create } from 'zustand'
import { subscribeWithSelector, persist } from 'zustand/middleware'
import type { User, AuthState } from '../types'
import { CAR_DEFINITIONS } from '../data/cars'

// ── Fake auth helpers ────────────────────────────────────────────────────────
function generateId(): string { return Math.random().toString(36).slice(2, 10) }
function makeToken(userId: string): string { return btoa(`${userId}:${Date.now()}`) }

function makeUser(username: string, email: string): User {
  return {
    id: generateId(),
    username,
    email,
    avatar: ['🦊','🐆','🐺','🦁','🐉','🦅','🦋','🐬'][Math.floor(Math.random() * 8)],
    createdAt: Date.now(),
    totalRaces: 0,
    totalWins: 0,
    unlockedCars: ['phantom_gt', 'volt_racer'],
    garageColors: { phantom_gt: '#c0392b', volt_racer: '#00d4ff' },
    bestLapTimes: {},
    xp: 0,
    level: 1,
  }
}

function xpToLevel(xp: number): number { return Math.floor(Math.sqrt(xp / 100)) + 1 }

// ── All users stored in localStorage ────────────────────────────────────────
const USERS_KEY = 'apexrush_users'
const getAllUsers = (): Record => JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
const saveUser = (user: User) => {
  const all = getAllUsers()
  all[user.id] = user
  localStorage.setItem(USERS_KEY, JSON.stringify(all))
}

interface AuthActions {
  login:       (email: string, password: string) => Promise
  register:    (username: string, email: string, password: string) => Promise
  loginGuest:  () => void
  logout:      () => void
  updateUser:  (partial: Partial) => void
  addXP:       (amount: number) => void
  unlockCar:   (carId: string) => void
  completeRace: (trackId: string, lapTime: number, won: boolean) => void
  clearError:  () => void
}

export const useAuthStore = create()(
  persist(
    subscribeWithSelector((set, get) => ({
      user:      null,
      token:     null,
      isGuest:   false,
      isLoading: false,
      error:     null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 600))  // simulate network
        const all = getAllUsers()
        const user = Object.values(all).find(u => u.email === email)
        // In fake auth, any password works if email exists
        if (!user) { set({ isLoading: false, error: 'Account not found' }); return }
        const token = makeToken(user.id)
        set({ user, token, isGuest: false, isLoading: false, error: null })
      },

      register: async (username, email, _password) => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 800))
        const all = getAllUsers()
        if (Object.values(all).some(u => u.email === email)) {
          set({ isLoading: false, error: 'Email already registered' }); return
        }
        const user = makeUser(username, email)
        saveUser(user)
        const token = makeToken(user.id)
        set({ user, token, isGuest: false, isLoading: false, error: null })
      },

      loginGuest: () => {
        const guest = makeUser('Guest_' + generateId().toUpperCase().slice(0,5), 'guest@local')
        set({ user: guest, token: null, isGuest: true, error: null })
      },

      logout: () => set({ user: null, token: null, isGuest: false }),

      updateUser: (partial) => {
        const user = get().user
        if (!user) return
        const updated = { ...user, ...partial }
        if (!get().isGuest) saveUser(updated)
        set({ user: updated })
      },

      addXP: (amount) => {
        const user = get().user
        if (!user) return
        const newXP = user.xp + amount
        get().updateUser({ xp: newXP, level: xpToLevel(newXP) })
      },

      unlockCar: (carId) => {
        const user = get().user
        if (!user || user.unlockedCars.includes(carId)) return
        const carDef = CAR_DEFINITIONS.find(c => c.id === carId)
        if (!carDef || user.xp < carDef.price) return
        get().updateUser({
          unlockedCars: [...user.unlockedCars, carId],
          xp: user.xp - carDef.price,
          garageColors: { ...user.garageColors, [carId]: carDef.defaultColor },
        })
      },

      completeRace: (trackId, lapTime, won) => {
        const user = get().user
        if (!user) return
        const prevBest = user.bestLapTimes[trackId] ?? Infinity
        const newBest = lapTime < prevBest ? lapTime : prevBest
        get().updateUser({
          totalRaces: user.totalRaces + 1,
          totalWins:  won ? user.totalWins + 1 : user.totalWins,
          bestLapTimes: { ...user.bestLapTimes, [trackId]: newBest },
        })
      },

      clearError: () => set({ error: null }),
    })),
    {
      name:    'apexrush_auth',
      partialize: (s) => ({ user: s.user, token: s.token, isGuest: s.isGuest }),
    }
  )
)
```

## 4.2 — `src/store/settingsStore.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SettingsState } from '../types'

const defaultSettings: SettingsState = {
  graphics: { quality: 'high', shadows: true, postProcessing: true, particles: true, motionBlur: false, reflections: true, fov: 75 },
  audio:    { masterVolume: 0.8, engineVolume: 0.7, musicVolume: 0.4, sfxVolume: 0.8, muted: false },
  controls: { invertY: false, sensitivity: 1.0, vibration: true },
  display:  { showFPS: false, showMinimap: true, showDamage: true, hudScale: 1.0 },
}

interface SettingsActions {
  updateGraphics: (p: Partial) => void
  updateAudio:    (p: Partial)    => void
  updateControls: (p: Partial) => void
  updateDisplay:  (p: Partial)  => void
  resetSettings:  () => void
}

export const useSettingsStore = create()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateGraphics: (p) => set((s) => ({ graphics: { ...s.graphics, ...p } })),
      updateAudio:    (p) => set((s) => ({ audio:    { ...s.audio,    ...p } })),
      updateControls: (p) => set((s) => ({ controls: { ...s.controls, ...p } })),
      updateDisplay:  (p) => set((s) => ({ display:  { ...s.display,  ...p } })),
      resetSettings:  ()  => set(defaultSettings),
    }),
    { name: 'apexrush_settings' }
  )
)
```

## 4.3 — `src/store/garageStore.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GarageEntry } from '../types'

interface GarageStore {
  entries: Record
  selectedCarId: string
  setSelectedCar: (id: string) => void
  setCarColor: (carId: string, color: string) => void
  upgradeComponent: (carId: string, component: keyof GarageEntry['upgrades']) => void
  getEntry: (carId: string) => GarageEntry
}

const defaultEntry = (carId: string, color: string): GarageEntry => ({
  carId, color,
  upgrades: { engine: 0, tires: 0, nitro: 0, aero: 0 },
})

export const useGarageStore = create()(
  persist(
    (set, get) => ({
      entries: {
        phantom_gt: defaultEntry('phantom_gt', '#c0392b'),
        volt_racer: defaultEntry('volt_racer', '#00d4ff'),
      },
      selectedCarId: 'phantom_gt',

      setSelectedCar: (id) => set({ selectedCarId: id }),

      setCarColor: (carId, color) =>
        set((s) => ({
          entries: {
            ...s.entries,
            [carId]: { ...get().getEntry(carId), color },
          },
        })),

      upgradeComponent: (carId, component) =>
        set((s) => {
          const entry = get().getEntry(carId)
          if (entry.upgrades[component] >= 3) return s
          return {
            entries: {
              ...s.entries,
              [carId]: {
                ...entry,
                upgrades: { ...entry.upgrades, [component]: entry.upgrades[component] + 1 },
              },
            },
          }
        }),

      getEntry: (carId) =>
        get().entries[carId] ?? defaultEntry(carId, '#ffffff'),
    }),
    { name: 'apexrush_garage' }
  )
)
```

## 4.4 — `src/store/gameStore.ts`

```typescript
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

const defaultRace: Omit = {
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

interface GameActions {
  setPhase:        (phase: GamePhase)       => void
  selectCar:       (id: string)             => void
  selectTrack:     (id: string)             => void
  startRace:       ()                       => void
  updateCar:       (p: Partial)=> void
  addScore:        (type: ScoreEvent['type'], pts: number, msg: string) => void
  passCheckpoint:  (id: number)             => void
  completeLap:     ()                       => void
  takeDamage:      (amount: number)         => void
  updateFPS:       (fps: number)            => void
  setQuality:      (q: RaceState['quality'])=> void
  resetRace:       ()                       => void
  toggleGhost:     ()                       => void
}

export const useGameStore = create()(
  subscribeWithSelector((set, get) => ({
    phase: 'loading' as GamePhase,
    ...defaultRace,

    setPhase:    (phase)    => set({ phase }),
    selectCar:   (id)       => set({ selectedCarId: id }),
    selectTrack: (id)       => set({ selectedTrackId: id }),

    startRace: () => set({
      ...defaultRace,
      selectedCarId:   get().selectedCarId,
      selectedTrackId: get().selectedTrackId,
      raceStartTime:   Date.now(),
      currentLapStart: Date.now(),
      phase:           'countdown',
    }),

    updateCar: (p) => set((s) => ({ car: { ...s.car, ...p } })),

    addScore: (type, pts, msg) => {
      set((s) => {
        const event: ScoreEvent = {
          id: generateEventId(), type, points: pts, message: msg, timestamp: Date.now(),
        }
        return {
          score:       s.score + pts,
          scoreEvents: [...s.scoreEvents.slice(-8), event],
        }
      })
    },

    passCheckpoint: (id) => set((s) => ({
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

    takeDamage: (amount) => set((s) => ({
      car: { ...s.car, damage: Math.min(100, s.car.damage + amount) },
    })),

    updateFPS: (fps) => {
      const q = fps < 30 ? 'low' : fps < 50 ? 'medium' : 'high'
      set((s) => ({ fps, quality: s.quality !== q ? q : s.quality }))
    },

    setQuality: (q) => set({ quality: q }),

    resetRace: () => set({ ...defaultRace, phase: 'menu', selectedCarId: get().selectedCarId, selectedTrackId: get().selectedTrackId }),

    toggleGhost: () => set((s) => ({ ghostActive: !s.ghostActive })),
  }))
)
```

✅ **Phase 4 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 5 — Utility Functions
# ═══════════════════════════════════════════════

## 5.1 — `src/utils/physics.ts`

```typescript
/**
 * Physics engine for ApexRush Pro.
 * All calculations are frame-rate independent via delta-time.
 * Units: km/h for speed, radians for angles, seconds for time.
 */

export const PHYSICS = {
  // Base stats (modified by car definition)
  MAX_SPEED:          200,
  REVERSE_SPEED:      60,
  BASE_ACCELERATION:  55,
  BASE_BRAKING:       110,
  FRICTION_COAST:     22,
  FRICTION_DRIFT:     18,
  BASE_STEERING:      2.4,
  DRIFT_STEERING:     3.8,
  NITRO_DRAIN:        22,
  NITRO_RECHARGE:     10,
  MIN_DRIFT_SPEED:    55,
  DAMAGE_PER_IMPACT:  8,
  DAMAGE_SPEED_MULT:  0.04,
  ENGINE_RPM_MAX:     8000,
  ENGINE_RPM_IDLE:    800,
} as const

/** Compute speed change for one frame */
export function computeSpeedDelta(opts: {
  speed: number
  forward: boolean; backward: boolean; brake: boolean
  nitroActive: boolean; nitroFuel: number
  carTopSpeed: number; carAccel: number; carBraking: number
  surfaceFriction: number   // 0.5=sand, 0.7=wet, 1.0=dry
  damageRatio: number       // 0–1, reduces performance
  delta: number
}): number {
  const { speed, forward, backward, brake, nitroActive, nitroFuel, delta } = opts
  const perf  = 1 - opts.damageRatio * 0.5  // damage reduces power
  const nitro = (nitroActive && nitroFuel > 2) ? 1.0 : 0
  const accel = opts.carAccel * 6 * PHYSICS.BASE_ACCELERATION * perf * opts.surfaceFriction
  const brk   = opts.carBraking * 0.1 * PHYSICS.BASE_BRAKING * perf
  const top   = opts.carTopSpeed * (1 + nitro * 0.5) * perf

  if (forward) {
    const deficit = Math.max(0, top - speed)
    return Math.min(accel * delta, deficit)
  }
  if (backward || brake) {
    if (speed > 0) return -Math.min(brk * delta, speed)
    if (backward)  return -Math.min(accel * 0.5 * delta, PHYSICS.REVERSE_SPEED + speed)
  }
  // Coasting friction
  if (speed > 0) return -Math.min(PHYSICS.FRICTION_COAST * opts.surfaceFriction * delta, speed)
  if (speed < 0) return  Math.min(PHYSICS.FRICTION_COAST * opts.surfaceFriction * delta, -speed)
  return 0
}

/** Compute steering rotation delta */
export function computeSteering(opts: {
  speed: number; left: boolean; right: boolean
  isDrifting: boolean; driftFactor: number
  turningRadius: number; delta: number
}): number {
  if (!opts.left && !opts.right) return 0
  if (Math.abs(opts.speed) < 3) return 0
  const dir    = opts.left ? 1 : -1
  const spFact = Math.min(Math.abs(opts.speed) / 80, 1)
  const rate   = opts.isDrifting
    ? PHYSICS.DRIFT_STEERING * opts.driftFactor
    : PHYSICS.BASE_STEERING  * opts.turningRadius / 2.5
  const sign   = opts.speed < 0 ? -1 : 1
  return dir * rate * spFact * opts.delta * sign
}

/** Should drift activate? */
export function checkDrift(speed: number, driftKey: boolean, isTurning: boolean, driftFactor: number): boolean {
  return driftKey && driftFactor > 0.3 && Math.abs(speed) > PHYSICS.MIN_DRIFT_SPEED && isTurning
}

/** Surface friction multiplier */
export function getSurfaceFriction(surface: string): number {
  return { asphalt: 1.0, wet_asphalt: 0.72, gravel: 0.65, sand: 0.5, ice: 0.3 }[surface] ?? 1.0
}

/** Engine RPM from speed */
export function getEngineRPM(speed: number, maxSpeed: number): number {
  const ratio = Math.abs(speed) / maxSpeed
  return PHYSICS.ENGINE_RPM_IDLE + (PHYSICS.ENGINE_RPM_MAX - PHYSICS.ENGINE_RPM_IDLE) * ratio
}

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
export const lerp  = (a: number, b: number, t: number) => a + (b - a) * t
export const lerpAngle = (a: number, b: number, t: number) => {
  const diff = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI
  return a + diff * t
}
```

## 5.2 — `src/utils/helpers.ts`

```typescript
/** Format milliseconds → MM:SS.mmm */
export const formatTime = (ms: number): string => {
  if (!isFinite(ms) || ms <= 0) return '--:--.---'
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const d = Math.floor(ms % 1000)
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(d).padStart(3,'0')}`
}

/** Format ms → compact form for leaderboard */
export const formatTimeShort = (ms: number): string => {
  if (!isFinite(ms) || ms <= 0) return '--:--'
  const s = Math.floor(ms / 1000)
  const d = Math.floor((ms % 1000) / 10)
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2,'0')}.${String(d).padStart(2,'0')}`
}

/** Format speed with unit */
export const formatSpeed = (kmh: number): string => `${Math.abs(Math.round(kmh))}`

/** Difficulty stars */
export const difficultyStars = (d: number): string => '⭐'.repeat(d) + '☆'.repeat(5 - d)

/** Stat bar width (0–10 scale → percentage) */
export const statPercent = (value: number, max = 10): number => (value / max) * 100

/** XP needed for next level */
export const xpForLevel = (level: number): number => level * level * 100

/** Progress toward next level (0–1) */
export const levelProgress = (xp: number): number => {
  const level   = Math.floor(Math.sqrt(xp / 100)) + 1
  const xpStart = (level - 1) * (level - 1) * 100
  const xpEnd   = level * level * 100
  return (xp - xpStart) / (xpEnd - xpStart)
}

/** Validate email */
export const isValidEmail = (e: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

/** Generate unique id */
export const uid = (): string => Math.random().toString(36).slice(2, 10)

/** Clamp number */
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
```

## 5.3 — `src/utils/textures.ts`

```typescript
import * as THREE from 'three'

/** Procedural asphalt — dark gray with noise + center line */
export function makeAsphaltTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#1c1c1c'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 18000; i++) {
    const g = 20 + Math.random() * 50 | 0
    ctx.fillStyle = `rgb(${g},${g},${g})`
    ctx.beginPath()
    ctx.arc(Math.random()*size, Math.random()*size, Math.random()*1.4, 0, Math.PI*2)
    ctx.fill()
  }
  // White edge lines
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.setLineDash([])
  ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(12,size); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(size-12,0); ctx.lineTo(size-12,size); ctx.stroke()
  // Yellow center dashes
  ctx.strokeStyle = '#ffdd00'; ctx.lineWidth = 4; ctx.setLineDash([50,40])
  ctx.beginPath(); ctx.moveTo(size/2,0); ctx.lineTo(size/2,size); ctx.stroke()
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10)
  return t
}

/** Wet asphalt — darker, more reflective look */
export function makeWetAsphaltTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#111318'
  ctx.fillRect(0, 0, size, size)
  // Puddle-like reflective patches
  for (let i = 0; i < 30; i++) {
    const grd = ctx.createRadialGradient(
      Math.random()*size, Math.random()*size, 0,
      Math.random()*size, Math.random()*size, 40 + Math.random()*60
    )
    grd.addColorStop(0, 'rgba(40,60,100,0.3)')
    grd.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, size, size)
  }
  for (let i = 0; i < 12000; i++) {
    const g = 15 + Math.random()*35 | 0
    ctx.fillStyle = `rgb(${g},${g},${g+5})`
    ctx.fillRect(Math.random()*size, Math.random()*size, 2, 2)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8)
  return t
}

/** Sand / desert surface */
export function makeSandTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#c8a050'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 20000; i++) {
    const v = -20 + Math.random()*40 | 0
    ctx.fillStyle = `rgba(${v>0?255:0},${v>0?v*3:0},0,0.15)`
    ctx.fillRect(Math.random()*size, Math.random()*size, 1+Math.random()*3, 1)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(12, 12)
  return t
}

/** Grass */
export function makeGrassTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#163c0a'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 10000; i++) {
    const g = 20 + Math.random()*50 | 0
    ctx.fillStyle = `rgb(${g},${g*2},${g})`
    ctx.fillRect(Math.random()*size, Math.random()*size, 2, 3+Math.random()*8)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(25, 25)
  return t
}

/** Normal map — subtle surface bumps */
export function makeNormalMap(size = 256): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const id = ctx.createImageData(size, size)
  for (let i = 0; i < id.data.length; i += 4) {
    id.data[i]   = 128 + (Math.random()*8-4)|0
    id.data[i+1] = 128 + (Math.random()*8-4)|0
    id.data[i+2] = 255
    id.data[i+3] = 255
  }
  ctx.putImageData(id, 0, 0)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8)
  return t
}

/** Neon track surface with glowing lane lines */
export function makeNeonTrackTex(size = 512, accent = '#bf00ff'): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#090912'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 10000; i++) {
    const g = 8 + Math.random()*20|0
    ctx.fillStyle = `rgb(${g},${g},${g+5})`
    ctx.fillRect(Math.random()*size, Math.random()*size, 2, 2)
  }
  // Glowing edge lines
  ctx.shadowColor = accent; ctx.shadowBlur = 12
  ctx.strokeStyle = accent; ctx.lineWidth = 4; ctx.setLineDash([])
  ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(12,size); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(size-12,0); ctx.lineTo(size-12,size); ctx.stroke()
  ctx.shadowBlur = 0
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8)
  return t
}
```

## 5.4 — `src/utils/audio.ts`

```typescript
/**
 * Web Audio API engine — procedural engine sound, drift, nitro, UI sfx.
 * No external audio files needed.
 */

let ctx: AudioContext | null = null
let engineOsc: OscillatorNode | null = null
let engineGain: GainNode | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

/** Initialize engine oscillator (call once on first user interaction) */
export function initAudio() {
  const ac = getCtx()
  if (engineOsc) return

  engineGain = ac.createGain()
  engineGain.gain.value = 0

  // Detuned sawtooth for engine growl
  engineOsc = ac.createOscillator()
  engineOsc.type = 'sawtooth'
  engineOsc.frequency.value = 60

  // Filter to soften harsh edges
  const filter = ac.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 800

  engineOsc.connect(filter)
  filter.connect(engineGain)
  engineGain.connect(ac.destination)
  engineOsc.start()
}

/** Update engine sound based on RPM (call every frame) */
export function updateEngineSound(rpm: number, volume: number) {
  if (!engineOsc || !engineGain) return
  const freq = 40 + (rpm / 8000) * 280
  engineOsc.frequency.setTargetAtTime(freq, getCtx().currentTime, 0.05)
  engineGain.gain.setTargetAtTime(volume * 0.15, getCtx().currentTime, 0.05)
}

/** One-shot sound burst */
function playBurst(freq: number, duration: number, type: OscillatorType = 'square', vol = 0.3) {
  const ac = getCtx()
  const osc  = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration)
  osc.connect(gain); gain.connect(ac.destination)
  osc.start(); osc.stop(ac.currentTime + duration)
}

export const playNitroSound   = () => playBurst(220, 0.4, 'sawtooth', 0.2)
export const playDriftSound   = () => playBurst(180, 0.15, 'square', 0.1)
export const playCollision    = () => playBurst(80,  0.3, 'square', 0.4)
export const playCheckpoint   = () => { playBurst(880, 0.1, 'sine', 0.2); setTimeout(() => playBurst(1100, 0.1, 'sine', 0.15), 100) }
export const playLapComplete  = () => { [523, 659, 784, 1047].forEach((f,i) => setTimeout(() => playBurst(f, 0.2, 'sine', 0.2), i*120)) }
export const playUIClick      = () => playBurst(440, 0.05, 'sine', 0.1)
export const playUIHover      = () => playBurst(660, 0.03, 'sine', 0.06)
export const playCountdown    = (n: number) => playBurst(n === 0 ? 1100 : 550, n === 0 ? 0.4 : 0.2, 'sine', 0.3)
export const playUnlock       = () => { [440,554,659,880].forEach((f,i) => setTimeout(() => playBurst(f, 0.15, 'sine', 0.25), i*100)) }

export function muteAudio(muted: boolean) {
  if (engineGain) engineGain.gain.value = muted ? 0 : 0.15
}
```

✅ **Phase 5 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 6 — Hooks (Keyboard, Game Loop, Mobile, Replay)
# ═══════════════════════════════════════════════

## 6.1 — `src/hooks/useKeyboard.ts`

```typescript
import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import type { Controls } from '../types'

const KEY_MAP: Record = {
  ArrowUp:'forward', KeyW:'forward',
  ArrowDown:'backward', KeyS:'backward',
  ArrowLeft:'left', KeyA:'left',
  ArrowRight:'right', KeyD:'right',
  Space:'nitro', ShiftLeft:'drift', ShiftRight:'drift',
  KeyX:'brake', KeyB:'brake',
  Escape:'pause', KeyP:'pause',
  KeyC:'camera',
}

// Store controls outside React so reads in useFrame are zero-cost
export const controls: Controls = {
  forward:false, backward:false, left:false, right:false,
  nitro:false, drift:false, brake:false, pause:false, camera:false,
}

export function useKeyboard() {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault()
      const key = KEY_MAP[e.code]
      if (!key) return
      if (key === 'pause') {
        const p = useGameStore.getState().phase
        if      (p === 'racing') useGameStore.getState().setPhase('paused')
        else if (p === 'paused') useGameStore.getState().setPhase('racing')
        return
      }
      if (key === 'camera') { /* handled separately */ return }
      controls[key] = true
    }
    const up = (e: KeyboardEvent) => {
      const key = KEY_MAP[e.code]
      if (key && key !== 'pause' && key !== 'camera') controls[key] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup',   up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])
}
```

## 6.2 — `src/hooks/useGameLoop.ts`

```typescript
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

/**
 * Master game loop — runs inside Canvas, frame-rate independent.
 * Updates FPS counter and auto-adjusts quality.
 */
export function useGameLoop() {
  const buf = useRef([])
  const lastFpsTime = useRef(0)

  useFrame((_, delta) => {
    const { phase, car, updateCar, updateFPS } = useGameStore.getState()
    if (phase !== 'racing') return

    // Lap timer — incremented each frame
    updateCar({ /* lap timing is handled in gameStore.completeLap */ })

    // FPS tracking every 500ms
    buf.current.push(1 / delta)
    const now = performance.now()
    if (now - lastFpsTime.current > 500 && buf.current.length > 0) {
      const avg = buf.current.reduce((a,b) => a+b, 0) / buf.current.length
      buf.current = []
      lastFpsTime.current = now
      updateFPS(Math.round(avg))
    }
  })
}
```

## 6.3 — `src/hooks/useMobileControls.ts`

```typescript
import { useCallback } from 'react'
import { controls } from './useKeyboard'
import type { Controls } from '../types'

/**
 * Returns press/release handlers for touch buttons.
 * Writes directly to the shared controls object (same as keyboard).
 */
export function useMobileControls() {
  const press = useCallback((key: keyof Controls) =>
    (e: React.TouchEvent | React.PointerEvent) => {
      e.preventDefault()
      if (key !== 'pause' && key !== 'camera') controls[key] = true
    }, [])

  const release = useCallback((key: keyof Controls) =>
    (e: React.TouchEvent | React.PointerEvent) => {
      e.preventDefault()
      if (key !== 'pause' && key !== 'camera') controls[key] = false
    }, [])

  return { press, release }
}
```

## 6.4 — `src/hooks/useReplay.ts`

```typescript
import { useRef, useCallback } from 'react'
import type { ReplayFrame, ReplayData } from '../types'

const REPLAY_KEY = 'apexrush_best_replay'
const RECORD_INTERVAL = 50  // ms between frames (20fps recording)

/**
 * Replay system: records car positions during a lap, saves best, plays back as ghost.
 */
export function useReplay(trackId: string, carId: string) {
  const recording = useRef([])
  const lapStart   = useRef(0)
  const lastRecord = useRef(0)

  /** Start recording a new lap */
  const startRecording = useCallback(() => {
    recording.current = []
    lapStart.current  = Date.now()
    lastRecord.current = 0
  }, [])

  /** Call every frame during a lap */
  const recordFrame = useCallback((
    px: number, py: number, pz: number,
    rx: number, ry: number, rz: number,
    speed: number
  ) => {
    const now = Date.now() - lapStart.current
    if (now - lastRecord.current < RECORD_INTERVAL) return
    lastRecord.current = now
    recording.current.push({ t: now, px, py, pz, rx, ry, rz, sp: speed })
  }, [])

  /** Save this lap if it beats the stored record */
  const saveIfBest = useCallback((lapTime: number) => {
    const stored = loadReplay(trackId)
    if (!stored || lapTime < stored.lapTime) {
      const data: ReplayData = {
        trackId, carId, lapTime,
        frames: recording.current,
        recordedAt: Date.now(),
      }
      localStorage.setItem(`${REPLAY_KEY}_${trackId}`, JSON.stringify(data))
    }
  }, [trackId, carId])

  return { startRecording, recordFrame, saveIfBest }
}

export function loadReplay(trackId: string): ReplayData | null {
  try {
    const raw = localStorage.getItem(`apexrush_best_replay_${trackId}`)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
```

✅ **Phase 6 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 7 — Car System (CarBase + 6 Car Models)
# ═══════════════════════════════════════════════

## Goal
Build the shared car logic in CarBase, then 6 distinct car models with unique visual designs and physics personalities.

## 7.1 — `src/components/game/cars/CarBase.tsx`

This is the core car controller. All 6 cars use this logic but override visual props.

```tsx
import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../../store/gameStore'
import { useGarageStore } from '../../../store/garageStore'
import { controls } from '../../../hooks/useKeyboard'
import { useReplay } from '../../../hooks/useReplay'
import { useAudio } from '../../../hooks/useAudio'
import {
  computeSpeedDelta, computeSteering, checkDrift,
  getSurfaceFriction, getEngineRPM, clamp, lerp, lerpAngle, PHYSICS
} from '../../../utils/physics'
import { getCar } from '../../../data/cars'
import { getTrack } from '../../../data/tracks'
import type { CarDefinition } from '../../../types'

export interface CarBaseProps {
  /** Render the visual car body (called as a child) */
  renderBody: (opts: {
    color: string
    isDrifting: boolean
    isNitro: boolean
    speed: number
    damage: number
    steerAngle: number
  }) => React.ReactNode
  carDef: CarDefinition
  startPosition: [number, number, number]
  startRotation: [number, number, number]
}

export default function CarBase({ renderBody, carDef, startPosition, startRotation }: CarBaseProps) {
  const groupRef    = useRef(null)
  const steerRef    = useRef(0)
  const speedRef    = useRef(0)
  const nitroRef    = useRef(carDef.stats.nitroCapacity)
  const damageRef   = useRef(0)
  const driftTimer  = useRef(0)
  const driftCombo  = useRef(0)
  const wasNitro    = useRef(false)

  const { updateCar, addScore, selectedTrackId } = useGameStore.getState()
  const track = getTrack(selectedTrackId)
  const surface = getSurfaceFriction(track.surface)
  const garageEntry = useGarageStore.getState().getEntry(carDef.id)
  const { recordFrame } = useReplay(selectedTrackId, carDef.id)
  const { updateEngineSound } = useAudio()

  // Set initial position
  useRef(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...startPosition)
      groupRef.current.rotation.set(...startRotation)
    }
  })

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const phase = useGameStore.getState().phase
    if (phase !== 'racing' && phase !== 'countdown') return

    const { forward, backward, left, right, nitro, drift, brake } = controls
    const car   = useGameStore.getState().car
    const stats = carDef.stats
    const isTurning = left || right

    // ── Speed update ─────────────────────────────────────────────────────────
    const nitroActive = nitro && nitroRef.current > 2
    const speedDelta = computeSpeedDelta({
      speed: speedRef.current,
      forward, backward, brake,
      nitroActive, nitroFuel: nitroRef.current,
      carTopSpeed:  stats.topSpeed,
      carAccel:     stats.acceleration,
      carBraking:   stats.braking,
      surfaceFriction: surface,
      damageRatio:  damageRef.current / 100,
      delta,
    })
    speedRef.current = clamp(speedRef.current + speedDelta, -PHYSICS.REVERSE_SPEED, stats.topSpeed)

    // ── Nitro management ─────────────────────────────────────────────────────
    if (nitroActive && forward) {
      nitroRef.current = clamp(nitroRef.current - stats.nitroBoost * PHYSICS.NITRO_DRAIN * delta, 0, stats.nitroCapacity)
      if (!wasNitro.current) { addScore('nitro_boost', 50, '⚡ NITRO +50'); wasNitro.current = true }
    } else {
      nitroRef.current = clamp(nitroRef.current + PHYSICS.NITRO_RECHARGE * delta, 0, stats.nitroCapacity)
      wasNitro.current = false
    }

    // ── Drift detection ───────────────────────────────────────────────────────
    const isDrifting = checkDrift(speedRef.current, drift, isTurning, stats.driftFactor)

    // Drift scoring
    if (isDrifting) {
      driftTimer.current += delta
      if (driftTimer.current >= 1) {
        driftCombo.current = Math.min(driftCombo.current + 1, 5)
        const pts = 10 * driftCombo.current
        addScore('drift_combo', pts, `🔥 DRIFT x${driftCombo.current} +${pts}`)
        driftTimer.current = 0
      }
    } else {
      driftTimer.current = 0
      driftCombo.current = 0
    }

    // ── Steering ──────────────────────────────────────────────────────────────
    const steerDelta = computeSteering({
      speed: speedRef.current, left, right, isDrifting,
      driftFactor: stats.driftFactor,
      turningRadius: stats.turningRadius,
      delta,
    })
    groupRef.current.rotation.y += steerDelta

    // Animated front wheel steer angle
    const targetSteer = left ? 0.42 : right ? -0.42 : 0
    steerRef.current  = lerp(steerRef.current, targetSteer, delta * 8)

    // ── Position ──────────────────────────────────────────────────────────────
    const ry  = groupRef.current.rotation.y
    const dir = new THREE.Vector3(Math.sin(ry), 0, Math.cos(ry))

    // Drift lateral slide
    if (isDrifting) {
      const lateral = new THREE.Vector3(Math.cos(ry), 0, -Math.sin(ry))
      const slide = (speedRef.current / stats.topSpeed) * 0.25
      dir.add(lateral.multiplyScalar(right ? -slide : slide)).normalize()
    }

    const moveAmount = (speedRef.current / 3.6) * delta
    groupRef.current.position.addScaledVector(dir, moveAmount)
    groupRef.current.position.y = startPosition[1]  // lock to ground

    // Roll/tilt on steering
    const tiltTarget = (right ? -0.05 : left ? 0.05 : 0) * clamp(speedRef.current / 100, 0, 1)
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, tiltTarget, delta * 6)

    // ── Engine sound ──────────────────────────────────────────────────────────
    const rpm = getEngineRPM(speedRef.current, stats.topSpeed)
    updateEngineSound(rpm, useGameStore.getState().quality !== 'low' ? 0.7 : 0.4)

    // ── Sync to store ─────────────────────────────────────────────────────────
    const pos = groupRef.current.position
    const rot = groupRef.current.rotation
    updateCar({
      position:     [pos.x, pos.y, pos.z],
      rotation:     [rot.x, rot.y, rot.z],
      speed:        speedRef.current,
      nitro:        nitroRef.current,
      damage:       damageRef.current,
      isDrifting,
      isNitroActive:nitroActive && forward,
      engineRPM:    rpm,
      wheelSpin:    car.wheelSpin + (speedRef.current / 20) * delta * 5,
    })

    // ── Replay recording ──────────────────────────────────────────────────────
    recordFrame(pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, speedRef.current)
  })

  const car = useGameStore((s) => s.car)

  return (
    
      {/* Visual car body (provided by each car subcomponent) */}
      {renderBody({
        color:      garageEntry.color,
        isDrifting: car.isDrifting,
        isNitro:    car.isNitroActive,
        speed:      car.speed,
        damage:     car.damage,
        steerAngle: steerRef.current,
      })}

      {/* ── Exhaust trail ──────────────────────────────────────────────── */}
      {Math.abs(car.speed) > 50 && (
        <>
          <Trail width={car.isNitroActive ? 0.5 : 0.2} length={8}
            color={car.isNitroActive ? carDef.exhaustColor : '#666666'}
            attenuation={(t) => t * t}>
            
              
              
            
          
          <Trail width={car.isNitroActive ? 0.5 : 0.2} length={8}
            color={car.isNitroActive ? carDef.exhaustColor : '#666666'}
            attenuation={(t) => t * t}>
            
              
              
            
          
        </>
      )}

      {/* ── Drift sparks ───────────────────────────────────────────────── */}
      {car.isDrifting && (
        
      )}

      {/* ── Nitro glow ─────────────────────────────────────────────────── */}
      {car.isNitroActive && (
        <>
          
          
        </>
      )}

      {/* ── Neon Blaze underglow ────────────────────────────────────────── */}
      {carDef.id === 'neon_blaze' && (
        
      )}

      {/* ── Headlights ─────────────────────────────────────────────────── */}
       5 ? 6 : 0} distance={20} decay={2} />
       5 ? 6 : 0} distance={20} decay={2} />
    
  )
}
```

## 7.2 — Shared Wheel Component (put at top of CarBase.tsx)

```tsx
/** Animated wheel with tire + rim */
export function Wheel({ pos, steer = 0, driven = false, spin = 0 }:
  { pos: [number,number,number]; steer?: number; driven?: boolean; spin?: number }
) {
  return (
    
      {/* Tire */}
      
        
        
      
      {/* Rim */}
      
        
        
      
      {/* Center cap */}
      
        
        
      
    
  )
}
```

## 7.3 — `src/components/game/cars/PhantomGT.tsx`

```tsx
import CarBase, { Wheel } from './CarBase'
import { getCar } from '../../../data/cars'

const carDef = getCar('phantom_gt')

function PhantomBody({ color, steerAngle, isDrifting, isNitro, speed, damage }:
  { color:string; steerAngle:number; isDrifting:boolean; isNitro:boolean; speed:number; damage:number }) {
  const dented = damage > 50
  return (
    
      {/* Main body — sleek sports coupe */}
      
        
        
      
      {/* Swooping roofline */}
      
        
        
      
      {/* Front splitter */}
      
        
        
      
      {/* Rear diffuser */}
      
        
        
      
      {/* GT wing */}
      
        
        
      
      {[-0.6, 0.6].map((x, i) => (
        
          
          
        
      ))}
      {/* Headlights */}
      {[[-0.55,2.08],[0.55,2.08]].map(([x,z],i) => (
        
          
           5 ? 2 : 0.3} />
        
      ))}
      {/* Taillights */}
      {[[-0.55,-2.08],[0.55,-2.08]].map(([x,z],i) => (
        
          
          
        
      ))}
      {/* Windshield */}
      
        
        
      
      {/* Wheels */}
      
      
      
      
    
  )
}

export default function PhantomGT({ startPosition = [0,0.4,-50] as [number,number,number], startRotation = [0,0,0] as [number,number,number] }) {
  return (
    <CarBase
      carDef={carDef}
      startPosition={startPosition}
      startRotation={startRotation}
      renderBody={(opts) => }
    />
  )
}
```

## 7.4 — Remaining 5 Cars

Implement `VoltRacer.tsx`, `InfernoV8.tsx`, `ShadowDrift.tsx`, `ArcticFox.tsx`, `NeonBlaze.tsx` using the **exact same pattern** as `PhantomGT.tsx`.

Each car body must be **visually distinct**:

**VoltRacer** — Low, aerodynamic. Angular teardrop body. Glowing cyan trim lines. `meshPhysicalMaterial` with low roughness (0.05), transmission hints. No exhaust pipe meshes (electric). Two glowing blue strips along sides.

**InfernoV8** — Wide, muscular. Tall hood scoop (raised box on top of hood). Aggressive front grille (dark mesh grid). Large rear wing at aggressive angle. Wide flares on wheel arches. Two exhaust pipes protruding from rear sides.

**ShadowDrift** — Widebody. Exaggerated fender flares. Low, menacing profile. Purple underglow strip (emissive mesh at y=-0.1). Massive rear spoiler. Stretched tire look (wider cylinder on rear wheels).

**ArcticFox** — Taller ride height (y=0.55 instead of 0.4). Slightly wider stance. Roof rack (thin bar mesh on top). Fender protection strips (dark strips on body sides). More upright windshield.

**NeonBlaze** — Supercar. Very low, wide (2.0 units wide). LED strip running full length of body sides (emissive green mesh). Huge diffuser. Active aero element that tilts based on speed. Green glow on wheel rims.

✅ **Phase 7 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 8 — Track System (TrackBase + 4 Tracks)
# ═══════════════════════════════════════════════

## Goal
Build shared track geometry logic, then 4 fully distinct tracks with unique decorations, barriers, and atmospheres.

## 8.1 — `src/components/game/tracks/TrackBase.tsx`

```tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { TrackDefinition } from '../../../types'
import { makeAsphaltTex, makeWetAsphaltTex, makeSandTex, makeNeonTrackTex, makeNormalMap } from '../../../utils/textures'

export interface TrackMeshData {
  curve:           THREE.CatmullRomCurve3
  roadGeometry:    THREE.ExtrudeGeometry
  leftBarrierGeo:  THREE.ExtrudeGeometry
  rightBarrierGeo: THREE.ExtrudeGeometry
  totalLength:     number
  getPointAt:      (t: number) => THREE.Vector3
  getTangentAt:    (t: number) => THREE.Vector3
  getNormalAt:     (t: number, offset: number) => THREE.Vector3
}

/** Build all track geometry from a TrackDefinition */
export function buildTrackMesh(def: TrackDefinition): TrackMeshData {
  const SEGS = 300
  const curve = new THREE.CatmullRomCurve3(
    def.controlPoints.map(([x,y,z]) => new THREE.Vector3(x, y, z)),
    true, 'catmullrom', 0.5
  )

  // Road cross-section shape
  const roadShape = new THREE.Shape()
  const hw = def.trackWidth / 2
  roadShape.moveTo(-hw, 0); roadShape.lineTo(hw, 0)
  roadShape.lineTo(hw, 0.18); roadShape.lineTo(-hw, 0.18)
  roadShape.closePath()

  const roadGeometry = new THREE.ExtrudeGeometry(roadShape, {
    steps: SEGS, extrudePath: curve, bevelEnabled: false,
  })

  // Barrier cross-section (Jersey-barrier profile)
  const makeBarrierShape = () => {
    const s = new THREE.Shape()
    s.moveTo(0,0); s.lineTo(0.5,0); s.lineTo(0.4,0.5); s.lineTo(0.3,1.0); s.lineTo(0,1.0); s.closePath()
    return s
  }

  const makeBarrierGeo = (offset: number) => {
    const pts = curve.getPoints(SEGS)
    const offsetPts = pts.map((p, i) => {
      const t = i / SEGS
      const tan = curve.getTangentAt(t)
      const nor = new THREE.Vector3(-tan.z, 0, tan.x).normalize()
      return p.clone().add(nor.multiplyScalar(offset))
    })
    const offsetCurve = new THREE.CatmullRomCurve3(offsetPts, true)
    return new THREE.ExtrudeGeometry(makeBarrierShape(), {
      steps: SEGS, extrudePath: offsetCurve, bevelEnabled: false,
    })
  }

  return {
    curve,
    roadGeometry,
    leftBarrierGeo:  makeBarrierGeo(-(hw + 0.6)),
    rightBarrierGeo: makeBarrierGeo(hw + 0.1),
    totalLength:     curve.getLength(),
    getPointAt:      (t) => curve.getPointAt(t),
    getTangentAt:    (t) => curve.getTangentAt(t),
    getNormalAt:     (t, offset) => {
      const tan = curve.getTangentAt(t)
      return new THREE.Vector3(-tan.z, 0, tan.x).normalize().multiplyScalar(offset)
    },
  }
}

/** Animated start/finish gate */
export function StartGate({ position, rotation }: { position: THREE.Vector3; rotation: THREE.Euler }) {
  const beamRef = useRef(null)
  useFrame(({ clock }) => {
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.5
    }
  })
  return (
    
      {/* Left post */}
      
        
        
      
      {/* Right post */}
      
        
        
      
      {/* Top beam */}
      
        
        
      
      {/* Glow light */}
      
      {/* Checkered pattern strips */}
      {Array.from({length:12},(_,i) => (
        
          
          <meshStandardMaterial color={i%2===0?'#ffffff':'#111111'} />
        
      ))}
    
  )
}

/** Select road texture based on surface type */
export function useTrackTextures(def: TrackDefinition) {
  return useMemo(() => {
    const normal = makeNormalMap()
    switch (def.surface) {
      case 'wet_asphalt': return { map: makeWetAsphaltTex(), normalMap: normal, roughness: 0.3, metalness: 0.15 }
      case 'sand':        return { map: makeSandTex(),       normalMap: normal, roughness: 0.95, metalness: 0 }
      case 'asphalt':
      default:            return { map: makeAsphaltTex(),    normalMap: normal, roughness: 0.75, metalness: 0.05 }
    }
  }, [def.surface])
}
```

## 8.2 — `src/components/game/tracks/CityCircuit.tsx`

```tsx
import { useMemo } from 'react'
import * as THREE from 'three'
import { TRACK_DEFINITIONS } from '../../../data/tracks'
import { buildTrackMesh, StartGate, useTrackTextures } from './TrackBase'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const def = TRACK_DEFINITIONS.find(t => t.id === 'city_circuit')!

/** Neon sign billboard */
function NeonSign({ position, color, label }: { position:[number,number,number]; color:string; label:string }) {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 2 + position[0]) * 0.4
    }
  })
  return (
    
      
        
        
      
      
        
        
      
      
    
  )
}

/** City building silhouette */
function Building({ pos, w, h, d, color='#0a0a1a' }: { pos:[number,number,number]; w:number; h:number; d:number; color?:string }) {
  return (
    
      <mesh castShadow receiveShadow position={[0, h/2, 0]}>
        
        
      
      {/* Window grid (emissive dots) */}
      {Array.from({length:Math.floor(h/3)}).map((_,row) =>
        Array.from({length:Math.floor(w/2)}).map((_,col) =>
          Math.random() > 0.4 ? (
            <mesh key={`${row}-${col}`} position={[
              -w/2 + 1 + col*2, row*3 + 2, d/2 + 0.05
            ]}>
              
              
            
          ) : null
        )
      )}
    
  )
}

export default function CityCircuit() {
  const track = useMemo(() => buildTrackMesh(def), [])
  const mat   = useTrackTextures(def)
  const startPos = track.getPointAt(0)
  const startTan = track.getTangentAt(0)
  const startRot = new THREE.Euler(0, Math.atan2(startTan.x, startTan.z), 0)

  return (
    
      {/* ── Road ──────────────────────────────────────────────────────── */}
      
        
      

      {/* ── Barriers: blue-white striped Jersey barriers ──────────────── */}
      
        
      
      
        
      

      {/* ── Start gate ────────────────────────────────────────────────── */}
      

      {/* ── Streetlights along track ──────────────────────────────────── */}
      {Array.from({length:20}, (_,i) => {
        const t  = i / 20
        const p  = track.getPointAt(t)
        const no = track.getNormalAt(t, 7)
        return (
          
            
              
              
            
            
              
              
            
            
          
        )
      })}

      {/* ── Neon signs ────────────────────────────────────────────────── */}
      
      
      
      

      {/* ── City buildings (skyline) ──────────────────────────────────── */}
      
      
      
      
      
      
      
      

      {/* ── Rain puddle reflection planes ────────────────────────────── */}
      {Array.from({length:8}, (_,i) => {
        const t = i / 8
        const p = track.getPointAt(t)
        return (
          
            
            
          
        )
      })}
    
  )
}
```

## 8.3 — `MountainPass.tsx`, `DesertDunes.tsx`, `NightNeon.tsx`

Implement all three following the **exact same structure** as CityCircuit.tsx.

**MountainPass** specifics:
- Road material: dark gray asphalt, roughness 0.8
- Barriers: `meshStandardMaterial` color `#8B4513` (wooden guardrail look), metalness 0.1
- Decorations: Pine trees (tall cylinders + cones, dark green), cliff faces (large box meshes, gray/brown), fog patches (large transparent planes at ground level), milestone markers every 1/8 track
- Lighting: warm golden directional light, orange-tinted ambient
- Mountain walls on outside of corners (large extruded box geometry hugging the outer barrier path)

**DesertDunes** specifics:
- Road material: sandy asphalt, roughness 0.9, color `#8B7355`
- Barriers: orange/red concrete barriers, emissive `#ff4400` at 0.2 intensity
- Decorations: Cacti (cylinder + small horizontal cylinders for arms), sand dune meshes (flat ellipsoid mounds), oasis checkpoint (palm trees — tall thin cylinder + flattened sphere, green), heat shimmer shader effect (use animated fog planes with `transparent opacity={0.1}`)
- Lighting: bright white directional sun, high intensity (2.5), ambient warm (0.8)
- Sand dunes surrounding track (large low-poly sphere meshes scaled [3,0.5,3])

**NightNeon** specifics:
- Road material: wet asphalt, `makeNeonTrackTex('#bf00ff')`, roughness 0.2, metalness 0.3
- Barriers: glowing neon purple/pink alternating. `emissive={barrierColor} emissiveIntensity={1.5}`. Add `pointLight` every 10 barriers
- Decorations: neon arch gates at every 1/6 of track (like portal frames, color-cycling), laser beam strips on barriers (thin emissive meshes), rain particle system, reflective road planes, city skyline (same as city but more purple/blue tinted), neon cherry blossom trees (sphere crown with emissive pink material)
- Lighting: minimal ambient (0.1), many colored point lights along barriers, neon arch portal lights

✅ **Phase 8 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 9 — Environment, Effects, Camera, Ghost, Particles
# ═══════════════════════════════════════════════

## 9.1 — `src/components/game/Environment.tsx`

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky, Stars, Cloud, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { getTrack } from '../../data/tracks'
import { makeGrassTex } from '../../utils/textures'

/**
 * Dynamic environment that adapts to the selected track's theme.
 * - City: night sky, rain
 * - Mountain: golden hour, fog
 * - Desert: harsh sun, sandstorm
 * - Neon: pure black sky, neon ambiance
 */
export default function Environment() {
  const trackId  = useGameStore((s) => s.selectedTrackId)
  const track    = getTrack(trackId)
  const dirRef   = useRef(null)
  const grassTex = makeGrassTex()

  useFrame(({ clock }) => {
    if (dirRef.current && track.timeOfDay !== 'night') {
      dirRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.01) * 80
    }
  })

  const isNight   = track.timeOfDay === 'night'
  const isDesert  = track.theme === 'desert'
  const isMountain = track.theme === 'mountain'

  return (
    <>
      {/* ── Sky ──────────────────────────────────────────────────────── */}
      {!isNight && (
        
      )}
      {isNight && (
        
      )}

      {/* ── Stars ─────────────────────────────────────────────────────── */}
      {isNight && }
      {isMountain && }

      {/* ── Clouds ────────────────────────────────────────────────────── */}
      {!isDesert && !isNight && <>
        
        
        
      </>}

      {/* Desert dust clouds */}
      {isDesert && <>
        
        
      </>}

      {/* ── Fog ───────────────────────────────────────────────────────── */}
      

      {/* ── Lighting ──────────────────────────────────────────────────── */}
      

      {/* Main directional light */}
      

      {/* Fill / sky light */}
      

      {/* Neon track accent lights */}
      {track.theme === 'neon' && <>
        
        
        
      </>}

      {/* ── Ground ────────────────────────────────────────────────────── */}
      
        
        
      

      {/* ── Ambient particles ─────────────────────────────────────────── */}
      {!isNight && !isDesert && (
        
      )}
      {isDesert && (
        
      )}
    </>
  )
}
```

## 9.2 — `src/components/game/Effects.tsx`

```tsx
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette, MotionBlur } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { useSettingsStore } from '../../store/settingsStore'

export default function Effects() {
  const quality     = useGameStore((s) => s.quality)
  const isDrifting  = useGameStore((s) => s.car.isDrifting)
  const isNitro     = useGameStore((s) => s.car.isNitroActive)
  const speed       = useGameStore((s) => s.car.speed)
  const trackId     = useGameStore((s) => s.selectedTrackId)
  const settings    = useSettingsStore((s) => s.graphics)

  if (!settings.postProcessing || quality === 'low') return (
    
      
      
    
  )

  const isNeon      = trackId === 'night_neon'
  const chromaOff   = speed > 150 ? 0.005 : isNitro ? 0.007 : isDrifting ? 0.004 : 0.002
  const bloomInt    = isNeon ? 2.5 : isDrifting ? 2.2 : isNitro ? 3.0 : 1.4

  return (
    <EffectComposer multisampling={quality === 'high' ? 4 : 0}>
      <DepthOfField focusDistance={0.02} focalLength={0.05}
        bokehScale={quality === 'high' ? 2.5 : 1.5}
        height={quality === 'high' ? 480 : 240} />
      
      
      
    
  )
}
```

## 9.3 — `src/components/game/CameraController.tsx`

```tsx
import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { lerp } from '../../utils/physics'

type CamMode = 'follow' | 'hood' | 'chase_low'

export default function CameraController() {
  const { camera } = useThree()
  const targetPos  = useRef(new THREE.Vector3(0, 5, 12))
  const targetLook = useRef(new THREE.Vector3())
  const camMode    = useRef('follow')
  const shakeMag   = useRef(0)

  useFrame(({ clock }) => {
    const { car, game } = useGameStore.getState()
    if (!['racing','countdown','results','paused'].includes(game?.phase ?? '')) return

    const [px,py,pz] = car.position
    const ry         = car.rotation[1]
    const speed      = Math.abs(car.speed)
    const isDrifting = car.isDrifting

    // Camera shake on damage / drift
    if (isDrifting) shakeMag.current = Math.min(shakeMag.current + 0.02, 0.08)
    else            shakeMag.current = Math.max(shakeMag.current - 0.05, 0)

    const shake = shakeMag.current
    const shakeX = (Math.random()-0.5) * shake
    const shakeY = (Math.random()-0.5) * shake

    // Speed-based FOV zoom
    const targetFOV = 75 + (speed / 200) * 15
    camera.fov = lerp(camera.fov, targetFOV, 0.05)
    camera.updateProjectionMatrix()

    // Dynamic distance based on speed
    const dist   = 8 + (speed / 200) * 3
    const height = 3.5 + (isDrifting ? 0.5 : 0)

    const desiredX = px - Math.sin(ry) * dist + shakeX
    const desiredY = py + height + shakeY
    const desiredZ = pz - Math.cos(ry) * dist

    const lookAhead = 3 + speed / 80
    const lookX = px + Math.sin(ry) * lookAhead
    const lookY = py + 0.9
    const lookZ = pz + Math.cos(ry) * lookAhead

    const smoothing = isDrifting ? 0.06 : 0.08

    targetPos.current.set(
      lerp(targetPos.current.x, desiredX, smoothing),
      lerp(targetPos.current.y, desiredY, smoothing * 1.2),
      lerp(targetPos.current.z, desiredZ, smoothing),
    )
    targetLook.current.set(
      lerp(targetLook.current.x, lookX, smoothing * 1.5),
      lerp(targetLook.current.y, lookY, smoothing * 1.5),
      lerp(targetLook.current.z, lookZ, smoothing * 1.5),
    )

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLook.current)
  })

  return null
}
```

## 9.4 — `src/components/game/GhostCar.tsx`

```tsx
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { loadReplay } from '../../hooks/useReplay'
import { useGameStore } from '../../store/gameStore'

/**
 * Ghost car: plays back the stored best lap as a semi-transparent blue car.
 */
export default function GhostCar() {
  const groupRef  = useRef(null)
  const trackId   = useGameStore((s) => s.selectedTrackId)
  const ghostOn   = useGameStore((s) => s.ghostActive)
  const [frames, setFrames] = useState<import('../../types').ReplayFrame[]>([])
  const raceStart = useRef(0)

  useEffect(() => {
    const replay = loadReplay(trackId)
    if (replay) setFrames(replay.frames)
    raceStart.current = Date.now()
  }, [trackId])

  useFrame(() => {
    if (!groupRef.current || !ghostOn || frames.length === 0) return
    const phase = useGameStore.getState().phase
    if (phase !== 'racing') return

    const elapsed = Date.now() - raceStart.current
    // Binary search for current frame
    let lo = 0, hi = frames.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (frames[mid].t < elapsed) lo = mid + 1; else hi = mid
    }
    const f = frames[Math.min(lo, frames.length - 1)]
    groupRef.current.position.set(f.px, f.py, f.pz)
    groupRef.current.rotation.set(f.rx, f.ry, f.rz)
  })

  if (!ghostOn || frames.length === 0) return null

  return (
    
      
        
        
      
      
        
        
      
      
    
  )
}
```

## 9.5 — `src/components/game/Particles.tsx`

```tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { getTrack } from '../../data/tracks'

/**
 * Particle systems that adapt to the current track's weather:
 * - Rain: city_circuit, night_neon
 * - Sandstorm: desert_dunes
 * - Fog particles: mountain_pass
 */
export default function Particles() {
  const trackId = useGameStore((s) => s.selectedTrackId)
  const track   = getTrack(trackId)

  if (track.weather === 'rain')       return 
  if (track.weather === 'sandstorm')  return 
  if (track.weather === 'fog')        return 
  return null
}

function RainSystem() {
  const COUNT  = 3000
  const posRef = useRef(null)
  const velocities = useRef(Float32Array.from({length:COUNT*3}, () => (Math.random()-0.5)*0.5))
  const positions  = useRef(Float32Array.from({length:COUNT*3}, (_,i) => {
    if (i%3===0) return (Math.random()-0.5)*200
    if (i%3===1) return Math.random()*60
    return (Math.random()-0.5)*200
  }))

  useFrame(() => {
    const pos = positions.current
    for (let i = 0; i < COUNT; i++) {
      pos[i*3+1] -= 0.6  // fall speed
      if (pos[i*3+1] < 0) pos[i*3+1] = 60  // reset to top
      pos[i*3]   += velocities.current[i*3]   * 0.1
      pos[i*3+2] += velocities.current[i*3+2] * 0.1
    }
    if (posRef.current) posRef.current.attributes.position.needsUpdate = true
  })

  return (
    
      
        
      
      
    
  )
}

function SandstormSystem() {
  const COUNT = 2000
  const posRef = useRef(null)
  const pos = useRef(Float32Array.from({length:COUNT*3}, (_,i) => {
    if (i%3===0) return (Math.random()-0.5)*160
    if (i%3===1) return Math.random()*8
    return (Math.random()-0.5)*160
  }))

  useFrame(() => {
    const p = pos.current
    for (let i = 0; i < COUNT; i++) {
      p[i*3]   += 0.15   // blow sideways
      p[i*3+1] += (Math.random()-0.5)*0.05
      if (p[i*3] > 80) p[i*3] = -80
    }
    if (posRef.current) posRef.current.attributes.position.needsUpdate = true
  })

  return (
    
      
        
      
      
    
  )
}

function FogMistSystem() {
  return (
    
      {Array.from({length:6},(_,i) => (
        
          
          
        
      ))}
    
  )
}
```

## 9.6 — `src/components/game/Scene.tsx`

```tsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import Environment from './Environment'
import Effects from './Effects'
import CameraController from './CameraController'
import GhostCar from './GhostCar'
import Particles from './Particles'
import { CityCircuit } from './tracks/CityCircuit'
import { MountainPass } from './tracks/MountainPass'
import { DesertDunes } from './tracks/DesertDunes'
import { NightNeon } from './tracks/NightNeon'
import PhantomGT from './cars/PhantomGT'
import VoltRacer from './cars/VoltRacer'
import InfernoV8 from './cars/InfernoV8'
import ShadowDrift from './cars/ShadowDrift'
import ArcticFox from './cars/ArcticFox'
import NeonBlaze from './cars/NeonBlaze'
import { useGameStore } from '../../store/gameStore'
import { useSettingsStore } from '../../store/settingsStore'
import { useKeyboard } from '../../hooks/useKeyboard'
import { useGameLoop } from '../../hooks/useGameLoop'
import { useAudio } from '../../hooks/useAudio'
import { getTrack } from '../../data/tracks'

const TRACK_COMPONENTS: Record = {
  city_circuit:  CityCircuit,
  mountain_pass: MountainPass,
  desert_dunes:  DesertDunes,
  night_neon:    NightNeon,
}

const CAR_COMPONENTS: Record> = {
  phantom_gt:  PhantomGT,
  volt_racer:  VoltRacer,
  inferno_v8:  InfernoV8,
  shadow_drift: ShadowDrift,
  arctic_fox:  ArcticFox,
  neon_blaze:  NeonBlaze,
}

/** Must be inside Canvas to access R3F context */
function GameWorld() {
  useKeyboard()
  useGameLoop()
  useAudio()

  const phase    = useGameStore((s) => s.phase)
  const carId    = useGameStore((s) => s.selectedCarId)
  const trackId  = useGameStore((s) => s.selectedTrackId)
  const track    = getTrack(trackId)

  const TrackComp = TRACK_COMPONENTS[trackId] ?? CityCircuit
  const CarComp   = CAR_COMPONENTS[carId]     ?? PhantomGT
  const startPos  = track.controlPoints[0] as [number,number,number]

  const showGame  = ['racing','countdown','paused','results'].includes(phase)

  return (
    <>
      
      {showGame && }
      {showGame && }
      {showGame && }
      {showGame && }
      
      
    </>
  )
}

export default function Scene() {
  const quality  = useGameStore((s) => s.quality)
  const settings = useSettingsStore((s) => s.graphics)

  return (
    <Canvas
      shadows={settings.shadows}
      camera={{ fov: 75, near: 0.1, far: 600 }}
      dpr={quality === 'low' ? [0.5,1] : quality === 'medium' ? [1,1.5] : [1,2]}
      gl={{ antialias: quality !== 'low', powerPreference:'high-performance', alpha:false }}
      style={{ position:'absolute', inset:0 }}
    >
      
      
      
        
        
      
    
  )
}
```

## 9.7 — `src/hooks/useAudio.ts`

```typescript
import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'
import { useSettingsStore } from '../store/settingsStore'
import {
  initAudio, updateEngineSound as _updateEngineSound,
  muteAudio
} from '../utils/audio'

export function useAudio() {
  const muted = useSettingsStore((s) => s.audio.muted)

  useEffect(() => {
    const handleInteraction = () => { initAudio(); window.removeEventListener('click', handleInteraction) }
    window.addEventListener('click', handleInteraction)
    return () => window.removeEventListener('click', handleInteraction)
  }, [])

  useEffect(() => { muteAudio(muted) }, [muted])

  useFrame(() => {
    const { car, phase } = useGameStore.getState()
    const { audio } = useSettingsStore.getState()
    if (phase !== 'racing') return
    _updateEngineSound(car.engineRPM, audio.engineVolume * audio.masterVolume)
  })

  return { updateEngineSound: _updateEngineSound }
}
```

✅ **Phase 9 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 10 — HUD Components (8 UI components)
# ═══════════════════════════════════════════════

## Goal
Build all in-game HUD elements. Every component reads from Zustand store reactively.

## 10.1 — `src/components/ui/Speedometer.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { getCar } from '../../data/cars'

/**
 * Circular arc speedometer with animated needle, RPM, gear indicator.
 * SVG arc path driven by speed percentage.
 */
export default function Speedometer() {
  const speed    = useGameStore((s) => Math.abs(s.car.speed))
  const rpm      = useGameStore((s) => s.car.engineRPM)
  const isNitro  = useGameStore((s) => s.car.isNitroActive)
  const carId    = useGameStore((s) => s.selectedCarId)
  const maxSpeed = getCar(carId).stats.topSpeed

  const pct  = Math.min(speed / maxSpeed, 1)
  const R    = 52
  const CIRC = 2 * Math.PI * R
  const ARC  = CIRC * 0.75   // 270° sweep
  const rpmPct = rpm / 8000

  // Color: green → yellow → red
  const hue   = 120 - pct * 120
  const color = `hsl(${hue},100%,55%)`

  // Gear estimate (simplified)
  const gear = speed < 30 ? 1 : speed < 60 ? 2 : speed < 100 ? 3 : speed < 140 ? 4 : speed < 170 ? 5 : 6

  return (
    <div className={`hud-panel relative select-none ${isNitro ? 'border border-neon-orange animate-glow-orange' : 'border border-white/10'}`}>
      
        {/* Outer ring SVG */}
        
          {/* Background track */}
          
          {/* RPM inner track */}
          
          {/* RPM fill */}
           6000 ? '#ff073a' : '#ff6600'}
            strokeWidth="4"
            strokeDasharray={`${(CIRC-14)*0.75*rpmPct} ${CIRC}`}
            strokeLinecap="round"
            style={{ filter:`drop-shadow(0 0 3px ${rpm > 6000 ? '#ff073a' : '#ff6600'})`, transition:'stroke-dasharray 0.08s' }}
          />
          {/* Speed arc */}
          
        
        {/* Center */}
        
          
            {Math.round(speed)}
          
          km/h
          G{gear}
          {isNitro && (
            NITRO
          )}
        
      
    
  )
}
```

## 10.2 — `src/components/ui/LapTimer.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { formatTime } from '../../utils/helpers'
import { useRef, useEffect } from 'react'

export default function LapTimer() {
  const currentLap    = useGameStore((s) => s.currentLap)
  const totalLaps     = useGameStore((s) => s.car.nitro)  // placeholder hook
  const bestLap       = useGameStore((s) => s.bestLapTime)
  const score         = useGameStore((s) => s.score)
  const lapStartTime  = useGameStore((s) => s.currentLapStart)
  const phase         = useGameStore((s) => s.phase)
  const laps          = useGameStore((s) => s.totalLaps)
  const lapHistory    = useGameStore((s) => s.lapHistory)

  // Live current lap timer (not stored — computed from lapStart)
  const displayRef = useRef(null)
  useEffect(() => {
    let raf: number
    const tick = () => {
      if (displayRef.current && phase === 'racing') {
        const elapsed = Date.now() - lapStartTime
        displayRef.current.textContent = formatTime(elapsed)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [lapStartTime, phase])

  return (
    
      {/* Lap counter */}
      
        Lap
        
          {currentLap} / {laps}
        
      
      {/* Live timer */}
      
        Time
        00:00.000
      
      {/* Best lap */}
      
        Best
        
          {isFinite(bestLap) ? formatTime(bestLap) : '--:--.---'}
        
      
      {/* Previous laps */}
      {lapHistory.slice(-2).map((lap, i) => (
        
          L{lap.lapNumber}
          {formatTime(lap.endTime! - lap.startTime)}
        
      ))}
      {/* Score */}
      
        Score
        {score.toLocaleString()}
      
    
  )
}
```

## 10.3 — `src/components/ui/NitroBar.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { getCar } from '../../data/cars'

export default function NitroBar() {
  const nitro    = useGameStore((s) => s.car.nitro)
  const isActive = useGameStore((s) => s.car.isNitroActive)
  const isDrift  = useGameStore((s) => s.car.isDrifting)
  const carId    = useGameStore((s) => s.selectedCarId)
  const maxNitro = getCar(carId).stats.nitroCapacity

  const pct   = (nitro / maxNitro) * 100
  const color = nitro > maxNitro * 0.6 ? '#00d4ff' : nitro > maxNitro * 0.25 ? '#ff6600' : '#ff073a'
  const segs  = 20

  return (
    <div className={`hud-panel border min-w-[150px] ${isActive ? 'border-neon-orange animate-glow-orange' : 'border-white/10'}`}>
      {/* Header */}
      
        ⚡ Nitro
        
          {isActive ? 'ACTIVE' : nitro < maxNitro * 0.1 ? 'RECHARGE' : 'READY'}
        
      

      {/* Segmented bar */}
      
        {Array.from({length:segs}).map((_,i) => {
          const filled = (i / segs) * 100 < pct
          return (
            
          )
        })}
      

      {/* Pct + drift indicator */}
      
        
          {Math.round(pct)}%
        
        {isDrift && (
          
            🔥 DRIFT
          
        )}
      
    
  )
}
```

## 10.4 — `src/components/ui/Minimap.tsx`

```tsx
import { useEffect, useRef } from 'react'
import { useGameStore } from '../../store/gameStore'
import { getTrack } from '../../data/tracks'

const SIZE = 140

export default function Minimap() {
  const canvasRef = useRef(null)
  const carPos    = useGameStore((s) => s.car.position)
  const carRot    = useGameStore((s) => s.car.rotation[1])
  const trackId   = useGameStore((s) => s.selectedTrackId)
  const track     = getTrack(trackId)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const cx = SIZE/2, cy = SIZE/2
    const pts = track.controlPoints

    // Find track bounds for scaling
    const xs = pts.map(p => p[0]), zs = pts.map(p => p[2])
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minZ = Math.min(...zs), maxZ = Math.max(...zs)
    const rangeX = maxX - minX || 1, rangeZ = maxZ - minZ || 1
    const scale  = (SIZE - 24) / Math.max(rangeX, rangeZ)

    const toMap = (x: number, z: number) => ({
      x: cx + (x - (minX + rangeX/2)) * scale,
      y: cy + (z - (minZ + rangeZ/2)) * scale,
    })

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // BG circle
      ctx.fillStyle = 'rgba(5,5,20,0.8)'
      ctx.beginPath(); ctx.arc(cx,cy,cx-1,0,Math.PI*2); ctx.fill()

      // Circular clip
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,cx-3,0,Math.PI*2); ctx.clip()

      // Draw track outline (thick)
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      ctx.lineWidth   = track.trackWidth * scale * 0.9
      ctx.lineCap     = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath()
      pts.forEach((p, i) => {
        const m = toMap(p[0], p[2])
        i === 0 ? ctx.moveTo(m.x, m.y) : ctx.lineTo(m.x, m.y)
      })
      ctx.closePath(); ctx.stroke()

      // Track center line
      ctx.strokeStyle = track.accentColor + '60'
      ctx.lineWidth   = 1.5; ctx.setLineDash([4,4])
      ctx.beginPath()
      pts.forEach((p, i) => {
        const m = toMap(p[0], p[2])
        i === 0 ? ctx.moveTo(m.x, m.y) : ctx.lineTo(m.x, m.y)
      })
      ctx.closePath(); ctx.stroke(); ctx.setLineDash([])

      // Start line
      const sp = toMap(pts[0][0], pts[0][2])
      ctx.fillStyle = '#00d4ff'; ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 6
      ctx.fillRect(sp.x-4, sp.y-2, 8, 4); ctx.shadowBlur = 0

      // Car indicator
      const cp = toMap(carPos[0], carPos[2])
      ctx.save()
      ctx.translate(cp.x, cp.y)
      ctx.rotate(-carRot + Math.PI)
      ctx.fillStyle = '#ff073a'
      ctx.shadowColor = '#ff073a'; ctx.shadowBlur = 8
      ctx.beginPath(); ctx.moveTo(0,-6); ctx.lineTo(4,4); ctx.lineTo(0,2); ctx.lineTo(-4,4); ctx.closePath()
      ctx.fill(); ctx.shadowBlur = 0
      ctx.restore()

      // Radar sweep overlay
      const sweepAngle = (Date.now() / 3000) * Math.PI * 2
      const grad = ctx.createConicalGradient ? undefined : null  // fallback
      ctx.strokeStyle = track.accentColor + '30'; ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx,cy); ctx.arc(cx,cy,cx-3,sweepAngle,sweepAngle+0.6)
      ctx.closePath(); ctx.stroke()

      ctx.restore()

      // Border ring
      ctx.strokeStyle = track.accentColor + '60'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(cx,cy,cx-2,0,Math.PI*2); ctx.stroke()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [carPos, carRot, track])

  return (
    
      
        Radar
        ◉ Live
      
      
    
  )
}
```

## 10.5 — `src/components/ui/PositionIndicator.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function PositionIndicator() {
  const lap   = useGameStore((s) => s.currentLap)
  const total = useGameStore((s) => s.totalLaps)
  const speed = useGameStore((s) => s.car.speed)
  const rev   = speed < 0

  return (
    
      Position
      
        1st
      
      {rev && REVERSE}
    
  )
}
```

## 10.6 — `src/components/ui/DamageBar.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function DamageBar() {
  const damage = useGameStore((s) => s.car.damage)
  const show   = useSettingsStore?.((s) => s.display.showDamage) ?? true

  if (!show || damage < 5) return null
  const color = damage > 70 ? '#ff073a' : damage > 40 ? '#ff6600' : '#ffe600'

  return (
    
      
        ⚠ Damage
        {Math.round(damage)}%
      
      
        
      
      {damage > 80 && (
        
          CRITICAL — PIT STOP
        
      )}
    
  )
}

// Need to import at top: import { useSettingsStore } from '../../store/settingsStore'
```

## 10.7 — `src/components/ui/ScoreFeed.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function ScoreFeed() {
  const events = useGameStore((s) => s.scoreEvents)
  const recent = [...events].reverse().slice(0, 5)

  return (
    
      {recent.map((ev, i) => {
        const age     = Date.now() - ev.timestamp
        const opacity = Math.max(0, 1 - i * 0.22 - age / 4000)
        const color   = ev.type === 'drift_combo' ? '#ff6600'
          : ev.type === 'best_lap'   ? '#39ff14'
          : ev.type === 'nitro_boost'? '#00d4ff'
          : '#ffffff'
        return (
          
            {ev.message}
          
        )
      })}
    
  )
}
```

## 10.8 — `src/components/ui/FPSCounter.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { useSettingsStore } from '../../store/settingsStore'

export default function FPSCounter() {
  const fps     = useGameStore((s) => s.fps)
  const quality = useGameStore((s) => s.quality)
  const show    = useSettingsStore((s) => s.display.showFPS)
  if (!show && !import.meta.env.DEV) return null
  const color = fps >= 55 ? '#39ff14' : fps >= 40 ? '#ff6600' : '#ff073a'
  return (
    
      {fps} FPS
      {quality}
    
  )
}
```

✅ **Phase 10 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 11 — HUD Composition & Mobile Controls
# ═══════════════════════════════════════════════

## 11.1 — `src/components/HUD.tsx`

```tsx
import Speedometer from './ui/Speedometer'
import LapTimer    from './ui/LapTimer'
import NitroBar    from './ui/NitroBar'
import Minimap     from './ui/Minimap'
import PositionIndicator from './ui/PositionIndicator'
import DamageBar   from './ui/DamageBar'
import ScoreFeed   from './ui/ScoreFeed'
import FPSCounter  from './ui/FPSCounter'
import { useMobileControls } from '../hooks/useMobileControls'
import { useGameStore } from '../store/gameStore'
import type { Controls } from '../types'

// ─── Touch Button ──────────────────────────────────────────────────────────────
function TB({ label, k, cls='' }: { label:string; k:keyof Controls; cls?:string }) {
  const { press, release } = useMobileControls()
  return (
    <button
      className={`glass border border-white/20 font-game font-bold text-white text-2xl
        select-none touch-none rounded-xl transition-all active:scale-90 active:bg-white/20 ${cls}`}
      onPointerDown={press(k)} onPointerUp={release(k)} onPointerLeave={release(k)}
    >{label}
  )
}

// ─── Pause Panel ───────────────────────────────────────────────────────────────
function PauseOverlay() {
  const setPhase = useGameStore((s) => s.setPhase)
  const resetRace = useGameStore((s) => s.resetRace)
  return (
    
      
        PAUSED
        Press ESC to resume
        
          <button className="btn-primary w-full" onClick={() => setPhase('racing')}>▶ Resume
          ⏹ Quit Race
        
      
    
  )
}

// ─── Countdown ─────────────────────────────────────────────────────────────────
function CountdownOverlay() {
  const phase = useGameStore((s) => s.phase)
  if (phase !== 'countdown') return null
  return (
    
      
        
          GO!
        
        Race starts!
      
    
  )
}

// ─── Main HUD ──────────────────────────────────────────────────────────────────
export default function HUD() {
  const phase = useGameStore((s) => s.phase)
  if (!['racing','countdown','paused'].includes(phase)) return null

  return (
    

      {/* ── Top row ─────────────────────────────────────────────────── */}
      
        {/* Top-left: Lap + Score */}
        
          
        
        {/* Top-center: Score feed */}
        
          
        
        {/* Top-right: Minimap + FPS */}
        
          
          
        
      

      {/* ── Center: Position indicator ──────────────────────────────── */}
      
        
      

      {/* ── Bottom row ──────────────────────────────────────────────── */}
      
        {/* Bottom-left: Nitro + Damage */}
        
          
          
        

        {/* Bottom-center: keyboard hint (desktop) */}
        
          
            
              ↑↓←→ Drive · SPACE Nitro · SHIFT Drift · ESC Pause
            
          
        

        {/* Bottom-right: Speedometer */}
        
          
        
      

      {/* ── Mobile Touch Controls ───────────────────────────────────── */}
      
        {/* D-pad */}
        <div className="grid gap-1" style={{ gridTemplate:'repeat(2,56px)/repeat(3,56px)' }}>
          
          
          
          
          
          
        
        {/* Action buttons */}
        
          
          
          
        
      

      {/* ── Pause overlay ────────────────────────────────────────────── */}
      {phase === 'paused'    && }
      {phase === 'countdown' && }
    
  )
}
```

✅ **Phase 11 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 12 — Auth Screen (Login + Register)
# ═══════════════════════════════════════════════

## 12.1 — `src/components/screens/AuthScreen.tsx`

Full login + register screen with animated tabs, form validation, error display, and guest mode.

```tsx
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useGameStore }  from '../../store/gameStore'
import { isValidEmail }  from '../../utils/helpers'
import { playUIClick }   from '../../utils/audio'

type Tab = 'login' | 'register'

export default function AuthScreen() {
  const [tab,        setTab]    = useState('login')
  const [email,      setEmail]  = useState('')
  const [password,   setPass]   = useState('')
  const [username,   setUser]   = useState('')
  const [fieldErrors, setFErrs] = useState<Record>({})

  const { login, register, loginGuest, isLoading, error, clearError } = useAuthStore()
  const setPhase = useGameStore((s) => s.setPhase)

  const validate = (): boolean => {
    const errs: Record = {}
    if (!isValidEmail(email))      errs.email    = 'Invalid email address'
    if (password.length < 4)       errs.password = 'Min 4 characters'
    if (tab === 'register' && username.length < 2) errs.username = 'Min 2 characters'
    setFErrs(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!validate()) return
    playUIClick()
    if (tab === 'login') await login(email, password)
    else                 await register(username, email, password)
    // Auth store persists user; App.tsx watches and routes to menu
    setPhase('menu')
  }

  const handleGuest = () => { playUIClick(); loginGuest(); setPhase('menu') }

  return (
    
      {/* Background glow orbs */}
      
        
        
      

      
        {/* Logo */}
        
          
            APEXRUSH
          
          PRO RACING
        

        {/* Card */}
        
          {/* Tabs */}
          
            {(['login','register'] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); clearError(); setFErrs({}); playUIClick() }}
                className={`flex-1 font-game text-xs uppercase tracking-widest py-2.5 transition-all duration-200
                  ${tab === t ? 'bg-neon-blue/15 text-neon-blue font-bold' : 'text-white/40 hover:text-white/60'}`}>
                {t === 'login' ? '🔑 Login' : '✨ Register'}
              
            ))}
          

          {/* Form */}
          
            {tab === 'register' && (
              
                <input className={`game-input ${fieldErrors.username ? 'error' : ''}`}
                  placeholder="Username" value={username}
                  onChange={e => setUser(e.target.value)} autoComplete="username" />
                {fieldErrors.username && {fieldErrors.username}}
              
            )}
            
              <input className={`game-input ${fieldErrors.email ? 'error' : ''}`}
                placeholder="Email" type="email" value={email}
                onChange={e => setEmail(e.target.value)} autoComplete="email" />
              {fieldErrors.email && {fieldErrors.email}}
            
            
              <input className={`game-input ${fieldErrors.password ? 'error' : ''}`}
                placeholder="Password" type="password" value={password}
                onChange={e => setPass(e.target.value)} autoComplete={tab==='login'?'current-password':'new-password'} />
              {fieldErrors.password && {fieldErrors.password}}
            

            {/* Global error */}
            {error && (
              
                {error}
              
            )}

            {/* Submit */}
            
              {isLoading ? (
                
                  
                  {tab === 'login' ? 'Signing in...' : 'Creating account...'}
                
              ) : tab === 'login' ? '→ Sign In' : '→ Create Account'}
            
          

          {/* Divider */}
          
            
            or
            
          

          {/* Guest mode */}
          
            👤 Continue as Guest
          
          
            Guest progress is not saved
          
        
      
    
  )
}
```

✅ **Phase 12 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 13 — Main Menu, Car Select, Track Select
# ═══════════════════════════════════════════════

## 13.1 — `src/components/screens/MainMenu.tsx`

```tsx
import { useEffect } from 'react'
import { useAuthStore }  from '../../store/authStore'
import { useGameStore }  from '../../store/gameStore'
import { playUIClick, playUIHover } from '../../utils/audio'

export default function MainMenu() {
  const user     = useAuthStore((s) => s.user)
  const isGuest  = useAuthStore((s) => s.isGuest)
  const logout   = useAuthStore((s) => s.logout)
  const setPhase = useGameStore((s) => s.setPhase)

  const nav = (phase: import('../../types').GamePhase) => { playUIClick(); setPhase(phase) }

  return (
    
      {/* Background neon orbs */}
      
        
        
        
      

      {/* Logo */}
      
        
          APEX
          RUSH
        
        
          PRO RACING EXPERIENCE
        
        {user && (
          
            Welcome back, {user.avatar} {user.username}
            ·
            Lvl {user.level}
          
        )}
      

      {/* Menu items */}
      
        <button className="btn-primary text-base py-4" onMouseEnter={playUIHover}
          onClick={() => nav('car_select')}>
          🏁 START RACE
        
        <button className="btn-secondary py-3" onMouseEnter={playUIHover}
          onClick={() => nav('garage')}>
          🚗 GARAGE
        
        <button className="btn-secondary py-3" onMouseEnter={playUIHover}
          onClick={() => nav('leaderboard')}>
          🏆 LEADERBOARD
        
        {!isGuest && (
          <button className="btn-secondary py-3" onMouseEnter={playUIHover}
            onClick={() => nav('profile')}>
            👤 PROFILE
          
        )}
        <button className="btn-secondary py-3" onMouseEnter={playUIHover}
          onClick={() => nav('settings')}>
          ⚙️ SETTINGS
        
        {!isGuest && (
          <button className="font-game text-[10px] text-white/25 uppercase tracking-widest py-2
            hover:text-white/50 transition-colors"
            onClick={() => { logout(); setPhase('auth') }}>
            Sign Out
          
        )}
      

      {/* Version */}
      
        ApexRush Pro v2.0
      
    
  )
}
```

## 13.2 — `src/components/screens/CarSelect.tsx`

```tsx
import { useState } from 'react'
import { useAuthStore }   from '../../store/authStore'
import { useGameStore }   from '../../store/gameStore'
import { useGarageStore } from '../../store/garageStore'
import { CAR_DEFINITIONS } from '../../data/cars'
import { playUIClick, playUIHover } from '../../utils/audio'
import { statPercent } from '../../utils/helpers'
import type { CarDefinition } from '../../types'

const STAT_LABELS: [keyof import('../../types').CarStats, string, string][] = [
  ['topSpeed',     '🔺 Top Speed',    'neon-blue'],
  ['acceleration', '⚡ Acceleration', 'neon-green'],
  ['handling',     '↩ Handling',      'neon-orange'],
  ['braking',      '⏹ Braking',      'neon-red'],
  ['nitroCapacity','✨ Nitro',         'neon-purple'],
]

export default function CarSelect() {
  const user        = useAuthStore((s) => s.user)
  const { selectCar, setPhase } = useGameStore()
  const { setSelectedCar, selectedCarId } = useGarageStore()
  const [hoveredId, setHoveredId] = useState(null)

  const selected   = CAR_DEFINITIONS.find(c => c.id === selectedCarId) ?? CAR_DEFINITIONS[0]
  const isUnlocked = (car: CarDefinition) => user?.unlockedCars.includes(car.id) ?? car.unlockRequirement === 0

  const handleSelect = (car: CarDefinition) => {
    if (!isUnlocked(car)) return
    playUIClick()
    setSelectedCar(car.id)
    selectCar(car.id)
  }

  return (
    
      {/* Header */}
      
        <button className="btn-secondary px-4 py-2" onClick={() => { playUIClick(); setPhase('menu') }}>
          ← Back
        
        SELECT CAR
        <button className="btn-primary px-6 py-2" onClick={() => { playUIClick(); setPhase('track_select') }}>
          Next →
        
      

      
        {/* Car grid */}
        
          {CAR_DEFINITIONS.map(car => {
            const unlocked = isUnlocked(car)
            const isSel    = selectedCarId === car.id
            return (
              <div key={car.id}
                className={`glass-card border cursor-pointer transition-all duration-300 p-3 md:p-4 relative overflow-hidden
                  ${isSel ? 'border-neon-blue shadow-neon-blue' : 'border-white/8'}
                  ${!unlocked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-1'}`}
                onClick={() => handleSelect(car)}
                onMouseEnter={() => { setHoveredId(car.id); playUIHover() }}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Car emoji big */}
                
                  {car.emoji}
                
                
                  {car.name}
                  {car.tagline}
                
                {/* Selected indicator */}
                {isSel && (
                  
                )}
                {/* Locked overlay */}
                {!unlocked && (
                  
                    
                      🔒
                      {car.unlockRequirement} races
                    
                  
                )}
              
            )
          })}
        

        {/* Selected car detail panel */}
        
          
            
              {selected.emoji}
            
            
              {selected.name}
              {selected.tagline}
              {selected.description}
            
          

          {/* Stats */}
          
            {STAT_LABELS.map(([key, label, colorClass]) => {
              const value = key === 'topSpeed'
                ? statPercent(selected.stats[key], 220)
                : key === 'nitroCapacity'
                ? statPercent(selected.stats[key], 150)
                : statPercent(selected.stats[key])
              return (
                
                  
                    {label}
                    
                      {key === 'topSpeed' ? `${selected.stats.topSpeed} km/h`
                        : key === 'nitroCapacity' ? `${selected.stats.nitroCapacity}`
                        : `${selected.stats[key as keyof typeof selected.stats]}/10`}
                    
                  
                  
                    
                  
                
              )
            })}
          

          {/* Unlock status */}
          {!isUnlocked(selected) && (
            
              
                🔒 Requires {selected.unlockRequirement} races · {selected.price.toLocaleString()} XP
              
            
          )}
        
      
    
  )
}
```

## 13.3 — `src/components/screens/TrackSelect.tsx`

```tsx
import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import { useAuthStore }     from '../../store/authStore'
import { playUIClick, playUIHover } from '../../utils/audio'
import { difficultyStars, formatTime } from '../../utils/helpers'

export default function TrackSelect() {
  const { selectTrack, selectedTrackId, setPhase, startRace } = useGameStore()
  const [selected, setSelected] = useState(selectedTrackId)
  const user = useAuthStore((s) => s.user)
  const track = TRACK_DEFINITIONS.find(t => t.id === selected) ?? TRACK_DEFINITIONS[0]

  const WEATHER_ICONS: Record = { clear:'☀️', rain:'🌧️', fog:'🌫️', sandstorm:'🏜️' }
  const TIME_ICONS:    Record = { day:'🌞', golden_hour:'🌅', night:'🌙' }

  return (
    
      {/* Header */}
      
        <button className="btn-secondary px-4 py-2" onClick={() => { playUIClick(); setPhase('car_select') }}>
          ← Cars
        
        SELECT TRACK
        <button className="btn-primary px-6 py-2" onClick={() => { playUIClick(); selectTrack(selected); startRace() }}>
          RACE →
        
      

      
        {/* Track cards grid */}
        
          {TRACK_DEFINITIONS.map(t => (
            <div key={t.id}
              onClick={() => { setSelected(t.id); playUIClick() }}
              onMouseEnter={playUIHover}
              className={`glass-card border cursor-pointer p-4 transition-all duration-300
                ${selected === t.id ? `border-[${t.accentColor}] shadow-[0_0_20px_${t.accentColor}40]` : 'border-white/8'}`}
              style={{ borderColor: selected === t.id ? t.accentColor : undefined }}
            >
              {/* Track theme preview (procedural gradient) */}
              
                
                  {t.theme === 'city' ? '🏙️' : t.theme === 'mountain' ? '🏔️' : t.theme === 'desert' ? '🏜️' : '🌌'}
                
                {/* Difficulty badge */}
                
                  
                    {difficultyStars(t.difficulty)}
                  
                
              
              {t.name}
              {t.subtitle}
              {user?.bestLapTimes[t.id] && (
                
                  PB: {formatTime(user.bestLapTimes[t.id])}
                
              )}
            
          ))}
        

        {/* Track detail */}
        
          {/* Big preview */}
          
            
              {track.theme === 'city' ? '🏙️' : track.theme === 'mountain' ? '🏔️' : track.theme === 'desert' ? '🏜️' : '🌌'}
            
            
              
                {difficultyStars(track.difficulty)}
              
              
                {track.laps} Laps
              
            
          

          {track.name}
          {track.subtitle}
          {track.description}

          {/* Track meta */}
          
            {[
              ['🛣️ Surface', track.surface.replace('_',' ')],
              [`${TIME_ICONS[track.timeOfDay]} Time`, track.timeOfDay.replace('_',' ')],
              [`${WEATHER_ICONS[track.weather]} Weather`, track.weather],
              ['📏 Difficulty', `${track.difficulty}/5`],
            ].map(([label, val]) => (
              
                {label}
                {val}
              
            ))}
          

          {/* Record */}
          
            🏆 Track Record
            
              {formatTime(track.bestLapRecord)}
            
          
          {user?.bestLapTimes[track.id] && (
            
              Your Best
              
                {formatTime(user.bestLapTimes[track.id])}
              
            
          )}
        
      
    
  )
}
```

✅ **Phase 13 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 14 — Race Results, Countdown
# ═══════════════════════════════════════════════

## 14.1 — `src/components/screens/RaceCountdown.tsx`

```tsx
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
        if (n === 0) setTimeout(() => setPhase('racing'), 600)
      }, i * 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [setPhase])

  return (
    
      
        {count === 0
          ? GO!
          : {count}
        }
      
      {count > 0 && (
        GET READY
      )}
    
  )
}
```

## 14.2 — `src/components/screens/RaceResults.tsx`

```tsx
import { useGameStore }  from '../../store/gameStore'
import { useAuthStore }  from '../../store/authStore'
import { formatTime }    from '../../utils/helpers'
import { playLapComplete, playUnlock } from '../../utils/audio'
import { useEffect, useState } from 'react'
import { getCar }  from '../../data/cars'
import { getTrack } from '../../data/tracks'

export default function RaceResults() {
  const { score, bestLapTime, lapHistory, selectedCarId, selectedTrackId, resetRace, startRace } = useGameStore()
  const { user, completeRace, addXP } = useAuthStore()
  const [showUnlock, setShowUnlock] = useState(null)

  const car   = getCar(selectedCarId)
  const track = getTrack(selectedTrackId)
  const xpGained = Math.floor(score / 10) + (lapHistory.length >= track.laps ? 200 : 50)

  useEffect(() => {
    playLapComplete()
    if (user) {
      const prevBest = user.bestLapTimes[selectedTrackId] ?? Infinity
      completeRace(selectedTrackId, bestLapTime, true)
      addXP(xpGained)
      // Check for new unlocks
      const newRaces = (user.totalRaces ?? 0) + 1
      const unlockable = ['inferno_v8','shadow_drift','arctic_fox','neon_blaze']
        .find(id => {
          const def = getCar(id)
          return def.unlockRequirement === newRaces && !user.unlockedCars.includes(id)
        })
      if (unlockable) {
        setTimeout(() => { setShowUnlock(unlockable); playUnlock() }, 1200)
      }
    }
  }, [])

  const lapCount = lapHistory.length

  return (
    
      
        {/* Header */}
        
          {lapCount >= track.laps ? '🏆' : '⏱️'}
          
            {lapCount >= track.laps ? 'RACE COMPLETE' : 'RACE OVER'}
          
          
            {track.name} · {car.emoji} {car.name}
          
        

        {/* Stats */}
        
          {[
            ['🏁 Best Lap',     formatTime(bestLapTime),           'neon-orange'],
            ['📊 Total Score',  score.toLocaleString() + ' pts',   'neon-blue'],
            ['✨ XP Gained',    `+${xpGained} XP`,                 'neon-green'],
            ['📏 Laps Done',    `${lapCount} / ${track.laps}`,      'text-white'],
          ].map(([label, val, colorCls]) => (
            
              {label}
              {val}
            
          ))}
        

        {/* Lap breakdown */}
        {lapHistory.length > 0 && (
          
            Lap Times
            {lapHistory.map((lap, i) => {
              const t = lap.endTime ? lap.endTime - lap.startTime : 0
              const isBest = t === bestLapTime
              return (
                <div key={i} className={`flex justify-between items-center text-sm ${isBest ? 'neon-orange' : 'text-white/60'}`}>
                  LAP {lap.lapNumber}
                  {formatTime(t)}
                  {isBest && BEST}
                
              )
            })}
          
        )}

        {/* Car unlock notification */}
        {showUnlock && (
          
            {getCar(showUnlock).emoji}
            
              🎉 Unlocked: {getCar(showUnlock).name}!
            
          
        )}

        {/* Actions */}
        
          <button className="btn-primary w-full" onClick={() => { startRace() }}>
            🔄 Race Again
          
          <button className="btn-secondary w-full" onClick={() => resetRace()}>
            ← Main Menu
          
        
      
    
  )
}
```

✅ **Phase 14 complete.**

---
---

# ═══════════════════════════════════════════════
# PHASE 15 — Garage, Leaderboard, Settings, Profile
# ═══════════════════════════════════════════════

## 15.1 — `src/components/screens/Garage.tsx`

Implement a full garage screen with:
- Grid of owned cars (with lock indicators for unowned)
- Selected car preview (large emoji + stats)
- Color picker: 12 preset swatches + custom hex input
- Upgrade panel: 4 upgrade slots (Engine, Tires, Nitro, Aero) each with 3 pips
- XP cost display per upgrade
- "Unlock" button for cars the user can afford with XP

Key code patterns:

```tsx
// Color swatch grid
const COLORS = ['#c0392b','#00d4ff','#ff6600','#8000ff','#39ff14','#ff00aa',
                '#ffffff','#111111','#ffe600','#00ff88','#ff8800','#0066ff']

// Upgrade pip display
function UpgradePips({ level }: { level: number }) {
  return (
    
      {[0,1,2].map(i => (
        <div key={i} className={`w-3 h-3 rounded-full border transition-all ${
          i < level ? 'bg-neon-blue border-neon-blue shadow-neon-blue' : 'border-white/20 bg-transparent'
        }`} />
      ))}
    
  )
}
```

## 15.2 — `src/components/screens/Leaderboard.tsx`

```tsx
import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useAuthStore } from '../../store/authStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import { formatTime } from '../../utils/helpers'
import { playUIClick } from '../../utils/audio'

// Generate fake leaderboard entries for demo
function generateLeaderboard(trackId: string) {
  const NAMES = ['ShadowDrifter','NeonKing','ApexHunter','BlazeMaster','VoltRider',
                 'IceViper','DustDevil','NightRacer','SpeedFreak','GhostLap']
  const CARS  = ['phantom_gt','volt_racer','inferno_v8','shadow_drift','neon_blaze']
  const base  = TRACK_DEFINITIONS.find(t => t.id === trackId)?.bestLapRecord ?? 80000
  return NAMES.map((name, i) => ({
    rank: i+1, username: name, avatar: ['🦊','🐆','🐺','🦁','🐉','🦅','🦋','🐬','🦂','🐍'][i],
    carId: CARS[i % CARS.length], lapTime: base + i * 1200 + Math.random()*800|0,
    date: Date.now() - i * 86400000, isPlayer: false,
  }))


# 🏎️ RACING GAME — COMPLETE AGENT BUILD PROMPT
> **Instructions for AI Agent (e.g. Gemini Flash / GPT / Claude):**
> This file is your complete specification. Read it fully before starting. Execute each **Phase** one at a time in order. Do NOT skip phases. After completing each phase, confirm with: `✅ Phase [N] complete.` then proceed to the next.

---

# 🏎️ APEXRUSH — ULTRA-DETAILED FULL-STACK 3D RACING GAME BUILD PROMPT
> **Instructions for AI Agent (Gemini Flash / GPT / Claude):**
> This file is your complete specification. Read it **fully** before starting.
> Execute each **Sub-Prompt** one at a time in strict order.
> After completing each sub-prompt, respond with: `✅ Sub-Prompt [N] complete — [brief summary of what was built]`
> Then **immediately proceed** to the next sub-prompt without waiting.
> Do NOT skip phases. Do NOT stub code. Write everything in full.

---

## 🧭 AGENT OPERATING RULES

1. **Execute sub-prompts sequentially** — SP-1 → SP-2 → SP-3 ... → SP-15
2. **Never skip a step** within a sub-prompt
3. **Write all code** — no stubs, mocks, or TODOs
4. **Use exact filenames and folder paths** as specified
5. **Fix TypeScript errors immediately** before moving on
6. **After each sub-prompt**, run `npm run build` to verify zero errors
7. **Comment every non-trivial block** of code
8. If a dependency version conflict occurs: `npm install --legacy-peer-deps`
9. All UI must be **mobile-first responsive** — test at 375px, 768px, 1280px
10. Target **60 FPS** — use `useFrame` hooks efficiently; call `useGameStore.getState()` (not hooks) inside `useFrame`
11. **No TypeScript `any` types** — use proper typing throughout
12. **Prettier/ESLint** compatible code — consistent formatting
13. When in doubt about a design choice, pick the **more impressive** option

---

## 📐 FINAL DELIVERABLE OVERVIEW

A production-grade, AAA-quality **3D web-based car racing game** featuring:

### Core Gameplay
- 5 fully modelled cars with unique stats (speed, handling, acceleration, nitro)
- 4 distinct racing tracks (City Circuit, Mountain Pass, Desert Speedway, Neon Nights)
- Realistic car physics: acceleration, braking, steering, drifting, nitro boost
- Lap system with checkpoint validation (ghost timing optional)
- Countdown start sequence with animated lights

### Visual Quality
- PBR materials on all cars and track elements
- Post-processing: Bloom, Depth of Field, Chromatic Aberration, Vignette, Motion Blur
- Dynamic day/night skyboxes per track
- Procedural particle systems: exhaust, drift sparks, tire smoke, rain (per track)
- Animated track decorations: crowd stands, advertising boards, pit lane, pit crew

### User System
- Full authentication: Register / Login / Guest Play
- Player profile: avatar selection, username, preferred car
- Persistent stats: best lap per track, total races, win rate, XP / level
- Leaderboard per track (stored in localStorage with JSON persistence)

### HUD & UI
- Glassmorphic HUD with neon accents
- Circular SVG speedometer with animated needle
- Lap timer / best lap / sector splits
- Nitro bar with pulsing segments
- Mini-map (canvas-rendered, live car position)
- Score feed with animated popups
- FPS counter (dev mode)
- Race position indicator (#1 / #5)
- Damage/health bar (collision with barriers)

### Screens
- Animated splash / loading screen
- Main menu with animated 3D background
- Car selection screen (5 cars, animated 3D preview)
- Track selection screen (4 tracks, animated preview + stats)
- In-race HUD
- Pause menu
- Race results / podium screen
- Profile / Garage screen
- Leaderboard screen

### Mobile
- Full on-screen touch controls (D-pad + action buttons)
- Swipe gestures for menu navigation
- Haptic feedback via Vibration API

---

## 🗂️ COMPLETE FOLDER STRUCTURE

```
apexrush/
├── public/
│   └── fonts/  (optional local fonts)
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Scene.tsx
│   │   │   ├── Car.tsx
│   │   │   ├── CarModel.tsx          ← individual car mesh per type
│   │   │   ├── AIOpponent.tsx        ← simple AI car(s)
│   │   │   ├── Track.tsx
│   │   │   ├── TrackConfig.ts        ← track definitions
│   │   │   ├── Environment.tsx
│   │   │   ├── Effects.tsx
│   │   │   ├── CameraController.tsx
│   │   │   ├── Particles.tsx
│   │   │   └── CollisionDetector.tsx
│   │   ├── ui/
│   │   │   ├── Speedometer.tsx
│   │   │   ├── LapTimer.tsx
│   │   │   ├── NitroIndicator.tsx
│   │   │   ├── Minimap.tsx
│   │   │   ├── FPSCounter.tsx
│   │   │   ├── ScoreFeed.tsx
│   │   │   ├── RacePosition.tsx
│   │   │   ├── DamageBar.tsx
│   │   │   └── CountdownLights.tsx
│   │   ├── screens/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── MainMenu.tsx
│   │   │   ├── AuthScreen.tsx
│   │   │   ├── CarSelect.tsx
│   │   │   ├── TrackSelect.tsx
│   │   │   ├── RaceResults.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── LeaderboardScreen.tsx
│   │   ├── shared/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── StarRating.tsx
│   │   └── HUD.tsx
│   ├── hooks/
│   │   ├── useKeyboard.ts
│   │   ├── useGameLoop.ts
│   │   ├── useMobileControls.ts
│   │   ├── useAuth.ts
│   │   └── useSound.ts
│   ├── store/
│   │   ├── gameStore.ts
│   │   ├── authStore.ts
│   │   └── leaderboardStore.ts
│   ├── utils/
│   │   ├── physics.ts
│   │   ├── helpers.ts
│   │   ├── textures.ts
│   │   ├── trackGeometry.ts
│   │   └── aiUtils.ts
│   ├── types/
│   │   └── game.types.ts
│   ├── data/
│   │   ├── cars.ts
│   │   └── tracks.ts
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

# SUB-PROMPT 1 — Project Scaffold, Configuration & Design System

## Goal
Bootstrap the project, install all dependencies, configure Tailwind with a premium design system, set up fonts, and verify the dev server runs clean.

---

## Step 1.1 — Create Project

```bash
npm create vite@latest apexrush -- --template react-ts
cd apexrush
```

## Step 1.2 — Install All Dependencies

```bash
# Core 3D
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing

# Physics
npm install @react-three/cannon

# State
npm install zustand

# Animation
npm install framer-motion

# UI
npm install @headlessui/react clsx

# Dev
npm install -D @types/three tailwindcss postcss autoprefixer

# Init Tailwind
npx tailwindcss init -p
```

If peer errors:
```bash
npm install --legacy-peer-deps
```

---

## Step 1.3 — `tailwind.config.js` (Full Design System)

Replace entirely:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Primary UI font — racing aesthetic
        game:    ['"Orbitron"', 'monospace'],
        // Secondary — clean readability
        body:    ['"Rajdhani"', 'sans-serif'],
        // Numbers / data displays
        mono:    ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        // Brand palette
        brand: {
          blue:   '#00d4ff',
          purple: '#bf00ff',
          orange: '#ff6600',
          red:    '#ff073a',
          green:  '#39ff14',
          gold:   '#ffd700',
          pink:   '#ff007f',
        },
        // Surface tokens
        surface: {
          900: '#040608',
          800: '#080c10',
          700: '#0d1318',
          600: '#121b24',
          500: '#1a2535',
          400: '#243040',
        },
        // Glass tokens
        glass: {
          white4:  'rgba(255,255,255,0.04)',
          white8:  'rgba(255,255,255,0.08)',
          white12: 'rgba(255,255,255,0.12)',
          white20: 'rgba(255,255,255,0.20)',
          dark40:  'rgba(0,0,0,0.40)',
          dark60:  'rgba(0,0,0,0.60)',
          dark80:  'rgba(0,0,0,0.80)',
        },
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern':      "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(0,212,255,0.06)' stroke-width='1'/%3E%3C/svg%3E\")",
        'scanlines':         "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      },
      boxShadow: {
        'neon-blue':   '0 0 10px #00d4ff, 0 0 20px #00d4ff80, 0 0 40px #00d4ff40',
        'neon-orange': '0 0 10px #ff6600, 0 0 20px #ff660080, 0 0 40px #ff660040',
        'neon-green':  '0 0 10px #39ff14, 0 0 20px #39ff1480, 0 0 40px #39ff1440',
        'neon-red':    '0 0 10px #ff073a, 0 0 20px #ff073a80, 0 0 40px #ff073a40',
        'neon-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff80, 0 0 40px #bf00ff40',
        'neon-gold':   '0 0 10px #ffd700, 0 0 20px #ffd70080, 0 0 40px #ffd70040',
        'card':        '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        'card-hover':  '0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.4)',
        'inset-neon':  'inset 0 0 20px rgba(0,212,255,0.1)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      animation: {
        // HUD animations
        'pulse-fast':   'pulse 0.5s ease-in-out infinite',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'spin-slow':    'spin 4s linear infinite',
        'spin-reverse': 'spinReverse 3s linear infinite',
        // Neon glow
        'glow-blue':    'glowBlue 2s ease-in-out infinite alternate',
        'glow-orange':  'glowOrange 2s ease-in-out infinite alternate',
        'glow-green':   'glowGreen 2s ease-in-out infinite alternate',
        // Entry animations
        'slide-up':     'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down':   'slideDown 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-left':   'slideLeft 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-right':  'slideRight 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 0.6s ease-out forwards',
        'fade-in-fast': 'fadeIn 0.25s ease-out forwards',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        // Score popup
        'score-pop':    'scorePop 1.5s ease-out forwards',
        // Loading bar
        'shimmer':      'shimmer 1.5s infinite',
        // Countdown
        'countdown':    'countdownNum 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
        // Scan line effect
        'scan':         'scan 3s linear infinite',
      },
      keyframes: {
        spinReverse: { '100%': { transform: 'rotate(-360deg)' } },
        glowBlue: {
          '0%':   { boxShadow: '0 0 5px #00d4ff40, 0 0 10px #00d4ff20' },
          '100%': { boxShadow: '0 0 15px #00d4ff, 0 0 30px #00d4ff80, 0 0 60px #00d4ff40' },
        },
        glowOrange: {
          '0%':   { boxShadow: '0 0 5px #ff660040' },
          '100%': { boxShadow: '0 0 15px #ff6600, 0 0 30px #ff660080' },
        },
        glowGreen: {
          '0%':   { boxShadow: '0 0 5px #39ff1440' },
          '100%': { boxShadow: '0 0 15px #39ff14, 0 0 30px #39ff1480' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',      opacity: '1' },
        },
        slideLeft: {
          '0%':   { transform: 'translateX(24px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        slideRight: {
          '0%':   { transform: 'translateX(-24px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',      opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        scorePop: {
          '0%':   { transform: 'translateY(0) scale(1)',    opacity: '1' },
          '60%':  { transform: 'translateY(-30px) scale(1.1)', opacity: '1' },
          '100%': { transform: 'translateY(-60px) scale(0.9)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        countdownNum: {
          '0%':   { transform: 'scale(2.5)', opacity: '0' },
          '30%':  { transform: 'scale(1)',   opacity: '1' },
          '70%':  { transform: 'scale(1)',   opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}
```

---

## Step 1.4 — `src/index.css` (Full Global Styles + Design Tokens)

Replace entirely:

```css
/* ── Google Fonts ──────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties ─────────────────────────────────────────────────── */
:root {
  --brand-blue:   #00d4ff;
  --brand-orange: #ff6600;
  --brand-red:    #ff073a;
  --brand-green:  #39ff14;
  --brand-purple: #bf00ff;
  --brand-gold:   #ffd700;
  --brand-pink:   #ff007f;

  --surface-900: #040608;
  --surface-800: #080c10;
  --surface-700: #0d1318;
  --surface-600: #121b24;

  --glass-border: rgba(255,255,255,0.10);
  --glass-bg:     rgba(0,0,0,0.45);
  --glass-bg-bright: rgba(255,255,255,0.05);

  --font-game: 'Orbitron', monospace;
  --font-body: 'Rajdhani', sans-serif;
  --font-mono: 'Share Tech Mono', monospace;
}

/* ── Reset ──────────────────────────────────────────────────────────────────── */
*, *::before, *::after {
  margin: 0; padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%; height: 100%;
  overflow: hidden;
  background: var(--surface-900);
  font-family: var(--font-body);
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Scrollbar ────────────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
::-webkit-scrollbar-thumb { background: var(--brand-blue); border-radius: 2px; opacity: 0.6; }

/* ── Canvas ───────────────────────────────────────────────────────────────── */
canvas { display: block; width: 100% !important; height: 100% !important; }

/* ── Glassmorphism Components ─────────────────────────────────────────────── */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}

.glass-sm {
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
}

.glass-bright {
  background: var(--glass-bg-bright);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
}

.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.4) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  transition: all 0.2s ease;
}
.glass-card:hover {
  border-color: rgba(0,212,255,0.3);
  box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.1);
  transform: translateY(-2px);
}

/* ── Neon Text ────────────────────────────────────────────────────────────── */
.neon-blue   { color: var(--brand-blue);   text-shadow: 0 0 10px var(--brand-blue), 0 0 20px rgba(0,212,255,0.5); }
.neon-orange { color: var(--brand-orange); text-shadow: 0 0 10px var(--brand-orange), 0 0 20px rgba(255,102,0,0.5); }
.neon-red    { color: var(--brand-red);    text-shadow: 0 0 10px var(--brand-red), 0 0 20px rgba(255,7,58,0.5); }
.neon-green  { color: var(--brand-green);  text-shadow: 0 0 10px var(--brand-green), 0 0 20px rgba(57,255,20,0.5); }
.neon-purple { color: var(--brand-purple); text-shadow: 0 0 10px var(--brand-purple), 0 0 20px rgba(191,0,255,0.5); }
.neon-gold   { color: var(--brand-gold);   text-shadow: 0 0 10px var(--brand-gold), 0 0 20px rgba(255,215,0,0.5); }

/* ── Neon Borders ─────────────────────────────────────────────────────────── */
.border-neon-blue   { border-color: var(--brand-blue);   box-shadow: 0 0 8px rgba(0,212,255,0.4), inset 0 0 8px rgba(0,212,255,0.1); }
.border-neon-orange { border-color: var(--brand-orange); box-shadow: 0 0 8px rgba(255,102,0,0.4), inset 0 0 8px rgba(255,102,0,0.1); }
.border-neon-green  { border-color: var(--brand-green);  box-shadow: 0 0 8px rgba(57,255,20,0.4), inset 0 0 8px rgba(57,255,20,0.1); }
.border-neon-red    { border-color: var(--brand-red);    box-shadow: 0 0 8px rgba(255,7,58,0.4), inset 0 0 8px rgba(255,7,58,0.1); }

/* ── Buttons ──────────────────────────────────────────────────────────────── */
.btn-primary {
  font-family: var(--font-game);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.875rem 2.5rem;
  background: linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(0,212,255,0.05) 100%);
  border: 1px solid var(--brand-blue);
  border-radius: 8px;
  color: var(--brand-blue);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0 10px rgba(0,212,255,0.2), inset 0 0 10px rgba(0,212,255,0.05);
  position: relative;
  overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,212,255,0.2), transparent);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.btn-primary:hover {
  background: linear-gradient(135deg, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0.08) 100%);
  box-shadow: 0 0 20px rgba(0,212,255,0.4), inset 0 0 15px rgba(0,212,255,0.1);
  transform: translateY(-1px);
}
.btn-primary:hover::before { opacity: 1; }
.btn-primary:active { transform: scale(0.97); }

.btn-secondary {
  font-family: var(--font-game);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.8);
}

.btn-danger {
  font-family: var(--font-game);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, rgba(255,7,58,0.15), rgba(255,7,58,0.05));
  border: 1px solid var(--brand-red);
  border-radius: 8px;
  color: var(--brand-red);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-danger:hover {
  background: linear-gradient(135deg, rgba(255,7,58,0.25), rgba(255,7,58,0.08));
  box-shadow: 0 0 15px rgba(255,7,58,0.3);
}

/* ── Mobile Controls ──────────────────────────────────────────────────────── */
.mobile-controls { display: none; }
@media (max-width: 768px) {
  .mobile-controls { display: flex; }
}

/* ── Utility ──────────────────────────────────────────────────────────────── */
.no-select { user-select: none; -webkit-user-select: none; }
.no-tap-highlight { -webkit-tap-highlight-color: transparent; }

/* ── Grid Background ──────────────────────────────────────────────────────── */
.bg-grid {
  background-image: linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ── Scanline Overlay ─────────────────────────────────────────────────────── */
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* ── Input Styles ────────────────────────────────────────────────────────── */
.input-glass {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: white;
  width: 100%;
  transition: all 0.2s ease;
  outline: none;
}
.input-glass:focus {
  border-color: var(--brand-blue);
  box-shadow: 0 0 0 2px rgba(0,212,255,0.15);
  background: rgba(0,212,255,0.05);
}
.input-glass::placeholder { color: rgba(255,255,255,0.25); }

/* ── Loading Shimmer ─────────────────────────────────────────────────────── */
.shimmer {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.06) 50%,
    rgba(255,255,255,0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* ── HUD Font Sizing ────────────────────────────────────────────────────── */
.hud-label  { font-family: var(--font-game); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; }
.hud-value  { font-family: var(--font-mono); font-size: 13px; font-weight: bold; }
.hud-large  { font-family: var(--font-mono); font-size: 24px; font-weight: bold; }
.hud-xl     { font-family: var(--font-game); font-size: 40px; font-weight: 900; }

/* ── Car Select Card ────────────────────────────────────────────────────── */
.car-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  border-radius: 16px;
}
.car-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
  border-radius: 16px;
}
.car-card.selected { box-shadow: 0 0 0 2px var(--brand-blue), 0 0 30px rgba(0,212,255,0.3); }
.car-card:hover { transform: translateY(-4px) scale(1.02); }

/* ── Track Card ─────────────────────────────────────────────────────────── */
.track-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}
.track-card:hover { transform: translateY(-4px); }
.track-card.selected { box-shadow: 0 0 0 2px var(--brand-orange), 0 0 30px rgba(255,102,0,0.3); }

/* ── Podium ────────────────────────────────────────────────────────────── */
.podium-1 { background: linear-gradient(180deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.05) 100%); border-color: rgba(255,215,0,0.5); }
.podium-2 { background: linear-gradient(180deg, rgba(192,192,192,0.15) 0%, rgba(192,192,192,0.03) 100%); border-color: rgba(192,192,192,0.3); }
.podium-3 { background: linear-gradient(180deg, rgba(205,127,50,0.15) 0%, rgba(205,127,50,0.03) 100%); border-color: rgba(205,127,50,0.3); }
```

---

## Step 1.5 — `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  optimizeDeps: {
    exclude: ['@react-three/cannon'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three:  ['three'],
          fiber:  ['@react-three/fiber'],
          drei:   ['@react-three/drei'],
          motion: ['framer-motion'],
          zustand:['zustand'],
        },
      },
    },
  },
})
```

## Step 1.6 — Update `tsconfig.json`

Ensure these compiler options exist:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Step 1.7 — Verify

Run `npm run dev` — Vite dev server starts, browser opens, no errors.

✅ **Sub-Prompt 1 complete.**

---

---

# SUB-PROMPT 2 — Data Layer: Car Definitions, Track Configs, TypeScript Types

## Goal
Define all game data — 5 cars with full stat blocks, 4 track configurations, and comprehensive TypeScript types.

---

## Step 2.1 — Create `src/types/game.types.ts`

```ts
// ─── Enumerations ──────────────────────────────────────────────────────────────
export type GamePhase =
  | 'loading'
  | 'auth'
  | 'menu'
  | 'car_select'
  | 'track_select'
  | 'countdown'
  | 'racing'
  | 'paused'
  | 'finished'
  | 'profile'
  | 'leaderboard'

export type CarId = 'viper' | 'phantom' | 'inferno' | 'storm' | 'titan'
export type TrackId = 'city_circuit' | 'mountain_pass' | 'desert_speedway' | 'neon_nights'
export type QualityLevel = 'low' | 'medium' | 'high'
export type WeatherType = 'clear' | 'rain' | 'storm' | 'night' | 'sunset'

// ─── Car ───────────────────────────────────────────────────────────────────────
export interface CarStats {
  topSpeed:     number  // 0–100 rating
  acceleration: number  // 0–100 rating
  handling:     number  // 0–100 rating
  braking:      number  // 0–100 rating
  nitro:        number  // 0–100 rating (capacity)
  weight:       number  // kg (affects physics)
  // Derived physics values (computed from stats)
  maxSpeedKmh:     number
  accelerationRate: number  // km/h per second
  brakingRate:      number
  steeringSpeed:    number
  nitroMultiplier:  number
  nitroDrain:       number
}

export interface CarDefinition {
  id:           CarId
  name:         string
  tagline:      string
  stats:        CarStats
  bodyColor:    string    // hex — main paint
  accentColor:  string    // hex — trim/accents
  rimColor:     string    // hex — wheel rims
  emissiveColor:string    // hex — headlight tint
  unlockLevel:  number    // 0 = unlocked by default
}

export interface CarState {
  position:          { x: number; y: number; z: number }
  rotation:          { x: number; y: number; z: number }
  speed:             number   // km/h — can be negative (reversing)
  nitro:             number   // 0–100
  health:            number   // 0–100 (damage system)
  lapTime:           number   // ms
  bestLapTime:       number   // ms
  currentLap:        number   // 1-based
  totalLaps:         number
  checkpointsPassed: number[]
  isDrifting:        boolean
  isNitroActive:     boolean
  wheelSteerAngle:   number   // radians — for wheel mesh animation
  tireSmoke:         boolean
  lastCheckpointTime:number   // ms — sector timing
}

// ─── Track ─────────────────────────────────────────────────────────────────────
export interface Checkpoint {
  id:         number
  position:   [number, number, number]
  rotation:   [number, number, number]
  isStart:    boolean
  sectorName: string  // 'S1', 'S2', 'S3', 'Finish'
}

export interface TrackDefinition {
  id:             TrackId
  name:           string
  subtitle:       string
  description:    string
  difficulty:     1 | 2 | 3 | 4 | 5  // star rating
  length:         number  // km
  weather:        WeatherType
  ambientColor:   string  // hex — sky/fog tint
  fogNear:        number
  fogFar:         number
  backgroundColor:string
  checkpoints:    Checkpoint[]
  totalLaps:      number
  // Track path — CatmullRomCurve3 control points [x, y, z]
  pathPoints:     [number, number, number][]
  // Start position and direction
  startPosition:  [number, number, number]
  startRotationY: number
  // Decoration zones
  grandstandPositions: [number, number, number][]
  treePositions:       [number, number, number][]
  buildingPositions:   [number, number, number][]
  // Track-specific visual tint
  trackColor:     string
  barrierColor:   string
  accent1:        string  // e.g. sponsor board color
  accent2:        string
}

// ─── Game State ───────────────────────────────────────────────────────────────
export interface GameState {
  phase:       GamePhase
  score:       number
  highScore:   number
  totalTime:   number   // ms — total elapsed since race start
  fps:         number
  quality:     QualityLevel
  racePosition:number   // 1st, 2nd, etc.
  totalRacers: number
  selectedCarId:   CarId
  selectedTrackId: TrackId
  countdownValue:  number   // 3, 2, 1, 0 (GO)
  raceFinished:    boolean
}

// ─── Controls ─────────────────────────────────────────────────────────────────
export interface Controls {
  forward:  boolean
  backward: boolean
  left:     boolean
  right:    boolean
  nitro:    boolean
  drift:    boolean
  brake:    boolean
  pause:    boolean
  camera:   boolean  // toggle camera mode
}

// ─── Auth / User ──────────────────────────────────────────────────────────────
export type AvatarId = 'pilot_1' | 'pilot_2' | 'pilot_3' | 'pilot_4' | 'pilot_5' | 'pilot_6'

export interface UserProfile {
  id:             string
  username:       string
  email:          string
  passwordHash:   string  // bcrypt-style (in localStorage — demo only)
  avatarId:       AvatarId
  level:          number
  xp:             number
  totalRaces:     number
  wins:           number
  favoriteCarId:  CarId
  // Best times per track (ms)
  bestLapTimes:   Record
  // Total score
  totalScore:     number
  createdAt:      number  // timestamp
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  userId:    string
  username:  string
  avatarId:  AvatarId
  carId:     CarId
  lapTime:   number  // ms
  date:      number  // timestamp
}

// ─── Score Events ──────────────────────────────────────────────────────────────
export type ScoreEventType = 'drift' | 'nitro_boost' | 'clean_lap' | 'fast_lap' | 'sector_best' | 'close_call'

export interface ScoreEvent {
  type:      ScoreEventType
  points:    number
  timestamp: number
  message:   string
}

// ─── Full Store Shapes ─────────────────────────────────────────────────────────
export interface GameStore {
  car:          CarState
  game:         GameState
  controls:     Controls
  scoreEvents:  ScoreEvent[]
  // Actions
  updateCar:       (partial: Partial) => void
  updateGame:      (partial: Partial) => void
  setPhase:        (phase: GamePhase) => void
  addScore:        (event: ScoreEvent) => void
  resetGame:       () => void
  completeLap:     () => void
  passCheckpoint:  (id: number) => void
  selectCar:       (id: CarId) => void
  selectTrack:     (id: TrackId) => void
  startCountdown:  () => void
}

export interface AuthStore {
  currentUser:   UserProfile | null
  isAuthenticated: boolean
  authError:     string | null
  isLoading:     boolean
  // Actions
  login:         (email: string, password: string) => Promise
  register:      (username: string, email: string, password: string) => Promise
  logout:        () => void
  updateProfile: (partial: Partial) => void
  guestLogin:    () => void
  clearError:    () => void
}

export interface LeaderboardStore {
  entries: Record
  addEntry:    (trackId: TrackId, entry: LeaderboardEntry) => void
  getTop10:    (trackId: TrackId) => LeaderboardEntry[]
  getUserBest: (trackId: TrackId, userId: string) => LeaderboardEntry | null
}
```

---

## Step 2.2 — Create `src/data/cars.ts`

Define **5 distinct cars** with realistic stat trade-offs:

```ts
import type { CarDefinition } from '../types/game.types'

export const CAR_DEFINITIONS: Record = {

  // ── 1. VIPER — Balanced starter car ───────────────────────────────────────
  viper: {
    id: 'viper',
    name: 'VIPER GT',
    tagline: 'Born to race. Built to win.',
    bodyColor:   '#c0392b',  // Racing red
    accentColor: '#ff6600',
    rimColor:    '#888888',
    emissiveColor: '#ffffff',
    unlockLevel: 0,
    stats: {
      topSpeed:     78, acceleration: 72, handling: 75,
      braking:      74, nitro:        70, weight:   1380,
      maxSpeedKmh:  220, accelerationRate: 65, brakingRate: 110,
      steeringSpeed: 2.5, nitroMultiplier: 1.7, nitroDrain: 22,
    },
  },

  // ── 2. PHANTOM — High-speed, low handling ─────────────────────────────────
  phantom: {
    id: 'phantom',
    name: 'PHANTOM X1',
    tagline: 'Speed is the only truth.',
    bodyColor:   '#1a1a2e',  // Midnight blue/black
    accentColor: '#00d4ff',
    rimColor:    '#c0c0c0',
    emissiveColor: '#00d4ff',
    unlockLevel: 2,
    stats: {
      topSpeed:     95, acceleration: 65, handling: 55,
      braking:      60, nitro:        85, weight:   1250,
      maxSpeedKmh:  280, accelerationRate: 55, brakingRate: 95,
      steeringSpeed: 2.0, nitroMultiplier: 2.1, nitroDrain: 30,
    },
  },

  // ── 3. INFERNO — Drift monster ─────────────────────────────────────────────
  inferno: {
    id: 'inferno',
    name: 'INFERNO R',
    tagline: 'Leave your mark on every corner.',
    bodyColor:   '#ff4500',  // Deep orange
    accentColor: '#ffd700',
    rimColor:    '#ffd700',
    emissiveColor: '#ff6600',
    unlockLevel: 3,
    stats: {
      topSpeed:     72, acceleration: 80, handling: 90,
      braking:      85, nitro:        65, weight:   1150,
      maxSpeedKmh:  200, accelerationRate: 75, brakingRate: 130,
      steeringSpeed: 3.2, nitroMultiplier: 1.5, nitroDrain: 18,
    },
  },

  // ── 4. STORM — All-rounder with high braking ──────────────────────────────
  storm: {
    id: 'storm',
    name: 'STORM V8',
    tagline: 'Control the chaos.',
    bodyColor:   '#2d4a8a',  // Steel blue
    accentColor: '#39ff14',
    rimColor:    '#404040',
    emissiveColor: '#39ff14',
    unlockLevel: 4,
    stats: {
      topSpeed:     82, acceleration: 78, handling: 82,
      braking:      92, nitro:        74, weight:   1480,
      maxSpeedKmh:  235, accelerationRate: 70, brakingRate: 145,
      steeringSpeed: 2.8, nitroMultiplier: 1.8, nitroDrain: 24,
    },
  },

  // ── 5. TITAN — Heavy, max top speed, slow steering ────────────────────────
  titan: {
    id: 'titan',
    name: 'TITAN GT3',
    tagline: 'Brute force, refined.',
    bodyColor:   '#1c1c1c',  // Jet black
    accentColor: '#bf00ff',
    rimColor:    '#bf00ff',
    emissiveColor: '#bf00ff',
    unlockLevel: 5,
    stats: {
      topSpeed:     100, acceleration: 60, handling: 50,
      braking:      70,  nitro:        95, weight:   1650,
      maxSpeedKmh:  320, accelerationRate: 50, brakingRate: 100,
      steeringSpeed: 1.8, nitroMultiplier: 2.5, nitroDrain: 35,
    },
  },
}

export const CAR_ORDER: string[] = ['viper', 'phantom', 'inferno', 'storm', 'titan']
```

---

## Step 2.3 — Create `src/data/tracks.ts`

Define **4 tracks** with unique path geometries and environments:

```ts
import type { TrackDefinition } from '../types/game.types'

export const TRACK_DEFINITIONS: Record = {

  // ── 1. CITY CIRCUIT — Tight, urban, balanced ──────────────────────────────
  city_circuit: {
    id: 'city_circuit',
    name: 'CITY CIRCUIT',
    subtitle: 'Downtown Invitational',
    description: 'Navigate the tight corners and long straights of a converted city center. High barrier density demands precision.',
    difficulty: 2,
    length: 3.2,
    weather: 'clear',
    ambientColor: '#b0c8ff',
    fogNear: 200, fogFar: 400,
    backgroundColor: '#0a0f18',
    totalLaps: 3,
    trackColor:  '#2a2a2a',
    barrierColor: '#cc2222',
    accent1: '#00d4ff',
    accent2: '#ff6600',
    startPosition:  [0, 0.4, -40],
    startRotationY: 0,
    pathPoints: [
      [0, 0, -40], [25, 0, -60], [55, 0, -55], [72, 0, -30],
      [78, 0, 0], [72, 0, 30], [55, 0, 50], [25, 0, 62],
      [0, 0, 58], [-25, 0, 62], [-55, 0, 50], [-72, 0, 30],
      [-78, 0, 0], [-72, 0, -30], [-55, 0, -55], [-25, 0, -60],
    ],
    checkpoints: [
      { id: 0, position: [0,   0, -40], rotation: [0, 0, 0], isStart: true,  sectorName: 'Start' },
      { id: 1, position: [78,  0,  0],  rotation: [0, 90, 0], isStart: false, sectorName: 'S1' },
      { id: 2, position: [0,   0,  58], rotation: [0, 0, 0], isStart: false, sectorName: 'S2' },
      { id: 3, position: [-78, 0,  0],  rotation: [0, 90, 0], isStart: false, sectorName: 'S3' },
    ],
    grandstandPositions: [
      [40, 0, 0], [-40, 0, 0], [0, 0, 70], [0, 0, -70],
    ],
    treePositions: [
      [90, 0, 0], [-90, 0, 0], [0, 0, 80], [0, 0, -80],
      [65, 0, 60], [-65, 0, 60], [65, 0, -60], [-65, 0, -60],
    ],
    buildingPositions: [
      [100, 0, 30], [-100, 0, 30], [100, 0, -30], [-100, 0, -30],
      [50, 0, 90], [-50, 0, 90],
    ],
  },

  // ── 2. MOUNTAIN PASS — Technical, elevation changes ───────────────────────
  mountain_pass: {
    id: 'mountain_pass',
    name: 'MOUNTAIN PASS',
    subtitle: 'Summit Sprint Series',
    description: 'Hairpin turns carved through mountain roads. Every braking point matters. One mistake sends you over the edge.',
    difficulty: 4,
    length: 4.8,
    weather: 'sunset',
    ambientColor: '#ff9944',
    fogNear: 150, fogFar: 300,
    backgroundColor: '#1a0a00',
    totalLaps: 3,
    trackColor:  '#3a2a1a',
    barrierColor: '#886644',
    accent1: '#ff6600',
    accent2: '#ffd700',
    startPosition:  [0, 2.4, -50],
    startRotationY: 0,
    pathPoints: [
      [0,  2, -50], [20,  3, -70], [50,  4, -65], [70,  6, -40],
      [80,  8, -10], [70, 10,  20], [40, 8,  50], [10, 6,  65],
      [-20, 4,  70], [-50, 2,  55], [-70, 0,  25], [-75, 0,  -10],
      [-65, 2, -40], [-40, 4, -60], [-15, 3, -65],
    ],
    checkpoints: [
      { id: 0, position: [0,   2, -50], rotation: [0, 0, 0],  isStart: true,  sectorName: 'Start' },
      { id: 1, position: [80,  8, -10], rotation: [0, 90, 0], isStart: false, sectorName: 'Summit' },
      { id: 2, position: [-20, 4,  70], rotation: [0, 0, 0],  isStart: false, sectorName: 'Descent' },
      { id: 3, position: [-75, 0, -10], rotation: [0, 90, 0], isStart: false, sectorName: 'Valley' },
    ],
    grandstandPositions: [[0, 2, -60], [80, 8, 0]],
    treePositions: [
      [95, 0, 5],  [-95, 0, 5],  [60, 4, 75], [-70, 0, -55],
      [45, 5, 65], [-55, 0, 70], [85, 9, 30], [-80, 0, -50],
      [30, 3, -80], [-25, 2, -80], [75, 7, -55], [-60, 1, 40],
    ],
    buildingPositions: [],
  },

  // ── 3. DESERT SPEEDWAY — High speed oval-ish ──────────────────────────────
  desert_speedway: {
    id: 'desert_speedway',
    name: 'DESERT SPEEDWAY',
    subtitle: 'Badlands 500',
    description: 'A monster oval through the Mojave. Top speeds exceed 300 km/h on the banked corners. Blink and you\'ll miss the apex.',
    difficulty: 3,
    length: 5.6,
    weather: 'clear',
    ambientColor: '#ffcc88',
    fogNear: 250, fogFar: 600,
    backgroundColor: '#1a0d00',
    totalLaps: 3,
    trackColor:  '#c8a060',
    barrierColor: '#886020',
    accent1: '#ffd700',
    accent2: '#ff073a',
    startPosition:  [0, 0.4, -80],
    startRotationY: 0,
    pathPoints: [
      [0,   0, -80], [40,  0, -100], [90,  0, -90], [120, 0, -50],
      [125, 0,   0], [120, 0,  50],  [90,  0,  90], [40,  0, 100],
      [0,   0,  95], [-40, 0, 100],  [-90, 0,  90], [-120, 0,  50],
      [-125, 0,  0], [-120, 0, -50], [-90, 0, -90], [-40, 0, -100],
    ],
    checkpoints: [
      { id: 0, position: [0,    0, -80], rotation: [0, 0, 0],  isStart: true,  sectorName: 'Start' },
      { id: 1, position: [125,  0,   0], rotation: [0, 90, 0], isStart: false, sectorName: 'East Bank' },
      { id: 2, position: [0,    0,  95], rotation: [0, 0, 0],  isStart: false, sectorName: 'North Straight' },
      { id: 3, position: [-125, 0,   0], rotation: [0, 90, 0], isStart: false, sectorName: 'West Bank' },
    ],
    grandstandPositions: [
      [0, 0, 120], [0, 0, -110], [140, 0, 0], [-140, 0, 0],
    ],
    treePositions: [],  // Desert — no trees, use cacti/rocks instead
    buildingPositions: [
      [150, 0, 0], [-150, 0, 0],
    ],
  },

  // ── 4. NEON NIGHTS — Night race, city, rain ───────────────────────────────
  neon_nights: {
    id: 'neon_nights',
    name: 'NEON NIGHTS',
    subtitle: 'Midnight Invitational',
    description: 'The city sleeps while the lights never do. Rain-slicked streets, neon reflections, and total darkness beyond the barriers.',
    difficulty: 5,
    length: 4.1,
    weather: 'rain',
    ambientColor: '#0a0a30',
    fogNear: 80, fogFar: 200,
    backgroundColor: '#000008',
    totalLaps: 3,
    trackColor:  '#111122',
    barrierColor: '#440088',
    accent1: '#bf00ff',
    accent2: '#00d4ff',
    startPosition:  [0, 0.4, -45],
    startRotationY: 0,
    pathPoints: [
      [0,   0, -45], [22, 0, -60], [50, 0, -52], [68, 0, -28],
      [72, 0,   5], [60, 0,  35], [35, 0,  52], [10, 0,  60],
      [-15, 0,  55], [-40, 0,  45], [-60, 0,  20], [-65, 0,  -10],
      [-55, 0, -38], [-30, 0, -58], [-8, 0, -62],
    ],
    checkpoints: [
      { id: 0, position: [0,   0, -45], rotation: [0, 0, 0],  isStart: true,  sectorName: 'Start' },
      { id: 1, position: [72,  0,   5], rotation: [0, 90, 0], isStart: false, sectorName: 'S1' },
      { id: 2, position: [10,  0,  60], rotation: [0, 0, 0],  isStart: false, sectorName: 'S2' },
      { id: 3, position: [-65, 0, -10], rotation: [0, 90, 0], isStart: false, sectorName: 'S3' },
    ],
    grandstandPositions: [
      [40, 0, 0], [-40, 0, 0],
    ],
    treePositions: [],  // Urban — no trees
    buildingPositions: [
      [85, 0, 15], [85, 0, -15], [-80, 0, 15], [-80, 0, -15],
      [55, 0, 70], [-55, 0, 65], [20, 0, 80], [-20, 0, 80],
      [0, 0, -85], [30, 0, -82], [-30, 0, -80],
    ],
  },
}

export const TRACK_ORDER: string[] = ['city_circuit', 'mountain_pass', 'desert_speedway', 'neon_nights']
```

✅ **Sub-Prompt 2 complete.**

---

---

# SUB-PROMPT 3 — State Management: Zustand Stores (Game, Auth, Leaderboard)

## Goal
Implement all three Zustand stores with full persistence logic, XP system, and leaderboard management.

---

## Step 3.1 — Create `src/store/gameStore.ts`

```ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { GameStore, CarState, GameState, Controls, ScoreEvent, CarId, TrackId, GamePhase } from '../types/game.types'
import { CAR_DEFINITIONS } from '../data/cars'

const DEFAULT_CAR_ID: CarId = 'viper'
const DEFAULT_TRACK_ID: TrackId = 'city_circuit'

const defaultCar = (): CarState => ({
  position:           { x: 0, y: 0.5, z: -40 },
  rotation:           { x: 0, y: 0, z: 0 },
  speed:              0,
  nitro:              100,
  health:             100,
  lapTime:            0,
  bestLapTime:        Infinity,
  currentLap:         1,
  totalLaps:          3,
  checkpointsPassed:  [],
  isDrifting:         false,
  isNitroActive:      false,
  wheelSteerAngle:    0,
  tireSmoke:          false,
  lastCheckpointTime: 0,
})

const defaultGame = (): GameState => ({
  phase:           'loading',
  score:           0,
  highScore:       parseInt(localStorage.getItem('apexrush_highscore') || '0'),
  totalTime:       0,
  fps:             60,
  quality:         'high',
  racePosition:    1,
  totalRacers:     4,
  selectedCarId:   DEFAULT_CAR_ID,
  selectedTrackId: DEFAULT_TRACK_ID,
  countdownValue:  3,
  raceFinished:    false,
})

const defaultControls = (): Controls => ({
  forward: false, backward: false,
  left: false,    right: false,
  nitro: false,   drift: false,
  brake: false,   pause: false,
  camera: false,
})

export const useGameStore = create()(
  subscribeWithSelector((set, get) => ({
    car:         defaultCar(),
    game:        defaultGame(),
    controls:    defaultControls(),
    scoreEvents: [],

    updateCar: (partial) =>
      set((s) => ({ car: { ...s.car, ...partial } })),

    updateGame: (partial) =>
      set((s) => ({ game: { ...s.game, ...partial } })),

    setPhase: (phase: GamePhase) =>
      set((s) => ({ game: { ...s.game, phase } })),

    addScore: (event: ScoreEvent) => {
      set((s) => {
        const newScore    = s.game.score + event.points
        const newHighScore = Math.max(newScore, s.game.highScore)
        if (newHighScore > s.game.highScore) {
          localStorage.setItem('apexrush_highscore', String(newHighScore))
        }
        return {
          game:        { ...s.game, score: newScore, highScore: newHighScore },
          scoreEvents: [...s.scoreEvents.slice(-7), event],
        }
      })
    },

    completeLap: () => {
      const { car, game } = get()
      const isNewBest = car.lapTime < car.bestLapTime
      const newBest   = isNewBest ? car.lapTime : car.bestLapTime

      get().addScore({
        type:      isNewBest ? 'fast_lap' : 'clean_lap',
        points:    isNewBest ? 750 : 150,
        timestamp: Date.now(),
        message:   isNewBest ? '🏆 BEST LAP! +750' : '✅ LAP COMPLETE +150',
      })

      if (car.currentLap >= car.totalLaps) {
        set((s) => ({
          car:  { ...s.car, bestLapTime: newBest },
          game: { ...s.game, phase: 'finished', raceFinished: true },
        }))
      } else {
        set((s) => ({
          car: {
            ...s.car,
            currentLap:         s.car.currentLap + 1,
            lapTime:            0,
            bestLapTime:        newBest,
            checkpointsPassed:  [],
            lastCheckpointTime: 0,
          },
        }))
      }
    },

    passCheckpoint: (id: number) => {
      const { car, game } = get()
      if (car.checkpointsPassed.includes(id)) return
      set((s) => ({
        car: {
          ...s.car,
          checkpointsPassed:  [...s.car.checkpointsPassed, id],
          lastCheckpointTime: s.car.lapTime,
        },
      }))
    },

    selectCar: (id: CarId) => {
      const carDef = CAR_DEFINITIONS[id]
      set((s) => ({
        game: { ...s.game, selectedCarId: id },
        car:  { ...defaultCar(), totalLaps: s.car.totalLaps, nitro: carDef.stats.nitro },
      }))
    },

    selectTrack: (id: TrackId) =>
      set((s) => ({ game: { ...s.game, selectedTrackId: id } })),

    startCountdown: () => {
      set((s) => ({
        game: { ...s.game, phase: 'countdown', countdownValue: 3 },
        car:  defaultCar(),
        scoreEvents: [],
      }))
      // 3 → 2 → 1 → GO → racing
      let count = 3
      const interval = setInterval(() => {
        count--
        if (count > 0) {
          set((s) => ({ game: { ...s.game, countdownValue: count } }))
        } else {
          clearInterval(interval)
          set((s) => ({ game: { ...s.game, phase: 'racing', countdownValue: 0 } }))
        }
      }, 1000)
    },

    resetGame: () => {
      const highScore = get().game.highScore
      const selectedCarId   = get().game.selectedCarId
      const selectedTrackId = get().game.selectedTrackId
      set({
        car:         defaultCar(),
        game:        { ...defaultGame(), highScore, selectedCarId, selectedTrackId, phase: 'menu' },
        controls:    defaultControls(),
        scoreEvents: [],
      })
    },
  }))
)
```

---

## Step 3.2 — Create `src/store/authStore.ts`

Implements a full localStorage-based auth system (no backend required):

```ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { AuthStore, UserProfile, AvatarId } from '../types/game.types'

// ── Simple hash (NOT secure — demo only) ─────────────────────────────────────
function simpleHash(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i)
    hash = hash & hash  // Convert to 32bit integer
  }
  return String(Math.abs(hash))
}

// ── Persistence helpers ───────────────────────────────────────────────────────
const USERS_KEY    = 'apexrush_users'
const SESSION_KEY  = 'apexrush_session'

function loadUsers(): Record {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
  } catch { return {} }
}

function saveUsers(users: Record): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession(): UserProfile | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveSession(user: UserProfile | null): void {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  else localStorage.removeItem(SESSION_KEY)
}

function createDefaultProfile(
  id: string, username: string, email: string, passwordHash: string
): UserProfile {
  return {
    id, username, email, passwordHash,
    avatarId:      'pilot_1' as AvatarId,
    level:         1,
    xp:            0,
    totalRaces:    0,
    wins:          0,
    favoriteCarId: 'viper',
    bestLapTimes:  {
      city_circuit:     Infinity,
      mountain_pass:    Infinity,
      desert_speedway:  Infinity,
      neon_nights:      Infinity,
    },
    totalScore:    0,
    createdAt:     Date.now(),
  }
}

// ── XP Table ──────────────────────────────────────────────────────────────────
export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.35, level - 1))
}

export function totalXpForLevel(level: number): number {
  let total = 0
  for (let i = 1; i < level; i++) total += xpForLevel(i)
  return total
}

export function levelFromXp(xp: number): number {
  let level = 1
  let accumulated = 0
  while (accumulated + xpForLevel(level) <= xp) {
    accumulated += xpForLevel(level)
    level++
  }
  return level
}

// ── Store ─────────────────────────────────────────────────────────────────────
export const useAuthStore = create()(
  subscribeWithSelector((set, get) => ({
    currentUser:     loadSession(),
    isAuthenticated: loadSession() !== null,
    authError:       null,
    isLoading:       false,

    login: async (email, password) => {
      set({ isLoading: true, authError: null })
      await new Promise((r) => setTimeout(r, 400)) // simulate network
      const users = loadUsers()
      const user = Object.values(users).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      )
      if (!user || user.passwordHash !== simpleHash(password)) {
        set({ isLoading: false, authError: 'Invalid email or password.' })
        return false
      }
      saveSession(user)
      set({ currentUser: user, isAuthenticated: true, isLoading: false })
      return true
    },

    register: async (username, email, password) => {
      set({ isLoading: true, authError: null })
      await new Promise((r) => setTimeout(r, 500))
      const users = loadUsers()
      const emailTaken    = Object.values(users).some(u => u.email.toLowerCase() === email.toLowerCase())
      const usernameTaken = Object.values(users).some(u => u.username.toLowerCase() === username.toLowerCase())
      if (emailTaken)    { set({ isLoading: false, authError: 'Email already registered.' }); return false }
      if (usernameTaken) { set({ isLoading: false, authError: 'Username already taken.' });   return false }
      if (password.length < 6) { set({ isLoading: false, authError: 'Password must be at least 6 characters.' }); return false }

      const id      = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
      const newUser = createDefaultProfile(id, username, email, simpleHash(password))
      users[id]     = newUser
      saveUsers(users)
      saveSession(newUser)
      set({ currentUser: newUser, isAuthenticated: true, isLoading: false })
      return true
    },

    logout: () => {
      saveSession(null)
      set({ currentUser: null, isAuthenticated: false })
    },

    updateProfile: (partial) => {
      const user = get().currentUser
      if (!user) return
      const users = loadUsers()
      const updated = { ...user, ...partial }
      users[user.id] = updated
      saveUsers(users)
      saveSession(updated)
      set({ currentUser: updated })
    },

    guestLogin: () => {
      const guest = createDefaultProfile(
        'guest_' + Date.now().toString(36),
        'Racer_' + Math.random().toString(36).slice(2, 6).toUpperCase(),
        '',
        ''
      )
      set({ currentUser: guest, isAuthenticated: true })
      // NOTE: guest data is not persisted to localStorage
    },

    clearError: () => set({ authError: null }),
  }))
)
```

---

## Step 3.3 — Create `src/store/leaderboardStore.ts`

```ts
import { create } from 'zustand'
import type { LeaderboardStore, LeaderboardEntry, TrackId } from '../types/game.types'

const LB_KEY = 'apexrush_leaderboard'

function load(): Record {
  try {
    return JSON.parse(localStorage.getItem(LB_KEY) || '{}')
  } catch {
    return {} as Record
  }
}

function save(data: Record): void {
  localStorage.setItem(LB_KEY, JSON.stringify(data))
}

const defaultEntries = (): Record => ({
  city_circuit:    [],
  mountain_pass:   [],
  desert_speedway: [],
  neon_nights:     [],
})

export const useLeaderboardStore = create()((set, get) => ({
  entries: { ...defaultEntries(), ...load() },

  addEntry: (trackId, entry) => {
    set((s) => {
      const current   = s.entries[trackId] || []
      // Remove old entry for this user on this track, keep best
      const without   = current.filter((e) => e.userId !== entry.userId)
      const withNew   = [...without, entry]
        .sort((a, b) => a.lapTime - b.lapTime)
        .slice(0, 20)  // keep top 20
      const updated   = { ...s.entries, [trackId]: withNew }
      save(updated)
      return { entries: updated }
    })
  },

  getTop10: (trackId) => {
    return (get().entries[trackId] || [])
      .sort((a, b) => a.lapTime - b.lapTime)
      .slice(0, 10)
  },

  getUserBest: (trackId, userId) => {
    return (get().entries[trackId] || [])
      .filter((e) => e.userId === userId)
      .sort((a, b) => a.lapTime - b.lapTime)[0] || null
  },
}))
```

✅ **Sub-Prompt 3 complete.**

---

---

# SUB-PROMPT 4 — Hooks: Input, Game Loop, Mobile, Sound, Auth

## Goal
Build all custom React hooks for keyboard input, frame-based game loop, mobile touch controls, Web Audio sound engine, and auth utilities.

---

## Step 4.1 — Create `src/hooks/useKeyboard.ts`

```ts
import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import type { Controls } from '../types/game.types'

const KEY_MAP: Record = {
  ArrowUp:     'forward',
  KeyW:        'forward',
  ArrowDown:   'backward',
  KeyS:        'backward',
  ArrowLeft:   'left',
  KeyA:        'left',
  ArrowRight:  'right',
  KeyD:        'right',
  Space:       'nitro',
  ShiftLeft:   'drift',
  ShiftRight:  'drift',
  KeyX:        'brake',
  KeyB:        'brake',
  Escape:      'pause',
  KeyP:        'pause',
  KeyC:        'camera',
}

const PREVENT_DEFAULT_KEYS = new Set([
  'ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'
])

export function useKeyboard() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (PREVENT_DEFAULT_KEYS.has(e.code)) e.preventDefault()

      const control = KEY_MAP[e.code]
      if (!control) return

      // Handle toggle keys
      if (control === 'pause') {
        const { game, setPhase } = useGameStore.getState()
        if (game.phase === 'racing') setPhase('paused')
        else if (game.phase === 'paused') setPhase('racing')
        return
      }
      if (control === 'camera') {
        // Handled separately
        return
      }

      useGameStore.setState((s) => ({
        controls: { ...s.controls, [control]: true }
      }))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const control = KEY_MAP[e.code]
      if (!control || control === 'pause' || control === 'camera') return
      useGameStore.setState((s) => ({
        controls: { ...s.controls, [control]: false }
      }))
    }

    // Prevent arrow key scroll
    const preventArrow = (e: KeyboardEvent) => {
      if (PREVENT_DEFAULT_KEYS.has(e.code)) e.preventDefault()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('keydown', preventArrow, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keydown', preventArrow)
    }
  }, [])
}
```

---

## Step 4.2 — Create `src/hooks/useGameLoop.ts`

```ts
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'
import { useAuthStore } from '../store/authStore'
import { useLeaderboardStore } from '../store/leaderboardStore'

export function useGameLoop() {
  const fpsBuffer      = useRef([])
  const lastFpsUpdate  = useRef(0)
  const raceStartTime  = useRef(null)

  useFrame((_, delta) => {
    const { game, car, updateCar, updateGame } = useGameStore.getState()
    const clampedDelta = Math.min(delta, 0.05)  // cap at 50ms to prevent spiral

    if (game.phase === 'racing') {
      // Track total race time
      if (raceStartTime.current === null) raceStartTime.current = Date.now()

      updateCar({
        lapTime:   car.lapTime + clampedDelta * 1000,
      })
      updateGame({
        totalTime: game.totalTime + clampedDelta * 1000,
      })
    } else if (game.phase !== 'finished') {
      raceStartTime.current = null
    }

    // FPS tracking (update every 500ms)
    const now = performance.now()
    fpsBuffer.current.push(1 / clampedDelta)

    if (now - lastFpsUpdate.current > 500) {
      const avg = fpsBuffer.current.reduce((a, b) => a + b, 0) / fpsBuffer.current.length
      fpsBuffer.current = []
      lastFpsUpdate.current = now
      updateGame({ fps: Math.round(avg) })

      // Adaptive quality
      if (avg < 35 && game.quality !== 'low') {
        updateGame({ quality: avg < 25 ? 'low' : 'medium' })
      } else if (avg > 58 && game.quality !== 'high') {
        updateGame({ quality: 'high' })
      }
    }

    // Race finish: auto-save stats
    if (game.phase === 'finished' && game.raceFinished) {
      const user = useAuthStore.getState().currentUser
      if (user && isFinite(car.bestLapTime)) {
        const lb = useLeaderboardStore.getState()
        lb.addEntry(game.selectedTrackId, {
          userId:   user.id,
          username: user.username,
          avatarId: user.avatarId,
          carId:    game.selectedCarId,
          lapTime:  car.bestLapTime,
          date:     Date.now(),
        })
        // Award XP
        const xpGain = Math.floor(500 + (3 - game.racePosition) * 200)
        useAuthStore.getState().updateProfile({
          totalRaces: user.totalRaces + 1,
          xp:         user.xp + xpGain,
          totalScore: user.totalScore + game.score,
          wins:       game.racePosition === 1 ? user.wins + 1 : user.wins,
        })
      }
      // Only run once
      useGameStore.setState((s) => ({ game: { ...s.game, raceFinished: false } }))
    }
  })
}
```

---

## Step 4.3 — Create `src/hooks/useMobileControls.ts`

```ts
import { useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import type { Controls } from '../types/game.types'

export function useMobileControls() {
  const press = useCallback(
    (key: keyof Controls) => (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()
      // Haptic feedback
      if ('vibrate' in navigator) navigator.vibrate(20)
      useGameStore.setState((s) => ({ controls: { ...s.controls, [key]: true } }))
    }, []
  )

  const release = useCallback(
    (key: keyof Controls) => (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()
      useGameStore.setState((s) => ({ controls: { ...s.controls, [key]: false } }))
    }, []
  )

  return { press, release }
}
```

---

## Step 4.4 — Create `src/hooks/useSound.ts`

Web Audio API engine — no external audio files required:

```ts
import { useRef, useEffect, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'

interface SoundState {
  ctx:         AudioContext | null
  engineNode:  OscillatorNode | null
  gainNode:    GainNode | null
  initialized: boolean
}

export function useSound() {
  const state = useRef({
    ctx: null, engineNode: null, gainNode: null, initialized: false,
  })

  const init = useCallback(() => {
    if (state.current.initialized) return
    try {
      const ctx      = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const osc      = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const filter   = ctx.createBiquadFilter()

      osc.type      = 'sawtooth'
      osc.frequency.value = 80
      filter.type   = 'lowpass'
      filter.frequency.value = 400
      gainNode.gain.value    = 0

      osc.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)
      osc.start()

      state.current = { ctx, engineNode: osc, gainNode, initialized: true }
    } catch (e) {
      console.warn('Web Audio not supported', e)
    }
  }, [])

  // Update engine sound based on speed
  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      (s) => ({ speed: s.car.speed, phase: s.game.phase }),
      ({ speed, phase }) => {
        const { ctx, engineNode, gainNode } = state.current
        if (!ctx || !engineNode || !gainNode) return
        if (phase !== 'racing') {
          gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.3)
          return
        }
        const absSpeed = Math.abs(speed)
        const pitch    = 80 + absSpeed * 3.5
        const volume   = Math.min(absSpeed / 200, 1) * 0.08
        engineNode.frequency.setTargetAtTime(pitch,  ctx.currentTime, 0.05)
        gainNode.gain.setTargetAtTime(volume, ctx.currentTime, 0.05)
      },
      { equalityFn: (a, b) => Math.abs(a.speed - b.speed) < 2 && a.phase === b.phase }
    )
    return unsubscribe
  }, [])

  const playNitroSound = useCallback(() => {
    const { ctx } = state.current
    if (!ctx) return
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type    = 'square'
    osc.frequency.value = 220
    gain.gain.value     = 0.05
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.stop(ctx.currentTime + 0.3)
  }, [])

  const playCheckpointSound = useCallback(() => {
    const { ctx } = state.current
    if (!ctx) return
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type    = 'sine'
    osc.frequency.value = 880
    gain.gain.value     = 0.1
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.frequency.setTargetAtTime(1200, ctx.currentTime, 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    osc.stop(ctx.currentTime + 0.4)
  }, [])

  return { init, playNitroSound, playCheckpointSound }
}
```

---

## Step 4.5 — Create `src/hooks/useAuth.ts`

```ts
import { useAuthStore } from '../store/authStore'

// Re-export with convenience selectors
export function useAuth() {
  const currentUser     = useAuthStore((s) => s.currentUser)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading       = useAuthStore((s) => s.isLoading)
  const authError       = useAuthStore((s) => s.authError)
  const login           = useAuthStore((s) => s.login)
  const register        = useAuthStore((s) => s.register)
  const logout          = useAuthStore((s) => s.logout)
  const guestLogin      = useAuthStore((s) => s.guestLogin)
  const clearError      = useAuthStore((s) => s.clearError)

  return {
    user: currentUser,
    isAuthenticated, isLoading, authError,
    login, register, logout, guestLogin, clearError,
  }
}
```

✅ **Sub-Prompt 4 complete.**

---

---

# SUB-PROMPT 5 — Utility Functions: Physics, Helpers, Textures, Track Geometry

## Goal
Build all utility modules — physics computations, time helpers, procedural texture generators, and track geometry builder.

---

## Step 5.1 — Create `src/utils/physics.ts`

```ts
// Physics constants and utility functions
export const PHYSICS = {
  FRICTION:          28,
  MIN_DRIFT_SPEED:   55,
  DRIFT_FRICTION:    0.97,
  DRIFT_SCORE_PER_S: 12,
  COLLISION_DAMAGE:  8,
  BARRIER_BOUNCE:    0.35,
  MAX_REVERSE_SPEED: 60,
}

export function computeSpeedDelta(
  currentSpeed:   number,
  isForward:      boolean,
  isBackward:     boolean,
  isBrake:        boolean,
  isNitro:        boolean,
  nitroAvailable: boolean,
  delta:          number,
  maxSpeed:       number,
  accelRate:      number,
  brakeRate:      number,
  nitroMult:      number
): number {
  const nitroBoost = (isNitro && nitroAvailable) ? nitroMult : 1.0
  let acceleration = 0

  if (isForward) {
    // Reduce acceleration as we approach max speed (torque curve)
    const speedRatio    = Math.abs(currentSpeed) / maxSpeed
    const torqueFactor  = 1 - Math.pow(speedRatio, 1.5) * 0.7
    acceleration        = accelRate * nitroBoost * torqueFactor
  } else if (isBackward) {
    if (currentSpeed > 1) {
      acceleration = -brakeRate
    } else {
      const revRatio = Math.abs(currentSpeed) / PHYSICS.MAX_REVERSE_SPEED
      acceleration   = -accelRate * 0.5 * (1 - revRatio * 0.5)
    }
  } else if (isBrake) {
    const dir    = currentSpeed > 0 ? -1 : 1
    acceleration = dir * brakeRate * 1.4
    if (Math.abs(currentSpeed) < brakeRate * 1.4 * delta) return -currentSpeed / delta
  } else {
    const dir = currentSpeed > 0 ? -1 : 1
    acceleration = dir * PHYSICS.FRICTION
    if (Math.abs(currentSpeed) < PHYSICS.FRICTION * delta * 1.5) return 0
  }

  return acceleration * delta
}

export function computeSteeringDelta(
  currentSpeed:  number,
  isLeft:        boolean,
  isRight:       boolean,
  isDrifting:    boolean,
  delta:         number,
  steeringSpeed: number
): number {
  if (!isLeft && !isRight) return 0
  if (Math.abs(currentSpeed) < 3) return 0

  const direction    = isLeft ? 1 : -1
  // Speed-sensitive: less steering authority at very high speeds
  const speedFactor  = Math.min(Math.abs(currentSpeed) / 60, 1) *
                       (1 - Math.max(0, (Math.abs(currentSpeed) - 120) / 200) * 0.4)
  const driftFactor  = isDrifting ? 1.45 : 1.0
  const reverseFactor = currentSpeed < 0 ? -1 : 1
  return direction * steeringSpeed * speedFactor * driftFactor * reverseFactor * delta
}

export function shouldDrift(speed: number, driftKey: boolean, turning: boolean): boolean {
  return driftKey && Math.abs(speed) > PHYSICS.MIN_DRIFT_SPEED && turning
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a
  while (diff > Math.PI)  diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return a + diff * t
}
```

---

## Step 5.2 — Create `src/utils/helpers.ts`

```ts
export function formatTime(ms: number): string {
  if (!isFinite(ms) || ms < 0) return '--:--.---'
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const millis  = Math.floor(ms % 1000)
  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}.${String(millis).padStart(3,'0')}`
}

export function formatTimeDiff(diff: number): string {
  const sign = diff < 0 ? '-' : '+'
  return `${sign}${formatTime(Math.abs(diff))}`
}

export function heatColor(ratio: number): string {
  const r = Math.round(255 * Math.min(ratio * 2, 1))
  const g = Math.round(255 * Math.min(2 - ratio * 2, 1))
  return `rgb(${r},${g},0)`
}

export function ordinalSuffix(n: number): string {
  const s = ['th','st','nd','rd']
  const v = n % 100
  return n + (s[(v-20)%10] || s[v] || s[0])
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

// Throttle a function to fire at most once per `ms`
export function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let last = 0
  return ((...args: Parameters) => {
    const now = Date.now()
    if (now - last >= ms) { last = now; fn(...args) }
  }) as T
}
```

---

## Step 5.3 — Create `src/utils/textures.ts`

```ts
import * as THREE from 'three'

export function generateAsphaltTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#1c1c1c'; ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 18000; i++) {
    const x = Math.random() * size, y = Math.random() * size
    const g = Math.floor(Math.random() * 55 + 18)
    ctx.fillStyle = `rgb(${g},${g},${g})`
    ctx.beginPath(); ctx.arc(x, y, Math.random() * 1.8, 0, Math.PI * 2); ctx.fill()
  }
  // Lane center dashes
  ctx.strokeStyle = 'rgba(255,220,0,0.6)'; ctx.lineWidth = 3; ctx.setLineDash([36, 28])
  ctx.beginPath(); ctx.moveTo(size/2, 0); ctx.lineTo(size/2, size); ctx.stroke()
  // Edge white lines
  ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 4; ctx.setLineDash([])
  ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(8, size); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(size-8, 0); ctx.lineTo(size-8, size); ctx.stroke()
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10); return t
}

export function generateGrassTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#173012'; ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * size, y = Math.random() * size
    const g = Math.floor(Math.random() * 40 + 15)
    ctx.fillStyle = `rgb(${g},${g*2+8},${g})`
    ctx.fillRect(x, y, 2, Math.random() * 6 + 2)
  }
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(22, 22); return t
}

export function generateDesertTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#c49a35'; ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 12000; i++) {
    const x = Math.random() * size, y = Math.random() * size
    const v = Math.floor(Math.random() * 50 + 160)
    ctx.fillStyle = `rgb(${v},${Math.floor(v*0.75)},${Math.floor(v*0.3)})`
    ctx.beginPath(); ctx.arc(x, y, Math.random() * 2, 0, Math.PI*2); ctx.fill()
  }
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(18, 18); return t
}

export function generateNightAsphaltTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 14000; i++) {
    const x = Math.random() * size, y = Math.random() * size
    const g = Math.floor(Math.random() * 30 + 8)
    ctx.fillStyle = `rgb(${g},${g},${g})`
    ctx.beginPath(); ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI*2); ctx.fill()
  }
  // Neon reflection puddles
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * size, y = Math.random() * size
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 20)
    grad.addColorStop(0, 'rgba(0,212,255,0.08)')
    grad.addColorStop(1, 'rgba(0,212,255,0)')
    ctx.fillStyle = grad; ctx.fillRect(x-20, y-20, 40, 40)
  }
  ctx.strokeStyle = 'rgba(191,0,255,0.5)'; ctx.lineWidth = 3; ctx.setLineDash([30, 25])
  ctx.beginPath(); ctx.moveTo(size/2, 0); ctx.lineTo(size/2, size); ctx.stroke()
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10); return t
}

export function generateNormalMap(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    img.data[i]   = 128 + (Math.random() * 8 - 4)
    img.data[i+1] = 128 + (Math.random() * 8 - 4)
    img.data[i+2] = 255
    img.data[i+3] = 255
  }
  ctx.putImageData(img, 0, 0)
  const t = new THREE.CanvasTexture(canvas)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8); return t
}
```

---

## Step 5.4 — Create `src/utils/trackGeometry.ts`

```ts
import * as THREE from 'three'
import type { TrackDefinition } from '../types/game.types'

export const TRACK_WIDTH    = 11  // meters
export const BARRIER_HEIGHT = 1.8
export const TRACK_SEGMENTS = 350

/**
 * Build the CatmullRomCurve3 for a track.
 */
export function buildTrackCurve(track: TrackDefinition): THREE.CatmullRomCurve3 {
  const points = track.pathPoints.map(([x, y, z]) => new THREE.Vector3(x, y, z))
  return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5)
}

/**
 * Build road surface ExtrudeGeometry.
 */
export function buildRoadGeometry(
  curve: THREE.CatmullRomCurve3,
  segments = TRACK_SEGMENTS
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-TRACK_WIDTH / 2, 0)
  shape.lineTo( TRACK_WIDTH / 2, 0)
  shape.lineTo( TRACK_WIDTH / 2, 0.18)
  shape.lineTo(-TRACK_WIDTH / 2, 0.18)
  shape.closePath()
  return new THREE.ExtrudeGeometry(shape, {
    steps: segments, extrudePath: curve, bevelEnabled: false,
  })
}

/**
 * Build barrier geometries for both sides.
 */
export function buildBarrierGeometries(
  curve: THREE.CatmullRomCurve3,
  segments = TRACK_SEGMENTS
): { left: THREE.ExtrudeGeometry; right: THREE.ExtrudeGeometry } {
  const pts = curve.getPoints(segments)

  const makeBarrierCurve = (offset: number) =>
    new THREE.CatmullRomCurve3(
      pts.map((p, i) => {
        const t       = i / segments
        const tangent = curve.getTangentAt(t)
        const normal  = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
        return p.clone().add(normal.multiplyScalar(offset))
      }),
      true
    )

  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.5, 0)
  shape.lineTo(0.5, BARRIER_HEIGHT)
  shape.lineTo(0, BARRIER_HEIGHT)
  shape.closePath()

  return {
    left: new THREE.ExtrudeGeometry(shape, {
      steps: segments, extrudePath: makeBarrierCurve(-TRACK_WIDTH / 2 - 0.6), bevelEnabled: false,
    }),
    right: new THREE.ExtrudeGeometry(shape, {
      steps: segments, extrudePath: makeBarrierCurve(TRACK_WIDTH / 2 + 0.1), bevelEnabled: false,
    }),
  }
}

/**
 * Build kerb (rumble strip) geometries — alternating red/white stripes.
 */
export function buildKerbGeometry(
  curve: THREE.CatmullRomCurve3,
  side: 'left' | 'right',
  segments = TRACK_SEGMENTS
): THREE.ExtrudeGeometry {
  const pts  = curve.getPoints(segments)
  const offsetAmt = side === 'left'
    ? -(TRACK_WIDTH / 2)
    : (TRACK_WIDTH / 2 - 1.2)

  const kerbCurve = new THREE.CatmullRomCurve3(
    pts.map((p, i) => {
      const t       = i / segments
      const tangent = curve.getTangentAt(t)
      const normal  = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
      return p.clone().add(normal.multiplyScalar(offsetAmt))
    }), true
  )

  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(1.2, 0)
  shape.lineTo(1.2, 0.08)
  shape.lineTo(0, 0.08)
  shape.closePath()

  return new THREE.ExtrudeGeometry(shape, {
    steps: segments, extrudePath: kerbCurve, bevelEnabled: false,
  })
}
```

✅ **Sub-Prompt 5 complete.**

---

---

# SUB-PROMPT 6 — 3D Environment, Track Rendering & Decorations

## Goal
Build the full 3D game world — sky/atmosphere per track theme, ground, road surface with kerbs, barriers, start/finish gate, grandstands, trees, city buildings, and desert cacti.

---

## Step 6.1 — Create `src/components/game/Environment.tsx`

```tsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky, Stars, Cloud, Sparkles, Environment as DreiEnvironment } from '@react-three/drei'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import { generateGrassTexture, generateDesertTexture } from '../../utils/textures'

/** Rain particle system for Neon Nights track */
function RainSystem() {
  const count   = 2000
  const meshRef = useRef(null)
  const matrix  = useRef(new THREE.Matrix4())
  const positions = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 200,
      y: Math.random() * 60 + 5,
      z: (Math.random() - 0.5) * 200,
      v: Math.random() * 0.3 + 0.2,
    }))
  )

  useFrame(() => {
    if (!meshRef.current) return
    positions.current.forEach((p, i) => {
      p.y -= p.v * 2
      if (p.y < -5) {
        p.y = 60
        p.x = (Math.random() - 0.5) * 200
        p.z = (Math.random() - 0.5) * 200
      }
      matrix.current.setPosition(p.x, p.y, p.z)
      meshRef.current!.setMatrixAt(i, matrix.current)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    
      
      
    
  )
}

/** Grandstand structure */
function Grandstand({ position }: { position: [number, number, number] }) {
  return (
    
      {/* Seating area */}
      
        
        
      
      {/* Roof */}
      
        
        
      
      {/* Support pillars */}
      {[-6, -2, 2, 6].map((x, i) => (
        
          
          
        
      ))}
      {/* Crowd simulation (colored blocks) */}
      {Array.from({ length: 40 }, (_, i) => (
        <mesh key={i} position={[
          (i % 8 - 3.5) * 1.8,
          2 + Math.floor(i / 8) * 1.2,
          -0.5,
        ]}>
          
          <meshStandardMaterial
            color={['#ff073a','#00d4ff','#39ff14','#ffd700','#bf00ff'][i % 5]}
            roughness={0.9}
          />
        
      ))}
      {/* LED board */}
      
        
        
      
    
  )
}

/** City building */
function Building({ position, height, width, color }: {
  position: [number, number, number]; height: number; width: number; color: string
}) {
  return (
    
      <mesh castShadow receiveShadow position={[0, height/2, 0]}>
        
        
      
      {/* Windows */}
      {Array.from({ length: Math.floor(height / 3) }, (_, row) =>
        Array.from({ length: Math.floor(width / 2.5) }, (_, col) => (
          <mesh key={`${row}-${col}`}
            position={[
              -width/2 + 1.2 + col * 2.4,
              1.5 + row * 2.8,
              width * 0.4 + 0.05,
            ]}
          >
            
             0.3 ? '#fffaaa' : '#112233'}
              emissive={Math.random() > 0.3 ? '#fffaaa' : '#000000'}
              emissiveIntensity={Math.random() > 0.3 ? 0.4 : 0}
            />
          
        ))
      )}
    
  )
}

/** Tree (conifer) */
function Tree({ position }: { position: [number, number, number] }) {
  const h = 4.5 + Math.random() * 3
  const r = 0.25 + Math.random() * 0.12
  const cr = 1.3 + Math.random() * 0.7
  return (
    
      <mesh castShadow position={[0, h/2, 0]}>
        
        
      
      
        
        
      
      
        
        
      
    
  )
}

/** Cactus for desert */
function Cactus({ position }: { position: [number, number, number] }) {
  const h = 3 + Math.random() * 2
  return (
    
      <mesh castShadow position={[0, h/2, 0]}>
        
        
      
      {Math.random() > 0.5 && (
        
          
            
            
          
        
      )}
    
  )
}

export default function Environment() {
  const trackId    = useGameStore((s) => s.game.selectedTrackId)
  const track      = TRACK_DEFINITIONS[trackId]
  const grassTex   = useMemo(() => generateGrassTexture(), [])
  const desertTex  = useMemo(() => generateDesertTexture(), [])
  const isDesert   = trackId === 'desert_speedway'
  const isNight    = trackId === 'neon_nights'
  const isMountain = trackId === 'mountain_pass'
  const groundTex  = isDesert ? desertTex : grassTex

  return (
    <>
      {/* ── Sky ────────────────────────────────────────────────────────── */}
      {!isNight ? (
        
      ) : (
        <color attach="background" args={['#000008']} />
      )}

      {/* ── Stars ──────────────────────────────────────────────────────── */}
      {(isNight || isMountain) && (
        
      )}

      {/* ── Fog ────────────────────────────────────────────────────────── */}
      

      {/* ── Lighting ───────────────────────────────────────────────────── */}
      

      {/* Sun */}
      {!isNight && (
        
      )}

      {/* Fill lights */}
      

      {/* Night track lighting */}
      {isNight && (
        <>
          
          
          
          
          
        </>
      )}

      {/* ── Ground ─────────────────────────────────────────────────────── */}
      
        
        
      

      {/* ── Weather ────────────────────────────────────────────────────── */}
      {!isNight && !isDesert && (
        <>
          
          
        </>
      )}
      {isNight && }

      {/* ── Decorations ────────────────────────────────────────────────── */}
      {track.grandstandPositions.map((pos, i) => (
        
      ))}

      {track.treePositions.map((pos, i) =>
        isDesert
          ? 
          : 
      )}

      {isNight && track.buildingPositions.map((pos, i) => (
        <Building key={i}
          position={pos as [number,number,number]}
          height={12 + Math.random() * 20}
          width={8 + Math.random() * 8}
          color={['#1a1a2e','#0d0d20','#12121e','#0a0a18'][i % 4]}
        />
      ))}

      {/* ── Particles ──────────────────────────────────────────────────── */}
      
    </>
  )
}
```

---

## Step 6.2 — Create `src/components/game/Track.tsx`

```tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import {
  buildTrackCurve,
  buildRoadGeometry,
  buildBarrierGeometries,
  buildKerbGeometry,
  TRACK_WIDTH,
  BARRIER_HEIGHT,
} from '../../utils/trackGeometry'
import {
  generateAsphaltTexture,
  generateNightAsphaltTexture,
  generateNormalMap,
} from '../../utils/textures'

/** Animated start/finish gate */
function StartGate({
  position, rotation, accentColor,
}: {
  position: THREE.Vector3; rotation: THREE.Euler; accentColor: string
}) {
  const beamRef = useRef(null)
  useFrame(({ clock }) => {
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.0 + Math.sin(clock.getElapsedTime() * 4) * 0.5
    }
  })
  return (
    
      {/* Left post */}
      
        
        
      
      {/* Right post */}
      
        
        
      
      {/* Top beam */}
      
        
        
      
      {/* START/FINISH text board */}
      
        
        
      
      {/* Gate light */}
      
    
  )
}

/** Advertising board along barrier */
function AdBoard({
  position, rotation, color, text,
}: {
  position: THREE.Vector3; rotation: THREE.Euler; color: string; text?: string
}) {
  return (
    
      
        
        
      
    
  )
}

/** Barrier stripe pattern (animated) */
function BarrierStripes({
  geometry, baseColor, stripeColor,
}: {
  geometry: THREE.ExtrudeGeometry; baseColor: string; stripeColor: string
}) {
  // Alternate red/white stripes via vertex colors would be complex;
  // use emissive color with simple tiling material instead
  return (
    <>
      
        
      
    </>
  )
}

export default function Track() {
  const trackId = useGameStore((s) => s.game.selectedTrackId)
  const track   = TRACK_DEFINITIONS[trackId]
  const isNight = trackId === 'neon_nights'

  // Build geometries
  const curve    = useMemo(() => buildTrackCurve(track), [trackId])
  const roadGeo  = useMemo(() => buildRoadGeometry(curve), [curve])
  const barriers = useMemo(() => buildBarrierGeometries(curve), [curve])
  const kerbL    = useMemo(() => buildKerbGeometry(curve, 'left'),  [curve])
  const kerbR    = useMemo(() => buildKerbGeometry(curve, 'right'), [curve])

  // Textures
  const roadTex  = useMemo(() => isNight ? generateNightAsphaltTexture() : generateAsphaltTexture(), [isNight])
  const normalMap = useMemo(() => generateNormalMap(), [])

  // Start gate
  const startGate = useMemo(() => {
    const p = curve.getPointAt(0).setY(0)
    const t = curve.getTangentAt(0)
    return { position: p, rotation: new THREE.Euler(0, Math.atan2(t.x, t.z), 0) }
  }, [curve])

  // Advertising board positions (evenly spaced)
  const adBoards = useMemo(() => {
    const boards: { position: THREE.Vector3; rotation: THREE.Euler }[] = []
    const numBoards = 12
    for (let i = 0; i < numBoards; i++) {
      const t       = i / numBoards
      const p       = curve.getPointAt(t)
      const tangent = curve.getTangentAt(t)
      const normal  = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
      boards.push({
        position: p.clone().add(normal.multiplyScalar(-(TRACK_WIDTH/2 + 3))).setY(0),
        rotation: new THREE.Euler(0, Math.atan2(tangent.x, tangent.z), 0),
      })
    }
    return boards
  }, [curve])

  // Checkpoint light positions
  const checkpointLights = useMemo(() =>
    track.checkpoints.filter(c => !c.isStart).map(c => ({
      position: new THREE.Vector3(...c.position),
    })),
    [trackId]
  )

  const kerbColors = isNight
    ? { stripe1: '#bf00ff', stripe2: '#00d4ff' }
    : { stripe1: '#dd2222', stripe2: '#ffffff' }

  return (
    
      {/* ── Road Surface ─────────────────────────────────────────────── */}
      
        
      

      {/* ── Kerbs (rumble strips) ─────────────────────────────────────── */}
      
        
      
      
        
      

      {/* ── Barriers ─────────────────────────────────────────────────── */}
      
      

      {/* ── Start/Finish Gate ─────────────────────────────────────────── */}
      

      {/* ── Checkpoint Indicator Lights ───────────────────────────────── */}
      {checkpointLights.map((cp, i) => (
        
      ))}

      {/* ── Advertising Boards ────────────────────────────────────────── */}
      {adBoards.map((b, i) => (
        <AdBoard key={i} position={b.position} rotation={b.rotation}
          color={i % 2 === 0 ? track.accent1 : track.accent2} />
      ))}
    
  )
}
```

✅ **Sub-Prompt 6 complete.**

---

---

# SUB-PROMPT 7 — Car Physics, Multiple Car Models & AI Opponents

## Goal
Build the full car system: 5 distinct car meshes (based on CarId), physics-driven movement using per-car stats, exhaust/drift/nitro particle effects, and simple AI opponent cars that follow the track.

---

## Step 7.1 — Create `src/components/game/CarModel.tsx`

Each car has a distinct silhouette — define mesh geometry per `CarId`:

```tsx
import * as THREE from 'three'
import type { CarId } from '../../types/game.types'

interface CarModelProps {
  carId:      CarId
  bodyColor:  string
  accentColor:string
  rimColor:   string
  emissiveColor: string
  isDrifting: boolean
  speed:      number
  steerAngle: number
}

// ─── Wheel sub-component ──────────────────────────────────────────────────────
function Wheel({
  position, steerAngle = 0, isFront = false, rimColor,
}: {
  position: [number, number, number]; steerAngle?: number; isFront?: boolean; rimColor: string
}) {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current) {
      const speed = useGameStore.getState().car.speed
      // Rotate tire around its axis
      const tireGroup = ref.current.children[0] as THREE.Mesh
      if (tireGroup) tireGroup.rotation.x -= (speed / 20) * delta * 5
    }
  })
  return (
    
      
        {/* Tire */}
        <mesh rotation={[0, 0, Math.PI/2]} castShadow>
          
          
        
        {/* Rim */}
        <mesh rotation={[0, 0, Math.PI/2]}>
          
          
        
        {/* Brake caliper */}
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          
          
        
      
    
  )
}

// Import useRef and useFrame here (needed in Wheel):
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../../store/gameStore'

// ─── Car body geometries per car type ────────────────────────────────────────
function ViperBody({ bodyColor, accentColor, emissiveColor, isDrifting, speed }: Omit) {
  return (
    
      {/* Main body — wide, low, aggressive */}
      
        
        
      
      {/* Cabin */}
      
        
        
      
      {/* Front splitter */}
      
        
        
      
      {/* Rear diffuser */}
      
        
        
      
      {/* Spoiler */}
      
        
        
      
      {[-0.7, 0.7].map((x, i) => (
        
          
          
        
      ))}
      {/* Windshield */}
      
        
        
      
      {/* Side mirrors */}
      {[-1.0, 1.0].map((x, i) => (
        
          
          
        
      ))}
      {/* Headlights */}
      {[-0.6, 0.6].map((x, i) => (
        
          
          
        
      ))}
      {/* Tail lights */}
      {[-0.6, 0.6].map((x, i) => (
        
          
          
        
      ))}
      {/* DRL strip */}
      
        
        
      
      {/* Headlight point lights */}
      {speed > 8 && [-0.6, 0.6].map((x, i) => (
        
      ))}
      
    
  )
}

// ─── Phantom body — low slung, more aggressive angles ─────────────────────────
function PhantomBody({ bodyColor, accentColor, emissiveColor, isDrifting, speed }: Omit) {
  return (
    
      
        
        
      
      
        
        
      
      {/* Long hood vents */}
      {[-0.4, 0, 0.4].map((x, i) => (
        
          
          
        
      ))}
      
        
        
      
      {[-0.75, 0.75].map((x, i) => (
        
          
          
        
      ))}
      {/* Accent strips */}
      {[2.3, -2.3].map((z, i) => (
        
          
          
        
      ))}
      {[-0.65, 0.65].map((x, i) => (
        
          
          
        
      ))}
      {speed > 8 && [-0.65, 0.65].map((x, i) => (
        
      ))}
      
    
  )
}

// ─── Inferno body — wider, flared arches, drift car style ─────────────────────
function InfernoBody({ bodyColor, accentColor, emissiveColor, isDrifting, speed }: Omit) {
  return (
    
      
        
        
      
      
        
        
      
      {/* Flared arches */}
      {[-1.05, 1.05].map((x, i) => (
        
          
          
        
      ))}
      {/* Hood scoop */}
      
        
        
      
      {/* Gold accent strips */}
      
        
        
      
      
        
        
      
      {[-0.7, 0.7].map((x, i) => (
        
          
          
        
      ))}
      {[-0.65, 0.65].map((x, i) => (
        
          
          
        
      ))}
      {speed > 8 && [-0.65, 0.65].map((x, i) => (
        
      ))}
      
    
  )
}

// ─── Storm body — muscular, boxy, V8 feel ─────────────────────────────────────
function StormBody({ bodyColor, accentColor, emissiveColor, isDrifting, speed }: Omit) {
  return (
    
      
        
        
      
      
        
        
      
      {/* Muscular hood */}
      {[-0.45, 0.45].map((x, i) => (
        
          
          
        
      ))}
      {/* Green accent stripe */}
      
        
        
      
      
        
        
      
      {[-0.7, 0.7].map((x, i) => (
        
          
          
        
      ))}
      {[-0.65, 0.65].map((x, i) => (
        
          
          
        
      ))}
      {speed > 8 && [-0.65, 0.65].map((x, i) => (
        
      ))}
      
    
  )
}

// ─── Titan body — massive, wide, luxury GT ────────────────────────────────────
function TitanBody({ bodyColor, accentColor, emissiveColor, isDrifting, speed }: Omit) {
  return (
    
      
        
        
      
      
        
        
      
      {/* Massive front grille */}
      
        
        
      
      {/* Purple accent strip */}
      
        
        
      
      
        
        
      
      {/* Massive rear wing */}
      
        
        
      
      {[-0.8, 0.8].map((x, i) => (
        
          
          
        
      ))}
      {/* Split headlights */}
      {[-0.7, -0.35, 0.35, 0.7].map((x, i) => (
        
          
          
        
      ))}
      {speed > 8 && [-0.55, 0.55].map((x, i) => (
        
      ))}
      
    
  )
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────
export default function CarModel(props: CarModelProps) {
  const { carId, rimColor, steerAngle, ...rest } = props
  const wheelBase   = 1.35  // distance front/rear axle from center
  const wheelTrack  = 0.95  // half-width between wheels

  const BodyComp = {
    viper:   ViperBody,
    phantom: PhantomBody,
    inferno: InfernoBody,
    storm:   StormBody,
    titan:   TitanBody,
  }[carId] || ViperBody

  return (
    
      
      {/* Front wheels */}
      
      
      {/* Rear wheels */}
      
      
    
  )
}
```

---

## Step 7.2 — Create `src/components/game/Car.tsx`

```tsx
import { useRef, useEffect } from 'react'
import { useFrame }   from '@react-three/fiber'
import { Trail, Sparkles } from '@react-three/drei'
import * as THREE     from 'three'
import { useGameStore }  from '../../store/gameStore'
import { CAR_DEFINITIONS } from '../../data/cars'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import {
  computeSpeedDelta,
  computeSteeringDelta,
  shouldDrift,
  clamp, lerp, PHYSICS,
} from '../../utils/physics'
import CarModel from './CarModel'

export default function Car() {
  const groupRef      = useRef(null)
  const steerAngle    = useRef(0)
  const driftTimer    = useRef(0)
  const nitroTimer    = useRef(0)

  const { updateCar, addScore, passCheckpoint, completeLap } = useGameStore()

  // Place car at track start on mount
  useEffect(() => {
    const { game } = useGameStore.getState()
    const track    = TRACK_DEFINITIONS[game.selectedTrackId]
    if (groupRef.current) {
      const [x, y, z] = track.startPosition
      groupRef.current.position.set(x, y, z)
      groupRef.current.rotation.y = track.startRotationY
    }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const { controls, car, game } = useGameStore.getState()
    if (game.phase !== 'racing' && game.phase !== 'countdown') return

    const clampedDelta = Math.min(delta, 0.05)
    const carDef       = CAR_DEFINITIONS[game.selectedCarId]
    const stats        = carDef.stats
    const { forward, backward, left, right, nitro, drift, brake } = controls
    const isTurning    = left || right

    // ── Drift ──────────────────────────────────────────────────────────────
    const isDrifting   = shouldDrift(car.speed, drift, isTurning)

    // ── Speed ──────────────────────────────────────────────────────────────
    const nitroOk = car.nitro > 5
    const speedDelta = computeSpeedDelta(
      car.speed, forward, backward, brake,
      nitro, nitroOk, clampedDelta,
      stats.maxSpeedKmh, stats.accelerationRate,
      stats.brakingRate, stats.nitroMultiplier
    )
    const newSpeed = clamp(
      car.speed + speedDelta,
      -PHYSICS.MAX_REVERSE_SPEED,
      stats.maxSpeedKmh
    )

    // ── Nitro ──────────────────────────────────────────────────────────────
    const nitroActive = nitro && nitroOk && forward
    let newNitro = car.nitro
    if (nitroActive) {
      newNitro = clamp(car.nitro - stats.nitroDrain * clampedDelta, 0, 100)
    } else {
      newNitro = clamp(car.nitro + 14 * clampedDelta, 0, 100)
    }

    // ── Steering ───────────────────────────────────────────────────────────
    const steerDelta = computeSteeringDelta(
      newSpeed, left, right, isDrifting, clampedDelta, stats.steeringSpeed
    )
    groupRef.current.rotation.y += steerDelta

    // Wheel steer animation
    const targetSteer  = left ? 0.42 : right ? -0.42 : 0
    steerAngle.current = lerp(steerAngle.current, targetSteer, clampedDelta * 9)

    // ── Position ───────────────────────────────────────────────────────────
    const dir = new THREE.Vector3(
      Math.sin(groupRef.current.rotation.y),
      0,
      Math.cos(groupRef.current.rotation.y)
    )

    // Drift slide offset
    if (isDrifting) {
      const lateral = new THREE.Vector3(
        Math.sin(groupRef.current.rotation.y + Math.PI / 2),
        0,
        Math.cos(groupRef.current.rotation.y + Math.PI / 2)
      )
      const slide = (newSpeed / stats.maxSpeedKmh) * 0.28
      dir.add(lateral.multiplyScalar(right ? slide : -slide)).normalize()
    }

    const move = (newSpeed / 3.6) * clampedDelta
    groupRef.current.position.addScaledVector(dir, move)
    groupRef.current.position.y = 0.4

    // Car body tilt
    const tiltTarget = (right ? -0.055 : left ? 0.055 : 0) * (newSpeed / 100)
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, tiltTarget, clampedDelta * 6)

    // ── Drift score ────────────────────────────────────────────────────────
    if (isDrifting) {
      driftTimer.current += clampedDelta
      if (driftTimer.current >= 1) {
        addScore({ type: 'drift', points: PHYSICS.DRIFT_SCORE_PER_S,
          timestamp: Date.now(), message: `🔥 DRIFT +${PHYSICS.DRIFT_SCORE_PER_S}` })
        driftTimer.current = 0
      }
    } else { driftTimer.current = 0 }

    // ── Nitro score ────────────────────────────────────────────────────────
    if (nitroActive) {
      nitroTimer.current += clampedDelta
      if (nitroTimer.current >= 2) {
        addScore({ type: 'nitro_boost', points: 5,
          timestamp: Date.now(), message: '⚡ NITRO +5' })
        nitroTimer.current = 0
      }
    } else { nitroTimer.current = 0 }

    // ── Checkpoint detection ───────────────────────────────────────────────
    const track     = TRACK_DEFINITIONS[game.selectedTrackId]
    const carPos    = groupRef.current.position
    track.checkpoints.forEach((cp) => {
      const cpPos = new THREE.Vector3(...cp.position)
      const dist  = carPos.distanceTo(cpPos)
      if (dist < 12) {
        if (cp.isStart && car.checkpointsPassed.length >= 3) {
          completeLap()
        } else if (!cp.isStart) {
          passCheckpoint(cp.id)
        }
      }
    })

    // ── Sync to store ──────────────────────────────────────────────────────
    updateCar({
      position: { x: carPos.x, y: carPos.y, z: carPos.z },
      rotation: {
        x: groupRef.current.rotation.x,
        y: groupRef.current.rotation.y,
        z: groupRef.current.rotation.z,
      },
      speed:         newSpeed,
      nitro:         newNitro,
      isDrifting,
      isNitroActive: nitroActive,
      wheelSteerAngle: steerAngle.current,
      tireSmoke:     isDrifting && Math.abs(newSpeed) > 30,
    })
  })

  const { car, game } = useGameStore()
  const carDef = CAR_DEFINITIONS[game.selectedCarId]

  return (
    
      

      {/* ── Exhaust Trail ─────────────────────────────────────────────── */}
      {Math.abs(car.speed) > 55 && (
        <>
          {[-0.3, 0.3].map((x, i) => (
            <Trail key={i} width={0.35} length={8}
              color={car.isNitroActive ? '#ff6600' : '#999999'}
              attenuation={(t) => t * t}
            >
              
                
                
              
            
          ))}
        </>
      )}

      {/* ── Drift Sparks & Smoke ──────────────────────────────────────── */}
      {car.isDrifting && (
        <>
          
          
        </>
      )}

      {/* ── Nitro Effect ──────────────────────────────────────────────── */}
      {car.isNitroActive && (
        <>
          
          
        </>
      )}
    
  )
}
```

---

## Step 7.3 — Create `src/components/game/AIOpponent.tsx`

Simple spline-following AI car:

```tsx
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import { buildTrackCurve } from '../../utils/trackGeometry'
import { lerp } from '../../utils/physics'
import CarModel from './CarModel'

interface AIOpponentProps {
  index:      number   // 0, 1, 2
  carId:      'phantom' | 'storm' | 'inferno'
  bodyColor:  string
  accentColor:string
  rimColor:   string
  emissiveColor: string
  startOffset:number  // 0–1 position offset along curve
  speedFactor:number  // 0.7–1.1 relative speed
}

const AI_BASE_SPEED = 70  // km/h baseline

export default function AIOpponent({
  index, carId, bodyColor, accentColor, rimColor, emissiveColor,
  startOffset, speedFactor,
}: AIOpponentProps) {
  const groupRef  = useRef(null)
  const tRef      = useRef(startOffset)
  const curveRef  = useRef(null)
  const yRotRef   = useRef(0)

  // Initialize curve and position
  useEffect(() => {
    const trackId = useGameStore.getState().game.selectedTrackId
    const track   = TRACK_DEFINITIONS[trackId]
    curveRef.current = buildTrackCurve(track)
    if (groupRef.current && curveRef.current) {
      const pt = curveRef.current.getPointAt(startOffset)
      groupRef.current.position.set(pt.x, 0.4, pt.z)
    }
  }, [startOffset])

  useFrame((_, delta) => {
    if (!groupRef.current || !curveRef.current) return
    const { game } = useGameStore.getState()
    if (game.phase !== 'racing') return

    const clampedDelta = Math.min(delta, 0.05)
    // Advance AI along curve
    const speed = AI_BASE_SPEED * speedFactor
    const perimeter = 500  // approximate curve length in world units
    tRef.current = (tRef.current + (speed / 3.6 * clampedDelta) / perimeter) % 1

    const pt      = curveRef.current.getPointAt(tRef.current)
    const tangent = curveRef.current.getTangentAt(tRef.current)

    // Offset left/right so AI doesn't overlap player
    const lateral = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
    const sideOffset = [-2.5, 2.5, -4.5][index] ?? 0
    const targetPos = pt.clone().add(lateral.multiplyScalar(sideOffset))

    // Smooth position
    groupRef.current.position.lerp(targetPos.setY(0.4), 0.12)

    // Rotation
    const targetY = Math.atan2(tangent.x, tangent.z)
    yRotRef.current = lerp(yRotRef.current, targetY, 0.1)
    groupRef.current.rotation.y = yRotRef.current
  })

  return (
    
      
    
  )
}
```

✅ **Sub-Prompt 7 complete.**

---

---

# SUB-PROMPT 8 — Camera, Post-Processing & Scene Assembly

## Goal
Build the smooth third-person camera controller, full post-processing stack, and assemble the complete 3D scene with AI opponents, game loop, and keyboard hooks.

---

## Step 8.1 — Create `src/components/game/CameraController.tsx`

```tsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { lerp } from '../../utils/physics'

const BASE_OFFSET = new THREE.Vector3(0, 3.8, 9)
const LOOK_AHEAD  = 3.5

export default function CameraController() {
  const { camera }   = useThree()
  const camPos       = useRef(new THREE.Vector3(0, 5, 12))
  const lookTarget   = useRef(new THREE.Vector3())
  const fovRef       = useRef(75)

  useFrame(() => {
    const { car, game } = useGameStore.getState()
    if (game.phase !== 'racing' && game.phase !== 'countdown' && game.phase !== 'finished') return

    const { position, rotation, speed } = car
    const rotY = rotation.y

    // Speed-based pull-back
    const speedRatio  = Math.min(Math.abs(speed) / 250, 1)
    const pullBack    = speedRatio * 3.5
    const heightBoost = speedRatio * 1.0

    const desiredX = position.x - Math.sin(rotY) * (BASE_OFFSET.z + pullBack)
    const desiredY = position.y + BASE_OFFSET.y + heightBoost
    const desiredZ = position.z - Math.cos(rotY) * (BASE_OFFSET.z + pullBack)

    const lookX = position.x + Math.sin(rotY) * LOOK_AHEAD
    const lookY = position.y + 0.9
    const lookZ = position.z + Math.cos(rotY) * LOOK_AHEAD

    const lerpF = game.phase === 'finished' ? 0.03 : 0.09

    camPos.current.set(
      lerp(camPos.current.x, desiredX, lerpF),
      lerp(camPos.current.y, desiredY, lerpF),
      lerp(camPos.current.z, desiredZ, lerpF),
    )
    lookTarget.current.set(
      lerp(lookTarget.current.x, lookX, lerpF * 1.3),
      lerp(lookTarget.current.y, lookY, lerpF * 1.3),
      lerp(lookTarget.current.z, lookZ, lerpF * 1.3),
    )

    camera.position.copy(camPos.current)
    camera.lookAt(lookTarget.current)

    // Dynamic FOV: widens at high speed
    const targetFov = 72 + speedRatio * 18
    fovRef.current  = lerp(fovRef.current, targetFov, 0.04)
    ;(camera as THREE.PerspectiveCamera).fov = fovRef.current
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
  })

  return null
}
```

---

## Step 8.2 — Create `src/components/game/Effects.tsx`

```tsx
import {
  EffectComposer, Bloom, ChromaticAberration,
  DepthOfField, Vignette, MotionBlur,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'

export default function Effects() {
  const quality    = useGameStore((s) => s.game.quality)
  const isDrifting = useGameStore((s) => s.car.isDrifting)
  const isNitro    = useGameStore((s) => s.car.isNitroActive)
  const speed      = useGameStore((s) => Math.abs(s.car.speed))
  const trackId    = useGameStore((s) => s.game.selectedTrackId)
  const isNight    = trackId === 'neon_nights'

  const bloomIntensity = isNight
    ? (isDrifting ? 3.5 : isNitro ? 4.5 : 2.5)
    : (isDrifting ? 2.2 : isNitro ? 3.0 : 1.4)
  const chromaOffset = speed > 150 ? 0.005 : isNitro ? 0.007 : isNight ? 0.003 : 0.001

  if (quality === 'low') {
    return (
      
        
        
      
    )
  }

  return (
    
      {quality === 'high' && (
        
      )}
      
      
      
    
  )
}
```

---

## Step 8.3 — Create `src/components/game/Scene.tsx`

```tsx
import { Canvas }   from '@react-three/fiber'
import { Suspense }  from 'react'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import Environment  from './Environment'
import Track        from './Track'
import Car          from './Car'
import AIOpponent   from './AIOpponent'
import CameraController from './CameraController'
import Effects      from './Effects'
import { useGameStore } from '../../store/gameStore'
import { useKeyboard }  from '../../hooks/useKeyboard'
import { useGameLoop }  from '../../hooks/useGameLoop'

function GameWorld() {
  useKeyboard()
  useGameLoop()
  return (
    <>
      
      
      
      {/* Three AI opponents */}
      
      
      
      
      
    </>
  )
}

export default function Scene() {
  const quality = useGameStore((s) => s.game.quality)

  return (
    <Canvas
      shadows
      camera={{ fov: 75, near: 0.1, far: 600, position: [0, 5, 12] }}
      dpr={quality === 'low' ? [0.5, 1] : quality === 'medium' ? [1, 1.5] : [1, 2]}
      gl={{
        antialias:        quality !== 'low',
        powerPreference:  'high-performance',
        alpha:            false,
        shadowMapType:    2,  // PCFSoftShadowMap
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      
      
      
        
        
      
    
  )
}
```

✅ **Sub-Prompt 8 complete.**

---

---

# SUB-PROMPT 9 — HUD Components (Speedometer, Lap Timer, Minimap, Nitro, Score, Damage, Position)

## Goal
Build all glassmorphic HUD elements with pixel-perfect design, SVG animations, and real-time data.

---

## Step 9.1 — `src/components/ui/Speedometer.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { CAR_DEFINITIONS } from '../../data/cars'

export default function Speedometer() {
  const speed    = useGameStore((s) => Math.abs(s.car.speed))
  const isNitro  = useGameStore((s) => s.car.isNitroActive)
  const carId    = useGameStore((s) => s.game.selectedCarId)
  const maxSpeed = CAR_DEFINITIONS[carId]?.stats.maxSpeedKmh ?? 200

  const pct        = Math.min(speed / maxSpeed, 1)
  const R          = 54
  const CIRC       = 2 * Math.PI * R
  const ARC        = CIRC * 0.78   // 280° arc
  const FILLED     = ARC * pct
  const speedColor = speed > maxSpeed * 0.85
    ? '#ff073a' : speed > maxSpeed * 0.55
    ? '#ff6600' : '#39ff14'

  return (
    <div className={`glass border-2 p-3 select-none transition-all duration-200 ${
      isNitro ? 'border-brand-orange animate-glow-orange' : 'border-brand-green/40'
    }`} style={{ borderRadius: 16 }}>
      
        {/* Tick marks */}
        
          {Array.from({ length: 10 }, (_, i) => {
            const angle = (i / 9) * Math.PI * 1.55
            const inner = 42, outer = i % 5 === 0 ? 36 : 40
            const cos   = Math.cos(angle), sin = Math.sin(angle)
            return (
              <line key={i}
                x1={64 + cos * inner} y1={64 + sin * inner}
                x2={64 + cos * outer} y2={64 + sin * outer}
                stroke={i % 5 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}
                strokeWidth={i % 5 === 0 ? 2 : 1}
              />
            )
          })}
          {/* Track arc */}
          
          {/* Speed arc */}
          
        
        {/* Center */}
        
          
            {Math.round(speed)}
          
          km/h
          {isNitro && (
            
              ⚡ NITRO
            
          )}
        
      
    
  )
}
```

---

## Step 9.2 — `src/components/ui/LapTimer.tsx`

```tsx
import { useGameStore }  from '../../store/gameStore'
import { formatTime }    from '../../utils/helpers'

export default function LapTimer() {
  const lapTime     = useGameStore((s) => s.car.lapTime)
  const bestLap     = useGameStore((s) => s.car.bestLapTime)
  const currentLap  = useGameStore((s) => s.car.currentLap)
  const totalLaps   = useGameStore((s) => s.car.totalLaps)
  const score       = useGameStore((s) => s.game.score)
  const isDeltaGood = isFinite(bestLap) && lapTime < bestLap

  return (
    
      
        Lap
        
          {currentLap} / {totalLaps}
        
      
      
        
          Current
          
            {formatTime(lapTime)}
          
        
        
          Best
          
            {isFinite(bestLap) ? formatTime(bestLap) : '--:--.---'}
          
        
      
      
      
        Score
        {score.toLocaleString()}
      
    
  )
}
```

---

## Step 9.3 — `src/components/ui/NitroIndicator.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function NitroIndicator() {
  const nitro    = useGameStore((s) => s.car.nitro)
  const isActive = useGameStore((s) => s.car.isNitroActive)
  const isDrift  = useGameStore((s) => s.car.isDrifting)
  const color    = nitro > 55 ? '#00d4ff' : nitro > 25 ? '#ff6600' : '#ff073a'

  return (
    <div className={`glass border p-3 min-w-[160px] transition-all ${
      isActive ? 'border-brand-orange animate-glow-orange' : 'border-brand-blue/30'
    }`}>
      
        ⚡ Nitro
        
          {isActive ? 'ACTIVE' : nitro < 12 ? 'RECHARGING' : 'READY'}
        
      
      {/* Segmented bar */}
      
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="flex-1 h-2.5 rounded-[2px] transition-all duration-75"
            style={{
              background: (i / 24) * 100 < nitro ? color : 'rgba(255,255,255,0.05)',
              boxShadow:  (i / 24) * 100 < nitro ? `0 0 4px ${color}88` : 'none',
            }} />
        ))}
      
      
        {Math.round(nitro)}%
        {isDrift && (
          🔥 DRIFTING
        )}
      
    
  )
}
```

---

## Step 9.4 — `src/components/ui/Minimap.tsx`

(Full canvas-based minimap with track path, car position, and checkpoint markers)

```tsx
import { useEffect, useRef } from 'react'
import { useGameStore }      from '../../store/gameStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'

const SIZE = 140

export default function Minimap() {
  const canvasRef = useRef(null)
  const carPos    = useGameStore((s) => s.car.position)
  const carRot    = useGameStore((s) => s.car.rotation.y)
  const trackId   = useGameStore((s) => s.game.selectedTrackId)
  const track     = TRACK_DEFINITIONS[trackId]

  // Pre-compute minimap scale to fit track
  const allX = track.pathPoints.map(p => p[0])
  const allZ = track.pathPoints.map(p => p[2])
  const minX = Math.min(...allX), maxX = Math.max(...allX)
  const minZ = Math.min(...allZ), maxZ = Math.max(...allZ)
  const spanX = maxX - minX || 1, spanZ = maxZ - minZ || 1
  const scale = Math.min((SIZE - 24) / spanX, (SIZE - 24) / spanZ)
  const cx = SIZE / 2 - ((minX + maxX) / 2) * scale
  const cy = SIZE / 2 - ((minZ + maxZ) / 2) * scale
  const toMX = (x: number) => cx + x * scale
  const toMY = (z: number) => cy + z * scale

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const draw = () => {
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, SIZE, SIZE)

      // Circular clip
      ctx.save()
      ctx.beginPath(); ctx.arc(SIZE/2, SIZE/2, SIZE/2 - 2, 0, Math.PI*2); ctx.clip()

      // BG
      ctx.fillStyle = 'rgba(0,0,0,0.65)'; ctx.fillRect(0, 0, SIZE, SIZE)

      // Track outline (thick)
      ctx.strokeStyle = 'rgba(80,80,100,0.5)'; ctx.lineWidth = 10
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath()
      track.pathPoints.forEach(([x, , z], i) => {
        if (i === 0) ctx.moveTo(toMX(x), toMY(z))
        else         ctx.lineTo(toMX(x), toMY(z))
      })
      ctx.closePath(); ctx.stroke()

      // Track center (thin)
      ctx.strokeStyle = `${track.accent1}55`; ctx.lineWidth = 3
      ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([])

      // Checkpoints
      track.checkpoints.forEach((cp) => {
        const mx = toMX(cp.position[0])
        const my = toMY(cp.position[2])
        ctx.beginPath(); ctx.arc(mx, my, 3.5, 0, Math.PI*2)
        ctx.fillStyle = cp.isStart ? track.accent1 : track.accent2
        ctx.shadowColor = cp.isStart ? track.accent1 : track.accent2
        ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0
      })

      // Car arrow
      const mx = toMX(carPos.x), my = toMY(carPos.z)
      ctx.save(); ctx.translate(mx, my); ctx.rotate(-carRot)
      ctx.fillStyle = '#ff073a'; ctx.shadowColor = '#ff073a'; ctx.shadowBlur = 10
      ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(4, 5); ctx.lineTo(0, 3); ctx.lineTo(-4, 5)
      ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0; ctx.restore()

      ctx.restore()

      // Ring
      ctx.strokeStyle = `${track.accent1}55`; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(SIZE/2, SIZE/2, SIZE/2 - 2, 0, Math.PI*2); ctx.stroke()
    }

    const id = setInterval(draw, 40)
    return () => clearInterval(id)
  }, [carPos, carRot, trackId])

  return (
    
      
        Map
        ◉ Live
      
      
    
  )
}
```

---

## Step 9.5 — `src/components/ui/RacePosition.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'
import { ordinalSuffix } from '../../utils/helpers'

export default function RacePosition() {
  const pos   = useGameStore((s) => s.game.racePosition)
  const total = useGameStore((s) => s.game.totalRacers)
  const color = pos === 1 ? '#ffd700' : pos === 2 ? '#c0c0c0' : pos === 3 ? '#cd7f32' : '#ffffff'
  return (
    
      Position
      
        {pos}/{total}
      
    
  )
}
```

---

## Step 9.6 — `src/components/ui/DamageBar.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function DamageBar() {
  const health = useGameStore((s) => s.car.health)
  const color  = health > 60 ? '#39ff14' : health > 30 ? '#ff6600' : '#ff073a'
  return (
    
      
        🛡 Health
        {health}%
      
      
        
      
    
  )
}
```

---

## Step 9.7 — `src/components/ui/FPSCounter.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function FPSCounter() {
  const fps     = useGameStore((s) => s.game.fps)
  const quality = useGameStore((s) => s.game.quality)
  const color   = fps >= 55 ? '#39ff14' : fps >= 40 ? '#ff6600' : '#ff073a'
  return (
    
      {fps} FPS
      {quality.toUpperCase()}
    
  )
}
```

---

## Step 9.8 — `src/components/ui/CountdownLights.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

export default function CountdownLights() {
  const phase    = useGameStore((s) => s.game.phase)
  const countdown = useGameStore((s) => s.game.countdownValue)
  if (phase !== 'countdown') return null

  return (
    
      {/* F1-style lights */}
      
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i}
            className="w-10 h-10 rounded-full border-2 border-white/20 transition-all duration-300"
            style={{
              background:  i < (5 - countdown) || countdown === 0
                ? countdown === 0 ? '#39ff14' : '#ff073a'
                : 'rgba(0,0,0,0.5)',
              boxShadow:   i < (5 - countdown) || countdown === 0
                ? `0 0 20px ${countdown === 0 ? '#39ff14' : '#ff073a'}`
                : 'none',
            }}
          />
        ))}
      
      <div className="font-game font-black text-8xl md:text-9xl animate-countdown"
        style={{
          color: countdown === 0 ? '#39ff14' : '#ff073a',
          textShadow: `0 0 40px ${countdown === 0 ? '#39ff14' : '#ff073a'}`,
        }}>
        {countdown === 0 ? 'GO!' : countdown}
      
    
  )
}
```

---

## Step 9.9 — `src/components/ui/ScoreFeed.tsx`

```tsx
import { useGameStore } from '../../store/gameStore'

const TYPE_COLORS: Record = {
  drift:       '#ff6600',
  clean_lap:   '#39ff14',
  fast_lap:    '#ffd700',
  nitro_boost: '#00d4ff',
  sector_best: '#bf00ff',
  close_call:  '#ff073a',
}

export default function ScoreFeed() {
  const events = useGameStore((s) => s.scoreEvents)
  const recent = events.slice(-5).reverse()
  return (
    
      {recent.map((e, i) => (
        
          {e.message}
        
      ))}
    
  )
}
```

✅ **Sub-Prompt 9 complete.**

---

---

# SUB-PROMPT 10 — Game Screens: Auth, Car Select, Track Select, HUD, Results

## Goal
Build all game screens with polished, animated UI — authentication, car/track selection, full HUD assembly, pause menu, and race results podium.

---

## Step 10.1 — `src/components/screens/AuthScreen.tsx`

Full login/register screen with form validation:

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth }      from '../../hooks/useAuth'
import { useGameStore } from '../../store/gameStore'

type AuthMode = 'login' | 'register'

export default function AuthScreen() {
  const [mode,     setMode]     = useState('login')
  const [username, setUsername] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const { login, register, guestLogin, isLoading, authError, clearError } = useAuth()
  const setPhase = useGameStore((s) => s.setPhase)

  const handleSubmit = async () => {
    clearError()
    let success: boolean
    if (mode === 'login') {
      success = await login(email, password)
    } else {
      success = await register(username, email, password)
    }
    if (success) setPhase('menu')
  }

  const handleGuest = () => {
    guestLogin()
    setPhase('menu')
  }

  return (
    
      {/* Background decoration */}
      
        
        
      

      
        {/* Logo */}
        
          
            APEXRUSH
          
          
            Racing Experience
          
        

        {/* Mode Toggle */}
        
          {(['login', 'register'] as AuthMode[]).map((m) => (
            <button key={m} onClick={() => { setMode(m); clearError() }}
              className={`flex-1 py-2 font-game text-xs uppercase tracking-widest rounded-md transition-all ${
                mode === m
                  ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/40'
                  : 'text-white/40 hover:text-white/60'
              }`}>
              {m === 'login' ? 'Sign In' : 'Register'}
            
          ))}
        

        
          <motion.div key={mode}
            initial={{ opacity: 0, x: mode === 'register' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'register' ? -20 : 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {mode === 'register' && (
              
                Username
                <input className="input-glass" type="text" placeholder="YourRacerTag"
                  value={username} onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              
            )}
            
              Email
              <input className="input-glass" type="email" placeholder="you@apexrush.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            
            
              Password
              <input className="input-glass" type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            
          
        

        {/* Error */}
        {authError && (
          
            {authError}
          
        )}

        
          
            {isLoading ? 'Loading...' : mode === 'login' ? '▶ Sign In' : '▶ Create Account'}
          
          
            Play as Guest
          
        
      
    
  )
}
```

---

## Step 10.2 — `src/components/screens/CarSelect.tsx`

5-car selection with animated stats bars:

```tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore }   from '../../store/gameStore'
import { CAR_DEFINITIONS, CAR_ORDER } from '../../data/cars'
import { useAuth }        from '../../hooks/useAuth'
import type { CarId }     from '../../types/game.types'

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    
      
        {label}
        {value}
      
      
        
      
    
  )
}

export default function CarSelect() {
  const { game, selectCar, setPhase } = useGameStore()
  const { user } = useAuth()
  const [hovered, setHovered] = useState(null)
  const selected = game.selectedCarId
  const displayId = hovered || selected
  const car       = CAR_DEFINITIONS[displayId]

  return (
    
      {/* Header */}
      
        <button className="btn-secondary py-2 px-4 text-xs" onClick={() => setPhase('menu')}>
          ← Back
        
        
          SELECT YOUR CAR
        
        <button
          className={`btn-primary py-2 px-6 text-xs ${!selected ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => selected && setPhase('track_select')}
        >
          Next →
        
      

      
        {/* Car Grid */}
        
          
            {CAR_ORDER.map((id) => {
              const c       = CAR_DEFINITIONS[id]
              const locked  = c.unlockLevel > (user?.level ?? 0) && user?.id !== undefined
              return (
                <motion.div
                  key={id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => !locked && selectCar(id as CarId)}
                  onMouseEnter={() => setHovered(id as CarId)}
                  onMouseLeave={() => setHovered(null)}
                  className={`car-card glass-card p-4 text-center cursor-pointer relative
                    ${id === selected ? 'selected' : ''}
                    ${locked ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {/* Car 3D icon placeholder (color swatch) */}
                  
                    🏎️
                    {/* Color dot */}
                    
                  
                  {c.name}
                  {c.tagline}
                  {locked && (
                    
                      🔒 Lv.{c.unlockLevel}
                    
                  )}
                
              )
            })}
          
        

        {/* Car Stats Panel */}
        
          
            {car.name}
            {car.tagline}
            {/* Color swatch */}
            
              {[car.bodyColor, car.accentColor, car.rimColor].map((c, i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-white/20"
                  style={{ background: c }} title={['Body', 'Accent', 'Rims'][i]} />
              ))}
            
          
          
            
            
            
            
            
          
          
            
              
                Max Speed
                {car.stats.maxSpeedKmh}
                km/h
              
              
                Weight
                {car.stats.weight}
                kg
              
            
          
        
      
    
  )
}
```

---

## Step 10.3 — `src/components/screens/TrackSelect.tsx`

```tsx
import { motion } from 'framer-motion'
import { useGameStore }    from '../../store/gameStore'
import { TRACK_DEFINITIONS, TRACK_ORDER } from '../../data/tracks'
import { useAuth }         from '../../hooks/useAuth'
import { formatTime }      from '../../utils/helpers'
import type { TrackId }    from '../../types/game.types'

const DIFFICULTY_LABEL = ['', '★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★']
const WEATHER_ICON: Record = {
  clear:  '☀️', rain: '🌧️', storm: '⛈️', night: '🌙', sunset: '🌅',
}

export default function TrackSelect() {
  const { game, selectTrack, startCountdown, setPhase } = useGameStore()
  const { user } = useAuth()
  const selected = game.selectedTrackId

  return (
    
      
        <button className="btn-secondary py-2 px-4 text-xs" onClick={() => setPhase('car_select')}>
          ← Back
        
        
          SELECT TRACK
        
        
          ▶ Race!
        
      

      
        {TRACK_ORDER.map((id, idx) => {
          const t       = TRACK_DEFINITIONS[id]
          const bestLap = user?.bestLapTimes?.[id as TrackId]
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => selectTrack(id as TrackId)}
              className={`track-card glass-card cursor-pointer flex flex-col ${id === selected ? 'selected' : ''}`}
            >
              {/* Track preview */}
              
                {/* SVG miniature track path */}
                
                  <polyline
                    points={t.pathPoints.map(([x,,z]) => `${x},${z}`).join(' ')}
                    fill="none"
                    stroke={t.accent1}
                    strokeWidth="6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity={0.7}
                  />
                
                {/* Track name badge */}
                
                  
                    {WEATHER_ICON[t.weather]} {t.weather}
                  
                
                {id === selected && (
                  
                    ✓ Selected
                  
                )}
              

              
                
                  {t.name}
                
                {t.subtitle}
                
                  {t.description}
                
                
                  
                    Difficulty
                    
                      {DIFFICULTY_LABEL[t.difficulty]}
                    
                  
                  
                    Length
                    {t.length} km
                  
                  
                    Laps
                    {t.totalLaps}
                  
                  {bestLap && isFinite(bestLap) && (
                    
                      Best Lap
                      {formatTime(bestLap)}
                    
                  )}
                
              
            
          )
        })}
      
    
  )
}
```

---

## Step 10.4 — `src/components/screens/MainMenu.tsx`

```tsx
import { motion } from 'framer-motion'
import { useGameStore } from '../../store/gameStore'
import { useAuth }      from '../../hooks/useAuth'

const MENU_ITEMS = [
  { label: '▶  Race Now',    action: 'car_select',   primary: true  },
  { label: '🏆 Leaderboard', action: 'leaderboard',  primary: false },
  { label: '👤 Profile',     action: 'profile',      primary: false },
]

export default function MainMenu() {
  const { setPhase, game } = useGameStore()
  const { user, logout }   = useAuth()

  return (
    
      {/* Top bar */}
      
        
          
            👤
          
          
            Player
            {user?.username ?? 'Guest'}
          
        
        
          High Score
          {game.highScore.toLocaleString()}
        
      

      {/* Logo */}
      
        
          APEXRUSH
        
        
          3D Racing Experience
        
      

      {/* Menu */}
      
        {MENU_ITEMS.map((item) => (
          
            <button
              className={item.primary ? 'btn-primary w-full' : 'btn-secondary w-full'}
              onClick={() => setPhase(item.action as Parameters[0])}
            >
              {item.label}
            
          
        ))}
        
          
            🚪 Sign Out
          
        
      

      {/* Controls legend */}
      
        Controls
        
          {[
            ['W / ↑',  'Accelerate'], ['A / ←', 'Steer Left'], ['D / →', 'Steer Right'],
            ['S / ↓',  'Brake'],      ['SPACE',  'Nitro'],      ['SHIFT', 'Drift'],
          ].map(([k, v]) => (
            
              {k}
              {v}
            
          ))}
        
      
    
  )
}
```

---

## Step 10.5 — `src/components/screens/LoadingScreen.tsx`

```tsx
import { useProgress }  from '@react-three/drei'
import { useEffect }     from 'react'
import { motion }        from 'framer-motion'
import { useGameStore }  from '../../store/gameStore'

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const setPhase = useGameStore((s) => s.setPhase)

  useEffect(() => {
    if (!active && progress >= 98) {
      const t = setTimeout(() => setPhase('auth'), 700)
      return () => clearTimeout(t)
    }
  }, [active, progress, setPhase])

  return (
    
      {/* Scan line effect */}
      
        
      

      {/* Logo */}
      
        
          APEXRUSH
        
        Racing Experience v2.0
      

      {/* Loading bar */}
      
        
          Initializing
          {Math.round(progress)}%
        
        
          
        
        
          {['Physics Engine', 'Track Geometry', 'PBR Shaders', 'Audio System', 'World Objects'].map((item, i) => (
             i * 20
                ? 'border-brand-blue/40 text-brand-blue/70'
                : 'border-white/8 text-white/20'
            }`}>
              {item}
            
          ))}
        
      

      Loading assets…
    
  )
}
```

---

## Step 10.6 — `src/components/screens/RaceResults.tsx`

Podium screen with animations:

```tsx
import { motion }        from 'framer-motion'
import { useGameStore }  from '../../store/gameStore'
import { useAuth }       from '../../hooks/useAuth'
import { formatTime }    from '../../utils/helpers'
import { ordinalSuffix } from '../../utils/helpers'

const PLACE_COLORS = ['#ffd700', '#c0c0c0', '#cd7f32', '#ffffff']

export default function RaceResults() {
  const { car, game, resetGame, startCountdown } = useGameStore()
  const { user } = useAuth()
  const isNewBest = isFinite(car.bestLapTime) &&
    car.bestLapTime < (user?.bestLapTimes?.[game.selectedTrackId] ?? Infinity)

  return (
    
      

        {/* Place */}
        
          
            {ordinalSuffix(game.racePosition)}
          
          Finishing Position
        

        {/* Stats grid */}
        
          {[
            { label: 'Total Score',  value: game.score.toLocaleString(), color: '#ffd700' },
            { label: 'Best Lap',     value: isFinite(car.bestLapTime) ? formatTime(car.bestLapTime) : '--', color: '#39ff14' },
            { label: 'Total Time',   value: formatTime(game.totalTime), color: '#00d4ff' },
            { label: 'Laps Done',    value: `${car.currentLap - 1} / ${car.totalLaps}`, color: '#bf00ff' },
          ].map((s) => (
            
              {s.label}
              {s.value}
            
          ))}
        

        {/* New best banner */}
        {isNewBest && (
          
            🏆 NEW PERSONAL BEST!
          
        )}

        
          ▶ Race Again
          
            <button className="btn-secondary" onClick={() => useGameStore.getState().setPhase('car_select')}>
              Change Car
            
            <button className="btn-secondary" onClick={() => useGameStore.getState().setPhase('track_select')}>
              Change Track
            
          
          ← Main Menu
        
      
    
  )
}
```

---

## Step 10.7 — `src/components/screens/ProfileScreen.tsx` and `LeaderboardScreen.tsx`

### ProfileScreen.tsx
```tsx
import { motion }     from 'framer-motion'
import { useAuth }    from '../../hooks/useAuth'
import { useGameStore } from '../../store/gameStore'
import { formatTime }   from '../../utils/helpers'
import { levelFromXp, xpForLevel } from '../../store/authStore'
import { TRACK_DEFINITIONS } from '../../data/tracks'
import type { AvatarId, TrackId } from '../../types/game.types'

const AVATAR_OPTIONS: AvatarId[] = ['pilot_1','pilot_2','pilot_3','pilot_4','pilot_5','pilot_6']
const AVATAR_EMOJIS: Record = {
  pilot_1: '🧑‍✈️', pilot_2: '👨‍🚀', pilot_3: '👩‍🏎️', pilot_4: '🧑‍🔧', pilot_5: '👾', pilot_6: '🤖',
}

export default function ProfileScreen() {
  const { user, updateProfile }   = useAuth()
  const setPhase = useGameStore((s) => s.setPhase)
  if (!user) return null

  const level     = levelFromXp(user.xp)
  const xpNeeded  = xpForLevel(level)
  const xpInLevel = user.xp - (Array.from({ length: level - 1 }, (_, i) => xpForLevel(i + 1)).reduce((a, b) => a + b, 0))
  const xpPct     = Math.min((xpInLevel / xpNeeded) * 100, 100)

  return (
    
      
        <button className="btn-secondary py-2 px-4 text-xs" onClick={() => setPhase('menu')}>← Back
        PROFILE
        
      

      
        {/* Avatar & name */}
        
          
            
              {AVATAR_EMOJIS[user.avatarId]}
            
            
              {user.username}
              {user.email || 'Guest Player'}
              
                Level {level}
                · {user.totalRaces} races
              
            
          
          {/* XP bar */}
          
            
              XP Progress
              {xpInLevel} / {xpNeeded}
            
            
              
            
          
          {/* Select avatar */}
          
            {AVATAR_OPTIONS.map((a) => (
              <button key={a}
                onClick={() => updateProfile({ avatarId: a })}
                className={`w-10 h-10 rounded-full glass border flex items-center justify-center text-xl transition-all ${
                  user.avatarId === a ? 'border-brand-blue/60 bg-brand-blue/10' : 'border-white/10 hover:border-white/25'
                }`}>
                {AVATAR_EMOJIS[a]}
              
            ))}
          
        

        {/* Stats */}
        
          CAREER STATS
          
            {[
              { label: 'Races',       value: user.totalRaces,              color: '#00d4ff' },
              { label: 'Wins',        value: user.wins,                    color: '#ffd700' },
              { label: 'Win Rate',    value: `${user.totalRaces ? Math.round(user.wins / user.totalRaces * 100) : 0}%`, color: '#39ff14' },
              { label: 'Total Score', value: user.totalScore.toLocaleString(), color: '#ff6600' },
            ].map((s) => (
              
                {s.value}
                {s.label}
              
            ))}
          
        

        {/* Best laps */}
        
          BEST LAP TIMES
          
            {Object.entries(TRACK_DEFINITIONS).map(([id, track]) => {
              const best = user.bestLapTimes?.[id as TrackId]
              return (
                
                  
                    {track.name}
                    {track.difficulty} ★ · {track.length}km
                  
                  <span className={`font-mono text-sm font-bold ${isFinite(best ?? Infinity) ? 'neon-green' : 'text-white/20'}`}>
                    {isFinite(best ?? Infinity) && best ? formatTime(best) : '--:--.---'}
                  
                
              )
            })}
          
        
      
    
  )
}
```
# 🏎️ APEXRUSH — ULTRA-DETAILED FULL-STACK 3D RACING GAME BUILD PROMPT
> **Instructions for AI Agent (Gemini Flash / GPT / Claude):**
> This file is your complete specification. Read it **fully** before starting.
> Execute each **Sub-Prompt** one at a time in strict order.
> After completing each sub-prompt, respond with: `✅ Sub-Prompt [N] complete — [brief summary]`
> Then **immediately proceed** to the next sub-prompt without waiting.
> Do NOT skip phases. Do NOT stub code. Write everything in full.

---

## 🧭 AGENT OPERATING RULES

1. **Execute sub-prompts sequentially** — SP-1 → SP-2 → ... → SP-15
2. **Never skip a step** within a sub-prompt
3. **Write all code** — no stubs, mocks, or TODOs
4. **Use exact filenames and folder paths** as specified
5. **Fix TypeScript errors immediately** before moving on
6. **After each sub-prompt**, run `npm run build` to verify zero errors
7. **Comment every non-trivial block** of code
8. If dependency conflicts occur: `npm install --legacy-peer-deps`
9. All UI must be **mobile-first responsive** — test at 375px, 768px, 1280px
10. Target **60 FPS** — use `useGameStore.getState()` (not hooks) inside `useFrame`
11. **No TypeScript `any` types** — use proper typing throughout
12. When in doubt about a design choice, pick the **more impressive** option

---

## 📐 FINAL DELIVERABLE OVERVIEW

A production-grade AAA-quality **3D web-based car racing game** featuring:

### Core Gameplay
- 5 fully modelled cars with unique stats (speed, handling, acceleration, nitro)
- 4 distinct racing tracks (City Circuit, Mountain Pass, Desert Speedway, Neon Nights)
- Realistic car physics: acceleration, braking, steering, drifting, nitro boost
- Lap system with checkpoint validation
- 3 AI opponents per race following the track spline
- F1-style countdown lights start sequence

### Visual Quality
- PBR materials with clearcoat on all cars
- Post-processing: Bloom, Depth of Field, Chromatic Aberration, Vignette
- Dynamic skyboxes per track theme (sunset, night, clear, rain)
- Procedural particle systems: exhaust trails, drift sparks, tire smoke, rain
- Grandstands, advertising boards, kerb strips, animated checkpoint gates

### User System
- Full authentication: Register / Login / Guest Play (localStorage-based)
- Player profile: avatar, username, level/XP system
- Persistent stats: best lap per track, total races, wins, total score
- Leaderboard per track (localStorage JSON persistence)

### HUD & UI
- Glassmorphic HUD with neon accents
- Circular SVG speedometer with animated arc
- Lap timer / best lap display
- Segmented nitro bar
- Canvas-rendered live minimap
- Animated score feed popups
- Race position indicator
- Health/damage bar
- FPS counter (dev mode)
- F1-style countdown lights

### Screens
- Animated loading screen
- Auth screen (login/register/guest)
- Main menu with controls legend
- Car selection (5 cars with stats bars)
- Track selection (4 tracks with SVG previews)
- In-race HUD + pause menu
- Race results / podium screen
- Profile screen with career stats
- Leaderboard screen per track

### Mobile
- Full on-screen touch D-pad + action buttons
- Haptic feedback via Vibration API

---

## 🗂️ COMPLETE FOLDER STRUCTURE

```
apexrush/
├── public/
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Scene.tsx
│   │   │   ├── Car.tsx
│   │   │   ├── CarModel.tsx
│   │   │   ├── AIOpponent.tsx
│   │   │   ├── Track.tsx
│   │   │   ├── Environment.tsx
│   │   │   ├── Effects.tsx
│   │   │   └── CameraController.tsx
│   │   ├── ui/
│   │   │   ├── Speedometer.tsx
│   │   │   ├── LapTimer.tsx
│   │   │   ├── NitroIndicator.tsx
│   │   │   ├── Minimap.tsx
│   │   │   ├── FPSCounter.tsx
│   │   │   ├── ScoreFeed.tsx
│   │   │   ├── RacePosition.tsx
│   │   │   ├── DamageBar.tsx
│   │   │   └── CountdownLights.tsx
│   │   ├── screens/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── MainMenu.tsx
│   │   │   ├── AuthScreen.tsx
│   │   │   ├── CarSelect.tsx
│   │   │   ├── TrackSelect.tsx
│   │   │   ├── RaceResults.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── LeaderboardScreen.tsx
│   │   └── HUD.tsx
│   ├── hooks/
│   │   ├── useKeyboard.ts
│   │   ├── useGameLoop.ts
│   │   ├── useMobileControls.ts
│   │   ├── useAuth.ts
│   │   └── useSound.ts
│   ├── store/
│   │   ├── gameStore.ts
│   │   ├── authStore.ts
│   │   └── leaderboardStore.ts
│   ├── utils/
│   │   ├── physics.ts
│   │   ├── helpers.ts
│   │   ├── textures.ts
│   │   └── trackGeometry.ts
│   ├── types/
│   │   └── game.types.ts
│   ├── data/
│   │   ├── cars.ts
│   │   └── tracks.ts
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

# SUB-PROMPT 1 — Project Scaffold, Configuration & Design System

## Goal
Bootstrap the Vite + React + TypeScript project, install all dependencies, configure Tailwind with a premium neon/racing design system, set up Google Fonts, and verify the dev server runs clean.

---

## Step 1.1 — Create Project

```bash
npm create vite@latest apexrush -- --template react-ts
cd apexrush
```

## Step 1.2 — Install All Dependencies

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install @react-three/cannon
npm install zustand
npm install framer-motion
npm install @headlessui/react clsx
npm install -D @types/three tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

If peer dependency errors occur:
```bash
npm install --legacy-peer-deps
```

## Step 1.3 — `tailwind.config.js`

Replace the file entirely with this design system:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        game: ['"Orbitron"', 'monospace'],
        body: ['"Rajdhani"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        brand: {
          blue:   '#00d4ff',
          purple: '#bf00ff',
          orange: '#ff6600',
          red:    '#ff073a',
          green:  '#39ff14',
          gold:   '#ffd700',
          pink:   '#ff007f',
        },
        surface: {
          900: '#040608',
          800: '#080c10',
          700: '#0d1318',
          600: '#121b24',
          500: '#1a2535',
        },
      },
      boxShadow: {
        'neon-blue':   '0 0 10px #00d4ff, 0 0 20px #00d4ff80, 0 0 40px #00d4ff40',
        'neon-orange': '0 0 10px #ff6600, 0 0 20px #ff660080',
        'neon-green':  '0 0 10px #39ff14, 0 0 20px #39ff1480',
        'neon-red':    '0 0 10px #ff073a, 0 0 20px #ff073a80',
        'neon-gold':   '0 0 10px #ffd700, 0 0 20px #ffd70080',
        'card':        '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-fast':   'pulse 0.5s ease-in-out infinite',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'spin-slow':    'spin 4s linear infinite',
        'glow-blue':    'glowBlue 2s ease-in-out infinite alternate',
        'glow-orange':  'glowOrange 2s ease-in-out infinite alternate',
        'glow-green':   'glowGreen 2s ease-in-out infinite alternate',
        'slide-up':     'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down':   'slideDown 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 0.6s ease-out forwards',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'score-pop':    'scorePop 1.5s ease-out forwards',
        'shimmer':      'shimmer 1.5s infinite',
        'countdown':    'countdownNum 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'scan':         'scan 3s linear infinite',
      },
      keyframes: {
        glowBlue: {
          '0%':   { boxShadow: '0 0 5px #00d4ff40' },
          '100%': { boxShadow: '0 0 15px #00d4ff, 0 0 30px #00d4ff80' },
        },
        glowOrange: {
          '0%':   { boxShadow: '0 0 5px #ff660040' },
          '100%': { boxShadow: '0 0 15px #ff6600, 0 0 30px #ff660080' },
        },
        glowGreen: {
          '0%':   { boxShadow: '0 0 5px #39ff1440' },
          '100%': { boxShadow: '0 0 15px #39ff14, 0 0 30px #39ff1480' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',      opacity: '1' },
        },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn: {
          '0%':   { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        scorePop: {
          '0%':   { transform: 'translateY(0) scale(1)',        opacity: '1' },
          '60%':  { transform: 'translateY(-30px) scale(1.1)',  opacity: '1' },
          '100%': { transform: 'translateY(-60px) scale(0.9)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        countdownNum: {
          '0%':   { transform: 'scale(2.5)', opacity: '0' },
          '30%':  { transform: 'scale(1)',   opacity: '1' },
          '70%':  { transform: 'scale(1)',   opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
```

## Step 1.4 — `src/index.css`

Replace entirely:

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-blue:   #00d4ff;
  --brand-orange: #ff6600;
  --brand-red:    #ff073a;
  --brand-green:  #39ff14;
  --brand-purple: #bf00ff;
  --brand-gold:   #ffd700;
  --surface-900:  #040608;
  --glass-border: rgba(255,255,255,0.10);
  --glass-bg:     rgba(0,0,0,0.45);
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html, body, #root {
  width: 100%; height: 100%; overflow: hidden;
  background: var(--surface-900);
  font-family: 'Rajdhani', sans-serif;
  color: #fff;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
::-webkit-scrollbar-thumb { background: var(--brand-blue); border-radius: 2px; }

canvas { display: block; width: 100% !important; height: 100% !important; }

/* Glass utility classes */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}
.glass-sm {
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
}
.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.40) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  transition: all 0.25s ease;
}
.glass-card:hover {
  border-color: rgba(0,212,255,0.25);
  box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.08);
  transform: translateY(-2px);
}

/* Neon text */
.neon-blue   { color: var(--brand-blue);   text-shadow: 0 0 10px var(--brand-blue),   0 0 20px rgba(0,212,255,0.5); }
.neon-orange { color: var(--brand-orange); text-shadow: 0 0 10px var(--brand-orange), 0 0 20px rgba(255,102,0,0.5); }
.neon-red    { color: var(--brand-red);    text-shadow: 0 0 10px var(--brand-red),    0 0 20px rgba(255,7,58,0.5); }
.neon-green  { color: var(--brand-green);  text-shadow: 0 0 10px var(--brand-green),  0 0 20px rgba(57,255,20,0.5); }
.neon-purple { color: var(--brand-purple); text-shadow: 0 0 10px var(--brand-purple), 0 0 20px rgba(191,0,255,0.5); }
.neon-gold   { color: var(--brand-gold);   text-shadow: 0 0 10px var(--brand-gold),   0 0 20px rgba(255,215,0,0.5); }

/* Buttons */
.btn-primary {
  font-family: 'Orbitron', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.875rem 2.5rem;
  background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05));
  border: 1px solid var(--brand-blue);
  border-radius: 8px;
  color: var(--brand-blue);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0 10px rgba(0,212,255,0.2);
  width: 100%;
}
.btn-primary:hover {
  background: linear-gradient(135deg, rgba(0,212,255,0.25), rgba(0,212,255,0.08));
  box-shadow: 0 0 20px rgba(0,212,255,0.4);
  transform: translateY(-1px);
}
.btn-primary:active { transform: scale(0.97); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn-secondary {
  font-family: 'Orbitron', monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}
.btn-secondary:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.8);
}

.btn-danger {
  font-family: 'Orbitron', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, rgba(255,7,58,0.15), rgba(255,7,58,0.05));
  border: 1px solid var(--brand-red);
  border-radius: 8px;
  color: var(--brand-red);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}
.btn-danger:hover { box-shadow: 0 0 15px rgba(255,7,58,0.3); }

/* Input */
.input-glass {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: white;
  width: 100%;
  transition: all 0.2s ease;
  outline: none;
}
.input-glass:focus {
  border-color: var(--brand-blue);
  box-shadow: 0 0 0 2px rgba(0,212,255,0.15);
  background: rgba(0,212,255,0.05);
}
.input-glass::placeholder { color: rgba(255,255,255,0.25); }

/* Grid background */
.bg-grid {
  background-image:
    linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* HUD typography */
.hud-label { font-family: 'Orbitron', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; }
.hud-value { font-family: 'Share Tech Mono', monospace; font-size: 13px; font-weight: bold; }

/* Shimmer */
.shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Mobile controls */
.mobile-controls { display: none; }
@media (max-width: 768px) { .mobile-controls { display: flex; } }

/* Car & track cards */
.car-card { cursor: pointer; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); border-radius: 16px; }
.car-card.selected { box-shadow: 0 0 0 2px var(--brand-blue), 0 0 30px rgba(0,212,255,0.3); }
.track-card { cursor: pointer; border-radius: 16px; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
.track-card.selected { box-shadow: 0 0 0 2px var(--brand-orange), 0 0 30px rgba(255,102,0,0.3); }

/* Scanline overlay */
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px);
  pointer-events: none;
  z-index: 1;
}
```

## Step 1.5 — `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  optimizeDeps: { exclude: ['@react-three/cannon'] },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three:   ['three'],
          fiber:   ['@react-three/fiber'],
          drei:    ['@react-three/drei'],
          motion:  ['framer-motion'],
          zustand: ['zustand'],
        },
      },
    },
  },
})
```

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
