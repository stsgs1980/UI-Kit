'use client'

import { forwardRef } from 'react'
import { cn } from '../../tokens/cn'
import type { DisruptionEvent, KpiItem } from './types'
import { DisruptionRow, SEVERITY_CFG, TREND_CFG, STATUS_CFG } from './disruption-row'
import { RiskMeter } from './risk-meter'

// ─── Props ───────────────────────────────────────────────────

/**
 * Sci-fi supply chain / risk tracker panel.
 *
 * @example
 * ```tsx
 * <ScifiChainTracker
 *   disruptions={[
 *     { id: '1', name: 'Red Sea', status: 'active', severity: 'critical',
 *       impact: -2.1, duration: '4+ months', trend: 'down',
 *       description: 'Rerouted via Cape of Good Hope.' },
 *   ]}
 *   riskScore={62}
 *   summaryKpis={[
 *     { label: 'Lost Volume', value: '3.85', unit: 'M units/day', color: '#ff2244' },
 *   ]}
 * />
 * ```
 */
export interface ScifiChainTrackerProps {
  /** Disruption events to display */
  disruptions: DisruptionEvent[]
  /** Risk index 0–100 */
  riskScore: number
  /** Summary KPI cards */
  summaryKpis: KpiItem[]
  /** Accent colour. Default: `'#00e5ff'` */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ───────────────────────────────────────────────

export const ScifiChainTracker = forwardRef<HTMLDivElement, ScifiChainTrackerProps>(
  ({ disruptions, riskScore, summaryKpis, accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} data-slot="scifi-chain-tracker" className={cn('space-y-6', className)}>
        {/* Summary strip */}
        <div data-slot="chain-summary" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6"
          style={{ borderColor: `${accentColor}20` }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {summaryKpis.map((kpi) => (
              <div key={kpi.label} className="text-center">
                <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className="font-mono text-2xl sm:text-3xl font-bold"
                  style={{ color: kpi.color, textShadow: `0 0 12px ${kpi.color}40` }}>
                  {kpi.value}
                </div>
                <div className="font-mono text-[10px] text-white/25">{kpi.unit}</div>
              </div>
            ))}
          </div>

          {/* Risk meter */}
          <div className="mt-6 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-white font-bold">Chain Risk Index</span>
            </div>
            <RiskMeter score={riskScore} />
          </div>
        </div>

        {/* Disruption list */}
        <div data-slot="chain-list" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
          <div className="max-h-[560px] overflow-y-auto divide-y divide-white/[0.04]">
            {disruptions.map((d, i) => (
              <DisruptionRow key={d.id} disruption={d} index={i} accentColor={accentColor} />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-x-4 gap-y-2">
            {(Object.entries(STATUS_CFG) as [keyof typeof STATUS_CFG, typeof STATUS_CFG.active][]).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${v.pulse ? 'animate-pulse' : ''}`} style={{ backgroundColor: v.color }} />
                <span className="font-mono text-[9px] text-white/40">{v.label}</span>
              </div>
            ))}
            {(Object.entries(TREND_CFG) as [string, { label: string; color: string }][]).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="font-mono text-[9px]" style={{ color: v.color }}>{v.label}</span>
                <span className="font-mono text-[9px] text-white/40">{k.charAt(0).toUpperCase() + k.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  },
)
ScifiChainTracker.displayName = 'ScifiChainTracker'
