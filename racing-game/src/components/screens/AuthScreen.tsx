import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useGameStore }  from '../../store/gameStore'
import { isValidEmail }  from '../../utils/helpers'
import { playUIClick }   from '../../utils/audio'

type Tab = 'login' | 'register'

export default function AuthScreen() {
  const [tab,        setTab]    = useState<Tab>('login')
  const [email,      setEmail]  = useState('')
  const [password,   setPass]   = useState('')
  const [username,   setUser]   = useState('')
  const [fieldErrors, setFErrs] = useState<Record<string, string>>({})

  const { login, register, loginGuest, isLoading, error, clearError } = useAuthStore()
  const setPhase = useGameStore((s) => s.setPhase)

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!isValidEmail(email))      errs.email    = 'Invalid email address'
    if (password.length < 4)       errs.password = 'Min 4 characters'
    if (tab === 'register' && username.length < 2) errs.username = 'Min 2 characters'
    setFErrs(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    if (!validate()) return
    playUIClick()
    if (tab === 'login') await login(email, password)
    else                 await register(username, email, password)
    
    // Check if login succeeded by checking errors in store
    const currentError = useAuthStore.getState().error
    if (!currentError) {
      setPhase('menu')
    }
  }

  const handleGuest = () => { playUIClick(); loginGuest(); setPhase('menu') }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ui-bg grid-bg scanlines overflow-hidden z-30">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[25%] w-80 h-80 rounded-full bg-neon-blue/10 blur-[80px]" />
        <div className="absolute bottom-[20%] right-[25%] w-90 h-90 rounded-full bg-neon-purple/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md p-4 animate-scale-in z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-game font-black text-4xl text-white tracking-widest leading-none">
            APEXRUSH
          </h1>
          <span className="font-game text-[10px] tracking-[0.4em] text-neon-blue font-bold">
            PRO RACING
          </span>
        </div>

        {/* Card */}
        <div className="glass border border-white/10 rounded-2xl overflow-hidden shadow-glass-lg">
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            {(['login','register'] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); clearError(); setFErrs({}); playUIClick() }}
                className={`flex-1 font-game text-xs uppercase tracking-widest py-3.5 transition-all duration-200 cursor-pointer
                  ${tab === t ? 'bg-neon-blue/10 text-neon-blue font-bold border-b border-neon-blue' : 'text-white/40 hover:text-white/60'}`}>
                {t === 'login' ? '🔑 Login' : '✨ Register'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            {tab === 'register' && (
              <div className="flex flex-col gap-1">
                <input className={`game-input ${fieldErrors.username ? 'error' : ''}`}
                  placeholder="Username" value={username}
                  onChange={e => setUser(e.target.value)} autoComplete="username" />
                {fieldErrors.username && <span className="text-[10px] text-neon-red font-bold">{fieldErrors.username}</span>}
              </div>
            )}
            
            <div className="flex flex-col gap-1">
              <input className={`game-input ${fieldErrors.email ? 'error' : ''}`}
                placeholder="Email" type="email" value={email}
                onChange={e => setEmail(e.target.value)} autoComplete="email" />
              {fieldErrors.email && <span className="text-[10px] text-neon-red font-bold">{fieldErrors.email}</span>}
            </div>
            
            <div className="flex flex-col gap-1">
              <input className={`game-input ${fieldErrors.password ? 'error' : ''}`}
                placeholder="Password" type="password" value={password}
                onChange={e => setPass(e.target.value)} autoComplete={tab==='login'?'current-password':'new-password'} />
              {fieldErrors.password && <span className="text-[10px] text-neon-red font-bold">{fieldErrors.password}</span>}
            </div>

            {/* Global error */}
            {error && (
              <div className="glass border border-neon-red px-4 py-2 text-neon-red text-center text-xs font-semibold rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn-primary w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
                  {tab === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : tab === 'login' ? '→ Sign In' : '→ Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="px-6 pb-2 flex items-center justify-center gap-3">
            <div className="h-[1px] bg-white/5 flex-1" />
            <span className="text-[9px] uppercase tracking-widest text-white/20">or</span>
            <div className="h-[1px] bg-white/5 flex-1" />
          </div>

          {/* Guest mode */}
          <div className="p-6 pt-2">
            <button onClick={handleGuest} className="btn-secondary w-full text-center py-3">
              👤 Continue as Guest
            </button>
            <div className="text-[9px] text-white/30 text-center tracking-wider mt-3 uppercase">
              Guest progress is not saved
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
