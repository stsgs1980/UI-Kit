/** @internal Shared types for the versus comparison panel. */

/** A single stat entry in a team summary card. */
export interface VersusStat {
  /** Label text. */
  label: string;
  /** Display value (e.g. "12", "45,000+"). */
  value: string;
  /** Accent color for the value text. */
  color: string;
}

/** Configuration for one side (team) in the comparison. */
export interface VersusTeam {
  /** Team name / label. */
  name: string;
  /** Accent color for this team (e.g. '#00e5ff'). */
  color: string;
  /** Background tint (e.g. 'rgba(0,240,255,0.04)'). */
  background: string;
  /** Border color (e.g. 'rgba(0,240,255,0.12)'). */
  borderColor: string;
  /** Summary stats shown in the team card. */
  stats: VersusStat[];
}

/** A single comparison bar item. */
export interface VersusBarItem {
  /** Category label (e.g. 'Destroyers'). */
  label: string;
  /** Left team numeric value. */
  leftValue: number;
  /** Left team display label. */
  leftLabel: string;
  /** Right team numeric value. */
  rightValue: number;
  /** Right team display label. */
  rightLabel: string;
}

/** Props for ScifiVersusPanel. */
export interface ScifiVersusPanelProps {
  /** Panel title. */
  title?: string;
  /** Left team configuration. */
  leftTeam: VersusTeam;
  /** Right team configuration. */
  rightTeam: VersusTeam;
  /** Comparison bar items. */
  bars: VersusBarItem[];
  /** Balance percentage (0-100) for the advantage indicator. */
  balancePct?: number;
  /** Balance label text. */
  balanceLabel?: string;
  /** Left bar gradient start color. */
  leftBarColor?: string;
  /** Right bar gradient start color. */
  rightBarColor?: string;
  /** Optional footer note. */
  footerNote?: string;
  /** Additional CSS class names. */
  className?: string;
}
