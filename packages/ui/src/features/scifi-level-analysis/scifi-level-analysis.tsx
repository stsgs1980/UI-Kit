'use client';

import { forwardRef, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../tokens/cn';
import { type ScifiLevelAnalysisProps } from './types';
import { LevelChart } from './level-chart';
import { LevelCards } from './level-cards';

/**
 * Sci-fi styled level analysis panel with canvas chart,
 * horizontal level lines, indicator overlays, and level cards.
 *
 * @example
 * ```tsx
 * <ScifiLevelAnalysis
 *   data={priceData}
 *   levels={supportResistanceLevels}
 *   indicators={keyIndicators}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiLevelAnalysis = forwardRef<
  HTMLDivElement,
  ScifiLevelAnalysisProps
>(function ScifiLevelAnalysis(
  { data, levels, indicators, accentColor = '#00e5ff', className },
  ref,
) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!chartRef.current) return;
      const rect = chartRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const padding = 55;
      const chartW = rect.width - padding - 80;
      const idx = Math.round(((x - padding) / chartW) * (data.length - 1));
      if (idx >= 0 && idx < data.length) setHoverIdx(idx);
    },
    [data.length],
  );

  const handleMouseLeave = useCallback(() => setHoverIdx(null), []);

  const lastValue = data.length > 0 ? data[data.length - 1].value : 0;

  return (
    <section
      ref={ref}
      data-slot="scifi-level-analysis"
      className={cn('relative py-16 sm:py-24 px-4', className)}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Chart card */}
        <div
          className="rounded-sm p-4"
          style={{
            background: 'rgba(5,5,16,0.6)',
            border: `1px solid ${accentColor}15`,
          }}
        >
          <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-4">
            Level Analysis
          </h3>

          <div
            ref={chartRef}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <LevelChart
              data={data}
              levels={levels}
              hoverIdx={hoverIdx}
              accentColor={accentColor}
            />
            {/* Hover info */}
            {hoverIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-3 left-3 flex items-center gap-3 px-3 py-2 rounded-sm"
                style={{
                  background: 'rgba(5,5,16,0.85)',
                  border: `${accentColor}30 1px solid`,
                }}
              >
                <span className="font-mono text-xs text-[#7070a0]">
                  {data[hoverIdx].date}
                </span>
                <span className="font-mono text-sm font-bold" style={{ color: accentColor }}>
                  {data[hoverIdx].value.toFixed(2)}
                </span>
              </motion.div>
            )}
          </div>

          <LevelCards
            levels={levels}
            indicators={indicators}
            currentValue={lastValue}
            accentColor={accentColor}
          />
        </div>
      </div>
    </section>
  );
});
