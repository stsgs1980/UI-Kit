'use client';

import { motion } from 'framer-motion';
import { cn } from '../../tokens/cn';
import type { ColumnHeader, CorrelationStat } from './correlation-types';

/**
 * Renders column header labels for a correlation panel.
 */
export function ColumnHeaders({
  columns,
  borderColor,
}: {
  columns: ColumnHeader[];
  borderColor: string;
}) {
  return (
    <div
      className={cn('hidden sm:flex items-center gap-4 px-3 pb-2 mb-1', `border-b ${borderColor}`)}
    >
      {columns.map((col) => (
        <div
          key={col.label}
          className={cn(
            'font-mono text-[9px] text-[#505080] uppercase tracking-wider',
            col.widthClass,
            col.widthClass.startsWith('sm:w') ? 'text-right' : '',
          )}
        >
          {col.label}
        </div>
      ))}
      <div className="w-[72px] font-mono text-[9px] text-[#505080] uppercase tracking-wider" />
    </div>
  );
}

/**
 * Renders legend items at the bottom of a panel.
 */
export function Legend({
  items,
  borderColor,
}: {
  items: Array<{ color: string; label: string }>;
  borderColor: string;
}) {
  if (!items.length) return null;
  return (
    <div className={cn('mt-4 pt-3 flex flex-wrap gap-3', `border-t ${borderColor}`)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="font-mono text-[9px] text-[#7070a0]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Animated summary stat cards grid.
 */
export function StatCards({ stats }: { stats: CorrelationStat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
        >
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-sm p-3 text-center">
            <div className="font-mono text-[9px] text-[#7070a0] uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div
              className="font-mono text-base sm:text-lg font-bold mb-0.5"
              style={{ color: stat.color, textShadow: `0 0 8px ${stat.color}40` }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[9px] text-[#505080]">{stat.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
