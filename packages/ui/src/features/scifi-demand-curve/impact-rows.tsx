'use client'

import { motion } from 'framer-motion'
import { HudCard } from '../hud-card'
import { SEVERITY_CONFIG } from './types'
import type { CountryImpact, SectorImpact } from './types'

// --- Country Bar ---

function CountryBar({ country, index, maxReduction }: { country: CountryImpact; index: number; maxReduction: number }) {
  const sev = SEVERITY_CONFIG[country.severity]
  const barW = (country.reduction / maxReduction) * 100

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="group">
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-sm flex-shrink-0 w-5 text-center">{country.flag}</span>
        <span className="font-mono text-xs sm:text-sm text-white font-bold min-w-[80px] sm:min-w-[100px]">{country.name}</span>
        <div className="flex-1 relative">
          <div className="h-5 bg-[rgba(255,255,255,0.04)] rounded-sm overflow-hidden border border-[rgba(255,255,255,0.06)]">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${barW}%` }} viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.08 + 0.2, ease: 'easeOut' }}
              className="h-full rounded-sm relative"
              style={{ background: `linear-gradient(90deg, ${sev.color}30, ${sev.color}90)`, boxShadow: `0 0 8px ${sev.color}30` }} />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-xs sm:text-sm font-bold" style={{ color: sev.color, textShadow: `0 0 6px ${sev.color}40` }}>
            -{country.reduction.toFixed(1)}
          </span>
          <span className="font-mono text-[10px] text-[#7070a0]">units</span>
          <span className="font-mono text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-sm hidden sm:inline-block"
            style={{ color: sev.color, backgroundColor: sev.bg, border: `1px solid ${sev.border}` }}>
            -{country.percent}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// --- Sector Card ---

function SectorCard({ sector, index }: { sector: SectorImpact; index: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
      <HudCard accentColor={sector.color === '#ff2244' ? 'orange' : 'cyan'} className="h-full !p-3 sm:!p-4">
        <div className="text-center">
          <span className="text-lg sm:text-xl block mb-2">{sector.icon}</span>
          <div className="font-mono text-[10px] sm:text-xs text-[#7070a0] mb-2 truncate">{sector.name}</div>
          <div className="flex justify-center mb-2">
            <div className="w-6 h-16 sm:h-20 bg-[rgba(255,255,255,0.04)] rounded-sm overflow-hidden border border-[rgba(255,255,255,0.06)] relative">
              <motion.div initial={{ height: 0 }} whileInView={{ height: `${sector.reduction}%` }}
                viewport={{ once: true }} transition={{ duration: 1.2, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 rounded-sm"
                style={{ background: `linear-gradient(180deg, ${sector.color}, ${sector.color}40)`, boxShadow: `0 0 8px ${sector.color}30` }} />
            </div>
          </div>
          <div className="font-mono text-base sm:text-lg font-bold"
            style={{ color: sector.color, textShadow: `0 0 8px ${sector.color}40` }}>-{sector.reduction}%</div>
        </div>
      </HudCard>
    </motion.div>
  )
}

// --- Props ---

export interface ImpactRowsProps {
  /** Country/region impact entries */
  countries: CountryImpact[]
  /** Sector impact entries */
  sectors: SectorImpact[]
  /** Total reduction text */
  totalText?: string
  /** Accent color (default '#00e5ff') */
  accentColor?: string
}

/**
 * ImpactRows -- country impact bars and sector impact cards.
 *
 * @example
 * ```tsx
 * <ImpactRows
 *   countries={[{ name: 'Region A', flag: 'A', reduction: 1.8, percent: 12, severity: 'critical' }]}
 *   sectors={[{ name: 'Logistics', icon: 'T', reduction: 12, color: '#ff2244' }]}
 * />
 * ```
 */
export function ImpactRows({ countries, sectors, totalText, accentColor = '#00e5ff' }: ImpactRowsProps) {
  const maxReduction = Math.max(...countries.map(c => c.reduction), 1)

  return (
    <>
      {/* Country bars */}
      <HudCard title="Impact by Region" accentColor="#ff6b00">
        <div className="space-y-0.5">
          {countries.map((c, i) => <CountryBar key={c.name} country={c} index={i} maxReduction={maxReduction} />)}
          {totalText && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-3 pt-3 border-t border-[rgba(255,34,68,0.2)]">
              <div className="flex items-center justify-end">
                <span className="font-mono text-sm font-bold" style={{ color: '#ff2244' }}>{totalText}</span>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-3">
          {Object.entries(SEVERITY_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: cfg.color }} />
              <span className="font-mono text-[9px] text-[#7070a0]">{cfg.label}</span>
            </div>
          ))}
        </div>
      </HudCard>

      {/* Sector cards */}
      <HudCard title="Impact by Sector" accentColor="#a855f7">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {sectors.map((s, i) => <SectorCard key={s.name} sector={s} index={i} />)}
        </div>
      </HudCard>
    </>
  )
}
