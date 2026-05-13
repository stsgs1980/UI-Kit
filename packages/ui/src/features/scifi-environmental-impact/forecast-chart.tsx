'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getBarColor, getBarGlow } from './types'
import type { ForecastData } from './types'

// --- Props ---

export interface ForecastChartProps {
  /** Forecast data points (one per bar) */
  forecast: ForecastData[]
  /** Chart title */
  title?: string
  /** Maximum value for the Y axis */
  maxValue?: number
  /** Threshold value for danger line */
  threshold?: number
  /** Threshold label text */
  thresholdLabel?: string
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

// --- Legend items ---

const DEFAULT_LEGEND = [
  { color: '#22c55e', label: 'Safe' },
  { color: '#eab308', label: 'Moderate' },
  { color: '#ff6b00', label: 'Danger' },
  { color: '#ff2244', label: 'Critical' },
]

// --- Component ---

/**
 * ForecastChart -- SVG bar chart with animated bars and danger threshold line.
 *
 * @example
 * ```tsx
 * <ForecastChart
 *   forecast={[{ day: 'Mon', height: 1.8 }, { day: 'Tue', height: 3.4 }]}
 *   threshold={3.0}
 *   thresholdLabel="Danger threshold"
 * />
 * ```
 */
export function ForecastChart({
  forecast,
  maxValue = 5,
  threshold,
  thresholdLabel = 'Danger threshold',
  accentColor = '#00e5ff',
}: ForecastChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const chartH = 160
  const chartW = 400
  const barW = 32
  const barGap = (chartW - barW * forecast.length) / (forecast.length + 1)
  const thresholdY = threshold ? chartH - (threshold / maxValue) * chartH : null

  return (
    <div ref={ref} data-slot="forecast-chart">
      <svg
        viewBox={`0 0 ${chartW} ${chartH + 24}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5].map((mark) => {
          const y = chartH - (mark / maxValue) * chartH
          return (
            <g key={mark}>
              <line x1="0" y1={y} x2={chartW} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <text x={chartW - 4} y={y - 4} fill="#505070" fontSize="8" fontFamily="monospace" textAnchor="end">
                {mark}
              </text>
            </g>
          )
        })}

        {/* Threshold line */}
        {thresholdY !== null && (
          <>
            <line x1="0" y1={thresholdY} x2={chartW} y2={thresholdY} stroke="#ff2244" strokeWidth="1" strokeDasharray="6,4" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
            </line>
            <text x="4" y={thresholdY - 6} fill="#ff2244" fontSize="7" fontFamily="monospace" opacity="0.8">
              {thresholdLabel}
            </text>
          </>
        )}

        {/* Bars */}
        {forecast.map((item, i) => {
          const barHeight = (item.height / maxValue) * chartH
          const x = barGap + i * (barW + barGap)
          const y = chartH - barHeight
          const color = getBarColor(item.height)
          const glow = getBarGlow(item.height)

          return (
            <g key={item.day}>
              <motion.rect x={x - 2} y={y - 2} width={barW + 4} height={barHeight + 2} rx="2" fill={glow}
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.3 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }} />
              <motion.rect x={x} y={chartH} width={barW} height={0} rx="2" fill={color}
                initial={{ y: chartH, height: 0 }} animate={isInView ? { y, height: barHeight } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} />
              <motion.text x={x + barW / 2} y={y - 6} fill={color} fontSize="9" fontFamily="monospace"
                fontWeight="bold" textAnchor="middle"
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.6 }}>
                {item.height}
              </motion.text>
              <text x={x + barW / 2} y={chartH + 16} fill="#7070a0" fontSize="10" fontFamily="monospace" textAnchor="middle">
                {item.day}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-[#1a1a3a]">
        {DEFAULT_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: item.color, boxShadow: `0 0 4px ${item.color}60` }} />
            <span className="text-[9px] font-mono text-[#7070a0]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
