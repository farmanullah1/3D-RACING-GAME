import { useAuthStore }   from '../../store/authStore'
import { useGameStore }   from '../../store/gameStore'
import { useGarageStore } from '../../store/garageStore'
import { CAR_DEFINITIONS } from '../../data/cars'
import { playUIClick, playUIHover } from '../../utils/audio'
import { statPercent } from '../../utils/helpers'
import type { CarDefinition } from '../../types'

const STAT_LABELS: [keyof import('../../types').CarStats, string, string][] = [
  ['topSpeed',     '🔺 Top Speed',    'bg-neon-blue'],
  ['acceleration', '⚡ Acceleration', 'bg-neon-green'],
  ['handling',     '↩ Handling',      'bg-neon-orange'],
  ['braking',      '⏹ Braking',      'bg-neon-red'],
  ['nitroCapacity','✨ Nitro',         'bg-neon-purple'],
]

export default function CarSelect() {
  const user        = useAuthStore((s) => s.user)
  const { selectCar, setPhase } = useGameStore()
  const { setSelectedCar, selectedCarId } = useGarageStore()

  const selected   = CAR_DEFINITIONS.find(c => c.id === selectedCarId) ?? CAR_DEFINITIONS[0]
  const isUnlocked = (car: CarDefinition) => user?.unlockedCars.includes(car.id) ?? car.unlockRequirement === 0

  const handleSelect = (car: CarDefinition) => {
    if (!isUnlocked(car)) return
    playUIClick()
    setSelectedCar(car.id)
    selectCar(car.id)
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <button className="btn-secondary px-4 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); setPhase('menu') }}>
          ← Back
        </button>
        <h2 className="font-game font-black text-2xl text-white tracking-widest">SELECT CAR</h2>
        <button className="btn-primary px-6 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); setPhase('track_select') }}>
          Next →
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Car grid */}
        <div className="lg:col-span-2 overflow-y-auto pr-2 flex flex-col gap-3 h-full pb-8">
          {CAR_DEFINITIONS.map(car => {
            const unlocked = isUnlocked(car)
            const isSel    = selectedCarId === car.id
            return (
              <div key={car.id}
                className={`glass-card border cursor-pointer transition-all duration-300 p-4 relative overflow-hidden flex items-center justify-between
                  ${isSel ? 'border-neon-blue shadow-neon-blue' : 'border-white/5'}
                  ${!unlocked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-1'}`}
                onClick={() => handleSelect(car)}
                onMouseEnter={playUIHover}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl md:text-5xl select-none">{car.emoji}</div>
                  <div>
                    <h3 className="font-game font-black text-lg text-white">{car.name}</h3>
                    <span className="text-[10px] tracking-widest text-white/40 uppercase">{car.tagline}</span>
                  </div>
                </div>
                {/* Selected indicator */}
                {isSel && (
                  <span className="text-neon-blue font-game text-xs font-black">SELECTED</span>
                )}
                {/* Locked overlay */}
                {!unlocked && (
                  <div className="flex items-center gap-2 text-neon-red font-game text-xs font-black">
                    <span>🔒 Requires {car.unlockRequirement} races</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Selected car detail panel */}
        <div className="glass border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-full bg-ui-surface overflow-y-auto">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{selected.emoji}</div>
              <div>
                <h3 className="font-game font-black text-xl text-white">{selected.name}</h3>
                <span className="text-[10px] tracking-widest text-neon-blue uppercase font-bold">{selected.tagline}</span>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed mb-6 font-medium">
              {selected.description}
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-4">
              {STAT_LABELS.map(([key, label, colorClass]) => {
                const val = selected.stats[key]
                const pct = key === 'topSpeed'
                  ? statPercent(val, 220)
                  : key === 'nitroCapacity'
                  ? statPercent(val, 150)
                  : statPercent(val)
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] uppercase font-semibold">
                      <span className="text-white/60">{label}</span>
                      <span className="font-mono font-bold text-white">
                        {key === 'topSpeed' ? `${selected.stats.topSpeed} km/h`
                          : key === 'nitroCapacity' ? `${selected.stats.nitroCapacity}`
                          : `${selected.stats[key]}/10`}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Unlock status */}
          {!isUnlocked(selected) && (
            <div className="glass border border-neon-red px-4 py-3 rounded-xl text-center text-xs font-game font-bold text-neon-red mt-6">
              🔒 Requires {selected.unlockRequirement} races · {selected.price.toLocaleString()} XP
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
