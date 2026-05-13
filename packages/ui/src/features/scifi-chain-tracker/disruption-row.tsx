'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { DisruptionEvent, DisruptionStatus, DisruptionSeverity, DisruptionTrend } from './types'

// ─── Config maps ─────────────────────────────────────────────

const STATUS_CFG: Record<DisruptionStatus, { label: string; color: string; bg: string; pulse: boolean }> = {
  active:     { label: 'Active',    color: '#ff2244', bg: 'rgba(255,34,68,0.12)',   pulse: true },
  monitoring: { label: 'Watching',  color: '#eab308', bg: 'rgba(234,179,8,0.10)',   pulse: false },
  resolved:   { label: 'Resolved',  color: '#22c55e', bg: 'rgba(34,197,94,0.10)',   pulse: false },
}

const SEVERITY_CFG: Record<DisruptionSeverity, { label: string; color: string }> = {
  critical: { label: 'Critical', color: '#ff2244' },
  high:     { label: 'High',     color: '#ff6b00' },
  medium:   { label: 'Medium',   color: '#eab308' },
  low:      { label: 'Low',      color: '#22d3ee' },
}

const SEVERITY_WIDTH: Record<DisruptionSeverity, string> = {
  critical: 'w-full', high: 'w-3/4', medium: 'w-1/2', low: 'w-1/4',
}

const TREND_CFG: Record<DisruptionTrend, { label: string; color: string }> = {
  up:     { label: '▲', color: '#22c55e' },
  down:   { label: '▼', color: '#ff2244' },
  stable: { label: '●', color: '#eab308' },
}

// ─── Component ───────────────────────────────────────────────

interface DisruptionRowProps {
  disruption: DisruptionEvent
  index: number
  accentColor?: string
}

export function DisruptionRow({ disruption, index, accentColor = '#00e5ff' }: DisruptionRowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const sc = STATUS_CFG[disruption.status]
  const sv = SEVERITY_CFG[disruption.severity]
  const tr = TREND_CFG[disruption.trend]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      data-slot="disruption-row"
      className="group py-3 px-3 rounded-sm border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-bold shrink-0" style={{ color: tr.color }}>{tr.label}</span>
          <div className="min-w-0">
            <div className="font-mono text-sm font-bold text-white truncate">{disruption.name}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm"
            style={{ color: sc.color, backgroundColor: sc.bg }}>
            {sc.pulse && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sc.color }} />}
            {sc.label}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm"
            style={{ color: sv.color, backgroundColor: `${sv.color}15` }}>
            {sv.label}
          </span>
        </div>

        <div className="sm:text-right shrink-0">
          <div className="font-mono text-sm font-bold tabular-nums"
            style={{ color: disruption.impact < 0 ? '#ff2244' : disruption.impact > 0 ? '#22c55e' : '#7070a0' }}>
            {disruption.impact !== 0 ? `${disruption.impact.toFixed(2)}` : '—'}
          </div>
          <div className="font-mono text-[9px] text-white/30">M units/day</div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-white/50 leading-relaxed line-clamp-1 flex-1 min-w-0">
          {disruption.description}
        </p>
        <span className="font-mono text-[10px] text-white/25 shrink-0 px-2 py-0.5 bg-white/[0.03] rounded-sm">
          {disruption.duration}
        </span>
      </div>
    </motion.div>
  )
}

export { STATUS_CFG, SEVERITY_CFG, SEVERITY_WIDTH, TREND_CFG }
