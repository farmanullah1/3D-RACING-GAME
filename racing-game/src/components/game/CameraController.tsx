import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../store/gameStore'
import { lerp } from '../../utils/physics'

const CAMERA_OFFSET = new THREE.Vector3(0, 3.5, 8)
const CAMERA_LOOK_AHEAD = 3   // how far ahead of car to look

export default function CameraController() {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 4, 10))
  const targetLook = useRef(new THREE.Vector3())
  const lerpSpeed = 0.08  // smooth camera follow

  useFrame(() => {
    const { car, game } = useGameStore.getState()
    if (game.phase !== 'racing' && game.phase !== 'countdown' && game.phase !== 'finished') return

    const { position, rotation, speed } = car
    const rotY = rotation.y

    // Compute desired camera position behind the car
    // Offset gets farther at higher speeds for dramatic effect
    const speedOffset = Math.min(Math.abs(speed) / 150, 1) * 2
    const desiredX = position.x - Math.sin(rotY) * (CAMERA_OFFSET.z + speedOffset)
    const desiredY = position.y + CAMERA_OFFSET.y
    const desiredZ = position.z - Math.cos(rotY) * (CAMERA_OFFSET.z + speedOffset)

    // Look slightly ahead of the car
    const lookX = position.x + Math.sin(rotY) * CAMERA_LOOK_AHEAD
    const lookY = position.y + 0.8
    const lookZ = position.z + Math.cos(rotY) * CAMERA_LOOK_AHEAD

    // Smooth lerp
    targetPos.current.set(
      lerp(targetPos.current.x, desiredX, lerpSpeed),
      lerp(targetPos.current.y, desiredY, lerpSpeed),
      lerp(targetPos.current.z, desiredZ, lerpSpeed)
    )
    targetLook.current.set(
      lerp(targetLook.current.x, lookX, lerpSpeed * 1.2),
      lerp(targetLook.current.y, lookY, lerpSpeed * 1.2),
      lerp(targetLook.current.z, lookZ, lerpSpeed * 1.2)
    )

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLook.current)
  })

  return null
}
