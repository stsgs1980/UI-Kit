'use client'

import { useRef, useEffect, useCallback } from 'react'

// ─── Props ───────────────────────────────────────────────────

interface TrendChartProps {
  data: number[]
  labels: string[]
  accentColor?: string
}

// ─── Component ───────────────────────────────────────────────

export function TrendChart({ data, labels, accentColor = '#00e5ff' }: TrendChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = 150

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)

    const pad = { top: 20, right: 16, bottom: 30, left: 48 }
    const chartW = width - pad.left - pad.right
    const chartH = height - pad.top - pad.bottom

    const minVal = Math.min(...data) - 10
    const maxVal = Math.max(...data) + 5
    const range = maxVal - minVal

    // Grid lines
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)'
    ctx.lineWidth = 1
    ctx.font = '10px monospace'
    ctx.fillStyle = '#7070a0'
    ctx.textAlign = 'right'

    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (i / 5) * chartH
      const val = maxVal - (i / 5) * range
      ctx.beginPath()
      ctx.setLineDash([2, 4])
      ctx.moveTo(pad.left, y)
      ctx.lineTo(width - pad.right, y)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillText(Math.round(val).toString(), pad.left - 8, y + 3)
    }

    // Data points
    const points = data.map((val, i) => ({
      x: pad.left + (i / (data.length - 1)) * chartW,
      y: pad.top + (1 - (val - minVal) / range) * chartH,
    }))

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, pad.top, 0, height - pad.bottom)
    gradient.addColorStop(0, `${accentColor}33`)
    gradient.addColorStop(1, `${accentColor}00`)

    ctx.beginPath()
    ctx.moveTo(points[0].x, height - pad.bottom)
    points.forEach((p) => ctx.lineTo(p.x, p.y))
    ctx.lineTo(points[points.length - 1].x, height - pad.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
    ctx.strokeStyle = accentColor
    ctx.lineWidth = 2
    ctx.shadowColor = accentColor
    ctx.shadowBlur = 6
    ctx.stroke()
    ctx.shadowBlur = 0

    // Data dots
    points.forEach((p) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = accentColor
      ctx.fill()
      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = '#050510'
      ctx.fill()
    })

    // X-axis labels
    ctx.textAlign = 'center'
    ctx.fillStyle = '#7070a0'
    ctx.font = '9px monospace'
    labels.forEach((label, i) => {
      const x = pad.left + (i / (labels.length - 1)) * chartW
      ctx.fillText(label, x, height - pad.bottom + 16)
    })
  }, [data, labels, accentColor])

  useEffect(() => {
    drawChart()
    const ro = new ResizeObserver(drawChart)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [drawChart])

  return (
    <div ref={containerRef} data-slot="trend-chart" className="w-full">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  )
}
