// ─── Types ────────────────────────────────────────────────────

/** Regional status
 * @example `'growing'`
 */
export type AssetRegionStatus = 'growing' | 'declining' | 'stable'

/**
 * A regional breakdown entry for the asset tracker.
 *
 * @example
 * ```tsx
 * const region: AssetRegion = {
 *   name: 'Gulf Region',
 *   count: 189,
 *   change: -4,
 *   status: 'declining',
 *   sparkline: [197, 195, 193, 191, 189],
 * }
 * ```
 */
export interface AssetRegion {
  /** Region name */
  name: string
  /** Asset count */
  count: number
  /** Change delta */
  change: number
  /** Status trend */
  status: AssetRegionStatus
  /** Optional sparkline data */
  sparkline?: number[]
}
