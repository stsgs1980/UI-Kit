'use client'

import { forwardRef, useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { ScifiNavMobile } from './nav-mobile'
import { getAllSectionIds, getGroupForSection, getGroupLabel } from './nav-types'
import type { NavGroup } from './nav-types'

export interface ScifiNavBarProps {
  brand: string
  groups: NavGroup[]
  accentColor?: string
  showLiveIndicator?: boolean
  actions?: React.ReactNode
  className?: string
}

/**
 * ScifiNavBar -- futuristic fixed nav bar with grouped dropdowns,
 * scroll-aware background, active section tracking, and mobile drawer.
 *
 * @example
 * ```tsx
 * <ScifiNavBar brand="SYSTEM" groups={[{ id: 'ov', label: 'Overview', sections: [{ id: 'hero', label: 'Home' }] }]} />
 * ```
 */
export const ScifiNavBar = forwardRef<HTMLElement, ScifiNavBarProps>(
  ({ brand, groups, accentColor = '#00e5ff', showLiveIndicator = true, actions, className }, ref) => {
    const [ui, setUi] = useState({ scrolled: false, mobileOpen: false })
    const [activeSection, setActiveSection] = useState(groups[0]?.sections[0]?.id ?? '')
    const [desktopHovered, setDesktopHovered] = useState<string | null>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const allIds = getAllSectionIds(groups)

    useEffect(() => {
      const observers: IntersectionObserver[] = []
      allIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const obs = new IntersectionObserver(
          (entries) => entries.forEach((e) => { if (e.isIntersecting && e.intersectionRatio >= 0.2) setActiveSection(id) }),
          { rootMargin: '-10% 0px -60% 0px', threshold: [0, 0.2, 0.5] },
        )
        obs.observe(el); observers.push(obs)
      })
      const onScroll = () => setUi((u) => ({ ...u, scrolled: window.scrollY > 50 }))
      window.addEventListener('scroll', onScroll)
      return () => { observers.forEach((o) => o.disconnect()); window.removeEventListener('scroll', onScroll) }
    }, [allIds])

    const scrollTo = useCallback((id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setUi((u) => ({ ...u, mobileOpen: false })) }, [])
    const handleEnter = useCallback((gId: string) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setDesktopHovered(gId) }, [])
    const handleLeave = useCallback(() => { timeoutRef.current = setTimeout(() => setDesktopHovered(null), 200) }, [])
    const activeGroupId = getGroupForSection(groups, activeSection)
    const initials = brand.slice(0, 2).toUpperCase()

    return (
      <>
        <motion.nav ref={ref} data-slot="scifi-nav-bar" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', ui.scrolled ? 'bg-[rgba(5,5,16,0.9)] backdrop-blur-md border-b border-[rgba(0,229,255,0.1)]' : '', className)}>
          <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
            <button onClick={() => scrollTo(groups[0]?.sections[0]?.id ?? '')} className="flex items-center gap-2 group" aria-label="Go to top">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 border rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" style={{ borderColor: `${accentColor}50` }} />
                <div className="absolute inset-1 border rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" style={{ borderColor: `${accentColor}30` }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] font-bold" style={{ color: accentColor }}>{initials}</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="font-mono text-xs font-bold tracking-wider" style={{ color: accentColor }}>{brand}</div>
              </div>
            </button>
            <div className="hidden lg:flex items-center gap-0.5">
              {groups.map((group) => {
                const isActive = activeGroupId === group.id
                const isDrop = desktopHovered === group.id
                return (
                  <div key={group.id} className="relative" onMouseEnter={() => handleEnter(group.id)} onMouseLeave={handleLeave}>
                    <button onClick={() => scrollTo(group.sections[0].id)}
                      className={cn('relative px-2.5 py-2 font-mono text-[10px] tracking-wider uppercase transition-colors duration-200', isActive ? 'text-[#00e5ff]' : 'text-[#7070a0] hover:text-[#c0c0e0]')}>
                      {getGroupLabel(group)}
                      {isActive && <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${accentColor}, #a855f7)`, boxShadow: `0 0 8px ${accentColor}` }} transition={{ duration: 0.3 }} />}
                    </button>
                    <AnimatePresence>
                      {isDrop && (
                        <motion.div initial={{ opacity: 0, y: -4, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
                          transition={{ duration: 0.15 }} className="absolute left-0 top-full pt-1 origin-top" style={{ minWidth: 180 }}>
                          <div className="overflow-hidden rounded-sm border" style={{ borderColor: `${accentColor}1F`, background: 'rgba(5,5,16,0.95)', backdropFilter: 'blur(16px)', boxShadow: `0 4px 24px rgba(0,0,0,0.5)` }}>
                            <div className="px-3 py-1.5 border-b" style={{ borderColor: `${accentColor}14` }}>
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[#505070]">{group.label}</span>
                            </div>
                            {group.sections.map((sec) => {
                              const isSec = activeSection === sec.id
                              return (
                                <button key={sec.id} onClick={() => scrollTo(sec.id)}
                                  className={cn('block w-full text-left px-3 py-1.5 font-mono text-[9px] tracking-wide transition-colors duration-150', isSec ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.05)]' : 'text-[#7070a0] hover:text-[#c0c0e0]')}>
                                  <span className="flex items-center gap-2">
                                    <span className="inline-block w-1 h-1 rounded-full shrink-0" style={{ background: isSec ? accentColor : '#505070' }} />
                                    {sec.label}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              {showLiveIndicator && (
                <div className="flex items-center gap-1.5 px-2 py-1 border rounded-sm" style={{ borderColor: `${accentColor}26`, backgroundColor: `${accentColor}08` }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[10px]" style={{ color: accentColor }}>LIVE</span>
                </div>
              )}
              {actions}
            </div>
            <div className="lg:hidden flex items-center gap-2">
              {actions}
              <button onClick={() => setUi((u) => ({ ...u, mobileOpen: !u.mobileOpen }))} className="flex flex-col gap-1.5 p-2" aria-expanded={ui.mobileOpen}>
                <motion.span animate={ui.mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1px]" style={{ backgroundColor: accentColor }} />
                <motion.span animate={ui.mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1px]" style={{ backgroundColor: accentColor }} />
                <motion.span animate={ui.mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1px]" style={{ backgroundColor: accentColor }} />
              </button>
            </div>
          </div>
        </motion.nav>
        <ScifiNavMobile groups={groups} activeSection={activeSection} accentColor={accentColor} onNavigate={scrollTo} isOpen={ui.mobileOpen} onClose={() => setUi((u) => ({ ...u, mobileOpen: false }))} />
      </>
    )
  },
)
ScifiNavBar.displayName = 'ScifiNavBar'
