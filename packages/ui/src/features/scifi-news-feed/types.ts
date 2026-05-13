// ─── Types ────────────────────────────────────────────────────

/** Severity indicator for news items */
export type NewsSeverity = 'green' | 'yellow' | 'red'

/** A single news feed item */
export interface NewsItem {
  id: number | string
  time: string
  date: string
  category: string
  headline: string
  severity: NewsSeverity
}

/** A trending topic with relevance score */
export interface TrendingTopic {
  label: string
  value: number
}

// ─── Constants ────────────────────────────────────────────────

/** Severity color mapping */
export const SEVERITY_COLORS: Record<NewsSeverity, string> = {
  green: '#22c55e',
  yellow: '#eab308',
  red: '#ff2244',
}

/** Default category color mapping (generic keys) */
export const DEFAULT_CATEGORY_COLORS: Record<string, string> = {
  DEFAULT: '#00e5ff',
}

/** Threat gauge segment definitions */
export const THREAT_SEGMENTS = [
  { label: 'LOW', from: 0, to: 3, color: '#22c55e' },
  { label: 'MODERATE', from: 3, to: 5, color: '#eab308' },
  { label: 'ELEVATED', from: 5, to: 7.5, color: '#ff6b00' },
  { label: 'CRITICAL', from: 7.5, to: 10, color: '#ff2244' },
]

/** Get segment color for a given threat position */
export function getSegmentColor(position: number): string {
  for (const seg of THREAT_SEGMENTS) {
    if (position >= seg.from && position < seg.to) return seg.color
  }
  return THREAT_SEGMENTS[THREAT_SEGMENTS.length - 1].color
}
