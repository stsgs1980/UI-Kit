/**
 * @module scifi-indicator-panel
 * Types for the sci-fi indicator panel component.
 */

export interface IndicatorConfig {
  type: 'rsi' | 'macd' | 'bollinger';
  period?: number;
  stdDev?: number;
}

export interface ScifiIndicatorPanelProps {
  /** Price time series data */
  priceData: number[];
  /** Which indicators to show */
  indicators: IndicatorConfig[];
  accentColor?: string;
  className?: string;
}

export { cn } from '../../tokens/cn';

export type { IndicatorSignalProps } from './indicator-signal';
