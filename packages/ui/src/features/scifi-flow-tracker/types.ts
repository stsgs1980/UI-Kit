// ─── Types ────────────────────────────────────────────────────

/**
 * A regional price entry for the flow tracker.
 *
 * @example
 * ```tsx
 * const price: PriceRegion = { region: 'NE Asia', price: 14.20, change: +2.3 }
 * ```
 */
export interface PriceRegion {
  region: string
  price: number
  change: number
}

/**
 * A storage level entry.
 *
 * @example
 * ```tsx
 * const storage: StorageLevel = { region: 'Europe', level: 56.2, avg5y: 62, status: 'warning', color: '#ff6b00' }
 * ```
 */
export interface StorageLevel {
  region: string
  level: number
  avg5y: number
  status: 'warning' | 'normal' | 'good'
  color: string
}

/**
 * A pipeline flow entry.
 *
 * @example
 * ```tsx
 * const flow: PipelineFlow = { route: 'A → B', volume: 85, maxVolume: 200, direction: 'increase', status: 'fact' }
 * ```
 */
export interface PipelineFlow {
  route: string
  volume: number
  maxVolume: number
  direction: 'increase' | 'decrease' | 'stable'
  status: 'plan' | 'fact'
  warning?: string
}

/**
 * A trade entry (exporter or importer).
 *
 * @example
 * ```tsx
 * const trade: TradeEntry = { name: 'Region A', volume: 89, yoy: +8.2 }
 * ```
 */
export interface TradeEntry {
  name: string
  volume: number
  yoy: number
}
