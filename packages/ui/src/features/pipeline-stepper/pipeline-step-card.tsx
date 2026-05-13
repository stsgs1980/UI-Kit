'use client'

import type { LucideIcon } from 'lucide-react'
import { cn } from '../../tokens/cn'

export interface PipelineStep {
  /** Step number */
  step: number
  /** Short label (e.g. "PLAN") */
  label: string
  /** Step icon (Lucide) */
  icon: LucideIcon
  /** Step title */
  title: string
  /** Step description */
  description: string
  /** Bullet-point details (max 3-4 shown) */
  details?: string[]
  /** Optional keyboard shortcut badge */
  shortcut?: string
}

/** Bullet list shared between desktop and mobile cards. */
function DetailsList({ details }: { details?: string[] }) {
  if (!details || details.length === 0) return null
  return (
    <ul className="space-y-1 mt-auto">
      {details.slice(0, 3).map((d) => (
        <li key={d} className="text-xs flex items-start gap-1.5 text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
          <span>{d}</span>
        </li>
      ))}
    </ul>
  )
}

/** Desktop step: card + arrow connector. */
export function DesktopStepCard({ step, index, total }: { step: PipelineStep; index: number; total: number }) {
  const Icon = step.icon
  const isFirst = index === 0
  return (
    <>
      <div className="flex-1 min-w-0 flex flex-col p-4 rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
            isFirst ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
            {step.step}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{step.label}</span>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <Icon className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground">{step.title}</span>
          {step.shortcut && (
            <kbd className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted text-muted-foreground border border-border">{step.shortcut}</kbd>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
        <DetailsList details={step.details} />
      </div>
      {index < total - 1 && (
        <div className="flex items-center px-1.5 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary/40"><path d="m9 18 6-6-6-6" /></svg>
        </div>
      )}
    </>
  )
}

/** Mobile step: timeline dot + card. */
export function MobileStepCard({ step, index }: { step: PipelineStep; index: number }) {
  const Icon = step.icon
  const isFirst = index === 0
  return (
    <div className="flex gap-3 relative">
      <div className="relative z-10 shrink-0">
        <div className={cn('w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold',
          isFirst ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border text-muted-foreground')}>
          {step.step}
        </div>
      </div>
      <div className="flex-1 p-4 rounded-xl border bg-card shadow-sm">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Icon className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground">{step.title}</span>
          <span className="text-xs text-muted-foreground">{step.label}</span>
          {step.shortcut && (
            <kbd className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted text-muted-foreground border border-border">{step.shortcut}</kbd>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
        <DetailsList details={step.details} />
      </div>
    </div>
  )
}
