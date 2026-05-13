'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { HudCard } from '../hud-card'
import type { CalendarEvent } from './types'
import { CATEGORY_COLORS, CATEGORY_LABELS, IMPORTANCE_CONFIG } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiEventCalendarProps {
  /** Events to display in the timeline */
  events: CalendarEvent[]
  /** Section title. @default 'Event Calendar' */
  title?: string
  /** Accent color. @default '#00e5ff' */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiEventCalendar -- vertical timeline with alternating event cards,
 * importance indicators, and category badges.
 *
 * @example
 * ```tsx
 * <ScifiEventCalendar
 *   events={[
 *     { id: '1', title: 'Quarterly Review', date: 'Jul 15', description: 'Q3 planning session', category: 'primary', importance: 'high' }
 *   ]}
 * />
 * ```
 */
export const ScifiEventCalendar = forwardRef<HTMLElement, ScifiEventCalendarProps>(
  ({ events, title = 'Event Calendar', accentColor = '#00e5ff', className }, ref) => {
    return (
      <section ref={ref} data-slot="scifi-event-calendar" className={cn('py-12 sm:py-16 px-4', className)}>
        <div className="max-w-5xl mx-auto">
          {title && (
            <div className="font-mono text-xs uppercase tracking-widest text-center mb-8" style={{ color: accentColor }}>
              [ {title} ]
            </div>
          )}

          <div className="relative rounded-lg p-1">
            {/* Timeline glowing line */}
            <div
              className="absolute left-[11px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px]"
              style={{
                background: `linear-gradient(to bottom, transparent, ${accentColor}20, ${accentColor}40, ${accentColor}20, transparent)`,
                boxShadow: `0 0 12px ${accentColor}30, 0 0 4px ${accentColor}20`,
              }}
            />

            <div className="flex flex-col gap-6 sm:gap-8">
              {events.map((event, index) => {
                const typeColor = CATEGORY_COLORS[event.category] ?? accentColor
                const importanceCfg = IMPORTANCE_CONFIG[event.importance] ?? IMPORTANCE_CONFIG.medium
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={`${event.date}-${event.title}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-start"
                  >
                    <div className={`flex items-center gap-3 md:gap-0 w-full md:w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Date badge (desktop) */}
                      <div className={`hidden md:flex flex-col items-center shrink-0 w-[140px] ${isEven ? 'pr-6 text-right' : 'pl-6 text-left'}`}>
                        <span className="text-sm font-bold tracking-wider" style={{ color: typeColor, textShadow: `0 0 10px ${typeColor}40`, fontFamily: 'var(--font-jetbrains)' }}>
                          {event.date}
                        </span>
                        <span className="font-mono text-[10px] text-[#505080] mt-0.5">{importanceCfg.label}</span>
                      </div>

                      {/* Importance dot */}
                      <div className="relative flex items-center justify-center shrink-0 w-6 h-6 z-10">
                        {importanceCfg.pulse && (
                          <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute w-6 h-6 rounded-full"
                            style={{ backgroundColor: `${importanceCfg.color}30`, border: `1px solid ${importanceCfg.color}40` }}
                          />
                        )}
                        <div
                          className={`w-3 h-3 rounded-full border shrink-0 ${importanceCfg.pulse ? 'animate-pulse' : ''}`}
                          style={{
                            backgroundColor: importanceCfg.pulse ? importanceCfg.color : `${importanceCfg.color}cc`,
                            borderColor: importanceCfg.color,
                            boxShadow: `0 0 8px ${importanceCfg.color}60`,
                            opacity: event.importance === 'low' ? 0.5 : 1,
                          }}
                        />
                      </div>

                      {/* Card */}
                      <div className={`flex-1 ${isEven ? 'md:pl-6' : 'md:pr-6'} pl-3`}>
                        <div className="md:hidden mb-1.5">
                          <span className="text-xs font-bold tracking-wider" style={{ color: typeColor, fontFamily: 'var(--font-jetbrains)' }}>
                            {event.date}
                          </span>
                        </div>

                        <HudCard delay={index * 0.05}>
                          <div className="flex flex-col gap-2 relative z-10">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm sm:text-base font-semibold text-[#e0e0f0] leading-tight">{event.title}</h3>
                              <span
                                className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                                style={{ color: typeColor, backgroundColor: `${typeColor}15`, border: `1px solid ${typeColor}30` }}
                              >
                                {CATEGORY_LABELS[event.category]}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#7070a0] leading-relaxed font-mono">{event.description}</p>
                            <div className="flex md:hidden items-center gap-1.5 mt-1">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${importanceCfg.pulse ? 'animate-pulse' : ''}`} style={{ backgroundColor: importanceCfg.color, boxShadow: `0 0 6px ${importanceCfg.color}50` }} />
                              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: importanceCfg.color }}>{importanceCfg.label}</span>
                            </div>
                          </div>
                        </HudCard>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Timeline end cap */}
            <div className="absolute left-[6px] md:left-1/2 md:-translate-x-[7px] -bottom-1 w-3 h-3 rounded-full border bg-[#050510]" style={{ borderColor: `${accentColor}40` }} />
          </div>
        </div>
      </section>
    )
  },
)
ScifiEventCalendar.displayName = 'ScifiEventCalendar'
