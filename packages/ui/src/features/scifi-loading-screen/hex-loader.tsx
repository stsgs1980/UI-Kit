'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────

export interface HexLoaderProps {
  /** Progress percentage 0–100 */
  progress: number
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * HexLoader — animated SVG hexagonal progress indicator.
 *
 * Renders a hexagonal shape with rotating segments, inner counter-rotation,
 * a spinning scan line, progress arc, and pulsing corner dots.
 *
 * @example
 * ```tsx
 * <HexLoader progress={75} accentColor="#00e5ff" />
 * ```
 */
export function HexLoader({ progress, accentColor = '#00e5ff' }: HexLoaderProps) {
  const segments = 6
  const radius = 50
  const cx = 60
  const cy = 60
  const size = 120

  const vertices = useMemo(
    () => Array.from({ length: segments }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
    }),
    [],
  )

  const hexPaths = useMemo(
    () => vertices.map((v, i) => {
      const next = vertices[(i + 1) % segments]
      return `M ${v.x} ${v.y} L ${next.x} ${next.y}`
    }),
    [vertices],
  )

  const innerVertices = useMemo(() => {
    const ir = 30
    return Array.from({ length: segments }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      return { x: cx + ir * Math.cos(angle), y: cy + ir * Math.sin(angle) }
    })
  }, [])

  const innerPaths = useMemo(
    () => innerVertices.map((v, i) => {
      const next = innerVertices[(i + 1) % segments]
      return `M ${v.x} ${v.y} L ${next.x} ${next.y}`
    }),
    [innerVertices],
  )

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <defs>
          <filter id="hexGlow-ld"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {/* Static outline */}
        {hexPaths.map((d, i) => <path key={`s-${i}`} d={d} fill="none" stroke={`${accentColor}26`} strokeWidth="1" />)}
        {/* Animated segments */}
        {hexPaths.map((d, i) => (
          <motion.path key={`a-${i}`} d={d} fill="none"
            stroke={i % 2 === 0 ? accentColor : '#ff6b00'} strokeWidth="2.5" strokeLinecap="round"
            filter="url(#hexGlow-ld)" strokeDasharray="8 12"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 0.3 + (progress / 100) * 0.7, opacity: 0.5 + (progress / 100) * 0.5 }}
            transition={{ duration: 0.3, ease: 'linear' }} />
        ))}
        {/* Spinning scan */}
        <motion.line x1={cx} y1={cy} x2={vertices[0].x} y2={vertices[0].y}
          stroke={accentColor} strokeWidth="1.5" filter="url(#hexGlow-ld)"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
        {/* Inner counter-rotation */}
        <motion.g style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
          {innerPaths.map((d, i) => <path key={`in-${i}`} d={d} fill="none"
            stroke={i % 2 === 0 ? `${accentColor}4D` : 'rgba(255,107,0,0.3)'} strokeWidth="1" />)}
        </motion.g>
        {/* Center */}
        <motion.circle cx={cx} cy={cy} r="4" fill={accentColor} filter="url(#hexGlow-ld)"
          animate={{ r: [3, 5, 3], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
        {/* Corner dots */}
        {vertices.map((v, i) => (
          <motion.circle key={`dot-${i}`} cx={v.x} cy={v.y} r="2.5"
            fill={i % 2 === 0 ? accentColor : '#ff6b00'}
            animate={{ opacity: [0.3, 1, 0.3], r: [1.5, 3, 1.5] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }} />
        ))}
        {/* Progress arc */}
        <motion.circle cx={cx} cy={cy} r={radius + 8} fill="none"
          stroke={`${accentColor}99`} strokeWidth="1" strokeLinecap="round"
          strokeDasharray={`${(progress / 100) * 2 * Math.PI * (radius + 8)} ${2 * Math.PI * (radius + 8)}`}
          transform={`rotate(-90 ${cx} ${cy})`} filter="url(#hexGlow-ld)" />
      </svg>
    </div>
  )
}
