'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface DisruptionGaugeProps { score: number; accentColor?: string }

function scoreColor(s: number, accent: string) {
  return s >= 75 ? '#ff2244' : s >= 50 ? '#ff6b00' : s >= 30 ? '#eab308' : accent
}

export function DisruptionGauge({ score, accentColor = '#00e5ff' }: DisruptionGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const [animatedScore, setAnimatedScore] = useState(0)

  const draw = useCallback((cs: number) => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const dpr = window.devicePixelRatio || 1, size = 220
    canvas.width = size * dpr; canvas.height = size * dpr
    canvas.style.width = `${size}px`; canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2, cy = size / 2, r = 85, lw = 10
    const sa = (135 * Math.PI) / 180, ea = (405 * Math.PI) / 180, ts = ea - sa
    ctx.clearRect(0, 0, size, size)

    // Background arc
    ctx.beginPath(); ctx.arc(cx, cy, r, sa, ea)
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.stroke()

    // Ticks
    for (let i = 0; i <= 20; i++) {
      const a = sa + (i / 20) * ts, ir = r - lw / 2 - 4, or = r - lw / 2 - (i % 5 === 0 ? 12 : 8)
      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(a) * ir, cy + Math.sin(a) * ir)
      ctx.lineTo(cx + Math.cos(a) * or, cy + Math.sin(a) * or)
      ctx.strokeStyle = i % 5 === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'
      ctx.lineWidth = i % 5 === 0 ? 1.5 : 1; ctx.stroke()
    }

    // Gradient arc + glow
    const fe = sa + (cs / 100) * ts
    if (cs > 0) {
      const g = ctx.createConicGradient(sa, cx, cy)
      g.addColorStop(0, accentColor); g.addColorStop(0.33, '#ff6b00')
      g.addColorStop(0.67, '#ff2244'); g.addColorStop(1, '#ff2244')
      ctx.beginPath(); ctx.arc(cx, cy, r, sa, fe)
      ctx.strokeStyle = g; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.stroke()
      ctx.beginPath(); ctx.arc(cx, cy, r, sa, fe)
      ctx.strokeStyle = g; ctx.lineWidth = lw + 6; ctx.globalAlpha = 0.15; ctx.stroke(); ctx.globalAlpha = 1
    }

    // Needle dot
    const na = sa + (cs / 100) * ts
    ctx.beginPath(); ctx.arc(cx + Math.cos(na) * r, cy + Math.sin(na) * r, 5, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill()
    ctx.beginPath(); ctx.arc(cx + Math.cos(na) * r, cy + Math.sin(na) * r, 10, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill()

    // Center text
    const sc = scoreColor(cs, accentColor)
    ctx.font = 'bold 42px monospace'; ctx.fillStyle = sc; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(Math.round(cs).toString(), cx, cy - 6)
    ctx.font = '10px monospace'; ctx.fillStyle = '#7070a0'; ctx.fillText('RISK INDEX', cx, cy + 20)
    ctx.font = '9px monospace'; ctx.fillStyle = '#505080'; ctx.fillText('/ 100', cx, cy + 34)
  }, [accentColor])

  useEffect(() => {
    if (!isInView) return
    let start: number | null = null, raf: number
    const anim = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / 1500, 1), e = 1 - Math.pow(1 - p, 3), c = e * score
      setAnimatedScore(c); draw(c)
      if (p < 1) raf = requestAnimationFrame(anim)
    }
    raf = requestAnimationFrame(anim); return () => cancelAnimationFrame(raf)
  }, [isInView, score, draw])

  useEffect(() => {
    const h = () => draw(animatedScore); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h)
  }, [animatedScore, draw])

  const label = score >= 75 ? 'CRITICAL' : score >= 50 ? 'HIGH' : score >= 30 ? 'MODERATE' : 'LOW'
  const col = scoreColor(score, accentColor)

  return (
    <div ref={containerRef} data-slot="disruption-gauge" className="flex flex-col items-center">
      <canvas ref={canvasRef} className="relative z-10" />
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 1 }}
        className="mt-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: col }} />
        <span className="font-mono text-xs font-bold tracking-widest" style={{ color: col }}>{label}</span>
      </motion.div>
    </div>
  )
}
