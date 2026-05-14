'use client';

import { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../tokens/cn';
import { MapLabels } from './map-labels';
import { MapMarkers } from './map-markers';
import type { ScifiTacticalMapProps } from './map-types';

/**
 * Sci-fi styled tactical SVG map with animated markers, grid lines,
 * compass rose, and legend. Designed for any domain that needs a
 * geographic/positional overview (military, logistics, fleet tracking).
 *
 * @example
 * ```tsx
 * <ScifiTacticalMap
 *   title="Deployment Map"
 *   markers={[
 *     { id: 'a', name: 'Alpha', x: 72, y: 35, color: '#00e5ff', sublabel: '7 units' },
 *     { id: 'b', name: 'Bravo', x: 25, y: 58, color: '#ff2244', sublabel: '12 units' },
 *   ]}
 * />
 * ```
 */
export const ScifiTacticalMap = forwardRef<HTMLDivElement, ScifiTacticalMapProps>(
  function ScifiTacticalMap(
    { title, svgWidth = 400, svgHeight = 320, markers, labels = [], showCompass = true, showLegend = true, maxHeight = '420px', className },
    ref,
  ) {
    const innerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(innerRef, { once: true, margin: '-30px' });
    const hLines = Math.floor(svgHeight / 40);
    const vLines = Math.floor(svgWidth / 40);

    return (
      <div ref={ref} className={cn('bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]', 'rounded-sm p-4 sm:p-5', className)}>
        {title && <h3 className="font-mono text-sm font-bold text-white mb-4">{title}</h3>}

        <div ref={innerRef} className="tactical-grid-overlay">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto" style={{ maxHeight }}>
            <defs>
              <filter id="mapMarkerGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width={svgWidth} height={svgHeight} rx="2" fill="rgba(3,8,25,0.9)" />

            {/* Grid */}
            {Array.from({ length: hLines }).map((_, i) => (
              <motion.line key={`h-${i}`} x1="0" y1={i * 40} x2={svgWidth} y2={i * 40} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }} />
            ))}
            {Array.from({ length: vLines }).map((_, i) => (
              <motion.line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2={svgHeight} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }} />
            ))}

            <MapLabels labels={labels} isInView={isInView} />
            <MapMarkers markers={markers} svgHeight={svgHeight} isInView={isInView} />

            {/* Compass */}
            {showCompass && (
              <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.4 } : {}} transition={{ duration: 0.5, delay: 1 }}>
                <text x={svgWidth - 20} y="20" fill="#7070a0" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N</text>
                <line x1={svgWidth - 20} y1="24" x2={svgWidth - 20} y2="38" stroke="#7070a0" strokeWidth="1" />
                <line x1={svgWidth - 26} y1="28" x2={svgWidth - 20} y2="22" stroke="#7070a0" strokeWidth="0.5" />
                <line x1={svgWidth - 14} y1="28" x2={svgWidth - 20} y2="22" stroke="#7070a0" strokeWidth="0.5" />
              </motion.g>
            )}
          </svg>
        </div>

        {/* Legend */}
        {showLegend && markers.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-[#1a1a3a]">
            {markers.map((m) => (
              <div key={m.id} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color, boxShadow: `0 0 4px ${m.color}60` }} />
                <span className="text-[9px] font-mono text-[#7070a0]">{m.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
