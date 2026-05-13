'use client'

import { motion } from 'framer-motion'
import type { DisruptionItem, DisruptionItemStatus, DisruptionItemType } from './types'

export const STATUS_CFG: Record<DisruptionItemStatus, { color: string; bg: string; pulse: boolean; label: string }> = {
  active:   { color: '#ff2244', bg: 'rgba(255,34,68,0.12)',  pulse: true,  label: 'ACTIVE' },
  watching: { color: '#eab308', bg: 'rgba(234,179,8,0.10)',  pulse: false, label: 'WATCHING' },
  resolved: { color: '#22c55e', bg: 'rgba(34,197,94,0.10)',  pulse: false, label: 'RESOLVED' },
}

const TYPE_CFG: Record<DisruptionItemType, { color: string }> = {
  sanctions: { color: '#a855f7' }, attack: { color: '#ff2244' }, blockade: { color: '#ff6b00' },
  technical: { color: '#00e5ff' }, political: { color: '#f97316' }, storm: { color: '#38bdf8' },
}

interface Props { disruption: DisruptionItem; index: number }

export function DisruptionRow({ disruption: d, index }: Props) {
  const sc = STATUS_CFG[d.status], tc = TYPE_CFG[d.type]
  const ic = d.impact >= 70 ? '#ff2244' : d.impact >= 40 ? '#ff6b00' : d.impact >= 20 ? '#eab308' : '#00e5ff'

  return (
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group py-3 px-3 rounded-sm border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
    >
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr_0.8fr_1fr] gap-3 items-center">
        <div className="min-w-0">
          <div className="font-mono text-sm font-bold text-white truncate">{d.region}</div>
          <div className="font-mono text-[10px] text-white/25 truncate">{d.detail}</div>
        </div>
        <div>
          <span className="data-badge inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm"
            style={{ color: tc.color, backgroundColor: `${tc.color}15` }}>{d.type.toUpperCase()}</span>
        </div>
        <div className="text-right">
          <div className="font-mono text-sm font-bold text-white tabular-nums">{d.volume.toFixed(1)}</div>
          <div className="font-mono text-[9px] text-white/25">M units/day</div>
        </div>
        <div className="text-center">
          <span className="font-mono text-sm font-bold text-white/80 tabular-nums">{d.duration}</span>
          <div className="font-mono text-[9px] text-white/25">days</div>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm"
            style={{ color: sc.color, backgroundColor: sc.bg }}>
            {sc.pulse && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sc.color }} />}
            {sc.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2.5 bg-white/[0.04] rounded-sm overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.impact}%` }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }} className="h-full rounded-sm"
              style={{ background: `linear-gradient(90deg, ${ic}60, ${ic})`, boxShadow: `0 0 6px ${ic}40` }} />
          </div>
          <span className="font-mono text-[10px] tabular-nums w-7 text-right" style={{ color: ic }}>{d.impact}</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0 flex-1">
            <div className="font-mono text-sm font-bold text-white">{d.region}</div>
            <div className="font-mono text-[10px] text-white/25">{d.detail}</div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm shrink-0"
            style={{ color: sc.color, backgroundColor: sc.bg }}>
            {sc.pulse && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sc.color }} />}
            {sc.label}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
          <span className="data-badge inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-sm"
            style={{ color: tc.color, backgroundColor: `${tc.color}15` }}>{d.type.toUpperCase()}</span>
          <span className="font-mono text-[10px] text-white/40">{d.volume.toFixed(1)} M/day</span>
          <span className="font-mono text-[10px] text-white/40">{d.duration} days</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/[0.04] rounded-sm overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.impact}%` }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }} className="h-full rounded-sm"
              style={{ background: `linear-gradient(90deg, ${ic}60, ${ic})`, boxShadow: `0 0 6px ${ic}40` }} />
          </div>
          <span className="font-mono text-[10px] tabular-nums" style={{ color: ic }}>{d.impact}</span>
        </div>
      </div>
    </motion.div>
  )
}
