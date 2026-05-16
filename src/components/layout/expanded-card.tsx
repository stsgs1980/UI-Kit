'use client'

import { Suspense, useEffect } from 'react'
import { X } from 'lucide-react'
import { LivePreview, HookPreview, PreviewPlaceholder, resolvePreview, type PreviewInfo } from './preview-utils'
import { UI_DEMO_MAP } from '@/data/ui-demos'
import { HOOKS_API } from '@/data/hooks-api'
import { ErrorBoundary } from './error-boundary'
import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight, fontSizeInterp } from '@/lib/layout/tokens'
import { CopyButton } from './copy-button'
import { HookPreviewExpanded } from './hook-preview-expanded'

// ─── Import Path Helper ─────────────────────────────────

function getImportPath(layer: string, name: string): { path: string; exportName: string } {
  switch (layer) {
    case 'ui':       return { path: `@/components/ui/${name}`, exportName: name }
    case 'sections': return { path: `@/components/sections/${name}`, exportName: name }
    case 'features': return { path: `@/components/features/${name}`, exportName: name }
    case 'hooks':    return { path: `@/hooks/${name}`, exportName: name }
    case 'providers': return { path: `@/providers/${name}`, exportName: name }
    default:         return { path: `@/components/${name}`, exportName: name }
  }
}

// ─── Expanded Card ────────────────────────────────────────

export function ExpandedCard(info: PreviewInfo & { tokens: ThemeTokens; onClose: () => void }) {
  const { name, layer, description, lines, exports, hasForwardRef, hasCn, tokens, layerColor, onClose } = info
  const { demo, hasComp, hasUi, hasHook } = resolvePreview(name)
  const isHook = layer === 'hooks'
  const hookApi = isHook ? HOOKS_API[name] : null

  const { path: importPath, exportName } = getImportPath(layer, name)
  const mainExport = exports[0] ?? exportName
  const codeSnippet = `import { ${mainExport} } from '${importPath}'`

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, animation: 'fadeIn 0.15s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 720,
        background: tokens.bgBase, borderRadius: 12,
        border: `1px solid ${tokens.borderSubtle}`,
        overflow: 'hidden', animation: 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${tokens.borderSubtle}` }}>
          <span style={{
            fontSize: fontSizeInterp[9], fontWeight: fontWeight.bold, fontFamily: tokens.fontFamilyMono,
            padding: '2px 6px', borderRadius: 4,
            background: `${layerColor}20`, color: layerColor,
            textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>{layer}</span>
          <span style={{ fontSize: 14, fontWeight: fontWeight.semibold, fontFamily: tokens.fontFamilyBody, color: tokens.textPrimary, marginLeft: 10 }}>{name}</span>
          {description && <span style={{ fontSize: fontSizeInterp[12], fontFamily: tokens.fontFamilyBody, color: tokens.textMuted, marginLeft: 8 }}>{description}</span>}
          <button onClick={onClose} aria-label="Close" style={{
            marginLeft: 'auto', width: 28, height: 28, borderRadius: 6,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: tokens.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X width={16} height={16} /></button>
        </div>

        {/* Preview / API Card */}
        <div style={{
          minHeight: 200, maxHeight: 400, overflow: 'hidden', padding: 24,
          background: tokens.bgDeep,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', contain: 'paint layout style size',
        }}>
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Suspense fallback={<PreviewPlaceholder name={name} tokens={tokens} />}>
              {hasHook
                ? <HookPreviewExpanded name={name} tokens={tokens} />
                : hasComp && demo
                  ? <LivePreview name={name} demo={demo!} />
                  : hasUi
                    ? <ErrorBoundary><div key={name}>{UI_DEMO_MAP[name]()}</div></ErrorBoundary>
                    : <PreviewPlaceholder name={name} tokens={tokens} />}
            </Suspense>
          </div>
        </div>

        {/* Code + meta */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${tokens.borderSubtle}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            fontSize: fontSizeInterp[12], fontFamily: tokens.fontFamilyMono,
            padding: '8px 12px', borderRadius: 6,
            background: tokens.bgDeep, color: tokens.textSecondary,
            border: `1px solid ${tokens.borderSubtle}`,
            lineHeight: 1.5,
          }}>
            <span style={{ color: '#C084FC' }}>import</span>{' { '}
            <span style={{ color: tokens.textPrimary }}>{mainExport}</span>
            {' } '}
            <span style={{ color: '#C084FC' }}>from</span>{' '}
            <span style={{ color: '#34D399' }}>{'\''}{importPath}{'\''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontFamily: tokens.fontFamilyMono, color: tokens.textDim }}>{lines} lines</span>
            {isHook && <span style={{ fontSize: 10, fontFamily: tokens.fontFamilyMono, color: '#F59E0B' }}>hook</span>}
            {hasForwardRef && <span style={{ fontSize: 10, fontFamily: tokens.fontFamilyMono, color: '#10B981' }}>forwardRef</span>}
            {hasCn && <span style={{ fontSize: 10, fontFamily: tokens.fontFamilyMono, color: '#3B82F6' }}>cn()</span>}
            <CopyButton text={codeSnippet} tokens={tokens} />
          </div>
        </div>
      </div>
    </div>
  )
}
