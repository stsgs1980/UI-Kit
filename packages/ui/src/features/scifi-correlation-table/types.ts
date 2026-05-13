/**
 * Types for the ScifiCorrelationTable feature.
 *
 * @example
 * ```ts
 * const item: CorrelationItem = {
 *   id: 'usd-rub', label: 'USD/RUB', value: '77.4500',
 *   change: -4.26, correlation: -0.85, sparkline: [81.2, 80.5, 79.8],
 * }
 * ```
 */

/** A single row item in the correlation table */
export interface CorrelationItem {
  /** Unique identifier */
  id: string
  /** Display label (primary) */
  label: string
  /** Secondary / short label */
  sublabel?: string
  /** Primary numeric value (formatted string) */
  value: string
  /** Percentage change */
  change?: number
  /** Correlation value in [-1, 1] */
  correlation?: number
  /** Sparkline data points */
  sparkline?: number[]
}

/** Props for the main ScifiCorrelationTable component */
export interface ScifiCorrelationTableProps {
  /** Table rows */
  items: CorrelationItem[]
  /** Primary accent colour. Default: '#00e5ff' */
  accentColor?: string
  /** Secondary accent (for second panel). Default: '#ff6b00' */
  secondaryColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Helpers ────────────────────────────────────────────────

/** Colour for correlation strength */
export function getCorrelationColor(corr: number): string {
  const abs = Math.abs(corr)
  if (abs >= 0.7) return '#00e5ff'
  if (abs >= 0.5) return '#22d3ee'
  if (abs >= 0.3) return '#eab308'
  return '#7070a0'
}

/** Human-readable correlation strength label */
export function getCorrelationStrength(corr: number): string {
  const abs = Math.abs(corr)
  if (abs >= 0.7) return 'Strong'
  if (abs >= 0.5) return 'Moderate'
  if (abs >= 0.3) return 'Fair'
  return 'Weak'
}

/** Format percentage change */
export function formatChange(val: number): string {
  return `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`
}

/** Colour for a change value */
export function getChangeColor(val: number): string {
  if (val > 0) return '#22c55e'
  if (val < 0) return '#ff2244'
  return '#eab308'
}
