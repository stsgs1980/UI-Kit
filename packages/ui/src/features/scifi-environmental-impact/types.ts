// --- Types ---

/** Severity level for environmental conditions */
export type ConditionSeverity = 'safe' | 'moderate' | 'danger' | 'critical'

/** A single environmental condition metric */
export interface ConditionMetric {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Current value (formatted string) */
  value: string
  /** Trend indicator text */
  trend: string
  /** Color for the trend text */
  trendColor: string
  /** Icon name (thermometer | wind | wave | eye | lightning | custom) */
  icon: string
}

/** A single forecast data point */
export interface ForecastData {
  /** Day label (e.g. "Mon") */
  day: string
  /** Numeric height/value for the bar */
  height: number
}

/** An impact item displayed in the impact panel */
export interface ImpactItem {
  /** Display label */
  label: string
  /** Numeric value (formatted string) */
  value: string
  /** Color for the value */
  color: string
}

// --- Helpers ---

/** Get bar color based on condition height */
export function getBarColor(height: number): string {
  if (height < 2) return '#22c55e'
  if (height < 3) return '#eab308'
  if (height < 4) return '#ff6b00'
  return '#ff2244'
}

/** Get bar glow color based on condition height */
export function getBarGlow(height: number): string {
  if (height < 2) return 'rgba(34,197,94,0.4)'
  if (height < 3) return 'rgba(234,179,8,0.4)'
  if (height < 4) return 'rgba(255,107,0,0.4)'
  return 'rgba(255,34,68,0.4)'
}

/** Get gauge color for a storm risk percentage */
export function getGaugeColor(percent: number): string {
  if (percent < 30) return '#22c55e'
  if (percent < 60) return '#eab308'
  return '#ff2244'
}

/** Get status text for a storm risk percentage */
export function getRiskStatus(percent: number): string {
  if (percent < 30) return 'LOW'
  if (percent < 60) return 'MODERATE'
  return 'HIGH'
}
