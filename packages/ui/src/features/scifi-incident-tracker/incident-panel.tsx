'use client';

import { motion } from 'framer-motion';
import { type Incident } from './types';

/**
 * Sci-fi styled incident list panel with status badges and detail rows.
 *
 * @example
 * ```tsx
 * <IncidentPanel incidents={spillData} accentColor="#ff6b00" />
 * ```
 */
export function IncidentPanel({
  incidents,
  accentColor = '#ff6b00',
}: {
  incidents: Incident[];
  accentColor?: string;
}) {
  return (
    <div
      className="rounded-sm p-4"
      style={{
        background: 'rgba(5,5,16,0.6)',
        border: `1px solid ${accentColor}20`,
      }}
    >
      <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">
        Active Incidents
      </h3>
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {incidents.map((incident, i) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-3 rounded-sm transition-colors duration-200"
            style={{
              background: `${accentColor}06`,
              border: `1px solid ${accentColor}15`,
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                  style={{
                    backgroundColor: incident.statusColor,
                    boxShadow: `0 0 6px ${incident.statusColor}`,
                  }}
                />
                <span className="text-sm font-bold text-white">{incident.location}</span>
              </div>
              <span className="text-[10px] font-mono text-[#7070a0] flex-shrink-0 whitespace-nowrap">
                {incident.date}
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 ml-4 text-[11px] font-mono">
              <span style={{ color: accentColor }}>{incident.volume}</span>
              <span className="text-[#9090b0]">{incident.cause}</span>
            </div>

            {/* Status badge */}
            <div className="ml-4 mt-2">
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm"
                style={{
                  backgroundColor: incident.statusBg,
                  border: `1px solid ${incident.statusColor}40`,
                  color: incident.statusColor,
                }}
              >
                {incident.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
