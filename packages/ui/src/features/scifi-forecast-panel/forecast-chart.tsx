'use client';

import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { type ForecastModel } from './types';

/**
 * Canvas-based multi-model forecast chart with confidence bands and legend.
 *
 * @example
 * ```tsx
 * <ForecastChart models={forecastModels} accentColor="#00e5ff" />
 * ```
 */
export function ForecastChart({
  models,
  accentColor = '#00e5ff',
}: {
  models: ForecastModel[];
  accentColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    const pad = { t: 20, r: 15, b: 40, l: 50 };
    const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;

    if (models.length === 0) return;
    const allVals = models.flatMap((m) => m.values);
    const minP = Math.min(...allVals) - 5;
    const maxP = Math.max(...allVals) + 5;
    const len = models[0].values.length;

    // Grid
    ctx.strokeStyle = `${accentColor}0d`; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 6; i++) {
      const y = pad.t + (ch / 6) * i;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
      const lbl = (maxP - ((maxP - minP) * i / 6)).toFixed(0);
      ctx.fillStyle = '#505080'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText(lbl, pad.l - 6, y + 3);
    }

    // X labels (use model values length)
    const labelCount = len;
    const xForIdx = (i: number) => pad.l + (i / (labelCount - 1)) * cw;

    // Draw each model
    models.forEach((model) => {
      const pts = model.values.map((v, i) => ({
        x: xForIdx(i),
        y: pad.t + (1 - (v - minP) / (maxP - minP)) * ch,
      }));

      // Confidence band
      if (model.confidence.length > 0) {
        ctx.beginPath();
        pts.forEach((p, i) => {
          const confY = pad.t + (1 - (model.values[i] + model.confidence[i] - minP) / (maxP - minP)) * ch;
          i === 0 ? ctx.moveTo(p.x, confY) : ctx.lineTo(p.x, confY);
        });
        for (let i = pts.length - 1; i >= 0; i--) {
          const confY = pad.t + (1 - (model.values[i] - model.confidence[i] - minP) / (maxP - minP)) * ch;
          ctx.lineTo(pts[i].x, confY);
        }
        ctx.closePath();
        ctx.fillStyle = model.color + '08'; ctx.fill();
      }

      // Line
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = model.color; ctx.lineWidth = 2;
      ctx.shadowColor = model.color; ctx.shadowBlur = 6; ctx.stroke(); ctx.shadowBlur = 0;

      // End dot + label
      const last = pts[pts.length - 1];
      ctx.beginPath(); ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = model.color; ctx.fill();
      ctx.fillStyle = model.color; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'left';
      ctx.fillText(model.values[model.values.length - 1].toFixed(0), last.x + 8, last.y + 3);
    });
  }, [isInView, models, accentColor]);

  return (
    <div ref={containerRef} className="relative w-full h-[340px] sm:h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

/**
 * Legend component for forecast models.
 */
export function ForecastLegend({ models }: { models: ForecastModel[] }) {
  return (
    <div className="flex flex-wrap gap-4 mt-4 text-[10px] font-mono text-[#7070a0]">
      {models.map((m) => (
        <span key={m.name} className="flex items-center gap-1.5">
          <span className="w-4 h-[2px] inline-block" style={{ backgroundColor: m.color }} />
          <span>{m.name}</span>
          <span className="text-[#505080]">({m.values[m.values.length - 1].toFixed(0)})</span>
        </span>
      ))}
    </div>
  );
}
