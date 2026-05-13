/** @internal Shared types for the tracked assets panel. */

/** A tracked asset entity with status and threat level. */
export interface TrackedAsset {
  /** Unique identifier. */
  id: string | number;
  /** Display name. */
  name: string;
  /** Asset type classification. */
  type: string;
  /** Origin or affiliation. */
  affiliation: string;
  /** Optional icon (emoji or short string). */
  icon?: string;
  /** Current status label. */
  status: string;
  /** Status accent color. */
  statusColor: string;
  /** Status background color. */
  statusBg: string;
  /** Threat or severity score (0-10). */
  threat: number;
  /** Location or coordinates string. */
  location?: string;
}

/** Summary info displayed above the asset list. */
export interface TrackedAssetsInfo {
  /** Total items being tracked. */
  total: number;
  /** Label for total count. */
  totalLabel?: string;
  /** High-threat count threshold. */
  highThreatCount?: number;
  /** High-threat threshold value (default 7). */
  highThreshold?: number;
  /** High-threat label. */
  highThreatLabel?: string;
  /** Show a "LIVE" indicator. */
  showLive?: boolean;
}

/** Props for ScifiTrackedAssets. */
export interface ScifiTrackedAssetsProps {
  /** Panel title. */
  title?: string;
  /** Summary info above the list. */
  info?: TrackedAssetsInfo;
  /** Asset items to display. */
  assets: TrackedAsset[];
  /** Optional footer note. */
  footerNote?: string;
  /** Maximum height for the scrollable list (CSS value). @default '520px' */
  maxHeight?: string;
  /** Additional CSS class names. */
  className?: string;
}
