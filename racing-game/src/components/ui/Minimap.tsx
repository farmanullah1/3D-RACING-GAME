import { useEffect, useRef } from 'react'
import { useGameStore } from '../../store/gameStore'
import { getTrack } from '../../data/tracks'

const SIZE = 140

export default function Minimap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const carPos    = useGameStore((s) => s.car.position)
  const carRot    = useGameStore((s) => s.car.rotation[1])
  const trackId   = useGameStore((s) => s.selectedTrackId)
  const track     = getTrack(trackId)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const cx = SIZE/2, cy = SIZE/2
    const pts = track.controlPoints

    // Find track bounds for scaling
    const xs = pts.map(p => p[0]), zs = pts.map(p => p[2])
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minZ = Math.min(...zs), maxZ = Math.max(...zs)
    const rangeX = maxX - minX || 1, rangeZ = maxZ - minZ || 1
    const scale  = (SIZE - 24) / Math.max(rangeX, rangeZ)

    const toMap = (x: number, z: number) => ({
      x: cx + (x - (minX + rangeX/2)) * scale,
      y: cy + (z - (minZ + rangeZ/2)) * scale,
    })

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // BG circle
      ctx.fillStyle = 'rgba(5,5,20,0.8)'
      ctx.beginPath(); ctx.arc(cx,cy,cx-1,0,Math.PI*2); ctx.fill()

      // Circular clip
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,cx-3,0,Math.PI*2); ctx.clip()

      // Draw track outline (thick)
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      ctx.lineWidth   = track.trackWidth * scale * 0.9
      ctx.lineCap     = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath()
      pts.forEach((p, i) => {
        const m = toMap(p[0], p[2])
        i === 0 ? ctx.moveTo(m.x, m.y) : ctx.lineTo(m.x, m.y)
      })
      ctx.closePath(); ctx.stroke()

      // Track center line
      ctx.strokeStyle = track.accentColor + '60'
      ctx.lineWidth   = 1.5; ctx.setLineDash([4,4])
      ctx.beginPath()
      pts.forEach((p, i) => {
        const m = toMap(p[0], p[2])
        i === 0 ? ctx.moveTo(m.x, m.y) : ctx.lineTo(m.x, m.y)
      })
      ctx.closePath(); ctx.stroke(); ctx.setLineDash([])

      // Start line
      const sp = toMap(pts[0][0], pts[0][2])
      ctx.fillStyle = '#00d4ff'; ctx.shadowColor = '#00d4ff'; ctx.shadowBlur = 6
      ctx.fillRect(sp.x-4, sp.y-2, 8, 4); ctx.shadowBlur = 0

      // Car indicator
      const cp = toMap(carPos[0], carPos[2])
      ctx.save()
      ctx.translate(cp.x, cp.y)
      ctx.rotate(-carRot + Math.PI)
      ctx.fillStyle = '#ff073a'
      ctx.shadowColor = '#ff073a'; ctx.shadowBlur = 8
      ctx.beginPath(); ctx.moveTo(0,-6); ctx.lineTo(4,4); ctx.lineTo(0,2); ctx.lineTo(-4,4); ctx.closePath()
      ctx.fill(); ctx.shadowBlur = 0
      ctx.restore()

      // Radar sweep overlay
      const sweepAngle = (Date.now() / 3000) * Math.PI * 2
      ctx.strokeStyle = track.accentColor + '30'; ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx,cy); ctx.arc(cx,cy,cx-3,sweepAngle,sweepAngle+0.6)
      ctx.closePath(); ctx.stroke()

      ctx.restore()

      // Border ring
      ctx.strokeStyle = track.accentColor + '60'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.arc(cx,cy,cx-2,0,Math.PI*2); ctx.stroke()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [carPos, carRot, track])

  return (
    <div className="hud-panel w-36 h-36 flex flex-col justify-between items-center border border-white/10 p-2 select-none">
      <div className="flex justify-between items-center w-full text-[8px] uppercase tracking-widest text-white/50">
        <span>Radar</span>
        <span className="text-neon-green font-bold">◉ Live</span>
      </div>
      <canvas ref={canvasRef} width={SIZE} height={SIZE} className="w-[110px] h-[110px]" />
    </div>
  )
}
