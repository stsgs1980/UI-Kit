/** @internal Shared types for the tactical map component. */

/** A map marker / group pin shown on the tactical map. */
export interface TacticalMarker {
  /** Unique identifier. */
  id: string;
  /** Display name shown near the marker. */
  name: string;
  /** X position (0-100 percentage). */
  x: number;
  /** Y position (0-100 percentage). */
  y: number;
  /** Marker dot color. */
  color: string;
  /** Label text color. */
  labelColor?: string;
  /** Optional sub-label (e.g. vessel count). */
  sublabel?: string;
  /** Show pulsing ring animation. @default true */
  pulse?: boolean;
}

/** A labeled region on the map (water, land labels, etc.). */
export interface TacticalLabel {
  /** Text content. */
  text: string;
  /** X position percentage. */
  x: number;
  /** Y position percentage. */
  y: number;
  /** Text color. @default 'rgba(0,229,255,0.3)' */
  color?: string;
  /** Font size. @default 8 */
  fontSize?: number;
  /** Bold text. @default false */
  bold?: boolean;
}

/** Props for ScifiTacticalMap. */
export interface ScifiTacticalMapProps {
  /** Map title displayed above the SVG. */
  title?: string;
  /** SVG viewbox width. @default 400 */
  svgWidth?: number;
  /** SVG viewbox height. @default 320 */
  svgHeight?: number;
  /** Markers to render on the map. */
  markers: TacticalMarker[];
  /** Region labels displayed on the map. */
  labels?: TacticalLabel[];
  /** Show a compass rose. @default true */
  showCompass?: boolean;
  /** Show legend below the map. @default true */
  showLegend?: boolean;
  /** CSS max-height for the SVG container. @default '420px' */
  maxHeight?: string;
  /** Additional CSS class names. */
  className?: string;
}
