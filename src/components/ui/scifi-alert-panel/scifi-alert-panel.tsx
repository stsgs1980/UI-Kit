'use client'

import { forwardRef, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { HudCard } from '../hud-card'
import { AlertRow } from './alert-row'
import type { AlertItem, AlertCategoryType, AlertCategoryConfig, SeverityLevel } from './alert-types'
import { SEVERITY_CONFIG, DEFAULT_CATEGORY_CONFIG, buildActiveState, SEVERITY_ORDER } from './alert-types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiAlertPanelProps {
  /** Array of alert items to display */
  alerts: AlertItem[]
  /** Category configurations keyed by type */
  categories?: Record<AlertCategoryType, AlertCategoryConfig>
  /** Accent color (default '#00e5ff') */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiAlertPanel — configurable alert monitoring panel.
 *
 * Displays alerts grouped by category with toggle switches,
 * severity breakdown, active count, and progress bar.
 *
 * @example
 * ```tsx
 * <ScifiAlertPanel
 *   alerts={myAlerts}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const ScifiAlertPanel = forwardRef<HTMLElement, ScifiAlertPanelProps>(
  ({ alerts, categories = DEFAULT_CATEGORY_CONFIG, accentColor = '#00e5ff', className }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    const [activeStates, setActiveStates] = useState<Record<string, boolean>>(() => buildActiveState(alerts))

    const toggleAlert = (id: string | number) => setActiveStates(prev => ({ ...prev, [String(id)]: !prev[String(id)] }))

    const activeCount = useMemo(() => Object.values(activeStates).filter(Boolean).length, [activeStates])
    const totalCount = alerts.length
    const catKeys = Object.keys(categories) as AlertCategoryType[]

    return (
      <section ref={(ref as React.RefObject<HTMLElement>) ?? sectionRef} data-slot="scifi-alert-panel"
        className={cn('relative py-12 sm:py-16 md:py-20 px-4', className)}>
        <div className="max-w-7xl mx-auto">
          {/* Summary */}
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }} className="mb-6 sm:mb-8">
            <HudCard accentColor={accentColor}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider">Active Alerts</div>
                  <div className="flex items-baseline gap-2">
                    <motion.span key={activeCount} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="text-xl sm:text-2xl font-bold" style={{ color: accentColor }}>{activeCount}</motion.span>
                    <span className="font-mono text-xs text-[#505080]">/ {totalCount}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                  {SEVERITY_ORDER.map(sev => {
                    const count = alerts.filter(a => a.severity === sev && activeStates[String(a.id)]).length
                    if (count === 0) return null
                    const cfg = SEVERITY_CONFIG[sev]
                    return (
                      <div key={sev} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: cfg.color, boxShadow: `0 0 4px ${cfg.color}60` }} />
                        <span className="font-mono text-[10px]" style={{ color: cfg.color }}>{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full overflow-hidden bg-[rgba(0,0,0,0.4)]">
                <motion.div className="h-full rounded-full"
                  animate={{ width: `${totalCount > 0 ? (activeCount / totalCount) * 100 : 0}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ background: `linear-gradient(90deg, ${accentColor}, #a855f7, #ff2244)`, boxShadow: `0 0 8px ${accentColor}4D` }} />
              </div>
            </HudCard>
          </motion.div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {catKeys.map((cat, catIdx) => {
              const config = categories[cat]
              const catAlerts = alerts.filter(a => a.category === cat)
              const catActiveCount = catAlerts.filter(a => activeStates[String(a.id)]).length
              return (
                <motion.div key={cat} initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: catIdx * 0.12 }} className="rounded-sm">
                  <HudCard accentColor={config.color === '#ff2244' ? 'orange' : config.color === '#a855f7' ? 'purple' : 'cyan'}
                    title={config.name}>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b"
                      style={{ borderColor: `${config.color}15` }}>
                      <span className="font-mono text-xs text-[#7070a0]">{catActiveCount}/{catAlerts.length} active</span>
                    </div>
                    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                      {catAlerts.map((alert, i) => (
                        <AlertRow key={String(alert.id)} alert={alert}
                          active={activeStates[String(alert.id)]}
                          onToggle={() => toggleAlert(alert.id)} index={i}
                          categoryColor={config.color} />
                      ))}
                    </div>
                  </HudCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    )
  },
)
ScifiAlertPanel.displayName = 'ScifiAlertPanel'
