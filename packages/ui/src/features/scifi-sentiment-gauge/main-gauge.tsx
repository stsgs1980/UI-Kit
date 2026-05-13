'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { ScifiSentimentGaugeProps } from './types'

/**
 * Main SVG arc gauge (270-degree sweep) with gradient, tick marks, and needle dot.
 *
 * @example
 * ```tsx
 * <MainGauge score={64} isInView={true} accentColor="#00e5ff" />
 * ```
 */
export const MainGauge = forwardRef<HTMLDivElement, {
  score: number
  isInView: boolean
  accentColor?: string
  className?: string
}>(({ score, isInView, accentColor = '#00e5ff', className }, ref) => {
  const cx = 100, cy = 100, radius = 80, strokeWidth = 12
  const startAngle = 210, endAngle = 330, totalAngle = endAngle - startAngle
  const rad = ((startAngle + (score / 100) * totalAngle) * Math.PI) / 180
  const arcX = cx + radius * Math.cos(rad)
  const arcY = cy + radius * Math.sin(rad)

  const bgStartRad = (startAngle * Math.PI) / 180
  const bgEndRad = (endAngle * Math.PI) / 180
  const bgStartX = cx + radius * Math.cos(bgStartRad)
  const bgStartY = cy + radius * Math.sin(bgStartRad)
  const bgEndX = cx + radius * Math.cos(bgEndRad)
  const bgEndY = cy + radius * Math.sin(bgEndRad)

  const color = score >= 70 ? '#22c55e' : score >= 50 ? '#eab308' : score >= 30 ? '#f97316' : '#ff2244'

  return (
    <div ref={ref} className={cn('relative w-full max-w-[260px] mx-auto', className)} data-slot="main-gauge">
      <svg viewBox="0 0 200 140" className="w-full" style={{ filter: `drop-shadow(0 0 12px ${accentColor}15)` }}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2244" />
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>
          <linearGradient id="gaugeGradGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(239,68,68,0.4)" />
            <stop offset="50%" stopColor="rgba(234,179,8,0.4)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.4)" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={`M ${bgStartX} ${bgStartY} A ${radius} ${radius} 0 0 1 ${bgEndX} ${bgEndY}`}
          fill="none" stroke="rgba(30,30,50,0.8)" strokeWidth={strokeWidth} strokeLinecap="round"
        />

        {/* Tick marks */}
        {Array.from({ length: 11 }, (_, i) => {
          const tickAngle = startAngle + (i / 10) * totalAngle
          const tickRad = (tickAngle * Math.PI) / 180
          const innerR = radius - strokeWidth / 2 - 4
          const outerR = radius - strokeWidth / 2 - (i % 5 === 0 ? 14 : 8)
          return (
            <line key={i}
              x1={cx + innerR * Math.cos(tickRad)} y1={cy + innerR * Math.sin(tickRad)}
              x2={cx + outerR * Math.cos(tickRad)} y2={cy + outerR * Math.sin(tickRad)}
              stroke="rgba(120,120,170,0.3)" strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
            />
          )
        })}

        {/* Value arc */}
        {isInView && (
          <motion.path
            d={`M ${bgStartX} ${bgStartY} A ${radius} ${radius} 0 0 1 ${bgEndX} ${bgEndY}`}
            fill="none" stroke="url(#gaugeGrad)" strokeWidth={strokeWidth} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        )}

        {/* Glow */}
        {isInView && (
          <motion.path
            d={`M ${bgStartX} ${bgStartY} A ${radius} ${radius} 0 0 1 ${bgEndX} ${bgEndY}`}
            fill="none" stroke="url(#gaugeGradGlow)" strokeWidth={strokeWidth + 8} strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} opacity={0.3}
          />
        )}

        {/* Needle dot */}
        {isInView && (
          <motion.circle cx={arcX} cy={arcY} r={5} fill={color}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.1 }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        )}

        {/* Labels */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="monospace"
          style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.5s 0.8s' }}>
          {isInView ? score : '0'}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" fill="#7070a0" fontSize="9" fontFamily="monospace">INDEX</text>
        <text x={bgStartX - 2} y={bgStartY + 16} textAnchor="middle" fill="#505080" fontSize="8" fontFamily="monospace">0</text>
        <text x={bgEndX + 2} y={bgEndY + 16} textAnchor="middle" fill="#505080" fontSize="8" fontFamily="monospace">100</text>
      </svg>
    </div>
  )
})
MainGauge.displayName = 'MainGauge'
