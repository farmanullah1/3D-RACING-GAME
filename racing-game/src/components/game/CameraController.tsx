import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { lerp } from '../../utils/physics'

export default function CameraController() {
  const { camera } = useThree()
  const targetPos  = useRef(new THREE.Vector3(0, 5, 12))
  const targetLook = useRef(new THREE.Vector3())
  const shakeMag   = useRef(0)

  useFrame((_, _delta) => {
    const { car, phase } = useGameStore.getState()
    if (!['racing','countdown','results','paused'].includes(phase)) return

    const [px,py,pz] = car.position
    const ry         = car.rotation[1]
    const speed      = Math.abs(car.speed)
    const isDrifting = car.isDrifting

    // Camera shake on damage / drift
    if (isDrifting) shakeMag.current = Math.min(shakeMag.current + 0.02, 0.08)
    else            shakeMag.current = Math.max(shakeMag.current - 0.05, 0)

    const shake = shakeMag.current
    const shakeX = (Math.random()-0.5) * shake
    const shakeY = (Math.random()-0.5) * shake

    // Speed-based FOV zoom
    const persCam = camera as THREE.PerspectiveCamera
    if (persCam.isPerspectiveCamera) {
      const targetFOV = 75 + (speed / 200) * 15
      persCam.fov = lerp(persCam.fov, targetFOV, 0.05)
      persCam.updateProjectionMatrix()
    }

    // Dynamic distance based on speed
    const dist   = 8 + (speed / 200) * 3
    const height = 3.5 + (isDrifting ? 0.5 : 0)

    const desiredX = px - Math.sin(ry) * dist + shakeX
    const desiredY = py + height + shakeY
    const desiredZ = pz - Math.cos(ry) * dist

    const lookAhead = 3 + speed / 80
    const lookX = px + Math.sin(ry) * lookAhead
    const lookY = py + 0.9
    const lookZ = pz + Math.cos(ry) * lookAhead

    const smoothing = isDrifting ? 0.06 : 0.08

    targetPos.current.set(
      lerp(targetPos.current.x, desiredX, smoothing),
      lerp(targetPos.current.y, desiredY, smoothing * 1.2),
      lerp(targetPos.current.z, desiredZ, smoothing),
    )
    targetLook.current.set(
      lerp(targetLook.current.x, lookX, smoothing * 1.5),
      lerp(targetLook.current.y, lookY, smoothing * 1.5),
      lerp(targetLook.current.z, lookZ, smoothing * 1.5),
    )

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLook.current)
  })

  return null
}
