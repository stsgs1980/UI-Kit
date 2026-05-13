'use client'

import type { HTMLAttributes } from 'react'
import { cn } from '../../tokens/cn'
import { VersionPills, FeaturedVersionCard, CompactVersionCard } from './version-cards'
import type { VersionEntry } from './version-cards'

// ─── Types ────────────────────────────────────────────────────

export type { VersionEntry }

export interface VersionHistoryProps extends HTMLAttributes<HTMLDivElement> {
  /** Ordered versions (first = latest) */
  versions: VersionEntry[]
  /** Label for "current" badge (default "Current") */
  currentLabel?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * VersionHistory -- version timeline with pill strip + featured card + compact cards.
 *
 * Displays a version history: horizontal pill strip at top, featured card
 * for the latest version, and compact cards for older versions.
 * Features and fixes are listed in two-column grid.
 *
 * @example
 * ```tsx
 * <VersionHistory
 *   versions={[
 *     { version: '2.0.0', date: '2025-01-15', current: true, features: ['Dark mode'], fixes: ['Login bug'] },
 *     { version: '1.5.0', date: '2024-11-01', features: ['Search'], fixes: [] },
 *   ]}
 * />
 * ```
 */
export function VersionHistory({
  versions,
  currentLabel = 'Current',
  className,
  ...props
}: VersionHistoryProps) {
  if (versions.length === 0) return null

  return (
    <div data-slot="version-history" className={cn('', className)} {...props}>
      <VersionPills versions={versions} currentLabel={currentLabel} />
      {versions[0] && <FeaturedVersionCard version={versions[0]} currentLabel={currentLabel} />}
      {versions.length > 1 && (
        <div className="space-y-3">
          {versions.slice(1).map((ver) => (
            <CompactVersionCard key={ver.version} version={ver} />
          ))}
        </div>
      )}
    </div>
  )
}
