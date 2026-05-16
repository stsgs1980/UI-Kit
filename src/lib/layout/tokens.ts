/**
 * @stsgs/ui Design Tokens — Layout System
 *
 * Palette: Zinc (monochrome) + Emerald (primary) + Amber (AI/accent)
 * Design language: spacious, rounded, soft — like 21st.dev / morning mockups
 */

// ─── Color Tokens ─────────────────────────────────────────────

export const colors = {
  // Zinc scale (monochrome — cool undertone at 240°)
  zinc: {
    50:  '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#0A0A0F',
  },

  // Primary accent — Emerald
  emerald: {
    50:  '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },

  // AI / secondary accent — Amber
  amber: {
    50:  '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
} as const

// ─── Spacing Scale ────────────────────────────────────────────

export const spacing = {
  xs:   3,
  sm:   5,
  md:   8,
  base: 13,
  lg:   21,
  xl:   34,
  '2xl': 55,
  '3xl': 89,
  '4xl': 144,
} as const

// ─── Border Radius ────────────────────────────────────────────

export const radius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  '2xl': 12,
  '3xl': 14,
  '4xl': 16,
  full: 9999,
} as const

// ─── Typography Scale (Fibonacci + Golden Ratio) ───────────────
//
// Major steps follow Fibonacci:  5 · 8 · 13 · 21 · 34 · 55 · 89
// Intermediate steps use major-2nd ratio (×1.125) between Fib anchors.
// This fills practical gaps while keeping the mathematical backbone.
//
//  5 ─── 8 ─── 10 ─ 12 ─ 13 ─ 14 ─ 16 ─ 21 ─ 34 ─ 55 ─ 89
//  F(5)  F(6)   interp        F(7)  interp      F(8)  F(9)  F(10) F(11)

export const fontSize = {
  // ── Fibonacci anchors ──
  '2xs':  5,   // F(5) — layer counts, micro chips
  xs:    8,    // F(6) — kbd hints, tiny badges, micro-labels
  base: 13,    // F(7) — body text, nav buttons, descriptions
  lg:   21,    // F(8) — card titles, subtitles, grid section headings
  xl:   34,    // F(9) — page section headings
  '2xl': 55,   // F(10) — page headings
  '3xl': 89,   // F(11) — hero / display

  // ── Interpolated (major-2nd ×1.125 between Fib anchors) ──
  sm:   10,    // tags, export chips, mono labels
  md:   14,    // brand names, component headings (between F7=13 and F8=21)
} as const

/** Intermediate sizes — numeric access for fine-tuned UI between anchors. */
export const fontSizeInterp = {
  9:  9,   // small mono labels, layer dots
  11: 11,  // search inputs, breadcrumbs, secondary UI text
  12: 12,  // sidebar nav items, category labels, meta info
  16: 16,  // grid titles (between 13 and 21, closer to heading)
} as const

export const fontWeight = {
  light:     300,
  regular:   400,
  medium:    500,
  semibold:  600,
  bold:      700,
  black:     800,
} as const

// ─── Line Heights (Golden Ratio φ = 1.618) ───────────────────
//   hero:    φ⁻¹·⁵ ≈ 1.10  (display, very tight)
//   heading: 2/φ   ≈ 1.24  (headings, compact)
//   subhead: φ⁻⁰·⁵ ≈ 1.38  (subheadings)
//   body:    φ      = 1.618 (body text — the golden ratio)
//   relaxed: φ + 0.19 ≈ 1.81 (comfortable reading)

export const lineHeight = {
  hero:     1.1,
  heading:  1.24,
  subhead:  1.38,
  body:     1.618,
  relaxed:  1.81,
} as const

// ─── Letter Spacing (Golden Ratio derived) ────────────────────
//   tight:    -0.03em
//   normal:    0
//   wide:      0.03em   (≈ φ × 0.019)
//   wider:     0.05em
//   widest:    0.08em   (≈ φ × 0.05)

export const letterSpacing = {
  tight:   '-0.03em',
  normal:  '0',
  wide:    '0.03em',
  wider:   '0.05em',
  widest:  '0.08em',
} as const

// ─── Shadows ──────────────────────────────────────────────────

export const shadows = {
  card:  '0 4px 24px rgba(0,0,0,0.08)',
  input: '0 4px 20px rgba(0,0,0,0.06)',
  glow:  '0 4px 24px rgba(16,185,129,0.08)',
  glowAI: '0 4px 24px rgba(245,158,11,0.08)',
} as const

// ─── Semantic Tokens (Dark Theme) ─────────────────────────────

export const darkTokens = {
  bgDeep:     colors.zinc[950],
  bgBase:     colors.zinc[900],
  bgSurface:  colors.zinc[800],
  bgElevated: colors.zinc[700],

  textPrimary:   colors.zinc[50],
  textSecondary: colors.zinc[300],
  textMuted:     colors.zinc[500],
  textDim:       colors.zinc[600],

  borderSubtle:  `${colors.zinc[800]}80`,
  borderDefault: colors.zinc[700],
  borderBright:  colors.zinc[600],

  accentPrimary: colors.emerald[500],
  accentAI:      colors.amber[500],

  accentGlow:    `${colors.emerald[500]}14`,
  accentAIGlow:  `${colors.amber[500]}14`,

  focusRing:     colors.emerald[400],    // WCAG 2.4.7: 3:1+ against dark bgs
} as const

// ─── Semantic Tokens (Light Theme) ────────────────────────────

export const lightTokens = {
  bgDeep:     colors.zinc[50],
  bgBase:     colors.zinc[100],
  bgSurface:  colors.zinc[200],
  bgElevated: colors.zinc[300],

  textPrimary:   colors.zinc[950],
  textSecondary: colors.zinc[700],
  textMuted:     colors.zinc[500],
  textDim:       colors.zinc[400],

  borderSubtle:  `${colors.zinc[200]}80`,
  borderDefault: colors.zinc[300],
  borderBright:  colors.zinc[400],

  accentPrimary: colors.emerald[600],
  accentAI:      colors.amber[600],

  accentGlow:    `${colors.emerald[600]}14`,
  accentAIGlow:  `${colors.amber[600]}14`,

  focusRing:     colors.emerald[700],    // WCAG 2.4.7: 3:1+ against light bgs
} as const

// ─── Wireframe Grid Tokens ────────────────────────────────────

export const wireframeTokens = {
  // Grid container
  borderWidth:  1,
  borderStyle:  'solid',
  gridGap:      1,  // px — tight

  // Cell styling
  cellFont: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
  cellFontSize: {
    compact: 8,
    normal:  10,
  },
} as const

// ─── CSS Custom Properties Generator ──────────────────────────

export function tokensToCSS(tokens: typeof darkTokens): Record<string, string> {
  return {
    '--stsgs-bg-deep':     tokens.bgDeep,
    '--stsgs-bg-base':     tokens.bgBase,
    '--stsgs-bg-surface':  tokens.bgSurface,
    '--stsgs-bg-elevated': tokens.bgElevated,
    '--stsgs-text-primary':   tokens.textPrimary,
    '--stsgs-text-secondary': tokens.textSecondary,
    '--stsgs-text-muted':     tokens.textMuted,
    '--stsgs-text-dim':       tokens.textDim,
    '--stsgs-border-subtle':  tokens.borderSubtle,
    '--stsgs-border-default': tokens.borderDefault,
    '--stsgs-border-bright':  tokens.borderBright,
    '--stsgs-accent':   tokens.accentPrimary,
    '--stsgs-accent-ai': tokens.accentAI,
    '--stsgs-accent-glow':   tokens.accentGlow,
    '--stsgs-accent-ai-glow': tokens.accentAIGlow,
  }
}
