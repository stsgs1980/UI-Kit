// ScifiRiskMatrix feature

// ─── Types & Helpers ───────────────────────────────────────
export type {
  RiskItem,
  ScifiRiskMatrixProps,
} from './types'

export {
  cellColor,
  probBarWidth,
  probBarColor,
  impactShortLabel,
  impactBadgeColor,
  RISK_LEVELS,
} from './types'

// ─── Sub-components ────────────────────────────────────────
export { RiskMatrixGrid } from './risk-matrix-grid'
export { RiskMatrixDetails } from './risk-matrix-details'

// ─── Main composite ────────────────────────────────────────
export { ScifiRiskMatrix } from './scifi-risk-matrix'
