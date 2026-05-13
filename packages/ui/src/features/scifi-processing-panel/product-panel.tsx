'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { type ProductData, type UtilData, getUtilColor, getUtilLabel } from './types';
import { MiniSparkline } from './processing-charts';

/** Product panel showing output product prices with sparklines. */
export function ProductPanel({ products, accentColor = '#ff6b00' }: {
  products: ProductData[]; accentColor?: string;
}) {
  return (
    <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: `${accentColor}20 1px solid` }}>
      <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">Output Products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {products.map((item, i) => {
          const isPos = item.change >= 0;
          const cc = isPos ? '#22c55e' : '#ff2244';
          return (
            <motion.div key={item.name} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
              className="p-3 rounded-sm bg-white/[0.015] border border-white/5 hover:border-white/10 transition-colors flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-mono text-[#c0c0e0] leading-tight">{item.name}</span>
                <MiniSparkline data={item.sparkline} isPositive={isPos} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-bold font-mono"
                  style={{ color: '#e0e0f0', fontFamily: 'var(--font-jetbrains)' }}>
                  {item.price >= 100 ? `$${Math.round(item.price)}` : `$${item.price.toFixed(2)}`}
                </span>
                <span className="text-[9px] font-mono text-[#505080]">{item.unit}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm self-start"
                style={{ backgroundColor: isPos ? 'rgba(34,197,94,0.08)' : 'rgba(255,34,68,0.08)', border: `1px solid ${isPos ? 'rgba(34,197,94,0.25)' : 'rgba(255,34,68,0.25)'}` }}
              >
                <span className="text-[10px] font-bold font-mono" style={{ color: cc }}>{isPos ? '+' : ''}{item.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Utilization panel with animated progress bars and zone markers. */
export function UtilizationPanel({ utilization, accentColor = '#00e5ff' }: {
  utilization: UtilData[]; accentColor?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const avgUtil = utilization.reduce((s, r) => s + r.utilization, 0) / utilization.length;

  return (
    <div ref={sectionRef} className="rounded-sm p-4"
      style={{ background: 'rgba(5,5,16,0.6)', border: '1px solid rgba(168,85,247,0.2)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase">Utilization</h3>
        <span className="text-sm sm:text-base font-bold font-mono"
          style={{ color: accentColor, fontFamily: 'var(--font-jetbrains)' }}>{avgUtil.toFixed(1)}%</span>
      </div>
      <div className="space-y-4">
        {utilization.map((item, i) => {
          const uc = getUtilColor(item.utilization), isPos = item.change >= 0;
          return (
            <motion.div key={item.region} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.1 }}
              className="p-3 rounded-sm bg-white/[0.015] border border-white/5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-mono text-white font-medium">{item.region}</span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm border"
                    style={{ color: uc, borderColor: `${uc}40`, backgroundColor: `${uc}10` }}>{getUtilLabel(item.utilization)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold font-mono"
                    style={{ color: uc, fontFamily: 'var(--font-jetbrains)' }}>{item.utilization.toFixed(1)}%</span>
                  <span className={`text-[10px] font-mono ${isPos ? 'text-[#22c55e]' : 'text-[#ff2244]'}`}>
                    {isPos ? '+' : ''}{item.change.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-5 rounded-sm overflow-hidden" style={{ backgroundColor: `${uc}1a` }}>
                {[75, 85, 90].map((mark) => (
                  <div key={mark} className="absolute top-0 bottom-0"
                    style={{ left: `${mark}%`, width: '1px', backgroundColor: `${getUtilColor(mark)}4d` }} />
                ))}
                <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${item.utilization}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease: 'easeOut' }}
                  className="absolute left-0 top-0 h-full rounded-sm"
                  style={{ background: `linear-gradient(to right, ${uc}99, ${uc}55)`, boxShadow: `0 0 12px ${uc}30` }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
