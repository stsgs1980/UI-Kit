import type { DemoConfig } from './demo-registry-types'

// ─── Complex scifi components ──────────────────────────────

export const EXTENDED_DEMOS_A_DATA_B: Record<string, DemoConfig> = {
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
