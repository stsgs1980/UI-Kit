'use client'

import { forwardRef } from 'react'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { ChartCard } from './chart-card'
import type { ChartConfig } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiChartGridProps {
  /** Array of chart configurations */
  charts: ChartConfig[]
  /** Accent color (default '#00e5ff') */
  accentColor?: string
  /** Section header label */
  label?: string
  /** Section header title */
  title?: string
  /** Section header subtitle */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiChartGrid — responsive grid of sci-fi styled charts.
 *
 * Renders a configurable grid of chart cards (line, bar, area)
 * wrapped in HUD-style containers with animated entrances.
 *
 * @example
 * ```tsx
 * <ScifiChartGrid
 *   charts={[
 *     { id: 'rev', title: 'Revenue', type: 'line', data: revData },
 *     { id: 'vol', title: 'Volume', type: 'bar', data: volData },
 *   ]}
 *   title="Market Data"
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiChartGrid = forwardRef<HTMLElement, ScifiChartGridProps>(
  ({ charts, accentColor = '#00e5ff', label = '[ Data ]', title = 'Data Analysis', subtitle = 'Multi-chart monitoring dashboard', className }, ref) => {
    return (
      <section ref={(ref as React.RefObject<HTMLElement>)} data-slot="scifi-chart-grid"
        className={cn('relative py-16 sm:py-24 px-4', className)}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScifiSectionHeader label={label} title={title} subtitle={subtitle} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {charts.map((chart, i) => (
              <ChartCard
                key={String(chart.id)}
                chart={chart}
                accentColor={accentColor}
                delay={i * 0.1}
                fullWidth={false}
              />
            ))}
          </div>
        </div>
      </section>
    )
  },
)
ScifiChartGrid.displayName = 'ScifiChartGrid'
