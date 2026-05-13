'use client'

import { forwardRef, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiSectionHeader } from '../scifi-section-header'
import { HudCard } from '../hud-card'
import { HorizontalThreatGauge } from './threat-gauge'
import type { NewsItem, NewsSeverity, TrendingTopic } from './types'
import { SEVERITY_COLORS } from './types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiNewsFeedProps {
  /** News items to display */
  newsItems: NewsItem[]
  /** Trending topics for the sidebar */
  trending: TrendingTopic[]
  /** Ticker messages for the scrolling bar */
  tickerMessages?: string[]
  /** Threat level 0-10 (default 0, hides gauge if 0) */
  threatLevel?: number
  /** Accent color (default '#00e5ff') */
  accentColor?: string
  /** Category color mapping */
  categoryColors?: Record<string, string>
  /** Section header configuration */
  label?: string
  title?: string
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Sub-components ───────────────────────────────────────────

function NewsTicker({ messages, accentColor }: { messages: string[]; accentColor: string }) {
  return (
    <div className="relative overflow-hidden w-full h-8 mb-6 rounded-sm border" style={{ borderColor: `${accentColor}30` }}>
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#050510] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#050510] to-transparent z-10" />
      <div className="flex items-center h-full whitespace-nowrap" style={{ animation: 'tickerScroll 45s linear infinite' }}>
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="font-mono text-xs tracking-wider mx-6" style={{ color: `${accentColor}CC` }}>◆ {msg}</span>
        ))}
      </div>
      <style>{`@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

function NewsFeedItem({ item, index, catColors }: { item: NewsItem; index: number; catColors: Record<string, string> }) {
  const r = useRef<HTMLDivElement>(null)
  const inView = useInView(r, { once: true, margin: '-20px' })
  const catColor = catColors[item.category] ?? '#00e5ff'
  const sevColor = SEVERITY_COLORS[item.severity]

  return (
    <motion.div ref={r} initial={{ opacity: 0 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }} whileHover={{ scale: 1.01, x: 4 }}
      className="group relative p-3 sm:p-4 rounded-sm border transition-all duration-300 cursor-pointer"
      style={{ backgroundColor: 'rgba(10,10,30,0.5)', borderColor: `${catColor}15` }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${catColor}40`; e.currentTarget.style.backgroundColor = 'rgba(10,10,30,0.8)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${catColor}15`; e.currentTarget.style.backgroundColor = 'rgba(10,10,30,0.5)' }}>
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: sevColor, boxShadow: `0 0 6px ${sevColor}` }} />
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm"
          style={{ color: catColor, backgroundColor: `${catColor}15`, border: `1px solid ${catColor}30` }}>{item.category}</span>
        <span className="font-mono text-[10px] sm:text-xs text-[#7070a0]">{item.time} · {item.date}</span>
      </div>
      <p className="text-sm sm:text-[15px] leading-relaxed text-[#c0c0e0] group-hover:text-white transition-colors pr-6">{item.headline}</p>
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${catColor}, transparent)` }} />
    </motion.div>
  )
}

function TrendingSidebar({ topics }: { topics: TrendingTopic[] }) {
  const r = useRef<HTMLDivElement>(null)
  const inView = useInView(r, { once: true, margin: '-30px' })
  return (
    <div ref={r} className="space-y-3">
      {topics.map((topic, i) => (
        <motion.div key={topic.label} initial={{ opacity: 0 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.08 }} className="group cursor-pointer">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs text-[#c0c0e0] group-hover:text-[#00e5ff] transition-colors truncate">{topic.label}</span>
            <span className="font-mono text-[10px] text-[#7070a0] ml-2 shrink-0">{topic.value}%</span>
          </div>
          <div className="h-1.5 bg-[rgba(0,229,255,0.06)] rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={inView ? { width: `${topic.value}%` } : {}}
              transition={{ duration: 0.8, delay: i * 0.08 + 0.2, ease: 'easeOut' }} className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, #00e5ff, ${topic.value > 70 ? '#ff6b00' : '#a855f7'})`,
                boxShadow: topic.value > 70 ? '0 0 8px rgba(255,107,0,0.4)' : '0 0 8px rgba(0,229,255,0.3)' }} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────

/**
 * ScifiNewsFeed — news/intelligence feed with ticker, sidebar, and threat gauge.
 *
 * @example
 * ```tsx
 * <ScifiNewsFeed newsItems={items} trending={topics} tickerMessages={['ALERT: System online']} />
 * ```
 */
export const ScifiNewsFeed = forwardRef<HTMLElement, ScifiNewsFeedProps>(
  ({ newsItems, trending, tickerMessages = [], threatLevel = 0, accentColor = '#00e5ff', categoryColors = {},
    label = '[ Intelligence Feed ]', title = 'Intelligence Feed', subtitle = 'Real-time event monitoring and risk analysis', className }, ref) => {
    return (
      <section ref={(ref as React.RefObject<HTMLElement>)} data-slot="scifi-news-feed"
        className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16 sm:py-20', className)}>
        <div className="relative z-10">
          <ScifiSectionHeader label={label} title={title} subtitle={subtitle} />
          {tickerMessages.length > 0 && <NewsTicker messages={tickerMessages} accentColor={accentColor} />}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-2">
              <HudCard title="Event Feed" accentColor="cyan">
                <div className="space-y-2 sm:space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {newsItems.map((item, i) => <NewsFeedItem key={String(item.id)} item={item} index={i} catColors={categoryColors} />)}
                </div>
              </HudCard>
            </div>
            <div className="lg:col-span-1">
              <HudCard title="Trending Topics" accentColor="purple" className="h-full">
                <div className="space-y-1 mb-4 pb-4 border-b border-[rgba(168,85,247,0.15)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#a855f7', boxShadow: '0 0 6px #a855f7' }} />
                    <span className="font-mono text-[10px] text-[#a855f7] uppercase tracking-wider">24h Trend</span>
                  </div>
                </div>
                <TrendingSidebar topics={trending} />
              </HudCard>
            </div>
          </div>
          {threatLevel > 0 && <HorizontalThreatGauge value={threatLevel} accentColor={accentColor} />}
        </div>
      </section>
    )
  },
)
ScifiNewsFeed.displayName = 'ScifiNewsFeed'
