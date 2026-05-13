'use client'

import { forwardRef } from 'react'
import { Suspense } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { ScifiGlobeViewProps } from './types'
import { GlobeCanvas } from './globe-scene'
import { GlobeLoader, GlobeHudOverlays, GlobeLegend, GlobeStatCards } from './globe-overlays'

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiGlobeView -- interactive 3D globe with labeled nodes and route arcs.
 *
 * Uses Three.js via @react-three/fiber to render an auto-rotating wireframe
 * globe with pulsing node markers, animated arc routes, and HUD overlays.
 * Requires `@react-three/fiber`, `@react-three/drei`, and `three` as peer deps.
 *
 * @example
 * ```tsx
 * <ScifiGlobeView
 *   nodes={[
 *     { id: 'nyc', label: 'New York', lat: 40.71, lon: -74.01 },
 *     { id: 'lon', label: 'London', lat: 51.51, lon: -0.13 },
 *   ]}
 *   routes={[
 *     { id: 'r1', sourceId: 'nyc', destId: 'lon', color: '#00e5ff' },
 *   ]}
 *   stats={[{ label: 'Routes', value: 1 }, { label: 'Nodes', value: 2 }]}
 *   height="500px"
 * />
 * ```
 */
export const ScifiGlobeView = forwardRef<HTMLDivElement, ScifiGlobeViewProps>(
  ({ nodes, routes = [], stats = [], accentColor = '#00e5ff', height = '500px', className }, ref) => {
    const isInView = useInView(ref as React.RefObject<HTMLDivElement | null>, { once: true, margin: '-80px' })

    return (
      <section
        ref={ref}
        data-slot="scifi-globe-view"
        className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 scroll-mt-16', className)}
      >
        {/* Interactive Globe Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="relative w-full rounded-sm overflow-hidden"
            style={{ height, backgroundColor: 'rgba(10, 10, 26, 0.8)', border: `1px solid ${accentColor}30` }}
          >
            <Suspense fallback={<GlobeLoader />}>
              <GlobeCanvas nodes={nodes} routes={routes} accentColor={accentColor} />
            </Suspense>
            <GlobeHudOverlays accentColor={accentColor} />
            {routes.length > 0 && <GlobeLegend routes={routes} nodes={nodes} accentColor={accentColor} />}
          </div>
        </motion.div>

        {/* Stats */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlobeStatCards stats={stats} accentColor={accentColor} />
          </motion.div>
        )}
      </section>
    )
  },
)
ScifiGlobeView.displayName = 'ScifiGlobeView'
