'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { type TrendPoint } from './types';

/** SVG-based trend line chart with animated draw-in and glow effects.
 * @example `<TrendChart data={monthlyTrend} accentColor="#00e5ff" />` */
export function TrendChart({
  data,
  accentColor = '#00e5ff',
}: {
  data: TrendPoint[];
  accentColor?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const w = 600, h = 260, pad = { top: 25, right: 20, bottom: 40, left: 40 };
  const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom;
  const values = data.map((d) => d.value);
  const minVal = Math.min(...values) - 2, maxVal = Math.max(...values) + 2, range = maxVal - minVal;

  const toX = (i: number) => pad.left + (i / (data.length - 1)) * cw;
  const toY = (v: number) => pad.top + ch - ((v - minVal) / range) * ch;
  const linePoints = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');

  return (
    <div ref={sectionRef}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="trendGradFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.25" />
            <stop offset="60%" stopColor={accentColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="trendGradLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="1" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
          </linearGradient>
          <filter id="trendGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {values.map((_v, i) => {
          const y = toY(values[i]);
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y}
                stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </g>
          );
        })}

        {/* Area fill */}
        <motion.polygon
          points={`${pad.left},${pad.top + ch} ${linePoints} ${toX(data.length - 1)},${pad.top + ch}`}
          fill="url(#trendGradFill)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Line */}
        <motion.polyline
          points={linePoints}
          fill="none"
          stroke="url(#trendGradLine)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#trendGlow)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = toX(i);
          const y = toY(d.value);
          const isLast = i === data.length - 1;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
            >
              {isLast && (
                <circle cx={x} cy={y} r="8" fill="none" stroke={accentColor} strokeWidth="0.5" opacity="0.3" />
              )}
              <circle cx={x} cy={y} r={isLast ? 4 : 2.5} fill={isLast ? accentColor : accentColor} stroke="#050510" strokeWidth="1.5" />
              {isLast && (
                <text x={x} y={y - 12} textAnchor="middle" fill={accentColor} fontSize="8" fontFamily="monospace" fontWeight="bold">
                  {d.value.toFixed(1)}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text key={i} x={toX(i)} y={h - 10} textAnchor="middle" fill="#505080" fontSize="7" fontFamily="monospace">
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/**
 * Mini sparkline (SVG dots + line) for product cards.
 */
export function MiniSparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  const color = isPositive ? '#22c55e' : '#ff2244';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => ({ x: 4 + i * 10, y: 18 - ((v - min) / range) * 14 }));

  return (
    <svg width="26" height="22" viewBox="0 0 26 22" className="flex-shrink-0">
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === data.length - 1 ? 2.5 : 1.5}
          fill={color} opacity={i === data.length - 1 ? 1 : 0.5}
        />
      ))}
    </svg>
  );
}
