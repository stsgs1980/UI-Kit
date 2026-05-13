// ─── Types ────────────────────────────────────────────────────

/** Supported chart types */
export type ChartType = 'line' | 'bar' | 'area'

/** A single data point */
export interface DataPoint {
  /** X-axis label (time, category, etc.) */
  label: string
  /** Numeric Y-axis value */
  value: number
}

/** Configuration for a single chart in the grid */
export interface ChartConfig {
  /** Unique identifier */
  id: string | number
  /** Chart title */
  title: string
  /** Chart type */
  type: ChartType
  /** Data points to render */
  data: DataPoint[]
  /** Accent color override (default from parent) */
  color?: string
  /** Optional secondary label / subtitle */
  subtitle?: string
  /** Optional current value display */
  currentValue?: string
  /** Optional change percentage text */
  changeText?: string
  /** Whether change is positive (green) */
  changePositive?: boolean
}
