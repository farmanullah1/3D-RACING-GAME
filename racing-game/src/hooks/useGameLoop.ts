import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'

/**
 * Master game loop — runs inside Canvas, frame-rate independent.
 * Updates FPS counter and auto-adjusts quality.
 */
export function useGameLoop() {
  const buf = useRef<number[]>([])
  const lastFpsTime = useRef(0)

  useFrame((_, delta) => {
    const { phase, updateFPS } = useGameStore.getState()
    if (phase !== 'racing') return

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
