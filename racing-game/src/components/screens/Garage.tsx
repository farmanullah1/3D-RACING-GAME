import { useAuthStore }   from '../../store/authStore'
import { useGameStore }   from '../../store/gameStore'
import { useGarageStore } from '../../store/garageStore'
import { CAR_DEFINITIONS } from '../../data/cars'
import { playUIClick, playUIHover } from '../../utils/audio'

const COLORS = ['#c0392b','#00d4ff','#ff6600','#8000ff','#39ff14','#ff00aa',
                '#ffffff','#111111','#ffe600','#00ff88','#ff8800','#0066ff']

function UpgradePips({ level }: { level: number }) {
  return (
    <div className="flex gap-1.5 items-center">
      {[0,1,2].map(i => (
        <div key={i} className={`w-3.5 h-3.5 rounded-full border transition-all ${
          i < level ? 'bg-neon-blue border-neon-blue shadow-neon-blue' : 'border-white/20 bg-transparent'
        }`} />
      ))}
    </div>
  )
}

export default function Garage() {
  const user = useAuthStore((s) => s.user)
  const setPhase = useGameStore((s) => s.setPhase)
  
  const { selectedCarId, setSelectedCar, setCarColor, upgradeComponent, getEntry } = useGarageStore()
  const { addXP, unlockCar } = useAuthStore()

  const carDef = CAR_DEFINITIONS.find(c => c.id === selectedCarId) ?? CAR_DEFINITIONS[0]
  const entry  = getEntry(selectedCarId)

  const isUnlocked = (id: string) => user?.unlockedCars.includes(id) ?? id === 'phantom_gt'

  const handleUpgrade = (comp: 'engine' | 'tires' | 'nitro' | 'aero') => {
    if (!user) return
    const cost = (entry.upgrades[comp] + 1) * 300
    if (user.xp >= cost && entry.upgrades[comp] < 3) {
      playUIClick()
      addXP(-cost)
      upgradeComponent(selectedCarId, comp)
    }
  }

  const handleUnlock = (id: string) => {
    if (!user) return
    const cost = CAR_DEFINITIONS.find(c => c.id === id)?.price ?? 0
    if (user.xp >= cost) {
      playUIClick()
      unlockCar(id)
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <button className="btn-secondary px-4 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); setPhase('menu') }}>
          ← Back
        </button>
        <h2 className="font-game font-black text-2xl text-white tracking-widest">GARAGE</h2>
        <div className="text-right">
          <span className="font-game text-[9px] uppercase tracking-widest text-white/40 block">XP Balance</span>
          <span className="font-mono text-neon-green font-bold text-sm">{(user?.xp ?? 0).toLocaleString()} XP</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Owned car grid */}
        <div className="lg:col-span-1 overflow-y-auto pr-2 flex flex-col gap-3 h-full pb-8">
          {CAR_DEFINITIONS.map(car => {
            const owned = isUnlocked(car.id)
            const isSel = selectedCarId === car.id
            return (
              <div key={car.id}
                onClick={() => { setSelectedCar(car.id); playUIClick() }}
                onMouseEnter={playUIHover}
                className={`glass-card border p-4 cursor-pointer relative overflow-hidden transition-all flex items-center justify-between
                  ${isSel ? 'border-neon-blue shadow-neon-blue' : 'border-white/5'}
                  ${!owned ? 'opacity-50 grayscale' : 'hover:-translate-y-0.5'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl select-none">{car.emoji}</span>
                  <div>
                    <h3 className="font-game font-black text-sm text-white">{car.name}</h3>
                    <span className="text-[8px] tracking-widest text-white/30 uppercase">{car.tagline}</span>
                  </div>
                </div>
                {!owned && (
                  <span className="font-game text-[8px] font-black text-neon-red bg-neon-red/10 px-2 py-0.5 rounded-md">LOCKED</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Customization Details & Upgrades */}
        <div className="lg:col-span-2 glass border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 bg-ui-surface overflow-y-auto h-full pb-8">
          {/* Left panel: Car swatches */}
          <div className="flex-1 flex flex-col gap-5 border-r border-white/5 pr-0 md:pr-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{carDef.emoji}</span>
              <div>
                <h3 className="font-game font-black text-xl text-white">{carDef.name}</h3>
                <span className="text-[10px] tracking-widest text-neon-blue font-bold uppercase">{carDef.tagline}</span>
              </div>
            </div>

            {isUnlocked(carDef.id) ? (
              <div className="flex flex-col gap-4">
                <span className="font-game font-black text-[9px] uppercase tracking-wider text-white/50">Car Color</span>
                <div className="grid grid-cols-6 gap-2">
                  {COLORS.map(c => (
                    <button key={c}
                      onClick={() => { setCarColor(selectedCarId, c); playUIClick() }}
                      className="w-8 h-8 rounded-full border border-white/15 cursor-pointer relative flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{ backgroundColor: c }}
                    >
                      {entry.color === c && (
                        <div className="w-2.5 h-2.5 bg-black rounded-full border border-white/50" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass border border-neon-red p-4 rounded-xl flex flex-col gap-3 mt-4 text-center">
                <span className="font-game font-black text-neon-red text-sm">🔒 CAR LOCKED</span>
                <span className="text-[10px] text-white/60 font-semibold leading-relaxed">
                  Requires {carDef.unlockRequirement} races to unlock or buy directly with XP.
                </span>
                <button
                  onClick={() => handleUnlock(carDef.id)}
                  disabled={(user?.xp ?? 0) < carDef.price}
                  className="btn-primary py-2.5 text-xs font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Unlock for {carDef.price.toLocaleString()} XP
                </button>
              </div>
            )}
          </div>

          {/* Right panel: Component upgrades */}
          <div className="flex-1 flex flex-col gap-5 justify-between">
            <div className="flex flex-col gap-4">
              <span className="font-game font-black text-[9px] uppercase tracking-wider text-white/50">Performance Upgrades</span>
              {(['engine','tires','nitro','aero'] as const).map(comp => {
                const currentLevel = entry.upgrades[comp]
                const cost = (currentLevel + 1) * 300
                const isMax = currentLevel >= 3
                return (
                  <div key={comp} className="flex justify-between items-center glass border border-white/5 p-3 rounded-xl">
                    <div className="flex flex-col gap-1">
                      <span className="font-game font-black text-[9px] uppercase text-white/60 tracking-wider capitalize">{comp}</span>
                      <UpgradePips level={currentLevel} />
                    </div>
                    {isUnlocked(carDef.id) && (
                      <button
                        onClick={() => handleUpgrade(comp)}
                        disabled={isMax || (user?.xp ?? 0) < cost}
                        className={`text-[9px] font-game font-black uppercase py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                          isMax ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-neon-blue/15 text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/25'
                        }`}
                      >
                        {isMax ? 'MAXED' : `+ ${cost} XP`}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
