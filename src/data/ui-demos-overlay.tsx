import type { ReactNode } from 'react'
import { UI_DEMOS_OVERLAY_A } from './ui-demos-overlay-a'
import { UI_DEMOS_OVERLAY_B } from './ui-demos-overlay-b'

export const UI_DEMOS_OVERLAY: Record<string, () => ReactNode> = {
  ...UI_DEMOS_OVERLAY_A,
  ...UI_DEMOS_OVERLAY_B,
}
