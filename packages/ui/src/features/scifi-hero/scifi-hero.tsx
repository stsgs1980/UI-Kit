'use client'

import { forwardRef, useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { FloatingParticles, type FloatingParticlesProps } from './floating-particles'
import { RadarAnimation } from './radar-animation'
import { DEFAULT_SEEDS } from './floating-particles'

// ─── Types ────────────────────────────────────────────────────

/** Single metric displayed in the hero bar */
export interface HeroMetric {
  /** Primary display value */
  label: string
  /** Secondary descriptive text */
  value: string
  /** Optional change indicator */
  change?: string
  /** Optional prefix icon text */
  prefix?: string
}

export interface ScifiHeroProps {
  /** Dashboard title rendered in the HUD header */
  title?: string
  /** Subtitle text (supports typing effect externally) */
  subtitle?: string
  /** Key metrics displayed as cards in the bottom bar */
  metrics?: HeroMetric[]
  /** Accent color (default '#00e5ff') */
  accentColor?: string
  /** Optional children rendered below metrics */
  children?: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

/** Full-screen sci-fi monitoring dashboard hero with grid, particles, radar, and metrics.
 * @example ```tsx
 * <ScifiHero title="SYSTEM MONITOR" metrics={[{ label: 'STATUS', value: 'ONLINE' }]} />
 * ``` */
export const ScifiHero = forwardRef<HTMLElement, ScifiHeroProps>(
  ({ title, subtitle, metrics, accentColor = '#00e5ff', children, className }, ref) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const heroRef = useRef<HTMLElement>(null)

    useEffect(() => {
      const el = heroRef.current
      if (!el) return
      const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
      el.addEventListener('mousemove', handler)
      return () => el.removeEventListener('mousemove', handler)
    }, [])

    const gridCols = useMemo(() => Array.from({ length: 20 }, (_, i) => (
        <motion.div key={`col-${i}`} className="absolute top-0 bottom-0 w-[1px]"
          style={{ left: `${(i / 20) * 100}%`, background: `linear-gradient(180deg, transparent, ${accentColor} 50%, transparent)` }}
          initial={{ opacity: 0 }} animate={{ opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }} />
      )), [accentColor])

    const gridRows = useMemo(() => Array.from({ length: 12 }, (_, i) => (
        <motion.div key={`row-${i}`} className="absolute left-0 right-0 h-[1px]"
          style={{ top: `${(i / 12) * 100}%`, background: `linear-gradient(90deg, transparent, ${accentColor} 50%, transparent)` }}
          initial={{ opacity: 0 }} animate={{ opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }} />
      )), [accentColor])

    return (
      <section ref={(ref as React.RefObject<HTMLElement>) ?? heroRef}
        data-slot="scifi-hero"
        className={cn('relative min-h-screen flex items-center justify-center overflow-hidden', className)}>
        <div className="absolute inset-0">{gridCols}{gridRows}</div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,229,255,0.06), transparent 40%)` }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${accentColor}08 0%, transparent 70%)` }} />
        <FloatingParticles seeds={DEFAULT_SEEDS} color={accentColor} />
        <RadarAnimation accentColor={accentColor} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40 50%, transparent)` }}
            animate={{ top: ['-5%', '105%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {title && <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border"
              style={{ borderColor: `${accentColor}33`, backgroundColor: `${accentColor}08` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              <span className="font-mono text-xs sm:text-sm tracking-wider uppercase" style={{ color: accentColor }}>{title}</span>
            </div>
          </motion.div>}

          {subtitle && (
            <p className="font-mono text-sm sm:text-base md:text-lg text-[#9090c0] max-w-3xl mx-auto leading-relaxed mb-10 min-h-[3rem]">{subtitle}</p>
          )}

          {metrics && metrics.length > 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {metrics.map((item, i) => (
              <div key={i} className="px-3 py-3 sm:px-4 sm:py-4 border rounded-sm backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(10,10,30,0.6)', borderColor: `${accentColor}33` }}>
                <div className="font-mono text-lg sm:text-xl font-bold" style={{ color: accentColor }}>{item.prefix}{item.label}</div>
                <div className="font-mono text-[10px] sm:text-xs text-[#7070a0] mt-1">{item.value}{item.change && ` · ${item.change}`}</div>
              </div>
            ))}
          </motion.div>}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.5 }} className="mt-16 sm:mt-20">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-[#7070a0] tracking-widest uppercase">Scroll down</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-[#00e5ff] to-transparent" />
            </motion.div>
          </motion.div>

          {children}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)` }} />
      </section>
    )
  },
)
ScifiHero.displayName = 'ScifiHero'
