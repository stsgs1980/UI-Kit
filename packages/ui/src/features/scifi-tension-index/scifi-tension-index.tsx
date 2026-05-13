'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { TensionGauge } from './tension-gauge'
import { TensionSparkline } from './tension-sparkline'
import { RegionRow } from './region-row'
import { DriverRow } from './driver-row'
import type { ScifiTensionIndexProps } from './types'

/**
 * ScifiTensionIndex -- composite tension dashboard with radial gauge, sparkline, region bars, and driver list.
 *
 * @example
 * ```tsx
 * <ScifiTensionIndex
 *   score={58}
 *   regions={[{ name: 'Region A', score: 82 }, { name: 'Region B', score: 45 }]}
 *   drivers={[{ name: 'Factor X', impact: 92 }, { name: 'Factor Y', impact: 78 }]}
 *   trendData={[42, 45, 48, 52, 58]}
 * />
 * ```
 */
export const ScifiTensionIndex = forwardRef<HTMLElement, ScifiTensionIndexProps>(
  ({ score, regions, drivers, trendData, accentColor = '#00e5ff', className }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const avgRegional = regions.length > 0 ? Math.round(regions.reduce((s, r) => s + r.score, 0) / regions.length) : 0
    const maxRegion = regions.length > 0 ? Math.max(...regions.map((r) => r.score)) : 0
    const card = { backgroundColor: 'rgba(10,10,26,0.6)', border: `1px solid ${accentColor}15`, boxShadow: `0 0 20px ${accentColor}08` }
    const legendItems = [
      { range: '75-100', label: 'Critical', color: '#ff2244' },
      { range: '50-74', label: 'Elevated', color: '#ff6b00' },
      { range: '30-49', label: 'Moderate', color: '#eab308' },
      { range: '0-29', label: 'Low', color: '#00e5ff' },
    ]

    return (
      <section ref={ref} className={cn('relative py-12 sm:py-16 md:py-20 px-4', className)} data-slot="scifi-tension-index">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Gauge + Sparkline */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="rounded-sm p-4 sm:p-6" style={card}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Overall Index</div>
                <TensionGauge score={score} accentColor={accentColor} />
                <div className="mt-5 pt-4 border-t" style={{ borderColor: `${accentColor}1A` }}>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="font-mono text-[9px] text-[#505080] uppercase tracking-wider mb-1">Avg Region</div>
                      <div className="font-mono text-base sm:text-lg font-bold" style={{ color: '#ff6b00' }}>{avgRegional}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-[#505080] uppercase tracking-wider mb-1">Max Region</div>
                      <div className="font-mono text-base sm:text-lg font-bold" style={{ color: '#ff2244' }}>{maxRegion}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-[#505080] uppercase tracking-wider mb-1">Regions</div>
                      <div className="font-mono text-base sm:text-lg font-bold" style={{ color: accentColor }}>{regions.length}</div>
                    </div>
                  </div>
                </div>
              </div>

              {trendData && trendData.length > 0 && (
                <div className="rounded-sm p-4 sm:p-6" style={card}>
                  <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-2">Dynamics</div>
                  <TensionSparkline data={trendData} accentColor={accentColor} />
                </div>
              )}
            </div>

            {/* Center: Regions */}
            <div className="lg:col-span-1">
              <div className="rounded-sm p-4 sm:p-6" style={card}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Regional Breakdown</div>
                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
                  {regions.map((region, i) => <RegionRow key={i} region={region} index={i} />)}
                </div>
                <div className="mt-4 pt-3 border-t" style={{ borderColor: `${accentColor}14` }}>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {legendItems.map((l) => (
                      <div key={l.range} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: l.color }} />
                        <span className="font-mono text-[9px] text-[#505080]">{l.range} {l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Drivers */}
            <div className="lg:col-span-1">
              <div className="rounded-sm p-4 sm:p-6" style={card}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Key Drivers</div>
                <div className="space-y-1">
                  {drivers.map((driver, i) => <DriverRow key={i} driver={driver} index={i} />)}
                </div>
                <div className="mt-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                  <div className="font-mono text-[9px] text-[#505080] uppercase tracking-wider mb-2">Driver Weight</div>
                  <div className="flex rounded-sm overflow-hidden h-2">
                    {drivers.map((d) => (
                      <div key={d.name} className="h-full" style={{
                        width: `${(d.impact / Math.max(drivers.reduce((s, x) => s + x.impact, 0), 1)) * 100}%`,
                        backgroundColor: d.color ?? '#a855f7', opacity: 0.8,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)
ScifiTensionIndex.displayName = 'ScifiTensionIndex'
