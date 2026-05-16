'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontWeight, fontSizeInterp } from '@/lib/layout/tokens'

// ─── Types ────────────────────────────────────────────────

interface LayerItemDef {
  icon: string; label: string; count: number; key: string
}

interface ComponentEntry {
  name: string; layer: string; description: string
}

interface ExpandableLayersProps {
  items: LayerItemDef[]
  layers: Record<string, ComponentEntry[]>
  expanded: string | null
  onToggle: (key: string | null) => void
  onLayerChange: (layer: string) => void
  onSelectComponent: (name: string) => void
  activeLayer: string
  activeComponent: string
  filterSearch: string
}

// ─── Layer filter buttons (no inline list — main area shows grid) ──

export function ExpandableLayers({
  items, layers, expanded, onToggle, onLayerChange, onSelectComponent, activeLayer, filterSearch,
}: ExpandableLayersProps) {
  const { tokens } = useLayoutTheme()

  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{
        fontSize: fontSizeInterp[9], fontWeight: fontWeight.bold, textTransform: 'uppercase',
        letterSpacing: 1, color: tokens.sidebarMuted, padding: '10px 16px 4px',
        fontFamily: tokens.fontFamilyBody,
      }}>Layers</div>

      {items.map(item => {
        const children = (layers[item.key] ?? [])
          .filter(c => !filterSearch || c.name.includes(filterSearch) || c.description.includes(filterSearch))
        const isActive = activeLayer === item.key
        const isEmpty = filterSearch && children.length === 0

        if (isEmpty) return null

        return (
          <button
            key={item.key}
            onClick={() => {
              onToggle(isActive ? null : item.key)
              onLayerChange(isActive ? '' : item.key)
              onSelectComponent('')
            }}
            aria-pressed={isActive}
            aria-label={item.label}
            style={{
              fontSize: fontSizeInterp[12], fontFamily: tokens.fontFamilyBody,
              padding: '5px 16px', display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', transition: 'background 0.15s',
              background: isActive ? `${tokens.accentPrimary}18` : 'transparent',
              borderRight: isActive ? `2px solid ${tokens.accentPrimary}` : '2px solid transparent',
              borderLeft: 'none', borderTop: 'none', borderBottom: 'none',
              color: isActive ? tokens.accentPrimary : tokens.sidebarText,
              width: '100%', textAlign: 'left',
            }}
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.background = tokens.sidebarBorder
            }}
            onMouseLeave={e => {
              if (!isActive) e.currentTarget.style.background = 'transparent'
            }}
          >
            <span style={{ fontSize: fontSizeInterp[12], opacity: isActive ? 1 : 0.5, width: 18, textAlign: 'center' }}>
              {item.icon}
            </span>
            <span style={{ flex: 1 }}>{item.label}</span>
            <span style={{
              fontSize: fontSizeInterp[9], background: `${tokens.sidebarBorder}`,
              padding: '1px 6px', borderRadius: 8, color: tokens.sidebarMuted,
              fontFamily: tokens.fontFamilyMono,
            }}>
              {filterSearch ? children.length : item.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
