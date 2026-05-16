'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { VersusTeam, VersusStat } from './versus-types';

/**
 * Renders a single stat row with label and value.
 */
function StatRow({ stat, index }: { stat: VersusStat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center justify-between"
    >
      <span className="text-[9px] font-mono text-[#7070a0]">{stat.label}</span>
      <span
        className="text-xs font-bold font-mono"
        style={{ color: stat.color, fontFamily: 'var(--font-orbitron)' }}
      >
        {stat.value}
      </span>
    </motion.div>
  );
}

/**
 * A summary card for one side of a versus comparison.
 * Shows team name, icon, and a list of stats.
 *
 * @example
 * ```tsx
 * <VersusTeamCard
 *   team={{ name: 'Blue Team', color: '#00e5ff', background: '...', borderColor: '...', stats: [...] }}
 *   icon={<Shield size={14} className="text-[#00e5ff]" />}
 * />
 * ```
 */
export interface VersusTeamCardProps {
  /** Team configuration. */
  team: VersusTeam;
  /** Optional icon element rendered before the team name. */
  icon?: ReactNode;
}

export const VersusTeamCard = forwardRef<HTMLDivElement, VersusTeamCardProps>(
  function VersusTeamCard({ team, icon }, ref) {
    return (
      <div
        ref={ref}
        className="p-3 rounded-sm"
        style={{
          background: team.background,
          border: `1px solid ${team.borderColor}`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: team.color }}
          >
            {team.name}
          </span>
        </div>
        <div className="space-y-2">
          {team.stats.map((stat, i) => (
            <StatRow key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    );
  },
);
