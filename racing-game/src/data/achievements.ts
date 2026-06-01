import type { Achievement } from '../types'

export const ACHIEVEMENTS: Omit<Achievement, 'unlocked'>[] = [
  {
    id: 'first_race',
    name: 'First Blood',
    description: 'Complete your first race',
    icon: '🏁',
    xpReward: 100,
    condition: (u) => u.totalRaces >= 1,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Reach 200 km/h',
    icon: '💨',
    xpReward: 200,
    condition: (_, r) => r.car.speed >= 200,
  },
  {
    id: 'drift_king',
    name: 'Drift King',
    description: 'Accumulate 60s of drift time',
    icon: '🔥',
    xpReward: 300,
    condition: (_, r) => r.car.isDrifting,
  },
  {
    id: 'clean_streak',
    name: 'Clean Machine',
    description: 'Complete 3 clean laps',
    icon: '✨',
    xpReward: 250,
    condition: (u) => u.totalRaces >= 3,
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Race Night Neon track',
    icon: '🌙',
    xpReward: 150,
    condition: (_, r) => r.selectedTrackId === 'night_neon',
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Unlock 4 cars',
    icon: '🗝️',
    xpReward: 500,
    condition: (u) => u.unlockedCars.length >= 4,
  },
  {
    id: 'neon_blaze_owner',
    name: 'Elite Driver',
    description: 'Unlock Neon Blaze',
    icon: '✨',
    xpReward: 1000,
    condition: (u) => u.unlockedCars.includes('neon_blaze'),
  },
  {
    id: 'perfect_lap',
    name: 'Perfect Lap',
    description: 'Beat a track record',
    icon: '🏆',
    xpReward: 500,
    condition: (_u, r) => r.bestLapTime > 0 && r.bestLapTime < (RECORDS[r.selectedTrackId] ?? Infinity),
  },
]

const RECORDS: Record<string, number> = {
  city_circuit: 78000,
  mountain_pass: 115000,
  desert_dunes: 92000,
  night_neon: 88000,
}
