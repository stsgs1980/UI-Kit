import type { DemoConfig } from './demo-registry'

// ─── Browsing / Navigation demos ─────────────────────────

export const BROWSING_DEMOS: Record<string, DemoConfig> = {
  // ── Compare slider: CompareSliderProps { before, after, beforeLabel?, afterLabel? } ──
  'compare-slider': {
    props: {
      before: <div style={{ width: 200, height: 120, background: 'linear-gradient(135deg, #1e293b, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: 14 }}>Before State</div>,
      after: <div style={{ width: 200, height: 120, background: 'linear-gradient(135deg, #0f172a, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>After State</div>,
      beforeLabel: 'Before',
      afterLabel: 'After',
    },
  },

  // ── Column browsers ──
  'three-column-browser': {
    props: {
      categories: [{ id: 'ui', label: 'UI' }, { id: 'sections', label: 'Sections' }],
      items: [
        { id: 'btn', name: 'Button', category: 'ui' },
        { id: 'hero', name: 'Hero Section', category: 'sections' },
      ],
      selectedCategoryId: 'ui',
      filterByCategory: (item: any, catId: string) => item.category === catId,
      renderDetail: (item: any) => <div style={{ padding: 16, color: '#94A3B8' }}>{item.name} component preview</div>,
    },
  },
  'four-column-browser': {
    props: {
      categories: [{ id: 'all', label: 'All' }],
      items: [{ id: '1', name: 'Button' }],
      selectedCategoryId: 'all',
      renderPreview: (item: any) => <div style={{ padding: 16, color: '#94A3B8' }}>Preview: {item.name}</div>,
      renderCode: (item: any) => <pre style={{ padding: 16, color: '#94A3B8', fontSize: 12 }}>{`<${item.name.toLowerCase()} />`}</pre>,
    },
  },
}
