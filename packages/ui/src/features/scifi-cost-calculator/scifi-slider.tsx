'use client'

import { forwardRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiSliderProps {
  /** Display label */
  label: string
  /** Current value */
  value: number
  /** Minimum value */
  min: number
  /** Maximum value */
  max: number
  /** Step size */
  step: number
  /** Value change callback */
  onChange: (value: number) => void
  /** Formatted display value */
  displayValue: string
  /** Unit suffix */
  displayUnit?: string
  /** Track and thumb color (default "#00e5ff") */
  trackColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiSlider -- animated range slider with glowing track and thumb.
 *
 * @example
 * ```tsx
 * <ScifiSlider label="Volume" value={500} min={100} max={1000} step={10}
 *   onChange={setVal} displayValue="500K" displayUnit="/day" />
 * ```
 */
export const ScifiSlider = forwardRef<HTMLDivElement, ScifiSliderProps>(
  ({ label, value, min, max, step, onChange, displayValue, displayUnit, trackColor = '#00e5ff', className }, ref) => {
    const pct = ((value - min) / (max - min)) * 100

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value)),
      [onChange],
    )

    return (
      <div ref={ref} data-slot="scifi-slider" className={cn('space-y-3', className)}>
        <div className="flex justify-between items-baseline">
          <span className="text-[#7070a0] font-mono text-xs uppercase tracking-wider">{label}</span>
          <span className="font-mono text-sm sm:text-base font-bold" style={{ color: trackColor }}>
            {displayValue}
            {displayUnit && <span className="text-[#7070a0] text-xs ml-1">{displayUnit}</span>}
          </span>
        </div>
        <div className="relative">
          <div className="relative h-2.5 bg-[#1a1a2e] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.2 }}
              style={{
                background: `linear-gradient(to right, ${trackColor}80, ${trackColor})`,
                boxShadow: `0 0 10px ${trackColor}60`,
              }}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            style={{ height: '32px', top: '-8px' }}
            aria-label={label}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 pointer-events-none z-10"
            animate={{ left: `calc(${pct}% - 8px)` }}
            transition={{ duration: 0.2 }}
            style={{
              borderColor: trackColor,
              backgroundColor: '#0a0a1a',
              boxShadow: `0 0 10px ${trackColor}80, 0 0 20px ${trackColor}40`,
            }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[#404060] font-mono text-[10px]">{min.toLocaleString()}</span>
          <span className="text-[#404060] font-mono text-[10px]">{max.toLocaleString()}</span>
        </div>
      </div>
    )
  },
)
ScifiSlider.displayName = 'ScifiSlider'
