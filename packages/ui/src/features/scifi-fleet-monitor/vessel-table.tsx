'use client'

import { motion } from 'framer-motion'
import type { Vessel, VesselStatus } from './types'

// ─── Config ──────────────────────────────────────────────────

const STATUS_CFG: Record<VesselStatus, { color: string; bg: string; border: string; label: string }> = {
  transit:   { color: '#00e5ff', bg: 'rgba(0,229,255,0.1)',  border: 'rgba(0,229,255,0.4)',  label: 'TRANSIT' },
  anchored:  { color: '#ff6b00', bg: 'rgba(255,107,0,0.1)',  border: 'rgba(255,107,0,0.4)',  label: 'ANCHORED' },
  diverted:  { color: '#ff2244', bg: 'rgba(255,34,68,0.1)',  border: 'rgba(255,34,68,0.4)',  label: 'DIVERTED' },
}

// ─── Props ───────────────────────────────────────────────────

interface VesselTableProps {
  vessels: Vessel[]
}

// ─── Component ───────────────────────────────────────────────

export function VesselTable({ vessels }: VesselTableProps) {
  return (
    <div data-slot="vessel-table">
      {/* Table Header */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_0.5fr_0.8fr_0.6fr_0.5fr] gap-2 text-[10px] font-mono text-white/25 uppercase tracking-wider pb-2 border-b border-white/[0.06] mb-2">
        <div>Vessel</div>
        <div>Type</div>
        <div>Cargo</div>
        <div className="text-center">Status</div>
        <div className="text-right">ETA</div>
      </div>

      <div className="space-y-2">
        {vessels.map((vessel, i) => {
          const st = STATUS_CFG[vessel.status]
          return (
            <motion.div
              key={vessel.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid gap-2 items-center px-3 py-2.5 rounded-sm transition-colors hover:bg-white/[0.02]"
              style={{ borderLeft: `3px solid ${st.color}40` }}
            >
              {/* Name */}
              <div className="col-span-1 sm:col-span-1">
                <div className="text-xs font-mono font-bold text-white tracking-wide">{vessel.name}</div>
              </div>

              {/* Type */}
              <div className="hidden sm:block">
                <div className="text-[10px] font-mono text-white/60">{vessel.type}</div>
              </div>

              {/* Cargo */}
              <div className="hidden sm:block">
                <div className="text-[10px] font-mono text-white/60">{vessel.cargo}</div>
              </div>

              {/* Status */}
              <div className="col-span-2 sm:col-span-1 flex items-center gap-3 sm:gap-0">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-mono font-bold tracking-wider"
                  style={{ backgroundColor: st.bg, border: `1px solid ${st.border}`, color: st.color, boxShadow: `0 0 8px ${st.color}20` }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: st.color }} />
                  {st.label}
                </span>
                <div className="sm:hidden text-[10px] font-mono text-white/40">{vessel.type} · {vessel.cargo}</div>
              </div>

              {/* ETA */}
              <div className="text-right col-span-1">
                <span className="text-[10px] font-mono" style={{ color: st.color }}>
                  {vessel.eta ?? '—'}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-white/[0.06]">
        {(Object.entries(STATUS_CFG) as [string, typeof STATUS_CFG.transit][]).map(([k, cfg]) => (
          <div key={k} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: cfg.color, boxShadow: `0 0 4px ${cfg.color}60` }} />
            <span className="text-[9px] font-mono text-white/40">{k.charAt(0).toUpperCase() + k.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
