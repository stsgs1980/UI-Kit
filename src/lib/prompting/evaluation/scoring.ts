/**
 * @stsgs/prompting -- Prompt Scoring Engine
 * Evaluates prompts across 6 dimensions, assigns S/A/B/C/D/F grades.
 *
 * Integration point: used by prompt-studio.tsx to show Q:{grade} + C:{confidence}%
 */

import type { PromptScore, ScoreDimension } from '../core/types'
import { DIMENSIONS, numericToGrade } from './scoring-dimensions'

// ─── Public API ──────────────────────────────────────────────

/**
 * Score a prompt across all 6 dimensions.
 *
 * Integration point: used by prompt-studio.tsx for Q:{grade} display
 *
 * @param prompt - The prompt text to evaluate
 * @returns PromptScore with overall grade, per-dimension breakdown, and suggestions
 */
export function scorePrompt(prompt: string): PromptScore {
  if (!prompt?.trim()) {
    return {
      overall: 'F',
      numeric: 0,
      dimensions: DIMENSIONS.map(d => ({
        name: d.name,
        score: 0,
        weight: d.weight,
        grade: 'F' as const,
        feedback: 'Empty prompt.',
      })),
      suggestions: ['Provide a prompt to evaluate.'],
    }
  }

  const dimensions: ScoreDimension[] = DIMENSIONS.map(dim => {
    const result = dim.evaluate(prompt)
    const grade = numericToGrade(result.score)
    return {
      name: dim.name,
      score: result.score,
      weight: dim.weight,
      grade,
      feedback: result.feedback,
    }
  })

  // Weighted average
  const weightedSum = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0)
  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0)
  const numeric = Math.round(weightedSum / totalWeight)
  const overall = numericToGrade(numeric)

  // Generate improvement suggestions from weakest dimensions
  const sorted = [...dimensions].sort((a, b) => a.score - b.score)
  const suggestions = sorted
    .slice(0, 3)
    .filter(d => d.score < 70)
    .map(d => d.feedback)

  return { overall, numeric, dimensions, suggestions }
}

/**
 * Get a quick quality score (0-100) without detailed breakdown.
 * Useful for real-time feedback during typing.
 */
export function quickScore(prompt: string): number {
  if (!prompt?.trim()) return 0
  const result = scorePrompt(prompt)
  return result.numeric
}

/**
 * Get dimension names and weights for UI display.
 */
export function getScoreDimensions(): Array<{ name: string; weight: number; description: string }> {
  return DIMENSIONS.map(d => ({ name: d.name, weight: d.weight, description: d.description }))
}

/**
 * Estimate the number of tokens in a text string.
 * Uses a simple heuristic: ~1.3 tokens per word (average for English).
 * Useful for cost estimation and context window planning.
 */
export function estimateTokens(text: string): number {
  if (!text?.trim()) return 0
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.ceil(words * 1.3)
}

export { DIMENSIONS, numericToGrade }
