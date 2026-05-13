'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { type PricePoint, type AnalysisLevel } from './types';

/**
 * Canvas-based chart with horizontal level lines, area fill, hover crosshair, and animated draw-in.
 * @example
 * ```tsx
 * <LevelChart data={priceData} levels={fibLevels} hoverIdx={2} accentColor="#00e5ff" />
 * ```
 */
export function LevelChart({ data, levels, hoverIdx, accentColor = '#00e5ff' }: {
  data: PricePoint[]; levels: AnalysisLevel[]; hoverIdx: number | null; accentColor?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true });
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => { setAnimProgress(Math.min((now - start) / 2500, 1)); if ((now - start) / 2500 < 1) requestAnimationFrame(animate); };
    requestAnimationFrame(animate);
  }, [isInView]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    const pad = { top: 25, right: 80, bottom: 35, left: 55 };
    const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);
    const values = data.map((d) => d.value);
    const levelPrices = levels.map((l) => l.price);
    const allPrices = [...values, ...levelPrices];
    const minVal = Math.min(...allPrices) - 5, maxVal = Math.max(...allPrices) + 5;
    const yForVal = (v: number) => pad.top + ch - ((v - minVal) / (maxVal - minVal)) * ch;
    const xForIdx = (i: number) => (data.length <= 1 ? pad.left : pad.left + (cw / (data.length - 1)) * i);

    // Grid
    ctx.strokeStyle = `${accentColor}0a`; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 6; i++) {
      const y = pad.top + (ch / 6) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
      ctx.fillStyle = 'rgba(112,112,160,0.6)'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText((maxVal - ((maxVal - minVal) / 6) * i).toFixed(0), pad.left - 8, y + 3);
    }
    ctx.textAlign = 'center';
    const step = data.length <= 13 ? 2 : 6;
    for (let i = 0; i < data.length; i += step) ctx.fillText(data[i].date, xForIdx(i), h - 8);

    // Level lines
    levels.forEach((level) => {
      const y = yForVal(level.price);
      if (y < pad.top - 5 || y > h - pad.bottom + 5) return;
      ctx.strokeStyle = `${level.color}40`; ctx.lineWidth = 1; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = level.color; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'left';
      ctx.fillText(`${level.label} — ${level.price.toFixed(1)}`, w - pad.right + 5, y + 3);
    });

    const drawCount = Math.floor(data.length * animProgress);
    if (drawCount < 2) return;

    // Area + line
    const gradient = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
    gradient.addColorStop(0, `${accentColor}26`); gradient.addColorStop(0.5, `${accentColor}0d`); gradient.addColorStop(1, `${accentColor}00`);
    ctx.beginPath(); ctx.moveTo(xForIdx(0), h - pad.bottom);
    for (let i = 0; i < drawCount; i++) ctx.lineTo(xForIdx(i), yForVal(values[i]));
    ctx.lineTo(xForIdx(drawCount - 1), h - pad.bottom); ctx.closePath(); ctx.fillStyle = gradient; ctx.fill();
    ctx.beginPath(); ctx.strokeStyle = accentColor; ctx.lineWidth = 1.5; ctx.shadowColor = accentColor; ctx.shadowBlur = 8;
    for (let i = 0; i < drawCount; i++) { const x = xForIdx(i), y = yForVal(values[i]); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.stroke(); ctx.shadowBlur = 0;

    // Hover crosshair
    if (hoverIdx !== null && hoverIdx < drawCount) {
      const hx = xForIdx(hoverIdx), hy = yForVal(values[hoverIdx]);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 0.5; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(hx, pad.top); ctx.lineTo(hx, h - pad.bottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad.left, hy); ctx.lineTo(w - pad.right, hy); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.fillStyle = accentColor; ctx.shadowColor = accentColor; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0;
      const text = `${data[hoverIdx].date}: ${values[hoverIdx].toFixed(2)}`;
      ctx.font = 'bold 11px monospace'; const tw = ctx.measureText(text).width;
      const tx = Math.min(hx + 10, w - pad.right - tw - 10), ty = Math.max(hy - 15, pad.top + 20);
      ctx.fillStyle = 'rgba(5,5,16,0.9)'; ctx.strokeStyle = `${accentColor}60`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(tx - 6, ty - 12, tw + 12, 20, 3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accentColor; ctx.fillText(text, tx, ty + 2);
    }

    // Current dot
    const lastIdx = drawCount - 1;
    ctx.beginPath(); ctx.arc(xForIdx(lastIdx), yForVal(values[lastIdx]), 3, 0, Math.PI * 2);
    ctx.fillStyle = accentColor; ctx.shadowColor = accentColor; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
  }, [data, levels, animProgress, hoverIdx, accentColor]);

  return <canvas ref={ref} className="w-full" style={{ height: '350px' }} />;
}
