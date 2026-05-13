'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { Check, X, AlertTriangle } from 'lucide-react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export type StatusVariant = 'active' | 'warning' | 'error' | 'info'

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status variant controlling dot color and icon */
  variant?: StatusVariant
  /** Optional label text displayed beside the dot */
  label?: string
  /** Dot size in px (default 8) */
  size?: number
  /** Show icon next to label (default true) */
  showIcon?: boolean
}

// ─── Variant Config ───────────────────────────────────────────

const VARIANT_STYLES: Record<StatusVariant, { dot: string; icon: typeof Check; labelColor: string }> = {
  active: {
    dot: 'bg-green-500',
    icon: Check,
    labelColor: 'text-green-500',
  },
  warning: {
    dot: 'bg-amber-500',
    icon: AlertTriangle,
    labelColor: 'text-amber-500',
  },
  error: {
    dot: 'bg-red-500',
    icon: X,
    labelColor: 'text-red-500',
  },
  info: {
    dot: 'bg-blue-500',
    icon: Check,
    labelColor: 'text-blue-500',
  },
}

// ─── Component ────────────────────────────────────────────────

/**
 * StatusDot -- colored status indicator with optional label.
 *
 * A small dot + icon + label combination for showing status states.
 * Useful in tables, cards, headers, and dashboards to indicate
 * active, warning, error, or informational states.
 *
 * @example
 * ```tsx
 * <StatusDot variant="active" label="Online" />
 * <StatusDot variant="error" label="Connection lost" size={10} />
 * ```
 */
export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ variant = 'active', label, size = 8, showIcon = true, className, ...props }, ref) => {
    const config = VARIANT_STYLES[variant]
    const Icon = config.icon

    return (
      <span
        ref={ref}
        data-slot="status-dot"
        className={cn('inline-flex items-center gap-1.5', className)}
        {...props}
      >
        <span
          className={cn('rounded-full shrink-0', config.dot)}
          style={{ width: size, height: size }}
        />
        {label && (
          <span className={cn('text-xs flex items-center gap-1', config.labelColor)}>
            {showIcon && <Icon className="h-3 w-3" />}
            {label}
          </span>
        )}
      </span>
    )
  }
)
StatusDot.displayName = 'StatusDot'
