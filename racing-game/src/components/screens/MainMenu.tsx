import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { TRACKS } from '../../utils/tracks'
import { CARS } from '../../utils/cars'

export default function MainMenu() {
  const setPhase = useGameStore((s) => s.setPhase)
  const highScore = useGameStore((s) => s.game.highScore)
  const isNightMode = useGameStore((s) => s.game.isNightMode)
  const isMuted = useGameStore((s) => s.game.isMuted)
  const selectedTrackId = useGameStore((s) => s.game.selectedTrackId)
  const selectedCarId = useGameStore((s) => s.game.selectedCarId)
  const toggleNightMode = useGameStore((s) => s.toggleNightMode)
  const toggleMuted = useGameStore((s) => s.toggleMuted)
  const setSelectedTrackId = useGameStore((s) => s.setSelectedTrackId)
  const setSelectedCarId = useGameStore((s) => s.setSelectedCarId)

  const [showTrackSelect, setShowTrackSelect] = useState(false)
  const [showCarSelect, setShowCarSelect] = useState(false)

  const handleStart = () => {
    setPhase('countdown')
    setTimeout(() => setPhase('racing'), 3000)
  }

  const activeTrack = TRACKS[selectedTrackId] || TRACKS[0]
  const activeCar = CARS[selectedCarId] || CARS[0]

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in select-none">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="font-game font-black text-6xl md:text-8xl neon-text-blue tracking-wider mb-2">
          APEX<span className="neon-text-orange">RUSH</span>
        </h1>
        <p className="font-game text-white/40 text-sm md:text-base uppercase tracking-[0.5em]">
          3D Racing Experience
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <p className="font-game text-[9px] text-white/50 uppercase tracking-widest">
            Track: <span className="neon-text-blue font-bold">{activeTrack.name}</span>
          </p>
          <p className="font-game text-[9px] text-white/50 uppercase tracking-widest">
            Vehicle: <span className="neon-text-green font-bold" style={{ color: activeCar.color }}>{activeCar.name}</span>
          </p>
        </div>
        {highScore > 0 && (
          <p className="font-game text-sm neon-text-orange mt-2">
            🏆 Best Score: {highScore.toLocaleString()}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs px-4">
        <button
          onClick={handleStart}
          className="font-game font-bold text-sm uppercase tracking-widest py-4 px-8 glass-panel border neon-border-blue neon-text-blue hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer"
          style={{ letterSpacing: '0.3em' }}
        >
          ▶ Start Race
        </button>
        <div className="flex gap-2.5">
          <button
            className="flex-1 font-game text-[10px] uppercase tracking-widest py-3 px-2 glass-panel border border-white/10 text-white/60 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
            onClick={() => setShowTrackSelect(true)}
          >
            🗺️ Track
          </button>
          <button
            className="flex-1 font-game text-[10px] uppercase tracking-widest py-3 px-2 glass-panel border border-white/10 text-white/60 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
            onClick={() => setShowCarSelect(true)}
          >
            🏎️ Vehicle
          </button>
        </div>
        <button
          className="font-game text-xs uppercase tracking-widest py-3 px-8 glass-panel border border-white/10 text-white/40 hover:text-white/70 transition-all duration-200 cursor-pointer active:scale-95"
          onClick={() => alert('Leaderboard — Global rankings coming in V2!')}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* Settings Row */}
      <div className="flex gap-3 w-full max-w-xs px-4 mt-3">
        <button
          onClick={toggleNightMode}
          className={`flex-1 font-game text-[11px] uppercase tracking-wider py-2.5 px-3 glass-panel border hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer ${
            isNightMode ? 'neon-border-orange neon-text-orange' : 'border-white/10 text-white/50'
          }`}
        >
          {isNightMode ? '🌙 Night' : '☀️ Day'}
        </button>
        <button
          onClick={toggleMuted}
          className={`flex-1 font-game text-[11px] uppercase tracking-wider py-2.5 px-3 glass-panel border hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer ${
            isMuted ? 'neon-border-red neon-text-red' : 'neon-border-blue neon-text-blue'
          }`}
        >
          {isMuted ? '🔇 Muted' : '🔊 Sound'}
        </button>
      </div>

      {/* Controls hint */}
      <div className="mt-8 glass-panel border border-white/10 p-4 max-w-sm mx-4">
        <p className="font-game text-[9px] text-white/30 uppercase tracking-widest mb-2 text-center">Controls</p>
        <div className="grid grid-cols-2 gap-1 text-[10px] font-game text-white/50">
          <span>↑ / W</span><span className="text-white/30">Accelerate</span>
          <span>↓ / S</span><span className="text-white/30">Brake / Reverse</span>
          <span>← → / A D</span><span className="text-white/30">Steer</span>
          <span>SPACE</span><span className="text-white/30">Nitro Boost</span>
          <span>SHIFT</span><span className="text-white/30">Drift</span>
          <span>ESC / P</span><span className="text-white/30">Pause</span>
        </div>
      </div>

      {/* Track Selection Overlay Modal */}
      {showTrackSelect && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in p-4 overflow-y-auto pointer-events-auto">
          <div className="glass-panel border neon-border-blue max-w-2xl w-full p-6 relative flex flex-col my-8 select-none pointer-events-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowTrackSelect(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white font-game text-xs border border-white/10 hover:border-white/30 rounded-md px-2.5 py-1 glass-panel active:scale-95 transition-all cursor-pointer"
            >
              ✕ Close
            </button>

            <h2 className="font-game font-black text-2xl neon-text-blue mb-1 tracking-wider text-center uppercase">
              Select Circuit
            </h2>
            <p className="font-game text-[9px] text-white/30 tracking-[0.3em] text-center mb-6 uppercase">
              Choose your racing landscape
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {TRACKS.map((track) => {
                const isEquipped = selectedTrackId === track.id
                const diffColor =
                  track.difficulty === 'Easy'
                    ? '#39ff14'
                    : track.difficulty === 'Medium'
                    ? '#ff6600'
                    : '#ff073a'

                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedTrackId(track.id)}
                    className={`glass-panel border p-4 flex flex-col cursor-pointer active:scale-[0.98] transition-all hover:bg-white/5 ${
                      isEquipped
                        ? 'neon-border-blue border-2'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-game font-bold text-xs text-white tracking-wide">
                        {track.name}
                      </span>
                      <span
                        className="font-game font-bold text-[8px] px-1.5 py-0.5 rounded border uppercase"
                        style={{
                          borderColor: diffColor,
                          color: diffColor,
                          boxShadow: `0 0 6px ${diffColor}40`,
                        }}
                      >
                        {track.difficulty}
                      </span>
                    </div>

                    <p className="font-game text-[10px] text-white/45 leading-relaxed flex-1 mb-4">
                      {track.description}
                    </p>

                    <div className="h-px bg-white/10 my-2" />

                    <div className="flex justify-between items-center text-[10px] font-game text-white/30">
                      <span>Multiplier</span>
                      <span className="font-bold text-white/80">{track.scoreMultiplier.toFixed(1)}x</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Active Track Highlight Details */}
            {(() => {
              const active = TRACKS[selectedTrackId] || TRACKS[0]
              return (
                <div className="glass-panel-bright border border-white/10 p-4 rounded-lg animate-slide-in">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-game font-bold text-sm text-white uppercase tracking-wider">
                      🛠️ {active.name} Specifications
                    </h3>
                    <span className="font-game text-xs neon-text-orange font-bold">
                      🏆 Score Multiplier: {active.scoreMultiplier}x
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {active.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="font-game text-[8px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase"
                      >
                        🏁 {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })()}

            <button
              onClick={() => setShowTrackSelect(false)}
              className="mt-6 font-game font-bold text-xs uppercase tracking-widest py-3 px-8 glass-panel border neon-border-blue neon-text-blue hover:bg-white/10 transition-all text-center mx-auto block active:scale-95 cursor-pointer"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}

      {/* Vehicle Selection Overlay Modal */}
      {showCarSelect && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in p-4 overflow-y-auto pointer-events-auto">
          <div className="glass-panel border neon-border-blue max-w-2xl w-full p-6 relative flex flex-col my-8 select-none pointer-events-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowCarSelect(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white font-game text-xs border border-white/10 hover:border-white/30 rounded-md px-2.5 py-1 glass-panel active:scale-95 transition-all cursor-pointer"
            >
              ✕ Close
            </button>

            <h2 className="font-game font-black text-2xl neon-text-blue mb-1 tracking-wider text-center uppercase">
              Select Vehicle
            </h2>
            <p className="font-game text-[9px] text-white/30 tracking-[0.3em] text-center mb-6 uppercase">
              Equip your racing machine
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {CARS.map((car) => {
                const isEquipped = selectedCarId === car.id
                return (
                  <div
                    key={car.id}
                    onClick={() => setSelectedCarId(car.id)}
                    className={`glass-panel border p-4 flex flex-col cursor-pointer active:scale-[0.98] transition-all hover:bg-white/5 ${
                      isEquipped
                        ? 'border-2'
                        : 'border-white/10'
                    }`}
                    style={{
                      borderColor: isEquipped ? car.color : '',
                      boxShadow: isEquipped ? `0 0 10px ${car.color}40` : ''
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-game font-bold text-xs text-white tracking-wide">
                        {car.name}
                      </span>
                      <span
                        className="font-game font-bold text-[8px] px-1.5 py-0.5 rounded border uppercase"
                        style={{
                          borderColor: car.color,
                          color: car.color,
                          boxShadow: `0 0 6px ${car.color}40`,
                        }}
                      >
                        {car.modelName}
                      </span>
                    </div>

                    <p className="font-game text-[10px] text-white/45 leading-relaxed flex-1 mb-4">
                      {car.description}
                    </p>

                    <div className="h-px bg-white/10 my-2" />

                    {/* Stats mini bar grid */}
                    <div className="space-y-1">
                      {/* Speed */}
                      <div className="flex items-center text-[8.5px] font-game text-white/30">
                        <span className="w-16">Top Speed</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded overflow-hidden flex gap-0.5">
                          <div className="h-full bg-white/70" style={{ width: `${car.stats.speed}%`, backgroundColor: car.color }} />
                        </div>
                      </div>
                      {/* Handling */}
                      <div className="flex items-center text-[8.5px] font-game text-white/30">
                        <span className="w-16">Handling</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded overflow-hidden flex gap-0.5">
                          <div className="h-full bg-white/70" style={{ width: `${car.stats.handling}%`, backgroundColor: car.color }} />
                        </div>
                      </div>
                      {/* Acceleration */}
                      <div className="flex items-center text-[8.5px] font-game text-white/30">
                        <span className="w-16">Accel</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded overflow-hidden flex gap-0.5">
                          <div className="h-full bg-white/70" style={{ width: `${car.stats.acceleration}%`, backgroundColor: car.color }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Active Car Highlight Details */}
            {(() => {
              const active = CARS[selectedCarId] || CARS[0]
              return (
                <div className="glass-panel-bright border border-white/10 p-4 rounded-lg animate-slide-in">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-game font-bold text-sm text-white uppercase tracking-wider">
                      🏎️ {active.name} Technical Specs
                    </h3>
                    <span className="font-game text-xs font-bold" style={{ color: active.color }}>
                      🔥 Max Velocity: {active.physics.maxSpeed} KM/H
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="font-game text-[8px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      ⚡ Accel Rate: {active.physics.acceleration} km/h/s
                    </span>
                    <span className="font-game text-[8px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      🎯 Handling: {active.physics.steeringSpeed} rad/s
                    </span>
                    <span className="font-game text-[8px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      ⏳ Nitro Burn: {active.physics.nitroDrain}% /s (lower is better)
                    </span>
                  </div>
                </div>
              )
            })()}

            <button
              onClick={() => setShowCarSelect(false)}
              className="mt-6 font-game font-bold text-xs uppercase tracking-widest py-3 px-8 glass-panel border neon-border-blue neon-text-blue hover:bg-white/10 transition-all text-center mx-auto block active:scale-95 cursor-pointer"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
