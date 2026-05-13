'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { ReserveRegion, SummaryStat } from './types'
import { TREND_CONFIG } from './types'
import { CircularGauge, SparklineMini, getTrendFillColor } from './reserve-gauges'

// ─── Storage Gauge Card ───────────────────────────────────────

function StorageGaugeCard({ region, index }: { region: ReserveRegion; index: number }) {
  const trend = TREND_CONFIG[region.trend]
  const color = region.accentColor ?? '#00e5ff'
  const fillColor = getTrendFillColor(region.trend)

  return (
    <div
      className="p-4 sm:p-6 rounded-sm backdrop-blur-sm h-full"
      style={{ backgroundColor: 'rgba(10, 10, 26, 0.8)', border: `1px solid ${color}30` }}
    >
      <div className="flex items-start gap-4">
        <CircularGauge percent={region.capacityPercent} color={color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {region.icon && <span className="text-base">{region.icon}</span>}
            <h3 className="font-mono text-xs sm:text-sm font-bold text-white truncate">{region.name}</h3>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono text-lg sm:text-xl font-bold" style={{ color, textShadow: `0 0 10px ${color}40` }}>
              {region.currentValue}
            </span>
            {region.unit && <span className="font-mono text-[10px] text-[#7070a0]">{region.unit}</span>}
          </div>

          {/* Capacity bar */}
          <div className="mb-3">
            <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${region.capacityPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}40, ${color})`, boxShadow: `0 0 6px ${color}30` }}
              />
            </div>
          </div>

          {/* Trend + sparkline */}
          <div className="flex items-center justify-between gap-3">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm" style={{ color: trend.color, backgroundColor: trend.bg }}>
              {trend.label} {region.trendValue}
            </span>
            <SparklineMini data={region.sparkline} color={fillColor} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Summary Card ─────────────────────────────────────────────

function SummaryCard({ stat, index }: { stat: SummaryStat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="p-4 sm:p-5 rounded-sm backdrop-blur-sm h-full text-center"
      style={{ backgroundColor: 'rgba(10, 10, 26, 0.8)', border: `1px solid rgba(0,229,255,0.2)` }}
    >
      <div className="font-mono text-[10px] sm:text-xs text-[#7070a0] uppercase tracking-wider mb-2">{stat.label}</div>
      <div className="flex items-baseline justify-center gap-1 mb-2">
        {stat.prefix && <span className="font-mono text-sm text-[#505080]">{stat.prefix}</span>}
        <span className="font-mono text-xl sm:text-2xl font-bold" style={{ color: stat.color }}>
          {stat.value.toFixed(stat.decimals ?? 0)}{stat.suffix}
        </span>
      </div>
      <div className="font-mono text-[10px] leading-relaxed mx-auto max-w-[200px]" style={{ color: `${stat.color}99` }}>
        {stat.description}
      </div>
      <div className="mt-3 mx-auto w-12 h-[2px] rounded-full" style={{ backgroundColor: stat.color, boxShadow: `0 0 8px ${stat.color}60` }} />
    </motion.div>
  )
}

// ─── Exports ──────────────────────────────────────────────────

export interface ReserveCardsProps {
  regions: ReserveRegion[]
  summaryStats: SummaryStat[]
  className?: string
}

export const ReserveCards = forwardRef<HTMLDivElement, ReserveCardsProps>(
  ({ regions, summaryStats, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-8 sm:space-y-12', className)}>
        {/* Storage gauges grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {regions.map((region, i) => (
            <StorageGaugeCard key={region.id} region={region} index={i} />
          ))}
        </div>

        {/* Summary stats */}
        {summaryStats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {summaryStats.map((stat, i) => (
              <SummaryCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        )}
      </div>
    )
  },
)
ReserveCards.displayName = 'ReserveCards'
