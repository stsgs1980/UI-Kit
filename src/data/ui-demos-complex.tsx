'use client'

import type { ReactNode } from 'react'
import { Calendar } from '@stsgs/ui/ui/calendar/calendar'
import {
  type CarouselApi, Carousel, CarouselContent,
  CarouselItem, CarouselNext, CarouselPrevious,
} from '@stsgs/ui/ui/carousel/carousel'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@stsgs/ui/ui/sidebar/sidebar'
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from '@stsgs/ui/ui/chart/chart'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { Layout } from '@stsgs/ui/ui/layout/layout'
import { ColumnBrowser } from '@stsgs/ui/ui/column-browser/column-browser'

function CalendarDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <Calendar mode="single" selected={new Date(2026, 4, 14)} />
    </div>
  )
}

function CarouselDemo() {
  const slides = [
    { title: 'Slide 1', color: '#10B981' },
    { title: 'Slide 2', color: '#3B82F6' },
    { title: 'Slide 3', color: '#8B5CF6' },
    { title: 'Slide 4', color: '#F59E0B' },
  ]
  return (
    <div style={{ padding: 16 }}>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {slides.map(s => (
            <CarouselItem key={s.title} style={{ flexBasis: '80%' }}>
              <div style={{ background: `${s.color}20`, border: `1px solid ${s.color}40`, borderRadius: 8, padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: s.color }}>{s.title}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

function SidebarDemo() {
  return (
    <div style={{ padding: 16 }}>
      <SidebarProvider>
        <div style={{ display: 'flex', height: 200, width: '100%', borderRadius: 8, overflow: 'hidden', border: '1px solid #334155' }}>
          <Sidebar>
            <SidebarHeader style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>Studio</SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {['Layouts', 'Themes', 'Components', 'Settings'].map(label => (
                      <SidebarMenuItem key={label}>
                        <SidebarMenuButton>{label}</SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div style={{ flex: 1, padding: 16, fontSize: 13, color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Main Content Area</div>
        </div>
      </SidebarProvider>
    </div>
  )
}

const chartData = [
  { month: 'Jan', visitors: 186 },
  { month: 'Feb', visitors: 305 },
  { month: 'Mar', visitors: 237 },
  { month: 'Apr', visitors: 420 },
  { month: 'May', visitors: 390 },
]
const chartConfig = { visitors: { label: 'Visitors', color: '#10B981' } }

function ChartDemo() {
  return (
    <div style={{ padding: 16 }}>
      <ChartContainer config={chartConfig} style={{ width: '100%', height: 180 }}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="visitors" fill="var(--color-visitors)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

function LayoutDemo() {
  return (
    <div style={{ padding: 16 }}>
      <Layout structure="holy-grail" gap="sm" minHeight="180px">
        <Layout.Slot name="header">
          <div style={{ background: '#10B98120', border: '1px solid #10B98140', borderRadius: 6, padding: '10px 16px', textAlign: 'center', fontSize: 12, fontWeight: 500 }}>Header</div>
        </Layout.Slot>
        <Layout.Slot name="sidebar">
          <div style={{ background: '#3B82F620', border: '1px solid #3B82F640', borderRadius: 6, padding: 12, textAlign: 'center', fontSize: 12 }}>Sidebar</div>
        </Layout.Slot>
        <Layout.Slot name="main">
          <div style={{ background: '#8B5CF620', border: '1px solid #8B5CF640', borderRadius: 6, padding: 12, textAlign: 'center', fontSize: 12, flex: 1 }}>Main Content</div>
        </Layout.Slot>
        <Layout.Slot name="footer">
          <div style={{ background: '#F59E0B20', border: '1px solid #F59E0B40', borderRadius: 6, padding: '8px 16px', textAlign: 'center', fontSize: 12 }}>Footer</div>
        </Layout.Slot>
      </Layout>
    </div>
  )
}

function ColumnBrowserDemo() {
  return (
    <div style={{ padding: 0, height: 220 }}>
      <ColumnBrowser
        columns={2}
        categories={[
          {
            id: 'components', name: 'Components', items: [
              { id: 'btn', name: 'Button', description: 'Clickable element with multiple variants and sizes.' },
              { id: 'inp', name: 'Input', description: 'Text input with built-in validation states.' },
              { id: 'sel', name: 'Select', description: 'Dropdown selection with search support.' },
            ],
          },
          {
            id: 'layout', name: 'Layout', items: [
              { id: 'grid', name: 'Grid', description: 'CSS Grid with responsive column breakpoints.' },
              { id: 'stack', name: 'Stack', description: 'Vertical or horizontal flex container.' },
            ],
          },
        ]}
        renderDetail={(item) => (
          <div>
            <h3 className="text-lg font-bold mb-2">{item.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            <div className="mt-4 flex gap-2">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-foreground/5 rounded-full">{item.id}</span>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-600 rounded-full">Active</span>
            </div>
          </div>
        )}
      />
    </div>
  )
}

// ForceGraph needs data — show static placeholder
function ForceGraphDemo() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ height: 160, background: '#0F172A', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1E293B' }}>
        <div style={{ textAlign: 'center', fontSize: 12, color: '#64748B' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>o---o---o</div>
          <div>Force-directed graph visualization</div>
          <div style={{ marginTop: 4, fontSize: 10 }}>Nodes + Edges + Physics simulation</div>
        </div>
      </div>
    </div>
  )
}

// Sonner / Toast / Toaster — show static toast-like elements
function SonnerDemo() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ padding: '10px 16px', background: '#10B98115', border: '1px solid #10B98130', borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#10B981' }}>[ok]</span> Event created successfully
      </div>
      <div style={{ padding: '10px 16px', background: '#EF444415', border: '1px solid #EF444430', borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#EF4444' }}>[err]</span> Failed to save changes
      </div>
      <div style={{ padding: '10px 16px', background: '#F59E0B15', border: '1px solid #F59E0B30', borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#F59E0B' }}>[warn]</span> Session expires in 5 min
      </div>
    </div>
  )
}

export const UI_DEMOS_COMPLEX: Record<string, () => ReactNode> = {
  'calendar': () => <CalendarDemo />,
  'carousel': () => <CarouselDemo />,
  'sidebar': () => <SidebarDemo />,
  'chart': () => <ChartDemo />,
  'layout': () => <LayoutDemo />,
  'column-browser': () => <ColumnBrowserDemo />,
  'force-graph': () => <ForceGraphDemo />,
  'sonner': () => <SonnerDemo />,
  'toast': () => <SonnerDemo />,
  'toaster': () => <SonnerDemo />,
}
