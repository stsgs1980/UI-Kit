'use client'

import { motion } from 'framer-motion'
import { HudCard } from '../hud-card'
import { getTrendColor } from './types'
import type { ProducerData, UtilizationData } from './types'

// --- Production Bar ---

function ProductionBar({ producer, index }: { producer: ProducerData; index: number }) {
  const max = 15
  const barW = (producer.production / max) * 100
  const tc = getTrendColor(producer.trend)

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col gap-1.5 sm:gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <TrendArrow trend={producer.trend} />
          <span className="text-xs sm:text-sm font-mono text-white truncate">{producer.name}</span>
          {producer.note && <span className="text-[10px] font-mono text-[#7070a0] hidden sm:inline">({producer.note})</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs sm:text-sm font-mono font-bold" style={{ color: tc }}>{producer.production.toFixed(1)}</span>
          {producer.change && <span className="text-[10px] font-mono" style={{ color: tc }}>{producer.change}</span>}
        </div>
      </div>
      <div className="h-2 sm:h-3 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div className="h-full rounded-full relative" initial={{ width: 0 }}
          whileInView={{ width: `${barW}%` }} viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: `linear-gradient(to right, ${tc}80, ${tc})`, boxShadow: `0 0 10px ${tc}40` }}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-full rounded-full"
            style={{ backgroundColor: tc, boxShadow: `0 0 8px ${tc}` }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

// --- Utilization Bar ---

function UtilizationBar({ data, index }: { data: UtilizationData; index: number }) {
  const tc = getTrendColor(data.trend)
  const isNearMax = data.utilization >= 90
  const barColor = isNearMax ? '#ff6b00' : tc

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendArrow trend={data.trend} color={barColor} />
          <span className="text-xs sm:text-sm font-mono text-white">{data.name}</span>
          {data.note && <span className="text-[10px] font-mono text-[#ff6b00]">{data.note}</span>}
        </div>
        <span className="text-xs sm:text-sm font-mono font-bold" style={{ color: barColor }}>{data.utilization}%</span>
      </div>
      <div className="h-2.5 sm:h-3 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div className="h-full rounded-full relative" initial={{ width: 0 }}
          whileInView={{ width: `${data.utilization}%` }} viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: isNearMax ? `linear-gradient(to right, #ff6b0060, #ff6b00)` : `linear-gradient(to right, ${barColor}60, ${barColor})`,
            boxShadow: `0 0 8px ${barColor}40`,
          }}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-full rounded-full"
            style={{ backgroundColor: barColor, boxShadow: `0 0 6px ${barColor}` }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

function TrendArrow({ trend, color }: { trend: string; color?: string }) {
  const c = color ?? getTrendColor(trend as 'up' | 'down' | 'stable')
  const arrows: Record<string, string> = { up: '▲', down: '▼', stable: '●' }
  return <span style={{ color: c }} className="text-sm font-bold">{arrows[trend] ?? '●'}</span>
}

// --- Props ---

export interface DashboardPanelsProps {
  /** Producer data entries */
  producers: ProducerData[]
  /** Utilization data entries */
  utilization: UtilizationData[]
  /** Total producers label and value */
  totalLabel?: string
  /** Total value text */
  totalValue?: string
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

/**
 * DashboardPanels -- producer bars and utilization bars panels.
 *
 * @example
 * ```tsx
 * <DashboardPanels
 *   producers={[{ name: 'Producer A', production: 13.2, trend: 'up', change: '+0.3%' }]}
 *   utilization={[{ name: 'Region A', utilization: 87.2, trend: 'up' }]}
 * />
 * ```
 */
export function DashboardPanels({
  producers, utilization, totalLabel = 'Total', totalValue,
  accentColor = '#00e5ff',
}: DashboardPanelsProps) {
  return (
    <>
      {/* Producers Panel */}
      <HudCard accentColor={accentColor} className="lg:col-span-2">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
          <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider uppercase">Producers</h3>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          {producers.map((p, i) => (
            <div key={p.name} className="rounded-sm -mx-1 px-1"><ProductionBar producer={p} index={i} /></div>
          ))}
        </div>
        {totalValue && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.8 }} className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-[#7070a0]">{totalLabel}:</span>
            <span className="text-sm font-mono font-bold" style={{ color: '#a855f7' }}>{totalValue}</span>
          </motion.div>
        )}
      </HudCard>

      {/* Utilization Panel */}
      <HudCard accentColor="#a855f7">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
          <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider uppercase">Utilization</h3>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5">
          {utilization.map((u, i) => <UtilizationBar key={u.name} data={u} index={i} />)}
        </div>
      </HudCard>
    </>
  )
}
