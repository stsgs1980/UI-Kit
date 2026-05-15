/**
 * @stsgs/prompting -- 20 Cognitive Formulas
 * Structured patterns that enhance AI reasoning by applying
 * cognitive science principles to prompt construction.
 */

import type { CognitiveFormula, CognitiveCategory } from '../core/types'
import { formulas } from './cognitive-formulas-data'

// ─── Public API ──────────────────────────────────────────────

/** Get all cognitive formulas. */
export function getCognitiveFormulas(): CognitiveFormula[] {
  return formulas
}

/** Get formulas by category. */
export function getFormulasByCategory(category: CognitiveCategory): CognitiveFormula[] {
  return formulas.filter(f => f.category === category)
}

/** Get a specific formula by ID. */
export function getCognitiveFormula(id: string): CognitiveFormula | undefined {
  return formulas.find(f => f.id === id)
}

/** Apply a formula template with variable substitution. */
export function applyFormula(id: string, vars: Record<string, string>): string | null {
  const formula = getCognitiveFormula(id)
  if (!formula) return null

  let result = formula.template
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
  }
  return result
}

/** Get all cognitive categories. */
export function getCognitiveCategories(): CognitiveCategory[] {
  return Array.from(new Set(formulas.map(f => f.category)))
}

export { formulas }
