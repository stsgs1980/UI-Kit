'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HudCard } from '../hud-card'
import { getThreatColor, getThreatStatus } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface ThreatGaugeProps {
  /** Current threat level 0-10 */
  value: number
  /** Maximum level (default 10) */
  max?: number
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * ThreatGauge — animated SVG semicircle threat gauge.
 *
 * Renders a half-circle gauge with colored zones, animated needle,
 * tick marks, value display, and status badge.
 *
 * @example
 * ```tsx
 * <ThreatGauge value={7.4} />
 * ```
 */
export function ThreatGauge({ value, max = 10, accentColor = '#00e5ff' }: ThreatGaugeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 2000
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setAnimated((1 - Math.pow(1 - p, 3)) * value)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  const cx = 120, cy = 100, r = 80
  const startAngle = Math.PI, endAngle = 0
  const polar = (a: number, rad: number) => ({ x: cx + rad * Math.cos(a), y: cy - rad * Math.sin(a) })
  const arc = (from: number, to: number, rad: number) => {
    const s = polar(from, rad), e = polar(to, rad)
    return `M ${s.x} ${s.y} A ${rad} ${rad} 0 0 ${from > to ? 1 : 0} ${e.x} ${e.y}`
  }
  const trackPath = arc(endAngle, startAngle, r)
  const needleColor = getThreatColor(animated)
  const needleAngle = startAngle - (animated / max) * Math.PI
  const needleEnd = polar(needleAngle, r - 8)
  const base1 = polar(needleAngle + 0.08, 8)
  const base2 = polar(needleAngle - 0.08, 8)

  const zones = [
    { from: startAngle, to: startAngle - 0.3 * Math.PI, color: '#00e676' },
    { from: startAngle - 0.3 * Math.PI, to: startAngle - 0.5 * Math.PI, color: '#ffcc00' },
    { from: startAngle - 0.5 * Math.PI, to: startAngle - 0.75 * Math.PI, color: '#ff6b00' },
    { from: startAngle - 0.75 * Math.PI, to: endAngle, color: '#ff2244' },
  ]

  const ticks = Array.from({ length: max + 1 }, (_, i) => {
    const a = startAngle - (i / max) * Math.PI
    return { inner: polar(a, r - 10), outer: polar(a, r + 2), pos: polar(a, r + 14), value: i }
  })

  return (
    <HudCard accentColor="orange" title="Threat Level" className="flex flex-col items-center">
      <div ref={ref} className="w-full max-w-[280px] mx-auto">
        <svg viewBox="0 0 240 130" className="w-full" aria-label={`Threat level: ${value} of ${max}`}>
          <defs>
            <filter id="nd-glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="g-glow"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {zones.map((z, i) => (
            <motion.path key={i} d={arc(z.to, z.from, r)} fill="none" stroke={z.color} strokeWidth="12" strokeLinecap="round" opacity={0.15}
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }} />
          ))}
          <motion.path d={trackPath} fill="none" stroke={needleColor} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${(animated / max) * Math.PI * r}`} filter="url(#g-glow)"
            style={{ transition: 'stroke-dasharray 0.3s ease' }} />
          {ticks.map((t, i) => (
            <g key={i}>
              <line x1={t.inner.x} y1={t.inner.y} x2={t.outer.x} y2={t.outer.y} stroke="#5050a0" strokeWidth={i % 5 === 0 ? 2 : 1} />
              {i % 5 === 0 && <text x={t.pos.x} y={t.pos.y} textAnchor="middle" dominantBaseline="middle" fill="#7070a0" fontSize="9" fontFamily="monospace">{t.value}</text>}
            </g>
          ))}
          <polygon points={`${needleEnd.x},${needleEnd.y} ${base1.x},${base1.y} ${base2.x},${base2.y}`}
            fill={needleColor} filter="url(#nd-glow)" style={{ transition: 'all 0.1s ease' }} />
          <circle cx={cx} cy={cy} r="6" fill={needleColor} opacity="0.8" />
          <circle cx={cx} cy={cy} r="3" fill="white" opacity="0.9" />
        </svg>
        <div className="text-center -mt-2">
          <div className="text-4xl sm:text-5xl font-bold font-mono" style={{ color: needleColor, textShadow: `0 0 20px ${needleColor}66` }}>{animated.toFixed(1)}</div>
          <div className="text-xs font-mono text-[#7070a0] uppercase tracking-widest mb-1">of {max}</div>
          <motion.span className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm"
            style={{ color: needleColor, backgroundColor: `${needleColor}18`, border: `1px solid ${needleColor}44` }}
            animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}>{getThreatStatus(animated)}</motion.span>
        </div>
      </div>
    </HudCard>
  )
}
