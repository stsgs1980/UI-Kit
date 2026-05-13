/**
 * @module scifi-level-analysis
 * Types for the sci-fi level analysis component.
 * Generalized from Fibonacci retracement to generic support/resistance level analysis.
 */

export interface PricePoint {
  date: string;
  value: number;
}

export interface AnalysisLevel {
  /** Level percentage (e.g. 0.236 for 23.6%) */
  ratio: number;
  label: string;
  color: string;
  /** Actual price at this level */
  price: number;
}

export interface IndicatorCard {
  label: string;
  value: string;
  color: string;
  icon: string;
}

export interface ScifiLevelAnalysisProps {
  /** Time-series data points (date + value) */
  data: PricePoint[];
  /** Analysis levels (support/resistance) */
  levels: AnalysisLevel[];
  /** Overlay indicator cards */
  indicators?: IndicatorCard[];
  accentColor?: string;
  className?: string;
}

export { cn } from '../../tokens/cn';
