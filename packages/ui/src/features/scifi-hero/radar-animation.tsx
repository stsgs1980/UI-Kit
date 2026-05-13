'use client'

/**
 * RadarAnimation — decorative SVG radar sweep overlay.
 *
 * Renders concentric circles, a rotating sweep line, and animated
 * blips for a sci-fi HUD aesthetic.
 *
 * @example
 * ```tsx
 * <RadarAnimation accentColor="#00e5ff" />
 * ```
 */
export interface RadarAnimationProps {
  /** Accent color for radar elements (default '#00e5ff') */
  accentColor?: string
}

export function RadarAnimation({ accentColor = '#00e5ff' }: RadarAnimationProps) {
  return (
    <div className="absolute bottom-[10%] right-[10%] w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] opacity-[0.07] pointer-events-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Concentric circles */}
        <circle cx="100" cy="100" r="90" fill="none" stroke={accentColor} strokeWidth="0.5" />
        <circle cx="100" cy="100" r="60" fill="none" stroke={accentColor} strokeWidth="0.5" />
        <circle cx="100" cy="100" r="30" fill="none" stroke={accentColor} strokeWidth="0.5" />
        {/* Cross lines */}
        <line x1="100" y1="10" x2="100" y2="190" stroke={accentColor} strokeWidth="0.3" />
        <line x1="10" y1="100" x2="190" y2="100" stroke={accentColor} strokeWidth="0.3" />
        {/* Sweep */}
        <line x1="100" y1="100" x2="100" y2="10" stroke={accentColor} strokeWidth="1">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="6s" repeatCount="indefinite" />
        </line>
        {/* Sweep cone */}
        <path d="M100,100 L100,10 A90,90 0 0,1 178,55 Z" fill="url(#radarGrad-hero)">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="6s" repeatCount="indefinite" />
        </path>
        <defs>
          <linearGradient id="radarGrad-hero" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Center dot */}
        <circle cx="100" cy="100" r="2" fill={accentColor}>
          <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Blips */}
        <circle cx="65" cy="130" r="2.5" fill="#ff6b00" opacity="0.6">
          <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="80" r="2" fill="#ff2244" opacity="0.6">
          <animate attributeName="opacity" values="0;0.8;0" dur="4s" begin="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}
