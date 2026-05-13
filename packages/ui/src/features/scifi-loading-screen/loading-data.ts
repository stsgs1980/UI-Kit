// ─── Types ────────────────────────────────────────────────────

/** Progress milestone with status text */
export interface LoadingMilestone {
  /** Minimum progress percentage to trigger this status */
  at: number
  /** Status text to display */
  text: string
}

// ─── Constants ────────────────────────────────────────────────

/** Default data stream lines for the background */
export const DEFAULT_STREAM_LINES = [
  'SYS::INIT > CORE MODULE v3.7.1',
  'GPS::LOCK > SIGNAL ACQUIRED',
  'SAT::FEED > LEO-14 SIGNAL OK',
  'DATA::SYNC > STREAM CONNECTED',
  'NAV::ROUTE > ACTIVE MONITORING',
  'RADAR::SCAN > 12 CONTACTS DETECTED',
  'ALERT::LEVEL > ELEVATED (ORANGE)',
  'FLEET::STATUS > 47 UNITS TRACKED',
  'CRYPTO::COMMS > AES-256 ENCRYPTED',
  'SAT::IMAGERY > UPDATE IN 00:14:32',
  'SYS::HEALTH > CPU 12% | MEM 340MB | TEMP 42°C',
  'NET::LATENCY > 23ms PRIMARY | 89ms BACKUP',
  'SCAN::PERIMETER > CLEAR [SECTOR A-F]',
  'AI::FORECAST > 73% CONFIDENCE BASELINE',
]

/** Default status milestones */
export const DEFAULT_MILESTONES: LoadingMilestone[] = [
  { at: 0, text: 'INITIALIZING SYSTEM...' },
  { at: 20, text: 'LOADING DATA...' },
  { at: 45, text: 'SYNCING MODULES...' },
  { at: 70, text: 'ANALYZING RISKS...' },
  { at: 90, text: 'CONNECTING MONITOR...' },
  { at: 100, text: 'SYSTEM ACTIVE' },
]

/** Pre-computed side decoration bars (deterministic, no Math.random) */
export const LEFT_BARS = Array.from({ length: 20 }, (_, i) => ({
  w: Math.round(20 + Math.sin(i * 0.8) * 15),
  c: i % 2 === 0 ? '#00e5ff' : '#ff6b00',
}))

export const RIGHT_BARS = Array.from({ length: 20 }, (_, i) => ({
  w: Math.round(20 + Math.cos(i * 0.8) * 15),
  c: i % 2 === 0 ? '#ff6b00' : '#00e5ff',
}))
