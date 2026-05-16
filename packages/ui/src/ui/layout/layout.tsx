'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../tokens/cn'

// ─── Types ────────────────────────────────────────────────────

export interface LayoutSlotProps {
  /** Slot content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
}

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Header region */
  header?: ReactNode
  /** Sidebar region (only used in 'sidebar' variant) */
  sidebar?: ReactNode
  /** Footer region */
  footer?: ReactNode
  /** Main content (always required) */
  children: ReactNode
  /** Layout structure variant */
  variant?: 'sidebar' | 'top-nav'
}

// ─── Component ────────────────────────────────────────────────

/**
 * Layout -- page-level grid composition component.
 *
 * Provides two layout variants:
 * - `sidebar`: two-column grid with a 250 px sidebar on the left.
 * - `top-nav`: three-row grid (header / content / footer).
 *
 * Always covers the full viewport (`min-height: 100vh`).
 *
 * @example
 * ```tsx
 * // Sidebar layout
 * <Layout variant="sidebar" header={<Nav />} sidebar={<Sidebar />}>
 *   <Dashboard />
 * </Layout>
 *
 * // Top-nav layout
 * <Layout variant="top-nav" header={<TopBar />} footer={<Footer />}>
 *   <Page />
 * </Layout>
 * ```
 */
const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ variant = 'top-nav', header, sidebar, footer, children, className, style, ...props }, ref) => {
    const isSidebar = variant === 'sidebar'

    const gridStyle: React.CSSProperties = isSidebar
      ? { gridTemplateColumns: '250px 1fr', gridTemplateRows: 'auto 1fr auto' }
      : { gridTemplateRows: 'auto 1fr auto' }

    return (
      <div
        ref={ref}
        data-slot="layout"
        className={cn('grid min-h-screen', className)}
        style={{ ...gridStyle, ...style }}
        {...props}
      >
        {isSidebar ? (
          <>
            {/* ── sidebar variant: full-width header ── */}
            {header && <header data-slot="layout-header">{header}</header>}
            {sidebar && <aside data-slot="layout-sidebar">{sidebar}</aside>}
            <main data-slot="layout-content">{children}</main>
            {footer && <footer data-slot="layout-footer">{footer}</footer>}
          </>
        ) : (
          <>
            {/* ── top-nav variant: single-column stack ── */}
            {header && <header data-slot="layout-header">{header}</header>}
            <main data-slot="layout-content">{children}</main>
            {footer && <footer data-slot="layout-footer">{footer}</footer>}
          </>
        )}
      </div>
    )
  }
)
Layout.displayName = 'Layout'

export { Layout }
