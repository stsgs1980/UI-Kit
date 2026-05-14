'use client'

import { forwardRef, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { MapRegion, MapRoute, MapBase } from './types'
import { RISK_CONFIG } from './types'

export interface RegionMapSvgProps {
  regions: MapRegion[]
  routes?: MapRoute[]
  bases?: MapBase[]
  width?: number
  height?: number
  selectedId: string | null
  hoveredId: string | null
  onSelect: (id: string | null) => void
  onHover: (id: string | null) => void
  accentColor?: string
  className?: string
}

/** Interactive SVG region map with animated routes and markers. */
export const RegionMapSvg = forwardRef<HTMLDivElement, RegionMapSvgProps>(
  ({ regions, routes = [], bases = [], width = 250, height = 220, selectedId, hoveredId, onSelect, onHover, accentColor = '#00e5ff', className }, ref) => {
    const localRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(localRef, { once: true })
    useEffect(() => {
      if (ref && typeof ref === 'object' && localRef.current) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = localRef.current
      }
    }, [ref])

    return (
      <div ref={localRef} className={cn('relative w-full', className)} style={{ minHeight: '400px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ minHeight: '400px' }}>
          <defs>
            <radialGradient id="rg-seaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0, 50, 100, 0.2)" />
              <stop offset="100%" stopColor="rgba(0, 20, 50, 0.1)" />
            </radialGradient>
            <filter id="rg-glow"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          <rect width={width} height={height} fill="url(#rg-seaGrad)" />
          {/* Grid */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * (height / 10)} x2={width} y2={i * (height / 10)} stroke={`${accentColor}08`} strokeWidth="0.5" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * (width / 12)} y1="0" x2={i * (width / 12)} y2={height} stroke={`${accentColor}08`} strokeWidth="0.5" />
          ))}

          {/* Routes */}
          {routes.map((route, i) => (
            <g key={`route-${i}`}>
              <motion.path
                d={`M${route.start.x},${route.start.y} Q${(route.start.x + route.end.x) / 2},${(route.start.y + route.end.y) / 2 - 10} ${route.end.x},${route.end.y}`}
                stroke={`${route.color}15`}
                strokeWidth="1"
                fill="none"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: i * 0.3 + 1 }}
              />
              <motion.circle
                r="2.5"
                fill={route.color}
                filter="url(#rg-glow)"
                initial={{ opacity: 0 }}
                animate={isInView ? {
                  opacity: [0, 1, 1, 0],
                  cx: [route.start.x, (route.start.x + route.end.x) / 2, route.end.x, route.end.x],
                  cy: [route.start.y, (route.start.y + route.end.y) / 2 - 10, route.end.y, route.end.y],
                } : {}}
                transition={{ duration: route.duration ?? 5, delay: i * 1.5 + 2, repeat: Infinity, ease: 'linear' }}
              />
            </g>
          ))}

          {/* Region paths */}
          {regions.map((region) => {
            const isActive = selectedId === region.id || hoveredId === region.id
            const risk = RISK_CONFIG[region.riskLevel]
            return (
              <g key={region.id}>
                <motion.path
                  d={region.path}
                  fill={isActive ? `${risk.color}20` : 'rgba(10, 10, 30, 0.6)'}
                  stroke={isActive ? risk.color : `${risk.color}40`}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  className="cursor-pointer transition-all duration-200"
                  filter={isActive ? 'url(#rg-glow)' : undefined}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onClick={() => onSelect(isActive ? null : region.id)}
                  onMouseEnter={() => onHover(region.id)}
                  onMouseLeave={() => onHover(null)}
                />
                <text
                  x={region.labelX}
                  y={region.labelY}
                  fill={isActive ? '#ffffff' : 'rgba(200, 200, 230, 0.5)'}
                  fontSize="5.5"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="pointer-events-none"
                  fontWeight={isActive ? 'bold' : 'normal'}
                >
                  {region.name}
                </text>
                <motion.circle
                  cx={region.labelX - 15}
                  cy={region.labelY - 3}
                  r="2"
                  fill={risk.color}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1, scale: isActive ? [1, 1.5, 1] : 1 } : {}}
                  transition={{ opacity: { duration: 0.3, delay: 0.5 }, scale: { duration: 1, repeat: isActive ? Infinity : 0 } }}
                />
              </g>
            )
          })}

          {/* Markers */}
          {bases.map((base, i) => (
            <g key={`base-${i}`}>
              <motion.circle
                cx={base.x} cy={base.y} r="3"
                fill="none" stroke={base.color} strokeWidth="1"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 2, duration: 0.5 }}
              />
              <motion.circle
                cx={base.x} cy={base.y} r="1"
                fill={base.color}
                animate={isInView ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <text x={base.x + 5} y={base.y + 2} fill={base.color} fontSize="3.5" fontFamily="monospace" opacity="0.7">
                {base.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    )
  },
)
RegionMapSvg.displayName = 'RegionMapSvg'
