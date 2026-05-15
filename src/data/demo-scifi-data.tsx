import type { DemoConfig } from './demo-registry'

// ─── Data-heavy scifi demos ──────────────────────────────

export const DATA_DEMOS: Record<string, DemoConfig> = {
  // NewsItem: { id, time: string, date: string, category: string, headline: string, severity: 'green'|'yellow'|'red' }
  // TrendingTopic: { label: string, value: number }
  'scifi-news-feed': {
    props: {
      newsItems: [
        { id: '1', time: '14:30', date: '2024-03-15', category: 'market', headline: 'Oil prices surge 3% on supply concerns', severity: 'red' as const },
        { id: '2', time: '12:15', date: '2024-03-15', category: 'geopolitical', headline: 'OPEC signals production cut extension', severity: 'yellow' as const },
      ],
      trending: [
        { label: 'Crude Oil', value: 78.5 },
        { label: 'Brent', value: 82.3 },
      ],
    },
  },
  // CorrelationItem: { id, label, value: string, change?: number, correlation?: number, sparkline?: number[] }
  'scifi-correlation-table': {
    props: {
      items: [
        { id: '1', label: 'WTI Crude', value: '$78.50', change: 2.1, correlation: 0.85, sparkline: [65, 68, 72, 70, 75, 78] },
        { id: '2', label: 'Brent', value: '$82.30', change: 1.8, correlation: 0.92, sparkline: [70, 73, 76, 74, 79, 82] },
        { id: '3', label: 'Natural Gas', value: '$2.85', change: -0.3, correlation: 0.42, sparkline: [2.70, 2.78, 2.82, 2.80, 2.85, 2.88] },
      ],
    },
  },
  'scifi-correlation-grid': {
    props: {
      data: {
        assets: [
          { label: 'WTI', shortLabel: 'WTI' },
          { label: 'Brent', shortLabel: 'BRN' },
          { label: 'Gas', shortLabel: 'GAS' },
          { label: 'LNG', shortLabel: 'LNG' },
        ],
        matrix: [
          [1, 0.92, 0.45, 0.38],
          [0.92, 1, 0.51, 0.42],
          [0.45, 0.51, 1, 0.67],
          [0.38, 0.42, 0.67, 1],
        ],
      },
    },
  },
  // Actor: { id, name, stance?: StanceType ('friendly'|'protective'|'hostile'|'neutral'), role?, influence? }
  'scifi-actor-grid': {
    props: {
      actors: [
        { id: '1', name: 'OPEC', stance: 'protective' as const, role: 'Producer Alliance', influence: 85, description: 'Controls 40% of global supply' },
        { id: '2', name: 'IEA', stance: 'friendly' as const, role: 'Energy Advisor', influence: 72, description: 'International energy policy' },
        { id: '3', name: 'Speculators', stance: 'hostile' as const, role: 'Market Force', influence: 60, description: 'Drive short-term volatility' },
      ],
    },
  },
  // ScenarioCards has its own Scenario type with impact field — check component separately
  'scifi-scenario-cards': {
    props: {
      scenarios: [
        { id: '1', name: 'Base Case', probability: 55, severity: 'low', description: 'Steady supply and demand growth', impact: 'Moderate price stability' },
        { id: '2', name: 'Disruption', probability: 25, severity: 'critical', description: 'Major supply chain breakdown', impact: 'Severe price spike' },
        { id: '3', name: 'Demand Shock', probability: 20, severity: 'high', description: 'Unexpected demand surge from Asia', impact: 'Sustained price increase' },
      ],
    },
  },
  // Scenario: { id, name, probability, impact: string, description, severity }
  'scifi-scenario-analysis': {
    props: {
      scenarios: [
        { id: '1', name: 'Bull Case', probability: 30, impact: 'Supply constraints push prices higher', description: 'Tight markets with strong demand growth', severity: 'high' as const },
        { id: '2', name: 'Bear Case', probability: 20, impact: 'Demand weakness leads to oversupply', description: 'Economic slowdown reduces consumption', severity: 'low' as const },
      ],
    },
  },
  // FactorConfig: { key, label, shortLabel, weight, inverse, description, defaultValue, min?, max? }
  'scifi-scenario-engine': {
    props: {
      factors: [
        { key: 'supply', label: 'Supply Risk', shortLabel: 'Supply', weight: 0.4, inverse: false, description: 'Risk of major supply disruption', defaultValue: 60, min: 0, max: 100 },
        { key: 'demand', label: 'Demand Growth', shortLabel: 'Demand', weight: 0.35, inverse: false, description: 'Global demand growth rate', defaultValue: 45, min: 0, max: 100 },
        { key: 'geopolitical', label: 'Geopolitical Tension', shortLabel: 'Geopol.', weight: 0.25, inverse: true, description: 'Geopolitical risk factor', defaultValue: 70, min: 0, max: 100 },
      ],
    },
  },
  // RiskItem: { id, name, probability: string, impact: string, description }
  'scifi-risk-matrix': {
    props: {
      items: [
        { id: '1', name: 'Pipeline Attack', probability: 'Medium', impact: 'High', description: 'Targeted attack on key pipeline infrastructure' },
        { id: '2', name: 'Port Closure', probability: 'Low', impact: 'Critical', description: 'Major port shutdown due to geopolitical event' },
        { id: '3', name: 'Price Spike', probability: 'High', impact: 'Medium', description: 'Rapid price increase exceeding threshold' },
      ],
    },
  },
  // RouteItem: { id, from, to, volume?, risk?: RouteRisk ('low'|'medium'|'high'|'critical') }
  'scifi-route-table': {
    props: {
      items: [
        { id: '1', from: 'Middle East', to: 'Asia', volume: '18M bpd', risk: 'medium' as const },
        { id: '2', from: 'Americas', to: 'Europe', volume: '5M bpd', risk: 'low' as const },
        { id: '3', from: 'Africa', to: 'Europe', volume: '3M bpd', risk: 'high' as const },
      ],
    },
  },
}
