'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { HudCard } from '../hud-card'
import { BalanceGauge } from './balance-gauge'
import { DashboardPanels } from './dashboard-panels'
import type { ProducerData, UtilizationData, StatItem } from './types'

// --- Props ---

export interface ScifiEnergyDashboardProps {
  /** Producer/resource entries */
  producers: ProducerData[]
  /** Utilization entries */
  utilization: UtilizationData[]
  /** Bottom stats strip */
  stats: StatItem[]
  /** Global supply value */
  supply?: number
  /** Global demand value */
  demand?: number
  /** Total producers label + value */
  totalLabel?: string
  /** Total value text */
  totalValue?: string
  /** Accent color (default '#00e5ff') */
  accentColor?: string
  /** Section header label */
  label?: string
  /** Section header title */
  title?: string
  /** Section header subtitle */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * ScifiEnergyDashboard -- resource/production dashboard with balance gauge, producers, and utilization.
 *
 * @example
 * ```tsx
 * <ScifiEnergyDashboard
 *   producers={[{ name: 'Producer A', production: 13.2, trend: 'up', change: '+0.3%' }]}
 *   utilization={[{ name: 'Region A', utilization: 87.2, trend: 'up' }]}
 *   stats={[{ label: 'Stat A', value: '94.2%', color: '#00e5ff' }]}
 *   supply={103.8}
 *   demand={105.2}
 * />
 * ```
 */
export const ScifiEnergyDashboard = forwardRef<HTMLElement, ScifiEnergyDashboardProps>(
  ({
    producers, utilization, stats, supply = 0, demand = 0,
    totalLabel, totalValue, accentColor = '#00e5ff',
    label = 'Resource Monitor', title = 'Resource Dashboard',
    subtitle = 'Production, consumption, and utilization overview',
    className,
  }, ref) => {
    const deficit = demand - supply

    return (
      <section ref={ref} data-slot="scifi-energy-dashboard"
        className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16', className)}>
        <ScifiSectionHeader label={label} title={title} subtitle={subtitle} accentColor={accentColor} />

        {/* Row 1: Producers + Balance Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <DashboardPanels producers={producers} utilization={utilization}
            totalLabel={totalLabel} totalValue={totalValue} accentColor={accentColor} />

          {supply > 0 && demand > 0 && (
            <HudCard accentColor="#ff6b00" className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#ff6b00', boxShadow: '0 0 8px #ff6b00' }} />
                <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider uppercase">Balance</h3>
              </div>
              <div className="flex flex-col items-center gap-4">
                <BalanceGauge supply={supply} demand={demand} accentColor={accentColor}
                  deficitLabel={`Deficit of ${deficit.toFixed(1)} units supports elevated prices`} />
                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                  <div className="text-center p-2 sm:p-3 rounded-sm"
                    style={{ background: `${accentColor}0D`, border: `1px solid ${accentColor}1A` }}>
                    <div className="text-[10px] font-mono text-[#7070a0] mb-1">DEMAND</div>
                    <div className="text-base sm:text-lg font-bold font-mono" style={{ color: accentColor }}>{demand.toFixed(1)}</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-sm"
                    style={{ background: 'rgba(255,107,43,0.05)', border: '1px solid rgba(255,107,43,0.1)' }}>
                    <div className="text-[10px] font-mono text-[#7070a0] mb-1">SUPPLY</div>
                    <div className="text-base sm:text-lg font-bold font-mono text-[#ff6b00]">{supply.toFixed(1)}</div>
                  </div>
                </div>
                {deficit > 0 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: 0.5 }}
                    className="w-full text-center p-2 rounded-sm"
                    style={{ background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.2)' }}>
                    <span className="text-xs font-mono text-[#ff2244] font-bold">DEFICIT: -{deficit.toFixed(1)}</span>
                  </motion.div>
                )}
              </div>
            </HudCard>
          )}
        </div>

        {/* Bottom Stats Strip */}
        {stats.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-3 sm:p-4 rounded-sm text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${(item.color ?? accentColor)}15` }}>
                <div className="text-[10px] sm:text-xs font-mono text-[#7070a0] mb-1">{item.label}</div>
                <div className="text-sm sm:text-base font-bold font-mono"
                  style={{ color: item.color ?? accentColor }}>{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    )
  },
)
ScifiEnergyDashboard.displayName = 'ScifiEnergyDashboard'
