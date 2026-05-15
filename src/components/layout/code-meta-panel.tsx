'use client'

import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight } from '@/lib/layout/tokens'
import { CopyButton } from './copy-button'
import { resolvePreview } from './preview-utils'

// ─── Types ────────────────────────────────────────────────

interface CompInfo { name: string; layer: string; lines: number; description: string; exports: string[]; hasForwardRef: boolean; hasCn: boolean }

// ─── Helpers ─────────────────────────────────────────────

function getImportPath(layer: string, name: string) {
  const map: Record<string, string> = { ui: 'ui', sections: 'sections', features: 'features', hooks: 'hooks', providers: 'providers' }
  const dir = map[layer] ?? layer
  return `import { ${name} } from '@stsgs/${dir}/${name}'`
}

// ─── Code + Meta Panel ──────────────────────────────────

export function CodeMetaPanel({ comp, layer, meta, tokens }: {
  comp: CompInfo; layer: string; meta: { label: string; color: string }; tokens: ThemeTokens
}) {
  const { canPreview } = resolvePreview(comp.name)

  return (
    <div style={{
      width: 240, flexShrink: 0, borderLeft: `1px solid ${tokens.borderSubtle}`,
      display: 'flex', flexDirection: 'column', overflow: 'auto',
    }}>
      {/* Import */}
      <div style={{ padding: 12 }}>
        <SectionLabel tokens={tokens}>Import</SectionLabel>
        <div style={{
          fontSize: 11, fontFamily: tokens.fontFamilyMono, lineHeight: 1.6,
          padding: '10px 12px', borderRadius: 6, background: tokens.bgDeep,
          border: `1px solid ${tokens.borderSubtle}`, color: tokens.textSecondary,
        }}>
          <Kw color="#C084FC">import</Kw>{' {'}
          <span style={{ color: tokens.textPrimary }}>{comp.exports[0] ?? comp.name}</span>
          {'} '}
          <Kw color="#C084FC">from</Kw>{' '}
          <Str>&apos;@stsgs/{layer}/{comp.name}&apos;</Str>
        </div>
        <div style={{ marginTop: 6 }}><CopyButton text={getImportPath(layer, comp.name)} tokens={tokens} /></div>
      </div>
      {/* Description */}
      <div style={{ padding: '0 12px 12px' }}>
        <SectionLabel tokens={tokens}>Description</SectionLabel>
        <div style={{ fontSize: 12, fontFamily: tokens.fontFamilyBody, color: tokens.textSecondary, lineHeight: 1.6 }}>{comp.description}</div>
      </div>
      {/* Properties */}
      <div style={{ padding: '0 12px 12px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        <Badge bg={tokens.bgSurface} color={tokens.textDim}>{comp.lines}L</Badge>
        {comp.hasForwardRef && <Badge bg="#10B98115" color="#10B981">forwardRef</Badge>}
        {comp.hasCn && <Badge bg="#3B82F615" color="#3B82F6">cn()</Badge>}
        {canPreview && <Badge bg={`${meta.color}15`} color={meta.color}>live</Badge>}
      </div>
      {/* Exports */}
      {comp.exports.length > 0 && (
        <div style={{ padding: '0 12px 12px' }}>
          <SectionLabel tokens={tokens}>Exports</SectionLabel>
          {comp.exports.map(e => (
            <div key={e} style={{ fontSize: 11, fontFamily: tokens.fontFamilyMono, color: tokens.textMuted, padding: '1px 0' }}>{e}</div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Tiny helpers ────────────────────────────────────────

function SectionLabel({ tokens, children }: { tokens: ThemeTokens; children: React.ReactNode }) {
  return <div style={{ fontSize: 9, color: tokens.textDim, fontFamily: tokens.fontFamilyMono, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{children}</div>
}

function Badge({ bg, color, children }: { bg: string; color: string; children: React.ReactNode }) {
  return <span style={{ fontSize: 10, fontFamily: 'monospace', padding: '2px 8px', borderRadius: 4, background: bg, color }}>{children}</span>
}

function Kw({ color, children }: { color: string; children: React.ReactNode }) {
  return <span style={{ color }}>{children}</span>
}

function Str({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#34D399' }}>{children}</span>
}
