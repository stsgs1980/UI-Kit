'use client'

import { cn } from '../../tokens/cn'
import type { StatCardProps } from './types'

const defaultColors: Record<string, string> = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  rose: 'text-rose-400',
  blue: 'text-blue-400',
  indigo: 'text-indigo-400',
}

/**
 * Animated stat card with icon, large number, and label.
 *
 * @example
 * ```tsx
 * <StatCard label="Components" value={142} color="cyan" icon={<Code2 className="w-5 h-5" />} />
 * ```
 */
export function StatCard({ label, value, icon, color = 'cyan', tooltip }: StatCardProps) {
  const colorClass = defaultColors[color] ?? defaultColors.cyan

  return (
    <div
      data-slot="stat-card"
      className={cn(
        'glass-card rounded-xl p-4 flex flex-col items-center justify-center cursor-default',
        'animate-in fade-in slide-in-from-bottom-2 duration-300',
      )}
      title={tooltip}
    >
      {icon && <div className={cn('mb-1', colorClass)}>{icon}</div>}
      <span className={cn('text-2xl font-bold', colorClass)}>{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
