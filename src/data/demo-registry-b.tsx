import type { DemoConfig } from './demo-registry-types'

// ─── Features (Layer 4), Page Compositions (Layer 5), UI Primitives ───

export const DEMO_REGISTRY_B: Record<string, DemoConfig> = {
  // ── features (Layer 4) ──
  'command-palette': {
    props: {
      open: false,
      onClose: () => {},
      placeholder: 'Type a command...',
    },
  },

  'responsive-showcase': {
    props: {
      showBreakpoints: true,
    },
    children: <div style={{ padding: 24, textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>Preview Area</div>,
  },

  'ide-layout': {
    props: {
      files: [
        { name: 'page.tsx', language: 'tsx', content: 'export default function Home() {\n  return <main>Hello</main>\n}' },
        { name: 'theme.ts', language: 'ts', content: 'export const tokens = {\n  primary: "#10B981"\n}' },
      ],
      terminalLines: ['$ pnpm dev', 'Ready in 1.2s'],
      statusText: 'TypeScript React',
    },
  },

  'theme-toggle': {
    props: {
      mode: 'dark' as const,
      onToggle: () => {},
      showLabel: true,
    },
  },

  'floating-decorations': {
    props: {
      symbols: ['<>', '{}', '//', '()'],
      count: 6,
    },
  },

  'scroll-progress-bar': {
    props: {},
  },

  'activity-timeline': {
    props: {
      entries: [
        { id: 'act-1', description: 'Commit abc123 — Add hero section', kind: 'success' as const, timestamp: new Date() },
        { id: 'act-2', description: 'Review requested — PR #42 needs review', kind: 'info' as const, timestamp: new Date() },
      ],
    },
  },

  // ── page compositions (Layer 5) ──
  'landing-premium': {
    props: {},
  },

  // ── ui primitives that can render standalone ──
  'code-block': {
    props: {
      code: 'const greet = (name: string) => `Hello, ${name}!`',
      language: 'typescript',
      showLineNumbers: true,
    },
  },

  'slider-control': {
    props: {
      label: 'Gap',
      value: 24,
      min: 0,
      max: 48,
      onChange: () => {},
    },
  },

  'color-picker-input': {
    props: {
      label: 'Accent',
      value: '#10B981',
      onChange: () => {},
    },
  },

  'copy-button': {
    props: {
      text: 'npm install @stsgs/ui',
    },
  },
}
