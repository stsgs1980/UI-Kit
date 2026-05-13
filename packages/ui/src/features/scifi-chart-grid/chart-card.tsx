'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { HudCard } from '../hud-card'
import type { ChartConfig, DataPoint } from './types'

export interface ChartCardProps {
  /** Chart configuration */
  chart: ChartConfig
  /** Default accent color */
  accentColor?: string
  /** Animation delay in seconds */
  delay?: number
  /** Span full width on lg screens */
  fullWidth?: boolean
}

// ─── Canvas Line/Area Chart ───────────────────────────────────
function CanvasChart({ data, color, type }: { data: DataPoint[]; color: string; type: 'line' | 'area' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inView = useInView(canvasRef, { once: true })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - t0) / 2000, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    const w = rect.width, h = rect.height
    const pad = { top: 20, right: 20, bottom: 30, left: 50 }
    const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom
    ctx.clearRect(0, 0, w, h)

    const values = data.map(d => d.value)
    const minV = Math.min(...values) - 2, maxV = Math.max(...values) + 2

    // Grid
    ctx.strokeStyle = `${color}0F`; ctx.lineWidth = 0.5
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (ch / 5) * i
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke()
      ctx.fillStyle = 'rgba(112,112,160,0.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'right'
      ctx.fillText(`${(maxV - ((maxV - minV) / 5) * i).toFixed(1)}`, pad.left - 8, y + 3)
    }

    const step2 = data.length <= 13 ? 2 : data.length <= 22 ? 4 : 3
    ctx.fillStyle = 'rgba(112,112,160,0.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'center'
    for (let i = 0; i < data.length; i += step2) {
      ctx.fillText(data[i].label, pad.left + (cw / (data.length - 1)) * i, h - 8)
    }

    const count = Math.floor(data.length * progress)
    if (count < 2) return
    const points = Array.from({ length: count }, (_, i) => ({
      x: pad.left + (cw / (data.length - 1)) * i,
      y: pad.top + ch - ((values[i] - minV) / (maxV - minV)) * ch,
    }))

    if (type === 'area') {
      const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom)
      grad.addColorStop(0, `${color}30`); grad.addColorStop(1, `${color}00`)
      ctx.beginPath(); ctx.moveTo(points[0].x, h - pad.bottom)
      points.forEach(p => ctx.lineTo(p.x, p.y))
      ctx.lineTo(points[points.length - 1].x, h - pad.bottom)
      ctx.closePath(); ctx.fillStyle = grad; ctx.fill()
    }

    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.shadowColor = color; ctx.shadowBlur = 10
    points.forEach((p, i) => { i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y) })
    ctx.stroke(); ctx.shadowBlur = 0

    if (points.length > 0) {
      const last = points[points.length - 1]
      ctx.beginPath(); ctx.arc(last.x, last.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 15; ctx.fill(); ctx.shadowBlur = 0
      ctx.fillStyle = color; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'left'
      ctx.fillText(`${values[count - 1].toFixed(2)}`, last.x + 8, last.y + 4)
    }
  }, [data, color, type, progress])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ minHeight: '200px' }} />
}

// ─── Component ────────────────────────────────────────────────
/** Individual chart wrapper in the grid.
 * @example ```tsx
 * <ChartCard chart={{ id: '1', title: 'Revenue', type: 'line', data: points }} accentColor="#00e5ff" />
 * ``` */
export function ChartCard({ chart, accentColor = '#00e5ff', delay = 0, fullWidth }: ChartCardProps) {
  const color = chart.color ?? accentColor
  return (
    <HudCard title={chart.title} accentColor={chart.type === 'bar' ? 'purple' : 'cyan'} delay={delay}
      className={fullWidth ? 'lg:col-span-2' : undefined}>
      {chart.subtitle && (
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ color }}>{chart.subtitle}</span>
        </div>
      )}
      {chart.currentValue && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold" style={{ color }}>{chart.currentValue}</div>
            {chart.changeText && <span className={`font-mono text-sm ${chart.changePositive !== false ? 'text-green-400' : 'text-red-400'}`}>{chart.changeText}</span>}
          </div>
        </div>)}
      <div className="relative h-[200px] sm:h-[250px]">
        {(chart.type === 'line' || chart.type === 'area') && <CanvasChart data={chart.data} color={color} type={chart.type} />}
        {chart.type === 'bar' && (
          <div className="flex items-end gap-1 h-full px-2">
            {chart.data.map((d, i) => {
              const maxVal = Math.max(...chart.data.map(p => p.value))
              const h = (d.value / maxVal) * 100
              return (
                <motion.div key={i} className="flex-1 rounded-t-sm"
                  style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}44` }}
                  initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }} />
              )
            })}
          </div>
        )}
      </div>
    </HudCard>
  )
}
