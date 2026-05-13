'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../tokens/cn';
import { type ScifiIndicatorPanelProps } from './types';
import { calculateRSI, calculateMACD, calculateBollinger } from './calculations';
import { RSIChart, MACDChart, BollingerChart } from './indicator-chart';
import { IndicatorSignalCard, SummaryCard } from './indicator-signal';

/**
 * Sci-fi styled multi-indicator analysis panel with RSI, MACD,
 * and Bollinger Bands charts plus signal overview cards.
 *
 * @example
 * ```tsx
 * <ScifiIndicatorPanel
 *   priceData={brentPrices}
 *   indicators={[
 *     { type: 'rsi', period: 14 },
 *     { type: 'macd' },
 *     { type: 'bollinger', period: 20, stdDev: 2 },
 *   ]}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiIndicatorPanel = forwardRef<
  HTMLDivElement,
  ScifiIndicatorPanelProps
>(function ScifiIndicatorPanel(
  { priceData, indicators, accentColor = '#00e5ff', className },
  ref,
) {
  const rsiData = calculateRSI(priceData, 14);
  const { macd: macdData, signal: signalData, histogram: histData } = calculateMACD(priceData);
  const boll = calculateBollinger(priceData, 20, 2);

  const currentRSI = rsiData[rsiData.length - 1];
  const currentMACD = macdData[macdData.length - 1];
  const currentHist = histData[histData.length - 1];
  const upperBand = boll.upper[boll.upper.length - 1];
  const lowerBand = boll.lower[boll.lower.length - 1];
  const midBand = boll.middle[boll.middle.length - 1];
  const currentPrice = priceData[priceData.length - 1];
  const bbWidth = ((upperBand - lowerBand) / midBand) * 100;

  const rsiSignal = currentRSI > 70 ? 'OVERBOUGHT' : currentRSI < 30 ? 'OVERSOLD' : 'NEUTRAL';
  const rsiColor = currentRSI > 70 ? '#ff2244' : currentRSI < 30 ? accentColor : '#a855f7';
  const macdSignal = currentHist > 0 ? 'BULLISH' : 'BEARISH';
  const macdColor = currentHist > 0 ? accentColor : '#ff2244';
  const bbSignal = currentPrice > upperBand ? 'ABOVE UPPER' : currentPrice < lowerBand ? 'BELOW LOWER' : 'IN CHANNEL';
  const bbColor = currentPrice > upperBand ? '#ff6b00' : currentPrice < lowerBand ? '#ff2244' : accentColor;

  return (
    <section
      ref={ref}
      data-slot="scifi-indicator-panel"
      className={cn('relative py-16 sm:py-24 px-4', className)}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Signal overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <IndicatorSignalCard
            label="RSI (14)"
            value={currentRSI}
            signal={rsiSignal}
            signalColor={rsiColor}
          />
          <IndicatorSignalCard
            label="MACD"
            value={currentMACD}
            signal={macdSignal}
            signalColor={macdColor}
            details={[
              `Signal: ${signalData[signalData.length - 1].toFixed(2)}`,
              `Hist: ${currentHist.toFixed(2)}`,
            ]}
          />
          <IndicatorSignalCard
            label="BOLLINGER (20,2)"
            value={bbWidth}
            signal={bbSignal}
            signalColor={bbColor}
            details={[
              `Upper: $${upperBand.toFixed(1)}`,
              `Lower: $${lowerBand.toFixed(1)}`,
            ]}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: `1px solid rgba(168,85,247,0.2)` }}>
            <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">RSI</h3>
            <RSIChart data={priceData} accentColor="#a855f7" />
          </div>
          <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: `${accentColor}15 1px solid` }}>
            <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">MACD (12, 26, 9)</h3>
            <MACDChart data={priceData} accentColor={accentColor} />
          </div>
          <div className="lg:col-span-2 rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: '1px solid rgba(255,107,0,0.2)' }}>
            <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">BOLLINGER BANDS (20, 2σ)</h3>
            <BollingerChart data={priceData} accentColor={accentColor} />
          </div>
        </div>

        {/* Technical Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-sm p-4"
          style={{ background: 'rgba(5,5,16,0.6)', border: `${accentColor}15 1px solid` }}
        >
          <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-4">
            Analysis Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard title="Overall Signal" signal="BULLISH" description="RSI elevated, MACD bullish momentum. Price near upper band." color={accentColor} />
            <SummaryCard title="Volatility" signal="RISING" description="Band width expanding. Volatility increasing." color="#ff6b00" />
            <SummaryCard title="Momentum" signal="BULLISH" description="MACD histogram sustained positive." color={accentColor} />
            <SummaryCard title="Action" signal="BUY" description="Bull trend active. Support zone for entry." color={accentColor} />
          </div>
        </motion.div>
      </div>
    </section>
  );
});
