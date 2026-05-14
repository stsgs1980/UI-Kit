'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

/**
 * ErrorBoundary -- catches render crashes in preview cards.
 * Shows a styled fallback instead of crashing the whole page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[Preview ErrorBoundary]', error.message, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%', minHeight: 120, gap: 4, padding: 12,
          background: 'linear-gradient(135deg, rgba(239,68,68,0.03) 0%, rgba(239,68,68,0.08) 100%)',
          border: '1px dashed rgba(239,68,68,0.2)', borderRadius: 4,
        }}>
          <div style={{
            fontSize: 14, color: '#EF4444', lineHeight: 1,
          }}>{'\u26A0'}</div>
          <div style={{
            fontSize: 10, color: '#94A3B8', fontFamily: 'monospace', textAlign: 'center',
            maxWidth: 200, lineHeight: 1.4,
          }}>
            {this.state.message.length > 60
              ? this.state.message.slice(0, 60) + '...'
              : this.state.message}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
