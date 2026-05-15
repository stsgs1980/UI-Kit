'use client'

import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight } from '@/lib/layout/tokens'
import registryData from '@/data/component-registry.json'
import { ComponentPreview } from './component-preview'
import { hasDemo } from '@/data/demo-registry'
import { COMPONENT_MAP } from '@/data/component-map'
import { UI_DEMO_MAP } from '@/data/ui-demos'
import type { PreviewInfo } from './preview-utils'

// ─── Types ────────────────────────────────────────────────

interface ComponentEntry { name: string; layer: string; lines: number; description: string; exports: string[]; hasForwardRef: boolean; hasCn: boolean }
interface RegistryLayer { layers: Record<string, ComponentEntry[]>; totals: Record<string, number>; grandTotal: number }

const registry = registryData as RegistryLayer

const LAYER_META: Record<string, { label: string; color: string; description: string }> = {
  ui:       { label: 'UI Primitives', color: '#10B981', description: 'Fundamental building blocks' },
  sections: { label: 'Sections',      color: '#3B82F6', description: 'Page-level compositions' },
  features: { label: 'Features',      color: '#8B5CF6', description: 'Interactive components' },
}

// ─── Component ────────────────────────────────────────────

export function ComponentBrowserView({ activeLayer, activeComponent, tokens }: { activeLayer: string; activeComponent: string; tokens: ThemeTokens }) {
  const components = registry.layers[activeLayer] ?? []
  const meta = LAYER_META[activeLayer]
  const totalForLayer = registry.totals[activeLayer] ?? 0

  if (!meta) return null

  const liveCount = components.filter(c => {
    const inDemo = hasDemo(c.name)
    return inDemo && (c.name in COMPONENT_MAP || c.name in UI_DEMO_MAP)
  }).length

  return (
    <div style={{ padding: '20px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontSize: 16, fontWeight: fontWeight.bold, fontFamily: tokens.fontFamilyDisplay,
          color: tokens.textPrimary, lineHeight: 1.2, marginBottom: 2,
        }}>
          {activeLayer}/
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
          }}>{totalForLayer} components</span>
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
        {components.map(comp => {
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
              }}
            >
              <ComponentPreview {...info} tokens={tokens} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
