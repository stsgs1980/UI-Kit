// ─── Calendar Event Types & Helpers ────────────────────────────

/** Importance level of a calendar event. */
export type EventImportance = 'critical' | 'high' | 'medium' | 'low'

/** Event category used for color-coding. */
export type EventCategory = 'primary' | 'data' | 'external' | 'market'

/** A single event entry in the calendar timeline. */
export interface CalendarEvent {
  id: string
  title: string
  date: string
  description: string
  category: EventCategory
  importance: EventImportance
}

// ─── Style Maps ───────────────────────────────────────────────

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  primary: '#00e5ff',
  data: '#a855f7',
  external: '#ff2244',
  market: '#ff6b00',
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  primary: 'PRIMARY',
  data: 'DATA',
  external: 'EXTERNAL',
  market: 'MARKET',
}

export const IMPORTANCE_CONFIG: Record<EventImportance, { color: string; pulse: boolean; label: string }> = {
  critical: { color: '#ff2244', pulse: true, label: 'Critical' },
  high: { color: '#ff6b00', pulse: false, label: 'High' },
  medium: { color: '#00e5ff', pulse: false, label: 'Medium' },
  low: { color: '#00e5ff', pulse: false, label: 'Low' },
}
