'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TacticalLabel } from './map-types';

/**
 * Renders animated text labels on the tactical map.
 *
 * @example
 * ```tsx
 * <MapLabels
 *   labels={[
 *     { text: 'PERSIAN GULF', x: 60, y: 78, color: 'rgba(0,229,255,0.3)' },
 *   ]}
 *   isInView={true}
 * />
 * ```
 */
export interface MapLabelsProps {
  labels: TacticalLabel[];
  /** Whether the map is in viewport (for enter animation). */
  isInView: boolean;
}

export const MapLabels = forwardRef<SVGGElement, MapLabelsProps>(function MapLabels(
  { labels, isInView },
  ref,
) {
  return (
    <g ref={ref}>
      {labels.map((label, i) => (
        <motion.text
          key={`${label.text}-${i}`}
          x={`${label.x}%`}
          y={`${label.y}%`}
          fill={label.color ?? 'rgba(0,229,255,0.3)'}
          fontSize={label.fontSize ?? 8}
          fontFamily="monospace"
          textAnchor="middle"
          fontWeight={label.bold ? 'bold' : 'normal'}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {label.text}
        </motion.text>
      ))}
    </g>
  );
});
