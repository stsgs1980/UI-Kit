'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { AssetRegion, AssetRegionStatus } from './types'
import { TrendChart } from './trend-chart'

function sc(s: AssetRegionStatus) { return s === 'growing' ? '#22c55e' : s === 'declining' ? '#ff2244' : '#eab308' }
function cs(c: number) { return c > 0 ? '#22c55e' : c < 0 ? '#ff2244' : '#eab308' }
function sym(c: number) { return c > 0 ? '▲' : c < 0 ? '▼' : '●' }

/** Region row sub-component */
function RegionRow({ region, idx, accentColor }: { region: AssetRegion; idx: number; accentColor: string }) {
  const color = sc(region.status)
  return (
    <motion.div
      key={region.name} initial={{ opacity: 0 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      className="flex items-center justify-between p-3 rounded-sm hover:bg-white/[0.02] transition-colors"
      style={{ borderLeft: `3px solid ${color}30` }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-sm text-white/90 truncate">{region.name}</span>
          <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm shrink-0"
            style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>{region.status}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xl font-bold" style={{ color: accentColor }}>{region.count}</span>
          <span className="font-mono text-sm" style={{ color: cs(region.change) }}>
            {sym(region.change)} {region.change > 0 ? '+' : ''}{region.change}
          </span>
        </div>
      </div>
      {region.sparkline && (
        <div className="shrink-0 ml-2">
          <svg width={80} height={28} viewBox="0 0 80 28" className="block">
            <polyline fill="none" stroke={color} strokeWidth={1.5}
              points={region.sparkline.map((v, i) => {
                const x = (i / (region.sparkline!.length - 1)) * 78 + 1
                const mn = Math.min(...region.sparkline!), mx = Math.max(...region.sparkline!)
                return `${x},${26 - ((v - mn) / (mx - mn || 1)) * 24}`
              }).join(' ')} />
          </svg>
        </div>
      )}
    </motion.div>
  )
}

/**
 * Sci-fi asset tracker with regional breakdown and trend chart.
 * @example
 * ```tsx
 * <ScifiAssetTracker totalAssets={724} utilizationRate={78.2}
 *   regions={[{ name: 'Gulf', count: 189, change: -4, status: 'declining' }]} />
 * ```
 */
export interface ScifiAssetTrackerProps {
  title?: string
  totalAssets: number
  utilizationRate: number
  regions: AssetRegion[]
  trendData?: number[]
  trendLabels?: string[]
  accentColor?: string
  className?: string
}

export const ScifiAssetTracker = forwardRef<HTMLDivElement, ScifiAssetTrackerProps>(
  ({ totalAssets, utilizationRate, regions, trendData, trendLabels, accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} data-slot="scifi-asset-tracker" className={cn('space-y-6', className)}>
        {/* Hero counter */}
        <div data-slot="asset-counter" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-6 text-center"
          style={{ borderColor: `${accentColor}20` }}>
          <p className="text-white/40 font-mono text-xs uppercase tracking-wider mb-2">Total Active Assets</p>
          <div className="font-mono text-5xl sm:text-6xl font-bold" style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}40` }}>
            {totalAssets}
          </div>
        </div>

        {/* Utilization */}
        <div data-slot="utilization-bar" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <span className="font-mono text-3xl sm:text-4xl font-bold" style={{ color: '#ff6b00', textShadow: '0 0 15px rgba(255,107,43,0.3)' }}>
              {utilizationRate}%
            </span>
            <span className="font-mono text-xs text-white/40">Threshold: 85%</span>
          </div>
          <div className="w-full h-3 bg-[rgba(255,107,43,0.1)] rounded-sm overflow-hidden relative">
            <div className="absolute top-0 bottom-0 w-px z-10" style={{ left: '85%', backgroundColor: 'rgba(255,34,68,0.5)' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#ff2244] whitespace-nowrap">85%</div>
            </div>
            <motion.div initial={{ width: 0 }} animate={{ width: `${utilizationRate}%` }} transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-sm"
              style={{ background: 'linear-gradient(90deg, #ff6b00, #ff9f43, #ffcc02)', boxShadow: '0 0 12px rgba(255,107,43,0.4)' }} />
          </div>
        </div>

        {/* Two-column: Regions + Trend */}
        {trendData && trendLabels ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div data-slot="regional-list" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
              <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Regional Breakdown</h3>
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {regions.map((r, i) => <RegionRow key={r.name} region={r} idx={i} accentColor={accentColor} />)}
              </div>
            </div>
            <div data-slot="trend-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
              <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-4">Activity Trend</h3>
              <TrendChart data={trendData} labels={trendLabels} accentColor={accentColor} />
            </div>
          </div>
        ) : (
          <div data-slot="regional-list" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
            <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Regional Breakdown</h3>
            <div className="space-y-3">
              {regions.map((r, i) => <RegionRow key={r.name} region={r} idx={i} accentColor={accentColor} />)}
            </div>
          </div>
        )}
      </section>
    )
  },
)
ScifiAssetTracker.displayName = 'ScifiAssetTracker'
