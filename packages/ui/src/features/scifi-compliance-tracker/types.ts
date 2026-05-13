/**
 * @module scifi-compliance-tracker
 * Types for the sci-fi compliance tracker component.
 * Generalized from sanctions tracking to generic compliance/regulation monitoring.
 */

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type ComplianceCategory = 'restriction' | 'embargo' | 'sanction';

export interface ComplianceEntity {
  /** Entity name (country, org, etc.) */
  name: string;
  /** Emoji or icon flag */
  icon: string;
  /** Category of compliance action */
  category: ComplianceCategory;
  /** Severity level */
  severity: Severity;
  /** Effective date range string */
  effectiveDate: string;
  /** Quantitative impact value (e.g. volume affected) */
  impactValue: string;
  /** Compliance rate 0–100 */
  compliance: number;
  /** Price/financial impact label */
  priceImpact: string;
  /** Human-readable description */
  description: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  /** Impact score 0–10 */
  impactScore: number;
  category: string;
}

export interface ScifiComplianceTrackerProps {
  /** List of compliance entities to display */
  entities: ComplianceEntity[];
  /** Overall compliance rate 0–100 */
  complianceRate: number;
  /** Timeline events */
  timeline?: TimelineEvent[];
  /** Accent color, defaults to '#00e5ff' */
  accentColor?: string;
  /** Additional CSS classes */
  className?: string;
}

export interface SeverityConfig {
  color: string;
  bg: string;
  border: string;
  label: string;
}

export const SEVERITY_CONFIG: Record<Severity, SeverityConfig> = {
  low:      { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.4)',  label: 'LOW' },
  medium:   { color: '#eab308', bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.4)',  label: 'MEDIUM' },
  high:     { color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.4)', label: 'HIGH' },
  critical: { color: '#ff2244', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.5)', label: 'CRITICAL' },
};

export const CATEGORY_COLORS: Record<ComplianceCategory, string> = {
  sanction:   '#a855f7',
  embargo:    '#ff2244',
  restriction: '#f97316',
};

export { cn } from '../../tokens/cn';
