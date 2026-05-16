'use client'

import type { LayoutRecipe } from '@/lib/layout/types'
import { categoryMeta } from '@/lib/layout/types'
import { CodeDrawer } from './code-drawer'
import { ExplorerSidebar } from './explorer-sidebar'
import { useLayoutTheme } from '@/lib/layout/theme'
import { useExplorerFilters } from './use-explorer-filters'
import type { ViewTab, ViewMode } from './use-explorer-filters'
import { useExplorerSelection } from './use-explorer-selection'
import { useEffect, useRef } from 'react'
import { ExplorerGridView } from './explorer-grid-view'
import { ExplorerListView } from './explorer-list-view'
import { ComponentBrowserView } from './component-browser-view'
import { ComponentGridView } from './component-grid-view'
import { SegmentedControl } from './segmented-control'
import { Eye, Code2, FileCode, Play, Grid3X3, List } from 'lucide-react'
import registryData from '@/data/component-registry.json'

// ─── Component registry (for grid view) ──────────────────

interface CompEntry { name: string; layer: string; lines: number; description: string; exports: string[]; hasForwardRef: boolean; hasCn: boolean }
type RegistryLayers = Record<string, CompEntry[]>
const registryLayers = (registryData as { layers: RegistryLayers }).layers
const allComponents = Object.values(registryLayers).flat()

// ─── Layout Explorer ─────────────────────────────────────────

export function VariantLayoutExplorer({ recipes }: { recipes: LayoutRecipe[] }) {
  const { tokens } = useLayoutTheme()
  const {
    selectedCategory, setSelectedCategory,
    activeLayer, setActiveLayer,
    activeComponent, setActiveComponent,
    viewTab, setViewTab,
    viewMode, setViewMode,
    searchQuery, setSearchQuery,
  } = useExplorerFilters()
  const {
    selectedRecipe, setSelectedRecipe,
    parsed, setParsed,
    ranked, filtered, selected, best,
    catCounts, input,
  } = useExplorerSelection(recipes, selectedCategory, searchQuery)

  // Sync: auto-clear category if it produces 0 results
  useEffect(() => {
    if (selectedCategory && (catCounts[selectedCategory] ?? 0) === 0) {
      setSelectedCategory(null)
    }
  }, [catCounts, selectedCategory, setSelectedCategory])

  // Sync: reset category when goal filter changes
  useEffect(() => {
    if (parsed) setSelectedCategory(null)
  }, [parsed, setSelectedCategory])

  // Sync: contain preview area to prevent portal bleed-through
  useEffect(() => {
    if (activeLayer) {
      document.body.setAttribute('data-preview-mode', '')
      return () => document.body.removeAttribute('data-preview-mode')
    }
  }, [activeLayer])

  const contentRef = useRef<HTMLDivElement>(null)

  const viewProps = { filtered, best, selectedRecipe, setSelectedRecipe, tokens }

  const viewTabs: { key: ViewTab; label: string; Icon: typeof Eye }[] = [
    { key: 'preview', label: 'Preview', Icon: Eye },
    { key: 'code', label: 'Code', Icon: Code2 },
    { key: 'docs', label: 'Docs', Icon: FileCode },
    { key: 'playground', label: 'Play', Icon: Play },
  ]

  const modeTabs: { key: ViewMode; label: string; Icon: typeof Grid3X3 }[] = [
    { key: 'grid', label: 'Grid', Icon: Grid3X3 },
    { key: 'list', label: 'List', Icon: List },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', background: tokens.bgDeep, color: tokens.textPrimary, overflow: 'hidden', transition: 'background 0.3s, color 0.3s' }}>
      <ExplorerSidebar
        recipeCount={recipes.length}
        selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}
        activeLayer={activeLayer} onLayerChange={setActiveLayer}
        activeComponent={activeComponent} onSelectComponent={setActiveComponent}
        activeGoal={parsed?.goal ?? input.goal}
        onGoalSelect={setParsed}
        catCounts={catCounts}
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Breadcrumb bar */}
        <div data-slot="breadcrumb-bar" style={{
          height: 44, borderBottom: `1px solid ${tokens.borderSubtle}`,
          display: 'flex', alignItems: 'center', padding: '0 20px',
          background: tokens.bgBase, fontSize: 12, fontFamily: tokens.fontFamilyBody,
        }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <a style={{ color: tokens.textDim, cursor: 'pointer' }}>Library</a>
            <span style={{ color: tokens.textDim, opacity: 0.4 }}>/</span>
            <a style={{ color: tokens.textDim, cursor: 'pointer' }}>Packages</a>
            <span style={{ color: tokens.textDim, opacity: 0.4 }}>/</span>
            <span style={{ fontFamily: tokens.fontFamilyMono, color: tokens.accentPrimary }}>@stsgs/ui</span>
            <span style={{ color: tokens.textDim, opacity: 0.4 }}>/</span>
            <span style={{ color: tokens.textPrimary, fontWeight: 600 }}>{activeComponent || activeLayer || 'Components'}</span>
          </nav>
          {!activeComponent && (
            <div style={{
              marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: tokens.fontFamilyMono, fontSize: 11, color: tokens.textDim,
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1" y="1" width="4" height="4" rx="0.5"/><rect x="7" y="1" width="4" height="4" rx="0.5"/><rect x="1" y="7" width="4" height="4" rx="0.5"/><rect x="7" y="7" width="4" height="4" rx="0.5"/></svg>
                {(activeLayer ? (registryLayers[activeLayer] ?? []) : allComponents).length} shown
              </span>
              <span style={{ opacity: 0.3 }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 1L1 3.5v5L6 11l5-2.5v-5z"/><line x1="1" y1="3.5" x2="6" y2="6"/><line x1="6" y1="6" x2="11" y2="3.5"/><line x1="6" y1="6" x2="6" y2="11"/></svg>
                {allComponents.length} total
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        {activeComponent ? (
          <div ref={contentRef} style={{ flex: 1, overflow: 'hidden' }}>
            <ComponentBrowserView activeLayer={activeLayer || 'ui'} activeComponent={activeComponent} tokens={tokens} onSelectComponent={setActiveComponent} />
          </div>
        ) : (
          <ComponentGridView
            components={activeLayer ? (registryLayers[activeLayer] ?? []) : allComponents}
            activeComponent={activeComponent}
            onSelectComponent={setActiveComponent}
            tokens={tokens}
            title={activeLayer
              ? `${activeLayer}/ Components`
              : 'All Components'
            }
          />
        )}
      </div>
    </div>
  )
}
