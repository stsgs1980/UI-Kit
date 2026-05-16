'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CorrelationSparkline } from './correlation-sparkline';
import type { CorrelationItem } from './correlation-types';

// ─── Helpers (module-scoped) ──────────────────────────────────

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

// ─── Sub-components ──────────────────────────────────────────

function CorrelationBar({ value, color }: { value: number; color: string }) {
  const absValue = Math.abs(value);
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${absValue * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: `0 0 4px ${color}40`,
          }}
        />
      </div>
      <span className="font-mono text-[10px] w-8 text-right" style={{ color }}>
        {value > 0 ? '' : '-'}
        {absValue.toFixed(2)}
      </span>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────

export interface CorrelationRowProps {
  /** The data item to render. */
  item: CorrelationItem;
  /** Row index for staggered animation delay. */
  index: number;
  /** Tailwind accent color for hover border (e.g. 'cyan'). */
  accentColor?: string;
}

/**
 * A single row inside a correlation table panel.
 * Renders label, value, short/long changes, correlation bar, and sparkline.
 */
export const CorrelationRow = forwardRef<HTMLDivElement, CorrelationRowProps>(
  function CorrelationRow({ item, index, accentColor = 'cyan' }, ref) {
    const corrColor = getCorrelationColor(item.correlation);
    const sparkColor = item.changeLong >= 0 ? '#22c55e' : '#ff2244';

    const borderHoverClass =
      accentColor === 'orange'
        ? 'hover:border-[rgba(255,107,0,0.1)] hover:bg-[rgba(255,107,0,0.02)]'
        : 'hover:border-[rgba(0,229,255,0.1)] hover:bg-[rgba(0,229,255,0.02)]';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className={cn(
          'group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 px-3',
          'rounded-sm border border-transparent transition-all duration-300',
          borderHoverClass,
        )}
      >
        {/* Label */}
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-bold text-white truncate">{item.label}</div>
          <div className="font-mono text-[10px] text-[#7070a0]">{item.description}</div>
        </div>

        {/* Value */}
        <div className="font-mono text-sm font-bold text-white tabular-nums sm:w-24 text-right">
          {item.value}
        </div>

        {/* Short-term change */}
        <div
          className="font-mono text-xs font-bold sm:w-16 text-right tabular-nums"
          style={{ color: getChangeColor(item.changeShort) }}
        >
          {formatChange(item.changeShort)}
        </div>

        {/* Long-term change */}
        <div
          className="font-mono text-xs font-bold sm:w-16 text-right tabular-nums"
          style={{ color: getChangeColor(item.changeLong) }}
        >
          {formatChange(item.changeLong)}
        </div>

        {/* Correlation */}
        <div className="sm:w-32 flex flex-col gap-0.5">
          <div className="font-mono text-[9px] text-[#7070a0]">{item.correlationLabel}</div>
          <CorrelationBar value={item.correlation} color={corrColor} />
        </div>

        {/* Sparkline */}
        <div className="flex-shrink-0">
          <CorrelationSparkline data={item.sparkline} color={sparkColor} />
        </div>
      </motion.div>
    );
  },
);
