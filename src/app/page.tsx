'use client'

import { ScifiCorrelationGrid } from '@/packages/ui/src/features/scifi-correlation-grid'
import type { CorrelationData, PerformanceBar } from '@/packages/ui/src/features/scifi-correlation-grid'

// ─── Demo Data ─────────────────────────────────────────────

const correlationData: CorrelationData = {
  assets: [
    { label: 'Alpha', shortLabel: 'ALP' },
    { label: 'Beta', shortLabel: 'BET' },
    { label: 'Gamma', shortLabel: 'GAM' },
    { label: 'Delta', shortLabel: 'DLT' },
    { label: 'Epsilon', shortLabel: 'EPS' },
    { label: 'Zeta', shortLabel: 'ZET' },
  ],
  matrix: [
    [ 1.00,  0.85, -0.42,  0.38, -0.15,  0.55],
    [ 0.85,  1.00, -0.35,  0.32, -0.18,  0.48],
    [-0.42, -0.35,  1.00, -0.28,  0.22, -0.30],
    [ 0.38,  0.32, -0.28,  1.00, -0.08,  0.61],
    [-0.15, -0.18,  0.22, -0.08,  1.00,  0.05],
    [ 0.55,  0.48, -0.30,  0.61,  0.05,  1.00],
  ],
}

const performanceBars: PerformanceBar[] = [
  { label: 'Energy', value: 8.2 },
  { label: 'Finance', value: 3.5 },
  { label: 'Materials', value: 5.1 },
  { label: 'Industrial', value: 2.8 },
  { label: 'Transport', value: -1.2 },
  { label: 'Technology', value: 6.7 },
  { label: 'Healthcare', value: 1.5 },
  { label: 'Real Estate', value: -2.3 },
]

// ─── Page ──────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a1e] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white">
            ScifiCorrelationGrid
          </h1>
          <p className="mt-2 text-sm font-mono text-[#7070a0]">
            Interactive NxN correlation matrix with optional performance bars
          </p>
        </div>

        {/* Split layout: matrix + bars */}
        <section className="mb-12 rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#00e5ff] mb-4">
            [ Layout: Split ]
          </h2>
          <ScifiCorrelationGrid
            data={correlationData}
            performanceBars={performanceBars}
            layout="split"
          />
        </section>

        {/* Matrix-only layout */}
        <section className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#00e5ff] mb-4">
            [ Layout: Matrix Only ]
          </h2>
          <ScifiCorrelationGrid
            data={correlationData}
            layout="matrix"
          />
        </section>
      </div>
    </div>
  )
}
