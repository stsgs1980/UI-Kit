/**
 * @stsgs/prompting -- 12 Orchestration Patterns
 * Multi-agent coordination patterns for complex AI workflows.
 * Each pattern defines how multiple agents collaborate to solve a task.
 */

import type { OrchestrationPattern, OrchestrationStep } from '../core/types'
import { patterns } from './orchestration-data'

// ─── Public API ──────────────────────────────────────────────

/** Get all orchestration patterns. */
export function getOrchestrationPatterns(): OrchestrationPattern[] {
  return patterns
}

/** Get a pattern by ID. */
export function getOrchestrationPattern(id: string): OrchestrationPattern | undefined {
  return patterns.find(p => p.id === id)
}

/** Get patterns by topology type. */
export function getPatternsByTopology(topology: OrchestrationPattern['topology']): OrchestrationPattern[] {
  return patterns.filter(p => p.topology === topology)
}

/** Get the step sequence for a pattern, rendered with actual prompts. */
export function renderPatternSteps(patternId: string, input: string): OrchestrationStep[] {
  const pattern = getOrchestrationPattern(patternId)
  if (!pattern) return []

  return pattern.steps.map(step => ({
    ...step,
    promptTemplate: step.promptTemplate.replace('{input}', input),
  }))
}

export { patterns }
