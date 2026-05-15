/**
 * @stsgs/prompting -- Rate Limiting Utilities
 * Debounce and throttle helpers for controlling call frequency.
 */

// ─── Debounce ────────────────────────────────────────────────

/**
 * Debounce: delay execution until `delay` ms of inactivity.
 * Useful for live-preview / auto-save scenarios.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// ─── Throttle ────────────────────────────────────────────────

/**
 * Throttle: execute at most once per `limit` ms window.
 * Useful for rate-limited API calls.
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
