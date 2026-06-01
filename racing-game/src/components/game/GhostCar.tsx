import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { loadReplay } from '../../hooks/useReplay'
import { useGameStore } from '../../store/gameStore'

/**
 * Ghost car: plays back the stored best lap as a semi-transparent blue car.
 */
export default function GhostCar() {
  const groupRef  = useRef<THREE.Group>(null)
  const trackId   = useGameStore((s) => s.selectedTrackId)
  const ghostOn   = useGameStore((s) => s.ghostActive)
  const [frames, setFrames] = useState<import('../../types').ReplayFrame[]>([])
  const raceStart = useRef(0)

  useEffect(() => {
    const replay = loadReplay(trackId)
    if (replay) setFrames(replay.frames)
    raceStart.current = Date.now()
  }, [trackId])

  useFrame(() => {
    if (!groupRef.current || !ghostOn || frames.length === 0) return
    const phase = useGameStore.getState().phase
    if (phase !== 'racing') return

    const elapsed = Date.now() - raceStart.current
    // Binary search for current frame
    let lo = 0, hi = frames.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (frames[mid].t < elapsed) lo = mid + 1; else hi = mid
    }
    const f = frames[Math.min(lo, frames.length - 1)]
    groupRef.current.position.set(f.px, f.py, f.pz)
    groupRef.current.rotation.set(f.rx, f.ry, f.rz)
  })

  if (!ghostOn || frames.length === 0) return null

  return (
    <group ref={groupRef}>
      {/* Semi-transparent simple mock car shape for ghost */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.4, 0.4, 3.6]} />
        <meshStandardMaterial color="#00aaff" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.55, -0.3]}>
        <boxGeometry args={[1.0, 0.35, 1.8]} />
        <meshStandardMaterial color="#00aaff" transparent opacity={0.35} roughness={0.1} />
      </mesh>
    </group>
  )
}
