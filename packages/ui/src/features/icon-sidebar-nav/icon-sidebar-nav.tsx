'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface SidebarNavItem {
  /** Unique item ID */
  id: string
  /** Lucide icon component */
  icon: LucideIcon
  /** Display label */
  label: string
  /** Whether this item represents a page (vs in-page section) */
  isPage?: boolean
}

export interface IconSidebarNavProps extends HTMLAttributes<HTMLElement> {
  /** Navigation items */
  items: SidebarNavItem[]
  /** Currently active item ID */
  activeId?: string
  /** Callback when an item is clicked */
  onNavigate?: (id: string) => void
  /** Search button click handler. Hidden when omitted. */
  onSearchOpen?: () => void
  /** Footer slot (e.g. theme toggle) */
  footer?: ReactNode
  /** Sidebar width (default "w-14") */
  width?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * IconSidebarNav -- vertical icon sidebar with animated active indicator.
 *
 * A slim vertical navigation bar with icon-only items. Shows an animated
 * left-edge indicator on the active item using CSS transitions (no
 * framer-motion). Includes optional search button and footer slot.
 *
 * @example
 * ```tsx
 * <IconSidebarNav
 *   items={[
 *     { id: 'home', icon: Home, label: 'Home' },
 *     { id: 'settings', icon: Settings, label: 'Settings' },
 *   ]}
 *   activeId="home"
 *   onNavigate={(id) => console.log(id)}
 *   onSearchOpen={() => setOpen(true)}
 *   footer={<ThemeToggle />}
 * />
 * ```
 */
export const IconSidebarNav = forwardRef<HTMLElement, IconSidebarNavProps>(
  (
    {
      items,
      activeId,
      onNavigate,
      onSearchOpen,
      footer,
      width = 'w-14',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        data-slot="icon-sidebar-nav"
        className={cn(
          'hidden md:flex flex-col items-center gap-1 py-4 px-2',
          'fixed left-0 top-0 h-full z-40',
          'bg-background/80 backdrop-blur-sm border-r border-border',
          width,
          className
        )}
        {...props}
      >
        {/* Search button */}
        {onSearchOpen && (
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-lg transition-colors group mb-2 hover:bg-accent text-muted-foreground hover:text-foreground"
            aria-label="Search"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
        )}

        {/* Nav items */}
        {items.map((item) => {
          const isActive = activeId === item.id
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={cn(
                'relative p-2 rounded-lg transition-all group',
                isActive
                  ? 'bg-accent text-primary'
                  : 'text-muted-foreground/50 hover:bg-accent hover:text-muted-foreground'
              )}
              aria-label={item.label}
              title={item.label}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-primary rounded-r transition-all duration-200" />
              )}
              <Icon className="h-4 w-4" />
            </button>
          )
        })}

        {/* Footer slot */}
        {footer && <div className="mt-auto">{footer}</div>}
      </nav>
    )
  }
)
IconSidebarNav.displayName = 'IconSidebarNav'

// ─── Inline SearchIcon (avoids lucide-react import for simple case) ────

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
