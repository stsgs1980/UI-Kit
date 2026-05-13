'use client'

import { motion } from 'framer-motion'
import {
  SANKEY_LAYOUT, getControlX, getPathStartX, getPathEndX, buildBezierPath, getStrokeWidth,
} from './types'
import type { FlowNode, FlowRoute } from './types'

// --- Props ---

export interface SankeyDiagramProps {
  /** Source nodes (left column) */
  sources: FlowNode[]
  /** Destination nodes (right column) */
  destinations: FlowNode[]
  /** Flow routes connecting sources to destinations */
  routes: FlowRoute[]
  /** Currently hovered route ID (controlled) */
  hoveredId: string | null
  /** Callback when hovering a route */
  onHoverRoute: (id: string | null) => void
  /** Center label text */
  centerLabel?: string
  /** Value unit suffix (e.g. "M/day") */
  valueUnit?: string
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

/**
 * SankeyDiagram -- SVG Sankey-style flow diagram with Bezier paths and hover interaction.
 *
 * @example
 * ```tsx
 * <SankeyDiagram
 *   sources={[{ id: 'src1', label: 'Source A', value: 22.7, y: 72, color: '#00e5ff' }]}
 *   destinations={[{ id: 'dst1', label: 'Dest A', value: 22.2, y: 108, color: '#00e5ff' }]}
 *   routes={[{ id: 'r1', sourceId: 'src1', destId: 'dst1', value: 18.5, sy: 64, dy: 98, color: '#00e5ff' }]}
 *   hoveredId={null}
 *   onHoverRoute={() => {}}
 * />
 * ```
 */
export function SankeyDiagram({
  sources, destinations, routes, hoveredId, onHoverRoute,
  centerLabel = 'FLOW DIAGRAM', valueUnit = '', accentColor = '#00e5ff',
}: SankeyDiagramProps) {
  const L = SANKEY_LAYOUT
  const ctrlX = getControlX()

  const resolveColor = (color?: string) => color ?? accentColor

  return (
    <svg viewBox={`0 0 ${L.SVG_W} ${L.SVG_H}`} className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '480px' }} data-slot="sankey-diagram">
      <defs>
        <filter id="sfGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sfNodeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background grid */}
      {Array.from({ length: 11 }, (_, i) => (
        <g key={`g-${i}`}>
          <line x1={0} y1={i * 56} x2={L.SVG_W} y2={i * 56} stroke="rgba(0,229,255,0.03)" strokeWidth={1} />
          <line x1={i * 100} y1={0} x2={i * 100} y2={L.SVG_H} stroke="rgba(0,229,255,0.03)" strokeWidth={1} />
        </g>
      ))}

      {/* Flow paths */}
      {routes.map(route => {
        const isHov = hoveredId === route.id
        const anyHov = hoveredId !== null
        const baseOp = anyHov ? (isHov ? 0.55 : 0.06) : 0.25
        const animOp = anyHov ? (isHov ? 0.95 : 0.03) : 0.55
        const sw = getStrokeWidth(route.value)
        const d = buildBezierPath(route.sy, route.dy)
        const color = resolveColor(route.color)
        const srcColor = resolveColor(route.color)
        const midY = (route.sy + route.dy) / 2

        return (
          <g key={route.id} onMouseEnter={() => onHoverRoute(route.id)} onMouseLeave={() => onHoverRoute(null)} className="cursor-pointer">
            <path d={d} fill="none" stroke={color} strokeWidth={sw + 1} opacity={baseOp} strokeLinecap="round"
              style={{ transition: 'opacity 0.35s ease' }} />
            <path d={d} fill="none" stroke={color} strokeWidth={sw} opacity={animOp} strokeDasharray="14 9"
              strokeLinecap="round" filter={isHov ? 'url(#sfGlow)' : undefined}
              style={{ transition: 'opacity 0.35s ease', animation: 'sfFlowDash 1.8s linear infinite' }} />
            <g opacity={anyHov ? (isHov ? 1 : 0.08) : 0.9} style={{ transition: 'opacity 0.35s ease' }}>
              <rect x={ctrlX - 28} y={midY - 10} width={56} height={16} rx={3}
                fill="rgba(5,5,16,0.85)" stroke={`${srcColor}40`} strokeWidth={0.5} />
              <text x={ctrlX} y={midY} textAnchor="middle" dominantBaseline="central"
                fill={srcColor} fontSize="10" fontFamily="monospace" fontWeight="bold">{route.value}</text>
            </g>
          </g>
        )
      })}

      {/* Source nodes (left) */}
      {sources.map(node => {
        const c = resolveColor(node.color)
        const isActive = hoveredId === null || routes.some(r => r.sourceId === node.id && r.id === hoveredId)
        return (
          <g key={node.id} opacity={hoveredId !== null && !isActive ? 0.25 : 1} style={{ transition: 'opacity 0.35s ease' }}>
            <rect x={L.NODE_L_X} y={node.y - L.NODE_H / 2} width={L.NODE_L_W} height={L.NODE_H} rx={4}
              fill={`${c}08`} stroke={`${c}50`} strokeWidth={1}
              filter={isActive && hoveredId !== null ? 'url(#sfNodeGlow)' : undefined} />
            <rect x={L.NODE_L_X} y={node.y - L.NODE_H / 2} width={3} height={L.NODE_H} rx={1} fill={c} />
            <text x={L.NODE_L_X + L.NODE_L_W / 2 + 2} y={node.y} textAnchor="middle" dominantBaseline="central"
              fill={c} fontSize="11" fontFamily="monospace" fontWeight="bold">{node.label}</text>
            <text x={L.NODE_L_X + L.NODE_L_W - 6} y={node.y + L.NODE_H / 2 + 12}
              textAnchor="end" fill="#505080" fontSize="9" fontFamily="monospace">{node.value}{valueUnit}</text>
          </g>
        )
      })}

      {/* Destination nodes (right) */}
      {destinations.map(node => {
        const c = resolveColor(node.color)
        const isActive = hoveredId === null || routes.some(r => r.destId === node.id && r.id === hoveredId)
        return (
          <g key={node.id} opacity={hoveredId !== null && !isActive ? 0.25 : 1} style={{ transition: 'opacity 0.35s ease' }}>
            <rect x={L.NODE_R_X} y={node.y - L.NODE_H / 2} width={L.NODE_R_W} height={L.NODE_H} rx={4}
              fill={`${c}08`} stroke={`${c}50`} strokeWidth={1}
              filter={isActive && hoveredId !== null ? 'url(#sfNodeGlow)' : undefined} />
            <rect x={L.NODE_R_X + L.NODE_R_W - 3} y={node.y - L.NODE_H / 2} width={3} height={L.NODE_H} rx={1} fill={c} />
            <text x={L.NODE_R_X + L.NODE_R_W / 2 - 2} y={node.y} textAnchor="middle" dominantBaseline="central"
              fill={c} fontSize="11" fontFamily="monospace" fontWeight="bold">{node.label}</text>
            <text x={L.NODE_R_X + 6} y={node.y + L.NODE_H / 2 + 12}
              textAnchor="start" fill="#505080" fontSize="9" fontFamily="monospace">{node.value}{valueUnit}</text>
          </g>
        )
      })}

      <text x={ctrlX} y={20} textAnchor="middle" fill="rgba(0,229,255,0.2)" fontSize="10"
        fontFamily="monospace" letterSpacing="0.3em">{centerLabel}</text>
      <style>{`@keyframes sfFlowDash { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -46; } }`}</style>
    </svg>
  )
}
