/**
 * @module scifi-processing-panel
 * Types for the sci-fi processing/margin panel.
 * Generalized from refinery margins to generic processing dashboards.
 */

export interface SpreadData {
  region: string;
  spread: string;
  value: number;
  change: number;
  unit: string;
  color: string;
}

export interface ProductData {
  name: string;
  price: number;
  unit: string;
  change: number;
  sparkline: number[];
  color?: string;
}

export interface UtilData {
  region: string;
  utilization: number;
  change: number;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface ScifiProcessingPanelProps {
  spreads: SpreadData[];
  products: ProductData[];
  utilization: UtilData[];
  trendData?: TrendPoint[];
  accentColor?: string;
  className?: string;
}

export function getUtilColor(util: number): string {
  if (util >= 90) return '#00e5ff';
  if (util >= 85) return '#22c55e';
  if (util >= 75) return '#eab308';
  return '#ff6b00';
}

export function getUtilLabel(util: number): string {
  if (util >= 90) return 'CRITICAL';
  if (util >= 85) return 'HIGH';
  if (util >= 75) return 'NORMAL';
  return 'LOW';
}

export { cn } from '../../tokens/cn';
