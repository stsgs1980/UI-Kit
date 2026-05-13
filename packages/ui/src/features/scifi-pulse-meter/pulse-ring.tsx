'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { getScoreColor } from './types'

/** Colour zone definitions for the ring */
const ZONES = [
  { label: 'Extreme', color: 'rgba(239,68,68,0.12)', range: '0-30' },
  { label: 'Caution', color: 'rgba(249,115,22,0.12)', range: '30-50' },
  { label: 'Neutral', color: 'rgba(234,179,8,0.12)', range: '50-70' },
  { label: 'Optimism', color: 'rgba(0,240,255,0.12)', range: '70-100' },
]

/**
 * Animated SVG ring gauge displaying a 0-100 score.
 *
 * @example
 * ```tsx
 * <PulseRing score={72} accentColor="#00e5ff" />
 * ```
 */
export const PulseRing = forwardRef<HTMLDivElement, {
  score: number
  accentColor?: string
  className?: string
}>(({ score, accentColor = '#00e5ff', className }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(innerRef, { once: true, margin: '-50px' })

  const size = 200
  const strokeWidth = 12
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)
  const center = size / 2

  return (
    <div ref={ref} className={cn('flex flex-col items-center', className)} data-slot="pulse-ring">
      <div ref={innerRef} className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
          {/* Background ring */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />

          {/* Color zones */}
          {ZONES.map((zone, i) => {
            const zoneWidth = zone.label === 'Extreme' ? 0.3 : zone.label === 'Caution' ? 0.2 : zone.label === 'Neutral' ? 0.2 : 0.3
            const zoneOffset = i === 0 ? 0 : i === 1 ? circumference * 0.3 : i === 2 ? circumference * 0.5 : circumference * 0.7
            return (
              <circle
                key={zone.label}
                cx={center} cy={center} r={radius} fill="none"
                stroke={zone.color} strokeWidth={strokeWidth}
                strokeDasharray={`${circumference * zoneWidth} ${circumference * (1 - zoneWidth)}`}
                strokeDashoffset={`-${zoneOffset}`}
                transform={`rotate(-90 ${center} ${center})`}
              />
            )
          })}

          {/* Active arc */}
          <motion.circle
            cx={center} cy={center} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
              transform: `rotate(-90 ${center} ${center})`,
              transformOrigin: `${center}px ${center}px`,
            }}
          />

          {/* Pulsing center dot */}
          <circle cx={center} cy={center} r={6} fill={color} opacity={0.3}>
            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={center} cy={center} r={4} fill={color} />

          {/* Score text */}
          <motion.text
            x={center} y={center - 32} textAnchor="middle" fill="white"
            fontSize="36" fontWeight="bold" fontFamily="monospace"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {score}
          </motion.text>
          <text x={center} y={center - 14} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace">
            of 100
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-3">
        {ZONES.map((z) => (
          <div key={z.label} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: getScoreColor(
              z.label === 'Extreme' ? 15 : z.label === 'Caution' ? 40 : z.label === 'Neutral' ? 60 : 85,
            ) }} />
            <span className="text-[10px] font-mono text-[#7070a0]">{z.label} ({z.range})</span>
          </div>
        ))}
      </div>
    </div>
  )
})
PulseRing.displayName = 'PulseRing'
