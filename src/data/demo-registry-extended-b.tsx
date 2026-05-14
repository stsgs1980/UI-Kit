import type { DemoConfig } from './demo-registry'

// ─── Second batch of complex scifi components ───────────────

export const EXTENDED_DEMOS_B: Record<string, DemoConfig> = {
  // ── Compare slider: CompareSliderProps { before, after, beforeLabel?, afterLabel? } ──
  'compare-slider': {
    props: {
      before: <div style={{ width: 200, height: 120, background: 'linear-gradient(135deg, #1e293b, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: 14 }}>Before State</div>,
      after: <div style={{ width: 200, height: 120, background: 'linear-gradient(135deg, #0f172a, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>After State</div>,
      beforeLabel: 'Before',
      afterLabel: 'After',
    },
  },

  // ── Column browsers ──
  'three-column-browser': {
    props: {
      categories: [{ id: 'ui', label: 'UI' }, { id: 'sections', label: 'Sections' }],
      items: [
        { id: 'btn', name: 'Button', category: 'ui' },
        { id: 'hero', name: 'Hero Section', category: 'sections' },
      ],
      selectedCategoryId: 'ui',
      filterByCategory: (item: any, catId: string) => item.category === catId,
      renderDetail: (item: any) => <div style={{ padding: 16, color: '#94A3B8' }}>{item.name} component preview</div>,
    },
  },
  'four-column-browser': {
    props: {
      categories: [{ id: 'all', label: 'All' }],
      items: [{ id: '1', name: 'Button' }],
      selectedCategoryId: 'all',
      renderPreview: (item: any) => <div style={{ padding: 16, color: '#94A3B8' }}>Preview: {item.name}</div>,
      renderCode: (item: any) => <pre style={{ padding: 16, color: '#94A3B8', fontSize: 12 }}>{`<${item.name.toLowerCase()} />`}</pre>,
    },
  },

  // ── Data-heavy scifi ──
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
  // PriceRegion: { region, price, change }; StorageLevel: { region, level, avg5y, status, color }; PipelineFlow: { route, volume, maxVolume, direction, status }
  'scifi-flow-tracker': {
    props: {
      priceRegions: [
        { region: 'WTI', price: 78.5, change: 2.1 },
        { region: 'Brent', price: 82.3, change: 1.8 },
      ],
      storageLevels: [{ region: 'Europe', level: 65, avg5y: 62, status: 'warning' as const, color: '#ff6b00' }],
      pipelineFlows: [{ route: 'North Sea → Rotterdam', volume: 1.2, maxVolume: 2.0, direction: 'increase' as const, status: 'fact' as const }],
    },
  },
  // MapRegion: { id, name, path: string, labelX, labelY, riskLevel, data: Record<string,string> }
  'scifi-region-map': {
    props: {
      regions: [
        { id: 'me', name: 'Middle East', path: 'M 150,40 L 220,30 L 280,45 L 300,80 L 290,130 L 250,160 L 180,155 L 140,120 L 130,80 Z', labelX: 210, labelY: 95, riskLevel: 'high' as const, data: { supply: '31M bpd', reserves: '800B' } },
        { id: 'eu', name: 'Europe', path: 'M 60,40 L 120,30 L 130,80 L 140,120 L 120,160 L 80,170 L 40,140 L 35,90 Z', labelX: 85, labelY: 100, riskLevel: 'low' as const, data: { demand: '15M bpd', reserves: '50B' } },
        { id: 'as', name: 'Asia Pacific', path: 'M 310,30 L 380,40 L 400,90 L 390,150 L 340,170 L 300,140 L 290,80 L 300,50 Z', labelX: 345, labelY: 105, riskLevel: 'medium' as const, data: { demand: '35M bpd', reserves: '300B' } },
      ],
    },
  },
  'scifi-nav-bar': {
    props: {
      brand: '@stsgs/ui',
      groups: [
        {
          id: 'components',
          label: 'Components',
          sections: [
            { id: 'ui', label: 'UI Kit' },
            { id: 'sections', label: 'Sections' },
            { id: 'features', label: 'Features' },
          ],
        },
      ],
    },
  },
  'scifi-canvas-chart': {
    props: {
      type: 'area' as const,
      data: Array.from({ length: 20 }, (_, i) => ({ x: i, y: 30 + Math.sin(i * 0.5) * 20 + Math.random() * 5 })),
    },
  },
  // CurvePoint: { label: string, value: number }; ForecastModel: { name, color, values: number[], confidence: number[] }
  'scifi-forecast-panel': {
    props: {
      futuresCurve: Array.from({ length: 12 }, (_, i) => ({ label: `M${i + 1}`, value: 75 + i * 1.5 })),
      models: [
        { name: 'Base', color: '#00e5ff', values: Array.from({ length: 12 }, (_, i) => 76 + i * 1.2), confidence: Array.from({ length: 12 }, () => 0) },
        { name: 'Bull', color: '#22c55e', values: Array.from({ length: 12 }, (_, i) => 80 + i * 2), confidence: Array.from({ length: 12 }, () => 0) },
      ],
    },
  },
  // AssetRegion: { name, count: number, change: number, status: 'growing'|'declining'|'stable' }
  'scifi-asset-tracker': {
    props: {
      totalAssets: 2847,
      utilizationRate: 73,
      regions: [
        { id: '1', name: 'North America', count: 1240, change: 12, status: 'growing' as const },
        { id: '2', name: 'Europe', count: 890, change: -3, status: 'stable' as const },
      ],
    },
  },
  'scifi-asset-heatmap': {
    props: {
      assets: [
        { id: 'wti', label: 'WTI', shortLabel: 'WTI' },
        { id: 'brent', label: 'Brent', shortLabel: 'BRN' },
        { id: 'gas', label: 'Gas', shortLabel: 'GAS' },
        { id: 'lng', label: 'LNG', shortLabel: 'LNG' },
        { id: 'coal', label: 'Coal', shortLabel: 'COAL' },
      ],
      matrix: [
        [1, 0.92, 0.45, 0.38, 0.21],
        [0.92, 1, 0.51, 0.42, 0.18],
        [0.45, 0.51, 1, 0.67, 0.55],
        [0.38, 0.42, 0.67, 1, 0.44],
        [0.21, 0.18, 0.55, 0.44, 1],
      ],
    },
  },
  // CalculatorInput: { id, label, type: 'slider'|'select'|'number', value, min?, max?, unit?, color? }
  // CalculatorOutput: { id, label, value: string, color }
  'scifi-cost-calculator': {
    props: {
      inputs: [
        { id: '1', label: 'Production Rate', type: 'slider' as const, value: 80, min: 0, max: 200, unit: 'k bpd' },
      ],
      outputs: [
        { id: '1', label: 'OpEx', value: '$2.4B', color: '#00e5ff' },
        { id: '2', label: 'CapEx', value: '$1.8B', color: '#a855f7' },
      ],
    },
  },
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
