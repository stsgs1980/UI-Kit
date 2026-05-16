'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Sector } from './types'

/**
 * Horizontal performance bars with animated fill.
 *
 * @example
 * ```tsx
 * <SectorBars
 *   sectors={[
 *     { label: 'Technology', value: 8.2 },
 *     { label: 'Healthcare', value: -2.3 },
 *   ]}
 * />
 * ```
 */
export const SectorBars = forwardRef<HTMLDivElement, {
  sectors: Sector[]
  className?: string
}>(({ sectors, className }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(innerRef, { once: true, margin: '-50px' })
  const maxVal = Math.max(...sectors.map((s) => Math.abs(s.value)), 1)

  return (
    <div ref={ref} className={cn('space-y-3', className)} data-slot="sector-bars">
      {sectors.map((sector, i) => {
        const isPositive = sector.value >= 0
        const barColor = isPositive ? '#22c55e' : '#ff2244'
        const barWidth = (Math.abs(sector.value) / maxVal) * 100

        return (
          <motion.div
            key={i}
            ref={innerRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="group"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="hex-label text-xs font-mono text-[#a0a0c0]">{sector.label}</span>
              <span className="text-xs font-mono font-bold" style={{ color: barColor }}>
                {isPositive ? '+' : ''}{sector.value}%
              </span>
            </div>
            <div className="h-2 bg-[#151530] rounded-[1px] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${barWidth}%` } : {}}
                transition={{ duration: 1.0, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-[1px]"
                style={{
                  background: isPositive
                    ? 'linear-gradient(90deg, rgba(34,197,94,0.4), rgba(34,197,94,0.8))'
                    : 'linear-gradient(90deg, rgba(239,68,68,0.8), rgba(239,68,68,0.4))',
                  boxShadow: isPositive ? '0 0 8px rgba(34,197,94,0.3)' : '0 0 8px rgba(239,68,68,0.3)',
                }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
})
SectorBars.displayName = 'SectorBars'
