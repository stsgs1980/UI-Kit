'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { type SpreadData } from './types';
import { MiniSparkline } from './processing-charts';

/**
 * Spread panel showing processing spreads with animated horizontal bars.
 *
 * @example
 * ```tsx
 * <SpreadPanel spreads={crackSpreads} accentColor="#00e5ff" />
 * ```
 */
export function SpreadPanel({
  spreads,
  accentColor = '#00e5ff',
}: {
  spreads: SpreadData[];
  accentColor?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const maxSpread = Math.max(...spreads.map((s) => s.value));

  return (
    <div
      ref={sectionRef}
      className="rounded-sm p-4"
      style={{ background: 'rgba(5,5,16,0.6)', border: `${accentColor}15 1px solid` }}
    >
      <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">
        Processing Spreads
      </h3>
      <div className="space-y-4">
        {spreads.map((item, i) => {
          const barWidth = (item.value / maxSpread) * 100;
          const isPositive = item.change >= 0;
          const barColor = isPositive ? accentColor : '#ff6b00';

          return (
            <motion.div
              key={item.region}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="p-3 rounded-sm bg-white/[0.015] border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}60` }} />
                  <span className="text-[11px] sm:text-xs font-mono text-white font-medium">
                    {item.region}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold font-mono"
                    style={{ color: barColor, fontFamily: 'var(--font-jetbrains)' }}>
                    {item.value.toFixed(2)}
                  </span>
                  <span className="text-[9px] font-mono text-[#505080]">{item.unit}</span>
                </div>
              </div>

              <div className="text-[9px] sm:text-[10px] font-mono text-[#7070a0] mb-2 pl-4">
                {item.spread}
              </div>

              <div className="relative w-full h-4 rounded-sm bg-white/[0.03] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${barWidth}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                  className="absolute left-0 top-0 h-full rounded-sm"
                  style={{
                    background: `linear-gradient(to right, ${barColor}cc, ${barColor}44)`,
                    boxShadow: `0 0 10px ${barColor}30`,
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <MiniSparkline data={[item.value - item.change, item.value, item.value + item.change * 0.3]} isPositive={isPositive} />
                  <span className={`text-[10px] font-bold font-mono ${isPositive ? 'text-[#22c55e]' : 'text-[#ff6b00]'}`}>
                    {isPositive ? '+' : ''}{item.change.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
