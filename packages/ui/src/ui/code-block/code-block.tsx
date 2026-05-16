'use client'

import React, { useState, forwardRef } from 'react'
import { cn } from '../../tokens/cn'

export interface CodeBlockProps {
  /** The raw source code to display */
  code: string
  /** Language hint shown in the badge (default: "tsx") */
  language?: string
  /** Show line numbers on the left (default: true) */
  showLineNumbers?: boolean
  /** Show the copy-to-clipboard button (default: true) */
  showCopy?: boolean
  className?: string
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ code, language = 'tsx', showLineNumbers = true, showCopy = true, className, ...props }, ref) => {
    const [copied, setCopied] = useState(false)

    const lines = code.split('\n')

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        /* clipboard unavailable – silently ignore */
      }
    }

    return (
      <div
        data-slot="code-block"
        className={cn('group relative rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 overflow-hidden', className)}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="text-xs font-medium text-zinc-500 select-none">Code</span>

          <div className="flex items-center gap-3">
            {/* Language badge */}
            <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              {language}
            </span>

            {/* Copy button */}
            {showCopy && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600"
                aria-label={copied ? 'Copied' : 'Copy code'}
              >
                {copied ? (
                  <>
                    {/* Check icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Copied
                  </>
                ) : (
                  <>
                    {/* Copy icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Code area */}
        <div className="overflow-x-auto">
          <pre
            ref={ref}
            {...props}
            className="flex min-h-0 text-[13px] leading-relaxed"
          >
            {showLineNumbers ? (
              <table className="border-collapse w-full m-0">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i}>
                      <td className="select-none border-r border-zinc-800 px-3 py-0 text-right align-top text-zinc-600 no-underline">
                        {i + 1}
                      </td>
                      <td className="px-4 py-0 whitespace-pre">
                        <code className="font-mono">{line}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <code className="block px-4 py-3 font-mono whitespace-pre">{code}</code>
            )}
          </pre>
        </div>
      </div>
    )
  },
)

CodeBlock.displayName = 'CodeBlock'
