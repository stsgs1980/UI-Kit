'use client'

import { useState } from 'react'
import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight } from '@/lib/layout/tokens'
import registryData from '@/data/component-registry.json'
import { ComponentPreview } from './component-preview'
import { hasDemo } from '@/data/demo-registry'
import { COMPONENT_MAP } from '@/data/component-map'
import { UI_DEMO_MAP } from '@/data/ui-demos'
import type { PreviewInfo } from './preview-utils'
import { ChevronDown } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────

interface ComponentEntry { name: string; layer: string; lines: number; description: string; exports: string[]; hasForwardRef: boolean; hasCn: boolean }
interface RegistryLayer { layers: Record<string, ComponentEntry[]>; totals: Record<string, number>; grandTotal: number }

const registry = registryData as RegistryLayer

const LAYER_META: Record<string, { label: string; color: string; description: string }> = {
  ui:       { label: 'UI Primitives', color: '#10B981', description: 'Fundamental building blocks' },
  sections: { label: 'Sections',      color: '#3B82F6', description: 'Page-level compositions' },
  features: { label: 'Features',      color: '#8B5CF6', description: 'Interactive components' },
}

const PAGE_SIZE = 18

// ─── Paginated Grid (re-mounts when layer key changes) ───

function PaginatedGrid({ components, meta, activeComponent, tokens }: {
  components: ComponentEntry[]; meta: NonNullable<typeof LAYER_META[string]>;
  activeComponent: string; tokens: ThemeTokens
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const liveCount = components.filter(c => {
    const inDemo = hasDemo(c.name)
    return inDemo && (c.name in COMPONENT_MAP || c.name in UI_DEMO_MAP)
  }).length

  const visible = components.slice(0, visibleCount)
  const hasMore = visibleCount < components.length
  const remaining = components.length - visibleCount

  return (
    <div style={{ padding: '20px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontSize: 16, fontWeight: fontWeight.bold, fontFamily: tokens.fontFamilyDisplay,
          color: tokens.textPrimary, lineHeight: 1.2, marginBottom: 2,
        }}>
          {components[0]?.layer ?? ''}/
          <span style={{ fontSize: 13, fontWeight: fontWeight.regular, color: tokens.textSecondary, marginLeft: 6 }}>
            {meta.label}
          </span>
        </div>
        <div style={{ fontSize: 12, fontFamily: tokens.fontFamilyBody, color: tokens.textMuted, marginTop: 4 }}>
          {meta.description}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <span style={{
            fontSize: 11, fontFamily: tokens.fontFamilyMono,
            padding: '2px 8px', borderRadius: 4,
            background: `${meta.color}15`, color: meta.color, fontWeight: fontWeight.semibold,
          }}>{components.length} components</span>
          {liveCount > 0 && (
            <span style={{
              fontSize: 10, fontFamily: tokens.fontFamilyMono,
              padding: '2px 7px', borderRadius: 4,
              background: tokens.bgDeep, color: tokens.textMuted,
            }}>{liveCount} live</span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
        {visible.map(comp => {
          const info: PreviewInfo = {
            name: comp.name, layer: comp.layer, description: comp.description,
            lines: comp.lines, exports: comp.exports,
            hasForwardRef: comp.hasForwardRef, hasCn: comp.hasCn,
            layerColor: meta.color,
          }
          const isHighlighted = activeComponent === comp.name
          return (
            <div
              key={comp.name}
              data-comp={comp.name}
              style={{
                borderRadius: 8,
                outline: isHighlighted ? `2px solid ${meta.color}` : 'none',
                outlineOffset: -2,
                transition: 'outline 0.2s',
                overflow: 'hidden',
                contain: 'layout style paint',
                position: 'relative',
                isolation: 'isolate',
              }}
            >
              <ComponentPreview {...info} tokens={tokens} />
            </div>
          )
        })}
      </div>

      {/* Load More */}
      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, paddingBottom: 16 }}>
          <button
            onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 20px', borderRadius: 8,
              background: `${meta.color}12`, color: meta.color,
              border: `1px solid ${meta.color}25`,
              cursor: 'pointer', fontSize: 12, fontWeight: fontWeight.medium,
              fontFamily: tokens.fontFamilyBody,
              transition: 'background 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${meta.color}20` }}
            onMouseLeave={e => { e.currentTarget.style.background = `${meta.color}12` }}
          >
            Show {Math.min(PAGE_SIZE, remaining)} more
            <span style={{ fontSize: 10, color: tokens.textMuted }}>({remaining} remaining)</span>
            <ChevronDown style={{ width: 14, height: 14 }} />
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Component Browser View ───────────────────────────────

export function ComponentBrowserView({ activeLayer, activeComponent, tokens }: { activeLayer: string; activeComponent: string; tokens: ThemeTokens }) {
  const components = registry.layers[activeLayer] ?? []
  const meta = LAYER_META[activeLayer]

  if (!meta) return null

  // key={activeLayer} forces re-mount and resets pagination when layer changes
  return <PaginatedGrid key={activeLayer} components={components} meta={meta} activeComponent={activeComponent} tokens={tokens} />
}
