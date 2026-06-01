/**
 * Procedurally generates canvas-based PBR-like textures.
 * Used as fallback when no external texture files are provided.
 */
import * as THREE from 'three'

/**
 * Generate a tiled asphalt diffuse texture.
 */
export function generateAsphaltTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Base dark gray
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, size, size)

  // Add noise for asphalt texture
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = Math.random() * 1.5
    const gray = Math.floor(Math.random() * 60 + 20)
    ctx.fillStyle = `rgb(${gray},${gray},${gray})`
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Lane marking (center dashes)
  ctx.strokeStyle = '#ffdd00'
  ctx.lineWidth = 4
  ctx.setLineDash([40, 30])
  ctx.beginPath()
  ctx.moveTo(size / 2, 0)
  ctx.lineTo(size / 2, size)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
}

/**
 * Generate a grass texture.
 */
export function generateGrassTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#1a3a10'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const g = Math.floor(Math.random() * 40 + 20)
    ctx.fillStyle = `rgb(${g}, ${g * 2 + 10}, ${g})`
    ctx.fillRect(x, y, 2, Math.random() * 8 + 2)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(20, 20)
  return texture
}

/**
 * Generate a road normal map (subtle bumps).
 */
export function generateNormalMap(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const imageData = ctx.createImageData(size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = 128 + (Math.random() * 10 - 5)     // R (x normal)
    imageData.data[i+1] = 128 + (Math.random() * 10 - 5)   // G (y normal)
    imageData.data[i+2] = 255                                // B (z normal - up)
    imageData.data[i+3] = 255
  }
  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
}
