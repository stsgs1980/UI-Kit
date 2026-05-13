'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { RiskItem } from './types'
import { cellColor } from './types'

/**
 * 3xN probability-by-impact risk matrix grid with animated dots.
 *
 * @example
 * ```tsx
 * <RiskMatrixGrid
 *   items={risks}
 *   probabilities={['High','Medium','Low']}
 *   impacts={['Low','Medium','High','Critical']}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const RiskMatrixGrid = forwardRef<HTMLDivElement, {
  items: RiskItem[]
  probabilities: string[]
  impacts: string[]
  accentColor?: string
  className?: string
}>(({ items, probabilities, impacts, accentColor = '#00e5ff', className }, ref) => {
  const probIdx = (p: string) => probabilities.indexOf(p)
  const impactIdx = (i: string) => impacts.indexOf(i)
  const totalP = probabilities.length
  const totalI = impacts.length
  const colStyle = { gridTemplateColumns: `repeat(${totalI}, minmax(0,1fr))` }
  const axLabel = { color: accentColor }

  return (
    <div ref={ref} className={cn('flex flex-col', className)} data-slot="risk-matrix-grid">
      {/* Header row */}
      <div className="flex items-end gap-2 mb-1">
        <div className="w-20 sm:w-24 shrink-0" />
        {impacts.map((impact) => (
          <div key={impact} className="flex-1 text-center">
            <span className="font-mono text-[10px] sm:text-xs text-[#7070a0] uppercase tracking-wider leading-tight block">{impact}</span>
          </div>
        ))}
        <div className="w-8 shrink-0" />
      </div>

      {/* X-axis label */}
      <div className="flex items-center gap-2">
        <div className="w-20 sm:w-24 shrink-0" />
        <div className="flex-1 flex items-center justify-center gap-2 mb-1">
          <div className="w-6 h-[1px] opacity-50" style={{ backgroundColor: accentColor }} />
          <span className="font-mono text-[10px] uppercase tracking-widest" style={axLabel}>Impact</span>
          <div className="w-6 h-[1px] opacity-50" style={{ backgroundColor: accentColor }} />
        </div>
        <div className="w-8 shrink-0" />
      </div>

      {/* Matrix rows */}
      {probabilities.map((prob, pIdx) => (
        <div key={prob} className="flex items-center gap-2 mb-1">
          <div className="w-20 sm:w-24 shrink-0 text-right pr-2">
            <span className="font-mono text-[10px] sm:text-xs text-[#7070a0] uppercase tracking-wider">{prob}</span>
          </div>
          <div className="flex-1 grid gap-[2px]" style={colStyle}>
            {impacts.map((impact, iIdx) => {
              const colors = cellColor(pIdx, iIdx, totalP, totalI)
              const isHighRisk = ((totalP - 1 - pIdx) * totalI + (iIdx + 1)) / (totalP * totalI) > 0.65
              const dotsInCell = items.filter((r) => probIdx(r.probability) === pIdx && impactIdx(r.impact) === iIdx)
              return (
                <motion.div key={`${prob}-${impact}`} initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: pIdx * 0.1 + iIdx * 0.05 }}
                  className="relative aspect-square min-h-[48px] sm:min-h-[64px] md:min-h-[72px] rounded-sm"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                  data-slot={isHighRisk ? 'risk-cell-high' : 'risk-cell'}>
                  {dotsInCell.map((dot, dotIdx) => (
                    <div key={dot.id} className="absolute inset-0 flex items-center justify-center">
                      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + dotIdx * 0.15, type: 'spring', stiffness: 300 }}
                        className="group relative cursor-default">
                        <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                          style={{ backgroundColor: dot.color ?? accentColor, width: 28, height: 28, top: -8, left: -8 }} />
                        <div className="relative w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full"
                          style={{ backgroundColor: dot.color ?? accentColor, boxShadow: `0 0 8px ${dot.color ?? accentColor}` }} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                          <div className="whitespace-nowrap px-2 py-1 rounded-sm text-[10px] font-mono text-white"
                            style={{ backgroundColor: 'rgba(10,10,26,0.95)', border: `1px solid ${(dot.color ?? accentColor)}60` }}>
                            {dot.name}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              )
            })}
          </div>
          <div className="w-8 shrink-0 flex items-center justify-center">
            {pIdx === 0 && (
              <span className="font-mono text-[8px] sm:text-[10px] tracking-widest -rotate-90 origin-center whitespace-nowrap" style={axLabel}>Probability</span>
            )}
          </div>
        </div>
      ))}

      {/* Bottom axis line */}
      <div className="flex items-center gap-2 mt-1">
        <div className="w-20 sm:w-24 shrink-0" />
        <div className="flex-1 grid gap-[2px]" style={colStyle}>
          {impacts.map((_, i) => (
            <div key={i} className="w-full h-3 border-t border-dashed" style={{ borderColor: `${accentColor}26` }} />
          ))}
        </div>
        <div className="w-8 shrink-0" />
      </div>
    </div>
  )
})
RiskMatrixGrid.displayName = 'RiskMatrixGrid'
