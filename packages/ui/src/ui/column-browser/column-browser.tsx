'use client'

import { forwardRef, useCallback, useMemo, useState } from 'react'
import { cn } from '../../tokens/cn'
import { ColumnTab } from './column-tab'
import type { BrowserItem } from './column-tab'

export interface ColumnCategory {
  id: string
  label: string
  items?: BrowserItem[]
}

export interface ColumnBrowserProps {
  categories: ColumnCategory[]
  onSelect?: (categoryPath: string[], item: BrowserItem) => void
  className?: string
}

export const ColumnBrowser = forwardRef<HTMLDivElement, ColumnBrowserProps>(
  ({ categories, onSelect, className }, ref) => {
    const [path, setPath] = useState<string[]>([])

    /* ------------------------------------------------------------------ */
    /*  Derived columns                                                     */
    /* ------------------------------------------------------------------ */

    const columns = useMemo(() => {
      const cols: {
        title?: string
        items: BrowserItem[]
        activeId?: string
        onBack?: () => void
      }[] = []

      // Column 0 — root categories
      cols.push({
        items: categories.map((c) => ({ id: c.id, label: c.label })),
        activeId: path[0],
      })

      // Subsequent columns — items of each selected category
      for (let i = 0; i < path.length; i++) {
        const cat = categories.find((c) => c.id === path[i])
        if (cat?.items?.length) {
          cols.push({
            title: cat.label,
            items: cat.items,
            activeId: path[i + 1],
            onBack:
              i === 0
                ? () => setPath([])
                : () => setPath((p) => p.slice(0, i)),
          })
        }
      }

      return cols
    }, [categories, path])

    /* ------------------------------------------------------------------ */
    /*  Handlers                                                            */
    /* ------------------------------------------------------------------ */

    const handleSelect = useCallback(
      (colIndex: number, item: BrowserItem) => {
        if (colIndex === 0) {
          // Root category click — drill into its items
          const cat = categories.find((c) => c.id === item.id)
          if (cat?.items?.length) setPath([item.id])
        } else {
          // Leaf item click — notify consumer
          onSelect?.(path, item)
        }
      },
      [categories, path, onSelect],
    )

    /* ------------------------------------------------------------------ */
    /*  Render                                                              */
    /* ------------------------------------------------------------------ */

    return (
      <div
        ref={ref}
        data-slot="column-browser"
        className={cn('flex overflow-x-auto', className)}
      >
        {columns.map((col, i) => (
          <ColumnTab
            key={`${i}-${col.title ?? 'root'}`}
            title={col.title}
            items={col.items}
            activeId={col.activeId}
            onBack={col.onBack}
            onSelect={(item) => handleSelect(i, item)}
          />
        ))}
      </div>
    )
  },
)

ColumnBrowser.displayName = 'ColumnBrowser'
