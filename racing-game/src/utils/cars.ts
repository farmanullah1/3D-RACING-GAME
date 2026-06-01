export interface CarData {
  id: number
  name: string
  modelName: string
  description: string
  color: string          // Main theme color
  accentColor: string    // Accent color for lights/sparks
  emissiveColor: string
  // Stats for the select screen bars (0 to 100)
  stats: {
    speed: number
    handling: number
    acceleration: number
    nitro: number
  }
  // Actual physics multipliers to apply on top of default constants
  physics: {
    maxSpeed: number       // custom max speed in km/h
    acceleration: number   // custom acceleration in km/h/s
    steeringSpeed: number  // custom steering speed in rad/s
    nitroDrain: number     // custom nitro drain speed (lower is better!)
  }
}

export const CARS: CarData[] = [
  {
    id: 0,
    name: 'Interceptor',
    modelName: 'sports',
    description: 'The ultimate balanced asphalt machine. High aerodynamic stability and reliable drift controls make it perfect for track novices.',
    color: '#e74c3c', // Racing Red
    accentColor: '#ff6600', // Neon Orange
    emissiveColor: '#ff2200',
    stats: {
      speed: 65,
      acceleration: 60,
      handling: 70,
      nitro: 50,
    },
    physics: {
      maxSpeed: 200,
      acceleration: 60,
      steeringSpeed: 2.5,
      nitroDrain: 25,
    }
  },
  {
    id: 1,
    name: 'Specter GT',
    modelName: 'hypercar',
    description: 'A cybernetically tuned prototype engineered for extreme straight-line velocities. Steering requires precision, but the top speed is unmatched.',
    color: '#00d4ff', // Cyan Glow
    accentColor: '#bf00ff', // Violet Purple
    emissiveColor: '#0088ff',
    stats: {
      speed: 95,
      acceleration: 45,
      handling: 50,
      nitro: 80,
    },
    physics: {
      maxSpeed: 230,
      acceleration: 50,
      steeringSpeed: 1.9,
      nitroDrain: 18,
    }
  },
  {
    id: 2,
    name: 'Dreadnought',
    modelName: 'muscle',
    description: 'A supercharged heavy muscle car that tears up the road. Delivers explosive acceleration off the starting line, though turning is a heavy task.',
    color: '#ffcc00', // Yellow
    accentColor: '#d35400', // Rust orange
    emissiveColor: '#ffa500',
    stats: {
      speed: 55,
      acceleration: 95,
      handling: 40,
      nitro: 60,
    },
    physics: {
      maxSpeed: 185,
      acceleration: 85,
      steeringSpeed: 1.6,
      nitroDrain: 28,
    }
  },
  {
    id: 3,
    name: 'Zenith F1',
    modelName: 'formula',
    description: 'A high-downforce open-wheel racer that can turn on a dime. Insanely lightweight, maximizing cornering speed and drift handling.',
    color: '#ffd700', // Gold
    accentColor: '#39ff14', // Neon Green
    emissiveColor: '#ffd700',
    stats: {
      speed: 75,
      handling: 95,
      acceleration: 75,
      nitro: 40,
    },
    physics: {
      maxSpeed: 212,
      acceleration: 70,
      steeringSpeed: 3.3,
      nitroDrain: 30,
    }
  }
]
