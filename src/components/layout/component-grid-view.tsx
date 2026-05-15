'use client'

import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight } from '@/lib/layout/tokens'

// ─── Types ────────────────────────────────────────────────

interface Comp {
  name: string; layer: string; lines: number
  description: string; exports: string[]; hasForwardRef: boolean; hasCn: boolean
}

interface ComponentGridViewProps {
  components: Comp[]
  activeComponent: string
  onSelectComponent: (name: string) => void
  tokens: ThemeTokens
  title?: string
}

// ─── Layer colors ─────────────────────────────────────────

const LAYER_STYLE: Record<string, { color: string; bg: string }> = {
  ui:       { color: '#10B981', bg: '#10B98115' },
  sections: { color: '#3B82F6', bg: '#3B82F615' },
  features: { color: '#8B5CF6', bg: '#8B5CF615' },
}

// ─── Component Grid ───────────────────────────────────────

export function ComponentGridView({
  components, activeComponent, onSelectComponent, tokens, title,
}: ComponentGridViewProps) {
  const style = LAYER_STYLE

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
      {title && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: fontWeight.bold, fontFamily: tokens.fontFamilyDisplay }}>
            {title}
          </div>
          <div style={{ fontSize: 12, fontFamily: tokens.fontFamilyBody, color: tokens.textSecondary, marginTop: 4 }}>
            {components.length} components
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
      }}>
        {components.map(comp => {
          const ls = style[comp.layer] ?? style.ui
          const isActive = comp.name === activeComponent

          return (
            <button
              key={comp.name}
              onClick={() => onSelectComponent(comp.name)}
              style={{
                textAlign: 'left', padding: 14, borderRadius: tokens.cornerRadius,
                border: `1px solid ${isActive ? tokens.accentPrimary + '60' : tokens.borderSubtle}`,
                background: isActive ? `${tokens.accentPrimary}08` : tokens.bgBase,
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.borderColor = ls.color + '40'
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.borderColor = tokens.borderSubtle
              }}
            >
              {/* Header: name + layer badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 13, fontWeight: fontWeight.semibold,
                  fontFamily: tokens.fontFamilyMono, color: tokens.textPrimary,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {comp.name}
                </span>
                <span style={{
                  fontSize: 9, fontWeight: fontWeight.bold, fontFamily: tokens.fontFamilyMono,
                  padding: '1px 6px', borderRadius: 4, marginLeft: 'auto',
                  background: ls.bg, color: ls.color, textTransform: 'uppercase',
                  flexShrink: 0,
                }}>
                  {comp.layer}
                </span>
              </div>

              {/* Description */}
              <div style={{
                fontSize: 11, fontFamily: tokens.fontFamilyBody,
                color: tokens.textMuted, lineHeight: 1.5,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {comp.description}
              </div>

              {/* Footer: badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto' }}>
                <span style={{
                  fontSize: 10, fontFamily: tokens.fontFamilyMono,
                  color: tokens.textDim, padding: '1px 6px', borderRadius: 4,
                  background: tokens.bgSurface,
                }}>
                  {comp.lines}L
                </span>
                {comp.hasForwardRef && (
                  <span style={{
                    fontSize: 10, fontFamily: tokens.fontFamilyMono,
                    color: '#10B981', padding: '1px 6px', borderRadius: 4,
                    background: '#10B98115',
                  }}>
                    ref
                  </span>
                )}
                {comp.hasCn && (
                  <span style={{
                    fontSize: 10, fontFamily: tokens.fontFamilyMono,
                    color: '#3B82F6', padding: '1px 6px', borderRadius: 4,
                    background: '#3B82F615',
                  }}>
                    cn()
                  </span>
                )}
                {comp.exports.length > 0 && (
                  <span style={{
                    fontSize: 10, fontFamily: tokens.fontFamilyMono,
                    color: tokens.textDim, padding: '1px 6px', borderRadius: 4,
                    background: tokens.bgSurface, marginLeft: 'auto',
                  }}>
                    {comp.exports.length} exports
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
