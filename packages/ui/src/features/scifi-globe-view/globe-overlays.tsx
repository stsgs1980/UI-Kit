'use client'

import { memo } from 'react'
import type { GlobeRoute, GlobeNode, GlobeStat } from './types'

// ─── Loading spinner ──────────────────────────────────────────

export function GlobeLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-[#00e5ff]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00e5ff] animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#a855f7] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <span className="font-mono text-xs text-[#7070a0] animate-pulse">Initializing globe...</span>
    </div>
  )
}

// ─── HUD overlay badges ───────────────────────────────────────

export function GlobeHudOverlays({ accentColor }: { accentColor: string }) {
  return (
    <>
      {/* Top-left HUD */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="px-3 py-2 rounded-sm border backdrop-blur-sm"
          style={{ borderColor: `${accentColor}30`, backgroundColor: 'rgba(5,5,16,0.8)' }}>
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest mb-1" style={{ color: accentColor }}>
            NETWORK ROUTES
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-[#505080]">
            Scale: Global · Drag to rotate · Scroll to zoom
          </div>
        </div>
      </div>

      {/* Top-right controls hint */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="px-3 py-2 rounded-sm border backdrop-blur-sm"
          style={{ borderColor: 'rgba(168,85,247,0.2)', backgroundColor: 'rgba(5,5,16,0.8)' }}>
          <div className="font-mono text-[8px] sm:text-[9px] text-[#a855f7]">
            DRAG TO ROTATE
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-[#505080]">
            SCROLL TO ZOOM
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Route legend item ────────────────────────────────────────

export const RouteLegendItem = memo(function RouteLegendItem({
  color, sourceLabel, destLabel, value,
}: {
  color: string
  sourceLabel: string
  destLabel: string
  value?: string
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }} />
      <span className="font-mono text-[10px] sm:text-xs text-[#c0c0e0] flex-1 truncate">
        {sourceLabel} <span className="text-[#505080] mx-1">→</span> {destLabel}
      </span>
      {value && (
        <>
          <span className="font-mono text-[10px] sm:text-xs font-bold shrink-0" style={{ color }}>
            {value}
          </span>
        </>
      )}
    </div>
  )
})

// ─── Legend panel ─────────────────────────────────────────────

export function GlobeLegend({ routes, nodes, accentColor }: { routes: GlobeRoute[]; nodes: GlobeNode[]; accentColor: string }) {
  return (
    <div className="absolute bottom-4 left-4 z-20 pointer-events-none max-w-[280px] sm:max-w-[320px]">
      <div className="px-3 py-2 rounded-sm border backdrop-blur-sm"
        style={{ borderColor: `${accentColor}15`, backgroundColor: 'rgba(5,5,16,0.85)' }}>
        <div className="font-mono text-[8px] sm:text-[9px] text-[#505080] uppercase tracking-wider mb-2">Routes:</div>
        {routes.slice(0, 4).map((r) => {
          const src = nodes.find((n) => n.id === r.sourceId)
          const dst = nodes.find((n) => n.id === r.destId)
          return (
            <RouteLegendItem
              key={r.id}
              color={r.color ?? accentColor}
              sourceLabel={src?.label.split(' ')[0] ?? r.sourceId}
              destLabel={dst?.label.split(' ')[0] ?? r.destId}
              value={r.value !== undefined ? String(r.value) : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Stat cards grid ──────────────────────────────────────────

export function GlobeStatCards({ stats, accentColor }: { stats: GlobeStat[]; accentColor: string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-sm backdrop-blur-sm text-center p-4"
          style={{
            backgroundColor: 'rgba(10, 10, 26, 0.8)',
            border: `1px solid ${stat.label === stats[0]?.label ? accentColor : 'rgba(255,107,0,0.2)'}30`,
          }}
        >
          <div className="relative z-10 flex flex-col items-center gap-1">
            <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold" style={{ color: accentColor }}>
              {stat.value.toFixed(stat.decimals ?? 0)}{stat.suffix ?? ''}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#7070a0] uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
