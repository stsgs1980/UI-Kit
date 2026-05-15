'use client'

import { useState } from 'react'

export type ViewTab = 'preview' | 'code' | 'docs' | 'playground'
export type ViewMode = 'grid' | 'list'

interface FilterState {
  selectedCategory: string | null
  activeLayer: string
  activeComponent: string
  viewTab: ViewTab
  viewMode: ViewMode
  searchQuery: string
}

const initialFilters: FilterState = {
  selectedCategory: null,
  activeLayer: '',
  activeComponent: '',
  viewTab: 'preview',
  viewMode: 'grid',
  searchQuery: '',
}

export function useExplorerFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const setSelectedCategory = (v: string | null) => setFilters(f => ({ ...f, selectedCategory: v }))
  const setActiveLayer = (v: string) => setFilters(f => ({ ...f, activeLayer: v, activeComponent: '' }))
  const setActiveComponent = (v: string) => setFilters(f => ({ ...f, activeComponent: v }))
  const setViewTab = (v: ViewTab) => setFilters(f => ({ ...f, viewTab: v }))
  const setViewMode = (v: ViewMode) => setFilters(f => ({ ...f, viewMode: v }))
  const setSearchQuery = (v: string) => setFilters(f => ({ ...f, searchQuery: v, selectedCategory: v ? null : f.selectedCategory, activeComponent: v ? '' : f.activeComponent }))

  return {
    selectedCategory: filters.selectedCategory, setSelectedCategory,
    activeLayer: filters.activeLayer, setActiveLayer,
    activeComponent: filters.activeComponent, setActiveComponent,
    viewTab: filters.viewTab, setViewTab,
    viewMode: filters.viewMode, setViewMode,
    searchQuery: filters.searchQuery, setSearchQuery,
  }
}
