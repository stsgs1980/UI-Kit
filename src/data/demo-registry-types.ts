import type { ReactNode } from 'react'

/**
 * Demo registry — provides preview props for each renderable component.
 * Components not listed here show a metadata-only card.
 *
 * Each entry maps componentName -> { props, children? }
 * - props: passed directly to the component
 * - children: ReactNode for components that accept children
 */

export interface DemoConfig {
  props: Record<string, unknown>
  children?: ReactNode
  /** If the component needs a wrapper with specific styling */
  wrapperStyle?: Record<string, string>
}
