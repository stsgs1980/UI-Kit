'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { AlertItem, SeverityLevel } from './alert-types'
import { SEVERITY_CONFIG } from './alert-types'

// ─── Types ────────────────────────────────────────────────────

export interface AlertRowProps {
  /** The alert to display */
  alert: AlertItem
  /** Whether the alert is currently active */
  active: boolean
  /** Toggle handler */
  onToggle: () => void
  /** Index for staggered animation */
  index: number
  /** Category color string */
  categoryColor: string
}

// ─── Toggle Switch ────────────────────────────────────────────

function ToggleSwitch({ active, onToggle, color }: { active: boolean; onToggle: () => void; color: string }) {
  return (
    <button type="button" onClick={onToggle}
      className="relative w-10 h-5 rounded-full shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
      style={{
        backgroundColor: active ? `${color}20` : 'rgba(30,30,50,0.8)',
        border: `1px solid ${active ? color : 'rgba(80,80,120,0.3)'}`,
        boxShadow: active ? `0 0 8px ${color}30` : 'none',
      }}
      aria-label={active ? 'Deactivate alert' : 'Activate alert'} aria-pressed={active}>
      <motion.div className="absolute top-[2px] w-[14px] h-[14px] rounded-full"
        animate={{ left: active ? 22 : 2, backgroundColor: active ? color : '#505080' }}
        transition={{ duration: 0.3, ease: 'easeOut' }} />
    </button>
  )
}

// ─── Component ────────────────────────────────────────────────

/**
 * AlertRow — single alert row with toggle, severity badge, and description.
 *
 * Renders an expandable row showing the alert name, severity, current value,
 * threshold, and optional description when active.
 *
 * @example
 * ```tsx
 * <AlertRow alert={item} active={true} onToggle={fn} index={0} categoryColor="#00e5ff" />
 * ```
 */
export function AlertRow({ alert, active, onToggle, index, categoryColor }: AlertRowProps) {
  const sevConfig = SEVERITY_CONFIG[alert.severity]

  return (
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-3 rounded-sm border transition-all duration-300"
      style={{
        backgroundColor: active ? `${categoryColor}05` : 'rgba(10,10,25,0.3)',
        borderColor: active ? `${categoryColor}20` : 'rgba(60,60,90,0.15)',
      }}>
      {/* Top row */}
      <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'animate-pulse' : ''}`}
          style={{ backgroundColor: active ? categoryColor : '#505080', boxShadow: active ? `0 0 6px ${categoryColor}` : 'none' }} />
        <span className="font-mono text-xs sm:text-sm font-medium truncate flex-1 min-w-0"
          style={{ color: active ? '#e0e0f0' : '#7070a0' }}>{alert.title}</span>
        <span className="px-1.5 py-0.5 rounded-sm text-[9px] sm:text-[10px] font-mono uppercase tracking-wider shrink-0 hidden sm:inline-block"
          style={{ color: sevConfig.color, backgroundColor: sevConfig.bg, border: `1px solid ${sevConfig.border}` }}>{alert.severity}</span>
        <ToggleSwitch active={active} onToggle={onToggle} color={categoryColor} />
      </div>

      {/* Bottom row */}
      <div className="flex items-center gap-3 sm:gap-4 pl-4">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] sm:text-[10px] text-[#505080] uppercase tracking-wider">Cur:</span>
          <span className="font-mono text-xs sm:text-sm" style={{ color: active ? categoryColor : '#505080' }}>{alert.currentValue}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] sm:text-[10px] text-[#505080] uppercase tracking-wider">Thresh:</span>
          <span className="font-mono text-xs sm:text-sm text-[#7070a0]">{alert.threshold}</span>
        </div>
        <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-mono uppercase tracking-wider sm:hidden shrink-0"
          style={{ color: sevConfig.color, backgroundColor: sevConfig.bg, border: `1px solid ${sevConfig.border}` }}>{alert.severity}</span>
      </div>

      {/* Description */}
      <AnimatePresence>
        {active && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="pl-4 mt-1.5 overflow-hidden">
            <span className="font-mono text-[10px] text-[#505080] leading-relaxed">{alert.description}</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${categoryColor}40, transparent)` }} />
    </motion.div>
  )
}
