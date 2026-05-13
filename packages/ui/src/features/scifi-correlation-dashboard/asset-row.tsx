'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CorrelationSparkline } from './correlation-sparkline';
import type { CorrelationAsset } from './correlation-types';

// ─── Helpers ─────────────────────────────────────────────────

function getCorrelationColor(corr: number): string {
  const abs = Math.abs(corr);
  if (abs >= 0.7) return '#00e5ff';
  if (abs >= 0.5) return '#22d3ee';
  if (abs >= 0.3) return '#eab308';
  return '#7070a0';
}

function getChangeColor(val: number): string {
  if (val > 0) return '#22c55e';
  if (val < 0) return '#ff2244';
  return '#eab308';
}

function formatChange(val: number): string {
  const sign = val >= 0 ? '+' : '';
  return `${sign}${val.toFixed(2)}%`;
}

const TREND_CONFIG = {
  up: { label: '\u25B2', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  down: { label: '\u25BC', color: '#ff2244', bg: 'rgba(255,34,68,0.1)' },
  stable: { label: '\u25CF', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
};

// ─── Main export ─────────────────────────────────────────────

export interface AssetRowProps {
  /** The asset data to render. */
  asset: CorrelationAsset;
  /** Row index for staggered animation delay. */
  index: number;
}

/**
 * A single row for the secondary (asset) correlation panel.
 * Shows trend icon, name, price, change, correlation bar, and sparkline.
 */
export const AssetRow = forwardRef<HTMLDivElement, AssetRowProps>(
  function AssetRow({ asset, index }, ref) {
    const corrColor = getCorrelationColor(asset.correlation);
    const changeColor = getChangeColor(asset.change24h);
    const trend = TREND_CONFIG[asset.trend];
    const sparkColor =
      asset.trend === 'up' ? '#22c55e' : asset.trend === 'down' ? '#ff2244' : '#eab308';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className={cn(
          'group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 px-3',
          'rounded-sm border border-transparent',
          'hover:border-[rgba(255,107,0,0.1)] hover:bg-[rgba(255,107,0,0.02)] transition-all duration-300',
        )}
      >
        {/* Name with trend icon */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span
            className="w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold flex-shrink-0"
            style={{ color: trend.color, backgroundColor: trend.bg }}
          >
            {trend.label}
          </span>
          <div className="min-w-0">
            <div className="font-mono text-sm font-bold text-white truncate">{asset.name}</div>
            <div className="font-mono text-[10px] text-[#505080]">{asset.sublabel}</div>
          </div>
        </div>

        {/* Price */}
        <div className="sm:text-right flex-shrink-0">
          <div className="font-mono text-sm font-bold text-white tabular-nums">{asset.price}</div>
          <div className="font-mono text-[10px] text-[#505080]">{asset.unit}</div>
        </div>

        {/* 24h change */}
        <div
          className="font-mono text-xs font-bold sm:w-16 text-right tabular-nums"
          style={{ color: changeColor }}
        >
          {formatChange(asset.change24h)}
        </div>

        {/* Correlation bar */}
        <div className="sm:w-32 flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#7070a0]">
              {Math.abs(asset.correlation) >= 0.7
                ? 'Strong'
                : Math.abs(asset.correlation) >= 0.5
                  ? 'Medium'
                  : Math.abs(asset.correlation) >= 0.3
                    ? 'Moderate'
                    : 'Weak'}
            </span>
            <span className="font-mono text-[9px]" style={{ color: corrColor }}>
              {asset.correlation.toFixed(2)}
            </span>
          </div>
          <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.abs(asset.correlation) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${corrColor}40, ${corrColor})`,
                boxShadow: `0 0 4px ${corrColor}40`,
              }}
            />
          </div>
        </div>

        {/* Sparkline */}
        <div className="flex-shrink-0">
          <CorrelationSparkline data={asset.sparkline} color={sparkColor} />
        </div>
      </motion.div>
    );
  },
);
