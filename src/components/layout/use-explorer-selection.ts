'use client'

import { useState, useMemo, useEffect } from 'react'
import type { LayoutRecipe, LayoutAdviceInput, LayoutRecommendation, ParsedPrompt } from '@/lib/layout/types'
import { scoreLayout, scoreLayoutMulti } from '@/lib/layout/scoring'

export function useExplorerSelection(recipes: LayoutRecipe[], selectedCategory: string | null, searchQuery: string = '') {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)
  const [parsed, setParsed] = useState<ParsedPrompt | null>(null)

  const input: LayoutAdviceInput = parsed
    ? { goal: parsed.goal, contentType: parsed.contentType, itemCount: parsed.itemCount, needsSidebar: parsed.needsSidebar, needsHeader: parsed.needsHeader, needsFooter: parsed.needsFooter }
    : { goal: 'landing', contentType: 'cards', itemCount: 6, needsHeader: true }

  const goalWeightsExp = parsed?.goalWeights ?? { [input.goal]: 1 }
  const isMultiGoalExp = Object.keys(goalWeightsExp).filter(g => goalWeightsExp[g] > 0).length > 1

  const ranked = useMemo(() => {
    if (isMultiGoalExp && parsed) return recipes.map(r => scoreLayoutMulti(r, input, goalWeightsExp)).sort((a, b) => b.score - a.score) as LayoutRecommendation[]
    return recipes.map(r => scoreLayout(r, input)).sort((a, b) => b.score - a.score)
  }, [recipes, input, isMultiGoalExp, parsed, goalWeightsExp])

  const best = ranked[0] ?? null

  const filtered = useMemo(() => {
    let result = ranked
    if (selectedCategory) result = result.filter(r => r.recipe.category === selectedCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(r =>
        r.recipe.name.toLowerCase().includes(q) ||
        r.recipe.structure.toLowerCase().includes(q) ||
        r.recipe.description.toLowerCase().includes(q) ||
        r.recipe.category.toLowerCase().includes(q) ||
        r.recipe.bestFor.some(g => g.toLowerCase().includes(q))
      )
    }
    return result
  }, [ranked, selectedCategory, searchQuery])

  const selected = selectedRecipe ? filtered.find(r => r.structure === selectedRecipe) ?? null : null

  // Sync: clear selectedRecipe if it's no longer in filtered results
  useEffect(() => {
    if (selectedRecipe && !filtered.some(r => r.structure === selectedRecipe)) {
      setSelectedRecipe(null)
    }
  }, [filtered, selectedRecipe, setSelectedRecipe])

  // catCounts from search-filtered subset (but not category-filtered, so counts stay accurate)
  const searchFiltered = useMemo(() => {
    if (!searchQuery) return ranked
    const q = searchQuery.toLowerCase()
    return ranked.filter(r =>
      r.recipe.name.toLowerCase().includes(q) ||
      r.recipe.structure.toLowerCase().includes(q) ||
      r.recipe.description.toLowerCase().includes(q) ||
      r.recipe.category.toLowerCase().includes(q) ||
      r.recipe.bestFor.some(g => g.toLowerCase().includes(q))
    )
  }, [ranked, searchQuery])

  const catCounts = useMemo(() => {
    const m: Record<string, number> = {}
    for (const r of searchFiltered) m[r.recipe.category] = (m[r.recipe.category] ?? 0) + 1
    return m
  }, [searchFiltered])

  return {
    selectedRecipe, setSelectedRecipe,
    parsed, setParsed,
    ranked, filtered, selected, best,
    catCounts, input,
  }
}
