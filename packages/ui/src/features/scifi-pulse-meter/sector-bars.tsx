'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { SectorData } from './types'

/**
 * Animated horizontal sector performance bars.
 *
 * @example
 * ```tsx
 * <PulseSectorBars
 *   sectors={[
 *     { label: 'Energy', value: 3.2 },
 *     { label: 'Logistics', value: -1.2 },
 *   ]}
 * />
 * ```
 */
export const PulseSectorBars = forwardRef<HTMLDivElement, {
  sectors: SectorData[]
  className?: string
}>(({ sectors, className }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(innerRef, { once: true, margin: '-50px' })
  const maxVal = Math.max(...sectors.map((s) => Math.abs(s.value)), 1)

  return (
    <div ref={ref} className={cn('space-y-2.5', className)} data-slot="pulse-sector-bars">
      {sectors.map((sector, i) => {
        const isPositive = sector.value >= 0
        const barColor = isPositive ? '#22c55e' : '#ff2244'
        const barWidth = (Math.abs(sector.value) / maxVal) * 100

        return (
          <motion.div
            key={sector.key ?? i}
            ref={innerRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs font-mono text-[#b0b0d0] group-hover:text-white transition-colors">
                {sector.label}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold" style={{ color: barColor }}>
                {isPositive ? '+' : ''}{sector.value}%
              </span>
            </div>
            <div className="relative h-[7px] bg-white/[0.03] rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${barWidth}%` } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 h-full rounded-sm"
                style={{
                  background: `linear-gradient(to right, ${barColor}25, ${barColor}90)`,
                  boxShadow: `0 0 8px ${barColor}30`,
                }}
              />
            </div>
          </motion.div>
        )
      })}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-3 mt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span className="text-[10px] font-mono text-[#7070a0]">Positive</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff2244]" />
          <span className="text-[10px] font-mono text-[#7070a0]">Negative</span>
        </div>
      </div>
    </div>
  )
})
PulseSectorBars.displayName = 'PulseSectorBars'
