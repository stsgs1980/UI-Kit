'use client'

import type { LayoutRecipe } from '@/lib/layout/types'
import { categoryMeta } from '@/lib/layout/types'
import { CodeDrawer } from './code-drawer'
import { ExplorerSidebar } from './explorer-sidebar'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize, fontWeight } from '@/lib/layout/tokens'
import { useExplorerFilters } from './use-explorer-filters'
import type { ViewTab, ViewMode } from './use-explorer-filters'
import { useExplorerSelection } from './use-explorer-selection'
import { useEffect, useRef } from 'react'
import { ExplorerGridView } from './explorer-grid-view'
import { ExplorerListView } from './explorer-list-view'
import { ComponentBrowserView } from './component-browser-view'
import { SegmentedControl } from './segmented-control'
import { Eye, Code2, FileCode, Play, Grid3X3, List } from 'lucide-react'

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

  // Sync: scroll to active component card in the grid
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (activeComponent && activeLayer) {
      const el = contentRef.current?.querySelector(`[data-comp="${activeComponent}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeComponent, activeLayer])

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
        {/* Contextual bar */}
        <div style={{
          height: 40, borderBottom: `1px solid ${tokens.borderSubtle}`,
          display: 'flex', alignItems: 'center', padding: '0 20px',
          background: tokens.bgBase, transition: 'background 0.3s',
        }}>
          <div style={{
            fontSize: 13, fontWeight: fontWeight.medium, fontFamily: tokens.fontFamilyMono, color: tokens.textDim,
          }}>
            <span style={{ color: activeLayer ? tokens.textPrimary : tokens.textMuted }}>
              {activeLayer ? `${activeLayer}/` : 'layouts'}
            </span>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            {!activeLayer && (
              <SegmentedControl items={viewTabs} active={viewTab} onChange={setViewTab} tokens={tokens} />
            )}
            {!activeLayer && (
              <SegmentedControl items={modeTabs} active={viewMode} onChange={setViewMode} tokens={tokens} />
            )}
          </div>
        </div>

        {/* Content */}
        {activeLayer ? (
          <div ref={contentRef} style={{ flex: 1, overflowY: 'auto' }}>
            <ComponentBrowserView activeLayer={activeLayer} activeComponent={activeComponent} tokens={tokens} />
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 16, fontWeight: fontWeight.bold,
                fontFamily: tokens.fontFamilyDisplay,
              }}>
                {selectedCategory ? (categoryMeta[selectedCategory]?.label ?? selectedCategory) : 'Layouts'}
              </div>
              <div style={{
                fontSize: 12, fontFamily: tokens.fontFamilyBody,
                color: tokens.textSecondary, marginTop: 4,
              }}>
                {filtered.length} layouts{ranked.filter(r => r.verdict === 'recommended').length > 0
                  ? `. ${ranked.filter(r => r.verdict === 'recommended').length} recommended`
                  : ''}
              </div>
            </div>

            {viewMode === 'grid'
              ? <ExplorerGridView {...viewProps} />
              : <ExplorerListView {...viewProps} />
            }
          </div>
        )}

        {selected && !activeLayer && <CodeDrawer recipe={selected.recipe} />}
      </div>
    </div>
  )
}
