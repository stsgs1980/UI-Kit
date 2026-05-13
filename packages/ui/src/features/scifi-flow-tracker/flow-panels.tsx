'use client'

import { motion } from 'framer-motion'
import type { PipelineFlow, TradeEntry } from './types'

// ─── Pipeline Flows ──────────────────────────────────────────

interface PipelineFlowsProps { flows: PipelineFlow[]; accentColor?: string }

export function PipelineFlows({ flows, accentColor = '#00e5ff' }: PipelineFlowsProps) {
  return (
    <div data-slot="pipeline-flows" className="space-y-3">
      {flows.map((f, i) => {
        const pct = (f.volume / f.maxVolume) * 100
        const bc = f.direction === 'decrease' ? '#ff2244' : f.direction === 'increase' ? accentColor : '#ff6b00'
        return (
          <motion.div key={f.route} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.07 }}
            className="px-3 py-2.5 rounded-sm bg-white/[0.015] border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-mono text-white font-medium">{f.route}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm border"
                  style={{ color: f.status === 'plan' ? '#ff6b00' : accentColor,
                    borderColor: f.status === 'plan' ? 'rgba(255,107,43,0.3)' : `${accentColor}4d`,
                    backgroundColor: f.status === 'plan' ? 'rgba(255,107,43,0.08)' : `${accentColor}14` }}>
                  {f.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold font-mono" style={{ color: bc }}>{f.volume}M</span>
                <span className="text-[9px] font-mono text-white/25">m³/day</span>
                <span className="text-xs" style={{ color: bc }}>
                  {f.direction === 'increase' ? '↑' : f.direction === 'decrease' ? '↓' : '→'}
                </span>
              </div>
            </div>
            <div className="relative w-full h-3 rounded-full bg-white/[0.04] overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${bc}cc, ${bc}66)`, boxShadow: `0 0 8px ${bc}40` }} />
            </div>
            {f.warning && (
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff2244] animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-mono text-[#ff6b6b]">{f.warning}</span>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Trade Bars ──────────────────────────────────────────────

interface TradeBarsProps { exporters: TradeEntry[]; importers: TradeEntry[]; accentColor?: string }

export function TradeBars({ exporters, importers, accentColor = '#00e5ff' }: TradeBarsProps) {
  const maxVal = Math.max(...exporters.map(e => e.volume), ...importers.map(e => e.volume), 1)

  const BarGroup = ({ items, gradId, stroke, delay }: { items: TradeEntry[]; gradId: string; stroke: string; delay: number }) => (
    <>
      {items.map((item, i) => {
        const barH = (item.volume / maxVal) * 200, x = 38 + i * 52
        return (
          <g key={`${gradId}-${item.name}`}>
            <motion.rect x={x} y={220 - barH} width="20" height={barH} fill={`url(#${gradId})`} stroke={stroke} strokeWidth="0.5" rx="2"
              initial={{ height: 0, y: 220 }} whileInView={{ height: barH, y: 220 - barH }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: delay + i * 0.1, ease: 'easeOut' }} />
            <text x={x + 10} y={215 - barH} textAnchor="middle" fill={stroke} fontSize="7" fontFamily="monospace" fontWeight="bold">{item.volume}</text>
            <text x={x + 10} y={236} textAnchor="middle" fill="#7070a0" fontSize="6" fontFamily="monospace">{item.name}</text>
            <text x={x + 10} y={246} textAnchor="middle" fill={item.yoy >= 0 ? '#22c55e' : '#ff2244'} fontSize="6" fontFamily="monospace">
              {item.yoy >= 0 ? '↑' : '↓'}{Math.abs(item.yoy).toFixed(1)}%
            </text>
          </g>
        )
      })}
    </>
  )

  return (
    <div data-slot="trade-bars">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: `${accentColor}4d`, borderColor: accentColor }} />
          <span className="text-[10px] font-mono text-white/40">Export</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: 'rgba(255,107,0,0.3)', borderColor: '#ff6b00' }} />
          <span className="text-[10px] font-mono text-white/40">Import</span>
        </div>
      </div>
      <svg viewBox="0 0 300 260" className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="exportGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" /><stop offset="100%" stopColor={accentColor} stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="importGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.8" /><stop offset="100%" stopColor="#ff6b00" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {[0, 30, 60, 90, 120].map(v => {
          const y = 220 - (v / maxVal) * 200
          return <g key={v}>
            <line x1="30" y1={y} x2="290" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <text x="28" y={y + 3} textAnchor="end" fill="#505080" fontSize="7" fontFamily="monospace">{v}</text>
          </g>
        })}
        <BarGroup items={exporters} gradId="exportGrad" stroke={accentColor} delay={0.5} />
        <line x1="30" y1="225" x2="290" y2="225" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
        <BarGroup items={importers} gradId="importGrad" stroke="#ff6b00" delay={0.7} />
      </svg>
    </div>
  )
}
