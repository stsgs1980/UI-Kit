'use client'

import * as React from 'react'
import { cn } from '../../tokens/cn'

export interface ColorPickerInputProps {
  /** Hex color value, e.g. "#C8A97E" */
  value: string
  /** Called with the new hex string when the user picks or types a color */
  onChange: (value: string) => void
  /** Optional label rendered above the control */
  label?: string
  className?: string
}

const HEX_RE = /^#[0-9A-Fa-f]{6}$/

export const ColorPickerInput = React.forwardRef<HTMLDivElement, ColorPickerInputProps>(
  ({ value, onChange, label, className }, ref) => {
    const [draft, setDraft] = React.useState(value)
    const prevValid = React.useRef(value)

    // Sync draft when external value changes
    React.useEffect(() => {
      setDraft(value)
      prevValid.current = value
    }, [value])

    const handleSwatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value.toUpperCase()
      prevValid.current = next
      setDraft(next)
      onChange(next)
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraft(e.target.value)
    }

    const handleBlur = () => {
      const normalized = draft.startsWith('#') ? draft : `#${draft}`
      if (HEX_RE.test(normalized)) {
        const hex = normalized.toUpperCase()
        prevValid.current = hex
        setDraft(hex)
        onChange(hex)
      } else {
        // Reset to previous valid value
        setDraft(prevValid.current)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.currentTarget.blur()
      }
    }

    return (
      <div ref={ref} data-slot="color-picker-input" className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs transition-colors focus-within:border-ring focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
          <input
            type="color"
            value={value}
            onChange={handleSwatchChange}
            aria-label={label ?? 'Color swatch'}
            className="h-8 w-8 cursor-pointer rounded-full border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-moz-color-swatch]:rounded-full border-0"
          />
          <input
            type="text"
            value={draft}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-label={label ?? 'Hex color value'}
            className="min-w-[5.5rem] bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
    )
  },
)
ColorPickerInput.displayName = 'ColorPickerInput'
