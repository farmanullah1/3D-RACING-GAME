import * as THREE from 'three'

/** Procedural asphalt — dark gray with noise + center line */
export function makeAsphaltTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#1c1c1c'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 18000; i++) {
    const g = (20 + Math.random() * 50) | 0
    ctx.fillStyle = `rgb(${g},${g},${g})`
    ctx.beginPath()
    ctx.arc(Math.random()*size, Math.random()*size, Math.random()*1.4, 0, Math.PI*2)
    ctx.fill()
  }
  // White edge lines
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.setLineDash([])
  ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(12,size); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(size-12,0); ctx.lineTo(size-12,size); ctx.stroke()
  // Yellow center dashes
  ctx.strokeStyle = '#ffdd00'; ctx.lineWidth = 4; ctx.setLineDash([50,40])
  ctx.beginPath(); ctx.moveTo(size/2,0); ctx.lineTo(size/2,size); ctx.stroke()
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10)
  return t
}

/** Wet asphalt — darker, more reflective look */
export function makeWetAsphaltTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#111318'
  ctx.fillRect(0, 0, size, size)
  // Puddle-like reflective patches
  for (let i = 0; i < 30; i++) {
    const grd = ctx.createRadialGradient(
      Math.random()*size, Math.random()*size, 0,
      Math.random()*size, Math.random()*size, 40 + Math.random()*60
    )
    grd.addColorStop(0, 'rgba(40,60,100,0.3)')
    grd.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, size, size)
  }
  for (let i = 0; i < 12000; i++) {
    const g = (15 + Math.random()*35) | 0
    ctx.fillStyle = `rgb(${g},${g},${g+5})`
    ctx.fillRect(Math.random()*size, Math.random()*size, 2, 2)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8)
  return t
}

/** Sand / desert surface */
export function makeSandTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#c8a050'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 20000; i++) {
    const v = (-20 + Math.random()*40) | 0
    ctx.fillStyle = `rgba(${v>0?255:0},${v>0?v*3:0},0,0.15)`
    ctx.fillRect(Math.random()*size, Math.random()*size, 1+Math.random()*3, 1)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(12, 12)
  return t
}

/** Grass */
export function makeGrassTex(size = 512): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#163c0a'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 10000; i++) {
    const g = (20 + Math.random()*50) | 0
    ctx.fillStyle = `rgb(${g},${g*2},${g})`
    ctx.fillRect(Math.random()*size, Math.random()*size, 2, 3+Math.random()*8)
  }
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(25, 25)
  return t
}

/** Normal map — subtle surface bumps */
export function makeNormalMap(size = 256): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const id = ctx.createImageData(size, size)
  for (let i = 0; i < id.data.length; i += 4) {
    id.data[i]   = (128 + (Math.random()*8-4))|0
    id.data[i+1] = (128 + (Math.random()*8-4))|0
    id.data[i+2] = 255
    id.data[i+3] = 255
  }
  ctx.putImageData(id, 0, 0)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8)
  return t
}

/** Neon track surface with glowing lane lines */
export function makeNeonTrackTex(size = 512, accent = '#bf00ff'): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#090912'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 10000; i++) {
    const g = (8 + Math.random()*20)|0
    ctx.fillStyle = `rgb(${g},${g},${g+5})`
    ctx.fillRect(Math.random()*size, Math.random()*size, 2, 2)
  }
  // Glowing edge lines
  ctx.shadowColor = accent; ctx.shadowBlur = 12
  ctx.strokeStyle = accent; ctx.lineWidth = 4; ctx.setLineDash([])
  ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(12,size); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(size-12,0); ctx.lineTo(size-12,size); ctx.stroke()
  ctx.shadowBlur = 0
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8)
  return t
}
