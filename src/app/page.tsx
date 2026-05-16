'use client'

import { useState } from 'react'
import type { LayoutRecipe } from '@/lib/layout/types'
import recipesData from '@/data/recipes.json'
import { VariantPromptStudio } from '@/components/layout/prompt-studio'
import { VariantLayoutExplorer } from '@/components/layout/layout-explorer'
import { VariantAICanvas } from '@/components/layout/ai-canvas'
import { LayoutThemeProvider, useLayoutTheme } from '@/lib/layout/theme'
import { ProjectThemeProvider } from '@/lib/layout/project-theme'
import { StudioHeader } from '@/components/layout/variant-tabs'
import type { Variant } from '@/components/layout/variant-tabs'

const recipes = recipesData as LayoutRecipe[]

// ─── App Content ──────────────────────────────────────────

function AppContent() {
  const [variant, setVariant] = useState<Variant>('explorer')
  const { tokens } = useLayoutTheme()

  return (
    <div id="main-content" style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      background: tokens.bgDeep, color: tokens.textPrimary,
      transition: 'background 0.3s, color 0.3s',
      overflow: 'hidden',
    }}>
      <StudioHeader variant={variant} onVariantChange={setVariant} />
      {variant === 'studio' && <VariantPromptStudio recipes={recipes} />}
      {variant === 'explorer' && <VariantLayoutExplorer recipes={recipes} />}
      {variant === 'canvas' && <VariantAICanvas recipes={recipes} />}
    </div>
  )
}

export default function Home() {
  return (
    <LayoutThemeProvider>
      <ProjectThemeProvider>
        <AppContent />
      </ProjectThemeProvider>
    </LayoutThemeProvider>
  )
}
