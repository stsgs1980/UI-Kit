/**
 * Fibonacci Grid visual demo — columns follow Fibonacci sequence.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

export function FibGridDemo({ variant }: { variant: 'classic' | 'triple' | 'tall' }) {
  const { tokens } = useLayoutTheme()
  const cellLabel = (num: string): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: fontSize.xs, fontFamily: tokens.fontFamilyMono,
    color: tokens.textDim,
  })

  const cellColors = [tokens.bgSurface, tokens.bgElevated, tokens.bgSurface, tokens.bgElevated, tokens.bgSurface]

  if (variant === 'triple') {
    const cols = [2, 3, 5]
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 5fr', gap: 1, height: 220, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        {cols.map((c, i) => (
          <div key={c} style={{ ...cellLabel(`${c}fr`), background: cellColors[i], minHeight: 60 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: tokens.textPrimary }}>{c}fr</div>
              <div style={{ color: tokens.textMuted, fontSize: fontSize.xs }}>F({6 + i})</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'tall') {
    const cols = [1, 1, 2, 3]
    const rows = [2, 3, 5]
    const cells: { col: number; row: number; colSpan: number; rowSpan: number; label: string }[] = [
      { col: 1, row: 1, colSpan: 1, rowSpan: 1, label: '1fr' },
      { col: 2, row: 1, colSpan: 1, rowSpan: 1, label: '1fr' },
      { col: 3, row: 1, colSpan: 1, rowSpan: 1, label: '2fr' },
      { col: 4, row: 1, colSpan: 1, rowSpan: 3, label: '3fr x 5fr' },
      { col: 1, row: 2, colSpan: 2, rowSpan: 1, label: '2fr' },
      { col: 3, row: 2, colSpan: 1, rowSpan: 2, label: '2fr x 5fr' },
      { col: 1, row: 3, colSpan: 1, rowSpan: 1, label: '3fr' },
      { col: 2, row: 3, colSpan: 1, rowSpan: 1, label: '3fr' },
    ]
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 3fr', gridTemplateRows: '2fr 3fr 5fr', gap: 1, height: 300, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
        {cells.map((c, i) => (
          <div
            key={i}
            style={{
              gridColumn: `${c.col} / span ${c.colSpan}`,
              gridRow: `${c.row} / span ${c.rowSpan}`,
              ...cellLabel(c.label),
              background: cellColors[i % cellColors.length],
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: fontSize.sm, fontWeight: fontWeight.semibold, color: tokens.textPrimary }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Classic
  const cols = [1, 1, 2, 3, 5]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 3fr 5fr', gap: 1, height: 220, borderRadius: tokens.cornerRadius, overflow: 'hidden' }}>
      {cols.map((c, i) => (
        <div key={c} style={{ ...cellLabel(`${c}fr`), background: cellColors[i % cellColors.length] }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, color: tokens.textPrimary }}>{c}</div>
            <div style={{ color: tokens.textMuted, fontSize: fontSize.xs }}>fr</div>
          </div>
        </div>
      ))}
    </div>
  )
}
