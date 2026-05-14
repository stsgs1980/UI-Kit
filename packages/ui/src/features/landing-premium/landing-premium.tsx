'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../tokens/cn'
import { NavbarSection } from '../../sections/navbar-section/navbar-section'
import { HeroSection } from '../../sections/hero-section/hero-section'
import { FeaturesSection } from '../../sections/features-section/features-section'
import { PricingCards } from '../../sections/pricing-cards/pricing-cards'
import { CTABanner } from '../../sections/cta-banner/cta-banner'
import { FooterSection } from '../../sections/footer-section/footer-section'

export interface LandingPremiumProps extends HTMLAttributes<HTMLDivElement> {
  /** Brand name shown in navbar and footer */
  brandName?: string
  /** Override hero title */
  title?: string
  /** Override hero highlighted text */
  titleHighlight?: string
  /** Override hero subtitle */
  subtitle?: string
}

/**
 * LandingPremium — Full landing page composition from sections.
 * Layer 5: Page-level composition. Theme applied externally via CSS variables.
 *
 * @example
 * ```tsx
 * import { LandingPremium } from '@stsgs/ui/features/landing-premium'
 *
 * // Wrap with a theme provider to apply colors:
 * <ProjectThemeProvider preset="champagne-light">
 *   <LandingPremium brandName="MyApp" />
 * </ProjectThemeProvider>
 * ```
 */
export const LandingPremium = forwardRef<HTMLDivElement, LandingPremiumProps>(
  ({ brandName = 'Champagne', title, titleHighlight, subtitle, className, ...props }, ref) => (
    <div ref={ref} className={cn('min-h-screen bg-background text-foreground', className)} {...props}>

      <NavbarSection
        brandName={brandName}
        links={[
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'About', href: '#about' },
        ]}
        sticky
      />

      <HeroSection
        title={title ?? 'Build premium experiences'}
        titleHighlight={titleHighlight ?? brandName}
        subtitle={subtitle ?? 'Elegant components, gold-standard design'}
        stats={[
          { value: '155', label: 'Components' },
          { value: '51', label: 'Layouts' },
          { value: '5', label: 'Themes' },
        ]}
      />

      <FeaturesSection
        heading="Why @stsgs/ui"
        items={[
          { title: 'Design Tokens', description: '50+ CSS variables per preset for pixel-perfect theming' },
          { title: 'Theme Engine', description: '5 curated presets with open registry and dark/light pairs' },
          { title: 'Sections', description: '15 composable page sections, ready to assemble' },
        ]}
      />

      <PricingCards
        heading="Pricing"
        tiers={[
          { name: 'Starter', price: '$0', period: '/forever', features: ['155 components', '5 themes', 'MIT License'], ctaLabel: 'Download' },
          { name: 'Pro', price: '$29', period: '/month', features: ['Everything in Free', 'Priority support', 'Custom themes'], ctaLabel: 'Subscribe', highlighted: true },
        ]}
      />

      <CTABanner
        title="Ready to build?"
        subtitle="Start with 155 production-ready components"
        ctaLabel="Get Started"
      />

      <FooterSection
        columns={[
          { title: 'Product', links: [{ label: 'Layouts', href: '#' }, { label: 'Themes', href: '#' }, { label: 'Components', href: '#' }] },
          { title: 'Resources', links: [{ label: 'Docs', href: '#' }, { label: 'GitHub', href: '#' }] },
        ]}
        copyright="2026 stsgs"
      />

    </div>
  )
)
LandingPremium.displayName = 'LandingPremium'
