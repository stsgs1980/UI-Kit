/**
 * @stsgs/prompting -- 12 Intent Templates + matchIntent()
 * Analyzes user prompts to detect intent, extract parameters,
 * and route to appropriate templates.
 */

import type { IntentType, IntentMatch } from '../core/types'
import { INTENTS } from './intent-templates-data'
import type { IntentDefinition } from './intent-templates-data'

// Re-export data for downstream consumers
export { INTENTS }
export type { IntentDefinition }

// ─── Public API ──────────────────────────────────────────────

/**
 * Analyze a user prompt and detect the most likely intent.
 * Returns the best IntentMatch with confidence score and matched keywords.
 *
 * Integration point: used by /api/interpret-prompt/route.ts
 */
export function matchIntent(prompt: string): IntentMatch {
  const lower = prompt.toLowerCase().trim()
  if (!lower) {
    return {
      intent: 'explanation',
      confidence: 0,
      keywords: [],
      template: INTENTS.find(i => i.type === 'explanation')!.template,
      metadata: {},
    }
  }

  const scores: Array<{ intent: IntentDefinition; score: number; matched: string[] }> = []

  for (const intentDef of INTENTS) {
    let score = 0
    const matched: string[] = []

    for (const kwGroup of intentDef.keywords) {
      for (const kw of kwGroup.en) {
        if (lower.includes(kw.toLowerCase())) {
          score += kw.split(' ').length // multi-word keywords score higher
          matched.push(kw)
        }
      }
      if (kwGroup.ru) {
        for (const kw of kwGroup.ru) {
          if (lower.includes(kw.toLowerCase())) {
            score += kw.split(' ').length
            matched.push(kw)
          }
        }
      }
    }

    score += intentDef.confidenceBoost
    scores.push({ intent: intentDef, score, matched })
  }

  scores.sort((a, b) => b.score - a.score)
  const best = scores[0]

  // Calculate confidence as percentage (normalize against max possible)
  const maxPossibleScore = Math.max(
    best.intent.keywords.reduce((sum, kg) => sum + kg.en.length + (kg.ru?.length ?? 0), 0) + best.intent.confidenceBoost,
    1
  )
  const confidence = Math.min(100, Math.round((best.score / maxPossibleScore) * 100))

  // Extract parameters if available
  const metadata: Record<string, unknown> = {}
  for (const [param, patterns] of Object.entries(best.intent.parameterExtractors)) {
    const values: string[] = []
    for (const pattern of patterns) {
      if (pattern.test(prompt)) {
        const match = prompt.match(pattern)
        if (match) values.push(match[0])
      }
    }
    if (values.length > 0) metadata[param] = values
  }

  return {
    intent: best.intent.type,
    confidence,
    keywords: best.matched,
    template: best.intent.template.replace('{query}', prompt).replace('{content}', prompt).replace('{text}', prompt).replace('{code}', prompt).replace('{code_or_description}', prompt).replace('{error_details}', prompt).replace('{data}', prompt),
    metadata,
  }
}

/**
 * Get all available intent types.
 */
export function getIntentTypes(): IntentType[] {
  return INTENTS.map(i => i.type)
}

/**
 * Get the template for a specific intent type.
 */
export function getIntentTemplate(type: IntentType): string | undefined {
  return INTENTS.find(i => i.type === type)?.template
}
