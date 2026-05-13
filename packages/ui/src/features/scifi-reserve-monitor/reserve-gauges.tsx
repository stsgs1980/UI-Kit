'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { Trend } from './types'
import { TREND_CONFIG } from './types'

// ─── Sparkline Mini ───────────────────────────────────────────

export function SparklineMini({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 80
  const height = 24

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  const lastY = height - ((data[data.length - 1] - min) / range) * height

  return (
    <svg width={width} height={height} className="flex-shrink-0" viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx={width} cy={lastY} r="2.5" fill={color} opacity="1" />
      <circle cx={width} cy={lastY} r="5" fill={color} opacity="0.2" />
    </svg>
  )
}

// ─── Circular Gauge ───────────────────────────────────────────

export interface CircularGaugeProps {
  percent: number
  color: string
  size?: number
  strokeWidth?: number
  className?: string
}

export const CircularGauge = forwardRef<HTMLDivElement, CircularGaugeProps>(
  ({ percent, color, size = 64, strokeWidth = 4, className }, ref) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const isInView = useInView(svgRef, { once: true })
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percent / 100) * circumference

    return (
      <div ref={ref} className={cn('relative flex-shrink-0', className)} style={{ width: size, height: size }}>
        <svg ref={svgRef} width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color}
            strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="font-mono text-xs font-bold"
            style={{ color, textShadow: `0 0 8px ${color}40` }}
          >
            {percent}%
          </motion.span>
        </div>
      </div>
    )
  },
)
CircularGauge.displayName = 'CircularGauge'

// ─── Trend helper ─────────────────────────────────────────────

export function getTrendFillColor(trend: Trend): string {
  return trend === 'up' ? '#22c55e' : trend === 'down' ? '#ff2244' : '#eab308'
}
