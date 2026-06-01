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
