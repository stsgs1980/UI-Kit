/**
 * PatternDemo — routes to the correct visual demo component by pattern ID.
 */
'use client'

import type { PatternId } from './types'
import { PhiGridDemo } from './phi-demo'
import { SplitGridDemo } from './split-demo'
import { FibGridDemo } from './fib-demo'
import { BentoGridDemo } from './bento-demo'
import { TwelveColGridDemo } from './twelve-col-demo'
import { SpiralGridDemo } from './spiral-demo'

export function PatternDemo({ id, variant }: { id: PatternId; variant: string }) {
  switch (id) {
    case 'phi':
      return <PhiGridDemo />
    case 'split':
      return <SplitGridDemo variant={variant as 'classic' | 'inverse' | 'deep'} />
    case 'fib':
      return <FibGridDemo variant={variant as 'classic' | 'triple' | 'tall'} />
    case 'bento':
      return <BentoGridDemo variant={variant as 'classic' | 'wide' | 'masonry'} />
    case '12col':
      return <TwelveColGridDemo variant={variant as 'golden' | 'fibonacci' | 'nested'} />
    case 'spiral':
      return <SpiralGridDemo variant={variant as 'outward' | 'corner' | 'diagonal'} />
    default:
      return null
  }
}
