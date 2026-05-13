// ─── Types ────────────────────────────────────────────────────

/** Disruption status
 * @example `'active'`
 */
export type DisruptionItemStatus = 'active' | 'watching' | 'resolved'

/** Disruption type
 * @example `'blockade'`
 */
export type DisruptionItemType = 'sanctions' | 'attack' | 'blockade' | 'technical' | 'political' | 'storm'

/**
 * A disruption item for the disruption panel.
 *
 * @example
 * ```tsx
 * const item: DisruptionItem = {
 *   id: 'chokepoint-a',
 *   region: 'Channel Alpha',
 *   detail: 'Congestion reported',
 *   type: 'blockade',
 *   volume: 2.1,
 *   duration: 45,
 *   status: 'active',
 *   impact: 72,
 * }
 * ```
 */
export interface DisruptionItem {
  /** Unique identifier */
  id: string
  /** Region name */
  region: string
  /** Short detail string */
  detail: string
  type: DisruptionItemType
  /** Volume impact */
  volume: number
  /** Duration in days */
  duration: number
  status: DisruptionItemStatus
  /** Impact severity 0–100 */
  impact: number
}
