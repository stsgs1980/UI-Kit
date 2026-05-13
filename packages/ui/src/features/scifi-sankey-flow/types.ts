// --- Types ---

/** A node in the Sankey flow diagram */
export interface FlowNode {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Total value flowing through this node */
  value: number
  /** Y-position offset in SVG coordinate space (for multi-node stacking) */
  y: number
  /** Node color (default accent color if omitted) */
  color?: string
}

/** A route connecting source to destination */
export interface FlowRoute {
  /** Unique identifier */
  id: string
  /** Source node ID */
  sourceId: string
  /** Destination node ID */
  destId: string
  /** Flow value (determines path thickness) */
  value: number
  /** Y-offset for the source end of the path */
  sy: number
  /** Y-offset for the destination end of the path */
  dy: number
  /** Path color (inherits source color if omitted) */
  color?: string
}

// --- Layout Constants ---

export const SANKEY_LAYOUT = {
  SVG_W: 1000,
  SVG_H: 560,
  NODE_L_X: 10,
  NODE_L_W: 150,
  NODE_R_X: 840,
  NODE_R_W: 150,
  NODE_H: 30,
} as const

/** Compute control X midpoint for Bezier paths */
export function getControlX(): number {
  const L = SANKEY_LAYOUT
  return (L.NODE_L_X + L.NODE_L_W + L.NODE_R_X) / 2
}

/** Compute path start X */
export function getPathStartX(): number {
  const L = SANKEY_LAYOUT
  return L.NODE_L_X + L.NODE_L_W
}

/** Compute path end X */
export function getPathEndX(): number {
  return SANKEY_LAYOUT.NODE_R_X
}

/** Build cubic Bezier path string */
export function buildBezierPath(sy: number, dy: number): string {
  const cx = getControlX()
  return `M ${getPathStartX()},${sy} C ${cx},${sy} ${cx},${dy} ${getPathEndX()},${dy}`
}

/** Get stroke width proportional to flow value */
export function getStrokeWidth(value: number): number {
  return Math.max(2, value * 1.35)
}
