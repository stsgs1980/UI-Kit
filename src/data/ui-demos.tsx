'use client'

import type { ReactNode } from 'react'
import { UI_DEMOS_DISPLAY_A } from './ui-demos-display-a'
import { UI_DEMOS_DISPLAY_B } from './ui-demos-display-b'
import { UI_DEMOS_FORM_A } from './ui-demos-form-a'
import { UI_DEMOS_FORM_B } from './ui-demos-form-b'
import { UI_DEMOS_OVERLAY } from './ui-demos-overlay'
import { UI_DEMOS_NAV } from './ui-demos-nav'
import { UI_DEMOS_LAYOUT } from './ui-demos-layout'
import { UI_DEMOS_COMPLEX } from './ui-demos-complex'

/**
 * Combined map: componentName -> demo renderer.
 * Used by ComponentPreview to render live UI primitives.
 */
export const UI_DEMO_MAP: Record<string, () => ReactNode> = {
  ...UI_DEMOS_DISPLAY_A,
  ...UI_DEMOS_DISPLAY_B,
  ...UI_DEMOS_FORM_A,
  ...UI_DEMOS_FORM_B,
  ...UI_DEMOS_OVERLAY,
  ...UI_DEMOS_NAV,
  ...UI_DEMOS_LAYOUT,
  ...UI_DEMOS_COMPLEX,
}
