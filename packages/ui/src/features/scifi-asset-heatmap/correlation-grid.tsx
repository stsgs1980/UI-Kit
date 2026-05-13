'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { Asset } from './types'
import { getCorrelationColor, getCorrelationBorder, getInterpretation } from './types'

/**
 * NxN correlation matrix grid with hover highlighting and tooltips.
 *
 * @example
 * ```tsx
 * <CorrelationGrid
 *   assets={[{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }]}
 *   matrix={[[1, 0.5], [0.5, 1]]}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export function CorrelationGrid({
  assets,
  matrix,
  accentColor = '#00e5ff',
  className,
}: {
  assets: Asset[]
  matrix: number[][]
  accentColor?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)
  const [tooltip, setTooltip] = useState({ text: '', visible: false, x: 0, y: 0 })

  return (
    <div ref={ref} className={cn('min-w-[480px]', className)} data-slot="correlation-grid">
      {/* Header row */}
      <div className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: `80px repeat(${assets.length}, 1fr)` }}>
        <div className="text-[10px] text-[#7070a0] font-mono" />
        {assets.map((a) => (
          <div key={a.id} className="text-[9px] sm:text-[10px] text-[#7070a0] font-mono text-center truncate px-1">
            {a.shortLabel ?? a.label}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {matrix.map((row, ri) => (
        <div key={ri} className="grid gap-[2px] mb-[2px]" style={{ gridTemplateColumns: `80px repeat(${assets.length}, 1fr)` }}>
          <div className="text-[9px] sm:text-[10px] text-[#7070a0] font-mono flex items-center pr-1 truncate">
            {assets[ri].shortLabel ?? assets[ri].label}
          </div>

          {row.map((val, ci) => {
            const isHovered = hoveredCell?.row === ri || hoveredCell?.col === ci
            const isDiagonal = ri === ci
            return (
              <motion.div
                key={ci}
                whileHover={{ scale: 1.08 }}
                onMouseEnter={(e) => {
                  setHoveredCell({ row: ri, col: ci })
                  setTooltip({
                    text: `${assets[ri].label} / ${assets[ci].label}: ${val >= 0 ? '+' : ''}${val.toFixed(2)}\n${getInterpretation(val, assets[ri].label, assets[ci].label)}`,
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                  })
                }}
                onMouseMove={(e) => {
                  if (tooltip.visible) setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))
                }}
                onMouseLeave={() => {
                  setHoveredCell(null)
                  setTooltip((prev) => ({ ...prev, visible: false }))
                }}
                className={cn(
                  'relative flex items-center justify-center rounded-[2px] cursor-default transition-all duration-200',
                  isHovered && !isDiagonal && 'ring-1 ring-white/30 z-10',
                  isDiagonal && 'ring-1 ring-white/10',
                )}
                style={{
                  backgroundColor: getCorrelationColor(val),
                  border: `1px solid ${getCorrelationBorder(val)}`,
                  height: 44,
                  minHeight: 44,
                }}
              >
                <span className={`text-[11px] sm:text-xs font-mono font-bold ${isDiagonal ? 'text-white/60' : 'text-white'}`}>
                  {val.toFixed(2)}
                </span>
              </motion.div>
            )
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-[9px] font-mono text-[#7070a0]">
        {[
          { label: '+0.7 ... +1.0', bg: 'rgba(220, 38, 38, 0.75)' },
          { label: '+0.3 ... +0.7', bg: 'rgba(248, 113, 113, 0.55)' },
          { label: '-0.3 ... +0.3', bg: 'rgba(100, 100, 130, 0.35)' },
          { label: '-0.7 ... -0.3', bg: 'rgba(96, 165, 250, 0.55)' },
          { label: '-1.0 ... -0.7', bg: 'rgba(37, 99, 235, 0.75)' },
        ].map((seg) => (
          <div key={seg.label} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-[1px]" style={{ backgroundColor: seg.bg }} />
            <span>{seg.label}</span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed z-50 px-3 py-2 rounded-sm text-xs font-mono max-w-[280px] leading-relaxed pointer-events-none whitespace-pre-line"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 8,
            backgroundColor: 'rgba(10, 10, 30, 0.95)',
            border: `1px solid ${accentColor}66`,
            color: '#c0c0e0',
            boxShadow: `0 0 20px ${accentColor}25`,
          }}
        >
          {tooltip.text}
        </motion.div>
      )}
    </div>
  )
}
