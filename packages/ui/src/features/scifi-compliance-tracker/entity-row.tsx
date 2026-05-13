'use client';

import { motion } from 'framer-motion';
import {
  type ComplianceEntity,
  type Severity,
  SEVERITY_CONFIG,
  CATEGORY_COLORS,
} from './types';

/**
 * Animated compliance entity row with severity styling.
 *
 * @example
 * ```tsx
 * <EntityRow entity={myEntity} index={0} accentColor="#00e5ff" />
 * ```
 */
export function EntityRow({
  entity,
  index,
  accentColor = '#00e5ff',
}: {
  entity: ComplianceEntity;
  index: number;
  accentColor?: string;
}) {
  const sev = SEVERITY_CONFIG[entity.severity];
  const typeColor = CATEGORY_COLORS[entity.category];
  const barColor = entity.compliance >= 80 ? '#22c55e'
    : entity.compliance >= 60 ? '#eab308'
    : entity.compliance >= 40 ? '#f97316'
    : '#ff2244';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="p-3 sm:p-4 rounded-sm transition-colors hover:bg-white/[0.02]"
      style={{
        borderLeft: `3px solid ${sev.color}50`,
        backgroundColor:
          entity.severity === 'critical' ? 'rgba(239,68,68,0.04)' : 'transparent',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base shrink-0">{entity.icon}</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white truncate">
            {entity.name}
          </span>
          <span
            className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm shrink-0 tracking-wider"
            style={{
              backgroundColor: `${typeColor}18`,
              color: typeColor,
              border: `1px solid ${typeColor}40`,
            }}
          >
            {entity.category.toUpperCase()}
          </span>
        </div>
        <span
          className="text-[8px] sm:text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm shrink-0 tracking-wider"
          style={{
            backgroundColor: sev.bg,
            color: sev.color,
            border: `1px solid ${sev.border}`,
          }}
        >
          {sev.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-[10px] sm:text-xs font-mono text-[#7070a0] leading-relaxed mb-2">
        {entity.description}
      </p>

      {/* Metrics row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-mono text-[#7070a0] mb-2">
        <span>{entity.effectiveDate}</span>
        <span>{entity.impactValue}</span>
        <span
          style={{
            color: entity.severity === 'critical' ? '#ff2244'
              : entity.severity === 'high' ? '#f97316' : '#a0a0c0',
          }}
        >
          {entity.priceImpact}
        </span>
      </div>

      {/* Compliance bar */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono text-[#505070] shrink-0">
          Compliance:
        </span>
        <div className="flex-1 h-2 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <motion.div
            className="h-full rounded-full relative"
            initial={{ width: 0 }}
            whileInView={{ width: `${entity.compliance}%` }}
            viewport={{ once: true, margin: '-10px' }}
            transition={{ duration: 1.4, delay: index * 0.07 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: `linear-gradient(to right, ${barColor}60, ${barColor})`,
              boxShadow: `0 0 8px ${barColor}40`,
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-full rounded-full"
              style={{
                backgroundColor: barColor,
                boxShadow: `0 0 6px ${barColor}`,
              }}
            />
          </motion.div>
        </div>
        <span
          className="text-[10px] font-mono font-bold shrink-0 w-10 text-right"
          style={{ color: barColor }}
        >
          {entity.compliance}%
        </span>
      </div>
    </motion.div>
  );
}
