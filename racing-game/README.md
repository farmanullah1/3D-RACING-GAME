# 🏎️ ApexRush — 3D Web Racing Game

ApexRush is a high-performance, visually stunning 3D car racing game built for the web. Experience realistic car physics, drifting mechanics, and nitro boosts on a custom-designed circuit with glassmorphic HUD and modern post-processing effects.

## 🚀 Live Demo
[apexrush.vercel.app](https://apexrush.vercel.app) (Placeholder)

## ✨ Features
- ✅ **Realistic Car Physics:** Acceleration, braking, and steering simulation.
- ✅ **Drifting Mechanics:** High-speed drift with lateral slide and visual sparks.
- ✅ **Nitro System:** Depletable and auto-recharging nitro boost with visual trails.
- ✅ **Dynamic Track:** Closed-loop circuit with barriers, trees, and checkpoints.
- ✅ **Glassmorphic HUD:** Modern UI panels for Speedometer, Lap Timer, Nitro Bar, and Minimap.
- ✅ **Adaptive Quality:** Real-time FPS monitoring and quality scaling (Low/Medium/High).
- ✅ **Post-Processing FX:** Bloom, Depth of Field, Chromatic Aberration, and Vignette.
- ✅ **Mobile Optimized:** On-screen touch controls for mobile play.
- ✅ **Persistent Stats:** High score tracking via localStorage.

## 🛠️ Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Three.js](https://img.shields.io/badge/three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## 🎮 Controls
| Key | Action |
|-----|--------|
| `↑` / `W` | Accelerate |
| `↓` / `S` | Brake / Reverse |
| `←` `→` / `A` `D` | Steer |
| `SPACE` | Nitro Boost |
| `SHIFT` | Drift |
| `ESC` / `P` | Pause Game |

## 📦 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/apexrush.git
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 🗂️ Project Structure
```
racing-game/
├── src/
│   ├── components/
│   │   ├── game/      # 3D Scene components (Car, Track, Environment)
│   │   ├── ui/        # HUD elements (Speedometer, Minimap, etc.)
│   │   ├── screens/   # UI Overlays (Menu, Loading, Game Over)
│   ├── hooks/         # Custom React hooks for game logic and input
│   ├── store/         # Zustand global state management
│   ├── utils/         # Physics, helpers, and procedural textures
│   └── types/         # TypeScript definitions
```

## 🏎️ Portfolio Highlights
- **PBR Materials:** Realistic car paint with clearcoat and metalness.
- **Procedural Textures:** Dynamically generated asphalt and grass textures using Canvas API.
- **Smooth Camera:** Lerp-interpolated follow camera with speed-based FOV/offset.
- **High Performance:** Optimized for 60 FPS using frame-independent movement and adaptive resolution.

---
Built with ❤️ by Gemini CLI
