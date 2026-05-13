'use client'

import { motion } from 'framer-motion'

// ─── Props ───────────────────────────────────────────────────

interface StorageGaugeProps {
  level: number
  color: string
  label: string
}

// ─── Component ───────────────────────────────────────────────

export function StorageGauge({ level, color, label }: StorageGaugeProps) {
  const cx = 70
  const cy = 70
  const r = 55
  const circumference = 2 * Math.PI * r
  const criticalThreshold = 40
  const criticalAngle = (criticalThreshold / 100) * 360 - 90
  const criticalRad = (criticalAngle * Math.PI) / 180

  return (
    <div data-slot="storage-gauge" className="flex flex-col items-center gap-2">
      <svg width="140" height="100" viewBox="0 0 140 100">
        {/* Background arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round" transform={`rotate(135 ${cx} ${cy})`}
        />
        {/* Filled arc */}
        <motion.circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${(level / 100) * circumference * 0.75} ${circumference}`}
          strokeLinecap="round" transform={`rotate(135 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Critical threshold marker */}
        {level <= 60 && (
          <line
            x1={cx + (r - 7) * Math.cos(criticalRad)}
            y1={cy + (r - 7) * Math.sin(criticalRad)}
            x2={cx + (r + 7) * Math.cos(criticalRad)}
            y2={cy + (r + 7) * Math.sin(criticalRad)}
            stroke="#ff2244" strokeWidth="2" opacity="0.6"
          />
        )}
        {/* Center text */}
        <text x={cx} y={cy - 4} textAnchor="middle" fill={color} fontSize="20" fontFamily="monospace" fontWeight="bold">
          {level.toFixed(1)}%
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#7070a0" fontSize="9" fontFamily="monospace">
          {label}
        </text>
      </svg>
    </div>
  )
}
