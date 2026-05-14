/**
 * Hook API reference data for the Interface Studio preview system.
 * Each entry provides signature, return type, params, and usage example.
 */

export interface HookApi {
  name: string
  signature: string
  returns: string
  params: { name: string; type: string; optional?: boolean; default?: string }[]
  example: string
}

export const HOOKS_API: Record<string, HookApi> = {
  'use-mounted': {
    name: 'useMounted',
    signature: 'useMounted(): boolean',
    returns: 'boolean — true after hydration, false during SSR',
    params: [],
    example: `const mounted = useMounted()\nif (!mounted) return <Skeleton />`,
  },
  'use-breakpoint': {
    name: 'useBreakpoint',
    signature: 'useBreakpoint(): BreakpointState',
    returns: '{ current, isMobile, isTablet, isDesktop, isAbove, isBelow }',
    params: [],
    example: `const { isMobile, isAbove } = useBreakpoint()\nconst cols = isAbove('lg') ? 3 : 1`,
  },
  'use-copy-to-clipboard': {
    name: 'useCopyToClipboard',
    signature: 'useCopyToClipboard(options?): UseCopyToClipboardReturn',
    returns: '{ copied: boolean, copy: (text) => Promise<boolean> }',
    params: [
      { name: 'timeout', type: 'number', optional: true, default: '2000' },
    ],
    example: `const { copied, copy } = useCopyToClipboard()\n<button onClick={() => copy(url)}>\n  {copied ? 'Copied' : 'Copy'}\n</button>`,
  },
  'use-layout-advice': {
    name: 'useLayoutAdvice',
    signature: 'useLayoutAdvice(input: LayoutAdviceInput): UseLayoutAdviceResult',
    returns: '{ ranked, recommended, warnings, best, total }',
    params: [
      { name: 'goal', type: 'ProjectGoal' },
      { name: 'contentType', type: 'string' },
      { name: 'itemCount', type: 'number' },
      { name: 'needsSidebar', type: 'boolean' },
      { name: 'needsHeader', type: 'boolean' },
      { name: 'needsFooter', type: 'boolean' },
    ],
    example: `const { best } = useLayoutAdvice({\n  goal: 'dashboard',\n  contentType: 'cards',\n  itemCount: 12,\n  needsSidebar: true,\n})`,
  },
  'use-local-storage': {
    name: 'useLocalStorage',
    signature: 'useLocalStorage<T>(key, initialValue, options?): UseLocalStorageReturn<T>',
    returns: '{ value: T, setValue, remove }',
    params: [
      { name: 'key', type: 'string' },
      { name: 'initialValue', type: 'T' },
      { name: 'serializer', type: '(v: T) => string', optional: true },
      { name: 'deserializer', type: '(s: string) => T', optional: true },
    ],
    example: `const [theme, setTheme] = useLocalStorage('theme', 'dark')\n<button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />`,
  },
  'use-scroll-progress': {
    name: 'useScrollProgress',
    signature: 'useScrollProgress(options?): UseScrollProgressReturn',
    returns: '{ progress: number (0-100), isScrolled: boolean }',
    params: [
      { name: 'target', type: 'HTMLElement | null', optional: true, default: 'window' },
    ],
    example: `const { progress, isScrolled } = useScrollProgress()\n<div style={{ width: progress + '%' }} />`,
  },
  'use-animated-counter': {
    name: 'useAnimatedCounter',
    signature: 'useAnimatedCounter(options?): UseAnimatedCounterReturn',
    returns: '{ value: number, formatted: string, start: () => void }',
    params: [
      { name: 'to', type: 'number', optional: true, default: '0' },
      { name: 'from', type: 'number', optional: true, default: '0' },
      { name: 'duration', type: 'number', optional: true, default: '1000' },
      { name: 'easing', type: '(t) => number', optional: true },
      { name: 'decimals', type: 'number', optional: true, default: '0' },
      { name: 'autoStart', type: 'boolean', optional: true, default: 'true' },
    ],
    example: `const { formatted } = useAnimatedCounter({ to: 1234, duration: 2000 })\n<span>{formatted}</span>`,
  },
}
