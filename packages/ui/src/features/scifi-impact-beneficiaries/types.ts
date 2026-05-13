// ─── Impact Beneficiaries Types & Helpers ──────────────────────

/** Beneficiary category type. */
export type BeneficiaryCategory = 'producer' | 'alternative' | 'financial' | 'other'

/** A single beneficiary entry. */
export interface Beneficiary {
  id: string
  name: string
  category: BeneficiaryCategory
  benefit: string
  gain: number
  description: string
  icon?: string
}

/** Summary stat displayed above the grid. */
export interface SummaryStat {
  label: string
  value: number
  suffix?: string
  prefix?: string
  color?: string
}

/** Category style configuration. */
export interface CategoryStyle {
  label: string
  color: string
  bg: string
  border: string
}

/** Analysis column for the bottom panel. */
export interface AnalysisColumn {
  title: string
  color: string
  text: string
}

// ─── Category Config ──────────────────────────────────────────

export const CATEGORY_STYLES: Record<BeneficiaryCategory, CategoryStyle> = {
  producer: { label: 'PRODUCER', color: '#00e5ff', bg: 'rgba(0,229,255,0.1)', border: 'rgba(0,229,255,0.2)' },
  alternative: { label: 'ALTERNATIVE', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.2)' },
  financial: { label: 'FINANCIAL', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)' },
  other: { label: 'OTHER', color: '#ff6b00', bg: 'rgba(255,107,0,0.1)', border: 'rgba(255,107,0,0.2)' },
}
