'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { ScifiReserveMonitorProps } from './types'
import { ReserveCards } from './reserve-cards'

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiReserveMonitor -- storage/reserve monitor with circular gauges,
 * sparklines, global fill bar, and summary stat cards.
 *
 * @example
 * ```tsx
 * <ScifiReserveMonitor
 *   title="Storage Monitor"
 *   regions={[{
 *     id: 'r1', name: 'Region A', currentValue: '385',
 *     capacityPercent: 52, trend: 'down', trendValue: '-2.1%',
 *     sparkline: [395, 392, 390, 389, 387, 386, 385],
 *     unit: 'units', accentColor: '#00e5ff',
 *   }]}
 *   summaryStats={[{ label: 'Total', value: 4.2, suffix: 'B',
 *     description: 'Combined reserves', color: '#00e5ff' }]}
 *   globalFill={63}
 * />
 * ```
 */
export const ScifiReserveMonitor = forwardRef<HTMLDivElement, ScifiReserveMonitorProps>(
  ({ regions, summaryStats, globalFill: globalFillProp, accentColor = '#00e5ff', title, subtitle, className }, ref) => {
    // Compute global fill from regions if not provided
    const computedFill = globalFillProp ?? (regions.length > 0 ? Math.round(regions.reduce((s, r) => s + r.capacityPercent, 0) / regions.length) : 0)

    // Animate fill on mount
    const [displayFill, setDisplayFill] = useState(0)
    const fillRef = useRef<HTMLDivElement>(null)
    const [fillVisible, setFillVisible] = useState(false)

    useEffect(() => {
      const el = fillRef.current
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setFillVisible(true); observer.disconnect() } },
        { threshold: 0 },
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      if (!fillVisible) return
      const duration = 2000
      const start = Date.now()
      const target = computedFill
      const animate = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplayFill(target * eased)
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [fillVisible, computedFill])

    return (
      <section ref={ref} data-slot="scifi-reserve-monitor" className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:py-20', className)}>
        {/* Background */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full pointer-events-none max-w-full translate-x-1/2"
          style={{ background: `radial-gradient(circle, ${accentColor}05 0%, transparent 60%)` }} />

        <div className="relative z-10">
          {/* Header */}
          {title && (
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-white tracking-wider" style={{ textShadow: `0 0 20px ${accentColor}30` }}>
                {title}
              </h2>
              {subtitle && <p className="mt-2 text-sm text-[#7070a0] font-mono max-w-2xl mx-auto">{subtitle}</p>}
            </div>
          )}

          {/* Global reserve bar */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 rounded-sm backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(10, 10, 26, 0.8)', border: `1px solid ${accentColor}20` }}>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                Global Fill Level
              </h3>
              <div ref={fillRef} className="relative">
                <div className="h-6 bg-[rgba(255,255,255,0.04)] rounded-sm overflow-hidden border border-[rgba(0,229,255,0.1)]">
                  <div className="h-full flex">
                    <motion.div animate={fillVisible ? { width: `${Math.min(displayFill, 40)}%` } : { width: 0 }} transition={{ duration: 2, ease: 'easeOut' }} className="h-full" style={{ backgroundColor: 'rgba(234,179,8,0.3)' }} />
                    <motion.div animate={fillVisible ? { width: `${Math.max(0, Math.min(displayFill - 40, 20))}%` } : { width: 0 }} transition={{ duration: 2, ease: 'easeOut' }} className="h-full" style={{ backgroundColor: 'rgba(255,107,0,0.3)' }} />
                    <motion.div animate={fillVisible ? { width: `${Math.max(0, displayFill - 60)}%` } : { width: 0 }} transition={{ duration: 2, ease: 'easeOut' }} className="h-full" style={{ backgroundColor: `${accentColor}30` }} />
                  </div>
                  <motion.div animate={fillVisible ? { left: `${displayFill}%`, opacity: 1 } : { left: 0, opacity: 0 }} transition={{ duration: 2, ease: 'easeOut' }}
                    className="absolute top-0 bottom-0 w-[2px]"
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}cc, 0 0 16px ${accentColor}40` }} />
                  <div className="absolute inset-0 flex items-end pointer-events-none">
                    {[0, 20, 40, 60, 80, 100].map((tick) => (
                      <div key={tick} className="absolute bottom-0 w-[1px] h-2 bg-[rgba(255,255,255,0.1)]" style={{ left: `${tick}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Labels */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(234,179,8,0.5)' }} /><span className="font-mono text-[9px] text-[#7070a0]">LOW (&lt;40%)</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ backgroundColor: 'rgba(255,107,0,0.5)' }} /><span className="font-mono text-[9px] text-[#7070a0]">MID</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ backgroundColor: `${accentColor}80` }} /><span className="font-mono text-[9px] text-[#7070a0]">HIGH (&gt;60%)</span></div>
                </div>
                <span className="font-mono text-sm font-bold" style={{ color: accentColor, textShadow: `0 0 8px ${accentColor}60` }}>
                  {displayFill.toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cards */}
          <ReserveCards regions={regions} summaryStats={summaryStats} />
        </div>
      </section>
    )
  },
)
ScifiReserveMonitor.displayName = 'ScifiReserveMonitor'
