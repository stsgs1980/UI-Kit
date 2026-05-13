// ─── Types ────────────────────────────────────────────────────

/** Vessel status
 * @example `'transit'`
 */
export type VesselStatus = 'transit' | 'anchored' | 'diverted'

/** Security zone threat level
 * @example `'high'`
 */
export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical'

/**
 * A vessel entry for the fleet monitor table.
 *
 * @example
 * ```tsx
 * const vessel: Vessel = {
 *   id: 'v1',
 *   name: 'Pacific Voyager',
 *   type: 'VLCC',
 *   status: 'transit',
 *   cargo: 'Crude Oil',
 *   eta: '~2h 15m',
 * }
 * ```
 */
export interface Vessel {
  /** Unique identifier */
  id: string
  /** Vessel name */
  name: string
  /** Vessel type/class */
  type: string
  status: VesselStatus
  /** Cargo description */
  cargo: string
  /** Estimated time of arrival */
  eta?: string
}

/**
 * A security zone for the threat map.
 *
 * @example
 * ```tsx
 * const zone: SecurityZone = {
 *   name: 'North Approach',
 *   threat: 'medium',
 *   description: 'Moderate risk area.',
 * }
 * ```
 */
export interface SecurityZone {
  /** Zone name */
  name: string
  threat: ThreatLevel
  /** Brief description */
  description: string
}
