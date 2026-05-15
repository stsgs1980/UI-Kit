import type { DemoConfig } from './demo-registry-types'

// ─── Zero-config components (render with no props) ─────────
// ─── Simple-props components (1-2 values) ──────────────────
// ─── Complex scifi components ──────────────────────────────

import { EXTENDED_DEMOS_A_DATA } from './demo-registry-extended-a-data'
import { EXTENDED_DEMOS_A_DATA_B } from './demo-registry-extended-a-data-b'

export const EXTENDED_DEMOS_A: Record<string, DemoConfig> = {
  ...EXTENDED_DEMOS_A_DATA,
  ...EXTENDED_DEMOS_A_DATA_B,
}
