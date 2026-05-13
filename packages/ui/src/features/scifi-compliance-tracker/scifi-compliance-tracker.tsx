'use client';

import { forwardRef, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../tokens/cn';
import { type ScifiComplianceTrackerProps, SEVERITY_CONFIG, type Severity } from './types';
import { ComplianceGauge } from './compliance-gauge';
import { EntityRow } from './entity-row';
import { TimelineItem } from './timeline-item';

/**
 * Sci-fi styled compliance tracker panel with entity list,
 * compliance gauge, timeline, and impact statistics.
 *
 * @example
 * ```tsx
 * <ScifiComplianceTracker
 *   entities={complianceData}
 *   complianceRate={61}
 *   timeline={events}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiComplianceTracker = forwardRef<
  HTMLDivElement,
  ScifiComplianceTrackerProps
>(function ScifiComplianceTracker(
  { entities, complianceRate, timeline = [], accentColor = '#00e5ff', className },
  ref,
) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      data-slot="scifi-compliance-tracker"
      className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16 overflow-hidden', className)}
    >
      {/* Row 1: Entity list + Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Entity list */}
        <div className="lg:col-span-2 rounded-sm p-1"
          style={{ background: 'rgba(5,5,16,0.6)', border: `1px solid ${accentColor}15` }}
        >
          <div className="p-3 pb-0 flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
            <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider uppercase">
              Active Regimes
            </h3>
          </div>
          <div className="flex flex-col divide-y divide-white/[0.04] max-h-[520px] overflow-y-auto pr-1">
            {entities.map((entity, i) => (
              <EntityRow key={entity.name} entity={entity} index={i} accentColor={accentColor} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-white/[0.06]">
            {(['low', 'medium', 'high', 'critical'] as Severity[]).map((sev) => {
              const cfg = SEVERITY_CONFIG[sev];
              return (
                <div key={sev} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: cfg.color, boxShadow: `0 0 4px ${cfg.color}60` }} />
                  <span className="text-[9px] font-mono text-[#7070a0]">{cfg.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gauge + Severity breakdown */}
        <div className="flex flex-col rounded-sm p-4"
          style={{ background: 'rgba(5,5,16,0.6)', border: '1px solid rgba(168,85,247,0.2)' }}
        >
          <ComplianceGauge complianceRate={complianceRate} accentColor={accentColor} />
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/[0.06]">
            {(['critical', 'high', 'medium', 'low'] as Severity[]).map((sev) => {
              const cfg = SEVERITY_CONFIG[sev];
              const count = entities.filter((e) => e.severity === sev).length;
              return (
                <motion.div key={sev} initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="p-2 rounded-sm text-center"
                  style={{ backgroundColor: `${cfg.color}08`, border: `1px solid ${cfg.color}20` }}
                >
                  <div className="text-lg font-bold font-mono"
                    style={{ color: cfg.color, fontFamily: 'var(--font-orbitron)' }}>{count}</div>
                  <div className="text-[9px] font-mono text-[#7070a0]">{cfg.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Timeline */}
      {timeline.length > 0 && (
        <div className="rounded-sm p-4"
          style={{ background: 'rgba(5,5,16,0.6)', border: `1px solid ${accentColor}15` }}
        >
          <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-4">
            Timeline
          </h3>
          <div className="max-h-[360px] overflow-y-auto pr-1">
            {timeline.map((event, i) => (
              <TimelineItem key={event.date} event={event} index={i}
                isLast={i === timeline.length - 1} accentColor={accentColor} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
});
