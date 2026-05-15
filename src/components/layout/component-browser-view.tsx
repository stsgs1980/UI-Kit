'use client'

import { useState, Suspense } from 'react'
import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight } from '@/lib/layout/tokens'
import registryData from '@/data/component-registry.json'
import { LivePreview, HookPreview, PreviewPlaceholder, resolvePreview } from './preview-utils'
import { UI_DEMO_MAP } from '@/data/ui-demos'
import { ErrorBoundary } from './error-boundary'
import { CodeMetaPanel } from './code-meta-panel'
import { Search } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────

interface Comp { name: string; layer: string; lines: number; description: string; exports: string[]; hasForwardRef: boolean; hasCn: boolean }
interface Registry { layers: Record<string, Comp[]>; totals: Record<string, number> }

const registry = registryData as Registry

const META: Record<string, { label: string; color: string }> = {
  ui:       { label: 'UI Primitives', color: '#10B981' },
  sections: { label: 'Sections',      color: '#3B82F6' },
  features: { label: 'Features',      color: '#8B5CF6' },
}

// ─── Three-Panel Component Browser ───────────────────────

export function ComponentBrowserView({ activeLayer, activeComponent, tokens, onSelectComponent }: {
  activeLayer: string; activeComponent: string; tokens: ThemeTokens; onSelectComponent: (n: string) => void
}) {
  const [search, setSearch] = useState('')
  const allComps = registry.layers[activeLayer] ?? []
  const meta = META[activeLayer]
  if (!meta) return null

  const q = search.toLowerCase()
  const filtered = allComps.filter(c => !q || c.name.includes(q) || c.description.includes(q))
  const selected = allComps.find(c => c.name === activeComponent) ?? filtered[0]
  const { hasComp, hasUi, hasHook, demo } = resolvePreview(selected?.name ?? '')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Panel 1: List */}
      <div style={{ width: 200, flexShrink: 0, borderRight: `1px solid ${tokens.borderSubtle}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px 12px', borderBottom: `1px solid ${tokens.borderSubtle}` }}>
          <div style={{ fontSize: 13, fontWeight: fontWeight.bold, color: tokens.textPrimary, fontFamily: tokens.fontFamilyDisplay }}>
            {activeLayer}/<span style={{ color: tokens.textMuted, fontWeight: fontWeight.regular }}> {meta.label}</span>
          </div>
          <div style={{ fontSize: 10, color: tokens.textDim, fontFamily: tokens.fontFamilyMono, marginTop: 2 }}>{allComps.length} components</div>
        </div>
        <div style={{ padding: '6px 8px', borderBottom: `1px solid ${tokens.borderSubtle}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', background: tokens.bgSurface, borderRadius: 6, border: `1px solid ${tokens.borderSubtle}` }}>
            <Search style={{ width: 11, height: 11, color: tokens.textDim, flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 11, fontFamily: tokens.fontFamilyBody, color: tokens.textPrimary }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(comp => {
            const active = comp.name === activeComponent
            return (
              <button key={comp.name} onClick={() => onSelectComponent(comp.name)} style={{
                width: '100%', textAlign: 'left', padding: '6px 12px', fontSize: 12,
                fontFamily: tokens.fontFamilyMono, color: active ? meta.color : tokens.textSecondary,
                background: active ? `${meta.color}10` : 'transparent', border: 'none', cursor: 'pointer',
                borderBottom: `1px solid ${tokens.borderSubtle}40`, transition: 'background 0.1s, color 0.1s',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = tokens.bgSurface }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ fontWeight: active ? fontWeight.medium : fontWeight.regular, marginBottom: 1 }}>{comp.name}</div>
                <div style={{ fontSize: 10, fontFamily: tokens.fontFamilyBody, color: tokens.textDim, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170 }}>{comp.description.slice(0, 50)}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Panel 2: Preview */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${tokens.borderSubtle}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9, fontWeight: fontWeight.bold, fontFamily: tokens.fontFamilyMono, padding: '2px 6px', borderRadius: 4, background: `${meta.color}15`, color: meta.color, textTransform: 'uppercase' }}>
            {selected?.layer ?? activeLayer}
          </span>
          <span style={{ fontSize: 14, fontWeight: fontWeight.semibold, color: tokens.textPrimary, fontFamily: tokens.fontFamilyBody }}>{selected?.name ?? 'Select a component'}</span>
          {selected?.description && <span style={{ fontSize: 11, color: tokens.textMuted, fontFamily: tokens.fontFamilyBody, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected.description}</span>}
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 20, background: tokens.bgDeep, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 480 }}>
            {selected ? (
              <Suspense fallback={<PreviewPlaceholder name={selected.name} tokens={tokens} />}>
                {hasHook
                  ? <HookPreview name={selected.name} tokens={tokens} />
                  : hasComp && demo
                    ? <LivePreview name={selected.name} demo={demo!} />
                    : hasUi
                      ? <ErrorBoundary><div key={selected.name}>{UI_DEMO_MAP[selected.name]()}</div></ErrorBoundary>
                      : <PreviewPlaceholder name={selected.name} tokens={tokens} />}
              </Suspense>
            ) : <PreviewPlaceholder tokens={tokens} />}
          </div>
        </div>
      </div>

      {/* Panel 3: Code + Meta */}
      {selected && <CodeMetaPanel comp={selected} layer={activeLayer} meta={meta} tokens={tokens} />}
    </div>
  )
}
