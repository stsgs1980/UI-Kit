/**
 * CodeBlock — displays CSS code with syntax-like highlighting.
 * Uses theme tokens for the code drawer aesthetic.
 */
'use client'

import { useLayoutTheme } from '@/lib/layout/theme'
import { fontSize } from '@/lib/layout/tokens'

export function CodeBlock({ code }: { code: string }) {
  const { tokens } = useLayoutTheme()

  return (
    <pre
      style={{
        padding: '13px 16px',
        background: tokens.codeBg,
        borderRadius: tokens.cornerRadius,
        fontFamily: tokens.fontFamilyMono,
        fontSize: fontSize.sm,
        lineHeight: 1.618,
        color: tokens.codeText,
        overflow: 'auto',
        margin: 0,
        border: `1px solid ${tokens.borderSubtle}`,
      }}
    >
      <code>{code}</code>
    </pre>
  )
}
