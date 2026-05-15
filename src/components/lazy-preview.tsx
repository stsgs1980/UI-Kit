'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * LazyPreview — wraps heavy live previews with IntersectionObserver.
 * Only renders `children` when the element is near the viewport,
 * preventing 58+ simultaneous Canvas/framer-motion renders.
 */
export function LazyPreview({ children, placeholder, rootMargin = '200px' }: {
  children: ReactNode
  placeholder?: ReactNode
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} style={{ minHeight: 200 }}>
      {visible ? children : placeholder}
    </div>
  )
}
