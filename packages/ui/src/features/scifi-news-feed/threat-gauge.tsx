'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { HudCard } from '../hud-card'
import { THREAT_SEGMENTS, getSegmentColor } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface HorizontalThreatGaugeProps {
  /** Current threat level 0-10 */
  value: number
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * HorizontalThreatGauge — horizontal segmented threat bar.
 *
 * Displays a color-segmented progress bar with animated fill,
 * tick marks, value readout, and status text.
 *
 * @example
 * ```tsx
 * <HorizontalThreatGauge value={7.4} />
 * ```
 */
export function HorizontalThreatGauge({ value, accentColor = '#00e5ff' }: HorizontalThreatGaugeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const t0 = Date.now()
    const dur = 2000
    const animate = () => {
      const p = Math.min((Date.now() - t0) / dur, 1)
      setDisplay(value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  const statusMsg = value <= 3 ? 'STATUS: LOW THREAT' : value <= 5 ? 'STATUS: MODERATE THREAT' : value <= 7.5 ? 'STATUS: ELEVATED THREAT' : 'STATUS: CRITICAL THREAT'

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}>
      <HudCard title="Threat Level" accentColor="orange">
        <div className="space-y-3">
          {/* Gauge bar */}
          <div className="relative h-4 rounded-sm overflow-hidden bg-[rgba(0,0,0,0.4)] border border-[rgba(255,107,0,0.15)]">
            <div className="absolute inset-0 flex">
              {THREAT_SEGMENTS.map((seg, i) => (
                <div key={i} className="h-full"
                  style={{ width: `${((seg.to - seg.from) / 10) * 100}%`, backgroundColor: `${seg.color}25` }} />
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 rounded-sm transition-all duration-100"
              style={{
                width: `${(display / 10) * 100}%`,
                background: 'linear-gradient(90deg, #22c55e, #eab308 30%, #ff6b00 60%, #ff2244)',
                boxShadow: display > 7 ? '0 0 12px rgba(255,34,68,0.5), 0 0 24px rgba(255,34,68,0.2)' : '0 0 8px rgba(255,107,0,0.3)',
              }} />
            <div className="absolute inset-0 flex items-end">
              {[0, 2, 4, 6, 8, 10].map(tick => (
                <div key={tick} className="absolute bottom-0 w-[1px] h-2 bg-[rgba(255,255,255,0.15)]" style={{ left: `${tick * 10}%` }} />
              ))}
            </div>
          </div>

          {/* Value + labels */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3 sm:gap-4">
              {THREAT_SEGMENTS.map(seg => (
                <div key={seg.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: seg.color }} />
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#7070a0] hidden sm:inline">{seg.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl sm:text-3xl font-bold"
                style={{ color: getSegmentColor(value), textShadow: `0 0 12px ${getSegmentColor(value)}80` }}>{display.toFixed(1)}</span>
              <span className="font-mono text-xs text-[#7070a0]">/10</span>
            </div>
          </div>

          {/* Status */}
          <AnimatePresence mode="wait">
            {display > 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-mono text-xs text-[#ff6b00] text-center tracking-wider"
                style={{ textShadow: '0 0 8px rgba(255,107,0,0.3)' }}>
                ● {statusMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </HudCard>
    </motion.div>
  )
}
