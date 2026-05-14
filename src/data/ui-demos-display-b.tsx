'use client'

import type { ReactNode } from 'react'

// ─── SectionHeader ───────────────────────────────────────────
import { SectionHeader } from '@stsgs/ui/ui/section-header/section-header'

function SectionHeaderDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <SectionHeader num="01" title="Getting Started" subtitle="Set up your project in minutes" />
      <SectionHeader num="02" title="Components" level={3} subtitle="Browse the full catalog" />
    </div>
  )
}

// ─── StatusDot ───────────────────────────────────────────────
import { StatusDot } from '@stsgs/ui/ui/status-dot/status-dot'

function StatusDotDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <StatusDot variant="active" label="Online" />
        <StatusDot variant="warning" label="Slow" />
        <StatusDot variant="error" label="Down" />
        <StatusDot variant="info" label="Syncing" />
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        <StatusDot variant="active" label="Deployed" size={10} />
        <StatusDot variant="error" label="Failed" size={10} showIcon={false} />
      </div>
    </div>
  )
}

// ─── Skeleton ───────────────────────────────────────────────
import { Skeleton } from '@stsgs/ui/ui/skeleton/skeleton'

function SkeletonDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, width: '100%', maxWidth: 300 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <Skeleton style={{ height: 14, width: '60%' }} />
          <Skeleton style={{ height: 12, width: '40%' }} />
        </div>
      </div>
      <Skeleton style={{ height: 100, width: '100%' }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <Skeleton style={{ height: 32, width: 80, borderRadius: 6 }} />
        <Skeleton style={{ height: 32, width: 80, borderRadius: 6 }} />
      </div>
    </div>
  )
}

// ─── Table ──────────────────────────────────────────────────
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@stsgs/ui/ui/table/table'

function TableDemo() {
  return (
    <Table style={{ maxWidth: 360 }}>
      <TableHeader>
        <TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Role</TableHead></TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Alex</TableCell><TableCell>Active</TableCell><TableCell>Admin</TableCell></TableRow>
        <TableRow><TableCell>Maria</TableCell><TableCell>Active</TableCell><TableCell>Editor</TableCell></TableRow>
        <TableRow><TableCell>James</TableCell><TableCell>Inactive</TableCell><TableCell>Viewer</TableCell></TableRow>
      </TableBody>
    </Table>
  )
}

// ─── Tabs ───────────────────────────────────────────────────
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@stsgs/ui/ui/tabs/tabs'

function TabsDemo() {
  return (
    <Tabs defaultValue="tab-1" style={{ width: '100%', maxWidth: 360 }}>
      <TabsList>
        <TabsTrigger value="tab-1">Preview</TabsTrigger>
        <TabsTrigger value="tab-2">Code</TabsTrigger>
        <TabsTrigger value="tab-3">Props</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1"><p style={{ padding: 16, fontSize: 14 }}>Preview content panel.</p></TabsContent>
      <TabsContent value="tab-2"><p style={{ padding: 16, fontSize: 14, fontFamily: 'monospace' }}>{"<Component />"}</p></TabsContent>
      <TabsContent value="tab-3"><p style={{ padding: 16, fontSize: 14 }}>Props documentation.</p></TabsContent>
    </Tabs>
  )
}

// ─── Tooltip ────────────────────────────────────────────────
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@stsgs/ui/ui/tooltip/tooltip'

function TooltipDemo() {
  return (
    <TooltipProvider>
      <div style={{ display: 'flex', gap: 16, padding: 24 }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #334155', background: 'transparent', color: '#e2e8f0', fontSize: 14, cursor: 'pointer' }}>Hover me</button>
          </TooltipTrigger>
          <TooltipContent><p>This is a tooltip</p></TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export const UI_DEMOS_DISPLAY_B: Record<string, () => ReactNode> = {
  'section-header': () => <SectionHeaderDemo />,
  'status-dot': () => <StatusDotDemo />,
  'skeleton': () => <SkeletonDemo />,
  'table': () => <TableDemo />,
  'tabs': () => <TabsDemo />,
  'tooltip': () => <TooltipDemo />,
}
