'use client'

import { useState, useCallback, Suspense } from 'react'
import { LivePreview, HookPreview, PreviewPlaceholder, resolvePreview, type PreviewInfo } from './preview-utils'
import { ExpandedCard } from './expanded-card'
import { UI_DEMO_MAP } from '@/data/ui-demos'
import { ErrorBoundary } from './error-boundary'
import { LazyPreview } from '@/components/lazy-preview'
import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight, fontSizeInterp } from '@/lib/layout/tokens'

// ─── Component Preview (card) ─────────────────────────────

export function ComponentPreview(info: PreviewInfo & { tokens: ThemeTokens }) {
  const { name, layer, description, tokens } = info
  const [expanded, setExpanded] = useState(false)
  const { canPreview, demo, hasComp, hasUi, hasHook } = resolvePreview(name)
  const openCard = useCallback(() => setExpanded(true), [])

  const isHook = layer === 'hooks'
  const previewBadge = isHook ? '#F59E0B' : (canPreview ? '#10B981' : undefined)

  const previewContent = (
    <Suspense fallback={<PreviewPlaceholder name={name} tokens={tokens} />}>
      {hasComp && demo
        ? <LivePreview name={name} demo={demo!} />
        : hasHook
          ? <HookPreview name={name} tokens={tokens} />
          : hasUi
            ? <ErrorBoundary><div key={name}>{UI_DEMO_MAP[name]()}</div></ErrorBoundary>
            : <PreviewPlaceholder name={name} tokens={tokens} />}
    </Suspense>
  )

  return (
    <>
      <div
        onClick={openCard}
        role="button" tabIndex={0}
        aria-label={`Open ${name} details`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard() } }}
        style={{
          borderRadius: tokens.cornerRadius, background: tokens.bgBase,
          overflow: 'hidden', cursor: 'pointer',
          border: `1px solid ${tokens.borderSubtle}`,
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = tokens.borderDefault
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = tokens.borderSubtle
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Preview Area */}
        <div style={{
          height: 200, overflow: 'hidden', position: 'relative',
          borderBottom: `1px solid ${tokens.borderSubtle}`, background: tokens.bgDeep,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          paddingTop: 8,
        }}>
          <div style={{ width: '92%', maxWidth: 340, overflow: 'hidden' }}>
            {canPreview
              ? <LazyPreview placeholder={<PreviewPlaceholder name={name} tokens={tokens} />}>
                  {previewContent}
                </LazyPreview>
              : previewContent}
          </div>

          {previewBadge && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              width: 5, height: 5, borderRadius: '50%', background: previewBadge,
              boxShadow: `0 0 4px ${previewBadge}80`,
            }} />
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '8px 12px' }}>
          <div style={{
            fontSize: 13, fontWeight: fontWeight.medium, fontFamily: tokens.fontFamilyBody,
            color: tokens.textPrimary, lineHeight: 1.3,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{name}</div>
          {description && (
            <div style={{
              fontSize: fontSizeInterp[11], fontFamily: tokens.fontFamilyBody, color: tokens.textMuted,
              marginTop: 1, lineHeight: 1.4,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{description}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
            <span style={{ fontSize: fontSizeInterp[9], fontFamily: tokens.fontFamilyMono, color: tokens.textDim }}>{info.lines}L</span>
            {isHook && <span style={{ fontSize: fontSizeInterp[9], fontFamily: tokens.fontFamilyMono, color: '#F59E0B' }}>hook</span>}
            {info.hasForwardRef && <span style={{ fontSize: fontSizeInterp[9], fontFamily: tokens.fontFamilyMono, color: '#10B981' }}>fwdRef</span>}
            {info.hasCn && <span style={{ fontSize: fontSizeInterp[9], fontFamily: tokens.fontFamilyMono, color: '#3B82F6' }}>cn()</span>}
          </div>
        </div>
      </div>

      {expanded && (
        <ExpandedCard {...info} tokens={tokens} onClose={() => setExpanded(false)} />
      )}
    </>
  )
}
