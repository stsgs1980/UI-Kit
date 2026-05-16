'use client'

import { HOOKS_API } from '@/data/hooks-api'
import { PreviewPlaceholder } from './preview-utils'
import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight, fontSizeInterp } from '@/lib/layout/tokens'

// ─── Hook Expanded Preview ────────────────────────────────

export function HookPreviewExpanded({ name, tokens }: { name: string; tokens: ThemeTokens }) {
  const api = HOOKS_API[name]
  if (!api) return <PreviewPlaceholder name={name} tokens={tokens} />

  return (
    <div style={{
      width: '100%', fontFamily: tokens.fontFamilyMono, fontSize: fontSizeInterp[11],
      lineHeight: 1.7, color: tokens.textSecondary,
    }}>
      {/* Signature block */}
      <div style={{
        background: tokens.bgSurface,
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: 6, padding: '10px 12px', marginBottom: 10,
      }}>
        <div style={{ fontSize: 10, color: tokens.textDim, marginBottom: 4 }}>Signature</div>
        <div>
          <span style={{ color: '#C084FC' }}>function</span>{' '}
          <span style={{ color: tokens.textPrimary, fontWeight: 600 }}>{api.signature}</span>
        </div>
      </div>

      {/* Returns */}
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 10, color: tokens.textDim }}>Returns </span>
        <span style={{ color: '#34D399' }}>{api.returns}</span>
      </div>

      {/* Params */}
      {api.params.length > 0 && (
        <div style={{
          background: tokens.bgSurface,
          border: `1px solid ${tokens.borderSubtle}`,
          borderRadius: 6, padding: '8px 12px', marginBottom: 10,
        }}>
          <div style={{ fontSize: 10, color: tokens.textDim, marginBottom: 4 }}>Parameters</div>
          {api.params.map(p => (
            <div key={p.name} style={{ marginBottom: 2 }}>
              <span style={{ color: tokens.textPrimary }}>{p.name}</span>
              <span style={{ color: '#64748B' }}>: {p.type}</span>
              {p.optional && <span style={{ color: '#64748B' }}>?</span>}
              {p.default && <span style={{ color: tokens.textDim }}> = {p.default}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Example */}
      <div style={{
        background: tokens.bgSurface,
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: 6, padding: '10px 12px',
      }}>
        <div style={{ fontSize: 10, color: tokens.textDim, marginBottom: 4 }}>Usage</div>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: fontSizeInterp[11] }}>
          {api.example.split('\n').map((line, i) => (
            <div key={i}>
              <span style={{ color: '#64748B' }}>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
