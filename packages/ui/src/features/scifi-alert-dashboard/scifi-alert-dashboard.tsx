'use client'

import { forwardRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { ThreatGauge } from './threat-gauge'
import { AlertStatsPanel } from './alert-stats'
import type { DashboardAlert, DashboardSeverity } from './types'
import { DASHBOARD_SEVERITY_CONFIG } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiAlertDashboardProps {
  /** Array of alert entries */
  alerts: DashboardAlert[]
  /** Threat level 0-10 */
  threatLevel: number
  /** Statistics data for the side panel */
  stats: { total: number; critical: number; high: number; medium: number; low: number; avgResponse: number; escalationRate: number }
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

// ─── Severity Badge ───────────────────────────────────────────

function SeverityBadge({ severity }: { severity: DashboardSeverity }) {
  const c = DASHBOARD_SEVERITY_CONFIG[severity]
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm"
      style={{ color: c.color, backgroundColor: c.bg, border: `1px solid ${c.border}` }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: c.color, boxShadow: `0 0 6px ${c.glow}` }} />
      {severity}
    </span>
  )
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiAlertDashboard — live alert feed with threat gauge and stats.
 *
 * @example
 * ```tsx
 * <ScifiAlertDashboard alerts={alerts} threatLevel={7.4} stats={stats} />
 * ```
 */
export const ScifiAlertDashboard = forwardRef<HTMLElement, ScifiAlertDashboardProps>(
  ({ alerts, threatLevel, stats, accentColor = '#00e5ff', label = 'Alert System', title = 'Monitoring Dashboard', subtitle = 'Real-time analysis and incident tracking', className }, ref) => {
    const [tick, setTick] = useState(0)
    useEffect(() => { const id = setInterval(() => setTick(p => p + 1), 45000); return () => clearInterval(id) }, [])

    const liveAlerts = alerts.map((a, i) => ({
      ...a,
      timestamp: (() => {
        const [hh, mm] = a.timestamp.split(':').map(Number)
        const s = hh * 3600 + mm * 60 + tick * (8 - i)
        return `${String(Math.floor(s / 3600) % 24).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}`
      })(),
    }))

    return (
      <section ref={(ref as React.RefObject<HTMLElement>)} data-slot="scifi-alert-dashboard"
        className={cn('relative max-w-7xl mx-auto px-4 py-8 sm:py-12', className)}>
        <ScifiSectionHeader label={label} title={title} subtitle={subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {liveAlerts.map((alert, i) => {
              const cfg = DASHBOARD_SEVERITY_CONFIG[alert.severity]
              return (
                <motion.div key={String(alert.id)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative group p-3 sm:p-4 rounded-sm transition-all duration-300 hover:translate-x-1"
                  style={{ backgroundColor: cfg.bg, borderLeft: `3px solid ${cfg.color}` }}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <SeverityBadge severity={alert.severity} />
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                        style={{ color: accentColor, border: `1px solid ${accentColor}33`, backgroundColor: `${accentColor}11` }}>{alert.category}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">{alert.title}</h4>
                      <p className="text-xs sm:text-sm text-[#8888aa] leading-relaxed line-clamp-2">{alert.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0 text-right">
                      <span className="text-[10px] sm:text-xs font-mono text-[#7070a0]">{alert.timestamp}</span>
                      <span className="text-[10px] font-mono text-[#5050a0]">{alert.source}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            <div className="flex items-center gap-2 py-2 px-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2244] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff2244]" />
              </span>
              <span className="text-[10px] font-mono text-[#5050a0] uppercase tracking-widest">LIVE — Updates every 45 sec</span>
            </div>
          </div>
          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <ThreatGauge value={threatLevel} accentColor={accentColor} />
            <AlertStatsPanel stats={stats} />
          </div>
        </div>
      </section>
    )
  },
)
ScifiAlertDashboard.displayName = 'ScifiAlertDashboard'
