import type { DemoConfig } from './demo-registry'

// ─── Monitoring & tracking scifi demos ───────────────────

export const MONITORING_DEMOS: Record<string, DemoConfig> = {
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
}
