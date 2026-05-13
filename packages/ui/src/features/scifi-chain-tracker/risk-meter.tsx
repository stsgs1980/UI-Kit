'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Props ───────────────────────────────────────────────────

interface RiskMeterProps {
  score: number
  accentColor?: string
}

function getScoreColor(s: number): string {
  if (s >= 75) return '#ff2244'
  if (s >= 50) return '#ff6b00'
  if (s >= 30) return '#eab308'
  return '#22c55e'
}

const SEGMENTS = [
  { start: 0, end: 25, color: '#22c55e' },
  { start: 25, end: 50, color: '#eab308' },
  { start: 50, end: 75, color: '#ff6b00' },
  { start: 75, end: 100, color: '#ff2244' },
]

// ─── Component ───────────────────────────────────────────────

export function RiskMeter({ score }: RiskMeterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const color = getScoreColor(score)

  return (
    <div ref={ref} data-slot="risk-meter">
      <div className="relative h-4 bg-white/[0.04] rounded-sm overflow-hidden border border-white/[0.06]">
        {/* Segment backgrounds */}
        <div className="absolute inset-0 flex">
          {SEGMENTS.map((seg) => (
            <div key={seg.start} className="flex-1 h-full"
              style={{
                backgroundColor: `${seg.color}10`,
                borderRight: seg.end < 100 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${score}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-0 bottom-0 rounded-sm"
          style={{
            background: `linear-gradient(90deg, ${SEGMENTS[0].color}80, ${color})`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />

        {/* Glow marker */}
        <motion.div
          initial={{ left: 0, opacity: 0 }}
          animate={isInView ? { left: `${score}%`, opacity: 1 } : { left: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 z-10"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}, 0 0 16px ${color}60` }}
        />
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-3">
          {SEGMENTS.map((seg) => (
            <div key={seg.start} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="font-mono text-[8px] text-white/25">{seg.start}-{seg.end}</span>
            </div>
          ))}
        </div>
        <span className="font-mono text-xs font-bold" style={{ color, textShadow: `0 0 8px ${color}40` }}>
          {score}/100
        </span>
      </div>
    </div>
  )
}
