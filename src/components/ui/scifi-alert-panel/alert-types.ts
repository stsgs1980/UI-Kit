// ─── Types ────────────────────────────────────────────────────

/** Alert category discriminator */
export type AlertCategoryType = 'price' | 'geopolitical' | 'market' | 'logistics'

/** Severity level for alerts */
export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical'

/** A single alert item */
export interface AlertItem {
  /** Unique identifier */
  id: number | string
  /** Alert display name */
  title: string
  /** Description of the alert condition */
  description: string
  /** Current monitored value */
  currentValue: string
  /** Trigger threshold */
  threshold: string
  /** Severity level */
  severity: SeverityLevel
  /** Category grouping */
  category: AlertCategoryType
  /** Whether the alert starts active */
  active?: boolean
}

/** Category display configuration */
export interface AlertCategoryConfig {
  name: string
  color: string
  icon?: React.ReactNode
}

// ─── Severity Config ──────────────────────────────────────────

export const SEVERITY_CONFIG: Record<SeverityLevel, { color: string; bg: string; border: string }> = {
  Low:      { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.3)' },
  Medium:   { color: '#eab308', bg: 'rgba(234,179,8,0.1)',   border: 'rgba(234,179,8,0.3)' },
  High:     { color: '#ff6b00', bg: 'rgba(255,107,0,0.1)',   border: 'rgba(255,107,0,0.3)' },
  Critical: { color: '#ff2244', bg: 'rgba(255,34,68,0.1)',    border: 'rgba(255,34,68,0.3)' },
}

/** Default category configurations */
export const DEFAULT_CATEGORY_CONFIG: Record<AlertCategoryType, AlertCategoryConfig> = {
  price:         { name: 'Price Alerts',       color: '#00e5ff' },
  geopolitical:  { name: 'Geopolitical Alerts', color: '#ff2244' },
  market:        { name: 'Market Alerts',       color: '#a855f7' },
  logistics:     { name: 'Logistics Alerts',    color: '#ff6b00' },
}

// ─── Helpers ──────────────────────────────────────────────────

/** Get all severity levels in order */
export const SEVERITY_ORDER: SeverityLevel[] = ['Critical', 'High', 'Medium', 'Low']

/** Build initial active-state map from alerts */
export function buildActiveState(alerts: AlertItem[]): Record<string, boolean> {
  const map: Record<string, boolean> = {}
  for (const a of alerts) map[String(a.id)] = a.active ?? false
  return map
}
