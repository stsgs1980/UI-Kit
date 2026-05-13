// --- Types ---

/** Severity level for country impact */
export type ImpactSeverity = 'critical' | 'high' | 'moderate'

/** A single key metric card */
export interface KeyMetric {
  /** Display label */
  label: string
  /** Numeric value */
  value: number
  /** Unit suffix (e.g. " units") */
  suffix: string
  /** Prefix (e.g. "-") */
  prefix?: string
  /** Decimal places */
  decimals?: number
  /** Description text */
  description: string
  /** Color */
  color: string
  /** Whether the value represents a negative */
  isNegative?: boolean
}

/** A country/region impact entry */
export interface CountryImpact {
  /** Country or region name */
  name: string
  /** Flag or icon emoji */
  flag: string
  /** Reduction amount */
  reduction: number
  /** Reduction percentage */
  percent: number
  /** Severity level */
  severity: ImpactSeverity
}

/** A sector impact entry */
export interface SectorImpact {
  /** Sector name */
  name: string
  /** Icon emoji */
  icon: string
  /** Reduction percentage */
  reduction: number
  /** Accent color */
  color: string
}

/** A data point on the demand curve */
export interface CurvePoint {
  /** X-axis value (e.g. price) */
  x: number
  /** Y-axis value (e.g. demand) */
  y: number
}

// --- Severity Config ---

export const SEVERITY_CONFIG: Record<ImpactSeverity, { color: string; bg: string; border: string; label: string }> = {
  critical: { color: '#ff2244', bg: 'rgba(255,34,68,0.08)', border: 'rgba(255,34,68,0.25)', label: 'CRITICAL' },
  high:     { color: '#ff6b00', bg: 'rgba(255,107,0,0.08)', border: 'rgba(255,107,0,0.25)', label: 'HIGH' },
  moderate: { color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.25)', label: 'MODERATE' },
}
