/**
 * Generic data item for the stats dashboard.
 * Only `name` and `value` are required.
 */
export interface StatsItem {
  /** Display name (used for grouping bars) */
  name: string
  /** Group / bucket this item belongs to (e.g. project, category) */
  group: string
  /** Numeric value (e.g. line count, size, score) */
  value: number
}

export interface StatsDashboardProps {
  /** Data items to compute statistics from */
  data: StatsItem[]
  /** Label for the value metric (e.g. "Lines", "Size"). Default: "Value" */
  metricLabel?: string
  /** Number of top groups to show in the bar chart. Default: 5 */
  topGroups?: number
  /** Color palette for stat cards and bars. Default: cyan/purple/emerald/amber/rose */
  colors?: string[]
}

export interface StatCardProps {
  label: string
  value: number | string
  icon?: React.ReactNode
  color?: string
  tooltip?: string
}

export interface SizeDonutProps {
  data: StatsItem[]
  metricLabel?: string
}
