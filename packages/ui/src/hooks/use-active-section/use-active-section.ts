'use client'

import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────

export interface UseActiveSectionOptions {
  /** Section element IDs to observe (default []) */
  sectionIds?: string[]
  /** IntersectionObserver rootMargin (default "-20% 0px -60% 0px") */
  rootMargin?: string
  /** IntersectionObserver threshold (default 0) */
  threshold?: number
  /** Default active ID when nothing intersects (default "") */
  defaultId?: string
}

export interface UseActiveSectionReturn {
  /** Currently active section ID */
  activeId: string
}

// ─── Hook ─────────────────────────────────────────────────────

/**
 * useActiveSection -- tracks which section is currently in the viewport.
 *
 * Uses IntersectionObserver to detect which of the provided section IDs
 * is visible. Useful for highlighting active nav items in a sidebar
 * or table of contents.
 *
 * @example
 * ```tsx
 * const { activeId } = useActiveSection({
 *   sectionIds: ['intro', 'features', 'pricing'],
 * })
 * ```
 */
export function useActiveSection(
  options: UseActiveSectionOptions = {}
): UseActiveSectionReturn {
  const {
    sectionIds = [],
    rootMargin = '-20% 0px -60% 0px',
    threshold = 0,
    defaultId = '',
  } = options

  const [activeId, setActiveId] = useState<string>(defaultId)

  useEffect(() => {
    if (sectionIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin, threshold }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sectionIds, rootMargin, threshold])

  return { activeId }
}
