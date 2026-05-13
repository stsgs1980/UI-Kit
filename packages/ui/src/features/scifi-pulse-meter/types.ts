/**
 * Types for the ScifiPulseMeter feature.
 *
 * @example
 * ```ts
 * const data = {
 *   score: 72,
 *   sectors: [{ label: 'Energy', value: 3.2, key: 'en' }],
 *   sentiments: [{ label: 'Fear/Greed', value: 68, tag: 'Greed', color: '#22c55e', type: 'gauge' }],
 * }
 * ```
 */

/** A single sector data entry */
export interface SectorData {
  /** Sector label */
  label: string
  /** Percentage change */
  value: number
  /** Unique key for React keys */
  key?: string
}

/** Sentiment indicator display type */
export type SentimentType = 'gauge' | 'number' | 'bar'

/** A single sentiment indicator */
export interface SentimentData {
  /** Indicator label */
  label: string
  /** Numeric value (0-100 for gauge/bar, any for number) */
  value: number | string
  /** Short tag shown as badge */
  tag: string
  /** Accent colour */
  color?: string
  /** Visual display type */
  type?: SentimentType
}

/** Props for the main ScifiPulseMeter component */
export interface ScifiPulseMeterProps {
  /** Overall pulse score (0-100) */
  score: number
  /** Sector performance data */
  sectors: SectorData[]
  /** Sentiment indicators */
  sentiments: SentimentData[]
  /** Primary accent colour. Default: '#00e5ff' */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

/** Score colour based on 0-100 value */
export function getScoreColor(score: number): string {
  if (score < 30) return '#ff2244'
  if (score < 50) return '#f97316'
  if (score < 70) return '#eab308'
  return '#00e5ff'
}

/** Score label based on 0-100 value */
export function getScoreLabel(score: number): string {
  if (score < 30) return 'Extreme'
  if (score < 50) return 'Caution'
  if (score < 70) return 'Neutral'
  return 'Optimistic'
}
