/**
 * Types and helpers for the ScifiRiskMatrix feature.
 *
 * @example
 * ```ts
 * const item: RiskItem = {
 *   id: '1', name: 'Supply Disruption',
 *   probability: 'High', impact: 'Critical',
 *   description: 'Major supply chain disruption', color: '#ff2244',
 * }
 * ```
 */

// ─── Types ──────────────────────────────────────────────────

/** A single risk item plotted on the matrix */
export interface RiskItem {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Probability level (must match a value in `probabilities`) */
  probability: string
  /** Impact level (must match a value in `impacts`) */
  impact: string
  /** Short description shown in the details panel */
  description: string
  /** Dot / accent colour */
  color?: string
}

/** Props for the main ScifiRiskMatrix component */
export interface ScifiRiskMatrixProps {
  /** Risk items to plot on the matrix */
  items: RiskItem[]
  /** Probability level labels ordered from high (top) to low (bottom). Default: ['High','Medium','Low'] */
  probabilities?: string[]
  /** Impact level labels ordered from low (left) to high (right). Default: ['Low','Medium','High','Critical'] */
  impacts?: string[]
  /** Primary accent colour. Default: '#00e5ff' */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Helpers ────────────────────────────────────────────────

/** Cell background + border colours based on position in the grid */
export function cellColor(pIdx: number, iIdx: number, totalProb: number, totalImpact: number): { bg: string; border: string } {
  const score = (totalProb - 1 - pIdx) * totalImpact + (iIdx + 1)
  const max = totalProb * totalImpact
  const ratio = score / max
  if (ratio <= 0.25) return { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)' }
  if (ratio <= 0.45) return { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.3)' }
  if (ratio <= 0.65) return { bg: 'rgba(255,107,0,0.15)', border: 'rgba(255,107,0,0.35)' }
  if (ratio <= 0.85) return { bg: 'rgba(255,34,68,0.15)', border: 'rgba(255,34,68,0.35)' }
  return { bg: 'rgba(255,34,68,0.25)', border: 'rgba(255,34,68,0.5)' }
}

/** Probability bar width (percentage) based on level index */
export function probBarWidth(pIdx: number, total: number): number {
  return Math.round(((total - pIdx) / total) * 100)
}

/** Probability bar colour based on index */
export function probBarColor(pIdx: number, total: number): string {
  const ratio = (total - 1 - pIdx) / (total - 1 || 1)
  if (ratio > 0.6) return '#ff2244'
  if (ratio > 0.3) return '#ff6b00'
  return '#00e5ff'
}

/** Short impact label (truncated) */
export function impactShortLabel(impact: string): string {
  return impact.length > 4 ? impact.slice(0, 4).toUpperCase() : impact.toUpperCase()
}

/** Impact badge colour based on index */
export function impactBadgeColor(iIdx: number, total: number): string {
  if (iIdx >= total - 1) return '#ff2244'
  if (iIdx >= total - 2) return '#ff6b00'
  if (iIdx >= 1) return '#eab308'
  return '#22c55e'
}

/** Risk level legend items */
export const RISK_LEVELS = [
  { label: 'Low', color: '#22c55e' },
  { label: 'Moderate', color: '#eab308' },
  { label: 'Medium', color: '#ff6b00' },
  { label: 'High', color: '#ff2244' },
  { label: 'Critical', color: '#ff2244' },
]
