'use client'

import type { DiffLine } from './types'

export interface DiffTableProps {
  /** Computed diff lines */
  lines: DiffLine[]
  /** Name of item A (column header) */
  nameA: string
  /** Name of item B (column header) */
  nameB: string
  /** Accent colors for columns */
  colors: [string, string]
  /** Max diff lines to show. Default: 50 */
  maxLines?: number
}

/**
 * Side-by-side line diff table.
 *
 * @example
 * ```tsx
 * <DiffTable lines={diffLines} nameA="Button" nameB="ButtonAlt" colors={["cyan","purple"]} />
 * ```
 */
export function DiffTable({ lines, nameA, nameB, colors, maxLines = 50 }: DiffTableProps) {
  if (lines.length === 0) return null

  const colorClasses: Record<string, { text: string; header: string }> = {
    cyan: { text: 'text-cyan-300', header: 'text-cyan-400' },
    purple: { text: 'text-purple-300', header: 'text-purple-400' },
    emerald: { text: 'text-emerald-300', header: 'text-emerald-400' },
    amber: { text: 'text-amber-300', header: 'text-amber-400' },
    rose: { text: 'text-rose-300', header: 'text-rose-400' },
  }

  const colA = colorClasses[colors[0]] ?? colorClasses.cyan
  const colB = colorClasses[colors[1]] ?? colorClasses.purple

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/50">
        <span className="text-xs text-muted-foreground">Code diff (first {maxLines} lines)</span>
      </div>
      <div className="max-h-80 overflow-auto text-xs font-mono">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-2 py-1 text-left text-[10px] text-muted-foreground font-normal w-8">#</th>
              <th className={`px-2 py-1 text-left text-[10px] ${colA.header} font-normal`}>{nameA}</th>
              <th className={`px-2 py-1 text-left text-[10px] ${colB.header} font-normal`}>{nameB}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className={line.type === 'diff' ? 'bg-destructive/10' : ''}>
                <td className="px-2 py-0.5 text-muted-foreground select-none">{i + 1}</td>
                <td className={`px-2 py-0.5 whitespace-pre ${line.type === 'diff' ? colA.text : 'text-muted-foreground'}`}>
                  {line.lineA.slice(0, 100)}
                </td>
                <td className={`px-2 py-0.5 whitespace-pre ${line.type === 'diff' ? colB.text : 'text-muted-foreground'}`}>
                  {line.lineB.slice(0, 100)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
