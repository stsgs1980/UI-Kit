'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VersusBar } from './versus-bar';
import { VersusTeamCard } from './versus-team-card';
import type { ScifiVersusPanelProps } from './versus-types';

/**
 * Sci-fi styled dual-team versus comparison panel.
 * Shows two opposing team summary cards, an optional balance indicator,
 * animated VS comparison bars, and an optional footer note.
 *
 * @example
 * ```tsx
 * <ScifiVersusPanel
 *   title="Force Balance"
 *   leftTeam={{ name: 'Blue', color: '#00e5ff', background: '...', borderColor: '...', stats: [...] }}
 *   rightTeam={{ name: 'Red', color: '#ff2244', background: '...', borderColor: '...', stats: [...] }}
 *   bars={[
 *     { label: 'Ships', leftValue: 12, leftLabel: '12', rightValue: 6, rightLabel: '6' },
 *     { label: 'Aircraft', leftValue: 180, leftLabel: '180', rightValue: 60, rightLabel: '60' },
 *   ]}
 *   balancePct={72}
 *   balanceLabel="Blue Advantage"
 *   leftBarColor="#00e5ff"
 *   rightBarColor="#ff2244"
 * />
 * ```
 */
export const ScifiVersusPanel = forwardRef<HTMLDivElement, ScifiVersusPanelProps>(
  function ScifiVersusPanel(
    {
      title,
      leftTeam,
      rightTeam,
      bars,
      balancePct = 50,
      balanceLabel,
      leftBarColor = '#00e5ff',
      rightBarColor = '#ff2244',
      footerNote,
      className,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]',
          'rounded-sm p-4 sm:p-5',
          className,
        )}
      >
        {title && (
          <h3 className="font-mono text-sm font-bold text-white mb-4">{title}</h3>
        )}

        {/* Team summary cards */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <VersusTeamCard team={leftTeam} />
          <VersusTeamCard team={rightTeam} />
        </div>

        {/* Balance indicator */}
        <div
          className="mb-5 p-3 rounded-sm"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-[#7070a0] uppercase tracking-wider">
              {balanceLabel ?? `${leftTeam.name} Advantage`}
            </span>
            <span
              className="text-sm font-bold"
              style={{
                color: leftBarColor,
                fontFamily: 'var(--font-orbitron)',
              }}
            >
              {balancePct}%
            </span>
          </div>
          <div
            className="h-3 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${leftBarColor}, ${leftBarColor})`,
                boxShadow: `0 0 10px ${leftBarColor}50`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${balancePct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>
        </div>

        {/* VS comparison bars */}
        <div className="space-y-3">
          {bars.map((bar, i) => (
            <motion.div
              key={bar.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <VersusBar
                label={bar.label}
                leftValue={bar.leftValue}
                leftLabel={bar.leftLabel}
                rightValue={bar.rightValue}
                rightLabel={bar.rightLabel}
                leftColor={leftBarColor}
                rightColor={rightBarColor}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        {footerNote && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1a1a3a]"
          >
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]"
              style={{ boxShadow: '0 0 4px rgba(255,107,43,0.5)' }}
            />
            <span className="text-[9px] font-mono text-[#505070]">{footerNote}</span>
          </motion.div>
        )}
      </div>
    );
  },
);
