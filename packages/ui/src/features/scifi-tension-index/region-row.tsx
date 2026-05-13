'use client'

import { motion } from 'framer-motion'
import type { RegionData } from './types'

/**
 * Animated region bar row.
 *
 * @example
 * ```tsx
 * <RegionRow region={{ name: 'Region A', score: 82, color: '#ff2244' }} index={0} />
 * ```
 */
export function RegionRow({ region, index }: { region: RegionData; index: number }) {
  const color = region.color ?? (region.score >= 75 ? '#ff2244' : region.score >= 50 ? '#ff6b00' : region.score >= 30 ? '#eab308' : '#00e5ff')
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center gap-3 py-2 px-1 rounded-sm transition-all duration-200 hover:bg-[rgba(255,255,255,0.02)]"
      data-slot="region-row">
      <span className="font-mono text-xs sm:text-sm text-[#c0c0d8] truncate min-w-0 flex-shrink-0 w-[140px] sm:w-[180px]">{region.name}</span>
      <div className="flex-1 h-3 bg-[rgba(255,255,255,0.04)] rounded-sm overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${region.score}%` }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.06 + 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-sm" style={{ background: `linear-gradient(90deg, ${color}50, ${color})`, boxShadow: `0 0 6px ${color}30` }} />
      </div>
      <span className="font-mono text-xs sm:text-sm font-bold tabular-nums w-8 text-right flex-shrink-0" style={{ color }}>{region.score}</span>
    </motion.div>
  )
}
