'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../tokens/cn';
import { type ScifiForecastPanelProps } from './types';
import { FuturesCurveChart } from './futures-chart';
import { ForecastChart, ForecastLegend } from './forecast-chart';
import { SignalList } from './signal-list';

/**
 * Sci-fi styled multi-model forecast panel with futures curve chart,
 * forecast models, and expandable algorithmic signal list.
 * @example
 * ```tsx
 * <ScifiForecastPanel futuresCurve={curveData} models={[baseModel, bullishModel]}
 *   signals={algorithmSignals} accentColor="#00e5ff" />
 * ```
 */
export const ScifiForecastPanel = forwardRef<HTMLDivElement, ScifiForecastPanelProps>(
  function ScifiForecastPanel({ futuresCurve, models, signals = [], accentColor = '#00e5ff', className }, ref) {
    const [activeModel, setActiveModel] = useState(0);
    const activeData = models[activeModel];
    const lastVal = futuresCurve[futuresCurve.length - 1]?.value ?? 0;
    const firstVal = futuresCurve[0]?.value ?? 0;

    return (
      <section ref={ref} data-slot="scifi-forecast-panel" className={cn('py-12 sm:py-16 px-4', className)}>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Futures Curve */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: `${accentColor}20 1px solid` }}>
              <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">Forward Curve</h3>
              <FuturesCurveChart data={futuresCurve} accentColor={accentColor} spotPrice={firstVal} />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-sm" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                  <div className="text-[9px] font-mono text-[#505080] uppercase">Contango</div>
                  <div className="text-sm font-bold text-green-400 font-mono">{futuresCurve[0]?.label} – {futuresCurve[futuresCurve.length - 1]?.label}</div>
                </div>
                <div className="text-center p-2 rounded-sm" style={{ background: 'rgba(255,107,0,0.05)', border: '1px solid rgba(255,107,0,0.15)' }}>
                  <div className="text-[9px] font-mono text-[#505080] uppercase">Spot</div>
                  <div className="text-sm font-bold text-[#ff6b00] font-mono">{firstVal.toFixed(2)}</div>
                </div>
                <div className="text-center p-2 rounded-sm" style={{ background: `${accentColor}0d`, border: `${accentColor}26 1px solid` }}>
                  <div className="text-[9px] font-mono text-[#505080] uppercase">Roll Yield</div>
                  <div className="text-sm font-bold font-mono" style={{ color: accentColor }}>+{(lastVal - firstVal).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Multi-Model Forecast */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: 'rgba(255,107,0,0.2) 1px solid' }}>
              <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">Multi-Model Forecast</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {models.map((m, idx) => (
                  <button key={m.name} onClick={() => setActiveModel(idx)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-all duration-200 ${activeModel === idx ? 'border-[rgba(0,229,255,0.5)] bg-[rgba(0,229,255,0.1)] text-white' : 'border-[rgba(255,255,255,0.08)] text-[#505080] hover:text-[#c0c0e0] hover:border-[rgba(255,255,255,0.15)]'}`}>
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: m.color }} />{m.name}
                  </button>
                ))}
              </div>
              {activeData && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 p-3 rounded-sm" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div className="text-[9px] font-mono text-[#505080] uppercase">Target</div>
                    <div className="text-lg font-bold font-mono" style={{ color: activeData.color }}>{activeData.values.at(-1)?.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#505080] uppercase">Min (95% CI)</div>
                    <div className="text-lg font-bold font-mono text-[#ff2244]">{((activeData.values.at(-1) ?? 0) - (activeData.confidence.at(-1) ?? 0)).toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#505080] uppercase">Max (95% CI)</div>
                    <div className="text-lg font-bold font-mono text-[#22c55e]">{((activeData.values.at(-1) ?? 0) + (activeData.confidence.at(-1) ?? 0)).toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-[#505080] uppercase">Drift</div>
                    <div className={`text-lg font-bold font-mono ${(activeData.values.at(-1) ?? 0) > firstVal ? 'text-green-400' : 'text-red-400'}`}>
                      {(activeData.values.at(-1) ?? 0) > firstVal ? '▲' : '▼'} {((activeData.values.at(-1) ?? 0) - firstVal).toFixed(1)}
                    </div>
                  </div>
                </div>
              )}
              <ForecastChart models={models} accentColor={accentColor} />
              <ForecastLegend models={models} />
            </div>
          </motion.div>

          {/* Algorithm Signals */}
          {signals.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: 'rgba(168,85,247,0.2) 1px solid' }}>
                <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">Algorithmic Signals</h3>
                <SignalList signals={signals} accentColor={accentColor} />
              </div>
            </motion.div>
          )}
        </div>
      </section>
    );
  },
);
