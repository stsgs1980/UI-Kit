'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import type { ParsedPrompt } from '@/lib/layout/types'
import { CATEGORIES, categoryMeta } from '@/lib/layout/types'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'
import registryData from '@/data/component-registry.json'
import { ExpandableLayers } from './expandable-layers'
import { GoalFilters } from './goal-filters'

// ─── Registry data ─────────────────────────────────────────

type RegistryTotals = Record<string, number>
type ComponentEntry = { name: string; layer: string; description: string }
const totals = (registryData as { totals: RegistryTotals }).totals
const layers = (registryData as { layers: Record<string, ComponentEntry[]> }).layers

const LAYER_ITEMS = [
  { icon: '\u25C6', label: 'ui/',        count: totals.ui ?? 0,        key: 'ui' },
  { icon: '\u25C7', label: 'sections/',   count: totals.sections ?? 0,  key: 'sections' },
  { icon: '\u25C8', label: 'features/',   count: totals.features ?? 0,  key: 'features' },
]

const CATEGORY_ITEMS = CATEGORIES.map(cat => ({
  icon: categoryMeta[cat]?.label === 'Classic' ? '\u25A4'
    : categoryMeta[cat]?.label === 'Bento' ? '\u2B21'
    : categoryMeta[cat]?.label === 'Artistic' ? '\u25C8'
    : categoryMeta[cat]?.label === 'Math' ? '\u25B3'
    : categoryMeta[cat]?.label === 'App' ? '\u25C9'
    : '\u2B1A',
  label: categoryMeta[cat]?.label ?? cat,
  key: cat,
}))

// ─── Sidebar ───────────────────────────────────────────────

interface ExplorerSidebarProps {
  recipeCount: number
  selectedCategory: string | null
  onCategoryChange: (cat: string | null) => void
  activeLayer: string
  onLayerChange: (layer: string) => void
  activeComponent: string
  onSelectComponent: (name: string) => void
  activeGoal: string
  onGoalSelect: (parsed: ParsedPrompt) => void
  catCounts: Record<string, number>
  searchQuery: string
  onSearchChange: (q: string) => void
}

export function ExplorerSidebar({
  selectedCategory, onCategoryChange,
  activeLayer, onLayerChange, activeComponent, onSelectComponent,
  activeGoal, onGoalSelect, catCounts,
  searchQuery, onSearchChange,
}: ExplorerSidebarProps) {
  const { tokens } = useLayoutTheme()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <nav aria-label="Component navigation" style={{
      width: 240, flexShrink: 0,
      background: tokens.sidebarBg, color: tokens.sidebarText,
      display: 'flex', flexDirection: 'column',
      borderRight: `1px solid ${tokens.sidebarBorder}`,
      transition: 'background 0.3s',
    }}>
      {/* Search */}
      <div style={{ padding: '12px 12px 8px' }}>
        <div role="search" style={{
          padding: '7px 10px', background: `${tokens.sidebarBorder}`,
          border: `1px solid ${searchFocused ? tokens.accentPrimary + '50' : tokens.sidebarBorder}`, borderRadius: tokens.cornerRadius,
          fontSize: 11, color: tokens.sidebarMuted, fontFamily: tokens.fontFamilyBody,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Search style={{ width: 12, height: 12 }} aria-hidden="true" />
          <input
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search layouts..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 11, fontFamily: tokens.fontFamilyBody, color: tokens.textPrimary,
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {!searchQuery && (
            <kbd style={{
              fontSize: 9, background: `${tokens.sidebarBorder}`,
              padding: '1px 5px', borderRadius: 3, fontFamily: tokens.fontFamilyMono,
            }}>/</kbd>
          )}
        </div>
      </div>
      {/* Nav sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0', scrollbarGutter: 'stable' }}>
        <ExpandableLayers
          items={LAYER_ITEMS}
          layers={layers}
          expanded={expanded}
          onToggle={setExpanded}
          onLayerChange={onLayerChange}
          onSelectComponent={onSelectComponent}
          activeLayer={activeLayer}
          activeComponent={activeComponent}
          filterSearch={searchQuery.toLowerCase()}
        />

        {/* Categories */}
        <div style={{ marginBottom: 4 }}>
          <div style={{
            fontSize: 9, fontWeight: fontWeight.bold, textTransform: 'uppercase',
            letterSpacing: 1, color: tokens.sidebarMuted, padding: '10px 16px 4px',
            fontFamily: tokens.fontFamilyBody,
          }}>Categories</div>
          {CATEGORY_ITEMS.map(item => {
            const isActive = selectedCategory === item.key
            const count = catCounts[item.key] ?? 0
            return (
              <button key={item.key}
                onClick={() => onCategoryChange(selectedCategory === item.key ? null : item.key)}
                aria-pressed={isActive} aria-label={item.label}
                style={{
                  fontSize: 12, fontFamily: tokens.fontFamilyBody,
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
                <span style={{ fontSize: 12, opacity: isActive ? 1 : 0.5, width: 18, textAlign: 'center' }}>
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

        <GoalFilters activeGoal={activeGoal} onGoalSelect={onGoalSelect} />
      </div>
    </nav>
  )
}
