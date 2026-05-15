import type { DemoConfig } from './demo-registry-types'

// ─── Zero-config / Simple-props / Ticker / CTA / Stats ─────

export const EXTENDED_DEMOS_A_DATA: Record<string, DemoConfig> = {
  // ── Zero-config ──
  'search-panel': { props: {} },
  'scifi-hero': { props: {} },
  // scifi-loading-screen omitted: fixed inset-0 z-[9999] covers entire page
  'scifi-live-feed': {
    props: {
      items: [
        { id: '1', label: 'BRENT', value: '$82.30', change: 1.8, timestamp: '14:30', severity: 'info' },
        { id: '2', label: 'WTI', value: '$78.50', change: -0.3, timestamp: '14:15', severity: 'warning' },
        { id: '3', label: 'NG', value: '$2.14', change: 3.2, timestamp: '14:00', severity: 'info' },
      ],
      label: 'Market Feed',
    },
  },
  'scifi-scroll-progress': { props: {} },
  'scifi-transit-overview': { props: { heroPercent: 21, heroLabel: 'of global throughput' } },
  'back-to-top': { props: {} },

  // ── Simple props ──
  'animated-counter': { props: { end: 155, suffix: '' } },
  'typing-effect': { props: { text: 'Building UI components...', speed: 40 } },
  'hud-card': {
    props: { title: 'System Status' },
    children: <div style={{ padding: 8, color: '#94A3B8', fontSize: 13 }}>All systems operational</div>,
  },
  'mini-sparkline': { props: { data: [10, 25, 18, 30, 22, 35, 28, 40, 32, 45] } },
  'scifi-badge': { props: { preset: 'critical', label: 'CRITICAL' } },
  'scifi-gauge': { props: { variant: 'ring' as const, value: 72 } },
  'scifi-section-header': { props: { label: 'MONITORING', title: 'System Overview' } },

  // ── Ticker / CTA / Stats ──
  // TickerItem: { label, value: string|number, change?: number, prefix?: string }
  'scifi-ticker-bar': {
    props: {
      items: [
        { label: 'BTC', value: '$67,432', change: 2.4 },
        { label: 'ETH', value: '$3,891', change: -0.8 },
        { label: 'SOL', value: '$178', change: 5.1 },
      ],
    },
  },
  // CtaMetric: { label: string, value: string }
  'scifi-cta-section': {
    props: {
      title: 'Strategic Assessment',
      description: 'Current threat levels and recommended actions.',
      metrics: [
        { label: 'Readiness', value: '78%' },
        { label: 'Risk Score', value: '23' },
      ],
    },
  },
  // StatMetric: { id, label, value: number|string, suffix?, prefix?, color? }
  'scifi-stats-section': {
    props: {
      metrics: [
        { id: '1', label: 'Active Assets', value: 1247, suffix: '', color: '#00e5ff' },
        { id: '2', label: 'Risk Level', value: 42, suffix: '', color: '#ff2244' },
      ],
      title: 'Key Metrics',
    },
  },
}
