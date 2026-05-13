// ─── Types for ScifiGlobeView ─────────────────────────────────

export interface GlobeNode {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Latitude in degrees (-90 to 90) */
  lat: number
  /** Longitude in degrees (-180 to 180) */
  lon: number
  /** Marker color (default "#00e5ff") */
  color?: string
  /** Optional numeric value for the node */
  value?: number
}

export interface GlobeRoute {
  /** Unique identifier */
  id: string
  /** Source node ID */
  sourceId: string
  /** Destination node ID */
  destId: string
  /** Arc color (default "#00e5ff") */
  color?: string
  /** Arc thickness in pixels (default 2) */
  thickness?: number
  /** Whether to use dashed line (default false) */
  dashed?: boolean
  /** Optional numeric value for the route */
  value?: number
}

export interface GlobeStat {
  /** Label text */
  label: string
  /** Numeric value */
  value: number
  /** Number of decimal places */
  decimals?: number
  /** Optional suffix */
  suffix?: string
}

export interface ScifiGlobeViewProps {
  /** Nodes/points on the globe */
  nodes: GlobeNode[]
  /** Arc routes between nodes */
  routes?: GlobeRoute[]
  /** Stat cards shown below the globe */
  stats?: GlobeStat[]
  /** Accent color (default "#00e5ff") */
  accentColor?: string
  /** Globe height in CSS (default "500px") */
  height?: string
  /** Additional CSS classes */
  className?: string
}

// ─── 3D Helpers ───────────────────────────────────────────────

const GLOBE_RADIUS = 1
const ARC_SEGMENTS = 64

/** Convert lat/lon (degrees) to 3D position on sphere */
export function latLonToVec3(
  lat: number,
  lon: number,
  radius: number = GLOBE_RADIUS,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return [x, y, z]
}

/** Generate arc points between two lat/lon positions */
export function generateArcPoints(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number,
  radius: number = GLOBE_RADIUS,
  segments: number = ARC_SEGMENTS,
  arcHeight: number = 0.12,
): [number, number, number][] {
  // Inline THREE-free slerp to avoid importing three in non-3D contexts
  const start = latLonToVec3(fromLat, fromLon, radius)
  const end = latLonToVec3(toLat, toLon, radius)
  const points: [number, number, number][] = []

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const p: number[] = [
      start[0] * (1 - t) + end[0] * t,
      start[1] * (1 - t) + end[1] * t,
      start[2] * (1 - t) + end[2] * t,
    ]
    // Normalize and elevate
    const len = Math.sqrt(p[0] ** 2 + p[1] ** 2 + p[2] ** 2) || 1
    const elevation = Math.sin(t * Math.PI) * arcHeight
    const r = radius + elevation
    points.push([p[0] / len * r, p[1] / len * r, p[2] / len * r])
  }
  return points
}

export { GLOBE_RADIUS, ARC_SEGMENTS }
