'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { ScifiCostCalculatorProps } from './types'
import { ScifiSlider } from './scifi-slider'
import { ScifiSelect } from './scifi-select'
import { OutputPanel } from './output-panel'

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiCostCalculator -- generic interactive cost/revenue calculator with
 * sci-fi themed inputs and output metric cards.
 *
 * Renders a left panel of input controls (sliders, selects, number inputs)
 * and a right panel of output metric cards with optional cost breakdown bar.
 * All labels and data come from props -- fully generic.
 *
 * @example
 * ```tsx
 * <ScifiCostCalculator
 *   title="Revenue Calculator"
 *   subtitle="Adjust inputs to see projected outputs"
 *   inputs={[
 *     { id: 'volume', label: 'Volume', type: 'slider', value: 1000,
 *       min: 100, max: 5000, step: 100, unit: '/day', color: '#00e5ff' },
 *   ]}
 *   outputs={[
 *     { id: 'revenue', label: 'Daily Revenue', value: '$10K',
 *       prefix: '', color: '#00e5ff' },
 *   ]}
 *   onInputChange={(id, val) => console.log(id, val)}
 * />
 * ```
 */
export const ScifiCostCalculator = forwardRef<HTMLDivElement, ScifiCostCalculatorProps>(
  ({ inputs, outputs, breakdown, title, subtitle, onInputChange, accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} data-slot="scifi-cost-calculator" className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16', className)}>
        {/* Header */}
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-white tracking-wider" style={{ textShadow: `0 0 20px ${accentColor}30` }}>
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-[#7070a0] font-mono max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* Background glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none blur-[150px] opacity-10"
          style={{ backgroundColor: accentColor }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Inputs */}
          <div className="lg:col-span-5 space-y-5">
            <div
              className="p-4 sm:p-6 rounded-sm backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(10, 10, 26, 0.8)',
                border: `1px solid rgba(0, 229, 255, 0.2)`,
              }}
            >
              <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                Parameters
              </h3>
              <div className="space-y-6">
                {inputs.map((input) => {
                  if (input.type === 'slider') {
                    return (
                      <ScifiSlider
                        key={input.id}
                        label={input.label}
                        value={input.value as number}
                        min={input.min ?? 0}
                        max={input.max ?? 100}
                        step={input.step ?? 1}
                        onChange={(v) => onInputChange?.(input.id, v)}
                        displayValue={typeof input.value === 'number' ? input.value.toLocaleString() : String(input.value)}
                        displayUnit={input.unit}
                        trackColor={input.color ?? accentColor}
                      />
                    )
                  }
                  if (input.type === 'select') {
                    return (
                      <ScifiSelect
                        key={input.id}
                        label={input.label}
                        value={input.value as string}
                        options={input.options ?? []}
                        onChange={(v) => onInputChange?.(input.id, v)}
                        accentColor={input.color ?? accentColor}
                      />
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>

          {/* Right: Outputs */}
          <div className="lg:col-span-7 space-y-5">
            <div
              className="p-4 sm:p-6 rounded-sm backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(10, 10, 26, 0.8)',
                border: `1px solid rgba(168, 85, 247, 0.2)`,
              }}
            >
              <h3 className="text-xs font-mono uppercase tracking-widest mb-4 text-[#a855f7]">
                Results
              </h3>
              <OutputPanel outputs={outputs} breakdown={breakdown} accentColor={accentColor} />
            </div>
          </div>
        </div>
      </section>
    )
  },
)
ScifiCostCalculator.displayName = 'ScifiCostCalculator'
