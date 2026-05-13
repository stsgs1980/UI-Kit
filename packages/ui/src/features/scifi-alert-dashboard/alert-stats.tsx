'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HudCard } from '../hud-card'
import type { AlertStats } from './types'
import { DASHBOARD_SEVERITY_CONFIG } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface AlertStatsPanelProps {
  /** Statistics data to display */
  stats: AlertStats
  /** Date label for the summary (default 'Today') */
  dateLabel?: string
}

// ─── Hook ─────────────────────────────────────────────────────

function useCounter(target: number, inView: boolean, dur = 1200) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    let id: number
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      setV((1 - Math.pow(1 - p, 3)) * target)
      if (p < 1) id = requestAnimationFrame(step)
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [inView, target, dur])
  return v
}

// ─── Component ────────────────────────────────────────────────

/**
 * AlertStatsPanel — summary statistics panel for alert dashboard.
 *
 * @example
 * ```tsx
 * <AlertStatsPanel stats={{ total: 14, critical: 2, high: 5, medium: 4, low: 3, avgResponse: 4.2, escalationRate: 12 }} />
 * ```
 */
export function AlertStatsPanel({ stats, dateLabel = 'Today' }: AlertStatsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(panelRef, { once: true })
  const total = useCounter(stats.total, inView)
  const response = useCounter(stats.avgResponse, inView, 1400)
  const escalation = useCounter(stats.escalationRate, inView, 1300)
  const cCrit = useCounter(stats.critical, inView)
  const cHigh = useCounter(stats.high, inView)
  const cMed = useCounter(stats.medium, inView)
  const cLow = useCounter(stats.low, inView)

  const bars = [
    { label: 'CRIT', value: stats.critical, max: stats.total || 1, color: DASHBOARD_SEVERITY_CONFIG.CRITICAL.color },
    { label: 'HIGH', value: stats.high, max: stats.total || 1, color: DASHBOARD_SEVERITY_CONFIG.HIGH.color },
    { label: 'MED', value: stats.medium, max: stats.total || 1, color: DASHBOARD_SEVERITY_CONFIG.MEDIUM.color },
    { label: 'LOW', value: stats.low, max: stats.total || 1, color: DASHBOARD_SEVERITY_CONFIG.LOW.color },
  ]
  const counters = [
    { label: 'CRIT', val: cCrit, color: DASHBOARD_SEVERITY_CONFIG.CRITICAL.color },
    { label: 'HIGH', val: cHigh, color: DASHBOARD_SEVERITY_CONFIG.HIGH.color },
    { label: 'MED', val: cMed, color: DASHBOARD_SEVERITY_CONFIG.MEDIUM.color },
    { label: 'LOW', val: cLow, color: DASHBOARD_SEVERITY_CONFIG.LOW.color },
  ]

  return (
    <HudCard accentColor="orange" title={`Summary — ${dateLabel}`}>
      <div ref={panelRef}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 rounded-sm" style={{ backgroundColor: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)' }}>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#ff6b00]">{Math.round(total)}</div>
            <div className="text-[10px] sm:text-xs font-mono text-[#7070a0] uppercase mt-1">Total Today</div>
          </div>
          <div className="text-center p-3 rounded-sm" style={{ backgroundColor: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#00e5ff]">{response.toFixed(1)}<span className="text-sm ml-1">min</span></div>
            <div className="text-[10px] sm:text-xs font-mono text-[#7070a0] uppercase mt-1">Avg Response</div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {bars.map((bar, i) => (
            <div key={bar.label} className="flex items-center gap-2">
              <span className="text-[10px] font-mono w-10 text-right" style={{ color: bar.color }}>{bar.label}</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${bar.color}15` }}>
                <motion.div className="h-full rounded-full" style={{ backgroundColor: bar.color, boxShadow: `0 0 6px ${bar.color}44` }}
                  initial={{ width: 0 }} animate={{ width: `${(bar.value / bar.max) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: 'easeOut' }} />
              </div>
              <span className="text-xs font-mono font-bold" style={{ color: bar.color }}>{bar.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between p-3 rounded-sm"
          style={{ backgroundColor: 'rgba(255,34,68,0.08)', border: '1px solid rgba(255,34,68,0.2)' }}>
          <div>
            <div className="text-[10px] font-mono text-[#7070a0] uppercase">Escalation</div>
            <div className="text-xs text-[#8888aa] mt-0.5">Last 24 hours</div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold font-mono text-[#ff2244]">{Math.round(escalation)}%</span>
            <span className="text-[#ff2244]">↑</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {counters.map(item => (
            <div key={item.label} className="text-center">
              <div className="text-lg font-bold font-mono" style={{ color: item.color }}>{Math.round(item.val)}</div>
              <div className="text-[8px] font-mono text-[#5050a0] uppercase">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </HudCard>
  )
}
