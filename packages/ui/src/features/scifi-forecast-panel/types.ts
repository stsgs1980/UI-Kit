/**
 * @module scifi-forecast-panel
 * Types for the sci-fi forecast panel component.
 * Generalized from oil price forecast to generic multi-model forecast.
 */

export interface CurvePoint {
  label: string;
  value: number;
}

export interface ForecastModel {
  name: string;
  color: string;
  values: number[];
  confidence: number[];
}

export interface SignalItem {
  name: string;
  icon: string;
  description: string;
  signal: string;
  signalColor: string;
  score: number;
  details: string[];
}

export interface ScifiForecastPanelProps {
  /** Futures/forward curve data */
  futuresCurve: CurvePoint[];
  /** Forecast models (base, bullish, bearish, etc.) */
  models: ForecastModel[];
  /** Algorithmic signals */
  signals?: SignalItem[];
  accentColor?: string;
  className?: string;
}

export { cn } from '../../tokens/cn';
