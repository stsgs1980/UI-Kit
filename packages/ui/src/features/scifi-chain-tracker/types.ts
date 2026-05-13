// ─── Types ────────────────────────────────────────────────────

/** Event status
 * @example `'active'`
 */
export type DisruptionStatus = 'active' | 'monitoring' | 'resolved'

/** Severity level
 * @example `'critical'`
 */
export type DisruptionSeverity = 'critical' | 'high' | 'medium' | 'low'

/** Trend direction
 * @example `'down'`
 */
export type DisruptionTrend = 'up' | 'down' | 'stable'

/**
 * A KPI item for the summary strip.
 *
 * @example
 * ```tsx
 * const kpi: KpiItem = {
 *   label: 'Lost Volume',
 *   value: '3.85',
 *   unit: 'M units/day',
 *   color: '#ff2244',
 * }
 * ```
 */
export interface KpiItem {
  /** Display label */
  label: string
  /** Primary value */
  value: string
  /** Muted unit text */
  unit: string
  /** Accent colour */
  color: string
}

/**
 * A disruption event displayed in the chain tracker list.
 *
 * @example
 * ```tsx
 * const event: DisruptionEvent = {
 *   id: 'red-sea',
 *   name: 'Red Sea Corridor',
 *   status: 'active',
 *   severity: 'critical',
 *   impact: -2.1,
 *   duration: '4+ months',
 *   trend: 'down',
 *   description: 'Vessels rerouted via Cape of Good Hope.',
 * }
 * ```
 */
export interface DisruptionEvent {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  status: DisruptionStatus
  severity: DisruptionSeverity
  /** Impact magnitude (negative = deficit) */
  impact: number
  /** Human-readable duration */
  duration: string
  trend: DisruptionTrend
  /** Brief description */
  description: string
}
