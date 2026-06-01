export interface CheckpointData {
  id: number
  x: number
  z: number
  name: string
  color: string
}

export interface TrackData {
  id: number
  name: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  points: [number, number, number][]
  groundColor: string
  barrierColor: string
  emissiveColor: string
  decorations: 'trees' | 'rocks' | 'city' | 'space' | 'lava' | 'ice'
  skyColor: string
  scoreMultiplier: number
  description: string
  features: string[]
  checkpoints: CheckpointData[]
}

export const TRACKS: TrackData[] = [
  {
    id: 0,
    name: 'Neo Circuit',
    difficulty: 'Easy',
    points: [
      [0, 0, -40],
      [20, 0, -55],
      [50, 0, -50],
      [70, 0, -30],
      [75, 0, 0],
      [70, 0, 30],
      [50, 0, 50],
      [20, 0, 60],
      [0, 0, 55],
      [-20, 0, 60],
      [-50, 0, 50],
      [-70, 0, 30],
      [-75, 0, 0],
      [-70, 0, -30],
      [-50, 0, -50],
      [-20, 0, -55],
    ],
    groundColor: '#2d5a1b',      // Grass green
    barrierColor: '#cc2222',     // Racing red
    emissiveColor: '#880000',
    decorations: 'trees',
    skyColor: '#b0c8ff',
    scoreMultiplier: 1.0,
    description: 'A classic figure-eight circuit surrounded by pine trees. Great for high-speed runs and learning car controls.',
    features: ['High-Speed Straights', 'Gentle Sweepers', 'Pine Forest Surroundings'],
    checkpoints: [
      { id: 0, x: 0, z: -40, name: 'Start/Finish', color: '#00d4ff' },
      { id: 1, x: 75, z: 0, name: 'Checkpoint 1', color: '#ff6600' },
      { id: 2, x: 0, z: 55, name: 'Checkpoint 2', color: '#39ff14' },
      { id: 3, x: -75, z: 0, name: 'Checkpoint 3', color: '#bf00ff' },
    ],
  },
  {
    id: 1,
    name: 'Canyon Drift',
    difficulty: 'Medium',
    points: [
      [0, 0, -45],
      [25, 0, -50],
      [50, 0, -35],
      [45, 0, -10],
      [20, 0, 5],
      [55, 0, 25],
      [65, 0, 50],
      [35, 0, 65],
      [0, 0, 50],
      [-30, 0, 60],
      [-55, 0, 40],
      [-40, 0, 15],
      [-20, 0, -5],
      [-50, 0, -25],
      [-45, 0, -50],
      [-20, 0, -45],
    ],
    groundColor: '#cfa265',      // Sand orange/brown
    barrierColor: '#d35400',     // Rust orange
    emissiveColor: '#a04000',
    decorations: 'rocks',
    skyColor: '#ffa07a',         // Desert sunset orange
    scoreMultiplier: 1.5,
    description: 'A winding canyon path featuring tight S-curves and sandstorms. Optimized for racking up drift combos.',
    features: ['Windy Hairpins', 'Desert Sunset', 'Sandstone Rock Formations'],
    checkpoints: [
      { id: 0, x: 0, z: -45, name: 'Start/Finish', color: '#00d4ff' },
      { id: 1, x: 45, z: -10, name: 'Checkpoint 1', color: '#ff6600' },
      { id: 2, x: 0, z: 50, name: 'Checkpoint 2', color: '#39ff14' },
      { id: 3, x: -40, z: 15, name: 'Checkpoint 3', color: '#bf00ff' },
    ],
  },
  {
    id: 2,
    name: 'Hyper City',
    difficulty: 'Hard',
    points: [
      [0, 0, -50],
      [45, 0, -50],
      [45, 0, -15],
      [15, 0, -15],
      [15, 0, 20],
      [50, 0, 20],
      [50, 0, 55],
      [-50, 0, 55],
      [-50, 0, 15],
      [-15, 0, 15],
      [-15, 0, -20],
      [-45, 0, -20],
      [-45, 0, -50],
      [-20, 0, -50],
    ],
    groundColor: '#0a0a14',      // Metallic dark
    barrierColor: '#00d4ff',     // Holographic cyan
    emissiveColor: '#0088cc',
    decorations: 'city',
    skyColor: '#2b1055',         // Midnight purple
    scoreMultiplier: 2.0,
    description: 'An urban cyber grid containing technical 90-degree right angle corners. Floating code particles drift in the air.',
    features: ['90-degree Turns', 'Synthwave Skyscrapers', 'Forcefield Barricades'],
    checkpoints: [
      { id: 0, x: 0, z: -50, name: 'Start/Finish', color: '#00d4ff' },
      { id: 1, x: 45, z: -15, name: 'Checkpoint 1', color: '#ff6600' },
      { id: 2, x: -50, z: 55, name: 'Checkpoint 2', color: '#39ff14' },
      { id: 3, x: -15, z: -20, name: 'Checkpoint 3', color: '#bf00ff' },
    ],
  },
  {
    id: 3,
    name: 'Nebula Void',
    difficulty: 'Hard',
    points: [
      [0, 0, -40],
      [30, 0, -50],
      [60, 0, -30],
      [40, 0, 0],
      [60, 0, 30],
      [30, 0, 50],
      [0, 0, 35],
      [-30, 0, 50],
      [-60, 0, 30],
      [-40, 0, 0],
      [-60, 0, -30],
      [-30, 0, -50],
    ],
    groundColor: '#03030d',      // Cosmic void
    barrierColor: '#bf00ff',     // Holographic violet
    emissiveColor: '#aa00aa',
    decorations: 'space',
    skyColor: '#050015',         // Space dark violet
    scoreMultiplier: 3.0,
    description: 'A stellar racetrack suspended in deep space. Flanked by glowing nebula clouds and drifting cosmic asteroids.',
    features: ['Deep Space Rift', 'Pulsing Starfields', 'Obsidian Anti-Grav Road'],
    checkpoints: [
      { id: 0, x: 0, z: -40, name: 'Start/Finish', color: '#bf00ff' },
      { id: 1, x: 40, z: 0, name: 'Checkpoint 1', color: '#ff6600' },
      { id: 2, x: 0, z: 35, name: 'Checkpoint 2', color: '#39ff14' },
      { id: 3, x: -40, z: 0, name: 'Checkpoint 3', color: '#00d4ff' },
    ],
  },
  {
    id: 4,
    name: 'Volcanic Rim',
    difficulty: 'Hard',
    points: [
      [0, 0, -55],
      [30, 0, -60],
      [60, 0, -40],
      [50, 0, -10],
      [70, 0, 20],
      [40, 0, 50],
      [0, 0, 60],
      [-40, 0, 50],
      [-70, 0, 20],
      [-50, 0, -10],
      [-60, 0, -40],
      [-30, 0, -60],
    ],
    groundColor: '#260b05',      // Molten magma ground
    barrierColor: '#ff3300',     // Magma red
    emissiveColor: '#991100',
    decorations: 'lava',
    skyColor: '#3d1000',         // Ash red sunset
    scoreMultiplier: 3.5,
    description: 'A dangerous course winding around the mouth of an active volcano, wreathed in glowing magma spouts and ash flows.',
    features: ['Molten Lava Spouts', 'Magma Rim Drift', 'Extreme Heat Wave'],
    checkpoints: [
      { id: 0, x: 0, z: -55, name: 'Start/Finish', color: '#ff3300' },
      { id: 1, x: 50, z: -10, name: 'Checkpoint 1', color: '#ff6600' },
      { id: 2, x: 0, z: 60, name: 'Checkpoint 2', color: '#39ff14' },
      { id: 3, x: -50, z: -10, name: 'Checkpoint 3', color: '#00d4ff' },
    ],
  },
  {
    id: 5,
    name: 'Glacial Rift',
    difficulty: 'Medium',
    points: [
      [0, 0, -50],
      [25, 0, -55],
      [50, 0, -35],
      [40, 0, 5],
      [60, 0, 35],
      [30, 0, 55],
      [0, 0, 45],
      [-30, 0, 55],
      [-60, 0, 35],
      [-40, 0, 5],
      [-50, 0, -35],
      [-25, 0, -55],
    ],
    groundColor: '#0a1d30',      // Freezing blue ground
    barrierColor: '#00d4ff',     // Icy cyan barrier
    emissiveColor: '#0066aa',
    decorations: 'ice',
    skyColor: '#050c18',         // Deep frozen twilight sky
    scoreMultiplier: 2.2,
    description: 'A winding arctic path bordered by massive sub-zero glaciers and glowing ancient ice crystals bobbing in the freezing air.',
    features: ['Aurora Glow skies', 'Translucent Glacial Rift', 'Low-grip Icy Basalt'],
    checkpoints: [
      { id: 0, x: 0, z: -50, name: 'Start/Finish', color: '#00d4ff' },
      { id: 1, x: 40, z: 5, name: 'Checkpoint 1', color: '#39ff14' },
      { id: 2, x: 0, z: 45, name: 'Checkpoint 2', color: '#ff073a' },
      { id: 3, x: -40, z: 5, name: 'Checkpoint 3', color: '#bf00ff' },
    ],
  },
]
