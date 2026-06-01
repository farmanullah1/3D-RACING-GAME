import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GarageEntry } from '../types'

export interface GarageStore {
  entries: Record<string, GarageEntry>
  selectedCarId: string
  setSelectedCar: (id: string) => void
  setCarColor: (carId: string, color: string) => void
  upgradeComponent: (carId: string, component: keyof GarageEntry['upgrades']) => void
  getEntry: (carId: string) => GarageEntry
}

const defaultEntry = (carId: string, color: string): GarageEntry => ({
  carId, color,
  upgrades: { engine: 0, tires: 0, nitro: 0, aero: 0 },
})

export const useGarageStore = create<any>()(
  persist(
    (set, get) => ({
      entries: {
        phantom_gt: defaultEntry('phantom_gt', '#c0392b'),
        volt_racer: defaultEntry('volt_racer', '#00d4ff'),
      },
      selectedCarId: 'phantom_gt',

      setSelectedCar: (id: string) => set({ selectedCarId: id }),

      setCarColor: (carId: string, color: string) =>
        set((s: any) => ({
          entries: {
            ...s.entries,
            [carId]: { ...get().getEntry(carId), color },
          },
        })),

      upgradeComponent: (carId: string, component: keyof GarageEntry['upgrades']) =>
        set((s: any) => {
          const entry = get().getEntry(carId)
          if (entry.upgrades[component] >= 3) return s
          return {
            entries: {
              ...s.entries,
              [carId]: {
                ...entry,
                upgrades: { ...entry.upgrades, [component]: entry.upgrades[component] + 1 },
              },
            },
          }
        }),

      getEntry: (carId: string) =>
        get().entries[carId] ?? defaultEntry(carId, '#ffffff'),
    }),
    { name: 'apexrush_garage' }
  )
)
