'use client'

import type { ReactNode } from 'react'

// ─── Accordion ──────────────────────────────────────────────
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@stsgs/ui/ui/accordion/accordion'

function AccordionDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content for section 1. This is a collapsible panel.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content for section 2. Click to toggle.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Section 3</AccordionTrigger>
          <AccordionContent>Content for section 3. Multiple items supported.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

// ─── Alert ──────────────────────────────────────────────────
import { Alert, AlertTitle, AlertDescription } from '@stsgs/ui/ui/alert/alert'

function AlertDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert><AlertTitle>Default Alert</AlertTitle><AlertDescription>Standard notification.</AlertDescription></Alert>
      <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong.</AlertDescription></Alert>
    </div>
  )
}

// ─── Avatar ─────────────────────────────────────────────────
import { Avatar, AvatarFallback, AvatarImage } from '@stsgs/ui/ui/avatar/avatar'

function AvatarDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16 }}>
      <Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>MS</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>JL</AvatarFallback></Avatar>
      <Avatar><AvatarImage src="" alt="User" /><AvatarFallback>U</AvatarFallback></Avatar>
    </div>
  )
}

// ─── Badge ──────────────────────────────────────────────────
import { Badge } from '@stsgs/ui/ui/badge/badge'

function BadgeDemo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16 }}>
      <Badge>Default</Badge><Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge><Badge variant="outline">Outline</Badge>
    </div>
  )
}

// ─── Button ─────────────────────────────────────────────────
import { Button } from '@stsgs/ui/ui/button/button'

function ButtonDemo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16 }}>
      <Button>Default</Button><Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button><Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button><Button size="sm">Small</Button><Button size="lg">Large</Button>
    </div>
  )
}

// ─── Card ───────────────────────────────────────────────────
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@stsgs/ui/ui/card/card'

function CardDemo() {
  return (
    <Card style={{ width: 320 }}>
      <CardHeader><CardTitle>Card Title</CardTitle><CardDescription>Card description goes here.</CardDescription></CardHeader>
      <CardContent><p style={{ fontSize: 14, color: '#94A3B8' }}>Card body with sample content.</p></CardContent>
      <CardFooter><Button size="sm">Action</Button></CardFooter>
    </Card>
  )
}

export const UI_DEMOS_DISPLAY_A: Record<string, () => ReactNode> = {
  'accordion': () => <AccordionDemo />,
  'alert': () => <AlertDemo />,
  'avatar': () => <AvatarDemo />,
  'badge': () => <BadgeDemo />,
  'button': () => <ButtonDemo />,
  'card': () => <CardDemo />,
}
