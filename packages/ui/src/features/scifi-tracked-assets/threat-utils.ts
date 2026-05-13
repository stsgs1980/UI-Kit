/**
 * Get threat/score level color based on 0-10 scale.
 * @param threat - Score value from 0 to 10.
 * @returns Hex color string.
 */
export function getThreatColor(threat: number): string {
  if (threat >= 8) return '#ff2244';
  if (threat >= 6) return '#ff6b00';
  if (threat >= 4) return '#eab308';
  return '#22c55e';
}

/**
 * Get glow color for threat/score level.
 * @param threat - Score value from 0 to 10.
 * @returns RGBA glow color string.
 */
export function getThreatGlow(threat: number): string {
  if (threat >= 8) return 'rgba(255,34,68,0.4)';
  if (threat >= 6) return 'rgba(255,107,43,0.4)';
  if (threat >= 4) return 'rgba(234,179,8,0.4)';
  return 'rgba(34,197,94,0.4)';
}
