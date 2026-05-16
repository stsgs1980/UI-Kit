/**
 * Phi Grid visual demo — two-column golden ratio split.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight, letterSpacing } from '@/lib/layout/tokens'

export function PhiGridDemo() {
  const { tokens } = useLayoutTheme()
  const labelStyle: React.CSSProperties = {
    fontSize: fontSize.xs,
    fontFamily: tokens.fontFamilyMono,
    color: tokens.textDim,
    padding: 8,
  }
  const headingStyle: React.CSSProperties = {
    fontSize: fontSize.lg,
    fontFamily: tokens.fontFamilyDisplay,
    fontWeight: fontWeight.bold,
    color: tokens.textPrimary,
    lineHeight: 1.24,
    padding: '0 8px',
  }
  const bodyStyle: React.CSSProperties = {
    fontSize: fontSize.base,
    fontFamily: tokens.fontFamilyBody,
    fontWeight: fontWeight.light,
    color: tokens.textMuted,
    lineHeight: 1.618,
    padding: '8px 8px 0',
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.618fr',
        height: 280,
        borderRadius: tokens.cornerRadius,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar — 38.2% */}
      <div style={{
        background: tokens.bgSurface,
        padding: '16px 0',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={labelStyle}>38.2% — sidebar</div>
        <div style={headingStyle}>Focus zone</div>
        <div style={bodyStyle}>Visual anchor for navigation and metadata.</div>
      </div>
      {/* Content — 61.8% */}
      <div style={{
        background: tokens.bgElevated,
        padding: '16px 0',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={labelStyle}>61.8% — content</div>
        <div style={headingStyle}>Dominant area</div>
        <div style={bodyStyle}>
          The golden ratio (phi = 1.618) creates natural harmony.
          Found in nautilus shells, sunflower seeds, and Renaissance art.
        </div>
      </div>
    </div>
  )
}
