'use client'

import { useState, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'

/**
 * Hook for animating a numeric value from 0 to `end`.
 *
 * @example
 * ```tsx
 * const { value, ref } = useAnimatedValue(42, 2000)
 * ```
 */
export function useAnimatedValue(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!startOnView || isInView) {
      if (hasStarted.current) return
      hasStarted.current = true

      const startTime = performance.now()
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(eased * end)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
  }, [end, duration, startOnView, isInView])

  return { value, ref }
}
