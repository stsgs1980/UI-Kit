'use client';

import { motion } from 'framer-motion';

export interface IndicatorSignalProps {
  label: string;
  value: number;
  signal: string;
  signalColor: string;
  details?: string[];
  accentColor?: string;
}

/**
 * Single indicator signal card with signal badge and animated entry.
 *
 * @example
 * ```tsx
 * <IndicatorSignalCard
 *   label="RSI (14)"
 *   value={62.4}
 *   signal="NEUTRAL"
 *   signalColor="#a855f7"
 * />
 * ```
 */
export function IndicatorSignalCard({
  label,
  value,
  signal,
  signalColor,
  details,
  accentColor = '#00e5ff',
}: IndicatorSignalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-4 rounded-sm"
      style={{
        background: 'rgba(5,5,16,0.6)',
        borderColor: `${signalColor}30`,
        border: '1px solid',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-[#7070a0] uppercase tracking-wider">
          {label}
        </span>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded-sm"
          style={{
            color: signalColor,
            backgroundColor: `${signalColor}15`,
            border: `1px solid ${signalColor}30`,
          }}
        >
          {signal}
        </span>
      </div>
      <div className="font-mono text-2xl font-bold" style={{ color: signalColor }}>
        {value.toFixed(1)}
      </div>
      {details && (
        <div className="font-mono text-[10px] text-[#505080] mt-1 space-y-0.5">
          {details.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/**
 * Technical summary row card for overall analysis.
 */
export function SummaryCard({
  title,
  signal,
  description,
  color,
}: {
  title: string;
  signal: string;
  description: string;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider">
        {title}
      </div>
      <div className="font-mono text-lg font-bold" style={{ color }}>
        {signal}
      </div>
      <div className="font-mono text-[10px] text-[#9090c0] leading-relaxed">
        {description}
      </div>
    </div>
  );
}
