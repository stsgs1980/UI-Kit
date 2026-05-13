/**
 * Generic item to compare. The only required fields are `name` and a
 * numeric `value` used for bar-chart comparison.
 *
 * `code` and `category` are optional and only shown when present.
 */
export interface CompareItem {
  /** Display name shown in cards and diff header */
  name: string
  /** Numeric metric for bar-chart comparison (e.g. line count, size, score) */
  value: number
  /** Optional group / source label shown as a badge */
  category?: string
  /** Optional secondary label (e.g. file path) */
  path?: string
  /** Optional source code for line-by-line diff */
  code?: string
}

export interface CompareModalProps {
  /** Items to compare. Most useful with exactly 2 items. */
  items: CompareItem[]
  /** Controlled open state */
  open: boolean
  /** Called when the modal should close */
  onOpenChange: (open: boolean) => void
  /** Label for the numeric metric (e.g. "Lines", "Size") */
  metricLabel?: string
  /** Accent colors for the two columns. Default: ["cyan", "purple"] */
  accentColors?: [string, string]
}

export interface DiffLine {
  lineA: string
  lineB: string
  type: 'same' | 'diff'
}
