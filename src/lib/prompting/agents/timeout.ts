/**
 * @stsgs/prompting -- Timeout
 * Execute async functions with a time limit.
 */

import type { ResilienceResult } from '../core/types'

/**
 * Execute a function with a timeout. Rejects if the function
 * takes longer than the specified duration.
 */
export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number
): Promise<ResilienceResult<T>> {
  const startTime = Date.now()

  return new Promise<ResilienceResult<T>>(resolve => {
    let settled = false

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true
        resolve({
          success: false,
          data: null,
          attempts: 1,
          totalDuration: Date.now() - startTime,
          errors: [`Timeout after ${timeoutMs}ms`],
          circuitState: {
            state: 'closed',
            failures: 1,
            successes: 0,
            lastFailure: Date.now(),
            nextRetry: null,
          },
        })
      }
    }, timeoutMs)

    fn()
      .then(data => {
        if (!settled) {
          settled = true
          clearTimeout(timer)
          resolve({
            success: true,
            data,
            attempts: 1,
            totalDuration: Date.now() - startTime,
            errors: [],
            circuitState: {
              state: 'closed',
              failures: 0,
              successes: 1,
              lastFailure: null,
              nextRetry: null,
            },
          })
        }
      })
      .catch(err => {
        if (!settled) {
          settled = true
          clearTimeout(timer)
          resolve({
            success: false,
            data: null,
            attempts: 1,
            totalDuration: Date.now() - startTime,
            errors: [err instanceof Error ? err.message : String(err)],
            circuitState: {
              state: 'closed',
              failures: 1,
              successes: 0,
              lastFailure: Date.now(),
              nextRetry: null,
            },
          })
        }
      })
  })
}
