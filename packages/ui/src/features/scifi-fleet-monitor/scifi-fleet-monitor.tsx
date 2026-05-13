'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { Vessel, SecurityZone } from './types'
import { useAnimatedValue } from './use-animated-value'
import { VesselTable } from './vessel-table'
import { ThreatMap } from './threat-map'

// ─── Props ───────────────────────────────────────────────────

/**
 * Sci-fi fleet / vessel monitoring dashboard with table, stats, and threat map.
 *
 * @example
 * ```tsx
 * <ScifiFleetMonitor
 *   vessels={[{ id: 'v1', name: 'Alpha', type: 'VLCC', status: 'transit',
 *     cargo: 'Crude', eta: '~2h' }]}
 *   securityZones={[{ name: 'North', threat: 'medium', description: 'Moderate.' }]}
 * />
 * ```
 */
export interface ScifiFleetMonitorProps {
  /** Vessel list */
  vessels: Vessel[]
  /** Security zones for threat map */
  securityZones: SecurityZone[]
  /** Accent colour. Default: `'#00e5ff'` */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ───────────────────────────────────────────────

export const ScifiFleetMonitor = forwardRef<HTMLDivElement, ScifiFleetMonitorProps>(
  ({ vessels, securityZones, accentColor = '#00e5ff', className }, ref) => {
    const { value: dailyTransit, ref: ref1 } = useAnimatedValue(21, 2500)
    const { value: transitTime, ref: ref2 } = useAnimatedValue(5.2, 2200)
    const { value: congestion, ref: ref3 } = useAnimatedValue(3.4, 2000)

    const stats = [
      { ref: ref1, label: 'Avg. Transit / Day', value: dailyTransit.toFixed(0), suffix: ' vessels', color: accentColor, progress: 70 },
      { ref: ref2, label: 'Avg. Transit Time', value: transitTime.toFixed(1), suffix: ' hrs', color: '#a855f7', progress: 52 },
      { ref: ref3, label: 'Congestion Index', value: congestion.toFixed(1), suffix: ' / 10', color: '#ff6b00', progress: 34 },
    ]

    return (
      <section ref={ref} data-slot="scifi-fleet-monitor" className={cn('space-y-6', className)}>
        {/* Vessel table */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div data-slot="vessel-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6"
            style={{ borderColor: `${accentColor}20` }}>
            <VesselTable vessels={vessels} />
          </div>
        </motion.div>

        {/* Transit statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
            >
              <div data-slot="stat-card" ref={metric.ref}
                className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 text-center">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">{metric.label}</div>
                <div className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: metric.color }}>
                  {metric.value}
                  <span className="text-sm font-normal text-white/40">{metric.suffix}</span>
                </div>
                <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.progress}%` }}
                    transition={{ duration: 2, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: metric.color, boxShadow: `0 0 8px ${metric.color}60` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Threat map */}
        {securityZones.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
            <div data-slot="threat-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
              <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Threat Map — Zone Overview</h3>
              <ThreatMap zones={securityZones} accentColor={accentColor} />
            </div>
          </motion.div>
        )}
      </section>
    )
  },
)
ScifiFleetMonitor.displayName = 'ScifiFleetMonitor'
