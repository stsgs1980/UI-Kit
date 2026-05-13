'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { type CurvePoint } from './types';

/**
 * Canvas-based futures curve chart with hover tooltip and animated draw-in.
 *
 * @example
 * ```tsx
 * <FuturesCurveChart data={curveData} accentColor="#00e5ff" />
 * ```
 */
export function FuturesCurveChart({
  data,
  spotPrice,
  accentColor = '#00e5ff',
}: {
  data: CurvePoint[];
  spotPrice?: number;
  accentColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [hoverIdx, setHoverIdx] = useState(-1);

  const draw = useCallback(() => {
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

    const prices = data.map((d) => d.value);
    const minP = Math.min(...prices) - 1;
    const maxP = Math.max(...prices) + 1;

    // Grid
    ctx.strokeStyle = `${accentColor}0f`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
      const lbl = (maxP - ((maxP - minP) * i / 4)).toFixed(1);
      ctx.fillStyle = '#505080'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
      ctx.fillText(lbl, pad.l - 6, y + 3);
    }

    // Spot line
    if (spotPrice !== undefined) {
      const spotY = pad.t + (1 - (spotPrice - minP) / (maxP - minP)) * ch;
      ctx.strokeStyle = 'rgba(255,34,68,0.4)'; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, spotY); ctx.lineTo(w - pad.r, spotY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ff2244'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
      ctx.fillText(`SPOT ${spotPrice}`, w - pad.r - 80, spotY - 4);
    }

    // Points
    const points = data.map((d, i) => ({
      x: pad.l + (i / (data.length - 1)) * cw,
      y: pad.t + (1 - (d.value - minP) / (maxP - minP)) * ch,
    }));

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
    grad.addColorStop(0, `${accentColor}26`);
    grad.addColorStop(1, `${accentColor}00`);
    ctx.beginPath(); ctx.moveTo(points[0].x, h - pad.b);
    points.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, h - pad.b); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    // Line
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
    points.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = accentColor; ctx.lineWidth = 2;
    ctx.shadowColor = accentColor; ctx.shadowBlur = 8; ctx.stroke(); ctx.shadowBlur = 0;

    // Dots
    points.forEach((p, i) => {
      const isHover = i === hoverIdx;
      ctx.beginPath(); ctx.arc(p.x, p.y, isHover ? 5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = isHover ? '#ffffff' : accentColor; ctx.fill();
      if (isHover) { ctx.strokeStyle = accentColor; ctx.lineWidth = 2; ctx.stroke(); }
    });

    // X labels
    ctx.fillStyle = '#505080'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    data.forEach((d, i) => {
      ctx.fillText(d.label, pad.l + (i / (data.length - 1)) * cw, h - pad.b + 16);
    });

    // Hover tooltip
    if (hoverIdx >= 0 && hoverIdx < data.length) {
      const d = data[hoverIdx];
      const p = points[hoverIdx];
      const text = `${d.label}: ${d.value.toFixed(2)}`;
      ctx.font = 'bold 11px monospace';
      const tw = ctx.measureText(text).width + 16;
      const tx = Math.min(Math.max(p.x - tw / 2, 5), w - tw - 5);
      const ty = p.y - 28;
      ctx.fillStyle = 'rgba(5,5,16,0.9)'; ctx.strokeStyle = `${accentColor}66`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(tx, ty, tw, 22, 3); ctx.fill(); ctx.stroke();
      ctx.fillStyle = accentColor; ctx.textAlign = 'center';
      ctx.fillText(text, tx + tw / 2, ty + 15);
    }
  }, [data, hoverIdx, spotPrice, accentColor]);

  useEffect(() => { draw(); }, [draw, isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-[280px] sm:h-[320px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const padL = 50;
          const cw = rect.width - padL - 15;
          const idx = Math.round(((x - padL) / cw) * (data.length - 1));
          setHoverIdx(idx >= 0 && idx < data.length ? idx : -1);
        }}
        onMouseLeave={() => setHoverIdx(-1)}
      />
    </div>
  );
}
