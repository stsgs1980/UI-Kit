// ScifiTensionIndex feature

// ─── Types & Helpers ───────────────────────────────────────
export type {
  RegionData,
  DriverData,
  ScifiTensionIndexProps,
} from './types'

export {
  getTensionColor,
  getTensionLabel,
  regionColor,
} from './types'

// ─── Sub-components ────────────────────────────────────────
export { TensionGauge } from './tension-gauge'
export { TensionSparkline } from './tension-sparkline'
export { RegionRow } from './region-row'
export { DriverRow } from './driver-row'

// ─── Main composite ────────────────────────────────────────
export { ScifiTensionIndex } from './scifi-tension-index'
