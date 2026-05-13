'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { RiskItem } from './types'
import { probBarWidth, probBarColor, impactShortLabel, impactBadgeColor } from './types'

/**
 * Sidebar panel listing all risk items with probability bars and impact badges.
 *
 * @example
 * ```tsx
 * <RiskMatrixDetails
 *   items={risks}
 *   probabilities={['High','Medium','Low']}
 *   impacts={['Low','Medium','High','Critical']}
 * />
 * ```
 */
export const RiskMatrixDetails = forwardRef<HTMLDivElement, {
  items: RiskItem[]
  probabilities: string[]
  impacts: string[]
  accentColor?: string
  className?: string
}>(({ items, probabilities, impacts, accentColor = '#00e5ff', className }, ref) => {
  const totalP = probabilities.length
  const totalI = impacts.length

  return (
    <div ref={ref} className={cn('flex flex-col gap-3', className)} data-slot="risk-matrix-details">
      {items.map((item, idx) => {
        const pIdx = probabilities.indexOf(item.probability)
        const iIdx = impacts.indexOf(item.impact)
        const itemColor = item.color ?? accentColor

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
            className="relative p-3 rounded-sm transition-colors duration-200"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderLeft: `2px solid ${itemColor}`,
            }}
            data-slot="risk-detail-item"
          >
            {/* Name + impact badge */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: itemColor, boxShadow: `0 0 6px ${itemColor}` }}
                />
                <span className="font-mono text-xs sm:text-sm text-white font-medium leading-tight">
                  {item.name}
                </span>
              </div>
              <span
                className="font-mono text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-sm shrink-0 uppercase tracking-wider"
                style={{
                  backgroundColor: `${impactBadgeColor(iIdx, totalI)}20`,
                  color: impactBadgeColor(iIdx, totalI),
                  border: `1px solid ${impactBadgeColor(iIdx, totalI)}40`,
                }}
              >
                {impactShortLabel(item.impact)}
              </span>
            </div>

            {/* Description */}
            <p className="font-mono text-[10px] sm:text-xs text-[#7070a0] leading-relaxed mb-2 pl-4">
              {item.description}
            </p>

            {/* Probability bar */}
            <div className="pl-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-[#505080] uppercase tracking-wider w-16 shrink-0">
                  Prob.
                </span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${probBarWidth(pIdx, totalP)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: probBarColor(pIdx, totalP),
                      boxShadow: `0 0 8px ${probBarColor(pIdx, totalP)}60`,
                    }}
                  />
                </div>
                <span
                  className="font-mono text-[9px] w-14 text-right shrink-0"
                  style={{ color: probBarColor(pIdx, totalP) }}
                >
                  {item.probability}
                </span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
})
RiskMatrixDetails.displayName = 'RiskMatrixDetails'
