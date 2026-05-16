/**
 * CopyButton — copies CSS code to clipboard with visual feedback.
 * Uses the project's theme tokens for styling.
 */
'use client'

import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'
import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize } from '@/lib/layout/tokens'

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const { tokens } = useLayoutTheme()

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [code])

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy CSS"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 10px',
        fontSize: fontSize.sm,
        fontFamily: tokens.fontFamilyBody,
        fontWeight: 500,
        color: copied ? tokens.accentPrimary : tokens.textMuted,
        background: 'transparent',
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: tokens.cornerRadius,
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = tokens.borderBright
        e.currentTarget.style.color = tokens.textSecondary
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = tokens.borderSubtle
        e.currentTarget.style.color = copied ? tokens.accentPrimary : tokens.textMuted
      }}
    >
      {copied ? <Check width={12} height={12} /> : <Copy width={12} height={12} />}
      {copied ? 'Copied' : 'Copy CSS'}
    </button>
  )
}
