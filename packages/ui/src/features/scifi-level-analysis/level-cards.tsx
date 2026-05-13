'use client';

import { motion } from 'framer-motion';
import { type AnalysisLevel, type IndicatorCard } from './types';

/**
 * Level cards grid + indicator overlay cards for the level analysis panel.
 *
 * @example
 * ```tsx
 * <LevelCards levels={levels} indicators={cards} currentValue={96.57} accentColor="#00e5ff" />
 * ```
 */
export function LevelCards({
  levels,
  indicators = [],
  currentValue,
  accentColor = '#00e5ff',
}: {
  levels: AnalysisLevel[];
  indicators?: IndicatorCard[];
  currentValue?: number;
  accentColor?: string;
}) {
  return (
    <div className="mt-4 space-y-4">
      {/* Indicator overlay */}
      {indicators.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {indicators.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="p-2 rounded-sm"
              style={{
                backgroundColor: `${ind.color}08`,
                border: `1px solid ${ind.color}20`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px]" style={{ color: ind.color }}>
                  {ind.icon}
                </span>
                <span className="font-mono text-[9px] text-[#7070a0]">{ind.label}</span>
              </div>
              <span className="font-mono text-[10px] font-bold" style={{ color: ind.color }}>
                {ind.value}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Level cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {levels.map((level, i) => {
          const isNearCurrent = currentValue !== undefined
            && Math.abs(level.price - currentValue) < 15;
          return (
            <motion.div
              key={`${level.label}-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="p-2 border rounded-sm"
              style={{
                borderColor: isNearCurrent ? `${accentColor}80` : 'rgba(255,255,255,0.05)',
                backgroundColor: isNearCurrent ? `${accentColor}14` : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="font-mono text-[10px] text-[#7070a0]">{level.label}</div>
              <div className="font-mono text-sm font-bold" style={{ color: level.color }}>
                {level.price.toFixed(1)}
              </div>
              {isNearCurrent && (
                <div className="font-mono text-[8px] mt-1 uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  Current zone
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
