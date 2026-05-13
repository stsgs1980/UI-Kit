// ─── Types for ScifiCostCalculator ──────────────────────────────

export interface CalculatorInput {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Input type */
  type: 'slider' | 'select' | 'number'
  /** Current value */
  value: number | string
  /** Display unit (e.g. "units/day") */
  unit?: string
  /** Slider/number: minimum value */
  min?: number
  /** Slider/number: maximum value */
  max?: number
  /** Slider/number: step size */
  step?: number
  /** Select: list of options */
  options?: SelectOption[]
  /** Color accent for this input */
  color?: string
}

export interface SelectOption {
  /** Option value */
  value: string
  /** Option label */
  label: string
  /** Secondary text shown next to label */
  extra?: string
  /** Color indicator dot */
  color?: string
}

export interface BreakdownItem {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Percentage of total (0-100) */
  percent: number
  /** Bar color */
  color: string
  /** Short label for inside the bar when wide enough */
  shortLabel?: string
}

export interface CalculatorOutput {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Formatted value string */
  value: string
  /** Prefix (e.g. "$") */
  prefix?: string
  /** Color accent */
  color: string
  /** Change indicator number (positive/negative) */
  change?: number
  /** Large display variant */
  large?: boolean
}

export interface ScifiCostCalculatorProps {
  /** Calculator input controls */
  inputs: CalculatorInput[]
  /** Calculator output metrics */
  outputs: CalculatorOutput[]
  /** Cost breakdown segments */
  breakdown?: BreakdownItem[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Callback when any input changes */
  onInputChange?: (id: string, value: number | string) => void
  /** Accent color (default "#00e5ff") */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}
