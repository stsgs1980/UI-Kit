'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import type { CurvePoint } from './types'

// --- Props ---

export interface DemandChartProps {
  curveData: CurvePoint[]
  currentPoint?: { x: number; y: number }
  baselinePoint?: { x: number; y: number }
  xAxisLabel?: string
  yAxisLabel?: string
  zoneLabel?: string
  xMin?: number; xMax?: number; yMin?: number; yMax?: number
  accentColor?: string
}

/**
 * DemandChart -- canvas-based demand/supply curve with animated drawing.
 * @example
 * ```tsx
 * <DemandChart curveData={[{ x: 70, y: 107.5 }, { x: 120, y: 96 }]} />
 * ```
 */
export function DemandChart({
  curveData, currentPoint, baselinePoint, xAxisLabel = 'Price', yAxisLabel = 'Demand',
  zoneLabel = 'DEMAND DESTRUCTION ZONE', xMin = 70, xMax = 120, yMin = 92, yMax = 108, accentColor = '#00e5ff',
}: DemandChartProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(ref, { once: true })
  const [anim, setAnim] = useState(0)

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const noMotion = rm.matches
    if (!isInView) return
    const dur = noMotion ? 0 : 2000
    const start = performance.now()
    const tick = (now: number) => { setAnim(Math.min((now - start) / dur, 1)); if ((now - start) / dur < 1) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  }, [isInView])

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; ctx.scale(dpr, dpr)
    const w = rect.width; const h = rect.height
    const pad = { top: 30, right: 20, bottom: 40, left: 55 }
    const cW = w - pad.left - pad.right; const cH = h - pad.top - pad.bottom
    ctx.clearRect(0, 0, w, h)
    const toX = (v: number) => pad.left + ((v - xMin) / (xMax - xMin)) * cW
    const toY = (v: number) => pad.top + cH - ((v - yMin) / (yMax - yMin)) * cH

    // Grid + axis labels
    for (let i = 0; i <= 5; i++) {
      const yv = yMin + ((yMax - yMin) / 5) * i; const y = toY(yv)
      ctx.strokeStyle = 'rgba(0,229,255,0.06)'; ctx.lineWidth = 0.5
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke()
      ctx.fillStyle = 'rgba(112,112,160,0.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'right'
      ctx.fillText(`${yv.toFixed(0)}`, pad.left - 8, y + 3)
      const xv = xMin + ((xMax - xMin) / 5) * i; const x = toX(xv)
      ctx.strokeStyle = 'rgba(0,229,255,0.06)'; ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, h - pad.bottom); ctx.stroke()
      ctx.fillStyle = 'rgba(112,112,160,0.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.fillText(`${xv}`, x, h - pad.bottom + 16)
    }
    ctx.fillStyle = 'rgba(112,112,160,0.6)'; ctx.font = '11px monospace'; ctx.textAlign = 'center'
    ctx.fillText(xAxisLabel, w / 2, h - 4)
    ctx.save(); ctx.translate(14, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(yAxisLabel, 0, 0); ctx.restore()

    // Interpolate demand at arbitrary x
    const demandAt = (px: number) => {
      if (curveData.length < 2) return yMax
      const sorted = [...curveData].sort((a, b) => a.x - b.x)
      if (px <= sorted[0].x) return sorted[0].y; if (px >= sorted[sorted.length - 1].x) return sorted[sorted.length - 1].y
      for (let i = 0; i < sorted.length - 1; i++) {
        if (px >= sorted[i].x && px <= sorted[i + 1].x) {
          const t = (px - sorted[i].x) / (sorted[i + 1].x - sorted[i].x)
          return sorted[i].y + t * (sorted[i + 1].y - sorted[i].y)
        }
      }
      return yMax
    }
    const drawCount = Math.floor(anim * 50)
    if (drawCount < 2) return

    // Build curve points
    const pts: { x: number; y: number }[] = []
    for (let i = 0; i <= drawCount; i++) { const px = xMin + ((xMax - xMin) / 50) * i; pts.push({ x: toX(px), y: toY(demandAt(px)) }) }

    // Destruction zone fill
    if (baselinePoint && currentPoint && anim > 0.3) {
      const fa = Math.min((anim - 0.3) / 0.4, 1); ctx.globalAlpha = fa; ctx.beginPath()
      ctx.moveTo(toX(baselinePoint.x), toY(baselinePoint.y))
      for (let px = baselinePoint.x; px <= currentPoint.x; px += 0.5) ctx.lineTo(toX(px), toY(demandAt(px)))
      ctx.lineTo(toX(currentPoint.x), toY(baselinePoint.y)); ctx.closePath()
      const zg = ctx.createLinearGradient(toX(baselinePoint.x), toY(baselinePoint.y), toX(currentPoint.x), toY(currentPoint.y))
      zg.addColorStop(0, 'rgba(255,107,0,0.05)'); zg.addColorStop(1, 'rgba(255,107,0,0.20)')
      ctx.fillStyle = zg; ctx.fill()
      const mx = (toX(baselinePoint.x) + toX(currentPoint.x)) / 2; const my = (toY(baselinePoint.y) + toY(currentPoint.y)) / 2
      ctx.globalAlpha = fa * 0.8; ctx.fillStyle = '#ff6b00'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center'
      ctx.fillText(zoneLabel, mx, my); ctx.globalAlpha = 1
    }

    // Curve fill + line
    if (pts.length > 1) {
      const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom)
      grad.addColorStop(0, 'rgba(0,229,255,0.12)'); grad.addColorStop(1, 'rgba(0,229,255,0.00)')
      ctx.beginPath(); ctx.moveTo(pts[0].x, h - pad.bottom); pts.forEach(p => ctx.lineTo(p.x, p.y))
      ctx.lineTo(pts[pts.length - 1].x, h - pad.bottom); ctx.closePath(); ctx.fillStyle = grad; ctx.fill()
      ctx.beginPath(); ctx.strokeStyle = accentColor; ctx.lineWidth = 2; ctx.shadowColor = accentColor; ctx.shadowBlur = 8
      pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y) })
      ctx.stroke(); ctx.shadowBlur = 0
    }

    // Current point marker
    if (currentPoint && anim > 0.5) {
      const la = Math.min((anim - 0.5) / 0.3, 1); ctx.globalAlpha = la
      const xC = toX(currentPoint.x); const yC = toY(currentPoint.y)
      ctx.beginPath(); ctx.strokeStyle = '#ff2244'; ctx.lineWidth = 1; ctx.setLineDash([4, 4])
      ctx.moveTo(xC, pad.top); ctx.lineTo(xC, h - pad.bottom); ctx.stroke(); ctx.setLineDash([])
      ctx.beginPath(); ctx.arc(xC, yC, 5, 0, Math.PI * 2); ctx.fillStyle = '#ff2244'
      ctx.shadowColor = '#ff2244'; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0
      ctx.fillStyle = '#ff2244'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center'
      ctx.fillText(`${currentPoint.x.toFixed(2)}`, xC, pad.top - 8); ctx.globalAlpha = 1
    }
    // Baseline marker
    if (baselinePoint && anim > 0.5) {
      const xP = toX(baselinePoint.x); const yP = toY(baselinePoint.y)
      ctx.globalAlpha = Math.min((anim - 0.5) / 0.3, 1)
      ctx.beginPath(); ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(34,197,94,0.5)'; ctx.lineWidth = 1
      ctx.moveTo(xP, yP); ctx.lineTo(xP, h - pad.bottom); ctx.stroke(); ctx.setLineDash([])
      ctx.beginPath(); ctx.arc(xP, yP, 4, 0, Math.PI * 2); ctx.fillStyle = '#22c55e'
      ctx.shadowColor = '#22c55e'; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0
      ctx.fillStyle = '#22c55e'; ctx.font = '10px monospace'; ctx.textAlign = 'center'
      ctx.fillText('Baseline', xP, pad.top - 8); ctx.globalAlpha = 1
    }
    // Legend
    ctx.globalAlpha = anim; const ly = pad.top + 8; ctx.textAlign = 'right'
    ctx.fillStyle = accentColor; ctx.font = '10px monospace'; ctx.fillText('--- Demand Curve', w - pad.right - 10, ly)
    ctx.fillStyle = '#ff2244'; ctx.fillText('--- Current', w - pad.right - 10, ly + 16)
    if (baselinePoint) { ctx.fillStyle = '#22c55e'; ctx.fillText('--- Baseline', w - pad.right - 10, ly + 32) }
    ctx.globalAlpha = 1
  }, [anim, curveData, currentPoint, baselinePoint, xMin, xMax, yMin, yMax, xAxisLabel, yAxisLabel, zoneLabel, accentColor])

  return <canvas ref={ref} className="w-full h-full" style={{ minHeight: '280px' }} data-slot="demand-chart" />
}
