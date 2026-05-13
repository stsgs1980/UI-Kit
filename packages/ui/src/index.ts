// @stsgs/ui — Foundation Component Library
// 6 layers, one-directional dependencies

// Layer 1: Tokens
export * from './tokens'

// Layer 2: UI Components (shadcn/ui based)
export * from './ui'

// Layer 3: Sections (compositions)
export * from './sections'

// Layer 4: Features (stateful widgets)
export * from './features'

// Re-export ChartConfig from features (takes precedence over the ui layer one)
export type { ChartConfig } from './features/scifi-chart-grid'

// Layer 5: Hooks (stateful logic)
export * from './hooks'

// Layer 6: Providers (app wrappers)
export * from './providers'
