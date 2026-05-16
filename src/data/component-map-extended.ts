import type { ComponentType } from 'react'

// ─── Features ───────────────────────────────────────────────
import { AnimatedCounter } from '@stsgs/ui/features/animated-counter/animated-counter'
import { CompareSlider } from '@stsgs/ui/features/compare-slider/compare-slider'
import { HudCard } from '@stsgs/ui/features/hud-card/hud-card'
import { MiniSparkline } from '@stsgs/ui/features/mini-sparkline/mini-sparkline'
import { SearchPanel } from '@stsgs/ui/features/search-panel/search-panel'
import { TypingEffect } from '@stsgs/ui/features/typing-effect/typing-effect'

// ─── Sections ──────────────────────────────────────────────
import { ThreeColumnBrowser } from '@stsgs/ui/sections/three-column-browser/three-column-browser'
import { FourColumnBrowser } from '@stsgs/ui/sections/four-column-browser/four-column-browser'

// ─── Extended Map ──────────────────────────────────────────

/** All components added in the extended registry pass. */
export const EXTENDED_MAP: Record<string, ComponentType> = {
  // Features
  'animated-counter': AnimatedCounter, 'compare-slider': CompareSlider,
  'hud-card': HudCard, 'mini-sparkline': MiniSparkline,
  'search-panel': SearchPanel, 'typing-effect': TypingEffect,
  // Sections
  'three-column-browser': ThreeColumnBrowser, 'four-column-browser': FourColumnBrowser,
}
