import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { TrackDefinition } from '../../../types'
import { makeAsphaltTex, makeWetAsphaltTex, makeSandTex, makeNormalMap } from '../../../utils/textures'

export interface TrackMeshData {
  curve:           THREE.CatmullRomCurve3
  roadGeometry:    THREE.ExtrudeGeometry
  leftBarrierGeo:  THREE.ExtrudeGeometry
  rightBarrierGeo: THREE.ExtrudeGeometry
  totalLength:     number
  getPointAt:      (t: number) => THREE.Vector3
  getTangentAt:    (t: number) => THREE.Vector3
  getNormalAt:     (t: number, offset: number) => THREE.Vector3
}

/** Build all track geometry from a TrackDefinition */
export function buildTrackMesh(def: TrackDefinition): TrackMeshData {
  const SEGS = 300
  const curve = new THREE.CatmullRomCurve3(
    def.controlPoints.map(([x,y,z]) => new THREE.Vector3(x, y, z)),
    true, 'catmullrom', 0.5
  )

  // Road cross-section shape
  const roadShape = new THREE.Shape()
  const hw = def.trackWidth / 2
  roadShape.moveTo(-hw, 0); roadShape.lineTo(hw, 0)
  roadShape.lineTo(hw, 0.18); roadShape.lineTo(-hw, 0.18)
  roadShape.closePath()

  const roadGeometry = new THREE.ExtrudeGeometry(roadShape, {
    steps: SEGS, extrudePath: curve, bevelEnabled: false,
  })

  // Barrier cross-section (Jersey-barrier profile)
  const makeBarrierShape = () => {
    const s = new THREE.Shape()
    s.moveTo(0,0); s.lineTo(0.5,0); s.lineTo(0.4,0.5); s.lineTo(0.3,1.0); s.lineTo(0,1.0); s.closePath()
    return s
  }

  const makeBarrierGeo = (offset: number) => {
    const pts = curve.getPoints(SEGS)
    const offsetPts = pts.map((p, i) => {
      const t = i / SEGS
      const tan = curve.getTangentAt(t)
      const nor = new THREE.Vector3(-tan.z, 0, tan.x).normalize()
      return p.clone().add(nor.multiplyScalar(offset))
    })
    const offsetCurve = new THREE.CatmullRomCurve3(offsetPts, true)
    return new THREE.ExtrudeGeometry(makeBarrierShape(), {
      steps: SEGS, extrudePath: offsetCurve, bevelEnabled: false,
    })
  }

  return {
    curve,
    roadGeometry,
    leftBarrierGeo:  makeBarrierGeo(-(hw + 0.6)),
    rightBarrierGeo: makeBarrierGeo(hw + 0.1),
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
