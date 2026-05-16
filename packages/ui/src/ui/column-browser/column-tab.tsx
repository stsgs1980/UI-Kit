'use client'

import { forwardRef } from 'react'
import { cn } from '../../tokens/cn'

export interface BrowserItem {
  id: string
  label: string
}

export interface ColumnTabProps {
  title?: string
  items: BrowserItem[]
  activeId?: string
  onBack?: () => void
  onSelect: (item: BrowserItem) => void
  className?: string
}

export const ColumnTab = forwardRef<HTMLDivElement, ColumnTabProps>(
  ({ title, items, activeId, onBack, onSelect, className }, ref) => (
    <div
      ref={ref}
      data-slot="column-tab"
      className={cn(
        'flex flex-col border-r last:border-r-0 min-w-[180px] max-h-[400px] overflow-y-auto',
        className,
      )}
    >
      {(title || onBack) && (
        <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/50 shrink-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          )}
          {title && (
            <span className="text-sm font-medium truncate">{title}</span>
          )}
        </div>
      )}

      <div className="flex flex-col py-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            className={cn(
              'px-3 py-1.5 text-left text-sm truncate transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              activeId === item.id && 'bg-accent text-accent-foreground',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  ),
)

ColumnTab.displayName = 'ColumnTab'
