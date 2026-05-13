// ─── Types for ScifiScenarioEngine ────────────────────────────

/** Configuration for a single adjustable factor */
export interface FactorConfig {
  /** Unique key */
  key: string
  /** Display label */
  label: string
  /** Short label for tight spaces */
  shortLabel: string
  /** Weight in composite score (0-1, should sum to ~1 across factors) */
  weight: number
  /** If true, high value = lower risk (e.g. diplomatic relations) */
  inverse: boolean
  /** Description of what this factor measures */
  description: string
  /** Minimum slider value (default 0) */
  min?: number
  /** Maximum slider value (default 100) */
  max?: number
  /** Default value */
  defaultValue: number
}

/** Map of factor key to its current numeric value */
export type FactorValues = Record<string, number>

/** A preset that sets all factors at once */
export interface ScenarioPreset {
  /** Preset label */
  label: string
  /** Color indicator */
  color: string
  /** Factor values for this preset */
  values: FactorValues
}

/** Scenario description matching a composite score range */
export interface ScenarioInfo {
  /** Minimum composite score (inclusive) */
  min: number
  /** Maximum composite score (inclusive) */
  max: number
  /** Title text */
  title: string
  /** Icon character */
  icon: string
  /** Description paragraph */
  text: string
}

/** A single tab definition */
export interface EngineTab {
  /** Tab key */
  key: string
  /** Tab label */
  label: string
}

/** Main component props */
export interface ScifiScenarioEngineProps {
  /** Factor configurations */
  factors: FactorConfig[]
  /** Preset buttons */
  presets?: ScenarioPreset[]
  /** Scenario descriptions keyed by composite score ranges */
  scenarios?: ScenarioInfo[]
  /** Tab definitions (default: projection, assessment, evolution) */
  tabs?: EngineTab[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Callback with computed composite score and factor values */
  onScoreChange?: (composite: number, values: FactorValues) => void
  /** Accent color (default "#00e5ff") */
  accentColor?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Engine helpers ───────────────────────────────────────────

/** Compute weighted composite score from factor values */
export function computeCompositeScore(factors: FactorConfig[], values: FactorValues): number {
  let total = 0
  for (const factor of factors) {
    const raw = values[factor.key] ?? 0
    const effective = factor.inverse ? (100 - raw) : raw
    total += effective * factor.weight
  }
  return Math.round(total * 100) / 100
}

/** Get a color based on composite score severity */
export function getScoreColor(score: number): string {
  if (score <= 25) return '#00e5ff'
  if (score <= 50) return '#22d3ee'
  if (score <= 75) return '#ff6b00'
  return '#ff2244'
}

/** Get RGB string for composite score */
export function getScoreRgb(score: number): string {
  if (score <= 25) return '0,229,255'
  if (score <= 50) return '34,211,238'
  if (score <= 75) return '255,107,0'
  return '255,34,68'
}

/** Get factor-specific color based on value and inverse flag */
export function getFactorColor(value: number, inverse: boolean): string {
  const effective = inverse ? (100 - value) : value
  if (effective <= 25) return '#00e5ff'
  if (effective <= 50) return '#22d3ee'
  if (effective <= 75) return '#ff6b00'
  return '#ff2244'
}

/** Look up matching scenario from score */
export function matchScenario(scenarios: ScenarioInfo[], composite: number): ScenarioInfo | undefined {
  return scenarios.find((s) => composite >= s.min && composite <= s.max)
}
