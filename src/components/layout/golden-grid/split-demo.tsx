/**
 * Split Grid visual demo — sidebar/content with variants.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

export function SplitGridDemo({ variant }: { variant: 'classic' | 'inverse' | 'deep' }) {
  const { tokens } = useLayoutTheme()
  const labelS = (text: string): React.CSSProperties => ({
    fontSize: fontSize.xs, fontFamily: tokens.fontFamilyMono,
    color: tokens.textDim, padding: 8,
  })
  const headingS = (color: string): React.CSSProperties => ({
    fontSize: fontSize.md, fontFamily: tokens.fontFamilyDisplay,
    fontWeight: fontWeight.bold, color, lineHeight: 1.24, padding: '0 8px',
  })
  const cellBase: React.CSSProperties = {
    display: 'flex', flexDirection: 'column',
    padding: '16px 0', transition: 'background 0.2s',
  }

  if (variant === 'inverse') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.618fr 1fr', height: 220, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        <div style={{ ...cellBase, background: tokens.bgElevated }}>
          <div style={labelS('61.8% — content')}> </div>
          <div style={headingS(tokens.textPrimary)}>Dominant area</div>
        </div>
        <div style={{ ...cellBase, background: tokens.bgSurface }}>
          <div style={labelS('38.2% — sidebar')}> </div>
          <div style={headingS(tokens.textSecondary)}>Sidebar</div>
        </div>
      </div>
    )
  }

  if (variant === 'deep') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.618fr', gridTemplateRows: '1.618fr 1fr', gap: 1, height: 280, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        <div style={{ ...cellBase, background: tokens.bgSurface }}>
          <div style={labelS('1fr x 1.618fr')}> </div>
          <div style={headingS(tokens.textSecondary)}>Top-left</div>
        </div>
        <div style={{ ...cellBase, background: tokens.bgElevated, gridColumn: 'span 1' }}>
          <div style={labelS('1.618fr')}> </div>
          <div style={headingS(tokens.textPrimary)}>Top-right (wide)</div>
        </div>
        <div style={{ ...cellBase, background: tokens.bgElevated }}>
          <div style={labelS('1fr')}> </div>
          <div style={headingS(tokens.textSecondary)}>Bottom-left</div>
        </div>
        <div style={{ ...cellBase, background: tokens.bgSurface }}>
          <div style={labelS('1.618fr x 1fr')}> </div>
          <div style={headingS(tokens.textDim)}>Bottom-right</div>
        </div>
      </div>
    )
  }

  // Classic
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.618fr', height: 220, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
      <div style={{ ...cellBase, background: tokens.bgSurface }}>
        <div style={labelS('38.2% — sidebar')}> </div>
        <div style={headingS(tokens.textPrimary)}>Focus zone</div>
        <div style={{ fontSize: fontSize.base, fontWeight: 300, color: tokens.textMuted, padding: '8px 8px 0', fontFamily: tokens.fontFamilyBody }}>
          Navigation anchor and metadata.
        </div>
      </div>
      <div style={{ ...cellBase, background: tokens.bgElevated }}>
        <div style={labelS('61.8% — content')}> </div>
        <div style={headingS(tokens.textPrimary)}>Dominant area</div>
        <div style={{ fontSize: fontSize.base, fontWeight: 300, color: tokens.textMuted, padding: '8px 8px 0', fontFamily: tokens.fontFamilyBody }}>
          Primary content lives here. The ratio 1:1.618 is the inverse of phi.
        </div>
      </div>
    </div>
  )
}
