/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ── Typography ──────────────────────────────────────────────────
      fontFamily: {
        game:    ['"Orbitron"', 'monospace'],
        display: ['"Rajdhani"', 'sans-serif'],
        mono:    ['"Share Tech Mono"', 'monospace'],
      },
      // ── Design Tokens ───────────────────────────────────────────────
      colors: {
        // Neon accents
        neon: {
          blue:   '#00d4ff',
          cyan:   '#00ffff',
          green:  '#39ff14',
          lime:   '#b4ff00',
          red:    '#ff073a',
          pink:   '#ff00aa',
          orange: '#ff6600',
          yellow: '#ffe600',
          purple: '#bf00ff',
          white:  '#f0f8ff',
        },
        // Glass surfaces
        glass: {
          50:  'rgba(255,255,255,0.05)',
          100: 'rgba(255,255,255,0.08)',
          200: 'rgba(255,255,255,0.12)',
          300: 'rgba(255,255,255,0.18)',
          dark:    'rgba(0,0,0,0.50)',
          darker:  'rgba(0,0,0,0.70)',
          border:  'rgba(255,255,255,0.13)',
          borderHi:'rgba(255,255,255,0.25)',
        },
        // Game UI backgrounds
        ui: {
          bg:      '#050510',
          surface: '#0a0a1f',
          panel:   '#0f0f2a',
          accent:  '#1a1a3e',
          hover:   '#252550',
        },
        // Track themes
        track: {
          city:     '#00d4ff',
          mountain: '#39ff14',
          desert:   '#ff6600',
          neon:     '#bf00ff',
        },
        // Car colors
        car: {
          phantom: '#c0392b',
          volt:    '#00d4ff',
          inferno: '#ff6600',
          shadow:  '#8000ff',
          arctic:  '#a8d8ea',
          neonblaze: '#39ff14',
        },
      },
      // ── Box Shadows (neon glow) ──────────────────────────────────────
      boxShadow: {
        'neon-blue':   '0 0 8px #00d4ff, 0 0 20px #00d4ff60, 0 0 40px #00d4ff20',
        'neon-green':  '0 0 8px #39ff14, 0 0 20px #39ff1460, 0 0 40px #39ff1420',
        'neon-red':    '0 0 8px #ff073a, 0 0 20px #ff073a60, 0 0 40px #ff073a20',
        'neon-orange': '0 0 8px #ff6600, 0 0 20px #ff660060, 0 0 40px #ff660020',
        'neon-purple': '0 0 8px #bf00ff, 0 0 20px #bf00ff60, 0 0 40px #bf00ff20',
        'neon-pink':   '0 0 8px #ff00aa, 0 0 20px #ff00aa60, 0 0 40px #ff00aa20',
        'glass':       '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-lg':    '0 16px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
        'inner-neon':  'inset 0 0 20px rgba(0,212,255,0.15)',
      },
      // ── Animations ──────────────────────────────────────────────────
      animation: {
        'pulse-fast':   'pulse 0.6s ease-in-out infinite',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'spin-slow':    'spin 4s linear infinite',
        'spin-rev':     'spin 4s linear infinite reverse',
        'glow-blue':    'glowBlue 2s ease-in-out infinite alternate',
        'glow-green':   'glowGreen 2s ease-in-out infinite alternate',
        'glow-orange':  'glowOrange 1.5s ease-in-out infinite alternate',
        'float':        'float 3s ease-in-out infinite',
        'slide-up':     'slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-down':   'slideDown 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-left':   'slideLeft 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-right':  'slideRight 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':      'fadeIn 0.5s ease-out forwards',
        'fade-in-fast': 'fadeIn 0.2s ease-out forwards',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'score-pop':    'scorePop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'shake':        'shake 0.4s ease-in-out',
        'scanline':     'scanline 8s linear infinite',
        'radar-sweep':  'radarSweep 3s linear infinite',
        'count-flip':   'countFlip 0.3s ease-in-out',
        'car-intro':    'carIntro 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        glowBlue:   { '0%': { boxShadow: '0 0 5px #00d4ff40' }, '100%': { boxShadow: '0 0 25px #00d4ff, 0 0 50px #00d4ff60' } },
        glowGreen:  { '0%': { boxShadow: '0 0 5px #39ff1440' }, '100%': { boxShadow: '0 0 25px #39ff14, 0 0 50px #39ff1460' } },
        glowOrange: { '0%': { boxShadow: '0 0 5px #ff660040' }, '100%': { boxShadow: '0 0 20px #ff6600, 0 0 40px #ff660060' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        slideUp:    { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown:  { '0%': { transform: 'translateY(-30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideLeft:  { '0%': { transform: 'translateX(30px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideRight: { '0%': { transform: 'translateX(-30px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        fadeIn:     { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn:    { '0%': { transform: 'scale(0.85)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        scorePop:   { '0%': { transform: 'scale(0.5) translateY(0)', opacity: '1' }, '60%': { transform: 'scale(1.2) translateY(-20px)', opacity: '1' }, '100%': { transform: 'scale(1) translateY(-40px)', opacity: '0' } },
        shake:      { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-8px)' }, '40%': { transform: 'translateX(8px)' }, '60%': { transform: 'translateX(-4px)' }, '80%': { transform: 'translateX(4px)' } },
        scanline:   { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '0 100%' } },
        radarSweep: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        countFlip:  { '0%': { transform: 'rotateX(-90deg) scale(0.5)', opacity: '0' }, '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' } },
        carIntro:   { '0%': { transform: 'translateX(-100px) rotateY(20deg)', opacity: '0' }, '100%': { transform: 'translateX(0) rotateY(0deg)', opacity: '1' } },
      },
      // ── Border Radius ───────────────────────────────────────────────
      borderRadius: { '4xl': '2rem', '5xl': '3rem' },
    },
  },
  plugins: [],
}
