'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { CorrelationGrid } from './correlation-grid'
import { SectorBars } from './sector-bars'
import type { ScifiAssetHeatmapProps } from './types'

/**
 * ScifiAssetHeatmap -- correlation matrix + sector performance bars.
 *
 * @example
 * ```tsx
 * <ScifiAssetHeatmap
 *   assets={[{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }]}
 *   matrix={[[1, 0.5], [0.5, 1]]}
 *   sectors={[{ label: 'Tech', value: 8.2 }, { label: 'Energy', value: -1.2 }]}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiAssetHeatmap = forwardRef<HTMLElement, ScifiAssetHeatmapProps>(
  ({ assets, matrix, sectors = [], accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-20 overflow-hidden', className)} data-slot="scifi-asset-heatmap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Correlation Matrix */}
          <div>
            <div className="overflow-x-auto rounded-sm p-4 sm:p-6" style={{
              backgroundColor: 'rgba(10,10,26,0.6)',
              border: `1px solid ${accentColor}15`,
              boxShadow: `0 0 20px ${accentColor}08`,
            }}>
              <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Correlation Matrix</div>
              <CorrelationGrid assets={assets} matrix={matrix} accentColor={accentColor} />
            </div>
          </div>

          {/* Sector Performance */}
          <div className="flex flex-col gap-6">
            {sectors.length > 0 && (
              <div className="rounded-sm p-4 sm:p-6" style={{
                backgroundColor: 'rgba(10,10,26,0.6)',
                border: `1px solid ${accentColor}15`,
                boxShadow: `0 0 20px ${accentColor}08`,
              }}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Sector Performance</div>
                <SectorBars sectors={sectors} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  },
)
ScifiAssetHeatmap.displayName = 'ScifiAssetHeatmap'
