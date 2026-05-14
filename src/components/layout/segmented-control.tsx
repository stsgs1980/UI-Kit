'use client'

import { fontSize, fontWeight } from '@/lib/layout/tokens'

// ─── Segmented Control (joined button group) ──────────────

interface SegmentedItem<T extends string> {
  key: T
  label: string
  Icon: React.ComponentType<{ width?: number; height?: number }>
}

interface SegmentedControlProps<T extends string> {
  items: SegmentedItem<T>[]
  active: T
  onChange: (v: T) => void
  tokens: Record<string, string>
}

export function SegmentedControl<T extends string>({
  items, active, onChange, tokens,
}: SegmentedControlProps<T>) {
  return (
    <div role="tablist" style={{
      display: 'flex',
      border: `1px solid ${tokens.borderSubtle}`,
      borderRadius: tokens.cornerRadius,
      overflow: 'hidden',
    }}>
      {items.map((item, i) => {
        const isActive = active === item.key
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            role="tab"
            aria-selected={isActive}
            style={{
              fontSize: 10, fontWeight: fontWeight.medium,
              fontFamily: tokens.fontFamilyBody,
              padding: '3px 9px',
              display: 'flex', alignItems: 'center', gap: 4,
              background: isActive ? tokens.accentPrimary : 'transparent',
              color: isActive ? tokens.textOnAccent : tokens.textDim,
              border: 'none',
              borderRight: i < items.length - 1 ? `1px solid ${tokens.borderSubtle}` : 'none',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
            <item.Icon width={11} height={11} />
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
