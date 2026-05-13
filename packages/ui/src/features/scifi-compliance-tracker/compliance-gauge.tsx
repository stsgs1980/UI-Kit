'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Animated SVG arc gauge showing compliance rate.
 *
 * @example
 * ```tsx
 * <ComplianceGauge complianceRate={61} accentColor="#00e5ff" />
 * ```
 */
export function ComplianceGauge({
  complianceRate,
  accentColor = '#00e5ff',
}: {
  complianceRate: number;
  accentColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimated(complianceRate * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [complianceRate, isInView]);

  const radius = 70;
  const strokeWidth = 8;
  const safeRadius = radius - strokeWidth;
  const circumference = 2 * Math.PI * safeRadius;
  const gaugeColor = complianceRate < 50 ? '#ff2244'
    : complianceRate < 70 ? '#f97316' : '#eab308';

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36 sm:w-44 sm:h-44">
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <circle
            cx="80" cy="80" r={safeRadius}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth}
          />
          <motion.circle
            cx="80" cy="80" r={safeRadius}
            fill="none" stroke={gaugeColor} strokeWidth={strokeWidth}
            strokeLinecap="round" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView
              ? { strokeDashoffset: circumference * (1 - animated / 100) }
              : {}}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${gaugeColor})` }}
          />
          <motion.circle
            cx="80" cy="80" r={safeRadius - 12}
            fill="none" stroke={gaugeColor} strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.2 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl sm:text-3xl font-bold font-mono"
            style={{ color: gaugeColor, fontFamily: 'var(--font-orbitron)' }}
          >
            {Math.round(animated)}%
          </span>
          <span className="text-[9px] sm:text-xs font-mono text-[#7070a0] mt-0.5">
            AVERAGE
          </span>
        </div>
      </div>
      <p className="text-[10px] font-mono text-[#7070a0] text-center max-w-[200px] leading-relaxed">
        Average compliance rate across all monitored regimes
      </p>
    </div>
  );
}
