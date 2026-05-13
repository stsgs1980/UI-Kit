// ScifiSentimentGauge feature

// ─── Types & Helpers ───────────────────────────────────────
export type {
  SentimentIndicator,
  ScifiSentimentGaugeProps,
} from './types'

export { getSentimentLabel } from './types'

// ─── Sub-components ────────────────────────────────────────
export { MainGauge } from './main-gauge'
export { MiniGaugeCard } from './mini-gauge'
export { TrendChart } from './trend-chart'

// ─── Main composite ────────────────────────────────────────
export { ScifiSentimentGauge } from './scifi-sentiment-gauge'
