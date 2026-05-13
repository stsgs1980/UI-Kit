'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { NavGroup } from './nav-types'
import { getGroupLabel } from './nav-types'

// ─── Types ────────────────────────────────────────────────────

export interface ScifiNavMobileProps {
  groups: NavGroup[]
  activeSection: string
  accentColor?: string
  onNavigate: (sectionId: string) => void
  isOpen: boolean
  onClose: () => void
}

// ─── Component ────────────────────────────────────────────────

/**
 * ScifiNavMobile -- slide-out mobile drawer for grouped navigation.
 * Part of the ScifiNavBar system; typically not used directly.
 *
 * @internal
 */
export function ScifiNavMobile({ groups, activeSection, accentColor = '#00e5ff', onNavigate, isOpen, onClose }: ScifiNavMobileProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const activeGroupId = groups.find((g) => g.sections.some((s) => s.id === activeSection))?.id

  const toggleGroup = useCallback((groupId: string) => {
    setExpanded((prev) => (prev === groupId ? null : groupId))
  }, [])

  const handleNavigate = useCallback(
    (sectionId: string) => {
      onNavigate(sectionId)
      onClose()
    },
    [onNavigate, onClose],
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 pt-14 lg:hidden"
          style={{ backgroundColor: 'rgba(5,5,16,0.95)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex flex-col h-full overflow-y-auto py-6">
            {groups.map((group, groupIdx) => {
              const isGroupActive = activeGroupId === group.id
              const isExpanded = expanded === group.id
              return (
                <motion.div key={group.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: groupIdx * 0.05 }}>
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={cn('flex items-center justify-between w-full px-6 py-3 font-mono text-sm tracking-wider uppercase transition-colors duration-200', isGroupActive ? 'text-[#00e5ff]' : 'text-[#7070a0]')}
                  >
                    <span>{getGroupLabel(group)}</span>
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-xs opacity-50">
                      &#9662;
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col pl-10 pr-6 pb-2">
                          {group.sections.map((section) => {
                            const isActive = activeSection === section.id
                            return (
                              <button
                                key={section.id}
                                onClick={() => handleNavigate(section.id)}
                                className={cn('text-left py-2 font-mono text-xs tracking-wide transition-colors duration-150', isActive ? 'text-[#00e5ff]' : 'text-[#505080] hover:text-[#a0a0c0]')}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="inline-block w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: isActive ? accentColor : '#404060' }} />
                                  {section.label}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {groupIdx < groups.length - 1 && <div className="mx-6 h-[1px]" style={{ backgroundColor: `${accentColor}10` }} />}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
