/**
 * Helper functions for ApexRush Pro.
 */

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
