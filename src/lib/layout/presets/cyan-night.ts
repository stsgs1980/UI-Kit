/**
 * Preset: Cyan Night — dark, #00E5FF cyan accent.
 * Inter + JetBrains Mono, sharp 2px, weight 400.
 * Best for: tech, developer tools, dashboards, documentation.
 */

import { registerPreset } from '../theme-registry'
import type { PresetDefinition } from '../theme-types'

const cyanNight: PresetDefinition = {
  id: 'cyan-night',
  label: 'Cyan Night',
  description: '#00E5FF cyan + sharp edges',
  mode: 'dark',
  pair: 'cyan-morning',
  accent: '#00E5FF',
  bg: '#080810',
  bestFor: ['dashboard-app', 'documentation', 'analytics', 'saas'],
  mood: ['tech', 'futuristic', 'sharp', 'developer'],
  tokens: {
    bgDeep: '#080810',
    bgBase: '#0C0F1A',
    bgSurface: '#161B2E',
    bgElevated: '#1E2540',

    textPrimary: '#e5e5e5',
    textSecondary: '#d4d4d4',
    textMuted: '#a3a3a3',
    textDim: '#737373',

    focusRing: '#00E5FF',

    borderSubtle: '#404040',
    borderDefault: '#525252',
    borderBright: '#a3a3a3',

    accentPrimary: '#00E5FF',
    accentAI: '#FF6D00',
    accentGlow: '#00E5FF14',
    accentAIGlow: '#FF6D0014',

    sidebarBg: '#0C0F1A',
    sidebarText: '#e5e5e5',
    sidebarMuted: '#a3a3a3',
    sidebarHover: '#161B2E',
    sidebarBorder: 'rgba(0,229,255,0.1)',

    codeBg: '#0C0F1A',
    codeText: '#d4d4d4',
    codeMuted: '#a3a3a3',
    codeAccent: '#00E5FF',

    cardBorder: '#525252',
    cardSelected: '#00E5FF',
    cardHover: '#161B2E',

    cellBg: '#161B2E80',
    cellFeaturedBg: '#00E5FF12',
    cellText: '#737373',
    cellFeaturedText: '#00E5FF',

    textOnAccent: '#080810',
    bgOnAccent: '#e5e5e5',

    cardShadow: '0 4px 24px rgba(0,229,255,0.06)',

    fontFamilyBody: "'Inter', -apple-system, sans-serif",
    fontFamilyDisplay: "'Inter', -apple-system, sans-serif",
    fontFamilyMono: "'JetBrains Mono','Fira Code',monospace",
    fontWeightBody: 400,
    cornerRadius: 2,
  },
}

registerPreset(cyanNight)

export { cyanNight }
