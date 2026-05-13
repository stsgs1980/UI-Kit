// ─── Types ────────────────────────────────────────────────────

/**
 * A metric card displayed in the transit monitor header.
 *
 * @example
 * ```tsx
 * const metric: MetricCard = {
 *   label: 'Throughput',
 *   value: 5.8,
 *   suffix: '/day',
 *   decimals: 1,
 * }
 * ```
 */
export interface MetricCard {
  /** Display label */
  label: string
  /** Numeric value */
  value: number
  /** Unit suffix */
  suffix?: string
  /** Decimal places. Default: `0` */
  decimals?: number
}

/**
 * A vessel type entry for the legend.
 *
 * @example
 * ```tsx
 * const vt: VesselType = { type: 'Cargo', count: 12, color: '#ff6b00' }
 * ```
 */
export interface VesselType {
  /** Type name */
  type: string
  /** Count */
  count: number
  /** Accent colour */
  color: string
}
