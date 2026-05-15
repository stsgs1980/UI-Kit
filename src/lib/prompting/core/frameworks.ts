/**
 * @stsgs/prompting -- 11 Prompting Frameworks (API)
 */

import type { PromptFramework } from './types'
import { frameworks } from './frameworks-data'

/** Get all frameworks. */
export function getFrameworks(): PromptFramework[] {
  return frameworks
}

/** Get a framework by ID. */
export function getFramework(id: string): PromptFramework | undefined {
  return frameworks.find(f => f.id === id)
}

/** Get frameworks by complexity level. */
export function getFrameworksByComplexity(level: 'simple' | 'moderate' | 'complex'): PromptFramework[] {
  return frameworks.filter(f => f.complexity === level)
}

/** Build a prompt from a framework and values. */
export function buildFromFramework(
  frameworkId: string,
  values: Record<string, string>
): string | null {
  const fw = getFramework(frameworkId)
  if (!fw) return null

  const sections = fw.steps.map(step => {
    const value = values[step.label.toLowerCase()]
    if (!value && step.required) return null
    return `## ${step.label}\n${value ?? '(not specified)'}`
  })

  const validSections = sections.filter(Boolean)
  if (validSections.length === 0) return null

  return validSections.join('\n\n')
}

export { frameworks }
