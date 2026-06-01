/**
 * Physics engine for ApexRush Pro.
 * All calculations are frame-rate independent via delta-time.
 * Units: km/h for speed, radians for angles, seconds for time.
 */

export const PHYSICS = {
  // Base stats (modified by car definition)
  MAX_SPEED:          200,
  REVERSE_SPEED:      60,
  BASE_ACCELERATION:  55,
  BASE_BRAKING:       110,
  FRICTION_COAST:     22,
  FRICTION_DRIFT:     18,
  BASE_STEERING:      2.4,
  DRIFT_STEERING:     3.8,
  NITRO_DRAIN:        22,
  NITRO_RECHARGE:     10,
  MIN_DRIFT_SPEED:    55,
  DAMAGE_PER_IMPACT:  8,
  DAMAGE_SPEED_MULT:  0.04,
  ENGINE_RPM_MAX:     8000,
  ENGINE_RPM_IDLE:    800,
} as const

/** Compute speed change for one frame */
export function computeSpeedDelta(opts: {
  speed: number
  forward: boolean; backward: boolean; brake: boolean
  nitroActive: boolean; nitroFuel: number
  carTopSpeed: number; carAccel: number; carBraking: number
  surfaceFriction: number   // 0.5=sand, 0.7=wet, 1.0=dry
  damageRatio: number       // 0–1, reduces performance
  delta: number
}): number {
  const { speed, forward, backward, brake, nitroActive, nitroFuel, delta } = opts
  const perf  = 1 - opts.damageRatio * 0.5  // damage reduces power
  const nitro = (nitroActive && nitroFuel > 2) ? 1.0 : 0
  const accel = opts.carAccel * 6 * PHYSICS.BASE_ACCELERATION * perf * opts.surfaceFriction
  const brk   = opts.carBraking * 0.1 * PHYSICS.BASE_BRAKING * perf
  const top   = opts.carTopSpeed * (1 + nitro * 0.5) * perf

  if (forward) {
    const deficit = Math.max(0, top - speed)
    return Math.min(accel * delta, deficit)
  }
  if (backward || brake) {
    if (speed > 0) return -Math.min(brk * delta, speed)
    if (backward)  return -Math.min(accel * 0.5 * delta, PHYSICS.REVERSE_SPEED + speed)
  }
  // Coasting friction
  if (speed > 0) return -Math.min(PHYSICS.FRICTION_COAST * opts.surfaceFriction * delta, speed)
  if (speed < 0) return  Math.min(PHYSICS.FRICTION_COAST * opts.surfaceFriction * delta, -speed)
  return 0
}

/** Compute steering rotation delta */
export function computeSteering(opts: {
  speed: number; left: boolean; right: boolean
  isDrifting: boolean; driftFactor: number
  turningRadius: number; delta: number
}): number {
  if (!opts.left && !opts.right) return 0
  if (Math.abs(opts.speed) < 3) return 0
  const dir    = opts.left ? 1 : -1
  const spFact = Math.min(Math.abs(opts.speed) / 80, 1)
  const rate   = opts.isDrifting
    ? PHYSICS.DRIFT_STEERING * opts.driftFactor
    : PHYSICS.BASE_STEERING  * opts.turningRadius / 2.5
  const sign   = opts.speed < 0 ? -1 : 1
  return dir * rate * spFact * opts.delta * sign
}

/** Should drift activate? */
export function checkDrift(speed: number, driftKey: boolean, isTurning: boolean, driftFactor: number): boolean {
  return driftKey && driftFactor > 0.3 && Math.abs(speed) > PHYSICS.MIN_DRIFT_SPEED && isTurning
}

/** Surface friction multiplier */
export function getSurfaceFriction(surface: string): number {
  return ({ asphalt: 1.0, wet_asphalt: 0.72, gravel: 0.65, sand: 0.5, ice: 0.3 } as Record<string, number>)[surface] ?? 1.0
}

/** Engine RPM from speed */
export function getEngineRPM(speed: number, maxSpeed: number): number {
  const ratio = Math.abs(speed) / maxSpeed
  return PHYSICS.ENGINE_RPM_IDLE + (PHYSICS.ENGINE_RPM_MAX - PHYSICS.ENGINE_RPM_IDLE) * ratio
}

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
export const lerp  = (a: number, b: number, t: number) => a + (b - a) * t
export const lerpAngle = (a: number, b: number, t: number) => {
  const diff = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI
  return a + diff * t
}
