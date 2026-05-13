/**
 * Types and helpers for the ScifiSentimentGauge feature.
 *
 * @example
 * ```ts
 * const indicator: SentimentIndicator = {
 *   id: 'investor', name: 'Investor Sentiment',
 *   value: 68, change: 4.2, color: '#00e5ff',
 * }
 * ```
 */

import type { ReactNode } from 'react'

/** A single sentiment sub-indicator */
export interface SentimentIndicator {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** 0-100 value */
  value: number
  /** Percentage change (positive or negative) */
  change: number
  /** Optional icon (ReactNode) */
  icon?: ReactNode
  /** Accent colour */
  color?: string
}

/** Props for the main ScifiSentimentGauge component */
export interface ScifiSentimentGaugeProps {
  /** Overall sentiment score (0-100) */
  score: number
  /** Sub-indicators displayed as mini gauge cards */
  indicators: SentimentIndicator[]
  /** Historical sparkline data points (0-100 range) */
  sparklineData?: number[]
  /** Fear/Greed value (0-100) */
  fearGreedValue?: number
  /** Primary accent colour. Default: '#00e5ff' */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

/** Returns sentiment label and colour for a 0-100 score */
export function getSentimentLabel(score: number): { text: string; color: string } {
  if (score >= 80) return { text: 'Extreme Greed', color: '#22c55e' }
  if (score >= 60) return { text: 'Greed', color: '#84cc16' }
  if (score >= 40) return { text: 'Neutral', color: '#eab308' }
  if (score >= 20) return { text: 'Fear', color: '#f97316' }
  return { text: 'Extreme Fear', color: '#ff2244' }
}
