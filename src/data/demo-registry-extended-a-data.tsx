import type { DemoConfig } from './demo-registry-types'

// ─── Zero-config / Simple-props / Ticker / CTA / Stats ─────

export const EXTENDED_DEMOS_A_DATA: Record<string, DemoConfig> = {
  // ── Zero-config ──
  'search-panel': { props: {} },
  'back-to-top': { props: {} },

  // ── Simple props ──
  'animated-counter': { props: { end: 155, suffix: '' } },
  'typing-effect': { props: { text: 'Building UI components...', speed: 40 } },
  'hud-card': {
    props: { title: 'System Status' },
    children: <div style={{ padding: 8, color: '#94A3B8', fontSize: 13 }}>All systems operational</div>,
  },
  'mini-sparkline': { props: { data: [10, 25, 18, 30, 22, 35, 28, 40, 32, 45] } },
}
