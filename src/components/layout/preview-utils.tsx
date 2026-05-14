'use client'

import { Suspense } from 'react'
import { hasDemo, getDemo } from '@/data/demo-registry'
import { UI_DEMO_MAP } from '@/data/ui-demos'
import { COMPONENT_MAP } from '@/data/component-map'
import { HOOKS_API } from '@/data/hooks-api'
import { ErrorBoundary } from './error-boundary'
import type { ThemeTokens } from '@/lib/layout/theme-types'

// ─── Live Preview (component) ───────────────────────────

export function LivePreview({ name, demo }: { name: string; demo: NonNullable<ReturnType<typeof getDemo>> }) {
  const Comp = COMPONENT_MAP[name]
  if (!Comp || !demo) return null
  return (
    <ErrorBoundary>
      <div data-preview-isolate style={{
        position: 'relative', width: '100%',
        overflow: 'hidden',
      }}>
        <Comp {...demo.props}>{demo.children}</Comp>
      </div>
    </ErrorBoundary>
  )
}

// ─── Hook Preview (API card) ────────────────────────────

export function HookPreview({ name, tokens }: { name: string; tokens: ThemeTokens }) {
  const api = HOOKS_API[name]
  if (!api) return <PreviewPlaceholder name={name} tokens={tokens} />

  return (
    <div style={{
      width: '100%', fontFamily: tokens.fontFamilyMono, fontSize: 11,
      lineHeight: 1.6, color: tokens.textSecondary, padding: '4px 0',
    }}>
      {/* Signature */}
      <div style={{
        background: `${tokens.bgSurface}`,
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: 6, padding: '8px 10px', marginBottom: 6,
        fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        <span style={{ color: '#C084FC' }}>function</span>{' '}
        <span style={{ color: tokens.textPrimary, fontWeight: 600 }}>{api.signature}</span>
      </div>
      {/* Return */}
      <div style={{ fontSize: 9, color: tokens.textDim, marginBottom: 4 }}>
        <span style={{ color: '#34D399' }}>returns</span> {api.returns}
      </div>
      {/* Params (compact) */}
      {api.params.length > 0 && (
        <div style={{ fontSize: 9, color: tokens.textDim, marginBottom: 4 }}>
          {api.params.map((p, i) => (
            <span key={p.name}>
              {i > 0 && <span style={{ color: tokens.borderDefault }}> · </span>}
              <span style={{ color: tokens.textMuted }}>{p.name}</span>
              <span style={{ color: '#64748B' }}>: {p.type}</span>
              {p.optional && <span style={{ color: '#64748B' }}>?</span>}
            </span>
          ))}
        </div>
      )}
      {/* Usage hint (first line only) */}
      <div style={{
        fontSize: 9, color: tokens.textDim, marginTop: 4, paddingTop: 4,
        borderTop: `1px solid ${tokens.borderSubtle}`,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        <span style={{ color: '#64748B' }}>// {api.example.split('\n')[0]}</span>
      </div>
    </div>
  )
}

// ─── Placeholder ────────────────────────────────────────

export function PreviewPlaceholder({ name, tokens }: { name?: string; tokens: ThemeTokens }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: '100%', height: '100%', gap: 6, padding: 16,
      color: tokens.textDim, fontFamily: tokens.fontFamilyMono,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        border: `1px dashed ${tokens.borderDefault}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
      }}>
        {'\u25CB'}
      </div>
      <div style={{ fontSize: 10 }}>{name ?? 'preview'}</div>
    </div>
  )
}

// ─── Types ──────────────────────────────────────────────

export interface PreviewInfo {
  name: string; layer: string; description: string
  lines: number; exports: string[]
  hasForwardRef: boolean; hasCn: boolean
  layerColor: string
}

// ─── Resolve ────────────────────────────────────────────

export function resolvePreview(name: string) {
  const hasComp = hasDemo(name) && name in COMPONENT_MAP
  const hasUi = name in UI_DEMO_MAP
  const hasHook = name in HOOKS_API
  const canPreview = hasComp || hasUi || hasHook
  const demo = hasComp ? getDemo(name) : null
  return { hasComp, hasUi, hasHook, canPreview, demo }
}
