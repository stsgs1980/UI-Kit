/**
 * 12-Column Grid visual demo — classic grid with golden-ratio spans.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

export function TwelveColGridDemo({ variant }: { variant: 'golden' | 'fibonacci' | 'nested' }) {
  const { tokens } = useLayoutTheme()

  const colBg = (i: number): string =>
    i % 2 === 0 ? tokens.bgSurface : tokens.bgElevated

  if (variant === 'fibonacci') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 1, height: 200, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        {/* span 3 */}
        <div style={{
          gridColumn: 'span 3', background: tokens.bgSurface,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, color: tokens.accentPrimary }}>3 cols</div>
          <div style={{ fontSize: fontSize.xs, color: tokens.textDim }}>F(4)</div>
        </div>
        {/* span 5 */}
        <div style={{
          gridColumn: 'span 5', background: tokens.bgElevated,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, color: tokens.textPrimary }}>5 cols</div>
          <div style={{ fontSize: fontSize.xs, color: tokens.textDim }}>F(5)</div>
        </div>
        {/* span 4 to fill */}
        <div style={{
          gridColumn: 'span 4', background: tokens.bgSurface,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, color: tokens.textSecondary }}>4 cols</div>
          <div style={{ fontSize: fontSize.xs, color: tokens.textDim }}>fill</div>
        </div>
      </div>
    )
  }

  if (variant === 'nested') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto 1fr', gap: 1, height: 240, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        {/* Navbar full width */}
        <div style={{
          gridColumn: '1 / -1', height: 40, background: tokens.accentPrimary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: tokens.textOnAccent }}>
            Navbar — 12 cols
          </span>
        </div>
        {/* Main content — 8 cols */}
        <div style={{
          gridColumn: 'span 8', background: tokens.bgElevated,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, color: tokens.textPrimary }}>Main — 8 cols</div>
          <div style={{ fontSize: fontSize.xs, color: tokens.textMuted, marginTop: 4 }}>61.8% of content area</div>
        </div>
        {/* Sidebar — 4 cols */}
        <div style={{
          gridColumn: 'span 4', background: tokens.bgSurface,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, color: tokens.textSecondary }}>Side — 4 cols</div>
          <div style={{ fontSize: fontSize.xs, color: tokens.textMuted, marginTop: 4 }}>38.2%</div>
        </div>
      </div>
    )
  }

  // Golden — 5 + 7
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 1, height: 200, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
      {/* Sidebar — 5 cols */}
      <div style={{
        gridColumn: 'span 5', background: tokens.bgSurface,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}>
        <div style={{ fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: tokens.accentPrimary, fontFamily: tokens.fontFamilyDisplay }}>5 cols</div>
        <div style={{ fontSize: fontSize.xs, color: tokens.textMuted, marginTop: 4 }}>41.7% ~ phi inverse</div>
      </div>
      {/* Content — 7 cols */}
      <div style={{
        gridColumn: 'span 7', background: tokens.bgElevated,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}>
        <div style={{ fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: tokens.textPrimary, fontFamily: tokens.fontFamilyDisplay }}>7 cols</div>
        <div style={{ fontSize: fontSize.xs, color: tokens.textMuted, marginTop: 4 }}>58.3% ~ phi</div>
      </div>
    </div>
  )
}
