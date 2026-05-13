'use client'

import { forwardRef, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'

/**
 * Canvas-based sparkline for historical trend data.
 *
 * @example
 * ```tsx
 * <TensionSparkline
 *   data={[42, 45, 48, 52, 58, 55, 60, 58]}
 *   accentColor="#ff6b00"
 * />
 * ```
 */
export const TensionSparkline = forwardRef<HTMLDivElement, {
  data: number[]
  accentColor?: string
  className?: string
}>(({ data, accentColor = '#ff6b00', className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-30px' })

  useEffect(() => {
    if (!isInView) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = 400, h = 80
    canvas.width = w * dpr; canvas.height = h * dpr
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const padding = { top: 10, bottom: 10, left: 5, right: 5 }
    const chartW = w - padding.left - padding.right
    const chartH = h - padding.top - padding.bottom
    const minVal = Math.min(...data) - 5
    const maxVal = Math.max(...data) + 5

    const points = data.map((val, i) => ({
      x: padding.left + (i / (data.length - 1)) * chartW,
      y: padding.top + (1 - (val - minVal) / (maxVal - minVal)) * chartH,
    }))

    ctx.clearRect(0, 0, w, h)

    // Fill gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom)
    gradient.addColorStop(0, `${accentColor}33`)
    gradient.addColorStop(1, `${accentColor}00`)

    ctx.beginPath()
    ctx.moveTo(points[0].x, h - padding.bottom)
    points.forEach((p) => ctx.lineTo(p.x, p.y))
    ctx.lineTo(points[points.length - 1].x, h - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Line
    ctx.beginPath()
    points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
    ctx.strokeStyle = accentColor; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.stroke()

    // Glow
    ctx.beginPath()
    points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
    ctx.strokeStyle = accentColor; ctx.lineWidth = 4; ctx.globalAlpha = 0.15; ctx.stroke(); ctx.globalAlpha = 1

    // End dot
    const lastP = points[points.length - 1]
    ctx.beginPath(); ctx.arc(lastP.x, lastP.y, 3, 0, Math.PI * 2); ctx.fillStyle = accentColor; ctx.fill()
    ctx.beginPath(); ctx.arc(lastP.x, lastP.y, 6, 0, Math.PI * 2); ctx.fillStyle = `${accentColor}33`; ctx.fill()
  }, [isInView, data, accentColor])

  return (
    <div ref={ref} className={cn('w-full', className)} data-slot="tension-sparkline">
      <div ref={containerRef} className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-[#7070a0] uppercase tracking-wider">30d Trend</span>
          <span className="font-mono text-[10px] text-[#505080]">latest: {data[data.length - 1]}</span>
        </div>
        <canvas ref={canvasRef} className="w-full max-w-full" />
      </div>
    </div>
  )
})
TensionSparkline.displayName = 'TensionSparkline'
