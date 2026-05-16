'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Ship, AlertTriangle, Radar } from 'lucide-react';
import { cn } from '../../tokens/cn';
import { AssetCard } from './asset-card';
import type { ScifiTrackedAssetsProps, TrackedAssetsInfo } from './tracked-types';

/**
 * Info bar shown above the asset list with counters.
 */
function InfoBar({ info }: { info: TrackedAssetsInfo }) {
  const threshold = info.highThreshold ?? 7;
  const highCount = info.highThreatCount ?? 0;

  return (
    <div className="flex items-center gap-4 mb-4 text-[9px] font-mono text-[#505070]">
      <div className="flex items-center gap-1.5">
        <Ship size={12} className="text-[#00e5ff]" />
        <span>
          {info.totalLabel ?? 'Tracking'}: <span className="text-white font-bold">{info.total}</span>
        </span>
      </div>
      {highCount > 0 && (
        <div className="flex items-center gap-1.5">
          <AlertTriangle size={12} className="text-[#ff2244]" />
          <span>
            {info.highThreatLabel ?? `Threat >=${threshold}`}:{' '}
            <span className="text-[#ff2244] font-bold">{highCount}</span>
          </span>
        </div>
      )}
      {info.showLive && (
        <div className="flex items-center gap-1.5 ml-auto">
          <Radar size={12} className="text-[#00e5ff] animate-pulse" />
          <span className="text-[#00e5ff]">LIVE</span>
        </div>
      )}
    </div>
  );
}

/**
 * Sci-fi styled tracked assets list panel.
 * Displays a scrollable list of asset cards with status badges,
 * threat bars, and optional summary info bar.
 *
 * @example
 * ```tsx
 * <ScifiTrackedAssets
 *   title="Tracked Vessels"
 *   info={{ total: 10, highThreatCount: 4, showLive: true }}
 *   assets={[
 *     { id: 1, name: 'Unit Alpha', type: 'Type-A', affiliation: 'Blue', status: 'Active', statusColor: '#00e5ff', statusBg: 'rgba(0,240,255,0.12)', threat: 9, location: '26.4N 56.8E' },
 *   ]}
 * />
 * ```
 */
export const ScifiTrackedAssets = forwardRef<HTMLDivElement, ScifiTrackedAssetsProps>(
  function ScifiTrackedAssets(
    { title, info, assets, footerNote, maxHeight = '520px', className },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="scifi-tracked-assets"
        className={cn(
          'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]',
          'rounded-sm p-4 sm:p-5',
          className,
        )}
      >
        {title && (
          <h3 className="font-mono text-sm font-bold text-white mb-4">{title}</h3>
        )}

        {info && <InfoBar info={info} />}

        <div
          className="space-y-2.5 overflow-y-auto pr-1 scifi-scrollbar"
          style={{ maxHeight }}
        >
          {assets.map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} index={i} />
          ))}
        </div>

        {footerNote && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1a1a3a]"
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"
              style={{ boxShadow: '0 0 6px rgba(0,229,255,0.5)' }}
            />
            <span className="text-[9px] font-mono text-[#505070]">{footerNote}</span>
          </motion.div>
        )}
      </div>
    );
  },
);
