/**
 * @stsgs/prompting -- Fallback & Bulkhead
 * Fallback: try primary, on failure invoke secondary.
 * Bulkhead: limit concurrent executions.
 * withResilience: combine retry + timeout + circuit breaker.
 */

import type { ResilienceResult } from '../core/types'
import { CircuitBreaker } from './circuit-breaker'
import { withTimeout } from './timeout'
import type { RetryConfig } from '../core/types'
import type { CircuitBreakerConfig } from './circuit-breaker'

// ─── Fallback ────────────────────────────────────────────────

/**
 * Fallback: try `primary`, on failure invoke `secondary`.
 * Optionally pass a `condition` to control when fallback is used.
 */
export async function fallback<T>(
  primary: () => Promise<T>,
  secondary: () => Promise<T>,
  condition: (error: Error) => boolean = () => true
): Promise<T> {
  try {
    return await primary()
  } catch (error) {
    if (error instanceof Error && condition(error)) {
      return await secondary()
    }
    throw error
  }
}

// ─── Bulkhead ────────────────────────────────────────────────

/**
 * Bulkhead: limit concurrent executions to `concurrency`.
 * Excess calls are queued and executed FIFO.
 */
export function bulkhead(concurrency: number) {
  let running = 0
  const queue: Array<() => void> = []

  return async function <T>(fn: () => Promise<T>): Promise<T> {
    if (running >= concurrency) {
      await new Promise<void>(resolve => queue.push(resolve))
    }
    running++
    try {
      return await fn()
    } finally {
      running--
      if (queue.length > 0) {
        const next = queue.shift()!
        next()
      }
    }
  }
}

// ─── Combined Resilience ─────────────────────────────────────

/**
 * Execute with retry + timeout + circuit breaker combined.
 * This is the full resilience stack for production AI interactions.
 */
export async function withResilience<T>(
  fn: () => Promise<T>,
  options: {
    retry?: Partial<RetryConfig>
    circuit?: Partial<CircuitBreakerConfig>
    timeout?: number
  } = {}
): Promise<ResilienceResult<T>> {
  const circuit = new CircuitBreaker(options.circuit)
  const startTime = Date.now()
  const errors: string[] = []

  return circuit
    .execute(async () => {
      if (options.timeout) {
        // Use withTimeout — it already returns ResilienceResult<T>,
        // so we unwrap and re-wrap through circuit breaker
        const result = await withTimeout(fn, options.timeout)
        errors.push(...result.errors)
        if (result.success) return result.data!
        throw new Error(errors.join('; '))
      }
      return fn()
    })
    .then(result => ({
      ...result,
      totalDuration: Date.now() - startTime,
      errors: [...errors, ...result.errors],
    }))
}
