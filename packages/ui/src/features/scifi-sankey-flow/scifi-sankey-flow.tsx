'use client'

import { forwardRef, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { HudCard } from '../hud-card'
import { AnimatedCounter } from '../animated-counter'
import { SankeyDiagram } from './sankey-diagram'
import type { FlowNode, FlowRoute } from './types'

// --- Props ---

export interface ScifiSankeyFlowProps {
  sources: FlowNode[]
  destinations: FlowNode[]
  routes: FlowRoute[]
  totalFlow?: number
  totalFlowUnit?: string
  valueUnit?: string
  sourceLabel?: string
  destLabel?: string
  centerLabel?: string
  accentColor?: string
  label?: string
  title?: string
  subtitle?: string
  className?: string
}

// --- Flow Tooltip ---

function FlowTooltip({ route, valueUnit }: { route: FlowRoute; valueUnit: string }) {
  const c = route.color ?? '#00e5ff'
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4 px-4 py-3 rounded-sm border border-[rgba(0,229,255,0.2)] bg-[rgba(5,5,16,0.9)] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c, boxShadow: `0 0 8px ${c}` }} />
        <span className="font-mono text-xs sm:text-sm text-[#c0c0e0]">{route.sourceId}</span>
        <span className="text-[#7070a0]">{'\u2192'}</span>
        <span className="font-mono text-xs sm:text-sm text-white font-medium">{route.destId}</span>
      </div>
      <div className="ml-auto flex items-baseline gap-1">
        <span className="font-mono text-lg sm:text-xl font-bold" style={{ color: c }}>{route.value}</span>
        <span className="font-mono text-[10px] sm:text-xs text-[#7070a0]">{valueUnit}</span>
      </div>
    </motion.div>
  )
}

/** Legend section */
function FlowLegend({ nodes, label, accentColor }: { nodes: FlowNode[]; label: string; accentColor: string }) {
  const rc = (c?: string) => c ?? accentColor
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      <span className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider mr-2">{label}:</span>
      {nodes.map(n => (
        <div key={n.id} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: rc(n.color), boxShadow: `0 0 6px ${rc(n.color)}60` }} />
          <span className="font-mono text-[10px] sm:text-xs text-[#c0c0e0]">{n.label}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * ScifiSankeyFlow -- Sankey-style flow diagram with hover tooltips and legend.
 * @example
 * ```tsx
 * <ScifiSankeyFlow
 *   sources={[{ id: 's1', label: 'Source A', value: 22.7, y: 72, color: '#00e5ff' }]}
 *   destinations={[{ id: 'd1', label: 'Dest A', value: 22.2, y: 108, color: '#00e5ff' }]}
 *   routes={[{ id: 'r1', sourceId: 's1', destId: 'd1', value: 18.5, sy: 64, dy: 98, color: '#00e5ff' }]}
 *   totalFlow={40.3}
 * />
 * ```
 */
export const ScifiSankeyFlow = forwardRef<HTMLElement, ScifiSankeyFlowProps>(
  ({ sources, destinations, routes, totalFlow, totalFlowUnit = 'M/day', valueUnit = '',
    sourceLabel = 'Sources', destLabel = 'Destinations', centerLabel = 'FLOW DIAGRAM',
    accentColor = '#00e5ff', label = 'Flow Monitor', title = 'Flow Diagram',
    subtitle = 'Network flow visualization with real-time interaction', className }, ref) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const hoveredRoute = routes.find(r => r.id === hoveredId)

    return (
      <section ref={ref} data-slot="scifi-sankey-flow" className={cn('relative py-12 sm:py-16 md:py-20 px-4', className)}>
        <div className="max-w-7xl mx-auto">
          <ScifiSectionHeader label={label} title={title} subtitle={subtitle} accentColor={accentColor} />
          {totalFlow !== undefined && (
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }} className="mb-6 sm:mb-8 flex justify-center">
              <HudCard className="inline-block">
                <div className="flex items-center gap-3 sm:gap-5">
                  <div>
                    <div className="font-mono text-[10px] sm:text-xs text-[#7070a0] uppercase tracking-wider mb-0.5">Total Flow</div>
                    <div className="flex items-baseline gap-2">
                      <AnimatedCounter end={totalFlow} decimals={totalFlow % 1 !== 0 ? 1 : 0}
                        className="text-2xl sm:text-3xl font-bold" color={accentColor} />
                      <span className="font-mono text-xs sm:text-sm text-[#505080]">{totalFlowUnit}</span>
                    </div>
                  </div>
                </div>
              </HudCard>
            </motion.div>
          )}
          <HudCard delay={0.3}>
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}>
              <SankeyDiagram sources={sources} destinations={destinations} routes={routes}
                hoveredId={hoveredId} onHoverRoute={setHoveredId}
                centerLabel={centerLabel} valueUnit={valueUnit} accentColor={accentColor} />
              <div className="mt-4 min-h-[44px]">
                <AnimatePresence mode="wait">
                  {hoveredRoute && <FlowTooltip key={hoveredRoute.id} route={hoveredRoute} valueUnit={totalFlowUnit} />}
                </AnimatePresence>
              </div>
            </motion.div>
          </HudCard>
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }} className="mt-6 sm:mt-8">
            <HudCard accentColor="#ff6b00" delay={0.7}>
              <FlowLegend nodes={sources} label={sourceLabel} accentColor={accentColor} />
              <div className="mt-3 pt-3 border-t border-[rgba(255,107,0,0.12)]">
                <FlowLegend nodes={destinations} label={destLabel} accentColor={accentColor} />
              </div>
            </HudCard>
          </motion.div>
        </div>
      </section>
    )
  },
)
ScifiSankeyFlow.displayName = 'ScifiSankeyFlow'
