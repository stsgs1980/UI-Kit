'use client'

import { forwardRef } from 'react'
import { cn } from '../../tokens/cn'
import { CorrelationRow } from './correlation-row'
import type { ScifiCorrelationTableProps } from './types'

/**
 * ScifiCorrelationTable -- generic data table with sparklines and correlation bars.
 *
 * @example
 * ```tsx
 * <ScifiCorrelationTable
 *   items={[
 *     { id: '1', label: 'USD/RUB', value: '77.4500', change: -4.26,
 *       correlation: -0.85, sparkline: [81.2, 80.5, 79.8, 78.4, 77.9, 77.45] },
 *     { id: '2', label: 'Gold', value: '4,775', change: 4.26,
 *       correlation: 0.52, sparkline: [4580, 4620, 4690, 4720, 4750, 4775] },
 *   ]}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiCorrelationTable = forwardRef<HTMLElement, ScifiCorrelationTableProps>(
  ({ items, accentColor = '#00e5ff', secondaryColor = '#ff6b00', className }, ref) => {
    const cardStyle = (color: string) => ({
      backgroundColor: 'rgba(10,10,26,0.6)',
      border: `1px solid ${color}15`,
      boxShadow: `0 0 20px ${color}08`,
    })

    return (
      <section ref={ref} className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:py-20', className)} data-slot="scifi-correlation-table">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${accentColor}4D 1px, transparent 1px), linear-gradient(90deg, ${accentColor}4D 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Panel 1 */}
          <div className="rounded-sm p-4 sm:p-6" style={cardStyle(accentColor)}>
            <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Data Panel</div>

            {/* Column headers */}
            <div className="hidden sm:flex items-center gap-4 px-3 pb-2 mb-1 border-b" style={{ borderColor: `${accentColor}14` }}>
              <div className="flex-1 font-mono text-[9px] text-[#505080] uppercase tracking-wider">Item</div>
              <div className="sm:w-24 text-right font-mono text-[9px] text-[#505080] uppercase tracking-wider">Value</div>
              <div className="sm:w-16 text-right font-mono text-[9px] text-[#505080] uppercase tracking-wider">Change</div>
              <div className="sm:w-32 font-mono text-[9px] text-[#505080] uppercase tracking-wider">Correlation</div>
              <div className="w-[72px] font-mono text-[9px] text-[#505080] uppercase tracking-wider">Trend</div>
            </div>

            <div className="max-h-[480px] overflow-y-auto divide-y divide-[rgba(255,255,255,0.03)]">
              {items.map((item, i) => (
                <CorrelationRow key={item.id} item={item} index={i} accentColor={accentColor} />
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t" style={{ borderColor: `${accentColor}14` }}>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span className="font-mono text-[9px] text-[#7070a0]">Positive</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff2244]" />
                  <span className="font-mono text-[9px] text-[#7070a0]">Negative</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="font-mono text-[9px] text-[#7070a0]">Strong (|r| &gt; 0.7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="rounded-sm p-4 sm:p-6" style={cardStyle(secondaryColor)}>
            <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Additional Data</div>

            {/* Column headers */}
            <div className="hidden sm:flex items-center gap-4 px-3 pb-2 mb-1 border-b" style={{ borderColor: `${secondaryColor}14` }}>
              <div className="flex-1 font-mono text-[9px] text-[#505080] uppercase tracking-wider">Item</div>
              <div className="sm:w-24 text-right font-mono text-[9px] text-[#505080] uppercase tracking-wider">Value</div>
              <div className="sm:w-16 text-right font-mono text-[9px] text-[#505080] uppercase tracking-wider">Change</div>
              <div className="sm:w-32 font-mono text-[9px] text-[#505080] uppercase tracking-wider">Correlation</div>
              <div className="w-[72px] font-mono text-[9px] text-[#505080] uppercase tracking-wider">Trend</div>
            </div>

            <div className="max-h-[480px] overflow-y-auto divide-y divide-[rgba(255,255,255,0.03)]">
              {items.map((item, i) => (
                <CorrelationRow key={item.id} item={item} index={i} accentColor={secondaryColor} />
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t" style={{ borderColor: `${secondaryColor}14` }}>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
                  <span className="font-mono text-[9px] text-[#7070a0]">Direct correlation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span className="font-mono text-[9px] text-[#7070a0]">Trend up</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff2244]" />
                  <span className="font-mono text-[9px] text-[#7070a0]">Trend down</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)
ScifiCorrelationTable.displayName = 'ScifiCorrelationTable'
