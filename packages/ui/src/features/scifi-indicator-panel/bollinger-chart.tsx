'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { calculateBollinger } from './calculations';

/**
 * Canvas-based Bollinger Bands chart with price line and bands.
 *
 * @example
 * ```tsx
 * <BollingerChart data={priceData} accentColor="#00e5ff" bandColor="#a855f7" />
 * ```
 */
export function BollingerChart({
  data,
  period = 20,
  stdDev = 2,
  accentColor = '#00e5ff',
  bandColor = '#a855f7',
}: {
  data: number[];
  period?: number;
  stdDev?: number;
  accentColor?: string;
  bandColor?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true });
  const [animProgress, setAnimProgress] = useState(0);
  const bollinger = calculateBollinger(data, period, stdDev);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      setAnimProgress(Math.min((now - start) / 1800, 1));
      if ((now - start) / 1800 < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    const pad = { top: 15, right: 10, bottom: 25, left: 45 };
    const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);

    const allVals = [...bollinger.upper, ...bollinger.middle, ...bollinger.lower, ...data];
    const minVal = Math.min(...allVals) - 1;
    const maxVal = Math.max(...allVals) + 1;
    const yForP = (p: number) => pad.top + ch - ((p - minVal) / (maxVal - minVal)) * ch;
    const xForIdx = (i: number) => pad.left + (cw / (data.length - 1)) * i;

    ctx.fillStyle = 'rgba(112,112,160,0.5)'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const val = maxVal - ((maxVal - minVal) / 4) * i;
      ctx.fillText(val.toFixed(0), pad.left - 5, pad.top + (ch / 4) * i + 3);
    }

    const drawCount = Math.floor(data.length * animProgress);
    if (drawCount < 2) return;

    // Band fill
    ctx.beginPath();
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForP(bollinger.upper[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    for (let i = drawCount - 1; i >= 0; i--) ctx.lineTo(xForIdx(i), yForP(bollinger.lower[i]));
    ctx.closePath(); ctx.fillStyle = `${bandColor}0f`; ctx.fill();

    // Upper + Lower band
    ctx.beginPath(); ctx.strokeStyle = `${bandColor}66`; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForP(bollinger.upper[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForP(bollinger.lower[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.setLineDash([]);

    // Middle band
    ctx.beginPath(); ctx.strokeStyle = '#ff6b0080'; ctx.lineWidth = 1;
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForP(bollinger.middle[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Price line
    ctx.beginPath(); ctx.strokeStyle = accentColor; ctx.lineWidth = 2;
    ctx.shadowColor = accentColor; ctx.shadowBlur = 6;
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForP(data[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(xForIdx(drawCount - 1), yForP(data[drawCount - 1]), 3, 0, Math.PI * 2);
    ctx.fillStyle = accentColor; ctx.shadowColor = accentColor; ctx.shadowBlur = 10; ctx.fill();
    ctx.shadowBlur = 0;
  }, [data, bollinger, animProgress, accentColor, bandColor]);

  return <canvas ref={ref} className="w-full" style={{ height: '200px' }} />;
}
