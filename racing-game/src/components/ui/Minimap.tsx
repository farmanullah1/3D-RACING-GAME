import { useEffect, useRef, useMemo } from 'react'
import { useGameStore } from '../../store/gameStore'
import { TRACKS } from '../../utils/tracks'

export default function Minimap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const carPos = useGameStore((s) => s.car.position)
  const carRot = useGameStore((s) => s.car.rotation.y)
  const selectedTrackId = useGameStore((s) => s.game.selectedTrackId)

  const SIZE = 130
  
  const activeTrack = useMemo(() => {
    return TRACKS[selectedTrackId] || TRACKS[0]
  }, [selectedTrackId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      const cx = SIZE / 2, cy = SIZE / 2

      // Background
      ctx.fillStyle = 'rgba(0,0,0,0.6)'
      ctx.beginPath()
      ctx.arc(cx, cy, cx - 2, 0, Math.PI * 2)
      ctx.fill()

      // Circular clip
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, cx - 4, 0, Math.PI * 2)
      ctx.clip()

      // Draw track outline dynamically from track points
      ctx.strokeStyle = 'rgba(100,100,100,0.5)'
      ctx.lineWidth = 8
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      
      activeTrack.points.forEach(([x, , z], i) => {
        const mx = cx + x * 0.65
        const my = cy + z * 0.58
        if (i === 0) ctx.moveTo(mx, my)
        else ctx.lineTo(mx, my)
      })
      ctx.closePath()
      ctx.stroke()

      // Track center line
      ctx.strokeStyle = activeTrack.decorations === 'city' ? '#bf00ff60' : '#00d4ff40'
      ctx.lineWidth = 3
      ctx.setLineDash([4, 4])
      ctx.stroke()
      ctx.setLineDash([])

      // Start line
      const startPt = activeTrack.points[0]
      const smx = cx + startPt[0] * 0.65
      const smy = cy + startPt[2] * 0.58
      ctx.fillStyle = '#00d4ff'
      ctx.shadowColor = '#00d4ff'
      ctx.shadowBlur = 6
      ctx.fillRect(smx - 4, smy - 2, 8, 4)
      ctx.shadowBlur = 0

      // Car dot
      const mapX = cx + carPos.x * 0.65
      const mapY = cy + carPos.z * 0.58

      // Car direction arrow
      ctx.save()
      ctx.translate(mapX, mapY)
      ctx.rotate(-carRot)
      ctx.fillStyle = '#ff073a'
      ctx.shadowColor = '#ff073a'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.moveTo(0, -6)
      ctx.lineTo(4, 4)
      ctx.lineTo(0, 2)
      ctx.lineTo(-4, 4)
      ctx.closePath()
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.restore()

      ctx.restore()

      // Border ring
      ctx.strokeStyle = activeTrack.decorations === 'city' ? 'rgba(191,0,255,0.4)' : 'rgba(0,212,255,0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, cx - 3, 0, Math.PI * 2)
      ctx.stroke()
    }

    const interval = setInterval(draw, 50) // 20fps for minimap
    return () => clearInterval(interval)
  }, [carPos, carRot, activeTrack])

  return (
    <div className={`glass-panel border p-1.5 ${activeTrack.decorations === 'city' ? 'neon-border-purple' : 'neon-border-blue'}`}>
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="font-game text-[9px] text-white/40 uppercase tracking-widest">Map</span>
        <span className={`font-game text-[9px] ${activeTrack.decorations === 'city' ? 'neon-text-purple' : 'neon-text-blue'}`}>◉ Live</span>
      </div>
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        style={{ borderRadius: '50%', display: 'block' }}
      />
    </div>
  )
}
