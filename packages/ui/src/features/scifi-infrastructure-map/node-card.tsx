'use client'

import { motion } from 'framer-motion'
import { HudCard } from '../hud-card'
import { STATUS_CONFIG, THREAT_CONFIG, TYPE_CONFIG } from './types'
import type { InfrastructureNode } from './types'

// --- Threat Bar ---

function ThreatBar({ threat }: { threat: string }) {
  const cfg = THREAT_CONFIG[threat as keyof typeof THREAT_CONFIG] ?? THREAT_CONFIG.Low
  const segments = 4
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[rgba(30,30,50,0.8)]" style={{ minWidth: '60px' }}>
        <div className="flex h-full">
          {Array.from({ length: segments }, (_, i) => (
            <div key={i} className="h-full"
              style={{
                width: `${100 / segments}%`,
                backgroundColor: i < (cfg.width / 25) ? cfg.barColor : 'transparent',
                borderRight: i < segments - 1 ? '1px solid rgba(10,10,25,0.5)' : 'none',
              }} />
          ))}
        </div>
      </div>
      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm whitespace-nowrap"
        style={{ color: cfg.color, backgroundColor: `${cfg.color}12`, border: `1px solid ${cfg.color}25` }}>
        {threat}
      </span>
    </div>
  )
}

// --- Props ---

export interface NodeCardProps {
  /** The infrastructure node to display */
  node: InfrastructureNode
  /** Index for stagger animation */
  index?: number
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

/**
 * NodeCard -- detail card for a single infrastructure node.
 *
 * @example
 * ```tsx
 * <NodeCard node={{
 *   id: 1, name: 'Hub A', location: 'Region 1', capacity: '5M', capacityValue: 5,
 *   capacityUnit: 'M/day', status: 'Active', threat: 'Low', type: 'pipeline', description: 'Main pipeline'
 * }} />
 * ```
 */
export function NodeCard({ node, index = 0, accentColor = '#00e5ff' }: NodeCardProps) {
  const statusCfg = STATUS_CONFIG[node.status]
  const typeCfg = TYPE_CONFIG[node.type]
  const cardAccent = node.status === 'Active' ? accentColor : '#ff6b00'

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.5, delay: index * 0.07 }}
      data-slot="node-card">
      <HudCard accentColor={cardAccent} className="group cursor-default">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm shrink-0"
                  style={{ color: typeCfg.color, backgroundColor: `${typeCfg.color}12`, border: `1px solid ${typeCfg.color}25` }}>
                  {typeCfg.label}
                </span>
                <div className="flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded-sm shrink-0"
                  style={{ color: statusCfg.color, backgroundColor: statusCfg.bg, border: `1px solid ${statusCfg.color}25` }}>
                  <span>{statusCfg.label}</span>
                </div>
              </div>
              <h3 className="font-mono text-sm sm:text-base text-white font-medium leading-tight truncate">{node.name}</h3>
              <div className="font-mono text-[10px] text-[#7070a0] truncate mt-0.5">{node.location}</div>
            </div>
            <div className="relative shrink-0 mt-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusCfg.color, boxShadow: `0 0 8px ${statusCfg.color}60` }} />
              {node.status === 'At Risk' && (
                <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: `${statusCfg.color}40` }} />
              )}
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-baseline gap-2 pl-5">
            <span className="font-mono text-xs text-[#7070a0]">Capacity:</span>
            <span className="font-mono text-sm font-bold text-white">{node.capacity}</span>
            <span className="text-[9px] font-mono text-[#505070]">{node.capacityUnit}</span>
          </div>

          {/* Description */}
          <p className="font-mono text-[10px] text-[#505070] leading-relaxed pl-5 hidden sm:block">{node.description}</p>

          {/* Threat bar */}
          <div className="pl-5"><ThreatBar threat={node.threat} /></div>

          {/* Bottom accent line on hover */}
          <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
            style={{ background: `linear-gradient(90deg, ${statusCfg.color}40, transparent)` }} />
        </div>
      </HudCard>
    </motion.div>
  )
}
