'use client'

import { forwardRef, useMemo } from 'react'
import { cn } from '../../tokens/cn'
import type { StatsDashboardProps } from './types'
import { StatCard } from './stat-card'
import { SizeDonut } from './size-donut'

const DEFAULT_COLORS = ['bg-cyan-400', 'bg-purple-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400']
const ICON_COLORS = ['cyan', 'purple', 'emerald', 'amber', 'rose']

/**
 * Generic stats dashboard with animated stat cards, top-groups bar chart,
 * and a size-distribution donut chart.
 *
 * Computes statistics from an array of `StatsItem` objects and renders
 * a responsive grid of visualizations.
 *
 * @example
 * ```tsx
 * <StatsDashboard
 *   data={[
 *     { name: 'Button', group: 'ui', value: 85 },
 *     { name: 'Dialog', group: 'ui', value: 220 },
 *     { name: 'Chart', group: 'data', value: 450 },
 *   ]}
 *   metricLabel="Lines"
 * />
 * ```
 */
export const StatsDashboard = forwardRef<HTMLDivElement, StatsDashboardProps>(
  function StatsDashboard({ data, metricLabel = 'Value', topGroups = 5, colors = DEFAULT_COLORS }, ref) {
    const stats = useMemo(() => {
      const totalValue = data.reduce((s, d) => s + d.value, 0)
      const groupCounts: Record<string, number> = {}
      const groupValues: Record<string, number> = {}
      for (const d of data) {
        groupCounts[d.group] = (groupCounts[d.group] || 0) + 1
        groupValues[d.group] = (groupValues[d.group] || 0) + d.value
      }
      const topGroupsList = Object.entries(groupCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topGroups)
      const maxCount = topGroupsList.length > 0 ? topGroupsList[0][1] : 1
      return {
        items: data.length,
        groups: Object.keys(groupCounts).length,
        totalValue,
        topGroupsList,
        maxCount,
        groupDetails: Object.entries(groupCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => `${name}: ${count}`)
          .join('\n'),
      }
    }, [data, topGroups])

    return (
      <div ref={ref} data-slot="stats-dashboard" className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard
          label="items"
          value={stats.items}
          color={ICON_COLORS[0]}
          tooltip={stats.groupDetails}
        />
        <StatCard
          label="groups"
          value={stats.groups}
          color={ICON_COLORS[1]}
          tooltip={stats.groupDetails}
        />
        <StatCard
          label={metricLabel}
          value={stats.totalValue >= 1000 ? `${(stats.totalValue / 1000).toFixed(1)}k` : stats.totalValue}
          color={ICON_COLORS[2]}
        />
        <div
          data-slot="top-groups"
          className="glass-card rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="text-xs font-semibold text-foreground mb-2">Top groups</div>
          <div className="space-y-1.5">
            {stats.topGroupsList.map(([group, count], i) => (
              <div key={group} className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground w-24 truncate" title={group}>{group}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', colors[i] ?? colors[0])}
                    style={{ width: `${(count / stats.maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <SizeDonut data={data} metricLabel={metricLabel} />
      </div>
    )
  },
)
