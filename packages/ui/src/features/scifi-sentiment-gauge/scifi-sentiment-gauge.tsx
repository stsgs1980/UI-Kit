'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { MainGauge } from './main-gauge'
import { MiniGaugeCard } from './mini-gauge'
import { TrendChart } from './trend-chart'
import type { ScifiSentimentGaugeProps } from './types'
import { getSentimentLabel } from './types'

/**
 * ScifiSentimentGauge -- composite sentiment analysis with arc gauge, fear/greed bar, trend chart, and mini indicator cards.
 *
 * @example
 * ```tsx
 * <ScifiSentimentGauge
 *   score={64}
 *   indicators={[
 *     { id: '1', name: 'Investor', value: 68, change: 4.2, color: '#00e5ff' },
 *   ]}
 *   sparklineData={[52, 55, 58, 60, 64, 62, 64]}
 *   fearGreedValue={62}
 * />
 * ```
 */
export const ScifiSentimentGauge = forwardRef<HTMLElement, ScifiSentimentGaugeProps>(
  ({ score, indicators, sparklineData, fearGreedValue, accentColor = '#00e5ff', className }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    const label = getSentimentLabel(score)
    const avgChange = indicators.length > 0
      ? (indicators.reduce((s, ind) => s + ind.change, 0) / indicators.length).toFixed(1)
      : '0'
    const positiveCount = indicators.filter((i) => i.change > 0).length

    const segments: { label: string; range: number[]; color: string }[] = [
      { label: 'Ext. Fear', range: [0, 20], color: '#ff2244' }, { label: 'Fear', range: [20, 40], color: '#f97316' },
      { label: 'Neutral', range: [40, 60], color: '#eab308' }, { label: 'Greed', range: [60, 80], color: '#84cc16' },
      { label: 'Ext. Greed', range: [80, 100], color: '#22c55e' },
    ]

    const fearGreedLabel = getSentimentLabel(fearGreedValue ?? score)

    return (
      <section ref={ref} className={cn('relative py-12 sm:py-16 md:py-20 px-4', className)} data-slot="scifi-sentiment-gauge">
        <div className="max-w-7xl mx-auto">
          {/* Top row: Main Gauge + Fear/Greed + Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Main Gauge */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
              <div className="rounded-sm p-4 sm:p-6 flex flex-col items-center" style={{
                backgroundColor: 'rgba(10,10,26,0.6)', border: `1px solid ${accentColor}15`, boxShadow: `0 0 20px ${accentColor}08`,
              }}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-2">Overall Index</div>
                <MainGauge score={score} isInView={isInView} accentColor={accentColor} />
                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 2.2 }} className="mt-2 mb-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-sm text-xs font-mono font-bold" style={{
                    color: label.color, backgroundColor: `${label.color}15`, border: `1px solid ${label.color}30`,
                  }}>{label.text}</span>
                </motion.div>
                <div className="grid grid-cols-3 gap-3 w-full border-t pt-3" style={{ borderColor: `${accentColor}1A` }}>
                  <div className="text-center">
                    <div className="font-mono text-[9px] text-[#505080] uppercase tracking-wider">Signals</div>
                    <div className="font-mono text-sm font-bold text-white">{indicators.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-[9px] text-[#505080] uppercase tracking-wider">Positive</div>
                    <div className="font-mono text-sm font-bold text-[#22c55e]">{positiveCount}/{indicators.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-[9px] text-[#505080] uppercase tracking-wider">Avg Chg</div>
                    <div className="font-mono text-sm font-bold" style={{ color: parseFloat(avgChange) >= 0 ? '#22c55e' : '#ff2244' }}>
                      {parseFloat(avgChange) >= 0 ? '+' : ''}{avgChange}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fear/Greed + Trend */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
              {/* Fear/Greed bar */}
              {fearGreedValue !== undefined && (
                <div className="rounded-sm p-4 sm:p-6" style={{
                  backgroundColor: 'rgba(10,10,26,0.6)', border: `1px solid ${accentColor}15`, boxShadow: `0 0 20px ${accentColor}08`,
                }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[#7070a0] uppercase tracking-wider">Fear / Greed Index</span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm" style={{
                      color: fearGreedLabel.color, backgroundColor: `${fearGreedLabel.color}15`, border: `1px solid ${fearGreedLabel.color}30`,
                    }}>{fearGreedLabel.text}</span>
                  </div>
                  <div className="relative h-8 rounded-sm overflow-hidden flex" style={{ border: '1px solid rgba(60,60,90,0.3)' }}>
                    {segments.map((seg, i) => {
                      const width = (seg.range[1] - seg.range[0]) / 100
                      const isActive = (fearGreedValue ?? 0) >= seg.range[0] && (fearGreedValue ?? 0) < seg.range[1]
                      return (
                        <div key={i} className="relative h-full transition-all duration-500" style={{
                          width: `${width * 100}%`,
                          backgroundColor: isActive ? `${seg.color}30` : `${seg.color}08`,
                          borderRight: i < segments.length - 1 ? '1px solid rgba(50,50,80,0.3)' : 'none',
                        }}>
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[7px] font-mono text-[#505070] whitespace-nowrap hidden sm:block">{seg.label}</span>
                        </div>
                      )
                    })}
                    {isInView && (
                      <motion.div className="absolute top-0 h-full z-10" initial={{ left: '0%' }}
                        animate={{ left: `${fearGreedValue ?? 0}%` }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }} style={{ transform: 'translateX(-50%)' }}>
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white mx-auto" />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-[10px] text-[#505080]">Updated recently</span>
                    <span className="text-lg font-bold font-mono" style={{ color: fearGreedLabel.color }}>{fearGreedValue} <span className="text-[10px] text-[#505080]">/ 100</span></span>
                  </div>
                </div>
              )}

              {/* Trend Chart */}
              {sparklineData && sparklineData.length > 0 && (
                <div className="rounded-sm p-4 sm:p-6" style={{
                  backgroundColor: 'rgba(10,10,26,0.6)', border: `1px solid ${accentColor}15`, boxShadow: `0 0 20px ${accentColor}08`,
                }}>
                  <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-2">Trend (30d)</div>
                  <TrendChart data={sparklineData} accentColor={accentColor} />
                </div>
              )}
            </motion.div>
          </div>

          {/* Indicator Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {indicators.map((indicator, i) => (
              <MiniGaugeCard key={indicator.id} indicator={indicator} index={i} accentColor={accentColor} />
            ))}
          </div>
        </div>
      </section>
    )
  },
)
ScifiSentimentGauge.displayName = 'ScifiSentimentGauge'
