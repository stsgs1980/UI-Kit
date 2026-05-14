import type { ReactNode } from 'react'
import { EXTENDED_DEMOS_A } from './demo-registry-extended-a'
import { EXTENDED_DEMOS_B } from './demo-registry-extended-b'

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

// ─── Sections (Layer 3) ────────────────────────────────────

export const DEMO_REGISTRY: Record<string, DemoConfig> = {
  ...EXTENDED_DEMOS_A,
  ...EXTENDED_DEMOS_B,

  // ── sections ──
  'hero-section': {
    props: {
      title: 'Build faster with',
      titleHighlight: '@stsgs/ui',
      subtitle: 'A foundation component library with 51 layout recipes',
      ctaLabel: 'Get Started',
      secondaryCtaLabel: 'Documentation',
      badge: 'v1.0',
      stats: [
        { value: '155', label: 'Components' },
        { value: '51', label: 'Layouts' },
        { value: '5', label: 'Themes' },
      ],
    },
  },

  'navbar-section': {
    props: {
      brand: '@stsgs/ui',
      links: [
        { label: 'Layouts', href: '#' },
        { label: 'Themes', href: '#' },
        { label: 'Components', href: '#' },
      ],
    },
  },

  'footer-section': {
    props: {
      columns: [
        { title: 'Product', links: [{ label: 'Layouts', href: '#' }, { label: 'Themes', href: '#' }] },
        { title: 'Resources', links: [{ label: 'Docs', href: '#' }, { label: 'GitHub', href: '#' }] },
      ],
      copyright: '2026 stsgs',
    },
  },

  'cta-banner': {
    props: {
      title: 'Ready to build?',
      subtitle: 'Start with 155 production-ready components',
      ctaLabel: 'Get Started',
      glow: true,
    },
  },

  'staggered-hero': {
    props: {
      titleParts: ['Describe it.', "We'll", 'layout it.'],
      subtitle: 'AI-powered layout advisor with 51 recipes',
      stats: [
        { value: '51', label: 'Recipes' },
        { value: '6', label: 'Categories' },
      ],
    },
  },

  'faq-section': {
    props: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is @stsgs/ui?', answer: 'A foundation component library with 155 components across 5 layers.' },
        { question: 'How many themes are included?', answer: '5 themes: Champagne, Cyan Night, Zinc, Champagne Light, Cyan Morning.' },
        { question: 'Is it production-ready?', answer: 'All components pass anti-monolith rules and TypeScript strict checks.' },
      ],
    },
  },

  'testimonials-section': {
    props: {
      heading: 'What developers say',
      items: [
        { name: 'Alex K.', role: 'Frontend Lead', text: 'The layout engine saved us weeks of CSS work.', avatar: 'AK' },
        { name: 'Maria S.', role: 'UI Engineer', text: 'Cleanest component API I have ever used.', avatar: 'MS' },
        { name: 'James L.', role: 'Full-stack Dev', text: 'Dual theme system is a game changer.', avatar: 'JL' },
      ],
    },
  },

  'stats-section': {
    props: {
      heading: 'By the numbers',
      items: [
        { value: '155', label: 'Components' },
        { value: '51', label: 'Layouts' },
        { value: '5', label: 'Themes' },
        { value: '6', label: 'Engines' },
      ],
    },
  },

  'features-section': {
    props: {
      heading: 'Why @stsgs/ui',
      subtitle: 'Everything you need to build modern interfaces.',
      items: [
        { title: 'Layout Engine', description: '51 grid recipes with AI scoring' },
        { title: 'Theme Engine', description: '5 presets with dual theme support' },
        { title: 'Anti-Monolith', description: '150-line limit per file' },
      ],
    },
  },

  'pricing-cards': {
    props: {
      heading: 'Pricing',
      tiers: [
        { name: 'Free', price: '$0', period: '/forever', features: ['155 components', '5 themes', 'MIT License'], ctaLabel: 'Download' },
        { name: 'Pro', price: '$29', period: '/month', features: ['Everything in Free', 'Priority support', 'Custom themes'], ctaLabel: 'Subscribe', highlighted: true },
      ],
    },
  },

  'contact-section': {
    props: {
      heading: 'Get in touch',
      subtitle: 'We would love to hear from you.',
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
      ],
      submitLabel: 'Send Message',
    },
  },

  'logo-cloud': {
    props: {
      heading: 'Trusted by',
      items: [
        { alt: 'Vercel', src: 'https://cdn.simpleicons.org/vercel/black' },
        { alt: 'Next.js', src: 'https://cdn.simpleicons.org/nextdotjs/black' },
        { alt: 'Tailwind CSS', src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
        { alt: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript/3178C6' },
        { alt: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB' },
        { alt: 'Prisma', src: 'https://cdn.simpleicons.org/prisma/2D3748' },
      ],
    },
  },

  'newsletter-section': {
    props: {
      heading: 'Stay updated',
      subtitle: 'Get notified about new components and features.',
      submitLabel: 'Subscribe',
      placeholder: 'your@email.com',
    },
  },

  // ── features (Layer 4) ──
  'command-palette': {
    props: {
      open: false,
      onClose: () => {},
      placeholder: 'Type a command...',
    },
  },

  'responsive-showcase': {
    props: {
      showBreakpoints: true,
    },
    children: <div style={{ padding: 24, textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>Preview Area</div>,
  },

  'ide-layout': {
    props: {
      files: [
        { name: 'page.tsx', language: 'tsx', content: 'export default function Home() {\n  return <main>Hello</main>\n}' },
        { name: 'theme.ts', language: 'ts', content: 'export const tokens = {\n  primary: "#10B981"\n}' },
      ],
      terminalLines: ['$ pnpm dev', 'Ready in 1.2s'],
      statusText: 'TypeScript React',
    },
  },

  'theme-toggle': {
    props: {
      mode: 'dark' as const,
      onToggle: () => {},
      showLabel: true,
    },
  },

  'floating-decorations': {
    props: {
      symbols: ['<>', '{}', '//', '()'],
      count: 6,
    },
  },

  'scroll-progress-bar': {
    props: {},
  },

  'activity-timeline': {
    props: {
      entries: [
        { id: 'act-1', description: 'Commit abc123 — Add hero section', kind: 'success' as const, timestamp: new Date() },
        { id: 'act-2', description: 'Review requested — PR #42 needs review', kind: 'info' as const, timestamp: new Date() },
      ],
    },
  },

  // ── page compositions (Layer 5) ──
  'landing-premium': {
    props: {},
  },

  // ── ui primitives that can render standalone ──
  'code-block': {
    props: {
      code: 'const greet = (name: string) => `Hello, ${name}!`',
      language: 'typescript',
      showLineNumbers: true,
    },
  },

  'slider-control': {
    props: {
      label: 'Gap',
      value: 24,
      min: 0,
      max: 48,
      onChange: () => {},
    },
  },

  'color-picker-input': {
    props: {
      label: 'Accent',
      value: '#10B981',
      onChange: () => {},
    },
  },

  'copy-button': {
    props: {
      text: 'npm install @stsgs/ui',
    },
  },
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
