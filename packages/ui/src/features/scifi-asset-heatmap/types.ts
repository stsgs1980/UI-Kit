/**
 * Types and colour helpers for the ScifiAssetHeatmap feature.
 *
 * @example
 * ```ts
 * const data: HeatmapData = {
 *   assets: [{ label: 'Alpha' }, { label: 'Beta' }],
 *   matrix: [[1, 0.5], [0.5, 1]],
 *   sectors: [{ label: 'Tech', value: 8.2 }],
 * }
 * ```
 */

// ─── Types ──────────────────────────────────────────────────

/** Row / column asset header */
export interface Asset {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Short label for tight layouts */
  shortLabel?: string
}

/** A sector performance entry */
export interface Sector {
  /** Sector label */
  label: string
  /** Percentage change (positive or negative) */
  value: number
}

/** Complete heatmap payload */
export interface ScifiAssetHeatmapProps {
  /** Ordered list of row / column headers */
  assets: Asset[]
  /** Square NxN correlation matrix in [-1, 1] */
  matrix: number[][]
  /** Sector performance bars */
  sectors?: Sector[]
  /** Primary accent colour. Default: '#00e5ff' */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Colour helpers ─────────────────────────────────────────

/** Cell fill colour based on correlation value */
export function getCorrelationColor(val: number): string {
  if (val > 0.7) return 'rgba(220, 38, 38, 0.75)'
  if (val > 0.3) return 'rgba(248, 113, 113, 0.55)'
  if (val > -0.3) return 'rgba(100, 100, 130, 0.35)'
  if (val > -0.7) return 'rgba(96, 165, 250, 0.55)'
  return 'rgba(37, 99, 235, 0.75)'
}

/** Cell border colour based on correlation value */
export function getCorrelationBorder(val: number): string {
  if (val > 0.7) return 'rgba(220, 38, 38, 0.9)'
  if (val > 0.3) return 'rgba(248, 113, 113, 0.7)'
  if (val > -0.3) return 'rgba(100, 100, 130, 0.4)'
  if (val > -0.7) return 'rgba(96, 165, 250, 0.7)'
  return 'rgba(37, 99, 235, 0.9)'
}

/** Human-readable interpretation of a correlation value */
export function getInterpretation(val: number, a: string, b: string): string {
  if (val > 0.8) return `Strong positive correlation: ${a} and ${b} move nearly in sync`
  if (val > 0.5) return `Moderate positive correlation: ${a} and ${b} often move together`
  if (val > 0.3) return `Weak positive correlation: ${a} and ${b} have a slight co-movement`
  if (val > -0.3) return `No significant correlation between ${a} and ${b}`
  if (val > -0.5) return `Weak negative correlation: ${a} and ${b} have a slight inverse tendency`
  if (val > -0.8) return `Moderate negative correlation: ${a} and ${b} often move in opposite directions`
  return `Strong negative correlation: ${a} and ${b} move nearly in anti-phase`
}
