'use client'

import { ChevronRight } from 'lucide-react'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'

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

// ─── Expandable Layer List ────────────────────────────────

export function ExpandableLayers({
  items, layers, expanded, onToggle, onLayerChange, onSelectComponent, activeLayer, activeComponent, filterSearch,
}: ExpandableLayersProps) {
  const { tokens } = useLayoutTheme()

  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{
        fontSize: 9, fontWeight: fontWeight.bold, textTransform: 'uppercase',
        letterSpacing: 1, color: tokens.sidebarMuted, padding: '10px 16px 4px',
        fontFamily: tokens.fontFamilyBody,
      }}>Layers</div>

      {items.map(item => {
        const children = (layers[item.key] ?? [])
          .filter(c => !filterSearch || c.name.includes(filterSearch) || c.description.includes(filterSearch))
        const isExpanded = expanded === item.key
        const isActive = activeLayer === item.key
        const isEmpty = filterSearch && children.length === 0

        if (isEmpty) return null

        return (
          <div key={item.key}>
            <button
              onClick={() => {
                const next = isExpanded ? null : item.key
                onToggle(next)
                if (isExpanded) onLayerChange('')
                else onLayerChange(item.key)
              }}
              aria-expanded={isExpanded}
              aria-label={item.label}
              style={{
                fontSize: 12, fontFamily: tokens.fontFamilyBody,
                padding: '5px 16px', display: 'flex', alignItems: 'center', gap: 8,
                cursor: 'pointer', transition: 'background 0.15s',
                background: isActive ? `${tokens.accentPrimary}18` : 'transparent',
                borderRight: isActive ? `2px solid ${tokens.accentPrimary}` : '2px solid transparent',
                borderLeft: 'none', borderTop: 'none', borderBottom: 'none',
                color: isActive ? tokens.accentPrimary : tokens.sidebarText,
                width: '100%', textAlign: 'left',
              }}>
              <span style={{ fontSize: 12, opacity: isActive ? 1 : 0.5, width: 18, textAlign: 'center' }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              <span style={{
                fontSize: 9, background: `${tokens.sidebarBorder}`,
                padding: '1px 6px', borderRadius: 8, color: tokens.sidebarMuted,
                fontFamily: tokens.fontFamilyMono,
              }}>
                {filterSearch ? children.length : item.count}
              </span>
              <ChevronRight style={{
                width: 12, height: 12, color: tokens.sidebarMuted,
                transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'none',
              }} />
            </button>

            {isExpanded && (
              <div style={{
                maxHeight: 240, overflowY: 'auto',
                borderBottom: `1px solid ${tokens.sidebarBorder}`,
              }}>
                {children.map(comp => (
                  <button
                    key={comp.name}
                    onClick={() => onSelectComponent(comp.name)}
                    style={{
                      fontSize: 11, fontFamily: tokens.fontFamilyMono,
                      padding: '3px 16px 3px 42px',
                      display: 'block', width: '100%', textAlign: 'left',
                      color: activeComponent === comp.name ? tokens.accentPrimary : tokens.sidebarMuted,
                      background: activeComponent === comp.name ? `${tokens.accentPrimary}10` : 'transparent',
                      border: 'none', cursor: 'pointer',
                      transition: 'color 0.1s, background 0.1s', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}
                    onMouseEnter={e => { if (activeComponent !== comp.name) e.currentTarget.style.color = tokens.textSecondary }}
                    onMouseLeave={e => { if (activeComponent !== comp.name) e.currentTarget.style.color = tokens.sidebarMuted }}
                  >
                    {comp.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
