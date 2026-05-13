'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface ShortcutItem {
  /** Action description */
  action: string
  /** Mac key label (e.g. "Cmd+K") */
  mac: string
  /** Windows/Linux key label (e.g. "Ctrl+K") */
  windows: string
}

export interface KeyboardShortcutsGridProps extends HTMLAttributes<HTMLDivElement> {
  /** List of shortcuts to display */
  shortcuts: ShortcutItem[]
  /** Grid columns on desktop (default 3) */
  columns?: 1 | 2 | 3
}

// ─── Component ────────────────────────────────────────────────

/**
 * KeyboardShortcutsGrid -- responsive grid of keyboard shortcuts.
 *
 * Displays shortcuts in a grid layout. Each row shows the action name
 * on the left and dual-platform kbd badges (Mac / Windows) on the right.
 * Columns adapt based on screen size.
 *
 * @example
 * ```tsx
 * <KeyboardShortcutsGrid
 *   shortcuts={[
 *     { action: 'Search', mac: 'Cmd+K', windows: 'Ctrl+K' },
 *     { action: 'Save', mac: 'Cmd+S', windows: 'Ctrl+S' },
 *   ]}
 *   columns={2}
 * />
 * ```
 */
export const KeyboardShortcutsGrid = forwardRef<HTMLDivElement, KeyboardShortcutsGridProps>(
  ({ shortcuts, columns = 3, className, ...props }, ref) => {
    const colsClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    }[columns]

    return (
      <div
        ref={ref}
        data-slot="keyboard-shortcuts-grid"
        className={cn('grid gap-2', colsClass, className)}
        {...props}
      >
        {shortcuts.map((sc) => (
          <div
            key={sc.action}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
          >
            <span className="text-sm text-muted-foreground">{sc.action}</span>
            <div className="flex items-center gap-1">
              <kbd className="text-xs px-2 py-0.5 rounded font-mono bg-background text-muted-foreground border border-border">
                {sc.mac}
              </kbd>
              <span className="text-xs text-muted-foreground/50">/</span>
              <kbd className="text-xs px-2 py-0.5 rounded font-mono bg-background text-muted-foreground border border-border">
                {sc.windows}
              </kbd>
            </div>
          </div>
        ))}
      </div>
    )
  }
)
KeyboardShortcutsGrid.displayName = 'KeyboardShortcutsGrid'
