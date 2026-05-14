'use client'

import type { ReactNode } from 'react'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from '@stsgs/ui/ui/breadcrumb/breadcrumb'
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from '@stsgs/ui/ui/navigation-menu/navigation-menu'
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious,
} from '@stsgs/ui/ui/pagination/pagination'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@stsgs/ui/ui/select/select'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@stsgs/ui/ui/input-otp/input-otp'
import {
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
} from '@stsgs/ui/ui/resizable/resizable'
import { ToggleGroup, ToggleGroupItem } from '@stsgs/ui/ui/toggle-group/toggle-group'

function BreadcrumbDemo() {
  return (
    <div style={{ padding: 16 }}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Introduction</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>Components</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>Themes</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function PaginationDemo() {
  return (
    <div style={{ padding: 16 }}>
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function SelectDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Select defaultValue="react">
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function InputOtpDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

function ResizableDemo() {
  return (
    <ResizablePanelGroup direction="horizontal" style={{ height: 160 }}>
      <ResizablePanel defaultSize={50}>
        <div style={{ padding: 16, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #334155', fontSize: 13 }}>Panel A</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div style={{ padding: 16, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>Panel B</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

function ToggleGroupDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" defaultValue={['bold']}>
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
        <ToggleGroupItem value="underline">U</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

// Form needs react-hook-form context — show static form layout instead
function FormDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
      <div>
        <label style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 4 }}>Name</label>
        <input placeholder="John Doe" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
      </div>
      <div>
        <label style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 4 }}>Email</label>
        <input placeholder="john@example.com" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
      </div>
      <button style={{ padding: '8px 16px', borderRadius: 6, background: '#10B981', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14 }}>Submit</button>
    </div>
  )
}

export const UI_DEMOS_NAV: Record<string, () => ReactNode> = {
  'breadcrumb': () => <BreadcrumbDemo />,
  'navigation-menu': () => <NavigationMenuDemo />,
  'pagination': () => <PaginationDemo />,
  'select': () => <SelectDemo />,
  'input-otp': () => <InputOtpDemo />,
  'form': () => <FormDemo />,
  'toggle-group': () => <ToggleGroupDemo />,
  'resizable': () => <ResizableDemo />,
}
