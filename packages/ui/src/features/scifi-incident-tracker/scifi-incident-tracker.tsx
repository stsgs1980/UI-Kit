'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../tokens/cn';
import { type ScifiIncidentTrackerProps } from './types';
import { IncidentPanel } from './incident-panel';
import { IncidentStats } from './incident-stats';

/**
 * Sci-fi styled incident tracker with active incident list,
 * statistics dashboard, and risk zone assessment.
 *
 * @example
 * ```tsx
 * <ScifiIncidentTracker
 *   incidents={incidentData}
 *   stats={statsData}
 *   riskZones={zones}
 *   accentColor="#ff6b00"
 * />
 * ```
 */
export const ScifiIncidentTracker = forwardRef<
  HTMLDivElement,
  ScifiIncidentTrackerProps
>(function ScifiIncidentTracker(
  { incidents, stats, riskZones, accentColor = '#ff6b00', className },
  ref,
) {
  return (
    <section
      ref={ref}
      data-slot="scifi-incident-tracker"
      className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16', className)}
    >
      {/* Top row: 2 panels side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <IncidentPanel incidents={incidents} accentColor={accentColor} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <IncidentStats stats={stats} riskZones={riskZones} accentColor={accentColor} />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-4 flex items-center gap-2 justify-center"
      >
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 6px ${accentColor}`,
          }}
        />
        <span className="text-[9px] font-mono text-[#505070]">
          Monitoring data active &mdash; Real-time incident tracking
        </span>
      </motion.div>
    </section>
  );
});
