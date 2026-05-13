'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { getGaugeColor } from './types'

// --- Animated value hook ---

/** Animate a numeric value with cubic easing */
export function useAnimatedValue(end: number, duration = 1500, isActive = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!isActive) return
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setValue((1 - Math.pow(1 - p, 3)) * end)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, isActive])
  return value
}

// --- Props ---

export interface StormRiskGaugeProps {
  /** Risk percentage (0-100) */
  percent: number
  /** Size in Tailwind class (default "w-20 h-20") */
  size?: string
}

/**
 * StormRiskGauge -- circular SVG gauge for risk percentage.
 *
 * @example
 * ```tsx
 * <StormRiskGauge percent={23} />
 * ```
 */
export function StormRiskGauge({ percent, size = 'w-20 h-20' }: StormRiskGaugeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const animated = useAnimatedValue(percent, 1800, isInView)
  const gaugeColor = getGaugeColor(percent)
  const radius = 36; const sw = 6; const circ = 2 * Math.PI * (radius - sw)

  return (
    <div ref={ref} className="flex flex-col items-center gap-1" data-slot="storm-risk-gauge">
      <div className={`relative ${size}`}>
        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r={radius - sw} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
          <motion.circle cx="40" cy="40" r={radius - sw} fill="none" stroke={gaugeColor} strokeWidth={sw}
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={isInView ? { strokeDashoffset: circ * (1 - percent / 100) } : {}}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 4px ${gaugeColor})` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-bold" style={{ color: gaugeColor }}>{Math.round(animated)}%</span>
        </div>
      </div>
    </div>
  )
}
