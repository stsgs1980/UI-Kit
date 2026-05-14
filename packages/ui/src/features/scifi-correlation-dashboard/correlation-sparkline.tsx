'use client';

import { forwardRef, useId } from 'react';
import { cn } from '../../tokens/cn';

/**
 * Minimal inline sparkline rendered as an SVG polyline with gradient fill.
 * Designed for tight table rows where the full MiniSparkline would be too large.
 *
 * @example
 * ```tsx
 * <CorrelationSparkline data={[1, 3, 2, 5, 4]} color="#22c55e" />
 * ```
 */
export interface CorrelationSparklineProps {
  /** Numeric data points to plot. */
  data: number[];
  /** Stroke & gradient fill color. */
  color: string;
  /** SVG width in pixels. @default 72 */
  width?: number;
  /** SVG height in pixels. @default 24 */
  height?: number;
}

export const CorrelationSparkline = forwardRef<SVGSVGElement, CorrelationSparklineProps>(
  function CorrelationSparkline({ data, color, width = 72, height = 24 }, ref) {
    const uid = useId();
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
      })
      .join(' ');

    const lastX = width;
    const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
    const gradId = `spark-grad-${color.replace('#', '')}-${uid}`;

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        className="flex-shrink-0"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${height} ${points} ${lastX},${height}`}
          fill={`url(#${gradId})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <circle cx={lastX} cy={lastY} r="2" fill={color} />
        <circle cx={lastX} cy={lastY} r="4" fill={color} opacity="0.2" />
      </svg>
    );
  },
);
