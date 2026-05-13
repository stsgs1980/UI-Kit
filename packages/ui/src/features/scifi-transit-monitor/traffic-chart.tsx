'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useInView } from 'framer-motion'

// ─── Props ───────────────────────────────────────────────────

interface TrafficChartProps {
  data: number[]
  peakStart?: number
  peakEnd?: number
  lowStart?: number
  lowEnd?: number
  currentHour?: number
  accentColor?: string
}

// ─── Component ───────────────────────────────────────────────

export function TrafficChart({
  data,
  peakStart = 6,
  peakEnd = 10,
  lowStart = 2,
  lowEnd = 4,
  currentHour,
  accentColor = '#00e5ff',
}: TrafficChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(canvasRef, { once: true, margin: '-50px' })

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const W = rect.width
    const H = rect.height
    const pad = { top: 20, right: 10, bottom: 30, left: 32 }
    const chartW = W - pad.left - pad.right
    const chartH = H - pad.top - pad.bottom

    ctx.fillStyle = 'rgba(10, 10, 30, 0)'
    ctx.fillRect(0, 0, W, H)

    const maxVal = Math.max(...data, 1)
    const barW = chartW / 24

    // Grid lines
    ctx.strokeStyle = 'rgba(100, 100, 150, 0.1)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (chartH / 4) * i
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke()
    }

    // Y axis labels
    ctx.fillStyle = '#7070a0'
    ctx.font = '9px monospace'
    ctx.textAlign = 'right'
    for (let i = 0; i <= 4; i++) {
      const val = Math.round(maxVal * (1 - i / 4))
      const y = pad.top + (chartH / 4) * i + 3
      ctx.fillText(val.toString(), pad.left - 6, y)
    }

    // Peak hour zones
    ctx.fillStyle = 'rgba(255, 107, 0, 0.06)'
    ctx.fillRect(pad.left + barW * peakStart, pad.top, barW * (peakEnd - peakStart), chartH)
    ctx.fillStyle = `${accentColor}0a`
    ctx.fillRect(pad.left + barW * lowStart, pad.top, barW * (lowEnd - lowStart), chartH)

    // Bars
    const progress = isInView ? 1 : 0
    data.forEach((val, i) => {
      const barH = (val / maxVal) * chartH * progress
      const x = pad.left + barW * i + 2
      const w = barW - 4
      const y = pad.top + chartH - barH
      const isPeak = i >= peakStart && i <= peakEnd
      const isLow = i >= lowStart && i <= lowEnd

      const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH)
      if (isPeak) {
        grad.addColorStop(0, 'rgba(255, 107, 0, 0.9)')
        grad.addColorStop(1, 'rgba(255, 107, 0, 0.3)')
      } else if (isLow) {
        grad.addColorStop(0, `${accentColor}99`)
        grad.addColorStop(1, `${accentColor}26`)
      } else {
        grad.addColorStop(0, 'rgba(120, 120, 170, 0.6)')
        grad.addColorStop(1, 'rgba(120, 120, 170, 0.15)')
      }
      ctx.fillStyle = grad
      ctx.fillRect(x, y, w, barH)

      ctx.fillStyle = isPeak ? 'rgba(255, 107, 0, 0.8)' : isLow ? `${accentColor}80` : 'rgba(120, 120, 170, 0.4)'
      ctx.fillRect(x, y, w, 1.5)
    })

    // X axis labels
    ctx.fillStyle = '#7070a0'
    ctx.font = '9px monospace'
    ctx.textAlign = 'center'
    for (let i = 0; i < 24; i += 3) {
      const x = pad.left + barW * i + barW / 2
      ctx.fillText(`${i.toString().padStart(2, '0')}:00`, x, H - 8)
    }

    // Current time indicator
    if (currentHour != null) {
      const currentX = pad.left + barW * currentHour + barW / 2
      ctx.strokeStyle = '#ff2244'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath(); ctx.moveTo(currentX, pad.top); ctx.lineTo(currentX, pad.top + chartH); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = '#ff2244'
      ctx.font = 'bold 8px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('NOW', currentX, pad.top - 6)
    }
  }, [data, isInView, peakStart, peakEnd, lowStart, lowEnd, currentHour, accentColor])

  useEffect(() => { drawChart() }, [drawChart])
  useEffect(() => {
    const handleResize = () => drawChart()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawChart])

  return (
    <div ref={containerRef} data-slot="traffic-chart" className="w-full h-[200px] sm:h-[240px]">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  )
}
