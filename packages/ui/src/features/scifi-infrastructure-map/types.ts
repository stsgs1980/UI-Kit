// --- Types ---

/** Node status */
export type NodeStatus = 'Active' | 'At Risk' | 'Offline'

/** Threat level */
export type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical'

/** Infrastructure node type */
export type InfrastructureType = 'pipeline' | 'terminal' | 'lng'

/** Coordinates on the SVG map */
export interface MapCoordinates {
  /** X position (0-400) */
  x: number
  /** Y position (0-300) */
  y: number
}

/** A single infrastructure node */
export interface InfrastructureNode {
  /** Unique identifier */
  id: string | number
  /** Node name */
  name: string
  /** Location/country */
  location: string
  /** Capacity display value */
  capacity: string
  /** Numeric capacity value */
  capacityValue: number
  /** Capacity unit text */
  capacityUnit: string
  /** Current status */
  status: NodeStatus
  /** Threat level */
  threat: ThreatLevel
  /** Node type */
  type: InfrastructureType
  /** Description text */
  description: string
  /** Map coordinates */
  coordinates?: MapCoordinates
  /** Short label for map pin */
  mapLabel?: string
}

// --- Config Maps ---

export const STATUS_CONFIG: Record<NodeStatus, { label: string; color: string; bg: string }> = {
  Active:   { label: 'Active',   color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  'At Risk':{ label: 'At Risk', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
  Offline:  { label: 'Offline',  color: '#ff2244', bg: 'rgba(239,68,68,0.1)' },
}

export const THREAT_CONFIG: Record<ThreatLevel, { color: string; barColor: string; width: number }> = {
  Low:      { color: '#22c55e', barColor: 'rgba(34,197,94,0.6)',  width: 25 },
  Medium:   { color: '#eab308', barColor: 'rgba(234,179,8,0.6)',  width: 50 },
  High:     { color: '#f97316', barColor: 'rgba(249,115,22,0.6)', width: 75 },
  Critical: { color: '#ff2244', barColor: 'rgba(239,68,68,0.6)',  width: 100 },
}

export const TYPE_CONFIG: Record<InfrastructureType, { label: string; color: string }> = {
  pipeline: { label: 'Pipeline',  color: '#ff6b00' },
  terminal: { label: 'Terminal',  color: '#00e5ff' },
  lng:      { label: 'LNG',       color: '#a855f7' },
}
