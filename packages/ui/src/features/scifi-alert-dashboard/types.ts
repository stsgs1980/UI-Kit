// ─── Types ────────────────────────────────────────────────────

/** Severity level for dashboard alerts */
export type DashboardSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

/** Category type for dashboard alerts */
export type DashboardCategory = string

/** A single dashboard alert entry */
export interface DashboardAlert {
  id: number | string
  severity: DashboardSeverity
  category: DashboardCategory
  title: string
  description: string
  source: string
  timestamp: string
}

/** Statistics data for the summary panel */
export interface AlertStats {
  total: number
  critical: number
  high: number
  medium: number
  low: number
  avgResponse: number
  escalationRate: number
}

// ─── Severity Config ──────────────────────────────────────────

export const DASHBOARD_SEVERITY_CONFIG: Record<DashboardSeverity, { color: string; bg: string; border: string; glow: string }> = {
  CRITICAL: { color: '#ff2244', bg: 'rgba(255,34,68,0.1)',   border: 'rgba(255,34,68,0.4)',   glow: 'rgba(255,34,68,0.3)' },
  HIGH:     { color: '#ff6b00', bg: 'rgba(255,107,0,0.1)',  border: 'rgba(255,107,0,0.4)',   glow: 'rgba(255,107,0,0.3)' },
  MEDIUM:   { color: '#ffcc00', bg: 'rgba(255,204,0,0.1)',  border: 'rgba(255,204,0,0.4)',   glow: 'rgba(255,204,0,0.3)' },
  LOW:      { color: '#00e676', bg: 'rgba(0,230,118,0.1)',   border: 'rgba(0,230,118,0.4)',   glow: 'rgba(0,230,118,0.3)' },
}

/** Helper: get color for a value on the 0-10 threat scale */
export function getThreatColor(val: number): string {
  if (val <= 3) return '#00e676'
  if (val <= 5) return '#ffcc00'
  if (val <= 7.5) return '#ff6b00'
  return '#ff2244'
}

/** Helper: get status text for a threat value */
export function getThreatStatus(val: number): string {
  if (val <= 3) return 'LOW'
  if (val <= 5) return 'MEDIUM'
  if (val <= 7.5) return 'HIGH'
  return 'CRITICAL'
}
