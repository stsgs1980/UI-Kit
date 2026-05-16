/**
 * Golden Grid Pattern Types
 *
 * Each pattern demonstrates a CSS Grid layout based on
 * the golden ratio (phi = 1.618) or Fibonacci sequence.
 */

export type PatternId = 'phi' | 'split' | 'fib' | 'bento' | '12col' | 'spiral'

export interface PatternVariant {
  name: string
  cssCode: string
  columns: string
  rows?: string
}

export interface PatternDefinition {
  id: PatternId
  label: string
  tagline: string
  number: string
  description: string
  mainVariant: PatternVariant
  variants: PatternVariant[]
}

export const PATTERN_IDS: PatternId[] = ['phi', 'split', 'fib', 'bento', '12col', 'spiral']

export const PATTERN_META: Record<PatternId, PatternDefinition> = {
  phi: {
    id: 'phi',
    label: 'Phi Grid',
    tagline: '1 : 1.618',
    number: '01',
    description:
      'The fundamental golden ratio grid. Two columns split at the divine proportion — the sidebar occupies 38.2% while the content area takes 61.8%. This ratio, found in nautilus shells and sunflower seeds, creates a natural visual hierarchy that guides the eye from focus to dominance.',
    mainVariant: {
      name: 'Phi Classic',
      cssCode: `.phi-grid {\n  display: grid;\n  grid-template-columns: 1fr 1.618fr;\n  gap: 0;\n}`,
      columns: '1fr 1.618fr',
    },
    variants: [
      {
        name: 'Phi Inverse',
        cssCode: `.phi-inverse {\n  display: grid;\n  grid-template-columns: 1.618fr 1fr;\n  gap: 0;\n}`,
        columns: '1.618fr 1fr',
      },
      {
        name: 'Phi Thirds',
        cssCode: `.phi-thirds {\n  display: grid;\n  grid-template-columns: 1fr 1.618fr 1.618fr;\n  gap: 0;\n}`,
        columns: '1fr 1.618fr 1.618fr',
      },
    ],
  },

  split: {
    id: 'split',
    label: 'Golden Split',
    tagline: '38.2% / 61.8%',
    number: '02',
    description:
      'A practical layout pattern that applies the golden split to real content. The sidebar serves as a focus zone — an anchor for navigation, metadata, or calls to action. The dominant content area holds primary information. The ratio emerges from subtracting 1 from phi: 1/phi = 0.618, so the smaller portion is 1 - 0.618 = 0.382.',
    mainVariant: {
      name: 'Golden Split',
      cssCode: `.golden-split {\n  display: grid;\n  grid-template-columns: 1fr 1.618fr;\n  min-height: 400px;\n}`,
      columns: '1fr 1.618fr',
    },
    variants: [
      {
        name: 'Split Inverse',
        cssCode: `.split-inverse {\n  display: grid;\n  grid-template-columns: 1.618fr 1fr;\n  min-height: 400px;\n}`,
        columns: '1.618fr 1fr',
      },
      {
        name: 'Split Deep',
        cssCode: `.split-deep {\n  display: grid;\n  grid-template-columns: 1fr 1.618fr;\n  grid-template-rows: 1.618fr 1fr;\n  gap: 1px;\n}`,
        columns: '1fr 1.618fr',
        rows: '1.618fr 1fr',
      },
    ],
  },

  fib: {
    id: 'fib',
    label: 'Fibonacci Grid',
    tagline: '1 : 1 : 2 : 3 : 5 : 8',
    number: '03',
    description:
      'Column widths directly from the Fibonacci sequence. Each column grows by the sum of its two predecessors, creating an organic progression that mirrors natural growth patterns. The ratios between adjacent columns converge toward phi, making this grid inherently harmonious.',
    mainVariant: {
      name: 'Fibonacci Classic',
      cssCode: `.fib-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 2fr 3fr 5fr;\n  gap: 1px;\n}`,
      columns: '1fr 1fr 2fr 3fr 5fr',
    },
    variants: [
      {
        name: 'Fibonacci Triple',
        cssCode: `.fib-triple {\n  display: grid;\n  grid-template-columns: 2fr 3fr 5fr;\n  gap: 1px;\n}`,
        columns: '2fr 3fr 5fr',
      },
      {
        name: 'Fibonacci Tall',
        cssCode: `.fib-tall {\n  display: grid;\n  grid-template-columns: 1fr 1fr 2fr 3fr;\n  grid-template-rows: 2fr 3fr 5fr;\n  gap: 1px;\n}`,
        columns: '1fr 1fr 2fr 3fr',
        rows: '2fr 3fr 5fr',
      },
    ],
  },

  bento: {
    id: 'bento',
    label: 'Bento Grid',
    tagline: '1.618 x 1.618',
    number: '04',
    description:
      'Asymmetric card layout where feature cells span golden-ratio multiples of the base unit. The largest card is phi-squared (2.618) times the smallest, creating a clear visual hierarchy without rigid uniformity. Inspired by Japanese bento box arrangements and modern dashboard design.',
    mainVariant: {
      name: 'Bento Classic',
      cssCode: `.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto;\n  grid-auto-rows: 1fr;\n  gap: 2px;\n}\n.bento-grid .featured {\n  grid-column: span 2;\n  grid-row: span 2;\n}`,
      columns: 'repeat(3, 1fr)',
    },
    variants: [
      {
        name: 'Bento Wide',
        cssCode: `.bento-wide {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-rows: 1fr;\n  gap: 2px;\n}\n.bento-wide .hero {\n  grid-column: span 3;\n  grid-row: span 2;\n}`,
        columns: 'repeat(4, 1fr)',
      },
      {
        name: 'Bento Masonry',
        cssCode: `.bento-masonry {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: 80px;\n  gap: 2px;\n}\n.bento-masonry .tall {\n  grid-row: span 2;\n}\n.bento-masonry .tall-phi {\n  grid-row: span 3;\n}`,
        columns: 'repeat(3, 1fr)',
      },
    ],
  },

  '12col': {
    id: '12col',
    label: '12-Column Grid',
    tagline: '4.7 + 7.3 = 12',
    number: '05',
    description:
      'The classic 12-column grid enhanced with golden ratio column spans. Instead of equal halves, the golden split gives 5 columns to the sidebar and 7 to content (the closest integer approximation of phi). Common breakpoints: 5/7 (close to phi), 4/8, 3/9 for nested layouts.',
    mainVariant: {
      name: '12-Col Golden',
      cssCode: `.grid-12 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 0;\n}\n.sidebar  { grid-column: span 5; }\n.content  { grid-column: span 7; }`,
      columns: 'repeat(12, 1fr)',
    },
    variants: [
      {
        name: '12-Col Fibonacci',
        cssCode: `.grid-12-fib {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 0;\n}\n.col-3 { grid-column: span 3; }\n.col-5 { grid-column: span 5; }\n.col-8 { grid-column: span 8; }`,
        columns: 'repeat(12, 1fr)',
      },
      {
        name: '12-Col Nested',
        cssCode: `.grid-12-nested {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: auto auto;\n  gap: 1px;\n}\n.navbar { grid-column: 1 / -1; }\n.main   { grid-column: span 8; }\n.side   { grid-column: span 4; }`,
        columns: 'repeat(12, 1fr)',
        rows: 'auto auto',
      },
    ],
  },

  spiral: {
    id: 'spiral',
    label: 'Spiral Grid',
    tagline: 'phi-approximation',
    number: '06',
    description:
      'A grid layout that visually approximates the golden spiral. Cell sizes decrease following the Fibonacci sequence from outside to inside, creating a natural inward flow. The largest outer cell anchors the composition, while progressively smaller cells create visual depth and a sense of infinite recession.',
    mainVariant: {
      name: 'Spiral Outward',
      cssCode: `.spiral-grid {\n  display: grid;\n  grid-template-columns: 8fr 5fr 3fr;\n  grid-template-rows: 8fr 5fr 3fr;\n  gap: 1px;\n}\n.spiral-grid .outer {\n  grid-column: 1 / 3;\n  grid-row: 1 / 3;\n}`,
      columns: '8fr 5fr 3fr',
      rows: '8fr 5fr 3fr',
    },
    variants: [
      {
        name: 'Spiral Corner',
        cssCode: `.spiral-corner {\n  display: grid;\n  grid-template-columns: 5fr 3fr 2fr;\n  grid-template-rows: 5fr 3fr 2fr;\n  gap: 1px;\n}\n.spiral-corner .anchor {\n  grid-column: 1 / 3;\n  grid-row: 1 / 3;\n}`,
        columns: '5fr 3fr 2fr',
        rows: '5fr 3fr 2fr',
      },
      {
        name: 'Spiral Diagonal',
        cssCode: `.spiral-diagonal {\n  display: grid;\n  grid-template-columns: 8fr 5fr 3fr 2fr;\n  grid-template-rows: 8fr 5fr 3fr 2fr;\n  gap: 1px;\n}\n.spiral-diagonal .major {\n  grid-column: 1 / 3;\n  grid-row: 1 / 3;\n}\n.spiral-diagonal .minor {\n  grid-column: 3 / 5;\n  grid-row: 3 / 5;\n}`,
        columns: '8fr 5fr 3fr 2fr',
        rows: '8fr 5fr 3fr 2fr',
      },
    ],
  },
}
