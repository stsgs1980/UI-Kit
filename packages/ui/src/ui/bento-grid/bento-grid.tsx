'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface BentoItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span (1-4) */
  colSpan?: 1 | 2 | 3 | 4
  /** Number of rows to span (1-3) */
  rowSpan?: 1 | 2 | 3
  children: ReactNode
}

export interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of grid columns (default 4) */
  columns?: 2 | 3 | 4
  children: ReactNode
}

// ─── BentoGrid ───────────────────────────────────────────────

export const BentoGrid = forwardRef<HTMLDivElement, BentoGridProps>(
  ({ columns = 4, className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="bento-grid"
      className={cn(
        'grid w-full gap-3',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-3',
        columns === 4 && 'grid-cols-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
BentoGrid.displayName = 'BentoGrid'

// ─── BentoItem ───────────────────────────────────────────────

export const BentoItem = forwardRef<HTMLDivElement, BentoItemProps>(
  ({ colSpan = 1, rowSpan = 1, className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="bento-item"
      className={cn(
        'min-h-[120px] rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50',
        colSpan === 2 && 'col-span-2',
        colSpan === 3 && 'col-span-3',
        colSpan === 4 && 'col-span-4',
        rowSpan === 2 && 'row-span-2',
        rowSpan === 3 && 'row-span-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
BentoItem.displayName = 'BentoItem'
