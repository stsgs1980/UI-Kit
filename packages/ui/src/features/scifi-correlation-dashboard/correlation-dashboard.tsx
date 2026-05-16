'use client';

import { forwardRef, useRef } from 'react';
import { cn } from '../../tokens/cn';
import { CorrelationRow } from './correlation-row';
import { AssetRow } from './asset-row';
import { ColumnHeaders, Legend, StatCards } from './dashboard-parts';
import type { ScifiCorrelationDashboardProps } from './correlation-types';

/**
 * Sci-fi styled dual-panel correlation dashboard.
 * Displays two side-by-side panels comparing correlated data items
 * with sparklines, correlation bars, and optional summary stats.
 *
 * @example
 * ```tsx
 * <ScifiCorrelationDashboard
 *   sectionLabel="[ Market ]"
 *   sectionTitle="Cross-Asset Correlation"
 *   leftPanel={{ title: 'Currency Pairs', accentColor: 'cyan', columns: [...] }}
 *   leftItems={currencies}
 *   rightPanel={{ title: 'Commodities', accentColor: 'orange', columns: [...] }}
 *   rightItems={commodities}
 *   stats={summaryStats}
 * />
 * ```
 */
export const ScifiCorrelationDashboard = forwardRef<
  HTMLDivElement,
  ScifiCorrelationDashboardProps
>(function ScifiCorrelationDashboard(
  {
    sectionLabel,
    sectionTitle,
    sectionSubtitle,
    leftPanel,
    leftItems,
    rightPanel,
    rightItems,
    stats = [],
    className,
  },
  ref,
) {
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      data-slot="scifi-correlation-dashboard"
        className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:py-20', className)}
    >
      {/* Background effects */}
      <div className="absolute inset-0 scifi-grid-bg opacity-10 pointer-events-none" />
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.03) 0%, transparent 60%)' }}
      />

      <div ref={innerRef} className="relative z-10">
        {sectionTitle && (
          <div className="mb-6">
            {sectionLabel && (
              <span className="font-mono text-[10px] text-[#00e5ff] tracking-widest uppercase">
                {sectionLabel}
              </span>
            )}
            <h2 className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className="font-mono text-xs text-[#7070a0] mt-1">{sectionSubtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Left panel */}
          <div
            className={cn(
              'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]',
              'rounded-sm p-4 sm:p-5',
            )}
          >
            <h3 className="font-mono text-sm font-bold text-white mb-4">{leftPanel.title}</h3>
            <ColumnHeaders
              columns={leftPanel.columns}
              borderColor="border-[rgba(0,229,255,0.08)]"
            />
            <div className="max-h-[480px] overflow-y-auto scifi-scrollbar divide-y divide-[rgba(255,255,255,0.03)]">
              {leftItems.map((item, i) => (
                <CorrelationRow key={item.id} item={item} index={i} />
              ))}
            </div>
            <Legend
              items={leftPanel.legend ?? []}
              borderColor="border-[rgba(0,229,255,0.08)]"
            />
          </div>

          {/* Right panel */}
          <div
            className={cn(
              'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]',
              'rounded-sm p-4 sm:p-5',
            )}
          >
            <h3 className="font-mono text-sm font-bold text-white mb-4">{rightPanel.title}</h3>
            <ColumnHeaders
              columns={rightPanel.columns}
              borderColor="border-[rgba(255,107,0,0.08)]"
            />
            <div className="max-h-[480px] overflow-y-auto scifi-scrollbar divide-y divide-[rgba(255,255,255,0.03)]">
              {rightItems.map((asset, i) => (
                <AssetRow key={asset.id} asset={asset} index={i} />
              ))}
            </div>
            <Legend
              items={rightPanel.legend ?? []}
              borderColor="border-[rgba(255,107,0,0.08)]"
            />
          </div>
        </div>

        {stats.length > 0 && <StatCards stats={stats} />}
      </div>
    </section>
  );
});
