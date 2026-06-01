/**
 * Web Audio API engine — procedural engine sound, drift, nitro, UI sfx.
 * No external audio files needed.
 */

let ctx: AudioContext | null = null
let engineOsc: OscillatorNode | null = null
let engineGain: GainNode | null = null

function getCtx(): AudioContext {
  if (!ctx) {
    // Standard AudioContext or webkitAudioContext for cross-platform compatibility
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return ctx
}

/** Initialize engine oscillator (call once on first user interaction) */
export function initAudio() {
  const ac = getCtx()
  if (engineOsc) return

  engineGain = ac.createGain()
  engineGain.gain.value = 0

  // Detuned sawtooth for engine growl
  engineOsc = ac.createOscillator()
  engineOsc.type = 'sawtooth'
  engineOsc.frequency.value = 60

  // Filter to soften harsh edges
  const filter = ac.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 800

  engineOsc.connect(filter)
  filter.connect(engineGain)
  engineGain.connect(ac.destination)
  engineOsc.start()
}

/** Update engine sound based on RPM (call every frame) */
export function updateEngineSound(rpm: number, volume: number) {
  try {
    const ac = getCtx()
    if (ac.state === 'suspended') {
      return // Don't play if context is suspended by browser autoplay policy
    }
    if (!engineOsc || !engineGain) return
    const freq = 40 + (rpm / 8000) * 280
    engineOsc.frequency.setTargetAtTime(freq, ac.currentTime, 0.05)
    engineGain.gain.setTargetAtTime(volume * 0.15, ac.currentTime, 0.05)
  } catch (err) {
    // Silent catch if context is not started or ready
  }
}

/** One-shot sound burst */
function playBurst(freq: number, duration: number, type: OscillatorType = 'square', vol = 0.3) {
  try {
    const ac = getCtx()
    if (ac.state === 'suspended') return
    const osc  = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(vol, ac.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration)
    osc.connect(gain); gain.connect(ac.destination)
    osc.start(); osc.stop(ac.currentTime + duration)
  } catch (err) {
    // Silent catch
  }
}

export const playNitroSound   = () => playBurst(220, 0.4, 'sawtooth', 0.2)
export const playDriftSound   = () => playBurst(180, 0.15, 'square', 0.1)
export const playCollision    = () => playBurst(80,  0.3, 'square', 0.4)
export const playCheckpoint   = () => { playBurst(880, 0.1, 'sine', 0.2); setTimeout(() => playBurst(1100, 0.1, 'sine', 0.15), 100) }
export const playLapComplete  = () => { [523, 659, 784, 1047].forEach((f,i) => setTimeout(() => playBurst(f, 0.2, 'sine', 0.2), i*120)) }
export const playUIClick      = () => playBurst(440, 0.05, 'sine', 0.1)
export const playUIHover      = () => playBurst(660, 0.03, 'sine', 0.06)
export const playCountdown    = (n: number) => playBurst(n === 0 ? 1100 : 550, n === 0 ? 0.4 : 0.2, 'sine', 0.3)
export const playUnlock       = () => { [440,554,659,880].forEach((f,i) => setTimeout(() => playBurst(f, 0.15, 'sine', 0.25), i*100)) }

export function muteAudio(muted: boolean) {
  if (engineGain) engineGain.gain.value = muted ? 0 : 0.15
}
