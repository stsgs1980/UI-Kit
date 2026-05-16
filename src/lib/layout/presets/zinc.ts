/**
 * Preset: Zinc — dark, #10B981 emerald accent.
 * Inter + SF Mono, rounded 12px, weight 400.
 * Best for: admin, enterprise, CRM, neutral tools.
 */

import { registerPreset } from '../theme-registry'
import type { PresetDefinition } from '../theme-types'

const zinc: PresetDefinition = {
  id: 'zinc',
  label: 'Zinc',
  description: 'Monochrome + emerald + amber',
  mode: 'dark',
  accent: '#10B981',
  bg: '#0A0A0F',
  bestFor: ['crm', 'admin-panel', 'application', 'analytics'],
  mood: ['minimal', 'neutral', 'professional', 'enterprise'],
  tokens: {
    bgDeep: '#0A0A0F',
    bgBase: '#111114',
    bgSurface: '#16161A',
    bgElevated: '#1E1E23',

    textPrimary: '#e5e5e5',
    textSecondary: '#d4d4d4',
    textMuted: '#a3a3a3',
    textDim: '#737373',

    focusRing: '#34d399',

    borderSubtle: '#404040',
    borderDefault: '#525252',
    borderBright: '#a3a3a3',

    accentPrimary: '#10b981',
    accentAI: '#f59e0b',
    accentGlow: '#10b98114',
    accentAIGlow: '#f59e0b14',

    sidebarBg: '#1E293B',
    sidebarText: '#e5e5e5',
    sidebarMuted: '#a3a3a3',
    sidebarHover: '#334155',
    sidebarBorder: 'rgba(255,255,255,0.08)',

    codeBg: '#0F172A',
    codeText: '#d4d4d4',
    codeMuted: '#a3a3a3',
    codeAccent: '#60A5FA',

    cardBorder: '#27272a',
    cardSelected: '#10b981',
    cardHover: '#27272a',

    cellBg: '#27272a80',
    cellFeaturedBg: '#064e3b50',
    cellText: '#a3a3a3',
    cellFeaturedText: '#34d399',

    textOnAccent: '#0A0A0F',
    bgOnAccent: '#e5e5e5',

    cardShadow: '0 4px 24px rgba(0,0,0,0.08)',

    fontFamilyBody: "'Inter', -apple-system, sans-serif",
    fontFamilyDisplay: "'Inter', -apple-system, sans-serif",
    fontFamilyMono: "'SF Mono','Fira Code',monospace",
    fontWeightBody: 400,
    cornerRadius: 12,
  },
}

registerPreset(zinc)

export { zinc }
