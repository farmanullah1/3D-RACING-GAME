import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { TrackDefinition } from '../../../types'
import { makeAsphaltTex, makeWetAsphaltTex, makeSandTex, makeNormalMap } from '../../../utils/textures'

export interface TrackMeshData {
  curve:           THREE.CatmullRomCurve3
  roadGeometry:    THREE.BufferGeometry
  leftBarrierGeo:  THREE.BufferGeometry
  rightBarrierGeo: THREE.BufferGeometry
  totalLength:     number
  getPointAt:      (t: number) => THREE.Vector3
  getTangentAt:    (t: number) => THREE.Vector3
  getNormalAt:     (t: number, offset: number) => THREE.Vector3
}

/** 
 * Procedural stable flat road geometry builder.
 * Solves the notorious Three.js Frenet-frame torsion flip bug (where ExtrudeGeometry suddenly twists vertical).
 */
export function buildFlatTrackGeometry(curve: THREE.CatmullRomCurve3, width: number): THREE.BufferGeometry {
  const SEGS = 300
  const vertices: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  const hw = width / 2

  const leftPts: THREE.Vector3[] = []
  const rightPts: THREE.Vector3[] = []

  // 1. Generate stable track nodes along spline on horizontal XZ plane
  for (let i = 0; i <= SEGS; i++) {
    const t = i / SEGS
    const p = curve.getPointAt(t)
    const tan = curve.getTangentAt(t)
    const nor = new THREE.Vector3(-tan.z, 0, tan.x).normalize()

    leftPts.push(p.clone().add(nor.clone().multiplyScalar(-hw)))
    rightPts.push(p.clone().add(nor.clone().multiplyScalar(hw)))
  }

  // 2. Build vertices, normals, and UVs
  for (let i = 0; i <= SEGS; i++) {
    const t = i / SEGS
    // Left vertex
    vertices.push(leftPts[i].x, leftPts[i].y, leftPts[i].z)
    normals.push(0, 1, 0)
    uvs.push(0, t * 25)

    // Right vertex
    vertices.push(rightPts[i].x, rightPts[i].y, rightPts[i].z)
    normals.push(0, 1, 0)
    uvs.push(1, t * 25)
  }

  // 3. Build indices (Triangles connect quads)
  for (let i = 0; i < SEGS; i++) {
    const curr = i * 2
    const next = curr + 2

    // Triangle 1: LeftCurr -> RightCurr -> LeftNext
    indices.push(curr, curr + 1, next)
    // Triangle 2: RightCurr -> RightNext -> LeftNext
    indices.push(curr + 1, next + 1, next)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()

  return geo
}

/** 
 * Procedural stable 3D barrier wall geometry builder.
 * Replaces ExtrudeGeometry to prevent vertical twists or flips.
 */
export function buildFlatBarrierGeometry(curve: THREE.CatmullRomCurve3, offset: number, width = 0.4, height = 0.9): THREE.BufferGeometry {
  const SEGS = 300
  const vertices: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  const hw = width / 2

  // 1. Generate 3D box vertices along spline path
  for (let i = 0; i <= SEGS; i++) {
    const t = i / SEGS
    const p = curve.getPointAt(t)
    const tan = curve.getTangentAt(t)
    const nor = new THREE.Vector3(-tan.z, 0, tan.x).normalize()
    const basePt = p.clone().add(nor.clone().multiplyScalar(offset))
    const innerPt = basePt.clone().add(nor.clone().multiplyScalar(-hw))
    const outerPt = basePt.clone().add(nor.clone().multiplyScalar(hw))
    const y = basePt.y

    // Inner bottom (0), Inner top (1), Outer top (2), Outer bottom (3)
    vertices.push(innerPt.x, y, innerPt.z)
    vertices.push(innerPt.x, y + height, innerPt.z)
    vertices.push(outerPt.x, y + height, outerPt.z)
    vertices.push(outerPt.x, y, outerPt.z)

    normals.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    uvs.push(0, t * 25, 0.25, t * 25, 0.75, t * 25, 1.0, t * 25)
  }

  // 2. Triangulate the 3 longitudinal faces
  for (let i = 0; i < SEGS; i++) {
    const curr = i * 4
    const next = curr + 4

    // Inner vertical face
    indices.push(curr, curr + 1, next)
    indices.push(curr + 1, next + 1, next)

    // Top horizontal face
    indices.push(curr + 1, curr + 2, next + 1)
    indices.push(curr + 2, next + 2, next + 1)

    // Outer vertical face
    indices.push(curr + 2, curr + 3, next + 2)
    indices.push(curr + 3, next + 3, next + 2)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()

  return geo
}

/** Build all track geometries from a TrackDefinition using stable builders */
export function buildTrackMesh(def: TrackDefinition): TrackMeshData {
  const curve = new THREE.CatmullRomCurve3(
    def.controlPoints.map(([x,y,z]) => new THREE.Vector3(x, y, z)),
    true, 'catmullrom', 0.5
  )

  const hw = def.trackWidth / 2

  return {
    curve,
    roadGeometry:    buildFlatTrackGeometry(curve, def.trackWidth),
    leftBarrierGeo:  buildFlatBarrierGeometry(curve, -(hw + 0.3), 0.4, 0.9),
    rightBarrierGeo: buildFlatBarrierGeometry(curve, hw + 0.3, 0.4, 0.9),
    totalLength:     curve.getLength(),
    getPointAt:      (t) => curve.getPointAt(t),
    getTangentAt:    (t) => curve.getTangentAt(t),
    getNormalAt:     (t, offset) => {
      const tan = curve.getTangentAt(t)
      return new THREE.Vector3(-tan.z, 0, tan.x).normalize().multiplyScalar(offset)
    },
  }
}

/** Animated start/finish gate */
export function StartGate({ position, rotation }: { position: THREE.Vector3; rotation: THREE.Euler }) {
  const beamRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.5
    }
  })
  return (
    <group position={position} rotation={rotation}>
      {/* Left post */}
      <mesh position={[-6.2, 3, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 6, 8]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Right post */}
      <mesh position={[6.2, 3, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 6, 8]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Top beam */}
      <mesh position={[0, 6, 0]}>
        <boxGeometry args={[12.6, 0.8, 0.6]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Glow light */}
      <mesh ref={beamRef} position={[0, 5.5, 0]}>
        <boxGeometry args={[10, 0.1, 0.2]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
      </mesh>
      {/* Checkered pattern strips */}
      {Array.from({length:12},(_,i) => (
        <group key={i} position={[-5.5 + i*1.0, 6.4, 0]}>
          <mesh>
            <boxGeometry args={[0.9, 0.1, 0.62]} />
            <meshStandardMaterial color={i%2===0?'#ffffff':'#111111'} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** Select road texture based on surface type */
export function useTrackTextures(def: TrackDefinition) {
  return useMemo(() => {
    const normal = makeNormalMap()
    switch (def.surface) {
      case 'wet_asphalt': return { map: makeWetAsphaltTex(), normalMap: normal, roughness: 0.3, metalness: 0.15 }
      case 'sand':        return { map: makeSandTex(),       normalMap: normal, roughness: 0.95, metalness: 0 }
      case 'asphalt':
      default:            return { map: makeAsphaltTex(),    normalMap: normal, roughness: 0.75, metalness: 0.05 }
    }
  }, [def.surface])
}
