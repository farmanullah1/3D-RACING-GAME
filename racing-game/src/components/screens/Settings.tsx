import { useSettingsStore } from '../../store/settingsStore'
import { useGameStore } from '../../store/gameStore'
import { playUIClick } from '../../utils/audio'

export default function Settings() {
  const setPhase = useGameStore((s) => s.setPhase)
  const settings = useSettingsStore()

  return (
    <div className="absolute inset-0 flex flex-col bg-ui-bg grid-bg scanlines overflow-hidden z-30 p-4 select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-slide-down">
        <button className="btn-secondary px-4 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); setPhase('menu') }}>
          ← Back
        </button>
        <h2 className="font-game font-black text-2xl text-white tracking-widest">SETTINGS</h2>
        <button className="btn-primary px-4 py-2 cursor-pointer w-auto" onClick={() => { playUIClick(); settings.resetSettings() }}>
          Reset
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pb-12 animate-scale-in">
        {/* Graphics settings */}
        <div className="glass border border-white/10 rounded-2xl p-6 bg-ui-surface flex flex-col gap-5">
          <h3 className="font-game font-black text-xs text-neon-blue uppercase tracking-widest border-b border-white/5 pb-2 mb-2">
            🖥️ Graphics Configuration
          </h3>

          {/* Quality preset */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-game font-bold text-white/60 uppercase tracking-widest text-[9px]">Quality Preset</span>
            <div className="flex gap-1.5">
              {(['low', 'medium', 'high'] as const).map(q => (
                <button
                  key={q}
                  onClick={() => { playUIClick(); settings.updateGraphics({ quality: q }) }}
                  className={`font-game text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                    settings.graphics.quality === q ? 'bg-neon-blue/10 border-neon-blue text-neon-blue' : 'border-white/5 text-white/40'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Shadows toggle */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-game font-bold text-white/60 uppercase tracking-widest text-[9px]">Dynamic Shadows</span>
            <button
              onClick={() => { playUIClick(); settings.updateGraphics({ shadows: !settings.graphics.shadows }) }}
              className={`font-game text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border transition-all cursor-pointer ${
                settings.graphics.shadows ? 'bg-neon-green/10 border-neon-green text-neon-green' : 'border-white/5 text-white/40'
              }`}
            >
              {settings.graphics.shadows ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Post-processing toggle */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-game font-bold text-white/60 uppercase tracking-widest text-[9px]">Post Processing Effects</span>
            <button
              onClick={() => { playUIClick(); settings.updateGraphics({ postProcessing: !settings.graphics.postProcessing }) }}
              className={`font-game text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border transition-all cursor-pointer ${
                settings.graphics.postProcessing ? 'bg-neon-green/10 border-neon-green text-neon-green' : 'border-white/5 text-white/40'
              }`}
            >
              {settings.graphics.postProcessing ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Display minimap */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-game font-bold text-white/60 uppercase tracking-widest text-[9px]">Show Minimap</span>
            <button
              onClick={() => { playUIClick(); settings.updateDisplay({ showMinimap: !settings.display.showMinimap }) }}
              className={`font-game text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border transition-all cursor-pointer ${
                settings.display.showMinimap ? 'bg-neon-green/10 border-neon-green text-neon-green' : 'border-white/5 text-white/40'
              }`}
            >
              {settings.display.showMinimap ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Display FPS counter */}
          <div className="flex justify-between items-center text-xs">
            <span className="font-game font-bold text-white/60 uppercase tracking-widest text-[9px]">Show FPS Counter</span>
            <button
              onClick={() => { playUIClick(); settings.updateDisplay({ showFPS: !settings.display.showFPS }) }}
              className={`font-game text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border transition-all cursor-pointer ${
                settings.display.showFPS ? 'bg-neon-green/10 border-neon-green text-neon-green' : 'border-white/5 text-white/40'
              }`}
            >
              {settings.display.showFPS ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Audio settings */}
        <div className="glass border border-white/10 rounded-2xl p-6 bg-ui-surface flex flex-col gap-5">
          <h3 className="font-game font-black text-xs text-neon-orange uppercase tracking-widest border-b border-white/5 pb-2 mb-2">
            🔊 Sound Options
          </h3>

          {/* Master volume */}
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between items-center uppercase tracking-widest text-[9px] text-white/60">
              <span>Master Volume</span>
              <span className="font-mono font-bold">{Math.round(settings.audio.masterVolume * 100)}%</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.05"
              value={settings.audio.masterVolume}
              onChange={e => settings.updateAudio({ masterVolume: parseFloat(e.target.value) })}
              className="w-full accent-neon-orange"
            />
          </div>

          {/* Engine volume */}
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between items-center uppercase tracking-widest text-[9px] text-white/60">
              <span>Engine Exhaust pitch growl</span>
              <span className="font-mono font-bold">{Math.round(settings.audio.engineVolume * 100)}%</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.05"
              value={settings.audio.engineVolume}
              onChange={e => settings.updateAudio({ engineVolume: parseFloat(e.target.value) })}
              className="w-full accent-neon-orange"
            />
          </div>

          {/* Music volume */}
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between items-center uppercase tracking-widest text-[9px] text-white/60">
              <span>Radio Music volume</span>
              <span className="font-mono font-bold">{Math.round(settings.audio.musicVolume * 100)}%</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.05"
              value={settings.audio.musicVolume}
              onChange={e => settings.updateAudio({ musicVolume: parseFloat(e.target.value) })}
              className="w-full accent-neon-orange"
            />
          </div>

          {/* Muted toggle */}
          <div className="flex justify-between items-center text-xs mt-2 border-t border-white/5 pt-4">
            <span className="font-game font-bold text-white/60 uppercase tracking-widest text-[9px]">Mute All Audio</span>
            <button
              onClick={() => { playUIClick(); settings.updateAudio({ muted: !settings.audio.muted }) }}
              className={`font-game text-[9px] uppercase tracking-widest px-3.5 py-1.5 rounded-md border transition-all cursor-pointer ${
                settings.audio.muted ? 'bg-neon-red/10 border-neon-red text-neon-red' : 'border-white/5 text-white/40'
              }`}
            >
              {settings.audio.muted ? 'MUTED' : 'UNMUTED'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
