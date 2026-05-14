'use client'

import type { ReactNode } from 'react'
import { AspectRatio } from '@stsgs/ui/ui/aspect-ratio/aspect-ratio'
import { Grid, GridItem } from '@stsgs/ui/ui/grid/grid'
import { Stack } from '@stsgs/ui/ui/stack/stack'
import { Container } from '@stsgs/ui/ui/container/container'
import { Cluster } from '@stsgs/ui/ui/cluster/cluster'
import { BentoGrid, BentoItem } from '@stsgs/ui/ui/bento-grid/bento-grid'
import { MasonryGrid } from '@stsgs/ui/ui/masonry-grid/masonry-grid'
import { SearchableFilterableGrid } from '@stsgs/ui/ui/searchable-grid/searchable-grid'
import { SliderControl } from '@stsgs/ui/ui/slider-control/slider-control'
import { ColorPickerInput } from '@stsgs/ui/ui/color-picker-input/color-picker-input'
import { CopyButton } from '@stsgs/ui/ui/copy-button/copy-button'
import { CodeBlock } from '@stsgs/ui/ui/code-block/code-block'

function AspectRatioDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', gap: 16 }}>
      <div>
        <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 4 }}>16:9</div>
        <AspectRatio ratio={16 / 9} style={{ width: 200, background: '#1E293B', borderRadius: 6, overflow: 'hidden' }}>
          <img src="https://picsum.photos/seed/aspect169/400/225" alt="16:9" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </AspectRatio>
      </div>
      <div>
        <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 4 }}>4:3</div>
        <AspectRatio ratio={4 / 3} style={{ width: 140, background: '#1E293B', borderRadius: 6, overflow: 'hidden' }}>
          <img src="https://picsum.photos/seed/aspect43/400/300" alt="4:3" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </AspectRatio>
      </div>
      <div>
        <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 4 }}>1:1</div>
        <AspectRatio ratio={1} style={{ width: 120, background: '#1E293B', borderRadius: 6, overflow: 'hidden' }}>
          <img src="https://picsum.photos/seed/aspect11/300/300" alt="1:1" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </AspectRatio>
      </div>
    </div>
  )
}

function GridDemo() {
  return (
    <div style={{ padding: 16 }}>
      <Grid cols={3} gap="sm">
        <GridItem><div style={{ padding: 16, background: '#1E293B', borderRadius: 6, textAlign: 'center', fontSize: 13 }}>1</div></GridItem>
        <GridItem colSpan={2}><div style={{ padding: 16, background: '#1E293B', borderRadius: 6, textAlign: 'center', fontSize: 13 }}>2 (span 2)</div></GridItem>
        <GridItem rowSpan={2}><div style={{ padding: 16, background: '#1E293B', borderRadius: 6, textAlign: 'center', fontSize: 13, height: '100%' }}>3 (span 2)</div></GridItem>
        <GridItem><div style={{ padding: 16, background: '#1E293B', borderRadius: 6, textAlign: 'center', fontSize: 13 }}>4</div></GridItem>
      </Grid>
    </div>
  )
}

function StackDemo() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 8 }}>Vertical Stack</div>
      <Stack gap="sm">
        <div style={{ padding: 12, background: '#1E293B', borderRadius: 6, fontSize: 13 }}>Row 1</div>
        <div style={{ padding: 12, background: '#1E293B', borderRadius: 6, fontSize: 13 }}>Row 2</div>
        <div style={{ padding: 12, background: '#1E293B', borderRadius: 6, fontSize: 13 }}>Row 3</div>
      </Stack>
      <div style={{ fontSize: 10, color: '#94A3B8', margin: '12px 0 8px' }}>Horizontal Stack</div>
      <Stack direction="row" gap="sm" align="center">
        <div style={{ padding: '8px 16px', background: '#1E293B', borderRadius: 6, fontSize: 13 }}>A</div>
        <div style={{ padding: '8px 16px', background: '#1E293B', borderRadius: 6, fontSize: 13 }}>B</div>
        <div style={{ padding: '8px 16px', background: '#1E293B', borderRadius: 6, fontSize: 13 }}>C</div>
      </Stack>
    </div>
  )
}

function ContainerDemo() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: '#0F172A', borderRadius: 8, padding: 12 }}>
        <Container size="sm" padded>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', padding: '8px 0' }}>Container sm (640px max)</div>
        </Container>
        <Container size="md" padded>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', padding: '8px 0' }}>Container md (768px max)</div>
        </Container>
      </div>
    </div>
  )
}

function ClusterDemo() {
  return (
    <div style={{ padding: 16 }}>
      <Cluster gap="sm">
        <span style={{ padding: '4px 12px', background: '#1E293B', borderRadius: 100, fontSize: 12 }}>React</span>
        <span style={{ padding: '4px 12px', background: '#1E293B', borderRadius: 100, fontSize: 12 }}>TypeScript</span>
        <span style={{ padding: '4px 12px', background: '#1E293B', borderRadius: 100, fontSize: 12 }}>Tailwind</span>
        <span style={{ padding: '4px 12px', background: '#1E293B', borderRadius: 100, fontSize: 12 }}>Next.js</span>
        <span style={{ padding: '4px 12px', background: '#1E293B', borderRadius: 100, fontSize: 12 }}>Prisma</span>
      </Cluster>
    </div>
  )
}

function BentoGridDemo() {
  return (
    <div style={{ padding: 16 }}>
      <BentoGrid cols={3} gap="sm" rowHeight="80px">
        <BentoItem colSpan={2}><div style={{ height: '100%', background: '#1E293B', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>Wide</div></BentoItem>
        <BentoItem><div style={{ height: '100%', background: '#1E293B', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>1x1</div></BentoItem>
        <BentoItem rowSpan={2}><div style={{ height: '100%', background: '#1E293B', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>Tall</div></BentoItem>
        <BentoItem><div style={{ height: '100%', background: '#1E293B', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>1x1</div></BentoItem>
      </BentoGrid>
    </div>
  )
}

function MasonryGridDemo() {
  return (
    <div style={{ padding: 16 }}>
      <MasonryGrid cols={3} gap="sm">
        <div style={{ background: '#1E293B', borderRadius: 6, padding: 16, fontSize: 13 }}>Card with short content.</div>
        <div style={{ background: '#1E293B', borderRadius: 6, padding: 16, fontSize: 13 }}>Card with a bit more text that makes it taller than the first one in the column.</div>
        <div style={{ background: '#1E293B', borderRadius: 6, padding: 16, fontSize: 13 }}>Brief.</div>
        <div style={{ background: '#1E293B', borderRadius: 6, padding: 16, fontSize: 13 }}>Medium.</div>
        <div style={{ background: '#1E293B', borderRadius: 6, padding: 16, fontSize: 13 }}>This card has the longest text content so it stretches the most in the masonry layout.</div>
        <div style={{ background: '#1E293B', borderRadius: 6, padding: 16, fontSize: 13 }}>Short.</div>
      </MasonryGrid>
    </div>
  )
}

function SearchableGridDemo() {
  return (
    <div style={{ padding: 16 }}>
      <SearchableFilterableGrid
        items={[
          { id: '1', name: 'Alert', category: 'feedback' },
          { id: '2', name: 'Badge', category: 'display' },
          { id: '3', name: 'Button', category: 'input' },
          { id: '4', name: 'Card', category: 'display' },
          { id: '5', name: 'Dialog', category: 'overlay' },
          { id: '6', name: 'Input', category: 'input' },
        ]}
        categories={[{ id: 'all', name: 'All' }, { id: 'display', name: 'Display' }, { id: 'input', name: 'Input' }, { id: 'feedback', name: 'Feedback' }, { id: 'overlay', name: 'Overlay' }]}
        renderItem={(item) => (
          <div style={{ padding: '10px 14px', background: '#1E293B', borderRadius: 6, fontSize: 13 }}>{item.name}</div>
        )}
        columns={{ md: 2, lg: 3 }}
        showSearch
        showTabs
      />
    </div>
  )
}

function SliderControlDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 280 }}>
      <SliderControl label="Gap" value={24} onChange={() => {}} min={0} max={48} unit="px" />
      <SliderControl label="Opacity" value={85} onChange={() => {}} min={0} max={100} unit="%" />
      <SliderControl label="Radius" value={8} onChange={() => {}} min={0} max={32} unit="px" />
    </div>
  )
}

function ColorPickerDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 280 }}>
      <ColorPickerInput label="Primary" value="#10B981" onChange={() => {}} />
      <ColorPickerInput label="Accent" value="#F59E0B" onChange={() => {}} />
    </div>
  )
}

function CopyButtonDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CopyButton text="npm install @stsgs/ui" />
      <CopyButton text="npx create-next-app@latest my-app" />
    </div>
  )
}

export const UI_DEMOS_LAYOUT: Record<string, () => ReactNode> = {
  'aspect-ratio': () => <AspectRatioDemo />,
  'grid': () => <GridDemo />,
  'stack': () => <StackDemo />,
  'container': () => <ContainerDemo />,
  'cluster': () => <ClusterDemo />,
  'bento-grid': () => <BentoGridDemo />,
  'masonry-grid': () => <MasonryGridDemo />,
  'searchable-grid': () => <SearchableGridDemo />,
  'slider-control': () => <SliderControlDemo />,
  'color-picker-input': () => <ColorPickerDemo />,
  'copy-button': () => <CopyButtonDemo />,
  'code-block': () => (
    <div style={{ padding: 16 }}>
      <CodeBlock code="const greet = (name: string) => `Hello, ${name}!`" language="typescript" showLineNumbers />
    </div>
  ),
}
