'use client'

import { useMemo } from 'react'
import { cn } from '../../tokens/cn'
import type { SizeDonutProps } from './types'

const BUCKETS = [
  { label: 'Small', max: 100, color: 'var(--chart-1, #06b6d4)' },
  { label: 'Medium', max: 500, color: 'var(--chart-2, #a855f7)' },
  { label: 'Large', max: 1000, color: 'var(--chart-3, #10b981)' },
  { label: 'XL', max: Infinity, color: 'var(--chart-4, #f59e0b)' },
] as const

/**
 * SVG donut chart showing the distribution of items by value size.
 *
 * @example
 * ```tsx
 * <SizeDonut data={items} metricLabel="Lines" />
 * ```
 */
export function SizeDonut({ data, metricLabel = 'Value' }: SizeDonutProps) {
  const segments = useMemo(() => {
    const total = data.length || 1
    return BUCKETS.map((bucket) => {
      const count = data.filter((d) => {
        if (bucket.max === Infinity) return d.value > 1000
        return d.value <= bucket.max && (bucket.label === 'Small' || d.value > BUCKETS[BUCKETS.indexOf(bucket) - 1]?.max)
      }).length
      return { ...bucket, count, pct: ((count / total) * 100).toFixed(1) }
    })
  }, [data])

  const radius = 36
  const cx = 50
  const cy = 50
  const sw = 10
  const circ = 2 * Math.PI * radius

  let offset = 0

  return (
    <div
      data-slot="size-donut"
      className="glass-card rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-muted-foreground">Distribution</span>
      </div>
      <div className="flex items-center gap-4">
        <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="currentColor" strokeWidth={sw} className="text-muted/30" />
          {segments.map((seg, i) => {
            const segLen = (seg.count / (data.length || 1)) * circ
            const start = offset
            offset += segLen
            return (
              <circle
                key={seg.label}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={sw}
                strokeDasharray={`${segLen} ${circ - segLen}`}
                strokeDashoffset={-start}
                strokeLinecap="butt"
                transform={`rotate(-90 ${cx} ${cy})`}
                className="transition-all duration-700"
                style={{ transitionDelay: `${i * 150}ms` }}
              />
            )
          })}
          <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground text-[10px] font-bold">{data.length}</text>
          <text x={cx} y={cy + 8} textAnchor="middle" className="fill-muted-foreground text-[7px]">items</text>
        </svg>
        <div className="flex-1 space-y-1.5">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-muted-foreground flex-1 truncate">{seg.label}</span>
              <span className="text-foreground font-medium w-6 text-right">{seg.count}</span>
              <span className="text-muted-foreground w-10 text-right">{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
