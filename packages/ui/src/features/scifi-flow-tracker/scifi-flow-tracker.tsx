'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { PriceRegion, StorageLevel, PipelineFlow, TradeEntry } from './types'
import { StorageGauge } from './storage-gauge'
import { PipelineFlows, TradeBars } from './flow-panels'

// ─── Helpers ─────────────────────────────────────────────────

function priceColor(price: number): string {
  if (price >= 13) return '#ff2244'
  if (price >= 10) return '#ff6b00'
  return '#22c55e'
}

function priceColorFaded(price: number): string {
  if (price >= 13) return 'rgba(255,34,68,0.12)'
  if (price >= 10) return 'rgba(255,107,43,0.12)'
  return 'rgba(34,197,94,0.12)'
}

// ─── Props ───────────────────────────────────────────────────

/**
 * Sci-fi multi-panel flow tracker for commodities, pipelines, and storage.
 *
 * @example
 * ```tsx
 * <ScifiFlowTracker
 *   priceRegions={[{ region: 'NE Asia', price: 14.20, change: +2.3 }]}
 *   storageLevels={[{ region: 'Europe', level: 56.2, avg5y: 62, status: 'warning', color: '#ff6b00' }]}
 *   pipelineFlows={[{ route: 'A → B', volume: 85, maxVolume: 200, direction: 'increase', status: 'fact' }]}
 * />
 * ```
 */
export interface ScifiFlowTrackerProps {
  /** Regional price data */
  priceRegions: PriceRegion[]
  /** Storage level data */
  storageLevels: StorageLevel[]
  /** Pipeline flow data */
  pipelineFlows: PipelineFlow[]
  /** Exporter trade entries */
  exporters?: TradeEntry[]
  /** Importer trade entries */
  importers?: TradeEntry[]
  /** Accent colour. Default: `'#00e5ff'` */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ───────────────────────────────────────────────

export const ScifiFlowTracker = forwardRef<HTMLDivElement, ScifiFlowTrackerProps>(
  ({ priceRegions, storageLevels, pipelineFlows, exporters, importers, accentColor = '#00e5ff', className }, ref) => {
    const primaryStorage = storageLevels[0]

    return (
      <section ref={ref} data-slot="scifi-flow-tracker" className={cn('grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6', className)}>
        {/* ═══ 1. Prices Panel ═══ */}
        <div data-slot="prices-panel" className="lg:col-span-2 relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
          <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Spot Prices</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {priceRegions.map((item, i) => (
              <motion.div
                key={item.region}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.06 }}
                className="flex items-center justify-between px-3 py-2.5 rounded-sm border transition-colors"
                style={{ backgroundColor: priceColorFaded(item.price), borderColor: `${priceColor(item.price)}30` }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2 h-8 rounded-full shrink-0"
                    style={{ backgroundColor: priceColor(item.price), boxShadow: `0 0 8px ${priceColor(item.price)}60` }} />
                  <span className="text-[11px] sm:text-xs font-mono text-white/70 truncate">{item.region}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-sm sm:text-base font-bold font-mono" style={{ color: priceColor(item.price) }}>
                    ${item.price.toFixed(2)}
                  </span>
                  <span className={`text-[10px] font-mono ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change >= 0 ? '↑' : '↓'}{Math.abs(item.change).toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ 2. Storage Panel ═══ */}
        <div data-slot="storage-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
          <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Storage Levels</h3>

          {primaryStorage && (
            <div className="flex justify-center mb-2">
              <StorageGauge level={primaryStorage.level} color={primaryStorage.color} label={primaryStorage.region.toUpperCase()} />
            </div>
          )}

          {/* Other regions */}
          <div className="space-y-2">
            {storageLevels.slice(1).map((s, i) => (
              <motion.div
                key={s.region}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.08 }}
                className="flex items-center justify-between px-3 py-2 rounded-sm bg-white/[0.02] border border-white/5"
              >
                <span className="text-[11px] font-mono text-white/70">{s.region}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${s.level}%`, backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}60` }} />
                  </div>
                  <span className="text-xs font-bold font-mono" style={{ color: s.color }}>{s.level.toFixed(1)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ 3. Pipeline Flows ═══ */}
        <div data-slot="pipelines-panel" className="lg:col-span-2 relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
          <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Pipeline Flows</h3>
          <PipelineFlows flows={pipelineFlows} accentColor={accentColor} />
        </div>

        {/* ═══ 4. Trade Panel ═══ */}
        {(exporters && importers) && (
          <div data-slot="trade-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
            <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Trade</h3>
            <TradeBars exporters={exporters} importers={importers} accentColor={accentColor} />
          </div>
        )}
      </section>
    )
  },
)
ScifiFlowTracker.displayName = 'ScifiFlowTracker'
