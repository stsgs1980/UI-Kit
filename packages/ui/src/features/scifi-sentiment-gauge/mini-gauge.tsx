'use client'

import { forwardRef, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { SentimentIndicator } from './types'

/**
 * Mini gauge card with arc, icon, change badge, and sparkline.
 *
 * @example
 * ```tsx
 * <MiniGaugeCard
 *   indicator={{ id: '1', name: 'Investor', value: 68, change: 4.2, color: '#00e5ff' }}
 *   index={0}
 * />
 * ```
 */
export const MiniGaugeCard = forwardRef<HTMLDivElement, {
  indicator: SentimentIndicator
  index: number
  accentColor?: string
  className?: string
}>(({ indicator, index, accentColor = '#00e5ff', className }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(innerRef, { once: true, margin: '-20px' })
  const color = indicator.color ?? accentColor

  const cx = 50, cy = 50, radius = 38, strokeWidth = 6
  const startAngle = 135, totalAngle = 270
  const endAngle = startAngle + (indicator.value / 100) * totalAngle
  const bgEndRad = ((startAngle + totalAngle) * Math.PI) / 180
  const bgStartRad = (startAngle * Math.PI) / 180
  const valueEndRad = (endAngle * Math.PI) / 180
  const largeArc = (indicator.value / 100) * totalAngle > 180 ? 1 : 0

  const changeColor = indicator.change >= 0 ? '#22c55e' : '#ff2244'
  const changeSign = indicator.change >= 0 ? '+' : ''

  const sparkData = useMemo(() => {
    const base = [35, 42, 38, 45, 50, 47, 52, 48, 55, 60, 57, 63, 58]
    return base.map((v, i) => v + ((index * 7 + i * 3) % 15) - 7)
  }, [index])

  const sparkMin = Math.min(...sparkData)
  const sparkMax = Math.max(...sparkData)
  const sparkRange = sparkMax - sparkMin || 1
  const sparkPoints = sparkData.map((v, i) => `${(i / (sparkData.length - 1)) * 100},${20 - ((v - sparkMin) / sparkRange) * 18}`).join(' ')

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn('bg-white/[0.02] border border-white/[0.05] rounded-sm p-3 sm:p-4', className)}
      data-slot="mini-gauge-card"
    >
      <div className="flex items-start gap-3">
        {/* Mini gauge SVG */}
        <div className="w-20 h-20 shrink-0" ref={innerRef}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d={`M ${cx + radius * Math.cos(bgStartRad)} ${cy + radius * Math.sin(bgStartRad)} A ${radius} ${radius} 0 1 1 ${cx + radius * Math.cos(bgEndRad)} ${cy + radius * Math.sin(bgEndRad)}`}
              fill="none" stroke="rgba(30,30,50,0.8)" strokeWidth={strokeWidth} strokeLinecap="round" />
            {isInView && (
              <motion.path
                d={`M ${cx + radius * Math.cos(bgStartRad)} ${cy + radius * Math.sin(bgStartRad)} A ${radius} ${radius} ${largeArc} 1 1 ${cx + radius * Math.cos(valueEndRad)} ${cy + radius * Math.sin(valueEndRad)}`}
                fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.08 }}
                style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
              />
            )}
            <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="monospace">
              {indicator.value}
            </text>
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {indicator.icon && (
              <div className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0" style={{
                backgroundColor: `${color}15`, border: `1px solid ${color}30`, color,
              }}>
                {indicator.icon}
              </div>
            )}
            <span className="font-mono text-xs sm:text-sm text-[#c0c0e0] truncate">{indicator.name}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded-sm" style={{
              color: changeColor, backgroundColor: `${changeColor}15`, border: `1px solid ${changeColor}30`,
            }}>
              {changeSign}{indicator.change}%
            </span>
            <span className="font-mono text-[9px] text-[#505080]">30d</span>
          </div>

          {/* Mini sparkline */}
          <svg viewBox="0 0 100 22" className="w-full h-5 mt-2 opacity-60">
            <motion.path d={`M ${sparkPoints}`} fill="none" stroke={color} strokeWidth="1.2"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }} />
          </svg>
        </div>
      </div>
    </motion.div>
  )
})
MiniGaugeCard.displayName = 'MiniGaugeCard'
