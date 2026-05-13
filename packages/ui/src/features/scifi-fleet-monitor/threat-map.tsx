'use client'

import { motion } from 'framer-motion'
import type { SecurityZone, ThreatLevel } from './types'

// ─── Config ──────────────────────────────────────────────────

const THREAT_COLORS: Record<ThreatLevel, { color: string; bg: string }> = {
  low:       { color: '#00e5ff', bg: 'rgba(0,229,255,0.12)' },
  medium:    { color: '#ff6b00', bg: 'rgba(255,107,0,0.12)' },
  high:      { color: '#ff6b00', bg: 'rgba(255,107,0,0.18)' },
  critical:  { color: '#ff2244', bg: 'rgba(255,34,68,0.18)' },
}

// ─── Props ───────────────────────────────────────────────────

interface ThreatMapProps {
  zones: SecurityZone[]
  accentColor?: string
}

// ─── Component ───────────────────────────────────────────────

export function ThreatMap({ zones, accentColor = '#00e5ff' }: ThreatMapProps) {
  return (
    <div data-slot="threat-map">
      {/* SVG Map */}
      <svg viewBox="0 0 400 160" className="w-full h-auto rounded-sm mb-4"
        style={{ backgroundColor: 'rgba(5,10,30,0.6)' }}>
        {/* Water */}
        <rect x="0" y="0" width="400" height="160" fill="rgba(5,15,40,0.8)" />

        {/* Land masses */}
        <path d="M0,0 L180,0 L200,25 L180,55 L120,65 L60,60 L20,50 L0,45 Z" fill="rgba(40,35,20,0.7)" stroke="rgba(80,70,40,0.3)" strokeWidth="0.5" />
        <path d="M0,110 L40,100 L100,95 L160,90 L200,75 L240,55 L300,75 L360,85 L400,95 L400,160 L0,160 Z" fill="rgba(40,35,20,0.7)" stroke="rgba(80,70,40,0.3)" strokeWidth="0.5" />

        {/* Channel */}
        <path d="M200,25 L220,60 L240,55 L260,60 L300,75" fill="none" stroke={`${accentColor}26`} strokeWidth="30" strokeLinecap="round" />
        <path d="M200,25 L220,60 L240,55 L260,60 L300,75" fill="none" stroke={`${accentColor}4d`} strokeWidth="2" strokeDasharray="6,4">
          <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite" />
        </path>

        {/* Zone markers */}
        {zones.map((zone, i) => {
          const tc = THREAT_COLORS[zone.threat]
          const cx = 170 + i * 65
          const cy = 25 + i * 22
          return (
            <g key={zone.name}>
              <circle cx={cx} cy={cy} r="16" fill={`${tc.color}1f`} stroke={`${tc.color}66`} strokeWidth="1">
                <animate attributeName="r" values="14;18;14" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r="3" fill={tc.color} />
            </g>
          )
        })}

        {/* Flow arrow */}
        <line x1="210" y1="40" x2="270" y2="65" stroke="rgba(255,107,0,0.2)" strokeWidth="1" strokeDasharray="3,3">
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Zone cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {zones.map((zone, i) => {
          const tc = THREAT_COLORS[zone.threat]
          return (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-3 rounded-sm"
              style={{ backgroundColor: tc.bg, border: `1px solid ${tc.color}30` }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-white">{zone.name}</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm"
                  style={{ backgroundColor: `${tc.color}20`, color: tc.color, border: `1px solid ${tc.color}40` }}>
                  {zone.threat.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] font-mono text-white/40 leading-relaxed">{zone.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
