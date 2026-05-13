'use client'

import { forwardRef, useMemo } from 'react'
import { cn } from '../../tokens/cn'
import type { CompareModalProps, DiffLine } from './types'
import { DiffTable } from './diff-table'
import { getBarColor, downloadCompareReport } from './compare-utils'

/**
 * Generic side-by-side comparison modal.
 *
 * Accepts an array of `CompareItem` objects and renders info cards,
 * horizontal bar chart, optional line-by-line code diff, and a download
 * button. Does NOT fetch data -- all content comes through props.
 *
 * @example
 * ```tsx
 * <CompareModal
 *   items={[
 *     { name: 'Button', value: 120, category: 'ui', code: sourceA },
 *     { name: 'ButtonAlt', value: 85, category: 'ui', code: sourceB },
 *   ]}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   metricLabel="Lines"
 * />
 * ```
 */
export const CompareModal = forwardRef<HTMLDivElement, CompareModalProps>(
  function CompareModal({ items, open, onOpenChange, metricLabel = 'Value', accentColors = ['cyan', 'purple'] }, ref) {
    const diffLines: DiffLine[] = useMemo(() => {
      if (items.length !== 2 || !items[0].code || !items[1].code) return []
      const a = items[0].code.split('\n')
      const b = items[1].code.split('\n')
      const max = Math.min(Math.max(a.length, b.length), 50)
      const result: DiffLine[] = []
      for (let i = 0; i < max; i++) {
        const la = a[i] ?? ''
        const lb = b[i] ?? ''
        result.push({ lineA: la, lineB: lb, type: la.trim() === lb.trim() ? 'same' : 'diff' })
      }
      return result
    }, [items])

    if (!open) return null

    const maxVal = Math.max(items[0]?.value ?? 0, items[1]?.value ?? 0, 1)

    return (
      <div
        ref={ref}
        data-slot="compare-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) onOpenChange(false) }}
      >
        <div data-slot="compare-modal" className={cn('w-full max-w-5xl max-h-[90vh] bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col')}>
          <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-foreground">Comparison</h2>
            <button onClick={() => onOpenChange(false)} className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border">Close</button>
          </div>
          <div className="p-5 overflow-y-auto flex-1">
            {items.length < 2 ? (
              <p className="text-center text-muted-foreground py-10">Select 2 items to compare</p>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item, idx) => (
                    <div key={item.name + idx} className="space-y-2 p-3 rounded-lg border border-border bg-muted/30">
                      <span className="text-sm font-semibold">{item.name}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.category && <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">{item.category}</span>}
                        <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">{item.value} {metricLabel}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', getBarColor(accentColors[idx]))} style={{ width: `${Math.min((item.value / maxVal) * 100, 100)}%` }} />
                      </div>
                      {item.path && <div className="text-[10px] text-muted-foreground truncate">{item.path}</div>}
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <h3 className="text-xs uppercase text-muted-foreground tracking-wider mb-3">{metricLabel} comparison</h3>
                  {items.map((item, idx) => (
                    <div key={item.name + idx} className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-muted-foreground w-24 truncate">{item.name}</span>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', getBarColor(accentColors[idx]))} style={{ width: `${(item.value / maxVal) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right">{item.value}</span>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2">
                    Difference: <span className="font-bold text-foreground">{Math.abs(items[0].value - items[1].value)}</span> {metricLabel}
                  </p>
                </div>
                {diffLines.length > 0 && <DiffTable lines={diffLines} nameA={items[0].name} nameB={items[1].name} colors={accentColors} />}
                <div className="flex justify-end">
                  <button onClick={() => downloadCompareReport(items, metricLabel)} className="text-xs px-3 py-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Download report</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)
