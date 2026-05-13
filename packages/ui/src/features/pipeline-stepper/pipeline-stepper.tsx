'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../tokens/cn'
import { DesktopStepCard, MobileStepCard } from './pipeline-step-card'
import type { PipelineStep } from './pipeline-step-card'

// ─── Types ────────────────────────────────────────────────────

export type { PipelineStep }

export interface PipelineStepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Ordered pipeline steps */
  steps: PipelineStep[]
}

// ─── Component ────────────────────────────────────────────────

/**
 * PipelineStepper -- responsive multi-step workflow display.
 *
 * Shows a horizontal pipeline on desktop (cards connected by arrows)
 * and a vertical timeline on mobile. Each step has an icon, title,
 * description, and optional details. First step is highlighted.
 *
 * @example
 * ```tsx
 * <PipelineStepper
 *   steps={[
 *     { step: 1, label: 'PLAN', icon: ClipboardList, title: 'Planning', description: 'Define scope', details: ['Requirements', 'Timeline'] },
 *     { step: 2, label: 'BUILD', icon: Hammer, title: 'Development', description: 'Write code' },
 *   ]}
 * />
 * ```
 */
export const PipelineStepper = forwardRef<HTMLDivElement, PipelineStepperProps>(
  ({ steps, className, ...props }, ref) => {
    return (
      <div ref={ref} data-slot="pipeline-stepper" className={cn('', className)} {...props}>
        {/* Desktop: horizontal pipeline */}
        <div className="hidden lg:flex items-stretch gap-0 mb-6">
          {steps.map((step, i) => (
            <div key={step.step} className="contents">
              <DesktopStepCard step={step} index={i} total={steps.length} />
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative mb-6">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />
          <div className="space-y-4">
            {steps.map((step, i) => (
              <MobileStepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }
)
PipelineStepper.displayName = 'PipelineStepper'
