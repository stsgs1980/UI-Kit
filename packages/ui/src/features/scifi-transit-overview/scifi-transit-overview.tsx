'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { HudCard } from '../hud-card'
import { AnimatedCounter } from '../animated-counter'
import { ScifiSectionHeader } from '../scifi-section-header'
import type { TransitStat, ExporterData, DependencyGauge, RiskLevel } from './types'

export interface ScifiTransitOverviewProps {
  title?: string
  subtitle?: string
  heroPercent?: number
  heroLabel?: string
  stats?: TransitStat[]
  exporters?: ExporterData[]
  dependencyGauges?: DependencyGauge[]
  riskLevel?: RiskLevel
  accentColor?: string
  className?: string
}

function GaugeMeter({ label, percentage, color, delay }: { label: string; percentage: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-[#9090c0]">{label}</span>
        <span style={{ color }}>{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 10px ${color}50` }}
        />
      </div>
    </div>
  )
}

/**
 * ScifiTransitOverview -- 3-column transit corridor dashboard.
 *
 * @example
 * ```tsx
 * <ScifiTransitOverview heroPercent={21} heroLabel="of global throughput"
 *   stats={[{ label: 'Width', value: '33 km' }]}
 *   exporters={[{ id: '1', name: 'Entity A', value: '6.8M' }]}
 * />
 * ```
 */
export const ScifiTransitOverview = forwardRef<HTMLElement, ScifiTransitOverviewProps>(
  ({ title, subtitle, heroPercent, heroLabel, stats = [], exporters = [], dependencyGauges = [], riskLevel, accentColor = '#00e5ff', className }, ref) => {
    const risk = riskLevel ?? { label: 'High', description: 'Elevated risk level in the region', color: '#ff2244' }
    return (
      <section ref={ref} data-slot="scifi-transit-overview" className={cn('relative py-16 sm:py-24 px-4 overflow-hidden', className)}>
        <div className="absolute inset-0 scifi-grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none max-w-full"
          style={{ background: `radial-gradient(circle, ${accentColor}0D 0%, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <ScifiSectionHeader label="[ Overview ]" title={title ?? 'Transit Corridor'} subtitle={subtitle ?? 'Key statistics and operational metrics'} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Stats card */}
            <HudCard title="Key Metrics" accentColor={accentColor} delay={0} className="lg:col-span-1">
              <div className="space-y-5">
                {heroPercent != null && (
                  <div className="text-center py-3">
                    <div className="font-mono text-4xl sm:text-5xl font-black" style={{ color: accentColor }}>
                      <AnimatedCounter end={heroPercent} duration={2000} suffix="%" />
                    </div>
                    <div className="font-mono text-xs text-[#7070a0] mt-2 uppercase tracking-wider">{heroLabel}</div>
                  </div>
                )}
                <div className="border-t border-[rgba(255,255,255,0.08)] pt-4 space-y-3">
                  {stats.map((s, i) => (
                    <div key={i} className="flex justify-between font-mono text-sm">
                      <span className="text-[#9090c0]">{s.label}</span>
                      <span style={{ color: s.color ?? accentColor }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </HudCard>

            {/* Exporters + gauges */}
            <HudCard title="Entities" accentColor={accentColor} delay={0.1} className="lg:col-span-1">
              <div className="space-y-0">
                {exporters.map((e) => (
                  <div key={e.id} className="flex items-center justify-between py-2 border-b border-[rgba(0,229,255,0.06)] last:border-0">
                    <div className="flex items-center gap-2">
                      {e.icon && <span className="text-lg">{e.icon}</span>}
                      <span className="font-mono text-sm text-[#c0c0e0]">{e.name}</span>
                    </div>
                    <span className="font-mono text-sm" style={{ color: accentColor }}>{e.value}</span>
                  </div>
                ))}
              </div>
              {dependencyGauges.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[rgba(0,229,255,0.1)]">
                  <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider mb-2">Dependency</div>
                  {dependencyGauges.map((g, i) => (
                    <GaugeMeter key={i} label={g.label} percentage={g.percentage} color={g.color ?? accentColor} delay={0.5 + i * 0.1} />
                  ))}
                </div>
              )}
            </HudCard>

            {/* Risk card */}
            <HudCard title="Risk Assessment" delay={0.2} className="lg:col-span-1">
              <div className="space-y-4">
                <div className="p-3 border rounded-sm" style={{ borderColor: `${risk.color}40`, backgroundColor: `${risk.color}0D` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: risk.color }} />
                    <span className="font-mono text-xs uppercase tracking-wider" style={{ color: risk.color }}>Threat Level</span>
                  </div>
                  <div className="font-mono text-xl font-bold" style={{ color: risk.color }}>{risk.label}</div>
                  <div className="font-mono text-[10px] text-[#7070a0] mt-1">{risk.description}</div>
                  {risk.badge && (
                    <div className="mt-2">
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded-sm" style={{ border: `1px solid ${risk.color}40`, color: risk.color }}>{risk.badge}</span>
                    </div>
                  )}
                </div>
              </div>
            </HudCard>
          </div>
        </div>
      </section>
    )
  },
)
ScifiTransitOverview.displayName = 'ScifiTransitOverview'
