'use client'

import { motion } from 'framer-motion'
import type { ConditionMetric } from './types'

// --- Icons ---

function ConditionIcon({ type, color }: { type: string; color: string }) {
  const s = 20
  switch (type) {
    case 'thermometer':
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></svg>
    case 'wind':
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></svg>
    case 'wave':
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>
    case 'eye':
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
    case 'lightning':
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
    default:
      return null
  }
}

// --- Props ---

export interface ConditionPanelProps {
  /** Array of condition metrics */
  conditions: ConditionMetric[]
  /** Panel title */
  title?: string
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

// --- Component ---

/**
 * ConditionPanel -- grid of environmental condition metrics with icons and indicators.
 *
 * @example
 * ```tsx
 * <ConditionPanel
 *   conditions={[
 *     { id: 'temp', label: 'Temperature', value: '28.7C', trend: '+0.3', trendColor: '#ff6b00', icon: 'thermometer' },
 *   ]}
 *   title="Current Conditions"
 * />
 * ```
 */
export function ConditionPanel({ conditions, title = 'Current Conditions', accentColor = '#00e5ff' }: ConditionPanelProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4" data-slot="condition-panel">
      {conditions.map((metric, i) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="p-3 rounded-sm"
          style={{ background: `${accentColor}0A`, border: `1px solid ${accentColor}1A` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <ConditionIcon type={metric.icon} color={accentColor} />
            <span className="text-[10px] font-mono text-[#7070a0] uppercase tracking-wider leading-tight">
              {metric.label}
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: accentColor }}>
            {metric.value}
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-mono font-bold" style={{ color: metric.trendColor }}>
              {metric.trend}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
