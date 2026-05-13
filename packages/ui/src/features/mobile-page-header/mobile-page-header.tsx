'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface MobilePageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Back button click handler. Hidden when omitted. */
  onBack?: () => void
  /** Header title (string or ReactNode) */
  title?: ReactNode
  /** Right-side actions slot */
  actions?: ReactNode
  /** Back button label (default "Back") */
  backLabel?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * MobilePageHeader -- sticky mobile header with back button + title + actions.
 *
 * A compact fixed header optimized for mobile viewports. Shows a back
 * button on the left, title in the center/left, and an actions slot
 * on the right. Hidden on md+ breakpoints (useful alongside a desktop nav).
 *
 * @example
 * ```tsx
 * <MobilePageHeader
 *   onBack={() => router.back()}
 *   title="Settings"
 *   actions={<ThemeToggle />}
 * />
 * ```
 */
export const MobilePageHeader = forwardRef<HTMLElement, MobilePageHeaderProps>(
  ({ onBack, title, actions, backLabel = 'Back', className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        data-slot="mobile-page-header"
        className={cn(
          'md:hidden fixed top-0 left-0 right-0 z-40',
          'bg-background/80 backdrop-blur-sm border-b px-4 py-3',
          'flex items-center justify-between',
          className
        )}
        {...props}
      >
        {/* Left: back button or title */}
        <div className="flex items-center gap-2 min-w-0">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              aria-label={backLabel}
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>{backLabel}</span>
            </button>
          ) : (
            title
          )}
        </div>

        {/* Center: title when back button is shown */}
        {onBack && title && (
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-foreground truncate max-w-[50%]">
            {typeof title === 'string' ? title : title}
          </span>
        )}

        {/* Right: actions */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </header>
    )
  }
)
MobilePageHeader.displayName = 'MobilePageHeader'
