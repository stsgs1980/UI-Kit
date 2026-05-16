/**
 * GoldenGridShowcase — main page for 6 golden ratio CSS Grid patterns.
 * Uses PatternDemo router and VariantsSection for sub-components.
 */
'use client'

import { useState, useCallback } from 'react'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight, letterSpacing, spacing } from '@/lib/layout/tokens'
import type { PatternId } from './types'
import { PATTERN_IDS, PATTERN_META } from './types'
import { CopyButton } from './copy-button'
import { CodeBlock } from './code-block'
import { PatternDemo } from './pattern-demo'
import { VariantsSection } from './variants-section'

export function GoldenGridShowcase() {
  const { tokens } = useLayoutTheme()
  const [activePattern, setActivePattern] = useState<PatternId>('phi')
  const [activeVariant, setActiveVariant] = useState(0)

  const pattern = PATTERN_META[activePattern]
  const currentVariant = pattern.variants[activeVariant] ?? pattern.mainVariant

  const handlePatternChange = useCallback((id: PatternId) => {
    setActivePattern(id)
    setActiveVariant(0)
  }, [])

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      overflow: 'hidden', background: tokens.bgDeep,
    }}>
      {/* ── Pattern Navigation ── */}
      <nav aria-label="Grid patterns" style={{
        flexShrink: 0, borderBottom: `1px solid ${tokens.borderSubtle}`,
        background: tokens.bgBase, padding: '0 21px',
        display: 'flex', alignItems: 'stretch', gap: 0,
        overflowX: 'auto',
      }}>
        {PATTERN_IDS.map((id) => {
          const p = PATTERN_META[id]
          const active = activePattern === id
          return (
            <button key={id} onClick={() => handlePatternChange(id)}
              aria-current={active ? 'page' : undefined}
              style={{
                position: 'relative', padding: '12px 18px',
                fontSize: fontSize.sm,
                fontWeight: active ? fontWeight.semibold : fontWeight.regular,
                fontFamily: tokens.fontFamilyBody,
                color: active ? tokens.accentPrimary : tokens.textMuted,
                background: 'transparent', border: 'none',
                borderBottom: active
                  ? `2px solid ${tokens.accentPrimary}`
                  : '2px solid transparent',
                marginBottom: -1, cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = tokens.textSecondary }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = tokens.textMuted }}
            >
              {p.label}
              {!active && (
                <span style={{
                  marginLeft: 6, fontSize: fontSize.xs,
                  color: tokens.textDim, fontFamily: tokens.fontFamilyMono,
                }}>{p.tagline}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: 'auto', padding: spacing.lg }}>
        <div style={{
          maxWidth: 960, margin: '0 auto',
          display: 'flex', flexDirection: 'column', gap: spacing.xl,
        }}>
          {/* Header */}
          <header>
            <div style={{
              fontSize: fontSize.sm, fontWeight: fontWeight.semibold,
              color: tokens.accentPrimary, letterSpacing: letterSpacing.wider,
              textTransform: 'uppercase', fontFamily: tokens.fontFamilyBody,
              marginBottom: spacing.sm,
            }}>Pattern {pattern.number}</div>
            <h1 style={{
              fontSize: fontSize.xl, fontFamily: tokens.fontFamilyDisplay,
              fontWeight: fontWeight.bold, color: tokens.textPrimary,
              lineHeight: 1.1, margin: 0,
            }}>{pattern.label}</h1>
            <p style={{
              fontSize: fontSize.md, fontFamily: tokens.fontFamilyBody,
              fontWeight: fontWeight.light, color: tokens.textMuted,
              lineHeight: 1.618, marginTop: spacing.sm, maxWidth: 640,
            }}>{pattern.description}</p>
          </header>

          {/* Main Demo */}
          <section>
            <PatternDemo id={activePattern}
              variant={currentVariant.name.toLowerCase().replace(/\s+/g, '-')} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: spacing.sm }}>
              <CopyButton code={currentVariant.cssCode} />
            </div>
          </section>

          {/* CSS Code */}
          <section>
            <h2 style={{
              fontSize: fontSize.sm, fontWeight: fontWeight.semibold,
              color: tokens.textSecondary, textTransform: 'uppercase',
              letterSpacing: letterSpacing.wider, marginBottom: spacing.sm,
              fontFamily: tokens.fontFamilyBody,
            }}>CSS Code</h2>
            <CodeBlock code={currentVariant.cssCode} />
          </section>

          {/* Variants */}
          {pattern.variants.length > 0 && (
            <VariantsSection
              patternId={activePattern}
              variants={pattern.variants}
              activeIndex={activeVariant}
              onSelect={setActiveVariant}
            />
          )}
        </div>
      </div>
    </div>
  )
}
