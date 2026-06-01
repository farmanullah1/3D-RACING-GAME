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
