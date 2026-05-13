// ScifiCorrelationTable feature

// ─── Types & Helpers ───────────────────────────────────────
export type {
  CorrelationItem,
  ScifiCorrelationTableProps,
} from './types'

export {
  getCorrelationColor,
  getCorrelationStrength,
  formatChange,
  getChangeColor,
} from './types'

// ─── Sub-components ────────────────────────────────────────
export { SparklineMini } from './sparkline-mini'
export { CorrelationRow } from './correlation-row'

// ─── Main composite ────────────────────────────────────────
export { ScifiCorrelationTable } from './scifi-correlation-table'
