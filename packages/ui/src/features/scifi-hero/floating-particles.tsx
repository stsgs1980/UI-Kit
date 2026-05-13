'use client'

import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────

/** Seed-based particle configuration */
export interface ParticleSeed {
  /** Horizontal position (0-100) */
  x: number
  /** Vertical position (0-100) */
  y: number
  /** Animation duration in seconds */
  dur: number
  /** Animation delay in seconds */
  delay: number
}

export interface FloatingParticlesProps {
  /** Array of deterministic particle positions */
  seeds: ParticleSeed[]
  /** Accent color for particles (default '#00e5ff') */
  color?: string
}

// ─── Default Seeds ────────────────────────────────────────────

export const DEFAULT_SEEDS: ParticleSeed[] = [
  { x: 11.8, y: 90.9, dur: 4.2, delay: 0.5 },
  { x: 61.1, y: 48.5, dur: 5.1, delay: 1.2 },
  { x: 85.6, y: 52.7, dur: 3.8, delay: 2.1 },
  { x: 37.1, y: 57.1, dur: 6.3, delay: 0.8 },
  { x: 61.7, y: 70.4, dur: 4.7, delay: 3.4 },
  { x: 31.1, y: 54.1, dur: 5.5, delay: 1.9 },
  { x: 9.0, y: 18.9, dur: 3.3, delay: 4.1 },
  { x: 35.0, y: 34.2, dur: 6.0, delay: 0.3 },
  { x: 18.1, y: 59.6, dur: 4.4, delay: 2.7 },
  { x: 83.0, y: 98.7, dur: 5.8, delay: 1.5 },
  { x: 62.8, y: 21.2, dur: 3.6, delay: 3.8 },
  { x: 39.8, y: 99.3, dur: 4.9, delay: 0.1 },
  { x: 53.0, y: 59.6, dur: 5.3, delay: 2.4 },
  { x: 57.6, y: 95.5, dur: 3.2, delay: 4.6 },
  { x: 4.3, y: 3.1, dur: 6.5, delay: 1.1 },
  { x: 45.9, y: 74.9, dur: 4.1, delay: 3.0 },
  { x: 44.5, y: 34.2, dur: 5.7, delay: 0.7 },
  { x: 7.2, y: 93.2, dur: 3.9, delay: 2.0 },
  { x: 99.6, y: 72.9, dur: 4.6, delay: 4.3 },
  { x: 25.3, y: 69.5, dur: 5.0, delay: 1.6 },
]

// ─── Component ────────────────────────────────────────────────

/**
 * FloatingParticles — deterministic floating dot background.
 *
 * Renders seed-based particles that drift upward with fading opacity,
 * avoiding hydration mismatches from Math.random().
 *
 * @example
 * ```tsx
 * <FloatingParticles color="#00e5ff" />
 * ```
 */
export function FloatingParticles({
  seeds = DEFAULT_SEEDS,
  color = '#00e5ff',
}: FloatingParticlesProps) {
  return (
    <>
      {seeds.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-[2px] h-[2px] rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: color }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </>
  )
}
