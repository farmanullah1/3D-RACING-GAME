import { useRef, useCallback } from 'react'
import type { ReplayFrame, ReplayData } from '../types'

const REPLAY_KEY = 'apexrush_best_replay'
const RECORD_INTERVAL = 50  // ms between frames (20fps recording)

/**
 * Replay system: records car positions during a lap, saves best, plays back as ghost.
 */
export function useReplay(trackId: string, carId: string) {
  const recording = useRef<ReplayFrame[]>([])
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
