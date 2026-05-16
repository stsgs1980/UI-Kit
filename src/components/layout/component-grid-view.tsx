'use client'

import { cn } from '@/lib/utils'
import { getComponentIcon } from './component-icons'
import type { ThemeTokens } from '@/lib/layout/theme-types'

// ─── Types ──────────────────────────────────────────────────

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

// ─── Layer colors ────────────────────────────────────────────

const LAYER_COLORS: Record<string, string> = {
  ui: '#10B981', sections: '#3B82F6', features: '#8B5CF6',
}

// ─── Component Grid ──────────────────────────────────────────

export function ComponentGridView({
  components, activeComponent, onSelectComponent, tokens, title,
}: ComponentGridViewProps) {
  return (
    <div data-slot="component-grid" style={{ flex: 1, overflowY: 'auto', padding: 21 }}>
      {title && (
        <div style={{ marginBottom: 13 }}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: tokens.fontFamilyDisplay, color: tokens.textPrimary }}>
            {title}
          </div>
          <div style={{ fontSize: 12, fontFamily: tokens.fontFamilyBody, color: tokens.textSecondary, marginTop: 4 }}>
            {components.length} components
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(233px, 1fr))',
        gap: 13,
      }}>
        {components.map((comp, i) => {
          const lc = LAYER_COLORS[comp.layer] ?? LAYER_COLORS.ui
          const active = comp.name === activeComponent
          const delay = Math.min(0.03 + i * 0.02, 0.55)

          return (
            <button
              key={comp.name}
              data-slot="explorer-card"
              onClick={() => onSelectComponent(comp.name)}
              className={cn('explorer-card', active && 'explorer-card--selected')}
              style={{
                textAlign: 'left', padding: 0, cursor: 'pointer',
                borderRadius: tokens.cornerRadius,
                border: `1px solid ${active ? tokens.accentPrimary + '59' : tokens.borderSubtle}`,
                background: tokens.bgBase, display: 'flex', flexDirection: 'column',
                animationDelay: `${delay}s`,
                '--card-hover-border': `${lc}40`,
                boxShadow: active ? `0 0 20px ${tokens.accentPrimary}25` : undefined,
              } as React.CSSProperties}
            >
              {/* Left accent line on hover */}
              <div className="explorer-card-accent" style={{ background: lc }} />

              {/* Preview area */}
              <div className="explorer-card-preview" style={{ height: 144, background: tokens.bgElevated }}>
                <div style={{
                  position: 'relative', zIndex: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
                }}>
                  <div className="card-icon" style={{ color: tokens.textDim, opacity: 0.5 }}>
                    {getComponentIcon(comp)}
                  </div>
                </div>

                {/* Gradient fade */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, zIndex: 2,
                  background: `linear-gradient(transparent, ${tokens.bgSurface})`, pointerEvents: 'none',
                }} />

                {/* Hover overlay with exports */}
                <div className="explorer-card-overlay" style={{
                  position: 'absolute', inset: 0, zIndex: 3,
                  background: 'rgba(11,11,15,0.7)', backdropFilter: 'blur(4px)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12,
                }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, fontFamily: tokens.fontFamilyMono,
                    color: tokens.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>Exports</span>
                  <div className="export-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                    {comp.exports.slice(0, 6).map(exp => (
                      <span key={exp} style={{
                        fontSize: 10, fontFamily: tokens.fontFamilyMono, color: tokens.textSecondary,
                        background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: 4,
                      }}>{exp}</span>
                    ))}
                    {comp.exports.length > 6 && (
                      <span style={{ fontSize: 10, fontFamily: tokens.fontFamilyMono, color: tokens.textMuted, padding: '2px 4px' }}>
                        +{comp.exports.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Info bar */}
              <div data-slot="card-info" style={{ padding: '13px 13px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 13, fontWeight: 500, fontFamily: tokens.fontFamilyMono, color: tokens.textPrimary,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0,
                }}>{comp.name}</span>
                <span style={{
                  fontSize: 10, fontFamily: tokens.fontFamilyMono,
                  color: lc, opacity: 0.6, textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: lc, display: 'inline-block' }} />
                  {comp.layer}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
