/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ['"Orbitron"', 'monospace'],
      },
      colors: {
        neon: {
          blue: '#00d4ff',
          green: '#39ff14',
          red: '#ff073a',
          orange: '#ff6600',
          purple: '#bf00ff',
        },
        glass: {
          white: 'rgba(255,255,255,0.08)',
          dark: 'rgba(0,0,0,0.45)',
          border: 'rgba(255,255,255,0.15)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-fast': 'pulse 0.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,212,255,0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(0,212,255,0.9), 0 0 40px rgba(0,212,255,0.4)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
