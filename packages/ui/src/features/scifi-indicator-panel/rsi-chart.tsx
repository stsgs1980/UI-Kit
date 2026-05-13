'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { calculateRSI } from './calculations';

/**
 * Canvas-based RSI chart with overbought/oversold zones and animated draw-in.
 *
 * @example
 * ```tsx
 * <RSIChart data={priceData} period={14} accentColor="#a855f7" />
 * ```
 */
export function RSIChart({
  data,
  period = 14,
  accentColor = '#a855f7',
}: {
  data: number[];
  period?: number;
  accentColor?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true });
  const [animProgress, setAnimProgress] = useState(0);
  const rsiData = calculateRSI(data, period);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      setAnimProgress(Math.min((now - start) / 1500, 1));
      if ((now - start) / 1500 < 1) requestAnimationFrame(animate);
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
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    const pad = { top: 15, right: 45, bottom: 25, left: 10 };
    const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);

    const yForRSI = (rsi: number) => pad.top + ch - (rsi / 100) * ch;
    const xForIdx = (i: number) => pad.left + (cw / (rsiData.length - 1)) * i;

    ctx.fillStyle = 'rgba(255,34,68,0.04)';
    ctx.fillRect(pad.left, pad.top, cw, ch * 0.30);
    ctx.fillStyle = `${accentColor}0a`;
    ctx.fillRect(pad.left, pad.top + ch * 0.70, cw, ch * 0.30);

    [30, 50, 70].forEach((level) => {
      const y = yForRSI(level);
      ctx.strokeStyle = level === 50 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash(level === 50 ? [] : [4, 4]);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(112,112,160,0.6)';
      ctx.font = '9px monospace'; ctx.textAlign = 'left';
      ctx.fillText(level.toString(), w - pad.right + 5, y + 3);
    });

    const drawCount = Math.floor(rsiData.length * animProgress);
    if (drawCount < 2) return;
    const color = rsiData[drawCount - 1] > 70 ? '#ff2244' : rsiData[drawCount - 1] < 30 ? accentColor : accentColor;

    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.shadowColor = color; ctx.shadowBlur = 8;
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForRSI(rsiData[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(xForIdx(drawCount - 1), yForRSI(rsiData[drawCount - 1]), 3, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
  }, [rsiData, animProgress, accentColor]);

  return <canvas ref={ref} className="w-full" style={{ height: '150px' }} />;
}
