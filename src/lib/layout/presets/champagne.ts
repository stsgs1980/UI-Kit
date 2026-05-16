/**
 * Preset: Champagne — dark premium, gold #C8A97E accent.
 * Playfair Display serif + JetBrains Mono, sharp 2px, weight 300.
 * Best for: SaaS premium, fintech, luxury, editorial.
 */

import { registerPreset } from '../theme-registry'
import type { PresetDefinition } from '../theme-types'

const champagne: PresetDefinition = {
  id: 'champagne',
  label: 'Champagne',
  description: 'Premium gold + Playfair serif',
  mode: 'dark',
  pair: 'champagne-light',
  accent: '#C8A97E',
  bg: '#0B0B0F',
  bestFor: ['saas', 'fintech', 'portfolio', 'landing'],
  mood: ['premium', 'luxury', 'elegant', 'editorial'],
  tokens: {
    bgDeep: '#0B0B0F',
    bgBase: '#111114',
    bgSurface: '#16161A',
    bgElevated: '#1E1E23',

    textPrimary: '#e5e5e5',
    textSecondary: '#d4d4d4',
    textMuted: '#a3a3a3',
    textDim: '#737373',

    focusRing: '#C8A97E',

    borderSubtle: '#404040',
    borderDefault: '#525252',
    borderBright: 'rgba(200,169,126,0.3)',

    accentPrimary: '#C8A97E',
    accentAI: '#9A8468',
    accentGlow: '#C8A97E14',
    accentAIGlow: '#9A846814',

    sidebarBg: '#0F0F13',
    sidebarText: '#e5e5e5',
    sidebarMuted: '#a3a3a3',
    sidebarHover: '#16161A',
    sidebarBorder: 'rgba(200,169,126,0.08)',

    codeBg: '#0F0F13',
    codeText: '#d4d4d4',
    codeMuted: '#a3a3a3',
    codeAccent: '#C8A97E',

    cardBorder: '#404040',
    cardSelected: '#C8A97E',
    cardHover: '#16161A',

    cellBg: '#16161A',
    cellFeaturedBg: '#C8A97E10',
    cellText: '#a3a3a3',
    cellFeaturedText: '#C8A97E',

    textOnAccent: '#0B0B0F',
    bgOnAccent: '#e5e5e5',

    cardShadow: '0 4px 24px rgba(0,0,0,0.12)',

    fontFamilyBody: "'Inter', -apple-system, sans-serif",
    fontFamilyDisplay: "'Playfair Display', Georgia, serif",
    fontFamilyMono: "'JetBrains Mono','SF Mono',monospace",
    fontWeightBody: 300,
    cornerRadius: 2,
  },
}

registerPreset(champagne)

export { champagne }
