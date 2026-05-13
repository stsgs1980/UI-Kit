'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { HudCard } from '../hud-card'
import { ConditionPanel } from './condition-panel'
import { ForecastChart } from './forecast-chart'
import { StormRiskGauge } from './storm-gauge'
import { getRiskStatus } from './types'
import type { ConditionMetric, ForecastData, ImpactItem } from './types'

// --- Props ---

export interface ScifiEnvironmentalImpactProps {
  /** Current condition metrics */
  conditions: ConditionMetric[]
  /** Forecast data for bar chart */
  forecast: ForecastData[]
  /** Impact statistics items */
  impactItems: ImpactItem[]
  /** Storm risk percentage (0-100) */
  stormRisk?: number
  /** Transit delay hours */
  transitDelay?: number
  /** Transit reduction percentage */
  transitReduction?: string
  /** Status message (e.g. "Transit safe") */
  statusMessage?: string
  /** Status severity */
  statusSeverity?: 'safe' | 'warning' | 'danger'
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
 * ScifiEnvironmentalImpact -- environmental monitoring dashboard with conditions, forecast, and impact.
 *
 * @example
 * ```tsx
 * <ScifiEnvironmentalImpact
 *   conditions={[{ id: 'temp', label: 'Temperature', value: '28.7C', trend: '+0.3', trendColor: '#ff6b00', icon: 'thermometer' }]}
 *   forecast={[{ day: 'Mon', height: 1.8 }]}
 *   impactItems={[{ label: 'Storm days', value: '3', color: '#ff6b00' }]}
 *   stormRisk={23}
 * />
 * ```
 */
export const ScifiEnvironmentalImpact = forwardRef<HTMLElement, ScifiEnvironmentalImpactProps>(
  ({
    conditions, forecast, impactItems, stormRisk = 0, transitDelay = 0,
    transitReduction = '0%', statusMessage = 'Nominal', statusSeverity = 'safe',
    accentColor = '#00e5ff',
    label = 'Environmental Monitor', title = 'Environmental Impact',
    subtitle = 'Real-time condition monitoring and impact analysis', className,
  }, ref) => {
    const sc = statusSeverity === 'safe' ? '#22c55e' : statusSeverity === 'warning' ? '#eab308' : '#ff2244'

    return (
      <section ref={ref} data-slot="scifi-environmental-impact"
        className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16', className)}>
        <ScifiSectionHeader label={label} title={title} subtitle={subtitle} accentColor={accentColor} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Conditions */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.1 }}>
            <HudCard title="Current Conditions" accentColor={accentColor}>
              <ConditionPanel conditions={conditions} accentColor={accentColor} />
            </HudCard>
          </motion.div>
          {/* Forecast */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.2 }}>
            <HudCard title="Forecast" accentColor="#ff6b00">
              <ForecastChart forecast={forecast} threshold={3.0} thresholdLabel="Danger threshold" accentColor={accentColor} />
            </HudCard>
          </motion.div>
          {/* Impact */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.3 }}>
            <HudCard title="Impact Analysis" accentColor="#a855f7">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#7070a0] uppercase tracking-wider">Transit Delay</span>
                  <span className="text-sm font-bold" style={{ color: '#ff6b00' }}>~{transitDelay} h/day</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-sm"
                  style={{ background: 'rgba(255,34,68,0.06)', border: '1px solid rgba(255,34,68,0.15)' }}>
                  <span className="text-[10px] font-mono text-[#7070a0] uppercase tracking-wider">Transit Change</span>
                  <span className="text-sm font-bold" style={{ color: '#ff2244' }}>{transitReduction}</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-sm" style={{ background: `${sc}0F`, border: `1px solid ${sc}1F` }}>
                  {stormRisk > 0 && <StormRiskGauge percent={stormRisk} />}
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-[#7070a0] uppercase tracking-wider mb-1">Risk (30 days)</div>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-sm inline-block"
                      style={{ backgroundColor: `${sc}26`, border: `1px solid ${sc}4D`, color: sc }}>{getRiskStatus(stormRisk)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-sm" style={{ background: `${sc}0F`, border: `1px solid ${sc}1F` }}>
                  <span className="text-[10px] font-mono text-[#7070a0] uppercase tracking-wider">Status</span>
                  <span className="text-xs font-bold font-mono px-2 py-1 rounded-sm"
                    style={{ backgroundColor: `${sc}26`, border: `1px solid ${sc}66`, color: sc, boxShadow: `0 0 8px ${sc}26` }}>
                    {statusMessage}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#1a1a3a]">
                  {impactItems.map((item, i) => (
                    <motion.div key={item.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 + 0.4 }}
                      className="text-center p-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${item.color}15` }}>
                      <div className="text-[9px] font-mono text-[#7070a0] mb-1">{item.label}</div>
                      <div className="text-xs sm:text-sm font-bold" style={{ color: item.color }}>{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </HudCard>
          </motion.div>
        </div>
      </section>
    )
  },
)
ScifiEnvironmentalImpact.displayName = 'ScifiEnvironmentalImpact'
