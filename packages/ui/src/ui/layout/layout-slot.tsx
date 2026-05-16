'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

const slotElements = ['header', 'aside', 'main', 'footer'] as const
type SlotElement = (typeof slotElements)[number]

export interface LayoutSlotProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic HTML element to render (defaults to 'div') */
  as?: SlotElement
  /** Slot content */
  children: ReactNode
}

// ─── Component ────────────────────────────────────────────────

/**
 * LayoutSlot -- a styled region within a Layout.
 *
 * Renders as a semantic HTML element (header/aside/main/footer/div)
 * with consistent padding and `data-slot="layout-slot"`.
 *
 * @example
 * ```tsx
 * <LayoutSlot as="header"><Navbar /></LayoutSlot>
 * <LayoutSlot as="main"><PageContent /></LayoutSlot>
 * <LayoutSlot as="footer"><FooterBar /></LayoutSlot>
 * ```
 */
const LayoutSlot = forwardRef<HTMLDivElement, LayoutSlotProps>(
  ({ as: Tag = 'div', className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        data-slot="layout-slot"
        className={cn(
          // Consistent slot padding — consumers can override via className
          Tag === 'header' && 'border-b px-6 py-4',
          Tag === 'aside' && 'border-r p-4',
          Tag === 'main' && 'p-6',
          Tag === 'footer' && 'border-t px-6 py-4',
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)
LayoutSlot.displayName = 'LayoutSlot'

export { LayoutSlot }
