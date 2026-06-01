import { useEffect, useRef } from 'react'
import { useGameStore } from '../../store/gameStore'

/**
 * Procedurally synthesizes engine sounds using the Web Audio API.
 * Modulates pitch and volume dynamically based on speed and nitro status.
 * Bypasses chrome/safari autoplay blocking by resuming on user interaction.
 */
export default function EngineAudio() {
  const speed = useGameStore((s) => s.car.speed)
  const isNitro = useGameStore((s) => s.car.isNitroActive)
  const phase = useGameStore((s) => s.game.phase)
  const isMuted = useGameStore((s) => s.game.isMuted)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const mainGainRef = useRef<GainNode | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const nitroOscRef = useRef<OscillatorNode | null>(null)
  const nitroGainRef = useRef<GainNode | null>(null)

  // Initialize audio context and nodes
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return

    const audioCtx = new AudioContextClass()
    audioCtxRef.current = audioCtx

    // Main volume gain
    const mainGain = audioCtx.createGain()
    mainGain.gain.setValueAtTime(0.0, audioCtx.currentTime)
    mainGainRef.current = mainGain

    // Lowpass filter to muffle detuned oscillators for a throatier engine rumble
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(280, audioCtx.currentTime)
    filter.Q.setValueAtTime(2.0, audioCtx.currentTime)

    // Osc 1: Deep rumble (triangle)
    const osc1 = audioCtx.createOscillator()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(45, audioCtx.currentTime)
    osc1Ref.current = osc1

    // Osc 2: Upper exhaust exhaust hum (sawtooth)
    const osc2 = audioCtx.createOscillator()
    osc2.type = 'sawtooth'
    osc2.frequency.setValueAtTime(65, audioCtx.currentTime)
    osc2Ref.current = osc2

    // Nitro: roar sound (sawtooth at high pitch with rapid filter decay)
    const nitroOsc = audioCtx.createOscillator()
    nitroOsc.type = 'sawtooth'
    nitroOsc.frequency.setValueAtTime(140, audioCtx.currentTime)
    nitroOscRef.current = nitroOsc

    const nitroGain = audioCtx.createGain()
    nitroGain.gain.setValueAtTime(0.0, audioCtx.currentTime)
    nitroGainRef.current = nitroGain

    // Connect nodes
    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(mainGain)

    nitroOsc.connect(nitroGain)
    nitroGain.connect(mainGain)

    mainGain.connect(audioCtx.destination)

    // Start oscillators
    osc1.start()
    osc2.start()
    nitroOsc.start()

    return () => {
      try {
        osc1.stop()
        osc2.stop()
        nitroOsc.stop()
      } catch (e) {}
      audioCtx.close()
    }
  }, [])

  // Handle play/pause states & global mute settings
  useEffect(() => {
    const audioCtx = audioCtxRef.current
    const mainGain = mainGainRef.current
    if (!audioCtx || !mainGain) return

    const active = (phase === 'racing' || phase === 'countdown') && !isMuted

    if (active) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      mainGain.gain.setTargetAtTime(0.12, audioCtx.currentTime, 0.15)
    } else {
      mainGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.1)
    }
  }, [phase, isMuted])

  // Modulate engine pitch based on car speed
  useEffect(() => {
    const audioCtx = audioCtxRef.current
    const osc1 = osc1Ref.current
    const osc2 = osc2Ref.current
    const nitroGain = nitroGainRef.current
    const nitroOsc = nitroOscRef.current

    if (!audioCtx || !osc1 || !osc2 || !nitroGain || !nitroOsc) return

    const absSpeed = Math.abs(speed)
    const ratio = Math.min(absSpeed / 200, 1)

    // Dynamically calculate pitch relative to speed
    const baseFreq = 42 + ratio * 150
    const buzzFreq = 62 + ratio * 240

    osc1.frequency.setTargetAtTime(baseFreq, audioCtx.currentTime, 0.08)
    osc2.frequency.setTargetAtTime(buzzFreq, audioCtx.currentTime, 0.08)

    // Modulate nitro boost rumble
    if (isNitro && !isMuted) {
      nitroGain.gain.setTargetAtTime(0.1, audioCtx.currentTime, 0.05)
      nitroOsc.frequency.setTargetAtTime(260 + Math.sin(audioCtx.currentTime * 50) * 15, audioCtx.currentTime, 0.03)
    } else {
      nitroGain.gain.setTargetAtTime(0.0, audioCtx.currentTime, 0.1)
    }
  }, [speed, isNitro, isMuted])

  // Resume Web Audio on user gesture to address Autoplay policies
  useEffect(() => {
    const handleUserGesture = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
    }

    window.addEventListener('click', handleUserGesture)
    window.addEventListener('keydown', handleUserGesture)

    return () => {
      window.removeEventListener('click', handleUserGesture)
      window.removeEventListener('keydown', handleUserGesture)
    }
  }, [])

  return null
}
