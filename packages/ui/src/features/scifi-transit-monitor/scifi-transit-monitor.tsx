'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { MetricCard, VesselType } from './types'
import { TrafficChart } from './traffic-chart'
import { TrafficFlow } from './traffic-flow'

/**
 * Sci-fi transit / flow monitor with metrics, animated flow, and bar chart.
 * @example
 * ```tsx
 * <ScifiTransitMonitor
 *   metrics={[{ label: 'Throughput', value: 5.8, suffix: '/day', decimals: 1 }]}
 *   vesselTypes={[{ type: 'Cargo', count: 12, color: '#ff6b00' }]}
 *   trafficData={[1,1,0,0,0,1,2,3,3,2,2,2,1,2,2,3,2,2,2,3,2,1,1,1]}
 * />
 * ```
 */
export interface ScifiTransitMonitorProps {
  metrics: MetricCard[]
  vesselTypes: VesselType[]
  trafficData?: number[]
  peakStart?: number; peakEnd?: number
  lowStart?: number; lowEnd?: number
  currentHour?: number
  statusLabel?: string; statusColor?: string
  accentColor?: string; className?: string
}

export const ScifiTransitMonitor = forwardRef<HTMLDivElement, ScifiTransitMonitorProps>(
  ({ metrics, vesselTypes, trafficData, peakStart = 6, peakEnd = 10, lowStart = 2, lowEnd = 4, currentHour,
    statusLabel = 'OPERATIONAL', statusColor = '#ff6b00', accentColor = '#00e5ff', className }, ref) => {
    const total = vesselTypes.reduce((s, v) => s + v.count, 0)

    return (
      <section ref={ref} data-slot="scifi-transit-monitor" className={cn('space-y-6', className)}>
        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div data-slot="metric-card" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-3 text-center">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">{m.label}</div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {m.value.toFixed(m.decimals ?? 0)}
                  {m.suffix && <span className="text-sm text-white/40 ml-1">{m.suffix}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow viz */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <div data-slot="flow-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
            <div className="flex flex-wrap gap-4 mb-4">
              {vesselTypes.map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: v.color, boxShadow: `0 0 6px ${v.color}60` }} />
                  <span className="text-[10px] font-mono text-white/60">{v.type}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[2px]"
                    style={{ backgroundColor: `${v.color}20`, color: v.color, border: `1px solid ${v.color}40` }}>{v.count}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[10px] font-mono text-white/40">Total:</span>
                <span className="text-sm font-bold text-white font-mono">{total}</span>
              </div>
            </div>
            <TrafficFlow vessels={vesselTypes} accentColor={accentColor} />
          </div>
        </motion.div>

        {/* Bottom: Chart + Status */}
        {trafficData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }} className="lg:col-span-2">
              <div data-slot="chart-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
                <h3 className="font-mono text-xs text-white/60 uppercase tracking-wider mb-3">Traffic Density (24h)</h3>
                <TrafficChart data={trafficData} peakStart={peakStart} peakEnd={peakEnd}
                  lowStart={lowStart} lowEnd={lowEnd} currentHour={currentHour} accentColor={accentColor} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}>
              <div data-slot="status-panel" className="relative overflow-hidden rounded-md backdrop-blur-sm border border-white/[0.06] bg-[rgba(10,10,30,0.5)] p-4 sm:p-6">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">System Status</div>
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-sm font-mono text-sm font-bold"
                  style={{ backgroundColor: `${statusColor}1a`, border: `1px solid ${statusColor}66`, color: statusColor, boxShadow: `0 0 12px ${statusColor}26` }}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: statusColor }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: statusColor }} />
                  </span>
                  {statusLabel}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </section>
    )
  },
)
ScifiTransitMonitor.displayName = 'ScifiTransitMonitor'
