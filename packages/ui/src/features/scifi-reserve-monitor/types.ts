// ─── Types for ScifiReserveMonitor ────────────────────────────

export type Trend = 'up' | 'down' | 'stable'

export interface ReserveRegion {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Icon/emoji */
  icon?: string
  /** Current value display string */
  currentValue: string
  /** Capacity fill percentage (0-100) */
  capacityPercent: number
  /** Trend direction */
  trend: Trend
  /** Trend description (e.g. "+4.2% this quarter") */
  trendValue: string
  /** Mini sparkline data points */
  sparkline: number[]
  /** Color accent (default "#00e5ff") */
  accentColor?: string
  /** Unit label */
  unit?: string
}

export interface SummaryStat {
  /** Label */
  label: string
  /** Numeric value */
  value: number
  /** Suffix text */
  suffix: string
  /** Optional prefix (e.g. "~") */
  prefix?: string
  /** Decimal places (default 0) */
  decimals?: number
  /** Description */
  description: string
  /** Color accent */
  color: string
}

export interface ScifiReserveMonitorProps {
  /** Storage region cards */
  regions: ReserveRegion[]
  /** Summary stat cards */
  summaryStats: SummaryStat[]
  /** Global fill level (0-100). Default: average of regions. */
  globalFill?: number
  /** Accent color (default "#00e5ff") */
  accentColor?: string
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

export const TREND_CONFIG: Record<Trend, { label: string; color: string; bg: string }> = {
  up: { label: '▲', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  down: { label: '▼', color: '#ff2244', bg: 'rgba(255,34,68,0.1)' },
  stable: { label: '●', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
}
