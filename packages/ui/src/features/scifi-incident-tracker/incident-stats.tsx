'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { type StatItem, type RiskZone, getRiskColor, getRiskGlow, getRiskGradient } from './types';

/** Mini stat card used in the incident stats panel. */
function StatsMiniCard({ stat, index }: { stat: StatItem; index: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-3 rounded-sm"
      style={{ background: `${stat.accentColor}06`, border: `1px solid ${stat.accentColor}18` }}
    >
      <div className="text-[9px] font-mono text-[#7070a0] uppercase tracking-wider mb-1.5">{stat.label}</div>
      <div className="flex items-end gap-2">
        <span className="text-xl sm:text-2xl font-bold leading-none"
          style={{ fontFamily: 'var(--font-orbitron)', color: stat.accentColor }}>{stat.value}</span>
        {stat.trend && (
          <span className="text-[10px] font-mono font-bold mb-0.5" style={{ color: stat.trendColor }}>{stat.trend}</span>
        )}
      </div>
    </motion.div>
  );
}

/** Animated risk progress bar. */
function RiskProgressBar({ score }: { score: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });
  return (
    <div ref={ref} className="flex items-center gap-3">
      <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div className="h-full rounded-full"
          style={{ background: getRiskGradient(score), boxShadow: `0 0 8px ${getRiskGlow(score)}` }}
          initial={{ width: 0 }} animate={isInView ? { width: `${(score / 10) * 100}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} />
      </div>
      <span className="text-xs font-bold font-mono min-w-[3rem] text-right"
        style={{ fontFamily: 'var(--font-orbitron)', color: getRiskColor(score) }}>{score.toFixed(1)}</span>
    </div>
  );
}

/**
 * Sci-fi styled statistics dashboard with stat cards and risk zone assessment.
 * @example
 * ```tsx
 * <IncidentStats stats={statsData} riskZones={zones} accentColor="#00e5ff" />
 * ```
 */
export function IncidentStats({ stats, riskZones = [], accentColor = '#00e5ff' }: {
  stats: StatItem[]; riskZones?: RiskZone[]; accentColor?: string;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: `${accentColor}20 1px solid` }}>
        <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => <StatsMiniCard key={stat.label} stat={stat} index={i} />)}
        </div>
      </div>
      {riskZones.length > 0 && (
        <div className="rounded-sm p-4" style={{ background: 'rgba(5,5,16,0.6)', border: '1px solid rgba(168,85,247,0.2)' }}>
          <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase mb-3">Risk Assessment</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-[9px] font-mono text-[#505070] uppercase tracking-wider pb-2 border-b border-[#1a1a3a]">
              <span>Region</span><span>Level</span><span className="text-right">Score</span>
            </div>
            {riskZones.map((zone, i) => {
              const rc = getRiskColor(zone.score);
              return (
                <motion.div key={zone.region} initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10px' }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="py-2 border-b border-[#1a1a3a]/50 last:border-b-0"
                >
                  <div className="grid grid-cols-3 gap-4 items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: rc, boxShadow: `0 0 4px ${getRiskGlow(zone.score)}` }} />
                      <span className="text-xs font-mono text-[#c0c0d8]">{zone.region}</span>
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block w-fit"
                      style={{ backgroundColor: `${rc}15`, border: `1px solid ${rc}40`, color: rc }}>{zone.level}</span>
                    <div className="col-span-3 mt-1"><RiskProgressBar score={zone.score} /></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
