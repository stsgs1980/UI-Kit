import type { ComponentType } from 'react'
import { EXTENDED_MAP } from './component-map-extended'

// ─── Direct imports via @stsgs/ui alias ────────────────────
// UI primitives
import { CodeBlock } from '@stsgs/ui/ui/code-block/code-block'
import { SliderControl } from '@stsgs/ui/ui/slider-control/slider-control'
import { ColorPickerInput } from '@stsgs/ui/ui/color-picker-input/color-picker-input'
import { CopyButton } from '@stsgs/ui/ui/copy-button/copy-button'

// Sections
import { HeroSection } from '@stsgs/ui/sections/hero-section/hero-section'
import { NavbarSection } from '@stsgs/ui/sections/navbar-section/navbar-section'
import { FooterSection } from '@stsgs/ui/sections/footer-section/footer-section'
import { CTABanner } from '@stsgs/ui/sections/cta-banner/cta-banner'
import { StaggeredHero } from '@stsgs/ui/sections/staggered-hero/staggered-hero'
import { FaqSection } from '@stsgs/ui/sections/faq-section/faq-section'
import { TestimonialsSection } from '@stsgs/ui/sections/testimonials-section/testimonials-section'
import { StatsSection } from '@stsgs/ui/sections/stats-section/stats-section'
import { FeaturesSection } from '@stsgs/ui/sections/features-section/features-section'
import { PricingCards } from '@stsgs/ui/sections/pricing-cards/pricing-cards'
import { ContactSection } from '@stsgs/ui/sections/contact-section/contact-section'
import { LogoCloud } from '@stsgs/ui/sections/logo-cloud/logo-cloud'
import { NewsletterSection } from '@stsgs/ui/sections/newsletter-section/newsletter-section'

// Features
import { IdeLayout } from '@stsgs/ui/features/ide-layout/ide-layout'
import { ResponsiveShowcase } from '@stsgs/ui/features/responsive-showcase/responsive-showcase'
import { ScrollProgressBar } from '@stsgs/ui/features/scroll-progress-bar/scroll-progress-bar'
import { FloatingDecorations } from '@stsgs/ui/features/floating-decorations/floating-decorations'
import { ActivityTimeline } from '@stsgs/ui/features/activity-timeline/activity-timeline'
import { ThemeToggle } from '@stsgs/ui/features/theme-toggle/theme-toggle'
import { CommandPalette } from '@stsgs/ui/features/command-palette/command-palette'
import { BackToTop } from '@stsgs/ui/features/back-to-top/back-to-top'

// Page Compositions (Layer 5)
import { LandingPremium } from '@stsgs/ui/features/landing-premium/landing-premium'

/**
 * Map of component names to their class for sections/features.
 * UI primitives use UI_DEMO_MAP instead.
 */
export const COMPONENT_MAP: Record<string, ComponentType> = {
  ...EXTENDED_MAP,
  // ── UI primitives ──
  'code-block': CodeBlock, 'slider-control': SliderControl,
  'color-picker-input': ColorPickerInput, 'copy-button': CopyButton,
  'hero-section': HeroSection, 'navbar-section': NavbarSection,
  'footer-section': FooterSection, 'cta-banner': CTABanner,
  'staggered-hero': StaggeredHero, 'faq-section': FaqSection,
  'testimonials-section': TestimonialsSection, 'stats-section': StatsSection,
  'features-section': FeaturesSection, 'pricing-cards': PricingCards,
  'contact-section': ContactSection, 'logo-cloud': LogoCloud,
  'newsletter-section': NewsletterSection, 'ide-layout': IdeLayout,
  'responsive-showcase': ResponsiveShowcase, 'scroll-progress-bar': ScrollProgressBar,
  'floating-decorations': FloatingDecorations, 'activity-timeline': ActivityTimeline,
  'theme-toggle': ThemeToggle, 'command-palette': CommandPalette,
  'back-to-top': BackToTop,
  // ── page compositions (Layer 5) ──
  'landing-premium': LandingPremium,
}
