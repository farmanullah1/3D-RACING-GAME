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
