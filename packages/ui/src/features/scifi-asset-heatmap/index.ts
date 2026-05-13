// ScifiAssetHeatmap feature

// ─── Types & Helpers ───────────────────────────────────────
export type {
  Asset,
  Sector,
  ScifiAssetHeatmapProps,
} from './types'

export {
  getCorrelationColor,
  getCorrelationBorder,
  getInterpretation,
} from './types'

// ─── Sub-components ────────────────────────────────────────
export { CorrelationGrid } from './correlation-grid'
export { SectorBars } from './sector-bars'

// ─── Main composite ────────────────────────────────────────
export { ScifiAssetHeatmap } from './scifi-asset-heatmap'
