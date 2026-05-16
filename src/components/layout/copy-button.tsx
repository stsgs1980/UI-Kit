'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import type { ThemeTokens } from '@/lib/layout/theme-types'
import { fontWeight, fontSizeInterp } from '@/lib/layout/tokens'

// ─── Copy Button ──────────────────────────────────────────

export function CopyButton({ text, tokens }: { text: string; tokens: ThemeTokens }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [text])

  return (
    <button onClick={handleCopy} style={{
      padding: '4px 10px', borderRadius: 6,
      background: copied ? tokens.accentPrimary : tokens.bgSurface,
      color: copied ? tokens.textOnAccent : tokens.textMuted,
      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
      fontSize: fontSizeInterp[11], fontFamily: tokens.fontFamilyBody, fontWeight: fontWeight.medium,
      transition: 'all 0.2s', marginLeft: 'auto',
    }}>
      {copied ? <Check width={12} height={12} /> : <Copy width={12} height={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
