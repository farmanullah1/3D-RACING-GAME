import Speedometer from './ui/Speedometer'
import LapTimer    from './ui/LapTimer'
import NitroBar    from './ui/NitroBar'
import Minimap     from './ui/Minimap'
import PositionIndicator from './ui/PositionIndicator'
import DamageBar   from './ui/DamageBar'
import ScoreFeed   from './ui/ScoreFeed'
import FPSCounter  from './ui/FPSCounter'
import { useMobileControls } from '../hooks/useMobileControls'
import { useGameStore } from '../store/gameStore'
import type { Controls } from '../types'

// ─── Touch Button ──────────────────────────────────────────────────────────────
function TB({ label, k, cls='' }: { label:string; k:keyof Controls; cls?:string }) {
  const { press, release } = useMobileControls()
  return (
    <button
      className={`glass border border-white/20 font-game font-bold text-white text-2xl
        select-none touch-none rounded-xl transition-all active:scale-90 active:bg-white/20 flex items-center justify-center ${cls}`}
      onPointerDown={press(k)} onPointerUp={release(k)} onPointerLeave={release(k)}
    >
      {label}
    </button>
  )
}

// ─── Pause Panel ───────────────────────────────────────────────────────────────
function PauseOverlay() {
  const setPhase = useGameStore((s) => s.setPhase)
  const resetRace = useGameStore((s) => s.resetRace)
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md pointer-events-auto z-40">
      <div className="glass border border-neon-blue p-8 max-w-sm w-full text-center">
        <h2 className="font-game font-black text-4xl neon-blue mb-2 tracking-widest">PAUSED</h2>
        <p className="font-game text-white/40 text-xs uppercase tracking-widest mb-6">Press ESC to resume</p>
        <div className="flex flex-col gap-3">
          <button className="btn-primary w-full cursor-pointer" onClick={() => setPhase('racing')}>▶ Resume</button>
          <button className="btn-secondary w-full cursor-pointer" onClick={() => resetRace()}>⏹ Quit Race</button>
        </div>
      </div>
    </div>
  )
}

// ─── Main HUD ──────────────────────────────────────────────────────────────────
export default function HUD() {
  const phase = useGameStore((s) => s.phase)
  if (!['racing','countdown','paused'].includes(phase)) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-20 p-3 md:p-4 flex flex-col justify-between select-none">
      {/* ── Top row ─────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start w-full">
        {/* Top-left: Lap + Score */}
        <div className="pointer-events-auto flex flex-col gap-2">
          <LapTimer />
        </div>
        {/* Top-center: Score feed */}
        <div className="flex-1 flex justify-center pointer-events-none mt-2">
          <ScoreFeed />
        </div>
        {/* Top-right: Minimap + FPS */}
        <div className="pointer-events-auto flex flex-col gap-2 items-end">
          <Minimap />
          <FPSCounter />
        </div>
      </div>

      {/* ── Center: Position indicator ──────────────────────────────── */}
      <div className="absolute top-[40%] left-4 pointer-events-auto">
        <PositionIndicator />
      </div>

      {/* ── Bottom row ──────────────────────────────────────────────── */}
      <div className="flex justify-between items-end w-full">
        {/* Bottom-left: Nitro + Damage */}
        <div className="pointer-events-auto flex flex-col gap-2">
          <NitroBar />
          <DamageBar />
        </div>

        {/* Bottom-center: keyboard hint (desktop) */}
        <div className="hidden md:flex glass border border-white/8 px-4 py-2 rounded-xl text-center">
          <span className="font-game text-[9px] text-white/20 uppercase tracking-widest">
            ↑↓←→ Drive · SPACE Nitro · SHIFT Drift · ESC Pause
          </span>
        </div>

        {/* Bottom-right: Speedometer */}
        <div className="pointer-events-auto">
          <Speedometer />
        </div>
      </div>

      {/* ── Mobile Touch Controls ───────────────────────────────────── */}
      <div className="mobile-controls absolute bottom-4 left-0 right-0 pointer-events-auto px-4 flex justify-between items-end md:hidden">
        {/* D-pad */}
        <div className="grid gap-1" style={{ gridTemplate:'repeat(2,56px)/repeat(3,56px)' }}>
          <div />
          <TB label="▲" k="forward" cls="w-14 h-14" />
          <div />
          <TB label="◄" k="left" cls="w-14 h-14" />
          <TB label="▼" k="backward" cls="w-14 h-14" />
          <TB label="►" k="right" cls="w-14 h-14" />
        </div>
        {/* Action buttons */}
        <div className="flex flex-col gap-2 items-center">
          <TB label="⚡" k="nitro" cls="w-16 h-16 rounded-full border-neon-orange" />
          <TB label="🔥" k="drift" cls="w-14 h-14 rounded-full border-neon-red" />
        </div>
      </div>

      {/* ── Pause overlay ────────────────────────────────────────────── */}
      {phase === 'paused' && <PauseOverlay />}
    </div>
  )
}
