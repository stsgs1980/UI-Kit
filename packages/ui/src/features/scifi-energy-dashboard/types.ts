// --- Types ---

/** Trend direction */
export type TrendDirection = 'up' | 'down' | 'stable'

/** A producer/resource entry */
export interface ProducerData {
  /** Producer name */
  name: string
  /** Production value */
  production: number
  /** Trend direction */
  trend: TrendDirection
  /** Change text (e.g. "+0.3%") */
  change?: string
  /** Note text */
  note?: string
}

/** A utilization entry */
export interface UtilizationData {
  /** Region/segment name */
  name: string
  /** Utilization percentage (0-100) */
  utilization: number
  /** Trend direction */
  trend: TrendDirection
  /** Note text */
  note?: string
}

/** A stat item for the bottom strip */
export interface StatItem {
  /** Label */
  label: string
  /** Display value */
  value: string
  /** Accent color */
  color?: string
}

// --- Helpers ---

/** Get trend color */
export function getTrendColor(trend: TrendDirection): string {
  if (trend === 'up') return '#00e5ff'
  if (trend === 'down') return '#ff6b00'
  return '#a855f7'
}
