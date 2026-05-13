// ─── Transit Overview Types ────────────────────────────────────

/** A key-value stat row displayed in the main stats card. */
export interface TransitStat {
  label: string
  value: string
  color?: string
}

/** An exporter / entity row with icon and value. */
export interface ExporterData {
  id: string
  name: string
  value: string
  icon?: string
}

/** A gauge meter for dependency visualization. */
export interface DependencyGauge {
  label: string
  percentage: number
  color?: string
}

/** A risk level indicator. */
export interface RiskLevel {
  label: string
  description: string
  color?: string
  badge?: string
}
