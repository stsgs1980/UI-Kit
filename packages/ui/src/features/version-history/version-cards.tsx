'use client'

import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface VersionEntry {
  /** Semantic version string (e.g. "2.1.0") */
  version: string
  /** Release date string */
  date: string
  /** Whether this is the current/latest version */
  current?: boolean
  /** List of new features */
  features: string[]
  /** List of bug fixes */
  fixes: string[]
}

// ─── Feature List ─────────────────────────────────────────────

export function FeatureList({
  items,
  label,
  color,
  compact = false,
}: {
  items: string[]
  label: string
  color: 'green' | 'amber'
  compact?: boolean
}) {
  if (items.length === 0) return null
  const dotColor = color === 'green' ? 'bg-green-500' : 'bg-amber-500'
  const labelColor = color === 'green' ? 'text-green-600' : 'text-amber-600'
  const dotSize = compact ? 'w-1.5 h-1.5' : 'w-2 h-2'

  return (
    <div>
      <div className={cn('font-medium mb-1.5 flex items-center gap-1.5', labelColor, compact ? 'text-xs' : 'text-sm')}>
        <span className={cn('rounded-full', dotColor, dotSize)} />
        {label}
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className={cn('flex items-start gap-2 text-muted-foreground', compact ? 'text-sm' : 'text-sm')}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Version Pill Strip ───────────────────────────────────────

export function VersionPills({
  versions,
  currentLabel,
}: {
  versions: VersionEntry[]
  currentLabel: string
}) {
  return (
    <div className="flex items-center gap-2.5 mb-5 overflow-x-auto pb-1">
      {versions.map((ver, i) => (
        <div
          key={ver.version}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-colors',
            i === 0
              ? 'bg-primary text-primary-foreground font-semibold'
              : 'bg-muted text-muted-foreground border border-border'
          )}
        >
          <span className="text-sm font-mono">{ver.version}</span>
          {i === 0 && <span className="text-xs font-medium">{currentLabel}</span>}
        </div>
      ))}
    </div>
  )
}

// ─── Featured Version Card ────────────────────────────────────

export function FeaturedVersionCard({
  version,
  currentLabel,
}: {
  version: VersionEntry
  currentLabel: string
}) {
  return (
    <div className="relative mb-4 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg">
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">
            {version.version}
          </span>
          <span className="text-sm text-muted-foreground">{version.date}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-500">{currentLabel}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FeatureList items={version.features} label="New features" color="green" />
          <FeatureList items={version.fixes} label="Bug fixes" color="amber" />
        </div>
      </div>
    </div>
  )
}

// ─── Compact Version Card ─────────────────────────────────────

export function CompactVersionCard({ version }: { version: VersionEntry }) {
  return (
    <div className="p-4 sm:p-5 rounded-xl border bg-card shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{version.version}</span>
        <span className="text-sm text-muted-foreground">{version.date}</span>
      </div>
      <div className="space-y-3">
        <FeatureList items={version.features} label="New features" color="green" compact />
        <FeatureList items={version.fixes} label="Bug fixes" color="amber" compact />
      </div>
    </div>
  )
}
