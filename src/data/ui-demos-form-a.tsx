'use client'

import type { ReactNode } from 'react'

// ─── Checkbox ───────────────────────────────────────────────
import { Checkbox } from '@stsgs/ui/ui/checkbox/checkbox'

function CheckboxDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <Checkbox defaultChecked /> Accept terms
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <Checkbox /> Remember me
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <Checkbox disabled /> Disabled
      </label>
    </div>
  )
}

// ─── Input ──────────────────────────────────────────────────
import { Input } from '@stsgs/ui/ui/input/input'

function InputDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, width: '100%', maxWidth: 300 }}>
      <Input placeholder="Enter your email..." />
      <Input placeholder="Password" type="password" defaultValue="secret" />
      <Input placeholder="Disabled input" disabled />
    </div>
  )
}

// ─── Label ──────────────────────────────────────────────────
import { Label } from '@stsgs/ui/ui/label/label'

function LabelDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <Label htmlFor="email">Email</Label>
      <Label htmlFor="pass">Password</Label>
      <Label htmlFor="name" style={{ color: '#94A3B8' }}>Disabled Label</Label>
    </div>
  )
}

// ─── Progress ───────────────────────────────────────────────
import { Progress } from '@stsgs/ui/ui/progress/progress'

function ProgressDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, width: '100%', maxWidth: 300 }}>
      <Progress value={33} /><Progress value={66} /><Progress value={100} />
    </div>
  )
}

// ─── Radio Group ────────────────────────────────────────────
import { RadioGroup, RadioGroupItem } from '@stsgs/ui/ui/radio-group/radio-group'

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="a" style={{ padding: 16 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <RadioGroupItem value="a" /> Option A
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <RadioGroupItem value="b" /> Option B
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <RadioGroupItem value="c" /> Option C
      </label>
    </RadioGroup>
  )
}

// ─── Separator ──────────────────────────────────────────────
import { Separator } from '@stsgs/ui/ui/separator/separator'

function SeparatorDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, width: '100%', maxWidth: 300 }}>
      <span style={{ fontSize: 14 }}>Item 1</span><Separator />
      <span style={{ fontSize: 14 }}>Item 2</span><Separator />
      <span style={{ fontSize: 14 }}>Item 3</span>
    </div>
  )
}

export const UI_DEMOS_FORM_A: Record<string, () => ReactNode> = {
  'checkbox': () => <CheckboxDemo />,
  'input': () => <InputDemo />,
  'label': () => <LabelDemo />,
  'progress': () => <ProgressDemo />,
  'radio-group': () => <RadioGroupDemo />,
  'separator': () => <SeparatorDemo />,
}
