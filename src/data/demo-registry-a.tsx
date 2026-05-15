import type { DemoConfig } from './demo-registry-types'

// ─── Sections (Layer 3) ────────────────────────────────────

export const DEMO_REGISTRY_A: Record<string, DemoConfig> = {
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
}
