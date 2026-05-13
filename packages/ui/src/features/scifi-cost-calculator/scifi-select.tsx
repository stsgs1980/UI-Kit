'use client'

import { forwardRef } from 'react'
import { cn } from '../../tokens/cn'
import type { SelectOption } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiSelectProps {
  /** Display label */
  label: string
  /** Available options */
  options: SelectOption[]
  /** Currently selected value */
  value: string
  /** Change callback */
  onChange: (value: string) => void
  /** Accent color (default "#00e5ff") */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiSelect -- themed dropdown select with color indicator.
 *
 * @example
 * ```tsx
 * <ScifiSelect label="Category" value="a"
 *   options={[{ value: 'a', label: 'Alpha', color: '#00e5ff' }]}
 *   onChange={setVal} />
 * ```
 */
export const ScifiSelect = forwardRef<HTMLDivElement, ScifiSelectProps>(
  ({ label, options, value, onChange, accentColor = '#00e5ff', className }, ref) => {
    const selected = options.find((o) => o.value === value)

    return (
      <div ref={ref} data-slot="scifi-select" className={cn('space-y-2', className)}>
        <span className="text-[#7070a0] font-mono text-xs uppercase tracking-wider block">{label}</span>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none bg-[#0d0d20] border border-[#2a2a4a] rounded-sm px-4 py-3 pr-10 font-mono text-sm text-white cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{
              borderColor: `rgba(${accentColor === '#00e5ff' ? '0,229,255' : '42,42,74'}, 1)`,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='${encodeURIComponent(accentColor)}' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0d0d20] text-white font-mono">
                {opt.label}{opt.extra ? ` ${opt.extra}` : ''}
              </option>
            ))}
          </select>
          {selected?.color && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full opacity-40 pointer-events-none"
              style={{ backgroundColor: selected.color }}
            />
          )}
        </div>
      </div>
    )
  },
)
ScifiSelect.displayName = 'ScifiSelect'
