'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { type SignalItem } from './types';

/**
 * Expandable signal list with score bars and detail panels.
 *
 * @example
 * ```tsx
 * <SignalList signals={algorithmSignals} accentColor="#a855f7" />
 * ```
 */
export function SignalList({
  signals,
  accentColor = '#a855f7',
}: {
  signals: SignalItem[];
  accentColor?: string;
}) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  if (signals.length === 0) return null;

  return (
    <div>
      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
        {signals.map((signal, idx) => (
          <motion.div
            key={signal.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
          >
            <button
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              className="w-full text-left p-3 rounded-sm hover:border-[rgba(255,255,255,0.12)] transition-all duration-200"
              style={{
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg shrink-0">{signal.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-mono font-semibold text-[#e0e0f0] truncate">
                      {signal.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#505080] truncate hidden sm:block">
                      {signal.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {/* Score bar */}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${signal.score}%`,
                          backgroundColor: signal.score > 60 ? '#22c55e' : signal.score > 45 ? accentColor : '#ff6b00',
                          boxShadow: `0 0 6px ${signal.score > 60 ? '#22c55e' : signal.score > 45 ? accentColor : '#ff6b00'}60`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#7070a0] w-6 text-right">
                      {signal.score}
                    </span>
                  </div>
                  {/* Signal badge */}
                  <span
                    className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-sm whitespace-nowrap"
                    style={{
                      color: signal.signalColor,
                      backgroundColor: signal.signalColor + '15',
                      border: `1px solid ${signal.signalColor}30`,
                    }}
                  >
                    {signal.signal}
                  </span>
                  <span className="text-[#505080] text-xs">
                    {expandedIdx === idx ? '▾' : '▸'}
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              {expandedIdx === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]"
                >
                  <ul className="space-y-1.5">
                    {signal.details.map((detail, di) => (
                      <li key={di} className="text-[11px] font-mono text-[#7070a0] leading-relaxed flex items-start gap-2">
                        <span className="mt-0.5 shrink-0" style={{ color: signal.signalColor }}>
                          ›
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Composite signal footer */}
      <div
        className="mt-4 p-3 rounded-sm"
        style={{
          background: `${accentColor}08`,
          border: `${accentColor}26 1px solid`,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-[#505080] uppercase tracking-wider">
              Composite Signal (weighted)
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold font-mono"
                style={{ color: signals[0]?.signalColor ?? '#22c55e' }}>
                {(signals[0]?.signal ?? 'N/A')}
              </span>
              <span className="text-xs font-mono text-[#7070a0]">
                Score: {(signals.reduce((s, sig) => s + sig.score, 0) / signals.length).toFixed(1)} / 100
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-[#505080] uppercase tracking-wider">
              Weighted Probability
            </div>
            <div className="text-lg font-bold font-mono" style={{ color: accentColor }}>
              {Math.round(signals.filter((s) => s.score > 50).length / signals.length * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
