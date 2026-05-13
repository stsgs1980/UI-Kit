'use client'

import type { CompareItem } from './types'

/**
 * Shared color map for accent colors.
 */
const COLOR_MAP: Record<string, string> = {
  cyan: 'bg-cyan-400',
  purple: 'bg-purple-400',
  emerald: 'bg-emerald-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
}

export function getBarColor(color: string): string {
  return COLOR_MAP[color] ?? COLOR_MAP.cyan
}

/**
 * Download comparison report as .txt file.
 */
export function downloadCompareReport(
  items: CompareItem[],
  metricLabel: string,
): void {
  if (items.length < 2) return
  const lines: string[] = [
    'Comparison Report',
    '==================',
    '',
    `Item A: ${items[0].name} | ${metricLabel}: ${items[0].value}`,
    items[0].category ? `  Category: ${items[0].category}` : '',
    items[0].path ? `  Path: ${items[0].path}` : '',
    '',
    `Item B: ${items[1].name} | ${metricLabel}: ${items[1].value}`,
    items[1].category ? `  Category: ${items[1].category}` : '',
    items[1].path ? `  Path: ${items[1].path}` : '',
    '',
    `Difference: ${Math.abs(items[0].value - items[1].value)} ${metricLabel.toLowerCase()}`,
  ]
  if (items[0].code) lines.push('', '-- Code A --', items[0].code)
  if (items[1].code) lines.push('', '-- Code B --', items[1].code)
  const blob = new Blob([lines.filter(Boolean).join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const el = document.createElement('a')
  el.href = url
  el.download = `compare-${items[0].name}-vs-${items[1].name}.txt`
  el.click()
  URL.revokeObjectURL(url)
}
