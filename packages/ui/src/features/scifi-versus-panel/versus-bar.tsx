'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { VersusBarItem } from './versus-types';

/**
 * A single VS comparison bar showing two opposing values.
 * The longer bar determines 100% width; the shorter is proportional.
 *
 * @example
 * ```tsx
 * <VersusBar
 *   label="Destroyers"
 *   leftValue={12} leftLabel="12"
 *   rightValue={6}  rightLabel="6"
 *   leftColor="#00e5ff" rightColor="#ff2244"
 * />
 * ```
 */
export interface VersusBarProps extends VersusBarItem {
  /** Left bar accent color. */
  leftColor?: string;
  /** Right bar accent color. */
  rightColor?: string;
}

export const VersusBar = forwardRef<HTMLDivElement, VersusBarProps>(function VersusBar(
  { label, leftValue, leftLabel, rightValue, rightLabel, leftColor = '#00e5ff', rightColor = '#ff2244' },
  ref,
) {
  const maxVal = Math.max(leftValue, rightValue, 1);
  const lPct = (leftValue / maxVal) * 100;
  const rPct = (rightValue / maxVal) * 100;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="text-[9px] font-mono text-[#9090b0] text-center uppercase tracking-wider">
        {label}
      </div>
      <div className="flex items-center gap-2">
        {/* Left bar (grows right) */}
        <div className="flex-1 flex justify-end">
          <motion.div
            className="h-2 rounded-l-sm"
            style={{
              background: `linear-gradient(to right, ${leftColor}20, ${leftColor})`,
              boxShadow: `0 0 6px ${leftColor}40`,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${lPct}%` }}
            viewport={{ once: true, margin: '-5px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="w-8 text-center text-[8px] font-mono font-bold text-[#505070]">VS</div>
        {/* Right bar (grows left) */}
        <div className="flex-1">
          <motion.div
            className="h-2 rounded-r-sm"
            style={{
              background: `linear-gradient(to left, ${rightColor}20, ${rightColor})`,
              boxShadow: `0 0 6px ${rightColor}40`,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${rPct}%` }}
            viewport={{ once: true, margin: '-5px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
      <div className="flex justify-between text-[8px] font-mono">
        <span style={{ color: leftColor }}>{leftLabel}</span>
        <span style={{ color: rightColor }}>{rightLabel}</span>
      </div>
    </div>
  );
});
