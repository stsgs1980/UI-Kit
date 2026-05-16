'use client'

import { Wand2, LayoutGrid, Monitor, Grid3X3 } from 'lucide-react'
import { useLayoutTheme } from '@/lib/layout/theme'
import { ThemePresetSelector } from '@/components/layout/theme-preset-selector'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

// ─── Types ────────────────────────────────────────────────

export type Variant = 'studio' | 'explorer' | 'canvas' | 'grids'

interface VariantMeta {
  label: string
  icon: typeof Wand2
}

const VARIANTS: Record<Variant, VariantMeta> = {
  studio:   { label: 'Studio',   icon: Wand2 },
  explorer: { label: 'Explorer', icon: LayoutGrid },
  canvas:   { label: 'Canvas',   icon: Monitor },
  grids:    { label: 'Grids',    icon: Grid3X3 },
}

// ─── Studio Header ────────────────────────────────────────

export function StudioHeader({
  variant,
  onVariantChange,
}: {
  variant: Variant
  onVariantChange: (v: Variant) => void
}) {
  const { tokens } = useLayoutTheme()

  return (
    <header style={{
      position: 'relative', zIndex: 20, flexShrink: 0,
      borderBottom: `1px solid ${tokens.borderSubtle}`,
      background: tokens.bgBase,
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{
        height: 55, padding: '0 21px',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Brand */}
        <BrandMark />

        {/* Navigation */}
        <nav
          aria-label="Primary navigation"
          style={{ display: 'flex', gap: 0, marginLeft: 24 }}
        >
          {(Object.entries(VARIANTS) as [Variant, VariantMeta][]).map(([key, meta]) => {
            const Icon = meta.icon
            const active = variant === key
            return (
              <button
                key={key}
                onClick={() => onVariantChange(key)}
                aria-current={active ? 'page' : undefined}
                style={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px',
                  fontSize: 13,
                  fontWeight: active ? fontWeight.semibold : fontWeight.regular,
                  fontFamily: tokens.fontFamilyBody,
                  color: active ? tokens.textPrimary : tokens.textMuted,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: active
                    ? `2px solid ${tokens.accentPrimary}`
                    : '2px solid transparent',
                  marginBottom: -1,
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.color = tokens.textSecondary
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.color = tokens.textMuted
                }}
              >
                <Icon width={14} height={14} />
                {meta.label}
              </button>
            )
          })}
        </nav>

        {/* Actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <ThemePresetSelector />
        </div>
      </div>
    </header>
  )
}

// ─── Brand Mark ───────────────────────────────────────────

function BrandMark() {
  const { tokens } = useLayoutTheme()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <div style={{
        width: 26, height: 26, borderRadius: tokens.cornerRadius,
        background: tokens.accentPrimary, color: tokens.textOnAccent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: fontWeight.black,
        fontFamily: tokens.fontFamilyDisplay,
      }}>S</div>
      <span style={{
        fontWeight: fontWeight.bold, fontSize: 14,
        fontFamily: tokens.fontFamilyBody, color: tokens.textSecondary,
      }}>@stsgs/ui</span>
    </div>
  )
}
