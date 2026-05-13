'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { HudCard } from '../hud-card'
import { DemandChart } from './demand-chart'
import { ImpactRows } from './impact-rows'
import { AnimatedCounter } from '../animated-counter'
import type { KeyMetric, CountryImpact, SectorImpact, CurvePoint } from './types'

// --- Props ---

export interface ScifiDemandCurveProps {
  /** Key metric cards at top */
  metrics: KeyMetric[]
  /** Country/region impact entries */
  countries: CountryImpact[]
  /** Sector impact entries */
  sectors: SectorImpact[]
  /** Curve data points */
  curveData?: CurvePoint[]
  /** Current position on curve */
  currentPoint?: { x: number; y: number }
  /** Baseline position on curve */
  baselinePoint?: { x: number; y: number }
  /** Total reduction text */
  totalText?: string
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

/**
 * ScifiDemandCurve -- demand/supply curve analysis with country and sector impact.
 *
 * @example
 * ```tsx
 * <ScifiDemandCurve
 *   metrics={[{ label: 'Global Demand', value: 98.8, suffix: 'M', description: 'Current demand', color: '#00e5ff' }]}
 *   countries={[{ name: 'Region A', flag: 'A', reduction: 1.8, percent: 12, severity: 'critical' }]}
 *   sectors={[{ name: 'Logistics', icon: 'T', reduction: 12, color: '#ff2244' }]}
 *   curveData={[{ x: 70, y: 107.5 }, { x: 120, y: 96 }]}
 * />
 * ```
 */
export const ScifiDemandCurve = forwardRef<HTMLElement, ScifiDemandCurveProps>(
  ({
    metrics, countries, sectors, curveData = [], currentPoint, baselinePoint, totalText,
    accentColor = '#00e5ff',
    label = 'Demand Analysis', title = 'Demand Curve Monitor', subtitle = 'Price-demand relationship and impact analysis',
    className,
  }, ref) => (
    <section ref={ref} data-slot="scifi-demand-curve"
      className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16', className)}>
      <ScifiSectionHeader label={label} title={title} subtitle={subtitle} accentColor={accentColor} />

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {metrics.map((metric, i) => (
          <motion.div key={metric.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
            <HudCard accentColor={accentColor} className="h-full text-center !p-4 sm:!p-5">
              <div className="font-mono text-[10px] sm:text-xs text-[#7070a0] uppercase tracking-wider mb-2">{metric.label}</div>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                {metric.prefix && <span className="font-mono text-sm text-[#505080]">{metric.prefix}</span>}
                <AnimatedCounter end={metric.value} suffix={metric.suffix} prefix=""
                  decimals={metric.decimals || 0} duration={2000}
                  className="font-mono text-xl sm:text-2xl font-bold" />
              </div>
              <div className="font-mono text-[10px] leading-relaxed mx-auto max-w-[200px]"
                style={{ color: `${metric.color}99` }}>{metric.description}</div>
              <div className="mt-3 mx-auto w-12 h-[2px] rounded-full"
                style={{ backgroundColor: metric.color, boxShadow: `0 0 8px ${metric.color}60` }} />
            </HudCard>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <ImpactRows countries={countries} sectors={sectors} totalText={totalText} accentColor={accentColor} />
        <HudCard title="Demand Curve: Price vs Consumption" accentColor={accentColor}>
          <div className="h-[300px] sm:h-[350px]">
            <DemandChart curveData={curveData} currentPoint={currentPoint} baselinePoint={baselinePoint} accentColor={accentColor} />
          </div>
        </HudCard>
      </div>
    </section>
  ),
)
ScifiDemandCurve.displayName = 'ScifiDemandCurve'
