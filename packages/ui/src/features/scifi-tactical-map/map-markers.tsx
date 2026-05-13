'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { TacticalMarker } from './map-types';

/**
 * Renders animated marker pins with pulsing rings on the tactical map.
 *
 * @example
 * ```tsx
 * <MapMarkers
 *   markers={[
 *     { id: 'alpha', name: 'Team A', x: 72, y: 35, color: '#00e5ff', sublabel: '7 units' },
 *   ]}
 *   svgHeight={320}
 *   isInView={true}
 * />
 * ```
 */
export interface MapMarkersProps {
  markers: TacticalMarker[];
  /** SVG height used to calculate Y coordinate scaling. */
  svgHeight: number;
  /** Whether the map is in viewport. */
  isInView: boolean;
}

export const MapMarkers = forwardRef<SVGGElement, MapMarkersProps>(function MapMarkers(
  { markers, svgHeight, isInView },
  ref,
) {
  const yScale = svgHeight / 100;

  return (
    <g ref={ref}>
      {markers.map((marker, i) => {
        const cx = (marker.x / 100) * 400;
        const cy = marker.y * yScale;
        const labelClr = marker.labelColor ?? marker.color;
        const shouldPulse = marker.pulse !== false;

        return (
          <g key={marker.id}>
            {/* Pulsing ring */}
            {shouldPulse && (
              <>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r="12"
                  fill="none"
                  stroke={marker.color}
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: [0.4, 0, 0.4], scale: [0.8, 1.6, 0.8] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                />
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r="12"
                  fill="none"
                  stroke={marker.color}
                  strokeWidth="0.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: [0.2, 0, 0.2], scale: [1, 2, 1] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 + 1.2 }}
                />
              </>
            )}

            {/* Marker dot */}
            <motion.circle
              cx={cx}
              cy={cy}
              r="5"
              fill={marker.color}
              filter="url(#mapMarkerGlow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.9, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
            />

            {/* Label */}
            <motion.text
              x={cx}
              y={cy - 16}
              fill={labelClr}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              initial={{ opacity: 0, y: cy - 10 }}
              animate={isInView ? { opacity: 0.85, y: cy - 16 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
            >
              {marker.name}
            </motion.text>

            {/* Sub-label */}
            {marker.sublabel && (
              <motion.text
                x={cx}
                y={cy + 20}
                fill={labelClr}
                fontSize="7"
                fontFamily="monospace"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.6 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
              >
                {marker.sublabel}
              </motion.text>
            )}
          </g>
        );
      })}
    </g>
  );
});
