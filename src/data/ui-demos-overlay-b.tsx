'use client'

import type { ReactNode } from 'react'
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger,
} from '@stsgs/ui/ui/context-menu/context-menu'
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger,
} from '@stsgs/ui/ui/menubar/menubar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@stsgs/ui/ui/hover-card/hover-card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@stsgs/ui/ui/collapsible/collapsible'

function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div style={{ padding: 24, textAlign: 'center', fontSize: 13, border: '1px dashed #334155', borderRadius: 8, margin: 16 }}>Right-click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>View Source</ContextMenuItem>
        <ContextMenuItem>Inspect</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>Open</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}

function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span style={{ margin: 16, fontSize: 14, textDecoration: 'underline', cursor: 'pointer' }}>Hover over me</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ fontSize: 14 }}>
          <p style={{ fontWeight: 500 }}>Hover Card Title</p>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Additional info on hover.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen>
      <div style={{ padding: 16 }}>
        <CollapsibleTrigger style={{ display: 'block', width: '100%', padding: 8, borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 500 }}>@stsgs/ui Documentation</CollapsibleTrigger>
        <CollapsibleContent>
          <div style={{ marginTop: 8, padding: 12, borderRadius: 6, fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>A foundation component library with 155 components across 5 layers: ui, sections, features, hooks, providers.</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

export const UI_DEMOS_OVERLAY_B: Record<string, () => ReactNode> = {
  'context-menu': () => <ContextMenuDemo />,
  'menubar': () => <MenubarDemo />,
  'hover-card': () => <HoverCardDemo />,
  'collapsible': () => <CollapsibleDemo />,
}
