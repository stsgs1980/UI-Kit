import type { DemoConfig } from './demo-registry'
import { BROWSING_DEMOS } from './demo-scifi-browsing'
import { DATA_DEMOS } from './demo-scifi-data'
import { MONITORING_DEMOS } from './demo-scifi-monitoring'
import { OPERATIONS_DEMOS } from './demo-scifi-operations'

// ─── Second batch of complex scifi components ───────────────

export const EXTENDED_DEMOS_B: Record<string, DemoConfig> = {
  ...BROWSING_DEMOS,
  ...DATA_DEMOS,
  ...MONITORING_DEMOS,
  ...OPERATIONS_DEMOS,
}
