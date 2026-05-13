'use client'

import { forwardRef } from 'react'
import { cn } from '../../tokens/cn'
import type { DisruptionItem } from './types'
import { DisruptionGauge } from './disruption-gauge'
import { DisruptionRow, STATUS_CFG } from './disruption-row'

/**
 * Sci-fi disruption dashboard with gauge and table.
 *
 * @example
 * ```tsx
 * <ScifiDisruptionPanel
 *   disruptions={[{ id: '1', region: 'Alpha', detail: 'Congestion',
 *     type: 'blockade', volume: 2.1, duration: 45,
 *     status: 'active', impact: 72 }]}
 *   riskScore={42}
 * />
 * ```
 */
export interface ScifiDisruptionPanelProps {
  disruptions: DisruptionItem[]
  riskScore: number
  accentColor?: string
  className?: string
}

export const ScifiDisruptionPanel = forwardRef<HTMLDivElement, ScifiDisruptionPanelProps>(
  ({ disruptions, riskScore, accentColor = '#00e5ff', className }, ref) => {
    const totalVolume = disruptions.reduce((s, d) => s + d.volume, 0)
    const activeCount = disruptions.filter(d => d.status === 'active').length
    const hi = disruptions.reduce((max, d) => (d.impact > max.impact ? d : max), disruptions[0])

    return (
      <div ref={ref} data-slot="scifi-disruption-panel" className={cn('grid grid-cols-1 lg:grid-cols-3 gap-6', className)}>
        {/* Left: Gauge + Summary */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div data-slot="gauge-card" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
            <DisruptionGauge score={riskScore} accentColor={accentColor} />
            <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-4 gap-1">
              {[
                { label: 'Low', color: accentColor, range: '0-30' },
                { label: 'Mod.', color: '#eab308', range: '30-50' },
                { label: 'High', color: '#ff6b00', range: '50-75' },
                { label: 'Crit.', color: '#ff2244', range: '75+' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <div className="w-full h-1 rounded-full" style={{ backgroundColor: `${item.color}40` }} />
                  <span className="font-mono text-[8px] text-white/25">{item.range}</span>
                </div>
              ))}
            </div>
          </div>

          <div data-slot="summary-card" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Volume', value: totalVolume.toFixed(1), sub: 'M units/day', color: '#ff6b00' },
                { label: 'Active Events', value: `${activeCount}`, sub: `of ${disruptions.length}`, color: '#ff2244' },
                { label: 'Avg Duration', value: `${Math.round(disruptions.reduce((s, d) => s + d.duration, 0) / (disruptions.length || 1))}`, sub: 'days', color: '#eab308' },
                { label: 'Max Risk', value: hi?.region ?? '—', sub: `impact ${hi?.impact ?? 0}`, color: '#a855f7' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="font-mono text-xl sm:text-2xl font-bold"
                    style={{ color: stat.color, textShadow: `0 0 12px ${stat.color}40` }}>{stat.value}</div>
                  <div className="font-mono text-[10px] text-white/25">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Table */}
        <div className="lg:col-span-2">
          <div data-slot="disruption-table" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
            <div className="hidden md:grid md:grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr_0.8fr_1fr] gap-3 items-center px-3 pb-2 border-b border-white/[0.06]">
              {['Region', 'Type', 'Volume', 'Days', 'Status', 'Impact'].map((h) => (
                <span key={h} className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{h}</span>
              ))}
            </div>
            <div className="max-h-[480px] overflow-y-auto divide-y divide-white/[0.04]">
              {disruptions.map((d, i) => <DisruptionRow key={d.id} disruption={d} index={i} />)}
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-x-4 gap-y-2">
              {(Object.entries(STATUS_CFG) as [string, typeof STATUS_CFG.active][]).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${v.pulse ? 'animate-pulse' : ''}`} style={{ backgroundColor: v.color }} />
                  <span className="font-mono text-[9px] text-white/40">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
)
ScifiDisruptionPanel.displayName = 'ScifiDisruptionPanel'
