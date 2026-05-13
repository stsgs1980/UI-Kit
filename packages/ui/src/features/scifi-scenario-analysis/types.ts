// ─── Scenario Analysis Types & Helpers ─────────────────────────

/** Severity level for a scenario. */
export type ScenarioSeverity = 'low' | 'medium' | 'high' | 'critical'

/** A single scenario card entry. */
export interface Scenario {
  id: string
  name: string
  probability: number
  impact: string
  description: string
  color?: string
  severity: ScenarioSeverity
}

/** A timeline event for the sidebar. */
export interface TimelineEvent {
  year: string
  event: string
}

/** An influence factor with impact percentage. */
export interface InfluenceFactor {
  name: string
  impact: number
  color?: string
}

// ─── Severity Config ──────────────────────────────────────────

export const SEVERITY_CONFIG: Record<ScenarioSeverity, { label: string; color: string; bg: string }> = {
  low: { label: 'LOW', color: '#00e5ff', bg: 'rgba(0,229,255,0.1)' },
  medium: { label: 'MEDIUM', color: '#ff6b00', bg: 'rgba(255,107,0,0.1)' },
  high: { label: 'HIGH', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
  critical: { label: 'CRITICAL', color: '#ff2244', bg: 'rgba(255,34,68,0.15)' },
}

/** Returns the appropriate HUD card accent color preset name for a severity. */
export function severityToAccent(severity: ScenarioSeverity): string {
  if (severity === 'critical') return 'cyan'
  if (severity === 'high') return 'purple'
  if (severity === 'medium') return 'orange'
  return 'cyan'
}
