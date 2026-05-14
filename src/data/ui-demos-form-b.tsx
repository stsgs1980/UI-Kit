'use client'

import type { ReactNode } from 'react'

// ─── Slider ─────────────────────────────────────────────────
import { Slider } from '@stsgs/ui/ui/slider/slider'

function SliderDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 16, width: '100%', maxWidth: 300 }}>
      <Slider defaultValue={[33]} /><Slider defaultValue={[50, 75]} />
    </div>
  )
}

// ─── Switch ─────────────────────────────────────────────────
import { Switch } from '@stsgs/ui/ui/switch/switch'

function SwitchDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <Switch defaultChecked /> Dark mode
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <Switch /> Notifications
      </label>
    </div>
  )
}

// ─── Textarea ───────────────────────────────────────────────
import { Textarea } from '@stsgs/ui/ui/textarea/textarea'

function TextareaDemo() {
  return (
    <div style={{ padding: 16, width: '100%', maxWidth: 300 }}>
      <Textarea placeholder="Write your message here..." defaultValue="Hello World" />
    </div>
  )
}

// ─── Toggle ─────────────────────────────────────────────────
import { Toggle } from '@stsgs/ui/ui/toggle/toggle'

function ToggleDemo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16 }}>
      <Toggle>Bold</Toggle><Toggle>Italic</Toggle><Toggle variant="outline">Outline</Toggle>
    </div>
  )
}

// ─── Scroll Area ────────────────────────────────────────────
import { ScrollArea } from '@stsgs/ui/ui/scroll-area/scroll-area'

function ScrollAreaDemo() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
  return (
    <ScrollArea style={{ height: 160, width: '100%', maxWidth: 300 }}>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '8px 12px', fontSize: 14, borderRadius: 6, border: '1px solid #334155' }}>{item}</div>
        ))}
      </div>
    </ScrollArea>
  )
}

export const UI_DEMOS_FORM_B: Record<string, () => ReactNode> = {
  'slider': () => <SliderDemo />,
  'switch': () => <SwitchDemo />,
  'textarea': () => <TextareaDemo />,
  'toggle': () => <ToggleDemo />,
  'scroll-area': () => <ScrollAreaDemo />,
}
