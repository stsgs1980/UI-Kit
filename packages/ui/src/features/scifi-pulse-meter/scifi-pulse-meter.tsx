'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { PulseRing } from './pulse-ring'
import { PulseSectorBars } from './sector-bars'
import type { ScifiPulseMeterProps, SentimentData } from './types'
import { getScoreColor, getScoreLabel } from './types'

/**
 * Single sentiment indicator card (gauge / number / bar variant).
 */
function SentimentCard({ item, index, isInView }: { item: SentimentData; index: number; isInView: boolean }) {
  const color = item.color ?? '#00e5ff'
  const type = item.type ?? 'number'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/[0.02] border border-white/[0.05] rounded-sm p-3"
      data-slot="sentiment-card"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono text-[#7070a0] uppercase tracking-wider">{item.label}</span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm" style={{
          color, backgroundColor: `${color}15`, border: `1px solid ${color}30`,
        }}>
          {item.tag}
        </span>
      </div>

      {type === 'gauge' && typeof item.value === 'number' && (
        <div className="flex items-center gap-3">
          <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <motion.circle cx="28" cy="28" r="22" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 22}
              initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
              animate={isInView ? { strokeDashoffset: 2 * Math.PI * 22 * (1 - item.value / 100) } : {}}
              transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: 'rotate(-90 28 28)', transformOrigin: '28px 28px', filter: `drop-shadow(0 0 4px ${color}60)` }}
            />
          </svg>
          <div>
            <p className="text-xl font-bold font-mono" style={{ color }}>{item.value}</p>
            <p className="text-[10px] font-mono text-[#7070a0]">of 100</p>
          </div>
        </div>
      )}

      {type === 'number' && (
        <p className="text-xl font-bold font-mono" style={{ color }}>{item.value}</p>
      )}

      {type === 'bar' && typeof item.value === 'number' && (
        <div>
          <p className="text-lg font-bold font-mono mb-1.5" style={{ color }}>{item.value}%</p>
          <div className="relative h-2 bg-white/[0.05] rounded-sm overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${item.value}%` } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 h-full rounded-sm"
              style={{ background: `linear-gradient(to right, ${color}40, ${color})`, boxShadow: `0 0 6px ${color}40` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

/**
 * ScifiPulseMeter -- composite pulse meter with ring gauge, sector bars, and sentiment cards.
 *
 * @example
 * ```tsx
 * <ScifiPulseMeter
 *   score={72}
 *   sectors={[{ label: 'Energy', value: 3.2 }]}
 *   sentiments={[{ label: 'Fear/Greed', value: 68, tag: 'Greed', type: 'gauge' }]}
 * />
 * ```
 */
export const ScifiPulseMeter = forwardRef<HTMLElement, ScifiPulseMeterProps>(
  ({ score, sectors, sentiments, accentColor = '#00e5ff', className }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const label = getScoreLabel(score)
    const labelColor = getScoreColor(score)

    return (
      <section ref={ref} className={cn('relative py-12 sm:py-16 lg:py-20 overflow-hidden', className)} data-slot="scifi-pulse-meter">
        <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Ring */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="rounded-sm p-4 sm:p-6" style={{
                backgroundColor: 'rgba(10,10,26,0.6)', border: `1px solid ${accentColor}15`, boxShadow: `0 0 20px ${accentColor}08`,
              }}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-2">Pulse Index</div>
                <PulseRing score={score} accentColor={accentColor} />
                <div className="mt-2 text-center">
                  <span className="inline-block px-3 py-1 rounded-sm text-xs font-mono font-bold" style={{
                    color: labelColor, backgroundColor: `${labelColor}15`, border: `1px solid ${labelColor}30`,
                  }}>{label}</span>
                </div>
              </div>
            </motion.div>

            {/* Sector Bars */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-sm p-4 sm:p-6" style={{
                backgroundColor: 'rgba(10,10,26,0.6)', border: `1px solid ${accentColor}15`, boxShadow: `0 0 20px ${accentColor}08`,
              }}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Sector Performance</div>
                <PulseSectorBars sectors={sectors} />
              </div>
            </motion.div>

            {/* Sentiment Cards */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="rounded-sm p-4 sm:p-6" style={{
                backgroundColor: 'rgba(10,10,26,0.6)', border: `1px solid ${accentColor}15`, boxShadow: `0 0 20px ${accentColor}08`,
              }}>
                <div className="font-mono text-xs text-[#7070a0] uppercase tracking-widest mb-4">Sentiment Indicators</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sentiments.map((item, i) => (
                    <SentimentCard key={i} item={item} index={i} isInView={isInView} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  },
)
ScifiPulseMeter.displayName = 'ScifiPulseMeter'
