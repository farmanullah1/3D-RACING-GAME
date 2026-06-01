import { create } from 'zustand'
import { subscribeWithSelector, persist } from 'zustand/middleware'
import type { User } from '../types'
import { CAR_DEFINITIONS } from '../data/cars'

// ── Fake auth helpers ────────────────────────────────────────────────────────
function generateId(): string { return Math.random().toString(36).slice(2, 10) }
function makeToken(userId: string): string { return btoa(`${userId}:${Date.now()}`) }

function makeUser(username: string, email: string): User {
  return {
    id: generateId(),
    username,
    email,
    avatar: ['🦊','🐆','🐺','🦁','🐉','🦅','🦋','🐬'][Math.floor(Math.random() * 8)],
    createdAt: Date.now(),
    totalRaces: 0,
    totalWins: 0,
    unlockedCars: ['phantom_gt', 'volt_racer'],
    garageColors: { phantom_gt: '#c0392b', volt_racer: '#00d4ff' },
    bestLapTimes: {},
    xp: 0,
    level: 1,
  }
}

function xpToLevel(xp: number): number { return Math.floor(Math.sqrt(xp / 100)) + 1 }

// ── All users stored in localStorage ────────────────────────────────────────
const USERS_KEY = 'apexrush_users'
const getAllUsers = (): Record<string, User> => JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
const saveUser = (user: User) => {
  const all = getAllUsers()
  all[user.id] = user
  localStorage.setItem(USERS_KEY, JSON.stringify(all))
}

export interface AuthActions {
  login:       (email: string, password: string) => Promise<void>
  register:    (username: string, email: string, password: string) => Promise<void>
  loginGuest:  () => void
  logout:      () => void
  updateUser:  (partial: Partial<User>) => void
  addXP:       (amount: number) => void
  unlockCar:   (carId: string) => void
  completeRace: (trackId: string, lapTime: number, won: boolean) => void
  clearError:  () => void
}

export const useAuthStore = create<any>()(
  persist(
    subscribeWithSelector<any, any>((set, get) => ({
      user:      null,
      token:     null,
      isGuest:   false,
      isLoading: false,
      error:     null,

      login: async (email: string, _password?: string) => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 600))  // simulate network
        const all = getAllUsers()
        const user = Object.values(all).find(u => u.email === email)
        // In fake auth, any password works if email exists
        if (!user) { set({ isLoading: false, error: 'Account not found' }); return }
        const token = makeToken(user.id)
        set({ user, token, isGuest: false, isLoading: false, error: null })
      },

      register: async (username: string, email: string, _password?: string) => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 800))
        const all = getAllUsers()
        if (Object.values(all).some(u => u.email === email)) {
          set({ isLoading: false, error: 'Email already registered' }); return
        }
        const user = makeUser(username, email)
        saveUser(user)
        const token = makeToken(user.id)
        set({ user, token, isGuest: false, isLoading: false, error: null })
      },

      loginGuest: () => {
        const guest = makeUser('Guest_' + generateId().toUpperCase().slice(0,5), 'guest@local')
        set({ user: guest, token: null, isGuest: true, error: null })
      },

      logout: () => set({ user: null, token: null, isGuest: false }),

      updateUser: (partial: Partial<User>) => {
        const user = get().user
        if (!user) return
        const updated = { ...user, ...partial }
        if (!get().isGuest) saveUser(updated)
        set({ user: updated })
      },

      addXP: (amount: number) => {
        const user = get().user
        if (!user) return
        const newXP = user.xp + amount
        get().updateUser({ xp: newXP, level: xpToLevel(newXP) })
      },

      unlockCar: (carId: string) => {
        const user = get().user
        if (!user || user.unlockedCars.includes(carId)) return
        const carDef = CAR_DEFINITIONS.find(c => c.id === carId)
        if (!carDef || user.xp < carDef.price) return
        get().updateUser({
          unlockedCars: [...user.unlockedCars, carId],
          xp: user.xp - carDef.price,
          garageColors: { ...user.garageColors, [carId]: carDef.defaultColor },
        })
      },

      completeRace: (trackId: string, lapTime: number, won: boolean) => {
        const user = get().user
        if (!user) return
        const prevBest = user.bestLapTimes[trackId] ?? Infinity
        const newBest = lapTime < prevBest ? lapTime : prevBest
        get().updateUser({
          totalRaces: user.totalRaces + 1,
          totalWins:  won ? user.totalWins + 1 : user.totalWins,
          bestLapTimes: { ...user.bestLapTimes, [trackId]: newBest },
        })
      },

      clearError: () => set({ error: null }),
    })),
    {
      name:    'apexrush_auth',
      partialize: (s: any) => ({ user: s.user, token: s.token, isGuest: s.isGuest }),
    }
  )
)
