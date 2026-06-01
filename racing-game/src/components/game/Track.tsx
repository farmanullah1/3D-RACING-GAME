import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { generateAsphaltTexture, generateNormalMap } from '../../utils/textures'
import { useGameStore } from '../../store/gameStore'
import { TRACKS } from '../../utils/tracks'

const TRACK_WIDTH = 10    // meters
const TRACK_SEGMENTS = 300
const BARRIER_HEIGHT = 1.5

/**
 * Shared decoration positions around the outside of the track.
 */
const DECORATION_POSITIONS: [number, number, number][] = [
  [85, 0, 0], [80, 0, 40], [60, 0, 65], [25, 0, 75], [-25, 0, 75],
  [-60, 0, 65], [-80, 0, 40], [-85, 0, 0], [-80, 0, -40], [-60, 0, -65],
  [-25, 0, -70], [25, 0, -70], [60, 0, -65], [80, 0, -40],
  [30, 0, 10], [-30, 0, -10], [0, 0, 20],
]

/** Single pine tree mesh */
function Tree({ position }: { position: [number, number, number] }) {
  const height = 4 + Math.random() * 3
  const radius = 0.25 + Math.random() * 0.15
  const crownRadius = 1.2 + Math.random() * 0.8

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh castShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius * 0.6, radius, height, 6]} />
        <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
      </mesh>
      {/* Crown (cone) */}
      <mesh castShadow position={[0, height + crownRadius * 0.8, 0]}>
        <coneGeometry args={[crownRadius, crownRadius * 2, 7]} />
        <meshStandardMaterial color="#1a5c0a" roughness={0.85} />
      </mesh>
      {/* Second crown layer */}
      <mesh castShadow position={[0, height + crownRadius * 1.8, 0]}>
        <coneGeometry args={[crownRadius * 0.7, crownRadius * 1.5, 7]} />
        <meshStandardMaterial color="#236b0e" roughness={0.85} />
      </mesh>
    </group>
  )
}

/** Desert sandstone pillar */
function DesertRock({ position }: { position: [number, number, number] }) {
  const height = 5 + Math.random() * 8
  const baseRadius = 2 + Math.random() * 2
  const topRadius = baseRadius * (0.6 + Math.random() * 0.3)

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[topRadius, baseRadius, height, 5, 3]} />
        <meshStandardMaterial color="#b77c48" roughness={0.95} metalness={0.0} />
      </mesh>
      {/* Small rock block on top */}
      <mesh castShadow position={[0, height + 0.3, 0]} rotation={[0.2, 0.5, 0]}>
        <boxGeometry args={[topRadius * 1.5, 0.8, topRadius * 1.5]} />
        <meshStandardMaterial color="#965c2a" roughness={0.95} />
      </mesh>
    </group>
  )
}

/** Futuristic City Skyscraper Box */
function Skyscraper({ position }: { position: [number, number, number] }) {
  const height = 20 + Math.random() * 30
  const width = 6 + Math.random() * 8
  const depth = 6 + Math.random() * 8
  const glowColor = Math.random() > 0.5 ? '#00d4ff' : '#bf00ff'

  return (
    <group position={position}>
      {/* Tower glass box */}
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          color="#060611"
          roughness={0.05}
          metalness={0.95}
          transmission={0.4}
          transparent
          opacity={0.85}
          thickness={1.5}
        />
      </mesh>
      {/* Neon corner trims */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width + 0.1, height + 0.1, depth + 0.1]} />
        <meshBasicMaterial color={glowColor} wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

/** Glowing checkpoint gate */
function CheckpointGate({
  position,
  rotation,
  color = '#00d4ff',
}: {
  position: THREE.Vector3
  rotation: THREE.Euler
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      // Pulse opacity
      const mat = ref.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 3) * 0.2
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Left post */}
      <mesh position={[-TRACK_WIDTH / 2 - 0.5, BARRIER_HEIGHT + 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      {/* Right post */}
      <mesh position={[TRACK_WIDTH / 2 + 0.5, BARRIER_HEIGHT + 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      {/* Top beam */}
      <mesh ref={ref} position={[0, BARRIER_HEIGHT + 3, 0]}>
        <boxGeometry args={[TRACK_WIDTH + 2, 0.3, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* START/FINISH text light */}
      <pointLight position={[0, BARRIER_HEIGHT + 2, 0]} color={color} intensity={3} distance={15} decay={2} />
    </group>
  )
}

export default function Track() {
  const asphaltTexture = useMemo(() => generateAsphaltTexture(512), [])
  const normalMap = useMemo(() => generateNormalMap(512), [])
  const selectedTrackId = useGameStore((s) => s.game.selectedTrackId)

  const activeTrack = useMemo(() => {
    return TRACKS[selectedTrackId] || TRACKS[0]
  }, [selectedTrackId])

  // ── Build the closed curve dynamically ─────────────────────────────────────────
  const curve = useMemo(() => {
    const points = activeTrack.points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
    return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5)
  }, [activeTrack])

  // ── Road surface (extruded along curve) ────────────────────────────────────
  const roadGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-TRACK_WIDTH / 2, 0)
    shape.lineTo(TRACK_WIDTH / 2, 0)
    shape.lineTo(TRACK_WIDTH / 2, 0.15)  // road thickness
    shape.lineTo(-TRACK_WIDTH / 2, 0.15)
    shape.closePath()

    const extrudeSettings = {
      steps: TRACK_SEGMENTS,
      extrudePath: curve,
      bevelEnabled: false,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [curve])

  // ── Barrier geometry (left & right sides) ──────────────────────────────────
  const barrierGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(0.4, 0)
    shape.lineTo(0.4, BARRIER_HEIGHT)
    shape.lineTo(0, BARRIER_HEIGHT)
    shape.closePath()

    const makeBarrier = (offset: number) => {
      const offsetCurve = new THREE.CatmullRomCurve3(
        curve.getPoints(TRACK_SEGMENTS).map((p, i) => {
          const t = i / TRACK_SEGMENTS
          const tangent = curve.getTangentAt(t)
          const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
          return p.clone().add(normal.multiplyScalar(offset))
        }),
        true
      )
      return new THREE.ExtrudeGeometry(shape, {
        steps: TRACK_SEGMENTS,
        extrudePath: offsetCurve,
        bevelEnabled: false,
      })
    }
    return { left: makeBarrier(-TRACK_WIDTH / 2 - 0.5), right: makeBarrier(TRACK_WIDTH / 2 + 0.1) }
  }, [curve])

  // ── Generate checkpoints positions dynamically ───────────────────────────
  const checkpoints = useMemo(() => {
    return activeTrack.checkpoints.map((cp) => {
      let t = 0
      if (cp.id === 0) t = 0
      else if (cp.id === 1) t = 0.25
      else if (cp.id === 2) t = 0.5
      else if (cp.id === 3) t = 0.75

      const point = curve.getPointAt(t)
      const tangent = curve.getTangentAt(t)
      const angle = Math.atan2(tangent.x, tangent.z)
      return {
        id: cp.id,
        color: cp.color,
        position: point.clone().setY(0),
        rotation: new THREE.Euler(0, angle, 0),
      }
    })
  }, [curve, activeTrack])

  return (
    <group>
      {/* ── Road Surface ─────────────────────────────────────────────────── */}
      <mesh geometry={roadGeometry} receiveShadow castShadow>
        <meshStandardMaterial
          map={asphaltTexture}
          normalMap={normalMap}
          roughness={activeTrack.decorations === 'city' ? 0.3 : 0.75}
          metalness={activeTrack.decorations === 'city' ? 0.8 : 0.05}
          color={activeTrack.decorations === 'city' ? '#151525' : '#333333'}
        />
      </mesh>

      {/* ── Barriers ─────────────────────────────────────────────────────── */}
      <mesh geometry={barrierGeometry.left} castShadow receiveShadow>
        <meshStandardMaterial
          color={activeTrack.barrierColor}
          roughness={0.6}
          metalness={0.1}
          emissive={activeTrack.emissiveColor}
          emissiveIntensity={activeTrack.decorations === 'city' ? 0.9 : 0.3}
        />
      </mesh>
      <mesh geometry={barrierGeometry.right} castShadow receiveShadow>
        <meshStandardMaterial
          color={activeTrack.barrierColor}
          roughness={0.6}
          metalness={0.1}
          emissive={activeTrack.emissiveColor}
          emissiveIntensity={activeTrack.decorations === 'city' ? 0.9 : 0.3}
        />
      </mesh>

      {/* ── Checkpoint Gates ─────────────────────────────────────────────── */}
      {checkpoints.map((cp) => (
        <CheckpointGate key={cp.id} position={cp.position} rotation={cp.rotation} color={cp.color} />
      ))}

      {/* ── Dynamic Decorations ──────────────────────────────────────────── */}
      {DECORATION_POSITIONS.map((pos, i) => {
        if (activeTrack.decorations === 'rocks') {
          return <DesertRock key={i} position={pos} />
        } else if (activeTrack.decorations === 'city') {
          return <Skyscraper key={i} position={pos} />
        } else {
          return <Tree key={i} position={pos} />
        }
      })}
    </group>
  )
}
