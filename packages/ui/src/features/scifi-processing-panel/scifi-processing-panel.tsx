'use client';

import { forwardRef } from 'react';
import { cn } from '../../tokens/cn';
import { type ScifiProcessingPanelProps } from './types';
import { TrendChart } from './processing-charts';
import { SpreadPanel } from './spread-panel';
import { ProductPanel, UtilizationPanel } from './product-panel';

/**
 * Sci-fi styled processing/margin dashboard with spread bars,
 * product prices, utilization gauges, and trend chart.
 *
 * @example
 * ```tsx
 * <ScifiProcessingPanel
 *   spreads={spreadData}
 *   products={productData}
 *   utilization={utilData}
 *   trendData={monthlyTrend}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiProcessingPanel = forwardRef<
  HTMLDivElement,
  ScifiProcessingPanelProps
>(function ScifiProcessingPanel(
  { spreads, products, utilization, trendData = [], accentColor = '#00e5ff', className },
  ref,
) {
  return (
    <section
      ref={ref}
      data-slot="scifi-processing-panel"
      className={cn('max-w-7xl mx-auto px-4 py-8 sm:py-12', className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <SpreadPanel spreads={spreads} accentColor={accentColor} />
        <ProductPanel products={products} accentColor={accentColor} />
        <UtilizationPanel utilization={utilization} accentColor={accentColor} />

        {/* Trend chart panel */}
        {trendData.length > 0 && (
          <div
            className="rounded-sm p-4"
            style={{ background: 'rgba(5,5,16,0.6)', border: `${accentColor}15 1px solid` }}
          >
            <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">
              Margin Trend
            </h3>
            <TrendChart data={trendData} accentColor={accentColor} />

            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {[
                { label: 'Average', value: (trendData.reduce((s, d) => s + d.value, 0) / trendData.length).toFixed(1), color: accentColor },
                { label: 'Max', value: Math.max(...trendData.map((d) => d.value)).toFixed(1), color: '#22c55e' },
                { label: 'Min', value: Math.min(...trendData.map((d) => d.value)).toFixed(1), color: '#ff2244' },
                { label: 'Latest', value: trendData[trendData.length - 1].value.toFixed(1), color: '#a855f7' },
              ].map((stat) => (
                <div key={stat.label} className="p-2 rounded-sm bg-white/[0.02] border border-white/5">
                  <div className="text-[8px] sm:text-[9px] font-mono text-[#505080] uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-mono"
                    style={{ color: stat.color, fontFamily: 'var(--font-jetbrains)' }}>
                    ${stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
