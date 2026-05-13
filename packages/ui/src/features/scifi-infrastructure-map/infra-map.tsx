'use client'

import { motion, useInView } from 'framer-motion'
import { STATUS_CONFIG, TYPE_CONFIG } from './types'
import type { InfrastructureNode } from './types'

// --- Props ---

export interface InfraMapProps {
  /** Infrastructure nodes to plot on the map */
  nodes: InfrastructureNode[]
  /** Whether the map is in view (for animation) */
  isInView: boolean
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

/**
 * InfraMap -- SVG regional map with plotted infrastructure nodes.
 *
 * @example
 * ```tsx
 * <InfraMap
 *   nodes={[{ id: 1, name: 'Hub A', location: 'Region 1', capacity: '5M', capacityValue: 5,
 *     capacityUnit: 'M/day', status: 'Active', threat: 'Low', type: 'pipeline',
 *     description: 'Main pipeline', coordinates: { x: 170, y: 100 }, mapLabel: 'H-A' }]}
 *   isInView={true}
 * />
 * ```
 */
export function InfraMap({ nodes, isInView, accentColor = '#00e5ff' }: InfraMapProps) {
  const mapNodes = nodes.filter(n => n.coordinates)

  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[400px]"
      style={{ filter: `drop-shadow(0 0 8px ${accentColor}14)` }} data-slot="infra-map">
      <defs>
        <radialGradient id="sfInfraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`${accentColor}4D`} />
          <stop offset="100%" stopColor={`${accentColor}00`} />
        </radialGradient>
        <radialGradient id="sfInfraWarn" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(234,179,8,0.3)" />
          <stop offset="100%" stopColor="rgba(234,179,8,0)" />
        </radialGradient>
      </defs>

      {/* Region outline */}
      <path d="M 60,40 L 120,30 L 200,20 L 280,30 L 350,50 L 380,80 L 390,140 L 380,200 L 360,240 L 320,270 L 260,285 L 180,280 L 120,260 L 80,230 L 50,180 L 40,130 L 45,80 Z"
        fill="rgba(5,15,40,0.6)" stroke={`${accentColor}26`} strokeWidth="1" />

      {/* Land masses */}
      {[
        'M 40,130 L 80,130 L 80,180 L 60,230 L 50,200 L 40,160 Z',
        'M 50,80 L 60,40 L 120,30 L 120,60 L 100,90 L 80,100 L 60,100 Z',
        'M 120,30 L 200,20 L 200,50 L 140,60 L 120,60 Z',
        'M 200,20 L 280,30 L 260,60 L 200,50 Z',
        'M 280,30 L 350,50 L 360,100 L 300,90 L 260,60 Z',
        'M 360,100 L 380,80 L 390,140 L 380,200 L 350,180 L 360,100 Z',
        'M 350,180 L 380,200 L 360,240 L 320,270 L 300,230 L 340,200 Z',
        'M 120,260 L 80,230 L 120,230 L 180,240 L 200,260 L 180,280 L 120,280 Z',
      ].map((d, i) => (
        <path key={i} d={d} fill="rgba(30,25,15,0.7)" stroke="rgba(100,90,60,0.3)" strokeWidth="0.5" />
      ))}

      {/* Infrastructure nodes */}
      {mapNodes.map((node, idx) => {
        const { x, y } = node.coordinates!
        const statusCfg = STATUS_CONFIG[node.status]
        const typeCfg = TYPE_CONFIG[node.type]
        const gradientId = node.status === 'At Risk' ? 'sfInfraWarn' : 'sfInfraGlow'
        const label = node.mapLabel ?? node.name.slice(0, 3)

        return isInView ? (
          <motion.g key={String(node.id)} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.1 }}>
            <circle cx={x} cy={y} r="12" fill={`url(#${gradientId})`} />
            <circle cx={x} cy={y} r="4" fill={statusCfg.color} />
            <circle cx={x} cy={y} r="6" fill="none" stroke={`${statusCfg.color}4D`} strokeWidth="1">
              {node.status === 'At Risk' && <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />}
            </circle>
            <text x={x} y={y - 12} textAnchor="middle" fill="#7070a0" fontSize="6" fontFamily="monospace">{label}</text>
          </motion.g>
        ) : null
      })}

      {/* Legend */}
      <g transform="translate(8, 288)">
        {(Object.entries(STATUS_CONFIG) as [string, { color: string; label: string }][]).map(([key, cfg]) => (
          <g key={key} transform={`translate(${Object.keys(STATUS_CONFIG).indexOf(key) * 70}, 0)`}>
            <circle r="3" fill={cfg.color} />
            <text x="6" fill={cfg.color} fontSize="7" fontFamily="monospace">{cfg.label}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}
