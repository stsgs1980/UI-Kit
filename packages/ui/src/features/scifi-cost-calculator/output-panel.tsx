'use client'

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { CalculatorOutput, BreakdownItem } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface OutputPanelProps {
  /** Output metric cards */
  outputs: CalculatorOutput[]
  /** Breakdown bar segments */
  breakdown?: BreakdownItem[]
  /** Accent color (default "#00e5ff") */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Metric Card ──────────────────────────────────────────────

function MetricCard({ label, value, color, prefix = '', large = false }: CalculatorOutput) {
  return (
    <div
      className="p-3 rounded-sm"
      style={{ backgroundColor: `${color}08`, border: `1px solid ${color}20` }}
    >
      <div className="text-[#505080] font-mono text-[10px] sm:text-xs uppercase tracking-wider mb-1.5">
        {label}
      </div>
      <div
        className={cn(
          'font-mono font-bold',
          large ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg',
        )}
        style={{ color }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {prefix}{value}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Breakdown Bar ────────────────────────────────────────────

function BreakdownBar({ items }: { items: BreakdownItem[] }) {
  return (
    <div className="space-y-3">
      <span className="text-[#7070a0] font-mono text-xs uppercase tracking-wider block">
        Cost Structure
      </span>
      <div className="relative h-4 bg-[#1a1a2e] rounded-sm overflow-hidden flex">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="h-full relative"
            animate={{ width: `${item.percent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ backgroundColor: item.color }}
          >
            {item.percent > 5 && item.shortLabel && (
              <span className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[9px] font-mono font-bold text-white drop-shadow-sm">
                {item.shortLabel}
              </span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-[#7070a0] font-mono text-[10px]">
              {item.label} {item.percent.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Metric cards and optional cost breakdown bar. @example <OutputPanel outputs={[{ id: '1', label: 'Revenue', value: '$1.2B', color: '#00e5ff' }]} /> */
export const OutputPanel = forwardRef<HTMLDivElement, OutputPanelProps>(
  ({ outputs, breakdown, accentColor = '#00e5ff', className }, ref) => {
    const largeOutput = outputs.find((o) => o.large)
    const gridOutputs = outputs.filter((o) => !o.large)

    return (
      <div ref={ref} data-slot="output-panel" className={cn('space-y-5', className)}>
        {/* Large hero metric */}
        {largeOutput && (
          <div className="text-center py-4">
            <div className="text-[#505080] font-mono text-xs uppercase tracking-wider mb-2">
              {largeOutput.label}
            </div>
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono"
              style={{ color: largeOutput.color, textShadow: `0 0 30px ${largeOutput.color}40` }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={largeOutput.value}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {largeOutput.prefix}{largeOutput.value}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Grid metric cards */}
        {gridOutputs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {gridOutputs.map((output) => (
              <MetricCard key={output.id} {...output} />
            ))}
          </div>
        )}

        {/* Breakdown bar */}
        {breakdown && breakdown.length > 0 && <BreakdownBar items={breakdown} />}
      </div>
    )
  },
)
OutputPanel.displayName = 'OutputPanel'
