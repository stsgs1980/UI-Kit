/**
 * Spiral Grid visual demo — approximates golden spiral with Fibonacci cells.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

export function SpiralGridDemo({ variant }: { variant: 'outward' | 'corner' | 'diagonal' }) {
  const { tokens } = useLayoutTheme()

  const labelCell = (label: string, sub: string): React.CSSProperties => ({
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    transition: 'background 0.2s',
  })
  const numStyle = (accent = false): React.CSSProperties => ({
    fontSize: fontSize.md, fontWeight: fontWeight.bold,
    color: accent ? tokens.accentPrimary : tokens.textPrimary,
    fontFamily: tokens.fontFamilyMono,
  })
  const subStyle: React.CSSProperties = {
    fontSize: fontSize.xs, color: tokens.textDim, marginTop: 2,
    fontFamily: tokens.fontFamilyMono,
  }

  if (variant === 'corner') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr 2fr', gridTemplateRows: '5fr 3fr 2fr', gap: 1, height: 280, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        {/* Anchor — spans 2x2 */}
        <div style={{ ...labelCell('5 x 5', 'anchor'), gridColumn: '1 / 3', gridRow: '1 / 3', background: tokens.bgElevated }}>
          <div style={{ ...numStyle(true) }}>5 x 5</div>
          <div style={subStyle}>anchor</div>
        </div>
        <div style={{ ...labelCell('3', 'fr'), background: tokens.bgSurface, gridColumn: 3, gridRow: 1 }}>
          <div style={numStyle()}>3fr</div>
        </div>
        <div style={{ ...labelCell('3', 'fr'), background: tokens.bgElevated, gridColumn: 3, gridRow: 2 }}>
          <div style={numStyle()}>3fr</div>
        </div>
        <div style={{ ...labelCell('5', 'fr'), background: tokens.bgSurface, gridColumn: 1, gridRow: 3 }}>
          <div style={numStyle()}>5fr</div>
        </div>
        <div style={{ ...labelCell('3 x 2', 'fr'), background: tokens.bgElevated, gridColumn: '2 / 4', gridRow: 3 }}>
          <div style={numStyle()}>3 x 2fr</div>
        </div>
      </div>
    )
  }

  if (variant === 'diagonal') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '8fr 5fr 3fr 2fr', gridTemplateRows: '8fr 5fr 3fr 2fr', gap: 1, height: 320, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        {/* Major — top-left 2x2 */}
        <div style={{ ...labelCell('8 x 8', 'major'), gridColumn: '1 / 3', gridRow: '1 / 3', background: tokens.bgElevated }}>
          <div style={{ ...numStyle(true) }}>8 x 8fr</div>
          <div style={subStyle}>major</div>
        </div>
        <div style={{ ...labelCell('3', 'fr'), background: tokens.bgSurface, gridColumn: 3, gridRow: 1 }}>
          <div style={numStyle()}>3fr</div>
        </div>
        <div style={{ ...labelCell('2', 'fr'), background: tokens.bgSurface, gridColumn: 4, gridRow: 1 }}>
          <div style={numStyle()}>2fr</div>
        </div>
        <div style={{ ...labelCell('5', 'fr'), background: tokens.bgElevated, gridColumn: 2, gridRow: 2 }}>
          <div style={numStyle()}>5fr</div>
        </div>
        <div style={{ ...labelCell('3', 'fr'), background: tokens.bgSurface, gridColumn: 3, gridRow: 2 }}>
          <div style={numStyle()}>3fr</div>
        </div>
        <div style={{ ...labelCell('2', 'fr'), background: tokens.bgElevated, gridColumn: 4, gridRow: 2 }}>
          <div style={numStyle()}>2fr</div>
        </div>
        {/* Minor — bottom-right 2x2 */}
        <div style={{ ...labelCell('8', 'fr'), background: tokens.bgSurface, gridColumn: 1, gridRow: 3 }}>
          <div style={numStyle()}>8fr</div>
        </div>
        <div style={{ ...labelCell('5', 'fr'), background: tokens.bgElevated, gridColumn: 2, gridRow: 3 }}>
          <div style={numStyle()}>5fr</div>
        </div>
        <div style={{ ...labelCell('3 x 2', 'minor'), gridColumn: '3 / 5', gridRow: 3, background: tokens.bgSurface }}>
          <div style={numStyle()}>3 x 2fr</div>
        </div>
        <div style={{ ...labelCell('8 x 5 x 3 x 2', 'fr'), background: tokens.bgElevated, gridColumn: '1 / 3', gridRow: 4 }}>
          <div style={{ fontSize: fontSize.xs, color: tokens.textMuted }}>8 + 5fr</div>
        </div>
        <div style={{ ...labelCell('3 x 2', 'fr'), background: tokens.bgSurface, gridColumn: 3, gridRow: 4 }}>
          <div style={numStyle()}>3fr</div>
        </div>
        <div style={{ ...labelCell('2', 'fr'), background: tokens.bgElevated, gridColumn: 4, gridRow: 4 }}>
          <div style={numStyle()}>2fr</div>
        </div>
      </div>
    )
  }

  // Outward
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '8fr 5fr 3fr', gridTemplateRows: '8fr 5fr 3fr', gap: 1, height: 300, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
      {/* Outer — spans 2x2 */}
      <div style={{ ...labelCell('8 x 8', 'outer'), gridColumn: '1 / 3', gridRow: '1 / 3', background: tokens.bgElevated }}>
        <div style={{ ...numStyle(true) }}>8 x 8fr</div>
        <div style={subStyle}>outer</div>
      </div>
      <div style={{ ...labelCell('3', 'fr'), background: tokens.bgSurface, gridColumn: 3, gridRow: 1 }}>
        <div style={numStyle()}>3fr</div>
      </div>
      <div style={{ ...labelCell('5', 'fr'), background: tokens.bgElevated, gridColumn: 2, gridRow: 2 }}>
        <div style={numStyle()}>5fr</div>
      </div>
      <div style={{ ...labelCell('3', 'fr'), background: tokens.bgSurface, gridColumn: 3, gridRow: 2 }}>
        <div style={numStyle()}>3fr</div>
      </div>
      <div style={{ ...labelCell('8', 'fr'), background: tokens.bgSurface, gridColumn: 1, gridRow: 3 }}>
        <div style={numStyle()}>8fr</div>
      </div>
      <div style={{ ...labelCell('5 x 3', 'fr'), background: tokens.bgElevated, gridColumn: '2 / 4', gridRow: 3 }}>
        <div style={numStyle()}>5 x 3fr</div>
      </div>
    </div>
  )
}
