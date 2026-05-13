/**
 * @module scifi-incident-tracker
 * Types for the sci-fi incident tracker component.
 * Generalized from oil spill tracking to generic incident monitoring.
 */

export interface Incident {
  id: number | string;
  location: string;
  date: string;
  volume: string;
  cause: string;
  status: string;
  statusColor: string;
  statusBg: string;
}

export interface StatItem {
  label: string;
  value: string;
  trend?: string;
  trendColor?: string;
  accentColor: string;
}

export interface RiskZone {
  region: string;
  level: string;
  score: number;
}

export interface ScifiIncidentTrackerProps {
  incidents: Incident[];
  stats: StatItem[];
  riskZones?: RiskZone[];
  accentColor?: string;
  className?: string;
}

export function getRiskColor(score: number): string {
  if (score < 3) return '#22c55e';
  if (score < 5) return '#eab308';
  if (score < 7) return '#ff6b00';
  return '#ff2244';
}

export function getRiskGlow(score: number): string {
  if (score < 3) return 'rgba(34,197,94,0.5)';
  if (score < 5) return 'rgba(234,179,8,0.5)';
  if (score < 7) return 'rgba(255,107,0,0.5)';
  return 'rgba(255,34,68,0.5)';
}

export function getRiskGradient(score: number): string {
  if (score < 3) return 'linear-gradient(to right, #22c55e, #22c55e)';
  if (score < 5) return 'linear-gradient(to right, #22c55e, #eab308)';
  if (score < 7) return 'linear-gradient(to right, #eab308, #ff6b00)';
  return 'linear-gradient(to right, #ff6b00, #ff2244)';
}

export { cn } from '../../tokens/cn';
