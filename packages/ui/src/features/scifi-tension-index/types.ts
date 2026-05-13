/**
 * Types for the ScifiTensionIndex feature.
 *
 * @example
 * ```ts
 * const region: RegionData = { name: 'Region A', score: 82, color: '#ff2244' }
 * const driver: DriverData = { name: 'Factor X', impact: 92, color: '#ff2244' }
 * ```
 */

/** A region with a tension score */
export interface RegionData {
  /** Region name */
  name: string
  /** Tension score (0-100) */
  score: number
  /** Accent colour */
  color?: string
}

/** A tension driver / contributing factor */
export interface DriverData {
  /** Driver name */
  name: string
  /** Impact weight (0-100) */
  impact: number
  /** Accent colour */
  color?: string
}

/** Props for the main ScifiTensionIndex component */
export interface ScifiTensionIndexProps {
  /** Overall tension score (0-100) */
  score: number
  /** Regional breakdown */
  regions: RegionData[]
  /** Key drivers */
  drivers: DriverData[]
  /** Historical trend data points (0-100 range) */
  trendData?: number[]
  /** Primary accent colour. Default: '#00e5ff' */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

/** Score colour based on 0-100 tension level */
export function getTensionColor(score: number): string {
  if (score >= 75) return '#ff2244'
  if (score >= 50) return '#ff6b00'
  if (score >= 30) return '#eab308'
  return '#22c55e'
}

/** Score label based on 0-100 tension level */
export function getTensionLabel(score: number): string {
  if (score >= 75) return 'CRITICAL'
  if (score >= 50) return 'ELEVATED'
  if (score >= 30) return 'MODERATE'
  return 'LOW'
}

/** Auto-assign colour to a region based on its score */
export function regionColor(score: number): string {
  if (score >= 75) return '#ff2244'
  if (score >= 50) return '#ff6b00'
  if (score >= 30) return '#eab308'
  return '#00e5ff'
}
