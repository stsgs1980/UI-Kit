'use client'

import { forwardRef } from 'react'
import { cn } from '../../tokens/cn'
import { RiskMatrixGrid } from './risk-matrix-grid'
import { RiskMatrixDetails } from './risk-matrix-details'
import { RISK_LEVELS } from './types'
import type { ScifiRiskMatrixProps } from './types'

/**
 * ScifiRiskMatrix -- probability x impact risk matrix with animated dots and a details sidebar.
 *
 * @example
 * ```tsx
 * <ScifiRiskMatrix
 *   items={[
 *     { id: '1', name: 'Supply Chain', probability: 'High', impact: 'Critical',
 *       description: 'Major supply disruption', color: '#ff2244' },
 *     { id: '2', name: 'Budget Risk', probability: 'Medium', impact: 'High',
 *       description: 'Budget overrun likely', color: '#ff6b00' },
 *   ]}
 *   probabilities={['High', 'Medium', 'Low']}
 *   impacts={['Low', 'Medium', 'High', 'Critical']}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiRiskMatrix = forwardRef<HTMLElement, ScifiRiskMatrixProps>(
  ({ items, probabilities = ['High', 'Medium', 'Low'], impacts = ['Low', 'Medium', 'High', 'Critical'], accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} className={cn('max-w-7xl mx-auto px-4 py-12 sm:py-16 overflow-hidden', className)} data-slot="scifi-risk-matrix">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Matrix + Legend */}
          <div className="flex-1">
            <div className="w-full rounded-sm p-4 sm:p-6" style={{
              backgroundColor: 'rgba(10,10,26,0.6)',
              border: `1px solid ${accentColor}15`,
              boxShadow: `0 0 20px ${accentColor}08`,
            }}>
              <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Risk Matrix</div>
              <RiskMatrixGrid
                items={items}
                probabilities={probabilities}
                impacts={impacts}
                accentColor={accentColor}
              />

              {/* Legend */}
              <div className="mt-5 pt-4 border-t" style={{ borderColor: `${accentColor}18` }}>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 justify-center">
                  <span className="font-mono text-[10px] text-[#505080] uppercase tracking-widest mr-1">Risk Levels:</span>
                  {RISK_LEVELS.map((level, idx) => (
                    <div key={level.label} className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{
                          backgroundColor: level.color,
                          boxShadow: `0 0 6px ${level.color}80`,
                          opacity: idx === RISK_LEVELS.length - 1 ? 1 : 0.7 + idx * 0.08,
                        }}
                      />
                      <span className="font-mono text-[10px] sm:text-xs text-[#a0a0c0]">{level.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="flex-1 min-w-0">
            <div className="w-full h-full rounded-sm p-4 sm:p-6" style={{
              backgroundColor: 'rgba(10,10,26,0.6)',
              border: `1px solid ${accentColor}15`,
              boxShadow: `0 0 20px ${accentColor}08`,
            }}>
              <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Risk Details</div>
              <RiskMatrixDetails
                items={items}
                probabilities={probabilities}
                impacts={impacts}
                accentColor={accentColor}
              />
            </div>
          </div>
        </div>
      </section>
    )
  },
)
ScifiRiskMatrix.displayName = 'ScifiRiskMatrix'
