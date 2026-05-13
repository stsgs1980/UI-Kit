'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { HudCard } from '../hud-card'
import { AnimatedCounter } from '../animated-counter'
import { ScifiSectionHeader } from '../scifi-section-header'
import type { Beneficiary, SummaryStat, AnalysisColumn } from './types'
import { CATEGORY_STYLES } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiImpactBeneficiariesProps {
  /** Beneficiary entries to display */
  beneficiaries: Beneficiary[]
  /** Summary stats row. @default [] */
  summaryStats?: SummaryStat[]
  /** Bottom analysis columns. @default [] */
  analysisColumns?: AnalysisColumn[]
  /** Section title. @default 'Impact Beneficiaries' */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Accent color. @default '#00e5ff' */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Internal: Beneficiary Card ───────────────────────────────

function BeneficiaryCard({ beneficiary, delay }: { beneficiary: Beneficiary; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const cat = CATEGORY_STYLES[beneficiary.category]

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay }} className="relative group">
      <div className="p-3 sm:p-4 border rounded-sm bg-[rgba(5,5,16,0.5)] h-full transition-all duration-300 hover:bg-[rgba(10,10,30,0.8)]" style={{ borderColor: cat.border }}>
        <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `inset 0 0 20px ${cat.bg}` }} />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {beneficiary.icon && <span className="text-xl">{beneficiary.icon}</span>}
              <div>
                <div className="font-mono text-sm font-bold text-white">{beneficiary.name}</div>
                <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm" style={{ color: cat.color, backgroundColor: cat.bg, border: `1px solid ${cat.border}` }}>
                  {cat.label}
                </span>
              </div>
            </div>
          </div>
          <div className="font-mono text-lg font-bold mb-1" style={{ color: cat.color }}>{beneficiary.benefit}</div>
          <p className="font-mono text-[10px] text-[#9090c0] leading-relaxed mb-3">{beneficiary.description}</p>
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[9px]">
              <span className="text-[#505080]">IMPACT SCORE</span>
              <span style={{ color: cat.color }}>{beneficiary.gain}%</span>
            </div>
            <div className="h-1 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${beneficiary.gain}%` } : {}} transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
                className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${cat.color}40, ${cat.color})`, boxShadow: `0 0 8px ${cat.color}30` }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiImpactBeneficiaries -- grid of beneficiary cards with impact
 * scores, summary stats, and optional analysis panel.
 *
 * @example
 * ```tsx
 * <ScifiImpactBeneficiaries
 *   beneficiaries={[{ id: '1', name: 'Entity A', category: 'producer', benefit: '+$210B/yr', gain: 95, description: 'Leading producer with high margins' }]}
 *   summaryStats={[{ label: 'Total Impact', value: 750, suffix: ' B', prefix: '+$' }]}
 * />
 * ```
 */
export const ScifiImpactBeneficiaries = forwardRef<HTMLElement, ScifiImpactBeneficiariesProps>(
  ({ beneficiaries, summaryStats = [], analysisColumns = [], title, subtitle, accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} data-slot="scifi-impact-beneficiaries" className={cn('relative py-16 sm:py-24 px-4', className)}>
        <div className="absolute inset-0 scifi-grid-bg-dense opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${accentColor}0A 0%, transparent 70%)` }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <ScifiSectionHeader label="[ Beneficiaries ]" title={title ?? 'Impact Beneficiaries'} subtitle={subtitle ?? 'Key players gaining from current conditions'} />

          {/* Summary stats */}
          {summaryStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {summaryStats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="p-3 border border-[rgba(255,255,255,0.05)] bg-[rgba(5,5,16,0.5)] rounded-sm text-center">
                  <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider mb-2">{stat.label}</div>
                  <div className="font-mono text-xl sm:text-2xl font-bold" style={{ color: stat.color ?? accentColor }}>
                    <AnimatedCounter end={stat.value} duration={2000} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Beneficiaries grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {beneficiaries.map((b, i) => (
              <BeneficiaryCard key={b.id} beneficiary={b} delay={i * 0.05} />
            ))}
          </div>

          {/* Analysis panel */}
          {analysisColumns.length > 0 && (
            <HudCard title="Analysis" delay={0.3} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysisColumns.map((col, i) => (
                  <div key={i} className="space-y-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider flex items-center gap-2" style={{ color: col.color }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                      {col.title}
                    </div>
                    <div className="font-mono text-xs text-[#9090c0] leading-relaxed">{col.text}</div>
                  </div>
                ))}
              </div>
            </HudCard>
          )}
        </div>
      </section>
    )
  },
)
ScifiImpactBeneficiaries.displayName = 'ScifiImpactBeneficiaries'
