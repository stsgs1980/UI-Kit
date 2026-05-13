'use client'

import { motion } from 'framer-motion'
import type { DriverData } from './types'

/**
 * Animated driver row with impact bar.
 *
 * @example
 * ```tsx
 * <DriverRow driver={{ name: 'Factor X', impact: 92, color: '#ff2244' }} index={0} />
 * ```
 */
export function DriverRow({ driver, index }: { driver: DriverData; index: number }) {
  const color = driver.color ?? '#a855f7'
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 py-2 px-3 rounded-sm border border-transparent hover:border-[rgba(168,85,247,0.1)] transition-all duration-200"
      data-slot="driver-row">
      <span className="font-mono text-[10px] text-[#505080] w-5 text-center flex-shrink-0">{String(index + 1).padStart(2, '0')}</span>
      <span className="font-mono text-xs sm:text-sm text-[#c0c0d8] truncate flex-1 min-w-0">{driver.name}</span>
      <div className="w-16 sm:w-24 h-2 bg-[rgba(255,255,255,0.04)] rounded-sm overflow-hidden flex-shrink-0">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${driver.impact}%` }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.07 + 0.15 }}
          className="h-full rounded-sm" style={{ background: `linear-gradient(90deg, ${color}50, ${color})`, boxShadow: `0 0 4px ${color}25` }} />
      </div>
      <span className="font-mono text-xs sm:text-sm font-bold tabular-nums w-8 text-right flex-shrink-0" style={{ color }}>{driver.impact}</span>
    </motion.div>
  )
}
