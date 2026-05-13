'use client'

import { forwardRef, useId } from 'react'
import { cn } from '../../tokens/cn'

/**
 * Tiny inline SVG sparkline with gradient fill.
 *
 * @example
 * ```tsx
 * <SparklineMini data={[81.2, 80.5, 79.8, 79.1, 78.4]} color="#22c55e" />
 * ```
 */
export const SparklineMini = forwardRef<SVGSVGElement, {
  data: number[]
  color?: string
  width?: number
  height?: number
  className?: string
}>(({ data, color = '#00e5ff', width = 72, height = 24, className }, ref) => {
  const uid = useId()
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')

  const lastX = width
  const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2
  const gradId = `spark-${color.replace('#', '')}-${uid}`.replace(/[^a-zA-Z0-9-]/g, '')

  return (
    <svg ref={ref} width={width} height={height} className={cn('flex-shrink-0', className)} viewBox={`0 0 ${width} ${height}`} data-slot="sparkline-mini">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${lastX},${height}`}
        fill={`url(#${gradId})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle cx={lastX} cy={lastY} r="2" fill={color} />
      <circle cx={lastX} cy={lastY} r="4" fill={color} opacity="0.2" />
    </svg>
  )
})
SparklineMini.displayName = 'SparklineMini'
