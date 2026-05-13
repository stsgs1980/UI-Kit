'use client'

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { MapRegion } from './types'
import { RISK_CONFIG } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface RegionDetailProps {
  /** Selected region (null shows placeholder) */
  region: MapRegion | null
  /** Additional stats rows for the sidebar */
  stats?: { label: string; value: string; color?: string }[]
  /** Additional CSS classes */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * RegionDetail -- sidebar panel showing details for a selected map region.
 *
 * Displays region name, risk badge, metadata fields, and optional
 * stats rows. Shows a placeholder when nothing is selected.
 *
 * @example
 * ```tsx
 * <RegionDetail
 *   region={{ id: 'a', name: 'Alpha', path: '...', labelX: 50, labelY: 50,
 *     riskLevel: 'high', data: { export: '1.2M' },
 *     description: 'Strategic region' }}
 *   stats={[{ label: 'Throughput', value: '20.7M', color: '#00e5ff' }]}
 * />
 * ```
 */
export const RegionDetail = forwardRef<HTMLDivElement, RegionDetailProps>(
  ({ region, stats = [], className }, ref) => {
    return (
      <div ref={ref} data-slot="region-detail" className={cn('space-y-4', className)}>
        <AnimatePresence mode="wait">
          {region ? (
            <motion.div
              key={region.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6 rounded-sm backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(10, 10, 26, 0.8)',
                border: `1px solid ${RISK_CONFIG[region.riskLevel].color}30`,
              }}
            >
              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="font-mono text-lg font-bold text-white mt-2">{region.name}</h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded-sm border"
                    style={{
                      color: RISK_CONFIG[region.riskLevel].color,
                      backgroundColor: `${RISK_CONFIG[region.riskLevel].color}15`,
                      borderColor: `${RISK_CONFIG[region.riskLevel].color}30`,
                    }}
                  >
                    {RISK_CONFIG[region.riskLevel].label}
                  </span>
                </div>
              </div>

              {/* Data fields */}
              <div className="space-y-3">
                {Object.entries(region.data).map(([key, val]) => (
                  <div key={key} className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-sm">
                    <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider mb-1">{key}</div>
                    <div className="font-mono text-lg font-bold text-[#00e5ff]">{val}</div>
                  </div>
                ))}

                {/* Description */}
                {region.description && (
                  <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-sm">
                    <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider mb-2">Assessment</div>
                    <p className="font-mono text-xs text-[#9090c0] leading-relaxed">{region.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 sm:p-6 rounded-sm backdrop-blur-sm text-center"
              style={{ backgroundColor: 'rgba(10, 10, 26, 0.8)', border: '1px solid rgba(0,229,255,0.15)' }}
            >
              <div className="text-3xl mb-3 opacity-30">🗺️</div>
              <div className="font-mono text-xs text-[#7070a0]">
                Select a region on the map to view details
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="p-4 sm:p-6 rounded-sm backdrop-blur-sm" style={{ backgroundColor: 'rgba(10,10,26,0.8)', border: '1px solid rgba(255,107,0,0.2)' }}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#ff6b00] mb-3">Statistics</h4>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex justify-between items-center py-2 border-b border-[rgba(255,107,0,0.1)]">
                  <span className="font-mono text-xs text-[#9090c0]">{stat.label}</span>
                  <span className="font-mono text-sm font-bold" style={{ color: stat.color ?? '#ff6b00' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
)
RegionDetail.displayName = 'RegionDetail'
