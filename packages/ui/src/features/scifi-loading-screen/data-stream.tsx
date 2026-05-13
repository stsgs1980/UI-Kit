'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { DEFAULT_STREAM_LINES } from './loading-data'

// ─── Types ────────────────────────────────────────────────────

export interface DataStreamProps {
  /** Array of terminal-style log lines to scroll */
  lines?: string[]
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * DataStream — animated background terminal text effect.
 *
 * Renders scrolling data stream lines across the viewport, providing
 * a cyberpunk / hacker aesthetic behind loading screens.
 *
 * @example
 * ```tsx
 * <DataStream accentColor="#00e5ff" />
 * ```
 */
export function DataStream({
  lines = DEFAULT_STREAM_LINES,
  accentColor = '#00e5ff',
}: DataStreamProps) {
  const visibleLines = useMemo(() => lines.slice(0, 8), [lines])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {visibleLines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] tracking-widest"
          style={{
            left: `${8 + (i * 11) % 60}%`,
            fontFamily: 'var(--font-jetbrains, monospace)',
            color: i % 3 === 0 ? accentColor : i % 3 === 1 ? '#ff6b00' : `${accentColor}59`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-10%', opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, delay: i * 0.6, ease: 'linear' }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  )
}
