'use client'

import type { LayoutAdviceInput } from '@/lib/layout/types'
import { GOALS } from '@/lib/layout/types'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

// ─── Goal Filters ─────────────────────────────────────────

interface GoalFiltersProps {
  input: LayoutAdviceInput
  onGoalSelect: (parsed: LayoutAdviceInput) => void
}

export function GoalFilters({ input, onGoalSelect }: GoalFiltersProps) {
  const { tokens } = useLayoutTheme()

  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{
        fontSize: 9, fontWeight: fontWeight.bold, textTransform: 'uppercase',
        letterSpacing: 1, color: tokens.sidebarMuted, padding: '10px 16px 4px',
        fontFamily: tokens.fontFamilyBody,
      }}>Best For</div>
      {GOALS.slice(0, 8).map(g => {
        const isActive = input.goal === g.value
        return (
          <button key={g.value}
            onClick={() => onGoalSelect({
              goal: g.value, contentType: 'cards', itemCount: 6,
              needsSidebar: false, needsHeader: true, needsFooter: false,
              detected: [g.label], goalWeights: { [g.value]: 1 },
            })}
            aria-pressed={isActive}
            aria-label={g.label}
            style={{
              fontSize: 12, fontFamily: tokens.fontFamilyBody,
              padding: '5px 16px', display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', transition: 'background 0.15s',
              background: isActive ? `${tokens.accentPrimary}18` : 'transparent',
              border: 'none', color: isActive ? tokens.accentPrimary : tokens.sidebarText,
              width: '100%', textAlign: 'left',
            }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: g.color, opacity: isActive ? 1 : 0.5,
            }} />
            {g.label}
          </button>
        )
      })}
    </div>
  )
}
