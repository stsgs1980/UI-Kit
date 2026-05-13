'use client'

import { forwardRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { FactorConfig, FactorValues, ScenarioPreset } from './types'
import { getFactorColor } from './types'

// ─── Factor Slider (internal) ─────────────────────────────────

function FactorSlider({ config, value, onChange }: { config: FactorConfig; value: number; onChange: (key: string, value: number) => void }) {
  const min = config.min ?? 0
  const max = config.max ?? 100
  const pct = ((value - min) / (max - min)) * 100
  const color = getFactorColor(value, config.inverse)
  const effective = config.inverse ? (100 - value) : value

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-[#7070a0] font-mono text-[11px] uppercase tracking-wider">{config.shortLabel}</span>
        <span className="font-mono text-xs font-bold" style={{ color }}>{Math.round(effective * config.weight * 100) / 100}</span>
      </div>
      <div className="relative">
        <div className="relative h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 rounded-full" animate={{ width: `${pct}%` }} transition={{ duration: 0.2 }}
            style={{ background: `linear-gradient(to right, ${color}80, ${color})`, boxShadow: `0 0 6px ${color}40` }} />
        </div>
        <input type="range" min={min} max={max} step={1} value={value}
          onChange={(e) => onChange(config.key, Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer" style={{ height: '28px', top: '-6px' }} aria-label={config.label} />
        <motion.div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 pointer-events-none z-10"
          animate={{ left: `calc(${pct}% - 7px)` }} transition={{ duration: 0.2 }}
          style={{ borderColor: color, backgroundColor: '#0a0a1a', boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  )
}

// ─── Score Display ─────────────────────────────────────────────

interface ScoreDisplayProps { composite: number; factors: FactorConfig[]; values: FactorValues; accentColor: string }

export function ScoreDisplay({ composite, factors, values, accentColor }: ScoreDisplayProps) {
  const scoreColor = composite <= 25 ? '#00e5ff' : composite <= 50 ? '#22d3ee' : composite <= 75 ? '#ff6b00' : '#ff2244'

  return (
    <div className="p-4 sm:p-6 rounded-sm backdrop-blur-sm" style={{ backgroundColor: 'rgba(10, 10, 26, 0.8)', border: `1px solid ${accentColor}20` }}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <motion.div className="text-4xl sm:text-5xl font-bold font-mono" style={{ color: scoreColor }} key={scoreColor}>
          {composite.toFixed(1)}
        </motion.div>
        <span className="text-[#505080] font-mono text-xs">out of 100 · {factors.length} factors</span>
      </div>
      <div className="p-3 rounded-sm" style={{ backgroundColor: 'rgba(20,20,40,0.6)' }}>
        <div className="text-[#505080] font-mono text-[10px] uppercase tracking-widest mb-2">Index Structure</div>
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          {factors.map((f) => {
            const val = values[f.key] ?? 0
            const eff = f.inverse ? (100 - val) : val
            const c = getFactorColor(val, f.inverse)
            return (
              <motion.div key={f.key} className="h-full rounded-sm"
                animate={{ width: `${Math.max(2, (eff * f.weight / 25) * 100)}%`, backgroundColor: c }}
                transition={{ duration: 0.3 }} title={`${f.label}: ${(eff * f.weight).toFixed(1)}`} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Factor Controls ──────────────────────────────────────────

export interface FactorControlsProps {
  factors: FactorConfig[]
  values: FactorValues
  presets?: ScenarioPreset[]
  onValueChange: (key: string, value: number) => void
  onPreset: (values: FactorValues) => void
  accentColor: string
  className?: string
}

export const FactorControls = forwardRef<HTMLDivElement, FactorControlsProps>(
  ({ factors, values, presets, onValueChange, onPreset, accentColor, className }, ref) => {
    const handleChange = useCallback((key: string, value: number) => onValueChange(key, value), [onValueChange])
    const handlePreset = useCallback((pv: FactorValues) => onPreset(pv), [onPreset])

    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        <div className="p-4 sm:p-6 rounded-sm backdrop-blur-sm" style={{ backgroundColor: 'rgba(10, 10, 26, 0.8)', border: `1px solid ${accentColor}20` }}>
          <h3 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: accentColor }}>Factor Controls</h3>
          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {factors.map((config) => (
              <FactorSlider key={config.key} config={config} value={values[config.key] ?? config.defaultValue} onChange={handleChange} />
            ))}
          </div>
        </div>
        {presets && presets.length > 0 && (
          <div className="p-4 sm:p-6 rounded-sm backdrop-blur-sm" style={{ backgroundColor: 'rgba(10, 10, 26, 0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-[#505080] font-mono text-[10px] uppercase tracking-widest mb-3">Quick Presets</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presets.map((preset) => (
                <motion.button key={preset.label} onClick={() => handlePreset(preset.values)}
                  className="relative p-3 rounded-sm font-mono text-xs text-left transition-all duration-200 cursor-pointer"
                  style={{ backgroundColor: `${preset.color}08`, border: `1px solid ${preset.color}30`, color: preset.color }}
                  whileHover={{ scale: 1.02, backgroundColor: `${preset.color}15` }} whileTap={{ scale: 0.98 }}>
                  {preset.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
)
FactorControls.displayName = 'FactorControls'
