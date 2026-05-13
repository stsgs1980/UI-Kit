'use client'

import { forwardRef, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../tokens/cn'
import { getTensionColor, getTensionLabel } from './types'

/**
 * Canvas-based radial gauge (270-degree sweep) with gradient arc, tick marks, and needle dot.
 *
 * @example
 * ```tsx
 * <TensionGauge score={58} accentColor="#00e5ff" />
 * ```
 */
export const TensionGauge = forwardRef<HTMLDivElement, {
  score: number
  accentColor?: string
  className?: string
}>(({ score, accentColor = '#00e5ff', className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  const drawGauge = useCallback((currentScore: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 240
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2, cy = size / 2, radius = 95, lineWidth = 12
    const startAngle = (135 * Math.PI) / 180
    const endAngle = (405 * Math.PI) / 180
    const totalSweep = endAngle - startAngle

    ctx.clearRect(0, 0, size, size)

    // Background arc
    ctx.beginPath(); ctx.arc(cx, cy, radius, startAngle, endAngle)
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = lineWidth; ctx.lineCap = 'round'; ctx.stroke()

    // Ticks
    for (let i = 0; i <= 20; i++) {
      const angle = startAngle + (i / 20) * totalSweep
      const innerR = radius - lineWidth / 2 - 4
      const outerR = radius - lineWidth / 2 - (i % 5 === 0 ? 14 : 8)
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR)
      ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR)
      ctx.strokeStyle = i % 5 === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'
      ctx.lineWidth = i % 5 === 0 ? 1.5 : 0.8
      ctx.stroke()
    }

    // Gradient arc
    const filledSweep = (currentScore / 100) * totalSweep
    const filledEnd = startAngle + filledSweep

    if (currentScore > 0) {
      const gradient = ctx.createConicGradient(startAngle, cx, cy)
      gradient.addColorStop(0, '#22c55e')
      gradient.addColorStop(0.3, '#eab308')
      gradient.addColorStop(0.6, '#ff6b00')
      gradient.addColorStop(1, '#ff2244')

      ctx.beginPath(); ctx.arc(cx, cy, radius, startAngle, filledEnd)
      ctx.strokeStyle = gradient; ctx.lineWidth = lineWidth; ctx.lineCap = 'round'; ctx.stroke()

      // Glow
      ctx.beginPath(); ctx.arc(cx, cy, radius, startAngle, filledEnd)
      ctx.strokeStyle = gradient; ctx.lineWidth = lineWidth + 8; ctx.lineCap = 'round'
      ctx.globalAlpha = 0.12; ctx.stroke(); ctx.globalAlpha = 1

      // Needle
      const needleAngle = startAngle + (currentScore / 100) * totalSweep
      const dotX = cx + Math.cos(needleAngle) * radius
      const dotY = cy + Math.sin(needleAngle) * radius
      ctx.beginPath(); ctx.arc(dotX, dotY, 5, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill()
      ctx.beginPath(); ctx.arc(dotX, dotY, 10, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill()
    }

    // Center text
    const scoreColor = getTensionColor(currentScore)
    ctx.font = 'bold 48px monospace'; ctx.fillStyle = scoreColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(Math.round(currentScore).toString(), cx, cy - 10)
    ctx.font = '9px monospace'; ctx.fillStyle = '#7070a0'; ctx.fillText('TENSION INDEX', cx, cy + 18)
    ctx.font = '9px monospace'; ctx.fillStyle = '#505080'; ctx.fillText('/ 100', cx, cy + 32)
  }, [])

  useEffect(() => { if (isInView) drawGauge(score) }, [isInView, score, drawGauge])
  useEffect(() => {
    const h = () => drawGauge(score)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [score, drawGauge])

  const scoreLabel = getTensionLabel(score)
  const scoreColor = getTensionColor(score)

  return (
    <div ref={ref} className={cn('flex flex-col items-center', className)} data-slot="tension-gauge">
      <div ref={containerRef}>
        <canvas ref={canvasRef} className="relative z-10" />
      </div>
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 1 }} className="mt-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scoreColor, boxShadow: `0 0 4px ${scoreColor}` }} />
        <span className="font-mono text-xs font-bold tracking-widest" style={{ color: scoreColor }}>{scoreLabel}</span>
      </motion.div>
    </div>
  )
})
TensionGauge.displayName = 'TensionGauge'
