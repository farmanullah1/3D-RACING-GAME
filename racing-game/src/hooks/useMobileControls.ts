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
