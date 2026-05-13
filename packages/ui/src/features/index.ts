// Layer 4: Features
// Complex interactive widgets with internal state.
// Has state and hooks, but self-contained. Data comes via props.

// ─── Original ────────────────────────────────────────────────
export { IdeLayout } from './ide-layout'
export type { IdeLayoutProps, IdeFile, IdeTheme } from './ide-layout'

export { ResponsiveShowcase } from './responsive-showcase'
export type { ResponsiveShowcaseProps } from './responsive-showcase'

export { CommandPalette } from './command-palette'
export type { CommandPaletteProps } from './command-palette'

export { ThemeToggle } from './theme-toggle'
export type { ThemeToggleProps } from './theme-toggle'

export { SearchPanel } from './search-panel'
export type { SearchPanelProps } from './search-panel'

// ─── Extracted from Code-Realm ───────────────────────────────
export { FloatingDecorations } from './floating-decorations'
export type { FloatingDecorationsProps, FloatingSymbol } from './floating-decorations'

// ─── Extracted from Component-Browser ────────────────────────
export { ActivityTimeline } from './activity-timeline'
export type { ActivityTimelineProps, ActivityEntry, ActivityKind } from './activity-timeline'

// ─── Before/after comparison slider ─────────────────────────
export { CompareSlider } from './compare-slider'
export type { CompareSliderProps } from './compare-slider'

export { useCompareSlider } from './compare-slider'
export type { UseCompareSliderOptions, UseCompareSliderReturn } from './compare-slider'

// ─── Scroll progress ─────────────────────────────────────────
export { ScrollProgressBar } from './scroll-progress-bar'
export type { ScrollProgressBarProps } from './scroll-progress-bar'

// ─── Tier 1: Ormuz-monitor Sci-Fi Primitives ─────────────────
export { HudCard } from './hud-card'
export type { HudCardProps } from './hud-card'

export { ScifiSectionHeader } from './scifi-section-header'
export type { ScifiSectionHeaderProps } from './scifi-section-header'

export { AnimatedCounter } from './animated-counter'
export type { AnimatedCounterProps } from './animated-counter'

export { MiniSparkline } from './mini-sparkline'
export type { MiniSparklineProps } from './mini-sparkline'

export { TypingEffect } from './typing-effect'
export type { TypingEffectProps } from './typing-effect'

export { ScifiScrollProgress } from './scifi-scroll-progress'
export type { ScifiScrollProgressProps } from './scifi-scroll-progress'

export { BackToTop } from './back-to-top'
export type { BackToTopProps } from './back-to-top'
