'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { calculateMACD } from './calculations';

/**
 * Canvas-based MACD chart with histogram bars, MACD line, and signal line.
 *
 * @example
 * ```tsx
 * <MACDChart data={priceData} accentColor="#00e5ff" signalColor="#ff6b00" />
 * ```
 */
export function MACDChart({
  data,
  accentColor = '#00e5ff',
  signalColor = '#ff6b00',
}: {
  data: number[];
  accentColor?: string;
  signalColor?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true });
  const [animProgress, setAnimProgress] = useState(0);
  const { macd: macdData, signal: signalData, histogram: histData } = calculateMACD(data);

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
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    const pad = { top: 15, right: 10, bottom: 25, left: 10 };
    const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom;
    ctx.clearRect(0, 0, w, h);

    const allValues = [...macdData, ...signalData, ...histData];
    const maxAbs = Math.max(...allValues.map(Math.abs), 0.1);
    const yForVal = (v: number) => pad.top + ch / 2 - (v / maxAbs) * (ch / 2);
    const xForIdx = (i: number) => pad.left + (cw / (histData.length - 1)) * i;

    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad.left, yForVal(0)); ctx.lineTo(w - pad.right, yForVal(0)); ctx.stroke();

    const drawCount = Math.floor(histData.length * animProgress);
    if (drawCount < 2) return;

    const barW = Math.max((cw / histData.length) * 0.6, 2);
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i) - barW / 2;
      const barH = Math.abs(histData[i] / maxAbs) * (ch / 2);
      const y = histData[i] >= 0 ? yForVal(histData[i]) : yForVal(0);
      const grad = ctx.createLinearGradient(x, y, x, y + barH);
      if (histData[i] >= 0) {
        grad.addColorStop(0, `${accentColor}99`);
        grad.addColorStop(1, `${accentColor}1a`);
      } else {
        grad.addColorStop(0, '#ff22441a');
        grad.addColorStop(1, '#ff224499');
      }
      ctx.fillStyle = grad; ctx.fillRect(x, y, barW, barH);
    }

    ctx.beginPath(); ctx.strokeStyle = accentColor; ctx.lineWidth = 1.5;
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForVal(macdData[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.beginPath(); ctx.strokeStyle = signalColor; ctx.lineWidth = 1.5;
    for (let i = 0; i < drawCount; i++) {
      const x = xForIdx(i), y = yForVal(signalData[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }, [histData, macdData, signalData, animProgress, accentColor, signalColor]);

  return <canvas ref={ref} className="w-full" style={{ height: '150px' }} />;
}
