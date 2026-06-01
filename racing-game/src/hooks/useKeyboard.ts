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
  const { setPhase } = useGameStore()
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
