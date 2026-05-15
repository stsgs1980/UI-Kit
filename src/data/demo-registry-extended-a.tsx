import type { DemoConfig } from './demo-registry'

// ─── Zero-config components (render with no props) ─────────
// ─── Simple-props components (1-2 values) ──────────────────
// ─── First batch of complex scifi components ────────────────

export const EXTENDED_DEMOS_A: Record<string, DemoConfig> = {
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

  // ── Complex scifi (minimal data) ──
  'scifi-timeline': {
    props: {
      events: [
        { id: '1', title: 'Supply Disruption', date: '2024-03-15', category: 'primary', importance: 'critical', description: 'Major pipeline outage detected' },
        { id: '2', title: 'Market Correction', date: '2024-03-10', category: 'market', importance: 'high', description: 'Price dropped below threshold' },
      ],
    },
  },
  'scifi-event-calendar': {
    props: {
      events: [
        { id: '1', title: 'OPEC Meeting', date: '2024-04-01', category: 'primary', importance: 'critical', description: 'Production quota review' },
      ],
    },
  },
  // SectorData: { label, value }; SentimentData: { label, value, tag }
  'scifi-pulse-meter': {
    props: {
      score: 68,
      sectors: [
        { label: 'Energy', value: 82 }, { label: 'Logistics', value: 54 },
        { label: 'Finance', value: 71 }, { label: 'Technology', value: 63 },
      ],
      sentiments: [
        { label: 'Fear', value: 35, tag: 'low' }, { label: 'Greed', value: 65, tag: 'high' },
      ],
    },
  },
  // RegionData: { name, score }; DriverData: { name, impact }
  'scifi-tension-index': {
    props: {
      score: 45,
      regions: [
        { name: 'Middle East', score: 78 },
        { name: 'Europe', score: 32 },
      ],
      drivers: [
        { name: 'Geopolitical', impact: 72 },
        { name: 'Economic', impact: 28 },
      ],
    },
  },
  'scifi-button-group': {
    props: {
      value: 'moderate',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
      ],
      onChange: () => {},
    },
  },
  // SentimentIndicator: { id, name, value, change }
  'scifi-sentiment-gauge': {
    props: {
      score: 62,
      indicators: [
        { id: '1', name: 'RSI', value: 55, change: 4.2 },
        { id: '2', name: 'MACD', value: 72, change: -1.8 },
      ],
    },
  },
  // ComparisonCardData: { id, name, value: number, trend?, change? }
  'scifi-comparison-grid': {
    props: {
      cards: [
        { id: '1', name: 'Pipeline A', value: 1200000, change: 3.2 },
        { id: '2', name: 'Pipeline B', value: 800000, change: -1.1 },
        { id: '3', name: 'Pipeline C', value: 500000, change: 0.8 },
      ],
    },
  },
  // VersusTeam: { name, color, background, borderColor, stats: VersusStat[] }
  // VersusBarItem: { label, leftValue, leftLabel, rightValue, rightLabel }
  'scifi-versus-panel': {
    props: {
      leftTeam: { name: 'OPEC', color: '#00e5ff', background: 'rgba(0,229,255,0.04)', borderColor: 'rgba(0,229,255,0.12)', stats: [{ label: 'Output', value: '32M', color: '#00e5ff' }] },
      rightTeam: { name: 'Non-OPEC', color: '#a855f7', background: 'rgba(168,85,247,0.04)', borderColor: 'rgba(168,85,247,0.12)', stats: [{ label: 'Output', value: '28M', color: '#a855f7' }] },
      bars: [
        { label: 'Market Share', leftValue: 53, leftLabel: '53%', rightValue: 47, rightLabel: '47%' },
        { label: 'Growth Rate', leftValue: 1.2, leftLabel: '1.2', rightValue: 2.8, rightLabel: '2.8' },
      ],
    },
  },
  // DataPoint: { label: string, value: number }
  'scifi-chart-grid': {
    props: {
      charts: [
        { id: '1', title: 'Production', type: 'area' as const, data: Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1), value: 40 + Math.sin(i) * 15 })) },
        { id: '2', title: 'Consumption', type: 'bar' as const, data: Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1), value: 30 + Math.cos(i) * 10 })) },
      ],
    },
  },
  // AlertItem: { id, title, description, currentValue, threshold, severity: SeverityLevel, category: AlertCategoryType }
  'scifi-alert-panel': {
    props: {
      alerts: [
        { id: '1', title: 'Pipeline Pressure', description: 'Upstream pressure exceeding normal range', currentValue: '120 PSI', threshold: '100 PSI', severity: 'Critical' as const, category: 'logistics' as const },
        { id: '2', title: 'Tank Level Low', description: 'Storage tank below minimum threshold', currentValue: '15%', threshold: '20%', severity: 'High' as const, category: 'price' as const },
      ],
    },
  },
  // DashboardAlert: { id, severity: 'CRITICAL'|..., category, title, description, source, timestamp: string }
  'scifi-alert-dashboard': {
    props: {
      alerts: [
        { id: '1', severity: 'CRITICAL' as const, category: 'security', title: 'System Breach', description: 'Unauthorized access detected', source: 'IDS Monitor', timestamp: '14:30' },
      ],
      stats: { total: 142, critical: 3, high: 12, medium: 45, low: 82, avgResponse: 4.2, escalationRate: 0.08 },
    },
  },
  // FlowNode: { id, label, value, y, color? }; FlowRoute: { id, sourceId, destId, value, sy, dy, color? }
  'scifi-sankey-flow': {
    props: {
      sources: [
        { id: 's1', label: 'Middle East', value: 30, y: 72, color: '#00e5ff' },
        { id: 's2', label: 'Americas', value: 20, y: 280, color: '#a855f7' },
      ],
      destinations: [
        { id: 'd1', label: 'Asia Pacific', value: 25, y: 108, color: '#00e5ff' },
        { id: 'd2', label: 'Europe', value: 15, y: 340, color: '#22c55e' },
      ],
      routes: [
        { id: 'r1', sourceId: 's1', destId: 'd1', value: 18, sy: 64, dy: 98, color: '#00e5ff' },
        { id: 'r2', sourceId: 's1', destId: 'd2', value: 12, sy: 88, dy: 326, color: '#00e5ff' },
        { id: 'r3', sourceId: 's2', destId: 'd1', value: 7, sy: 272, dy: 118, color: '#a855f7' },
        { id: 'r4', sourceId: 's2', destId: 'd2', value: 13, sy: 292, dy: 340, color: '#a855f7' },
      ],
      totalFlow: 50,
    },
  },
  'scifi-tabbed-view': {
    props: {
      tabs: [
        { id: 'overview', label: 'Overview', color: '#00e5ff' },
        { id: 'analysis', label: 'Analysis', color: '#a855f7' },
      ],
      defaultValue: 'overview',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ((tab: string) => (
      <div style={{ padding: 16, color: '#94A3B8', fontSize: 13 }}>
        Content for tab: {tab}
      </div>
    )) as any,
  },
}
