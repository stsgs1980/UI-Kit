import type { DemoConfig } from './demo-registry-types'
export type { DemoConfig } from './demo-registry-types'

import { EXTENDED_DEMOS_A } from './demo-registry-extended-a'
import { EXTENDED_DEMOS_B } from './demo-registry-extended-b'
import { DEMO_REGISTRY_A } from './demo-registry-a'
import { DEMO_REGISTRY_B } from './demo-registry-b'

/**
 * Demo registry — provides preview props for each renderable component.
 * Components not listed here show a metadata-only card.
 *
 * Each entry maps componentName -> { props, children? }
 * - props: passed directly to the component
 * - children: ReactNode for components that accept children
 */

export const DEMO_REGISTRY: Record<string, DemoConfig> = {
  ...EXTENDED_DEMOS_A,
  ...EXTENDED_DEMOS_B,
  ...DEMO_REGISTRY_A,
  ...DEMO_REGISTRY_B,
}

// ─── Helper ────────────────────────────────────────────────

/** Check if a component has demo config */
export function hasDemo(componentName: string): boolean {
  return componentName in DEMO_REGISTRY
}

/** Get demo config for a component */
export function getDemo(componentName: string): DemoConfig | undefined {
  return DEMO_REGISTRY[componentName]
}
