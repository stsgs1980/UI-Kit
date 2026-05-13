'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { SparklineMini } from './sparkline-mini'
import type { CorrelationItem } from './types'
import { getCorrelationColor, getCorrelationStrength, getChangeColor, formatChange } from './types'

/**
 * Single row in the correlation table with label, value, change, correlation bar, and sparkline.
 *
 * @example
 * ```tsx
 * <CorrelationRow item={{
 *   id: '1', label: 'USD/RUB', value: '77.4500',
 *   change: -4.26, correlation: -0.85, sparkline: [81.2, 80.5, 79.8],
 * }} index={0} accentColor="#00e5ff" />
 * ```
 */
export const CorrelationRow = forwardRef<HTMLDivElement, {
  item: CorrelationItem
  index: number
  accentColor?: string
  className?: string
}>(({ item, index, accentColor = '#00e5ff', className }, ref) => {
  const corrColor = item.correlation !== undefined ? getCorrelationColor(item.correlation) : '#7070a0'
  const change24hColor = item.change !== undefined ? getChangeColor(item.change) : '#eab308'
  const sparkColor = item.change !== undefined ? (item.change >= 0 ? '#22c55e' : '#ff2244') : accentColor

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        'group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 px-3 rounded-sm',
        'border border-transparent transition-all duration-300',
        className,
      )}
      style={{
        '--hover-border': `${accentColor}1A`,
        '--hover-bg': `${accentColor}05`,
      } as React.CSSProperties}
      data-slot="correlation-row"
    >
      {/* Name + sublabel */}
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm font-bold text-white truncate">{item.label}</div>
        {item.sublabel && (
          <div className="font-mono text-[10px] text-[#7070a0]">{item.sublabel}</div>
        )}
      </div>

      {/* Value */}
      <div className="font-mono text-sm font-bold text-white tabular-nums sm:w-24 text-right">
        {item.value}
      </div>

      {/* Change */}
      {item.change !== undefined && (
        <div className="font-mono text-xs font-bold sm:w-16 text-right tabular-nums" style={{ color: change24hColor }}>
          {formatChange(item.change)}
        </div>
      )}

      {/* Correlation bar */}
      {item.correlation !== undefined && (
        <div className="sm:w-32 flex flex-col gap-0.5">
          <div className="font-mono text-[9px] text-[#7070a0]">
            {getCorrelationStrength(item.correlation)}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.abs(item.correlation) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${corrColor}40, ${corrColor})`,
                  boxShadow: `0 0 4px ${corrColor}40`,
                }}
              />
            </div>
            <span className="font-mono text-[10px] w-8 text-right" style={{ color: corrColor }}>
              {item.correlation > 0 ? '' : '-'}{Math.abs(item.correlation).toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Sparkline */}
      {item.sparkline && item.sparkline.length > 0 && (
        <div className="flex-shrink-0">
          <SparklineMini data={item.sparkline} color={sparkColor} />
        </div>
      )}
    </motion.div>
  )
})
CorrelationRow.displayName = 'CorrelationRow'
