'use client'

import { forwardRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../tokens/cn'
import type { ScifiScenarioEngineProps, FactorValues, EngineTab } from './types'
import { computeCompositeScore, getScoreColor, getScoreRgb, matchScenario } from './types'
import { ScoreDisplay, FactorControls } from './factor-controls'

/** Multi-factor scenario analysis engine with adjustable sliders, composite scoring, and tabbed result views.
 * @example <ScifiScenarioEngine factors={[{ key: 'supply', label: 'Supply Risk', shortLabel: 'Supply', weight: 0.4, inverse: false, description: 'Risk', defaultValue: 50 }]} /> */
export const ScifiScenarioEngine = forwardRef<HTMLDivElement, ScifiScenarioEngineProps>(
  ({ factors, presets, scenarios, tabs: tabsProp, title, subtitle, onScoreChange, accentColor = '#00e5ff', className }, ref) => {
    const defaultValues = useMemo<FactorValues>(() => {
      const v: FactorValues = {}
      for (const f of factors) v[f.key] = f.defaultValue
      return v
    }, [factors])

    const [values, setValues] = useState<FactorValues>(defaultValues)
    const defaultTabs: EngineTab[] = [
      { key: 'projection', label: 'Projection' },
      { key: 'assessment', label: 'Assessment' },
      { key: 'evolution', label: 'Evolution' },
    ]
    const tabs = tabsProp ?? defaultTabs

    const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? 'projection')

    const composite = useMemo(() => computeCompositeScore(factors, values), [factors, values])
    const scoreColor = getScoreColor(composite)
    const scoreRgb = getScoreRgb(composite)
    const matchedScenario = scenarios ? matchScenario(scenarios, composite) : null

    const handleValueChange = useCallback((key: string, value: number) => setValues((prev) => ({ ...prev, [key]: value })), [])
    const handlePreset = useCallback((pv: FactorValues) => setValues(pv), [])

    useMemo(() => { onScoreChange?.(composite, values) }, [composite, values, onScoreChange])

    return (
      <section ref={ref} data-slot="scifi-scenario-engine" className={cn('relative max-w-7xl mx-auto px-4 py-12 sm:py-16', className)}>
        {/* Header */}
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-white tracking-wider" style={{ textShadow: `0 0 20px ${scoreColor}30` }}>
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-sm text-[#7070a0] font-mono max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* Background glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none blur-[150px] opacity-10"
          animate={{ backgroundColor: scoreColor }}
          transition={{ duration: 0.8 }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Score + Controls */}
          <div className="lg:col-span-7 space-y-6">
            <ScoreDisplay composite={composite} factors={factors} values={values} accentColor={accentColor} />
            <FactorControls
              factors={factors}
              values={values}
              presets={presets}
              onValueChange={handleValueChange}
              onPreset={handlePreset}
              accentColor={accentColor}
            />

            {/* Scenario description */}
            {matchedScenario && (
              <motion.div
                key={matchedScenario.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-sm"
                style={{ backgroundColor: `rgba(${scoreRgb}, 0.05)`, border: `1px solid rgba(${scoreRgb}, 0.15)` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: scoreColor }} />
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-widest font-bold" style={{ color: scoreColor }}>
                    {matchedScenario.icon} {matchedScenario.title}
                  </span>
                </div>
                <p className="text-[#9090b0] font-mono text-xs sm:text-sm leading-relaxed">{matchedScenario.text}</p>
              </motion.div>
            )}
          </div>

          {/* Right: Tab navigation (placeholder) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex gap-1 p-1 rounded-sm" style={{ backgroundColor: 'rgba(15,15,30,0.9)' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 px-3 py-2 rounded-sm font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: activeTab === tab.key ? `rgba(${scoreRgb}, 0.15)` : 'transparent',
                    color: activeTab === tab.key ? scoreColor : '#505080',
                    border: `1px solid ${activeTab === tab.key ? `rgba(${scoreRgb}, 0.3)` : 'transparent'}`,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Results area placeholder — consumers render custom content here */}
            <div
              className="p-6 rounded-sm backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(10, 10, 26, 0.8)',
                border: `1px solid rgba(${scoreRgb}, 0.15)`,
                minHeight: '300px',
              }}
            >
              <div className="text-center py-8">
                <div className="font-mono text-sm text-[#7070a0]">
                  Composite Score: <span className="font-bold" style={{ color: scoreColor }}>{composite.toFixed(1)}</span>
                </div>
                <div className="font-mono text-xs text-[#505080] mt-2">
                  Active tab: {activeTab}
                </div>
                <div className="font-mono text-[10px] text-[#404060] mt-3">
                  Render custom results for tab &quot;{activeTab}&quot; using the composite score and factor values.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
)
ScifiScenarioEngine.displayName = 'ScifiScenarioEngine'
