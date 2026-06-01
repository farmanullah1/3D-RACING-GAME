/**
 * Physics utility functions for car simulation.
 * All values are in SI units unless noted.
 */

// ─── Constants ─────────────────────────────────────────────────────────────────
export const PHYSICS = {
  MAX_SPEED: 200,          // km/h
  MAX_REVERSE_SPEED: 60,   // km/h
  ACCELERATION: 60,        // km/h per second
  BRAKING: 120,            // km/h per second
  FRICTION: 30,            // km/h per second (natural deceleration)
  STEERING_SPEED: 2.5,     // radians per second
  DRIFT_STEERING: 4.0,     // radians per second (while drifting)
  DRIFT_FRICTION: 0.97,    // multiplier per frame
  NITRO_MULTIPLIER: 1.8,   // speed multiplier
  NITRO_DRAIN: 25,         // nitro % per second
  NITRO_RECHARGE: 12,      // nitro % per second (auto recharge)
  DRIFT_SCORE_PER_SECOND: 10,
  MIN_DRIFT_SPEED: 60,     // km/h minimum to initiate drift
}

/**
 * Compute acceleration delta for a given frame.
 * @param currentSpeed - current speed in km/h
 * @param isForward - whether forward key is held
 * @param isBackward - whether backward key is held
 * @param isBrake - whether brake key is held
 * @param isNitro - whether nitro is active
 * @param nitroAvailable - whether nitro fuel remains
 * @param delta - frame time in seconds
 */
export function computeSpeedDelta(
  currentSpeed: number,
  isForward: boolean,
  isBackward: boolean,
  isBrake: boolean,
  isNitro: boolean,
  nitroAvailable: boolean,
  delta: number
): number {
  const nitroBoost = (isNitro && nitroAvailable) ? PHYSICS.NITRO_MULTIPLIER : 1.0
  let acceleration = 0

  if (isForward) {
    acceleration = PHYSICS.ACCELERATION * nitroBoost
  } else if (isBackward) {
    if (currentSpeed > 0) {
      acceleration = -PHYSICS.BRAKING  // braking while going forward
    } else {
      acceleration = -PHYSICS.ACCELERATION * 0.6  // reverse
    }
  } else if (isBrake) {
    acceleration = currentSpeed > 0 ? -PHYSICS.BRAKING * 1.5 : PHYSICS.BRAKING * 1.5
  } else {
    // Natural friction deceleration
    const frictionDir = currentSpeed > 0 ? -1 : 1
    acceleration = frictionDir * PHYSICS.FRICTION
    // Snap to 0 if near-zero
    if (Math.abs(currentSpeed) < PHYSICS.FRICTION * delta) return 0
  }

  return acceleration * delta
}

/**
 * Compute steering rotation delta.
 */
export function computeSteeringDelta(
  currentSpeed: number,
  isLeft: boolean,
  isRight: boolean,
  isDrifting: boolean,
  delta: number
): number {
  if (!isLeft && !isRight) return 0
  if (Math.abs(currentSpeed) < 2) return 0  // no steering when stopped

  const direction = isLeft ? 1 : -1
  const speedFactor = Math.min(Math.abs(currentSpeed) / 80, 1)  // speed-sensitive steering
  const steeringRate = isDrifting ? PHYSICS.DRIFT_STEERING : PHYSICS.STEERING_SPEED
  return direction * steeringRate * speedFactor * delta * (currentSpeed < 0 ? -1 : 1)
}

/**
 * Check whether drift should activate.
 */
export function shouldDrift(
  speed: number,
  isDriftKeyHeld: boolean,
  isTurning: boolean
): boolean {
  return isDriftKeyHeld && Math.abs(speed) > PHYSICS.MIN_DRIFT_SPEED && isTurning
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Linear interpolation.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
