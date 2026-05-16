'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import type { ParsedPrompt } from '@/lib/layout/types'
import { CATEGORIES, categoryMeta } from '@/lib/layout/types'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontSizeInterp, fontWeight } from '@/lib/layout/tokens'
import registryData from '@/data/component-registry.json'
import { ExpandableLayers } from './expandable-layers'
import { GoalFilters } from './goal-filters'
import { SidebarCategories } from './sidebar-categories'

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
      width: 233, flexShrink: 0,
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
          fontSize: fontSizeInterp[11], color: tokens.sidebarMuted, fontFamily: tokens.fontFamilyBody,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Search style={{ width: 12, height: 12 }} aria-hidden="true" />
          <input
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search layouts..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: fontSizeInterp[11], fontFamily: tokens.fontFamilyBody, color: tokens.textPrimary,
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {!searchQuery && (
            <kbd style={{
              fontSize: fontSizeInterp[9], background: `${tokens.sidebarBorder}`,
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

        <SidebarCategories
          selected={selectedCategory}
          onSelect={onCategoryChange}
          counts={catCounts}
        />

        <GoalFilters activeGoal={activeGoal} onGoalSelect={onGoalSelect} />
      </div>
    </nav>
  )
}
