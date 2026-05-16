/**
 * VariantsSection — shows variant tabs + demo + code for a pattern.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight, letterSpacing, spacing } from '@/lib/layout/tokens'
import type { PatternDefinition, PatternVariant } from './types'
import { CopyButton } from './copy-button'
import { CodeBlock } from './code-block'
import { PatternDemo } from './pattern-demo'

export function VariantsSection({
  patternId,
  variants,
  activeIndex,
  onSelect,
}: {
  patternId: PatternDefinition['id']
  variants: PatternVariant[]
  activeIndex: number
  onSelect: (i: number) => void
}) {
  const { tokens } = useLayoutTheme()
  const current = variants[activeIndex]

  return (
    <section>
      <h2 style={{
        fontSize: fontSize.sm, fontWeight: fontWeight.semibold,
        color: tokens.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: letterSpacing.wider,
        marginBottom: spacing.md,
        fontFamily: tokens.fontFamilyBody,
      }}>
        Variants
      </h2>

      {/* Variant Tabs */}
      <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.md }}>
        {variants.map((v, i) => (
          <button
            key={v.name}
            onClick={() => onSelect(i)}
            style={{
              padding: `${spacing.sm}px ${spacing.base}px`,
              fontSize: fontSize.sm,
              fontWeight: activeIndex === i ? fontWeight.semibold : fontWeight.regular,
              fontFamily: tokens.fontFamilyMono,
              color: activeIndex === i ? tokens.accentPrimary : tokens.textMuted,
              background: activeIndex === i ? tokens.accentGlow : 'transparent',
              border: `1px solid ${activeIndex === i ? tokens.accentPrimary : tokens.borderSubtle}`,
              borderRadius: tokens.cornerRadius,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              if (activeIndex !== i) {
                e.currentTarget.style.borderColor = tokens.borderBright
                e.currentTarget.style.color = tokens.textSecondary
              }
            }}
            onMouseLeave={e => {
              if (activeIndex !== i) {
                e.currentTarget.style.borderColor = tokens.borderSubtle
                e.currentTarget.style.color = tokens.textMuted
              }
            }}
          >
            {v.name}
          </button>
        ))}
      </div>

      {/* Variant Demo + Code */}
      <PatternDemo
        id={patternId}
        variant={current.name.toLowerCase().replace(/\s+/g, '-')}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: spacing.sm }}>
        <CopyButton code={current.cssCode} />
      </div>
      <div style={{ marginTop: spacing.md }}>
        <CodeBlock code={current.cssCode} />
      </div>
    </section>
  )
}
