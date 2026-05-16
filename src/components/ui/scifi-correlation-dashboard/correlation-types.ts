/** @internal Shared types for the correlation dashboard components. */

/** Trend direction of a correlated value. */
export type CorrelationTrend = 'up' | 'down' | 'stable';

/** A row in the left (primary) correlation panel. */
export interface CorrelationItem {
  /** Unique identifier. */
  id: string;
  /** Primary display label (e.g. pair name). */
  label: string;
  /** Secondary description. */
  description: string;
  /** Current numeric value, formatted as string. */
  value: string;
  /** Short-term percent change. */
  changeShort: number;
  /** Medium-term percent change. */
  changeLong: number;
  /** Correlation coefficient to the reference asset (-1 to 1). */
  correlation: number;
  /** Human-readable correlation strength label. */
  correlationLabel: string;
  /** Sparkline data points. */
  sparkline: number[];
}

/** A row in the right (secondary) correlation panel. */
export interface CorrelationAsset {
  /** Unique identifier. */
  id: string;
  /** Primary display name. */
  name: string;
  /** Secondary / English name. */
  sublabel: string;
  /** Current price, formatted as string. */
  price: string;
  /** Unit of measurement. */
  unit: string;
  /** 24h percent change. */
  change24h: number;
  /** Correlation coefficient to the reference asset. */
  correlation: number;
  /** Visual trend direction. */
  trend: CorrelationTrend;
  /** Sparkline data points. */
  sparkline: number[];
}

/** A summary stat card shown below the panels. */
export interface CorrelationStat {
  /** Label text. */
  label: string;
  /** Primary numeric value. */
  value: string;
  /** Description text. */
  description: string;
  /** Accent color for the value text. */
  color: string;
}

/** Column header definition for a correlation panel. */
export interface ColumnHeader {
  /** Flex basis or width class (e.g. 'flex-1', 'sm:w-24'). */
  widthClass: string;
  /** Header label. */
  label: string;
}

/** Configuration for a single correlation panel. */
export interface CorrelationPanelConfig {
  /** Panel title displayed inside the HUDCard header. */
  title: string;
  /** Tailwind accent color key used by HUDCard (e.g. 'cyan', 'orange'). */
  accentColor: string;
  /** Column headers. */
  columns: ColumnHeader[];
  /** Legend items at the bottom. */
  legend?: Array<{ color: string; label: string }>;
}

/** Props for the main ScifiCorrelationDashboard component. */
export interface ScifiCorrelationDashboardProps {
  /** Section-level label displayed in brackets. */
  sectionLabel?: string;
  /** Section-level title. */
  sectionTitle?: string;
  /** Section-level subtitle / description. */
  sectionSubtitle?: string;
  /** Configuration for the left (primary) panel. */
  leftPanel: CorrelationPanelConfig;
  /** Row data for the left panel. */
  leftItems: CorrelationItem[];
  /** Configuration for the right (secondary) panel. */
  rightPanel: CorrelationPanelConfig;
  /** Row data for the right panel. */
  rightItems: CorrelationAsset[];
  /** Summary stat cards displayed below the panels. */
  stats?: CorrelationStat[];
  /** Additional CSS class names. */
  className?: string;
}
