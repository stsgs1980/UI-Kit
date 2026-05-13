// ─── Types for ScifiRegionMap ─────────────────────────────────

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface MapRegion {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** SVG path data for the region shape */
  path: string
  /** X position for label placement */
  labelX: number
  /** Y position for label placement */
  labelY: number
  /** Risk level (drives color coding) */
  riskLevel: RiskLevel
  /** Key-value metadata shown in the detail panel */
  data: Record<string, string>
  /** Longer description for the detail panel */
  description?: string
}

export interface MapRoute {
  /** Start coordinates */
  start: { x: number; y: number }
  /** End coordinates */
  end: { x: number; y: number }
  /** Route color */
  color: string
  /** Animation cycle duration in seconds */
  duration?: number
}

export interface MapBase {
  /** Position */
  x: number
  y: number
  /** Label text */
  label: string
  /** Marker color */
  color: string
}

export interface ScifiRegionMapProps {
  /** Regions to render on the map */
  regions: MapRegion[]
  /** Animated route lines */
  routes?: MapRoute[]
  /** Point-of-interest markers */
  bases?: MapBase[]
  /** SVG viewBox width (default 250) */
  mapWidth?: number
  /** SVG viewBox height (default 220) */
  mapHeight?: number
  /** Accent color (default "#00e5ff") */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

export const RISK_CONFIG: Record<RiskLevel, { color: string; label: string }> = {
  low: { color: '#00e5ff', label: 'LOW' },
  medium: { color: '#ff6b00', label: 'MEDIUM' },
  high: { color: '#a855f7', label: 'HIGH' },
  critical: { color: '#ff2244', label: 'CRITICAL' },
}
