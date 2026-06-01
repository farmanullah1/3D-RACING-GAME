import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import type { Controls } from '../types'

const KEY_MAP: Record<string, keyof Controls> = {
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
