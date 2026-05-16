/**
 * Bento Grid visual demo — asymmetric cards with featured spanning.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

export function BentoGridDemo({ variant }: { variant: 'classic' | 'wide' | 'masonry' }) {
  const { tokens } = useLayoutTheme()

  const cardStyle: React.CSSProperties = {
    background: tokens.bgSurface,
    borderRadius: tokens.cornerRadius,
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden', transition: 'background 0.2s',
  }
  const featuredStyle: React.CSSProperties = {
    background: tokens.bgElevated,
    borderRadius: tokens.cornerRadius,
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden',
  }

  if (variant === 'wide') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '80px', gap: 2, height: 280, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        <div style={{ ...featuredStyle, gridColumn: 'span 3', gridRow: 'span 2' }}>
          <div style={{ fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: tokens.textPrimary, fontFamily: tokens.fontFamilyDisplay }}>Hero</div>
          <div style={{ fontSize: fontSize.xs, color: tokens.textMuted, marginTop: 4 }}>3 x 2</div>
        </div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
        <div style={{ ...cardStyle, gridRow: 'span 2' }}>
          <div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 2</div>
        </div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
      </div>
    )
  }

  if (variant === 'masonry') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '60px', gap: 2, height: 280, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        <div style={{ ...featuredStyle, gridRow: 'span 2' }}>
          <div style={{ color: tokens.textPrimary, fontSize: fontSize.sm, fontWeight: 600 }}>span 2</div>
        </div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.xs }}>1</div></div>
        <div style={{ ...cardStyle, gridRow: 'span 3' }}>
          <div style={{ color: tokens.textPrimary, fontSize: fontSize.sm, fontWeight: 600 }}>span 3</div>
        </div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.xs }}>1</div></div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.xs }}>1</div></div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.xs }}>1</div></div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.xs }}>1</div></div>
        <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.xs }}>1</div></div>
      </div>
    )
  }

  // Classic
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '1fr', gap: 2, height: 280, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
      <div style={{ ...featuredStyle, gridColumn: 'span 2', gridRow: 'span 2' }}>
        <div style={{ fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: tokens.textPrimary, fontFamily: tokens.fontFamilyDisplay }}>Featured</div>
        <div style={{ fontSize: fontSize.xs, color: tokens.textMuted, marginTop: 4 }}>2 x 2</div>
      </div>
      <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
      <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
      <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
      <div style={{ ...cardStyle }}><div style={{ color: tokens.textDim, fontSize: fontSize.sm }}>1 x 1</div></div>
    </div>
  )
}
