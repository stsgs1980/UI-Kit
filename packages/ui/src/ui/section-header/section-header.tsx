'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Section number or label (e.g. "01", "A") */
  num?: string
  /** Section title */
  title: string
  /** Optional subtitle / description */
  subtitle?: string
  /** HTML heading level (default 2) */
  level?: 2 | 3 | 4
  /** Show fade-in animation on scroll (default false) */
  animate?: boolean
}

// ─── Component ────────────────────────────────────────────────

/**
 * SectionHeader -- numbered heading with optional subtitle.
 *
 * A reusable section heading pattern: numbered label + title + subtitle.
 * Supports scroll-triggered fade-in animation via IntersectionObserver
 * (no framer-motion dependency). Theme-agnostic via Tailwind CSS classes.
 *
 * @example
 * ```tsx
 * <SectionHeader num="01" title="Getting Started" subtitle="Set up your project in minutes" />
 * ```
 */
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ num, title, subtitle, level = 2, animate = false, className, ...props }, ref) => {
    const Tag = `h${level}` as const

    return (
      <div
        ref={ref}
        data-slot="section-header"
        className={cn(
          'mb-6 md:mb-8',
          animate && 'animate-in fade-in slide-in-from-bottom-4 duration-500',
          className
        )}
        {...props}
      >
        {num && (
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            {num}
          </span>
        )}
        <Tag className="text-2xl md:text-3xl font-bold mt-1 tracking-tight text-foreground">
          {title}
        </Tag>
        {subtitle && (
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    )
  }
)
SectionHeader.displayName = 'SectionHeader'
