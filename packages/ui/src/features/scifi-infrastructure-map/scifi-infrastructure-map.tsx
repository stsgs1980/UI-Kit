'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { HudCard } from '../hud-card'
import { AnimatedCounter } from '../animated-counter'
import { InfraMap } from './infra-map'
import { NodeCard } from './node-card'
import { STATUS_CONFIG, TYPE_CONFIG } from './types'
import type { InfrastructureNode, InfrastructureType } from './types'

// --- Props ---

export interface ScifiInfrastructureMapProps {
  /** Infrastructure nodes */
  nodes: InfrastructureNode[]
  /** Accent color (default '#00e5ff') */
  accentColor?: string
  /** Section header label */
  label?: string
  /** Section header title */
  title?: string
  /** Section header subtitle */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

// --- Summary stat helper ---

function computeSummary(nodes: InfrastructureNode[]) {
  const active = nodes.filter(n => n.status === 'Active').length
  const atRisk = nodes.filter(n => n.status === 'At Risk').length
  const offline = nodes.filter(n => n.status === 'Offline').length
  const highThreat = nodes.filter(n => n.threat === 'High' || n.threat === 'Critical').length
  const byType = (type: InfrastructureType) => nodes.filter(n => n.type === type).reduce((s, n) => s + n.capacityValue, 0)
  return { total: nodes.length, active, atRisk, offline, highThreat, pipelineCap: byType('pipeline'), terminalCap: byType('terminal'), lngCap: byType('lng') }
}

/**
 * ScifiInfrastructureMap -- infrastructure node monitoring with regional map and detail cards.
 *
 * @example
 * ```tsx
 * <ScifiInfrastructureMap
 *   nodes={[{
 *     id: 1, name: 'Hub A', location: 'Region 1', capacity: '5M', capacityValue: 5,
 *     capacityUnit: 'M/day', status: 'Active', threat: 'Low', type: 'pipeline',
 *     description: 'Main pipeline', coordinates: { x: 170, y: 100 }, mapLabel: 'H-A'
 *   }]}
 * />
 * ```
 */
export const ScifiInfrastructureMap = forwardRef<HTMLElement, ScifiInfrastructureMapProps>(
  ({ nodes, accentColor = '#00e5ff', label = 'Infrastructure', title = 'Infrastructure Map', subtitle = 'Monitoring critical infrastructure nodes in real-time', className }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const mapInView = useInView(mapRef, { once: true, margin: '-50px' })
    const s = computeSummary(nodes)

    const statItems = [
      { label: 'Total Nodes', value: s.total, color: accentColor },
      { label: 'Active', value: s.active, color: '#22c55e' },
      { label: 'At Risk', value: s.atRisk, color: '#eab308' },
      { label: 'Offline', value: s.offline, color: '#ff2244' },
      { label: 'High Threat', value: s.highThreat, color: '#f97316' },
    ]

    const capItems = [
      { label: 'Pipelines', value: s.pipelineCap, color: '#ff6b00', pct: 85 },
      { label: 'Terminals', value: s.terminalCap, color: '#00e5ff', pct: 95 },
      { label: 'LNG', value: s.lngCap, color: '#a855f7', pct: 78 },
    ]

    return (
      <section ref={ref} data-slot="scifi-infrastructure-map"
        className={cn('relative py-12 sm:py-16 md:py-20 px-4', className)}>
        <div className="max-w-7xl mx-auto">
          <ScifiSectionHeader label={label} title={title} subtitle={subtitle} accentColor={accentColor} />

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {statItems.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}>
                <HudCard accentColor={i < 2 ? accentColor : 'orange'} className="text-center p-3">
                  <div className="text-[9px] font-mono text-[#505080] uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-lg sm:text-xl font-bold" style={{ color: stat.color }}>
                    <AnimatedCounter end={stat.value} duration={1500 + i * 100} />
                  </div>
                </HudCard>
              </motion.div>
            ))}
          </div>

          {/* Map + Capacity */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
              <HudCard accentColor={accentColor} title="Regional Map">
                <div ref={mapRef}><InfraMap nodes={nodes} isInView={mapInView} accentColor={accentColor} /></div>
                <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t" style={{ borderColor: `${accentColor}1A` }}>
                  {(Object.entries(TYPE_CONFIG) as [string, { color: string; label: string }][]).map(([k, cfg]) => (
                    <div key={k} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: cfg.color }} />
                      <span className="font-mono text-[9px] text-[#505080]">{cfg.label}</span>
                    </div>
                  ))}
                </div>
              </HudCard>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-2">
              <HudCard accentColor="#a855f7" title="Capacity Breakdown">
                <div className="space-y-5">
                  {capItems.map((item, i) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                          <span className="font-mono text-xs text-[#c0c0e0]">{item.label}</span>
                        </div>
                        <span className="font-mono text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden bg-[rgba(30,30,50,0.8)]">
                        <motion.div className="h-full rounded-full" initial={{ width: '0%' }} whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                          style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}4D` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </HudCard>
            </motion.div>
          </div>

          {/* Node Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {nodes.map((node, i) => <NodeCard key={String(node.id)} node={node} index={i} accentColor={accentColor} />)}
          </div>
        </div>
      </section>
    )
  },
)
ScifiInfrastructureMap.displayName = 'ScifiInfrastructureMap'
