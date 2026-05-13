// ScifiPulseMeter feature

// ─── Types & Helpers ───────────────────────────────────────
export type {
  SectorData,
  SentimentData,
  SentimentType,
  ScifiPulseMeterProps,
} from './types'

export {
  getScoreColor,
  getScoreLabel,
} from './types'

// ─── Sub-components ────────────────────────────────────────
export { PulseRing } from './pulse-ring'
export { PulseSectorBars } from './sector-bars'

// ─── Main composite ────────────────────────────────────────
export { ScifiPulseMeter } from './scifi-pulse-meter'
