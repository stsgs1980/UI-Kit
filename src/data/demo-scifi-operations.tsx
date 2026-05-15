import type { DemoConfig } from './demo-registry'

// ─── Operations scifi demos ──────────────────────────────

export const OPERATIONS_DEMOS: Record<string, DemoConfig> = {
  // ProducerData: { name, production, trend: 'up'|'down'|'stable' }; UtilizationData: { name, utilization, trend }
  'scifi-energy-dashboard': {
    props: {
      producers: [
        { id: '1', name: 'Saudi Aramco', production: 12.0, trend: 'up' as const },
        { id: '2', name: 'ExxonMobil', production: 3.8, trend: 'stable' as const },
      ],
      utilization: [
        { id: '1', name: 'Global Refining', utilization: 82, trend: 'up' as const },
      ],
      stats: [
        { id: '1', label: 'Total Supply', value: '102M bpd' },
        { id: '2', label: 'Total Demand', value: '99M bpd' },
      ],
    },
  },
  'scifi-processing-panel': {
    props: {
      spreads: [
        { region: 'US Gulf', spread: '3-2-1 Crack', value: 28.5, change: +1.2, unit: '$/bbl', color: '#00e5ff' },
        { region: 'NWE', spread: 'Brent Crack', value: 15.8, change: -0.4, unit: '$/bbl', color: '#a855f7' },
        { region: 'Asia', spread: 'Singapore Crack', value: 12.3, change: +0.8, unit: '$/bbl', color: '#22c55e' },
      ],
      products: [
        { name: 'Gasoline', price: 2.85, unit: '$/gal', change: -0.03, sparkline: [2.70, 2.78, 2.82, 2.80, 2.85, 2.88, 2.85], color: '#00e5ff' },
        { name: 'Diesel', price: 3.12, unit: '$/gal', change: +0.05, sparkline: [2.95, 3.00, 3.05, 3.08, 3.10, 3.14, 3.12], color: '#a855f7' },
        { name: 'Jet Fuel', price: 2.68, unit: '$/gal', change: +0.02, sparkline: [2.55, 2.58, 2.60, 2.63, 2.65, 2.70, 2.68], color: '#22c55e' },
      ],
      utilization: [
        { region: 'US Refineries', utilization: 87, change: +2.1 },
        { region: 'European Refineries', utilization: 78, change: -1.5 },
        { region: 'Asian Refineries', utilization: 82, change: +0.8 },
      ],
    },
  },
  // ComplianceEntity: { name, icon, category: 'restriction'|'embargo'|'sanction', severity, effectiveDate, impactValue, compliance: number, priceImpact, description }
  'scifi-compliance-tracker': {
    props: {
      entities: [
        { id: '1', name: 'Alpha Corp', icon: 'A', category: 'sanction' as const, severity: 'critical' as const, effectiveDate: '2024-01-15', impactValue: '$2.1B', compliance: 92, priceImpact: '+$4.20', description: 'Primary sanction target with full compliance program' },
        { id: '2', name: 'Beta Ltd', icon: 'B', category: 'embargo' as const, severity: 'medium' as const, effectiveDate: '2024-02-01', impactValue: '$800M', compliance: 67, priceImpact: '+$1.60', description: 'Partial embargo with compliance gaps identified' },
      ],
      complianceRate: 78,
    },
  },
  // ReserveRegion: { id, name, currentValue, capacityPercent, trend, trendValue, sparkline }
  // SummaryStat: { label, value: number, suffix, description, color }
  'scifi-reserve-monitor': {
    props: {
      regions: [
        { id: '1', name: 'North Sea', currentValue: '4.5B', capacityPercent: 45, trend: 'down' as const, trendValue: '-5%', sparkline: [50, 48, 47, 46, 45] },
        { id: '2', name: 'Gulf of Mexico', currentValue: '7.2B', capacityPercent: 72, trend: 'up' as const, trendValue: '+2%', sparkline: [68, 69, 70, 71, 72] },
      ],
      summaryStats: [
        { id: '1', label: 'Global Reserves', value: 1.73, suffix: 'T barrels', description: 'Total proven reserves worldwide', color: '#00e5ff' },
        { id: '2', label: 'R/P Ratio', value: 53, suffix: ' years', description: 'Reserves-to-production ratio', color: '#a855f7' },
      ],
    },
  },
  // DisruptionEvent: { id, name, status: 'active'|'monitoring'|'resolved', severity: 'critical'|..., impact: number, duration: string, trend: 'up'|'down'|'stable', description }
  // KpiItem: { label, value: string, unit: string, color: string }
  'scifi-chain-tracker': {
    props: {
      disruptions: [
        { id: '1', name: 'Suez Canal Delay', status: 'active' as const, severity: 'high' as const, impact: 72, duration: '14 days', trend: 'up' as const, description: 'Shipping delays through Suez Canal due to security concerns' },
      ],
      riskScore: 62,
      summaryKpis: [
        { id: '1', label: 'Active Incidents', value: '3', unit: '', color: '#ff2244' },
        { id: '2', label: 'On-Time Rate', value: '87%', unit: '', color: '#00e5ff' },
      ],
    },
  },
  // DisruptionItem: { id, region, detail, type: DisruptionItemType, volume: number, duration: number, status, impact: number }
  'scifi-disruption-panel': {
    props: {
      disruptions: [
        { id: '1', region: 'Middle East', detail: 'Escalating regional tensions affecting shipping lanes', type: 'political' as const, volume: 2.1, duration: 14, status: 'active' as const, impact: 72 },
      ],
      riskScore: 58,
    },
  },
  'scifi-incident-tracker': {
    props: {
      incidents: [
        { id: '1', location: 'North Sea', date: '2024-03-14', volume: '1.2M bpd', cause: 'Equipment', status: 'Resolved', statusColor: '#22c55e', statusBg: 'rgba(34,197,94,0.1)' },
      ],
      stats: [
        { id: '1', label: 'Total', value: '47', accentColor: '#00e5ff' },
        { id: '2', label: 'Resolved', value: '42', accentColor: '#22c55e' },
      ],
    },
  },
  // KeyMetric: { label, value: number, suffix, description, color }
  // CountryImpact: { name, flag, reduction, percent, severity }
  // SectorImpact: { name, icon, reduction, color }
  'scifi-demand-curve': {
    props: {
      metrics: [
        { id: '1', label: 'Global Demand', value: 103, suffix: 'M bpd', description: 'Total global oil demand forecast', color: '#00e5ff' },
      ],
      countries: [
        { id: '1', name: 'China', flag: 'CN', reduction: -1.2, percent: 3.2, severity: 'high' as const },
        { id: '2', name: 'India', flag: 'IN', reduction: -0.8, percent: 4.1, severity: 'moderate' as const },
      ],
      sectors: [
        { id: '1', name: 'Transportation', icon: 'T', reduction: -2.1, color: '#00e5ff' },
        { id: '2', name: 'Industrial', icon: 'I', reduction: -0.8, color: '#a855f7' },
      ],
    },
  },
  // MetricCard: { label, value: number, suffix? }; VesselType: { type, count, color }
  'scifi-transit-monitor': {
    props: {
      metrics: [
        { label: 'Vessels in Transit', value: 842 },
        { label: 'Avg Transit Time', value: 18, suffix: ' days' },
      ],
      vesselTypes: [
        { type: 'VLCC', count: 124, color: '#00e5ff' },
        { type: 'Suezmax', count: 89, color: '#a855f7' },
      ],
    },
  },
  // Vessel: { id, name, type, status: VesselStatus ('transit'|'anchored'|'diverted'), cargo, eta? }
  // SecurityZone: { name, threat: ThreatLevel ('low'|...), description }
  'scifi-fleet-monitor': {
    props: {
      vessels: [
        { id: '1', name: 'MV Pacific Star', type: 'VLCC', status: 'transit' as const, cargo: 'Crude Oil', eta: '2024-04-01' },
        { id: '2', name: 'MV Atlantic Dream', type: 'Suezmax', status: 'anchored' as const, cargo: 'Brent Blend', eta: '-' },
      ],
      securityZones: [
        { id: '1', name: 'Strait of Hormuz', threat: 'high' as const, description: 'Elevated threat level for all commercial vessels' },
      ],
    },
  },
  'scifi-infrastructure-map': {
    props: {
      nodes: [
        { id: '1', name: 'Ras Tanura', location: 'Saudi Arabia', capacity: '8M bpd', capacityValue: 8, capacityUnit: 'M/day', status: 'Active', threat: 'Low', type: 'terminal', description: 'World largest crude oil export terminal', coordinates: { x: 200, y: 120 }, mapLabel: 'RT' },
        { id: '2', name: 'Yanbu Export', location: 'Saudi Arabia', capacity: '5M bpd', capacityValue: 5, capacityUnit: 'M/day', status: 'Active', threat: 'Low', type: 'terminal', description: 'Red Sea export facility', coordinates: { x: 160, y: 150 }, mapLabel: 'YN' },
        { id: '3', name: 'East-West Pipeline', location: 'Saudi Arabia', capacity: '5M bpd', capacityValue: 5, capacityUnit: 'M/day', status: 'Active', threat: 'Medium', type: 'pipeline', description: 'Cross-kingdom crude pipeline', coordinates: { x: 180, y: 100 }, mapLabel: 'EW' },
        { id: '4', name: 'Fujairah LNG', location: 'UAE', capacity: '3M bpd', capacityValue: 3, capacityUnit: 'M/day', status: 'At Risk', threat: 'High', type: 'lng', description: 'LNG regasification terminal', coordinates: { x: 280, y: 140 }, mapLabel: 'FJ' },
      ],
    },
  },
  // PricePoint: { date: string, value: number }; AnalysisLevel: { ratio, label, color, price }
  'scifi-level-analysis': {
    props: {
      data: Array.from({ length: 30 }, (_, i) => ({ date: `Day ${i + 1}`, value: 70 + Math.sin(i * 0.3) * 15 })),
      levels: [
        { ratio: 80, label: 'Resistance', color: '#ff4444', price: 82 },
        { ratio: 60, label: 'Support', color: '#44ff44', price: 58 },
      ],
    },
  },
  // IndicatorConfig: { type: 'rsi'|'macd'|'bollinger', period?, stdDev? }
  'scifi-indicator-panel': {
    props: {
      priceData: Array.from({ length: 30 }, (_, i) => 70 + Math.sin(i * 0.3) * 15),
      indicators: [
        { type: 'rsi' as const, period: 14 },
        { type: 'macd' as const },
        { type: 'bollinger' as const, period: 20, stdDev: 2 },
      ],
    },
  },
  // CorrelationPanelConfig: { title, accentColor, columns: ColumnHeader[] }
  // CorrelationItem: { id, label, description, value: string, changeShort, changeLong, correlation, correlationLabel, sparkline }
  // CorrelationAsset: { id, name, sublabel, price: string, unit, change24h, correlation, trend: CorrelationTrend, sparkline }
  'scifi-correlation-dashboard': {
    props: {
      leftPanel: {
        title: 'Supply Correlations',
        accentColor: '#00e5ff',
        columns: [
          { widthClass: 'w-[180px]', label: 'Asset' },
          { widthClass: 'w-[80px]', label: 'Value' },
          { widthClass: 'w-[70px]', label: '1D' },
          { widthClass: 'w-[70px]', label: '7D' },
          { widthClass: 'w-[80px]', label: 'Corr.' },
        ],
      },
      leftItems: [
        { id: '1', label: 'WTI Crude', description: 'West Texas Intermediate benchmark', value: '$78.50', changeShort: 2.1, changeLong: 3.4, correlation: 0.85, correlationLabel: 'Strong', sparkline: [65, 68, 72, 70, 75, 78] },
      ],
      rightPanel: {
        title: 'Asset Performance',
        accentColor: '#a855f7',
        columns: [
          { widthClass: 'w-[160px]', label: 'Asset' },
          { widthClass: 'w-[90px]', label: 'Price' },
          { widthClass: 'w-[70px]', label: '24H' },
          { widthClass: 'w-[80px]', label: 'Corr.' },
        ],
      },
      rightItems: [
        { id: '1', name: 'Gold', sublabel: 'Precious Metals', price: '$2,045', unit: '$/oz', change24h: 0.8, correlation: 0.42, trend: 'up' as const, sparkline: [2010, 2020, 2030, 2025, 2035, 2045] },
      ],
    },
  },
  // Beneficiary: { id, name, category: BeneficiaryCategory ('producer'|'alternative'|'financial'|'other'), benefit: string, gain: number, description }
  'scifi-impact-beneficiaries': {
    props: {
      beneficiaries: [
        { id: '1', name: 'ExxonMobil', category: 'producer' as const, benefit: '+$2.1B', gain: 85, description: 'Major integrated producer benefiting from higher prices' },
        { id: '2', name: 'Chevron', category: 'producer' as const, benefit: '+$1.5B', gain: 72, description: 'Diversified producer with strong upstream exposure' },
      ],
    },
  },
  // ScifiPeriodSelectorProps: { value, onChange, options }
  'scifi-period-selector': {
    props: {
      value: '30d',
      onChange: () => {},
      options: [
        { value: '7d', label: '7D' },
        { value: '30d', label: '30D' },
        { value: '90d', label: '90D' },
      ],
    },
  },
  // TacticalMarker: { id, name, x, y, color }
  'scifi-tactical-map': {
    props: {
      markers: [
        { id: '1', name: 'Zone Alpha', x: 200, y: 150, color: '#ff4444', pulse: true },
        { id: '2', name: 'Zone Bravo', x: 350, y: 100, color: '#00e5ff' },
      ],
    },
  },
  // TrackedAsset: { id, name, type, affiliation, status, statusColor, statusBg, threat }
  'scifi-tracked-assets': {
    props: {
      assets: [
        { id: '1', name: 'Asset Alpha', type: 'Pipeline', affiliation: 'Allied', status: 'Active', statusColor: '#22c55e', statusBg: 'rgba(34,197,94,0.1)', threat: 12 },
        { id: '2', name: 'Asset Beta', type: 'Terminal', affiliation: 'Neutral', status: 'Monitoring', statusColor: '#eab308', statusBg: 'rgba(234,179,8,0.1)', threat: 65 },
      ],
    },
  },
}
