'use client'

interface Comp {
  name: string; layer: string; lines: number
  description: string; exports: string[]; hasForwardRef: boolean; hasCn: boolean
}

function getCategory(n: string): string {
  const s = n.toLowerCase()
  if (/accordion|collapsible/.test(s)) return 'accordion'
  if (/alert/.test(s)) return 'alert'
  if (/avatar/.test(s)) return 'avatar'
  if (/badge/.test(s)) return 'badge'
  if (/button/.test(s)) return 'button'
  if (/calendar/.test(s)) return 'calendar'
  if (/card|bento|pricing/.test(s)) return 'card'
  if (/carousel/.test(s)) return 'carousel'
  if (/chart|sparkline|gauge|pulse|sentiment|forecast/.test(s)) return 'chart'
  if (/checkbox|radio/.test(s)) return 'checkbox'
  if (/dialog|sheet|drawer|command/.test(s)) return 'dialog'
  if (/dropdown|context-menu|menubar/.test(s)) return 'dropdown'
  if (/form|input|textarea|select|search|otp|color-picker|label/.test(s)) return 'form'
  if (/nav|tab|breadcrumb|pagination/.test(s)) return 'navigation'
  if (/progress|slider|scroll/.test(s)) return 'progress'
  if (/table/.test(s)) return 'table'
  if (/toggle|switch|theme/.test(s)) return 'toggle'
  if (/tooltip|popover|hover-card/.test(s)) return 'tooltip'
  if (/hook|provider/.test(s)) return 'code'
  if (/section|hero|footer|navbar|cta|faq|feature|logo|newsletter|testimonial|stagger|contact|banner|cloud|browser/.test(s)) return 'section'
  return 'default'
}

const I: Record<string, React.ReactNode> = {
  accordion: <><rect x="12" y="11" width="32" height="5" rx="1.5"/><rect x="12" y="21" width="32" height="5" rx="1.5"/><rect x="12" y="31" width="32" height="5" rx="1.5"/><path d="M36 13.5l2.5 2.5-2.5 2.5"/></>,
  alert: <><rect x="10" y="14" width="36" height="28" rx="3"/><circle cx="28" cy="25" r="4"/><line x1="28" y1="31" x2="28" y2="34"/></>,
  avatar: <><circle cx="22" cy="22" r="10"/><circle cx="34" cy="22" r="10"/><circle cx="22" cy="20" r="4"/><path d="M14 32a10 10 0 0116 0"/></>,
  badge: <><rect x="8" y="18" width="18" height="10" rx="5"/><rect x="30" y="14" width="18" height="10" rx="5"/><rect x="18" y="28" width="20" height="10" rx="5"/></>,
  button: <><rect x="8" y="16" width="16" height="10" rx="2"/><rect x="32" y="16" width="16" height="10" rx="2" strokeDasharray="3 2"/><rect x="12" y="32" width="32" height="10" rx="2"/></>,
  calendar: <><rect x="10" y="12" width="36" height="32" rx="3"/><line x1="10" y1="22" x2="46" y2="22"/><line x1="20" y1="8" x2="20" y2="16"/><line x1="36" y1="8" x2="36" y2="16"/><circle cx="20" cy="30" r="1.5" fill="currentColor"/><circle cx="28" cy="30" r="1.5" fill="currentColor"/><circle cx="36" cy="30" r="1.5" fill="currentColor"/><circle cx="20" cy="38" r="1.5" fill="currentColor"/><circle cx="28" cy="38" r="1.5" fill="currentColor"/></>,
  card: <><rect x="8" y="10" width="40" height="36" rx="3"/><line x1="14" y1="18" x2="32" y2="18"/><line x1="14" y1="24" x2="42" y2="24"/><line x1="14" y1="30" x2="38" y2="30"/><line x1="14" y1="36" x2="28" y2="36"/></>,
  carousel: <><rect x="6" y="12" width="44" height="24" rx="3"/><circle cx="24" cy="42" r="2" fill="currentColor"/><circle cx="32" cy="42" r="2" opacity=".4"/><circle cx="40" cy="42" r="2" opacity=".4"/></>,
  chart: <><line x1="12" y1="44" x2="12" y2="10"/><line x1="12" y1="44" x2="48" y2="44"/><path d="M16 36l10-10 8 6 12-16"/></>,
  checkbox: <><rect x="10" y="14" width="14" height="14" rx="2"/><path d="M15 21l3 3 5-6"/><rect x="32" y="14" width="14" height="14" rx="2"/><rect x="10" y="32" width="14" height="14" rx="2"/><rect x="32" y="32" width="14" height="14" rx="2"/><path d="M37 39l3 3 5-6"/></>,
  dialog: <><rect x="8" y="10" width="40" height="36" rx="3"/><path d="M38 16l4 4-4 4" opacity=".5"/><line x1="14" y1="28" x2="42" y2="28"/><line x1="14" y1="34" x2="36" y2="34"/></>,
  dropdown: <><rect x="8" y="10" width="40" height="10" rx="2"/><rect x="8" y="24" width="40" height="8" rx="2" opacity=".6"/><rect x="8" y="36" width="40" height="8" rx="2" opacity=".4"/><path d="M36 13l3 3-3 3"/></>,
  form: <><rect x="8" y="14" width="40" height="12" rx="2"/><line x1="14" y1="20" x2="30" y2="20" opacity=".4"/><rect x="8" y="32" width="40" height="12" rx="2" opacity=".5"/><line x1="14" y1="38" x2="24" y2="38" opacity=".4"/></>,
  navigation: <><rect x="10" y="18" width="8" height="6" rx="1.5"/><rect x="24" y="18" width="8" height="6" rx="1.5" opacity=".5"/><rect x="38" y="18" width="8" height="6" rx="1.5" opacity=".5"/><line x1="14" y1="30" x2="14" y2="38" opacity=".3"/><line x1="28" y1="30" x2="28" y2="34" opacity=".3"/><line x1="42" y1="30" x2="42" y2="38" opacity=".3"/></>,
  progress: <><rect x="8" y="22" width="40" height="6" rx="3" opacity=".3"/><rect x="8" y="22" width="26" height="6" rx="3"/><rect x="8" y="34" width="40" height="6" rx="3" opacity=".3"/><rect x="8" y="34" width="16" height="6" rx="3"/></>,
  table: <><rect x="8" y="10" width="40" height="36" rx="2"/><line x1="8" y1="20" x2="48" y2="20"/><line x1="8" y1="28" x2="48" y2="28"/><line x1="8" y1="36" x2="48" y2="36"/><line x1="24" y1="10" x2="24" y2="46"/></>,
  toggle: <><rect x="10" y="16" width="36" height="10" rx="5"/><circle cx="38" cy="21" r="4" fill="currentColor"/><rect x="10" y="32" width="36" height="10" rx="5" opacity=".4"/><circle cx="18" cy="37" r="4"/></>,
  tooltip: <><rect x="12" y="8" width="32" height="16" rx="3"/><path d="M24 24l-4 8h8z"/><line x1="18" y1="16" x2="38" y2="16" opacity=".4"/></>,
  code: <><path d="M20 16l-8 12 8 12"/><path d="M36 16l8 12-8 12"/><line x1="32" y1="12" x2="24" y2="44"/></>,
  section: <><rect x="8" y="8" width="40" height="8" rx="2"/><rect x="8" y="20" width="18" height="28" rx="2" opacity=".6"/><rect x="30" y="20" width="18" height="13" rx="2" opacity=".4"/><rect x="30" y="37" width="18" height="11" rx="2" opacity=".4"/></>,
  default: <><rect x="10" y="10" width="36" height="36" rx="3"/><line x1="16" y1="18" x2="34" y2="18"/><line x1="16" y1="24" x2="40" y2="24" opacity=".5"/><line x1="16" y1="30" x2="36" y2="30" opacity=".5"/></>,
}

export function getComponentIcon(comp: Comp): React.ReactNode {
  const cat = getCategory(comp.name)
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5">
      {I[cat] ?? I.default}
    </svg>
  )
}
