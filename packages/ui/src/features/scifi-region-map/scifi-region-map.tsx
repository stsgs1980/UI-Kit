'use client'

import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { ScifiRegionMapProps } from './types'
import { RISK_CONFIG } from './types'
import { RegionMapSvg } from './region-map-svg'
import { RegionDetail } from './region-detail'

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiRegionMap -- interactive SVG region map with detail sidebar.
 *
 * Renders a full-width SVG map with clickable/hoverable regions,
 * animated route lines, and optional base markers. A sidebar panel
 * shows detailed info for the selected region.
 *
 * @example
 * ```tsx
 * <ScifiRegionMap
 *   regions={[{ id: 'a', name: 'Alpha', path: 'M0,0 L100,100 Z',
 *     labelX: 50, labelY: 50, riskLevel: 'high', data: { export: '1.2M' } }]}
 *   routes={[{ start: { x: 0, y: 50 }, end: { x: 200, y: 50 }, color: '#00e5ff' }]}
 *   stats={[{ label: 'Throughput', value: '20.7M', color: '#00e5ff' }]}
 * />
 * ```
 */
export const ScifiRegionMap = forwardRef<HTMLDivElement, ScifiRegionMapProps>(
  ({ regions, routes, bases, mapWidth, mapHeight, accentColor = '#00e5ff', className }, ref) => {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const selected = selectedId ? regions.find((r) => r.id === selectedId) ?? null : null
    const hovered = hoveredId ? regions.find((r) => r.id === hoveredId) ?? null : null

    return (
      <section ref={ref} data-slot="scifi-region-map" className={cn('relative py-16 sm:py-24 px-4 overflow-hidden', className)}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor}05 0%, transparent 70%)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <div className="p-4 sm:p-6 rounded-sm backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(10,10,26,0.8)', border: `1px solid ${accentColor}30` }}>
                <RegionMapSvg
                  regions={regions}
                  routes={routes}
                  bases={bases}
                  width={mapWidth}
                  height={mapHeight}
                  selectedId={selectedId}
                  hoveredId={hoveredId}
                  onSelect={setSelectedId}
                  onHover={setHoveredId}
                  accentColor={accentColor}
                />

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t" style={{ borderColor: `${accentColor}15` }}>
                  {(Object.keys(RISK_CONFIG) as Array<keyof typeof RISK_CONFIG>).map((level) => (
                    <span key={level} className="flex items-center gap-1.5 font-mono text-[10px] text-[#7070a0]">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: RISK_CONFIG[level].color }} />
                      {RISK_CONFIG[level].label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Detail sidebar */}
            <div className="lg:col-span-1">
              <RegionDetail region={selected} />
            </div>
          </div>
        </div>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hovered && !selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 left-3 px-3 py-2 bg-[rgba(5,5,16,0.9)] border rounded-sm backdrop-blur-sm z-20"
              style={{ borderColor: `${RISK_CONFIG[hovered.riskLevel].color}30` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-white">{hovered.name}</span>
                <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded-sm"
                  style={{ color: RISK_CONFIG[hovered.riskLevel].color, backgroundColor: `${RISK_CONFIG[hovered.riskLevel].color}15` }}>
                  {RISK_CONFIG[hovered.riskLevel].label}
                </span>
              </div>
              {Object.values(hovered.data).slice(0, 1).map((val) => (
                <div key={val} className="font-mono text-[10px] text-[#9090c0]">{val}</div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    )
  },
)
ScifiRegionMap.displayName = 'ScifiRegionMap'
