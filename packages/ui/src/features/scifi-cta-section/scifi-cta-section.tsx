'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'

export interface CtaMetric { label: string; value: string }

export interface ScifiCtaSectionProps {
  title: string
  description: string
  metrics: CtaMetric[]
  readinessPercent?: number
  recommendationText?: string
  tickerItems?: string[]
  footerText?: string
  accentColor?: string
  className?: string
}

/**
 * ScifiCtaSection -- futuristic call-to-action section with readiness bar,
 * recommendation panel, and scrolling data ticker.
 *
 * @example
 * ```tsx
 * <ScifiCtaSection
 *   title="System Status"
 *   description="Real-time monitoring overview."
 *   metrics={[{ label: 'Throughput', value: '99.7%' }]}
 *   readinessPercent={72}
 *   tickerItems={['SYS OK | LOAD 42%']}
 * />
 * ```
 */
export const ScifiCtaSection = forwardRef<HTMLElement, ScifiCtaSectionProps>(
  ({ title, description, metrics, readinessPercent = 50, recommendationText, tickerItems = [], footerText, accentColor = '#00e5ff', className }, ref) => {
    const filled = Math.round((readinessPercent / 100) * 10)
    return (
      <section ref={ref} data-slot="scifi-cta-section" className={cn('relative py-16 sm:py-24 px-4', className)}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent, ${accentColor}08, transparent)` }} />
        <div className="absolute inset-0 scifi-grid-bg opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="relative rounded-sm p-1 backdrop-blur-sm" style={{ border: `1px solid ${accentColor}30`, backgroundColor: 'rgba(5,5,16,0.9)' }}>
            <div className="text-center py-8 sm:py-12 space-y-6">
              <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full border" style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}0D` }}>
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke={accentColor} strokeWidth="1.5">
                  <path d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span className="text-white" style={{ textShadow: `0 0 20px ${accentColor}60` }}>{title}</span>
              </h2>
              <p className="font-mono text-sm sm:text-base text-[#9090c0] max-w-2xl mx-auto leading-relaxed">{description}</p>
              <div className="flex flex-wrap justify-center gap-6">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-mono text-3xl font-bold" style={{ color: accentColor, textShadow: `0 0 12px ${accentColor}50` }}>{m.value}</div>
                    <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="max-w-md mx-auto">
                <div className="flex justify-between font-mono text-[9px] text-[#505080] uppercase tracking-wider mb-2">
                  <span>Readiness</span><span style={{ color: accentColor }}>{readinessPercent}%</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex-1 h-2 rounded-sm" style={{
                      backgroundColor: i < filled ? accentColor : 'rgba(255,255,255,0.05)',
                      boxShadow: i < filled ? `0 0 4px ${accentColor}60` : 'none', opacity: i < filled ? 1 : 0.3,
                    }} />
                  ))}
                </div>
              </div>
              {recommendationText && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="max-w-lg mx-auto p-4 border rounded-sm" style={{ borderColor: `${accentColor}25`, backgroundColor: `${accentColor}08` }}>
                  <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: accentColor }}>Key Recommendation</div>
                  <div className="font-mono text-sm text-[#c0c0e0] leading-relaxed">{recommendationText}</div>
                </motion.div>
              )}
              {tickerItems.length > 0 && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  className="overflow-hidden py-3 border-t border-b" style={{ borderColor: `${accentColor}18` }}>
                  <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="flex gap-8 whitespace-nowrap font-mono text-xs text-[#7070a0]">
                    {[...tickerItems, ...tickerItems].map((item, i) => (
                      <span key={i}><span style={{ color: accentColor }}>{item}</span><span className="mx-4">|</span></span>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        {footerText && (
          <footer className="mt-12 sm:mt-16"><div className="max-w-7xl mx-auto px-4">
            <div className="h-[1px] mb-8" style={{ background: `linear-gradient(to right, transparent, ${accentColor}30, transparent)` }} />
            <div className="flex justify-center font-mono text-[10px] text-[#505080]"><span style={{ color: accentColor }}>{footerText}</span></div>
          </div></footer>
        )}
      </section>
    )
  },
)
ScifiCtaSection.displayName = 'ScifiCtaSection'
