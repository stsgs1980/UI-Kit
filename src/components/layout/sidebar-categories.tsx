'use client'

import { categoryMeta } from '@/lib/layout/types'
import { CATEGORIES } from '@/lib/layout/types'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontWeight } from '@/lib/layout/tokens'

const ITEMS = CATEGORIES.map(cat => ({
  icon: categoryMeta[cat]?.label === 'Classic' ? '\u25A4'
    : categoryMeta[cat]?.label === 'Bento' ? '\u2B21'
    : categoryMeta[cat]?.label === 'Artistic' ? '\u25C8'
    : categoryMeta[cat]?.label === 'Math' ? '\u25B3'
    : categoryMeta[cat]?.label === 'App' ? '\u25C9'
    : '\u2B1A',
  label: categoryMeta[cat]?.label ?? cat,
  key: cat,
}))

export function SidebarCategories({
  selected,
  onSelect,
  counts,
}: {
  selected: string | null
  onSelect: (cat: string | null) => void
  counts: Record<string, number>
}) {
  const { tokens } = useLayoutTheme()

  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{
        fontSize: 9, fontWeight: fontWeight.bold, textTransform: 'uppercase',
        letterSpacing: 1, color: tokens.sidebarMuted, padding: '10px 16px 4px',
        fontFamily: tokens.fontFamilyBody,
      }}>Categories</div>
      {ITEMS.map(item => {
        const active = selected === item.key
        const count = counts[item.key] ?? 0
        return (
          <button key={item.key}
            onClick={() => onSelect(selected === item.key ? null : item.key)}
            aria-pressed={active} aria-label={item.label}
            style={{
              fontSize: 12, fontFamily: tokens.fontFamilyBody,
              padding: '5px 16px', display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', transition: 'background 0.15s',
              background: active ? `${tokens.accentPrimary}18` : 'transparent',
              borderRight: active ? `2px solid ${tokens.accentPrimary}` : '2px solid transparent',
              borderLeft: 'none', borderTop: 'none', borderBottom: 'none',
              color: active ? tokens.accentPrimary : tokens.sidebarText,
              width: '100%', textAlign: 'left',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = tokens.sidebarBorder }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ fontSize: 12, opacity: active ? 1 : 0.5, width: 18, textAlign: 'center' }}>
              {item.icon}
            </span>
            {item.label}
            {count > 0 && (
              <span style={{
                fontSize: 9, marginLeft: 'auto', background: `${tokens.sidebarBorder}`,
                padding: '1px 6px', borderRadius: 8, color: tokens.sidebarMuted,
                fontFamily: tokens.fontFamilyMono,
              }}>{count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
