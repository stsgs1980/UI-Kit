'use client'

import type { ReactNode } from 'react'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@stsgs/ui/ui/alert-dialog/alert-dialog'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from '@stsgs/ui/ui/dialog/dialog'
import {
  Sheet, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle,
} from '@stsgs/ui/ui/sheet/sheet'
import {
  Drawer, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle,
} from '@stsgs/ui/ui/drawer/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@stsgs/ui/ui/popover/popover'
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@stsgs/ui/ui/command/command'
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger,
} from '@stsgs/ui/ui/context-menu/context-menu'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@stsgs/ui/ui/dropdown-menu/dropdown-menu'
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger,
} from '@stsgs/ui/ui/menubar/menubar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@stsgs/ui/ui/hover-card/hover-card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@stsgs/ui/ui/collapsible/collapsible'

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button style={{ margin: 16, padding: '6px 16px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Open Alert</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. All data will be permanently removed.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button style={{ margin: 16, padding: '6px 16px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile below.</DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input placeholder="Name" style={{ padding: 8, borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit' }} />
          <input placeholder="Email" style={{ padding: 8, borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit' }} />
        </div>
        <DialogFooter>
          <button style={{ padding: '6px 16px', borderRadius: 6, background: '#10B981', color: '#fff', border: 'none', cursor: 'pointer' }}>Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SheetDemo() {
  return (
    <div style={{ padding: 8 }}>
      <button style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Open Sheet</button>
      <div style={{ marginTop: 12, padding: 16, borderRadius: 8, border: '1px dashed #334155', fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>Sheet slides in from right/left/bottom/top</div>
    </div>
  )
}

function DrawerDemo() {
  return (
    <div style={{ padding: 8 }}>
      <button style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Open Drawer</button>
      <div style={{ marginTop: 12, padding: 16, borderRadius: 8, border: '1px dashed #334155', fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>Drawer slides up from bottom</div>
    </div>
  )
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button style={{ margin: 16, padding: '6px 16px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ padding: 4, fontSize: 14 }}>
          <p style={{ fontWeight: 500 }}>Popover Content</p>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Floating panel anchored to trigger.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function CommandDemo() {
  return (
    <Command style={{ width: 320, borderRadius: 8, border: '1px solid #334155' }}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem><span>Calendar</span></CommandItem>
          <CommandItem><span>Search Emoji</span></CommandItem>
          <CommandItem><span>Calculator</span></CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem><span>Profile</span></CommandItem>
          <CommandItem><span>Theme</span></CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

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

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button style={{ margin: 16, padding: '6px 16px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Open Menu</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

export const UI_DEMOS_OVERLAY: Record<string, () => ReactNode> = {
  'alert-dialog': () => <AlertDialogDemo />,
  'dialog': () => <DialogDemo />,
  'sheet': () => <SheetDemo />,
  'drawer': () => <DrawerDemo />,
  'popover': () => <PopoverDemo />,
  'command': () => <CommandDemo />,
  'context-menu': () => <ContextMenuDemo />,
  'dropdown-menu': () => <DropdownMenuDemo />,
  'menubar': () => <MenubarDemo />,
  'hover-card': () => <HoverCardDemo />,
  'collapsible': () => <CollapsibleDemo />,
}
