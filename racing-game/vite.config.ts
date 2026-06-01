import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/3D-RACING-GAME/',
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'three'
          }
          if (id.includes('node_modules/@react-three/fiber/') || id.includes('node_modules/@react-three/drei/')) {
            return 'r3f'
          }
          if (id.includes('node_modules/@react-three/postprocessing/')) {
            return 'fx'
          }
        }
      }
    }
  }
})
