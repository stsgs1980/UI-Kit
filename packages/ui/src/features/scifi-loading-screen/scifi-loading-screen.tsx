'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { DEFAULT_STREAM_LINES, DEFAULT_MILESTONES, LEFT_BARS, RIGHT_BARS } from './loading-data'
import type { LoadingMilestone } from './loading-data'
import { HexLoader } from './hex-loader'
import { DataStream } from './data-stream'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiLoadingScreenProps {
  /** System name displayed in the title (default 'SYSTEM MONITOR') */
  systemName?: string
  /** Terminal lines for the background data stream */
  streamLines?: string[]
  /** Status milestones mapped to progress percentages */
  milestones?: LoadingMilestone[]
  /** Accent color (default '#00e5ff') */
  accentColor?: string
  /** Callback fired when loading animation completes */
  onComplete?: () => void
  /** Loading duration in ms (default 2800) */
  duration?: number
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiLoadingScreen — full-screen animated loading overlay.
 *
 * Displays a hexagonal progress loader, scrolling data streams,
 * HUD corner decorations, and a progress bar with status text.
 * Automatically fades out and calls `onComplete` when finished.
 *
 * @example
 * ```tsx
 * <ScifiLoadingScreen
 *   systemName="COMMAND CENTER"
 *   onComplete={() => setVisible(false)}
 * />
 * ```
 */
export const ScifiLoadingScreen = forwardRef<HTMLDivElement, ScifiLoadingScreenProps>(
  ({ systemName = 'SYSTEM MONITOR', streamLines, milestones, accentColor = '#00e5ff', onComplete, duration = 2800 }, ref) => {
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [statusText, setStatusText] = useState('')
    const hideRef = useRef<NodeJS.Timeout | null>(null)
    const completeRef = useRef<NodeJS.Timeout | null>(null)
    const ms = milestones ?? DEFAULT_MILESTONES

    useEffect(() => {
      setStatusText(ms[0].text)
      const interval = 50
      const steps = duration / interval
      let current = 0
      const timer = setInterval(() => {
        current += 100 / steps
        const jitter = Math.sin(current * 0.3) * 2
        const next = Math.min(100, current + jitter)
        setProgress(next)
        for (const m of ms) { if (next >= m.at && next < m.at + 15) setStatusText(m.text) }
        if (next >= 100) {
          clearInterval(timer)
          setStatusText(ms[ms.length - 1].text)
          hideRef.current = setTimeout(() => {
            setIsVisible(false)
            completeRef.current = setTimeout(() => onComplete?.(), 600)
          }, 300)
        }
      }, interval)
      return () => { clearInterval(timer); if (hideRef.current) clearTimeout(hideRef.current); if (completeRef.current) clearTimeout(completeRef.current) }
    }, [duration, ms, onComplete])

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div ref={ref} data-slot="scifi-loading-screen"
            className={cn('fixed inset-0 z-[9999] flex flex-col items-center justify-center')} style={{ backgroundColor: '#050510' }}
            exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
            {/* Scanline */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accentColor}26 2px, ${accentColor}26 4px)` }} />
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: `linear-gradient(${accentColor}1A 1px, transparent 1px), linear-gradient(90deg, ${accentColor}1A 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <DataStream lines={streamLines} accentColor={accentColor} />

            {/* Radial glow */}
            <div className="absolute rounded-full" style={{ width: 300, height: 300, background: `radial-gradient(circle, ${accentColor}14 0%, transparent 70%)` }} />

            {/* HUD corners */}
            <div className="absolute top-8 left-8"><div className="w-12 h-[1px]" style={{ backgroundColor: accentColor, opacity: 0.5 }} /><div className="w-[1px] h-12" style={{ backgroundColor: accentColor, opacity: 0.5 }} /></div>
            <div className="absolute top-8 right-8"><div className="w-12 h-[1px]" style={{ backgroundColor: accentColor, opacity: 0.5 }} /><div className="w-[1px] h-12" style={{ backgroundColor: accentColor, opacity: 0.5 }} /></div>
            <div className="absolute bottom-8 left-8"><div className="w-12 h-[1px] bg-[#ff6b00] opacity-50" /><div className="w-[1px] h-12 bg-[#ff6b00] opacity-50" /></div>
            <div className="absolute bottom-8 right-8"><div className="w-12 h-[1px] bg-[#ff6b00] opacity-50" /><div className="w-[1px] h-12 bg-[#ff6b00] opacity-50" /></div>

            <motion.div className="relative flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
              <HexLoader progress={progress} accentColor={accentColor} />
              <motion.div className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-widest" style={{ color: accentColor, fontFamily: 'var(--font-orbitron, sans-serif)', textShadow: `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}33` }}>{systemName}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent" style={{ to: accentColor } as any} />
                  <span className="text-[10px] tracking-[0.5em] text-[#ff6b00] uppercase" style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}>MONITORING SYSTEM</span>
                  <div className="w-16 h-[1px] bg-gradient-to-l from-transparent" style={{ to: accentColor } as any} />
                </div>
              </motion.div>

              {/* Progress bar */}
              <motion.div className="w-64 sm:w-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <div className="relative w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${accentColor}1A`, border: `1px solid ${accentColor}33` }}>
                  <motion.div className="absolute inset-0 rounded-full"
                    style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}B8)`, boxShadow: `0 0 10px ${accentColor}, 0 0 20px ${accentColor}80`, width: `${progress}%` }}
                    transition={{ duration: 0.1 }} />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[11px] tracking-wider opacity-70" style={{ color: accentColor, fontFamily: 'var(--font-jetbrains, monospace)' }}>{statusText}</span>
                  <span className="text-[11px] tracking-wider text-[#ff6b00] font-bold" style={{ fontFamily: 'var(--font-jetbrains, monospace)' }}>{Math.round(progress)}%</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Side bars */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-20">
              {LEFT_BARS.map((bar, i) => <motion.div key={`l-${i}`} className="h-[2px] rounded-full" style={{ width: bar.w, backgroundColor: bar.c }} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }} />)}
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-20">
              {RIGHT_BARS.map((bar, i) => <motion.div key={`r-${i}`} className="h-[2px] rounded-full" style={{ width: bar.w, backgroundColor: bar.c }} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)
ScifiLoadingScreen.displayName = 'ScifiLoadingScreen'
