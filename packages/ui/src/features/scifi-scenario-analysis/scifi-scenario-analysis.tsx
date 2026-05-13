'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { HudCard } from '../hud-card'
import { ScifiSectionHeader } from '../scifi-section-header'
import type { Scenario, TimelineEvent, InfluenceFactor } from './types'
import { SEVERITY_CONFIG } from './types'

export interface ScifiScenarioAnalysisProps {
  scenarios: Scenario[]
  timeline?: TimelineEvent[]
  factors?: InfluenceFactor[]
  title?: string
  subtitle?: string
  accentColor?: string
  className?: string
}

function SeverityBadge({ severity }: { severity: Scenario['severity'] }) {
  const cfg = SEVERITY_CONFIG[severity]
  return <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm" style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}30` }}>{cfg.label}</span>
}

function TimelineItem({ year, event, side, color }: { year: string; event: string; side: 'left' | 'right'; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
      className="relative flex items-center gap-3 mb-3 last:mb-0">
      <div className={`flex-1 text-right ${side === 'left' ? 'block' : 'hidden sm:block'}`}>
        <span className="font-mono text-xs text-[#9090c0]">{event}</span>
      </div>
      <div className="relative">
        <div className="w-2.5 h-2.5 rounded-full z-10" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full animate-ping" style={{ backgroundColor: `${color}1A`, animationDuration: '3s' }} />
      </div>
      <div className={`flex-1 ${side === 'right' ? 'block' : 'hidden sm:block'}`}>
        <span className="font-mono text-xs" style={{ color }}>{year}</span>
      </div>
    </motion.div>
  )
}

/**
 * ScifiScenarioAnalysis -- scenario cards with probability rings,
 * timeline sidebar, and influence factor bars.
 *
 * @example
 * ```tsx
 * <ScifiScenarioAnalysis
 *   scenarios={[{ id: 'base', name: 'Baseline', probability: 40, impact: '$80-90', description: 'Status quo', severity: 'low' }]}
 *   timeline={[{ year: '2025', event: 'Policy change' }]}
 * />
 * ```
 */
export const ScifiScenarioAnalysis = forwardRef<HTMLElement, ScifiScenarioAnalysisProps>(
  ({ scenarios, timeline = [], factors = [], title, subtitle, accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} data-slot="scifi-scenario-analysis" className={cn('relative py-16 sm:py-24 px-4', className)}>
        <div className="absolute inset-0 scifi-grid-bg-dense opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScifiSectionHeader label="[ Analysis ]" title={title ?? 'Scenario Analysis'} subtitle={subtitle ?? 'Projected outcomes and influence factors'} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4">
              {scenarios.map((scenario, i) => {
                const color = scenario.color ?? accentColor
                return (
                  <HudCard key={scenario.id} accentColor={color} delay={i * 0.1}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-mono text-base sm:text-lg font-bold" style={{ color }}>{scenario.name}</h3>
                          <SeverityBadge severity={scenario.severity} />
                        </div>
                        <p className="font-mono text-xs sm:text-sm text-[#9090c0] leading-relaxed">{scenario.description}</p>
                      </div>
                      <div className="flex sm:flex-col items-center gap-4 sm:gap-2 sm:min-w-[120px]">
                        <div className="text-center">
                          <div className="font-mono text-[10px] text-[#7070a0] uppercase">Probability</div>
                          <div className="relative w-16 h-16 mt-1">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                              <motion.path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
                                strokeDasharray={`${scenario.probability}, 100`} initial={{ strokeDasharray: '0, 100' }} whileInView={{ strokeDasharray: `${scenario.probability}, 100` }}
                                viewport={{ once: true }} transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
                                style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-mono text-xs font-bold" style={{ color }}>{scenario.probability}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-mono text-[10px] text-[#7070a0] uppercase">Impact</div>
                          <div className="font-mono text-sm font-bold text-white mt-1">{scenario.impact}</div>
                        </div>
                      </div>
                    </div>
                  </HudCard>
                )
              })}
            </div>
            <div className="space-y-4">
              {timeline.length > 0 && (
                <HudCard title="Timeline" accentColor={accentColor} delay={0.2}>
                  <div className="relative">
                    <div className="absolute left-[4px] top-0 bottom-0 w-[1px]" style={{ background: `linear-gradient(to bottom, ${accentColor}, #ff6b00, #ff2244)`, opacity: 0.3 }} />
                    <div className="space-y-0 py-2">
                      {timeline.map((t, i) => <TimelineItem key={i} year={t.year} event={t.event} side={i % 2 === 0 ? 'right' : 'left'} color={accentColor} />)}
                    </div>
                  </div>
                </HudCard>
              )}
              {factors.length > 0 && (
                <HudCard title="Influence Factors" accentColor="#ff6b00" delay={0.3}>
                  <div className="space-y-3">
                    {factors.map((f, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between font-mono text-[10px]">
                          <span className="text-[#9090c0]">{f.name}</span>
                          <span style={{ color: f.color ?? accentColor }}>{f.impact}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${f.impact}%` }} viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }} className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${f.color ?? accentColor}60, ${f.color ?? accentColor})`, boxShadow: `0 0 6px ${f.color ?? accentColor}40` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </HudCard>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  },
)
ScifiScenarioAnalysis.displayName = 'ScifiScenarioAnalysis'
