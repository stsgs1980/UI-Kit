'use client'

import { forwardRef, useRef, useEffect, useCallback } from 'react'
import { cn } from '../../tokens/cn'

/**
 * Canvas-based trend chart with area fill, grid, and neutral line.
 *
 * @example
 * ```tsx
 * <TrendChart
 *   data={[52, 48, 55, 60, 58, 64, 62]}
 *   accentColor="#00e5ff"
 * />
 * ```
 */
export const TrendChart = forwardRef<HTMLDivElement, {
  data: number[]
  accentColor?: string
  height?: number
  className?: string
}>(({ data, accentColor = '#00e5ff', height = 200, className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
    const pad = { top: 15, right: 10, bottom: 25, left: 30 }
    const chartW = W - pad.left - pad.right
    const chartH = H - pad.top - pad.bottom

    ctx.clearRect(0, 0, W, H)

    const min = Math.min(...data) - 5
    const max = Math.max(...data) + 5
    const range = max - min

    // Grid
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
      const val = Math.round(max - (range / 4) * i)
      ctx.fillText(val.toString(), pad.left - 5, pad.top + (chartH / 4) * i + 3)
    }

    // Neutral line at 50
    if (min < 50 && max > 50) {
      const neutralY = pad.top + ((max - 50) / range) * chartH
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.25)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath(); ctx.moveTo(pad.left, neutralY); ctx.lineTo(W - pad.right, neutralY); ctx.stroke()
      ctx.setLineDash([])
    }

    const xStep = chartW / (data.length - 1)

    // Area fill
    const areaGrad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH)
    areaGrad.addColorStop(0, `${accentColor}26`)
    areaGrad.addColorStop(1, `${accentColor}00`)

    ctx.beginPath()
    ctx.moveTo(pad.left, pad.top + chartH)
    data.forEach((val, i) => ctx.lineTo(pad.left + xStep * i, pad.top + ((max - val) / range) * chartH))
    ctx.lineTo(pad.left + xStep * (data.length - 1), pad.top + chartH)
    ctx.closePath()
    ctx.fillStyle = areaGrad
    ctx.fill()

    // Line
    ctx.beginPath()
    data.forEach((val, i) => {
      const x = pad.left + xStep * i
      const y = pad.top + ((max - val) / range) * chartH
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.strokeStyle = accentColor
    ctx.lineWidth = 2
    ctx.shadowColor = `${accentColor}66`
    ctx.shadowBlur = 6
    ctx.stroke()
    ctx.shadowBlur = 0

    // End dot
    const lastI = data.length - 1
    const lastX = pad.left + xStep * lastI
    const lastY = pad.top + ((max - data[lastI]) / range) * chartH
    ctx.beginPath(); ctx.arc(lastX, lastY, 3, 0, Math.PI * 2)
    ctx.fillStyle = accentColor; ctx.fill()
    ctx.beginPath(); ctx.arc(lastX, lastY, 6, 0, Math.PI * 2)
    ctx.strokeStyle = `${accentColor}4D`; ctx.lineWidth = 1; ctx.stroke()
  }, [data, accentColor])

  useEffect(() => { drawChart() }, [drawChart])
  useEffect(() => {
    const handleResize = () => drawChart()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawChart])

  return (
    <div ref={ref} className={cn('w-full', className)} data-slot="trend-chart">
      <div ref={containerRef} className="w-full" style={{ height }}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
      </div>
    </div>
  )
})
TrendChart.displayName = 'TrendChart'
