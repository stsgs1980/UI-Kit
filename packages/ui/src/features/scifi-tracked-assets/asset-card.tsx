'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../tokens/cn';
import { getThreatColor, getThreatGlow } from './threat-utils';
import type { TrackedAsset } from './tracked-types';

/**
 * A compact threat/score bar showing value out of 10.
 *
 * @example
 * ```tsx
 * <ThreatBar threat={8} />
 * ```
 */
export interface ThreatBarProps {
  /** Threat or severity score (0-10). */
  threat: number;
}

export const ThreatBar = forwardRef<HTMLDivElement, ThreatBarProps>(function ThreatBar(
  { threat },
  ref,
) {
  const color = getThreatColor(threat);
  const glow = getThreatGlow(threat);
  return (
    <div ref={ref} className="flex items-center gap-2">
      <div
        className="w-16 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 6px ${glow}` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${(threat / 10) * 100}%` }}
          viewport={{ once: true, margin: '-10px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span
        className="text-[10px] font-mono font-bold min-w-[2rem] text-right"
        style={{ color }}
      >
        {threat}/10
      </span>
    </div>
  );
});

/**
 * A single asset card within the tracked assets list.
 *
 * @example
 * ```tsx
 * <AssetCard asset={{ id: 1, name: 'Unit Alpha', type: 'Type-A', affiliation: 'Team Blue', status: 'Active', statusColor: '#00e5ff', statusBg: '...', threat: 7 }} />
 * ```
 */
export interface AssetCardProps {
  /** The asset data. */
  asset: TrackedAsset;
  /** Row index for staggered animation. */
  index: number;
}

export const AssetCard = forwardRef<HTMLDivElement, AssetCardProps>(function AssetCard(
  { asset, index },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="p-3 rounded-sm transition-colors duration-200"
      style={{
        background: `${asset.statusColor}04`,
        border: `1px solid ${asset.statusColor}12`,
      }}
    >
      {/* Top row: name + type + status badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {asset.icon && (
            <span className="text-base flex-shrink-0">{asset.icon}</span>
          )}
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">{asset.name}</div>
            <div className="text-[10px] font-mono text-[#7070a0]">
              {asset.type}
              {asset.affiliation ? ` \u2022 ${asset.affiliation}` : ''}
            </div>
          </div>
        </div>
        <span
          className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm flex-shrink-0 whitespace-nowrap"
          style={{
            backgroundColor: asset.statusBg,
            border: `1px solid ${asset.statusColor}30`,
            color: asset.statusColor,
          }}
        >
          {asset.status}
        </span>
      </div>

      {/* Bottom row: location + threat bar */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-mono text-[#505070] ml-8">
          {asset.location ?? ''}
        </span>
        <ThreatBar threat={asset.threat} />
      </div>
    </motion.div>
  );
});
