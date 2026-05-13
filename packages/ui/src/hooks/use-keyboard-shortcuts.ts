'use client'

import { useEffect, useCallback, useRef } from 'react'

/**
 * Map of keyboard shortcut definitions.
 * Key is a combination like "ctrl+k", "shift+/", "escape", "arrowup".
 * Value is the handler to call when the shortcut is triggered.
 */
export interface ShortcutMap {
  [combo: string]: (() => void) | undefined
}

export interface UseKeyboardShortcutsOptions {
  /** Map of key combos to handlers. Keys use lowercase: "ctrl+k", "meta+k", "shift+/", "escape", "arrowup" */
  shortcuts: ShortcutMap
  /** Whether the hook is active. Default: true */
  enabled?: boolean
  /** Skip handling when focus is in input/textarea/select. Default: true */
  skipInputs?: boolean
}

/**
 * React hook for declarative keyboard shortcuts.
 *
 * Parses key combos like "ctrl+k", "meta+k", "shift+/" into modifier + key
 * pairs and attaches a single keydown listener. Optionally skips events from
 * form elements (input, textarea, select).
 *
 * @example
 * ```tsx
 * useKeyboardShortcuts({
 *   shortcuts: {
 *     'ctrl+k': () => searchRef.current?.focus(),
 *     'escape': () => setOpen(false),
 *     'arrowup': () => selectPrev(),
 *     'arrowdown': () => selectNext(),
 *     'enter': () => confirm(),
 *   },
 * })
 * ```
 */
export function useKeyboardShortcuts({
  shortcuts,
  enabled = true,
  skipInputs = true,
}: UseKeyboardShortcutsOptions): void {
  const shortcutsRef = useRef(shortcuts)
  shortcutsRef.current = shortcuts

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return

      const target = e.target as HTMLElement | null
      if (skipInputs && target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return
      }

      const parts: string[] = []
      if (e.ctrlKey || e.metaKey) parts.push('ctrl')
      if (e.altKey) parts.push('alt')
      if (e.shiftKey) parts.push('shift')
      parts.push(e.key.toLowerCase())
      const combo = parts.join('+')

      const handler = shortcutsRef.current[combo]
      if (handler) {
        e.preventDefault()
        handler()
        return
      }

      // Also try the raw key for non-modifier shortcuts
      const rawKey = e.key.toLowerCase()
      const rawHandler = shortcutsRef.current[rawKey]
      if (rawHandler) {
        e.preventDefault()
        rawHandler()
      }
    },
    [enabled, skipInputs],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
