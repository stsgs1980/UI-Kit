'use client'

import { forwardRef, useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { TrendDirection } from './types'
import { getTrendColor } from './types'

// --- Animated counter hook ---

function useAnimatedCounter(target: number, duration = 1500, isActive = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!isActive) return
    const startTime = Date.now()
    const isNeg = target < 0
    const absTarget = Math.abs(target)
    const tick = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(isNeg ? -(eased * absTarget) : eased * absTarget)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, isActive])
  return value
}

// --- Props ---

export interface BalanceGaugeProps {
  /** Supply value */
  supply: number
  /** Demand value */
  demand: number
  /** Ratio label (default "RATIO") */
  ratioLabel?: string
  /** Deficit description text */
  deficitLabel?: string
  /** Accent color for demand (default '#00e5ff') */
  accentColor?: string
}

/**
 * BalanceGauge -- SVG circular gauge showing supply/demand ratio.
 *
 * @example
 * ```tsx
 * <BalanceGauge supply={103.8} demand={105.2} />
 * ```
 */
export const BalanceGauge = forwardRef<HTMLDivElement, BalanceGaugeProps>(
  ({ supply, demand, ratioLabel = 'RATIO', deficitLabel, accentColor = '#00e5ff' }, ref) => {
    const isInView = useInView(ref as React.RefObject<HTMLDivElement>, { once: true, margin: '-40px' })
    const ratio = supply / demand
    const deficit = demand - supply
    const percent = Math.round(ratio * 100)
    const animated = useAnimatedCounter(percent, 1800, isInView)
    const gaugeColor = deficit > 0 ? '#ff6b00' : accentColor

    const radius = 80
    const sw = 10
    const safeR = radius - sw
    const circ = 2 * Math.PI * safeR

    return (
      <div ref={ref} className="flex flex-col items-center gap-3" data-slot="balance-gauge">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r={safeR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
            <motion.circle cx="100" cy="100" r={safeR} fill="none" stroke={gaugeColor} strokeWidth={sw}
              strokeLinecap="round" strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={isInView ? { strokeDashoffset: circ * (1 - ratio) } : {}}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: `drop-shadow(0 0 6px ${gaugeColor})` }} />
            <motion.circle cx="100" cy="100" r={safeR - 14} fill="none" stroke={gaugeColor} strokeWidth="0.5" opacity="0.3"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.3 } : {}}
              transition={{ duration: 2, delay: 0.5 }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span className="text-3xl sm:text-4xl font-bold font-mono" style={{ color: gaugeColor }}
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}>
              {animated.toFixed(1)}%
            </motion.span>
            <span className="text-[10px] sm:text-xs font-mono text-[#7070a0] mt-1">{ratioLabel}</span>
          </div>
        </div>
        {deficitLabel && deficit > 0 && (
          <p className="text-xs sm:text-sm font-mono text-[#ff6b00] leading-relaxed max-w-xs text-center">{deficitLabel}</p>
        )}
      </div>
    )
  },
)
BalanceGauge.displayName = 'BalanceGauge'

// --- Trend Arrow ---

function TrendArrow({ trend, color }: { trend: TrendDirection; color?: string }) {
  const c = color ?? getTrendColor(trend)
  if (trend === 'up') return <span style={{ color: c }} className="text-sm font-bold">▲</span>
  if (trend === 'down') return <span style={{ color: c }} className="text-sm font-bold">▼</span>
  return <span style={{ color: c }} className="text-sm font-bold">●</span>
}
