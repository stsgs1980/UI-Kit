'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────────

interface FlowItem {
  id: number
  typeIndex: number
  y: number
  speed: number
  delay: number
  direction: 'east' | 'west'
}

interface TrafficFlowProps {
  vessels: { type: string; count: number; color: string }[]
  items?: FlowItem[]
  accentColor?: string
}

// ─── Default ships ───────────────────────────────────────────

const DEFAULT_SHIPS: FlowItem[] = [
  { id: 1, typeIndex: 0, y: 38, speed: 10, delay: 0, direction: 'east' },
  { id: 2, typeIndex: 0, y: 50, speed: 12, delay: 3, direction: 'west' },
  { id: 3, typeIndex: 1, y: 25, speed: 8, delay: 7, direction: 'east' },
  { id: 4, typeIndex: 1, y: 55, speed: 9, delay: 1, direction: 'west' },
  { id: 5, typeIndex: 1, y: 60, speed: 7, delay: 5, direction: 'east' },
]

// ─── Component ───────────────────────────────────────────────

export function TrafficFlow({ vessels, items = DEFAULT_SHIPS, accentColor = '#00e5ff' }: TrafficFlowProps) {
  const [positions, setPositions] = useState<number[]>(items.map(() => 0))
  const startTimeRef = useRef(performance.now())

  useEffect(() => {
    let frame: number
    let lastTime = performance.now()

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000
      lastTime = time
      const elapsed = (time - startTimeRef.current) / 1000

      setPositions(prev => prev.map((pos, i) => {
        const item = items[i]
        const effectiveDelay = elapsed - item.delay
        if (effectiveDelay < 0) return 0

        const speed = item.speed / 12
        let newPos = pos + speed * dt * (item.direction === 'east' ? 1 : -1)
        if (newPos > 100) newPos = 0
        if (newPos < 0) newPos = 100
        return newPos
      }))

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [items])

  return (
    <svg viewBox="0 0 100 80" className="w-full h-[160px] sm:h-[200px]" preserveAspectRatio="xMidYMid meet"
      data-slot="traffic-flow">
      <defs>
        <linearGradient id="tfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(5,20,50,0.8)" />
          <stop offset="50%" stopColor="rgba(8,30,60,0.9)" />
          <stop offset="100%" stopColor="rgba(5,20,50,0.8)" />
        </linearGradient>
        <filter id="shipGlow">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Land masses */}
      <rect x="0" y="0" width="100" height="18" rx="2" fill="rgba(30,25,15,0.8)" />
      <rect x="0" y="62" width="100" height="18" rx="2" fill="rgba(30,25,15,0.8)" />

      {/* Water */}
      <rect x="0" y="18" width="100" height="44" fill="url(#tfGrad)" rx="1" />

      {/* Flow arrows — eastbound */}
      <line x1="10" y1="35" x2="90" y2="35" stroke="rgba(255,107,0,0.15)" strokeWidth="0.5" strokeDasharray="2,3">
        <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.5s" repeatCount="indefinite" />
      </line>
      <polygon points="92,35 89,33.5 89,36.5" fill="rgba(255,107,0,0.3)" />

      {/* Flow arrows — westbound */}
      <line x1="90" y1="52" x2="10" y2="52" stroke={`${accentColor}26`} strokeWidth="0.5" strokeDasharray="2,3">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite" />
      </line>
      <polygon points="8,52 11,50.5 11,53.5" fill={`${accentColor}4d`} />

      {/* Ships */}
      {items.map((ship, i) => {
        const pos = positions[i]
        const elapsed = (performance.now() - startTimeRef.current) / 1000
        if (pos === 0 && ship.delay > 0 && elapsed < ship.delay) return null

        const color = vessels[ship.typeIndex % vessels.length]?.color ?? accentColor
        const flip = ship.direction === 'west' ? 'scale(-1, 1)' : undefined

        return (
          <g key={ship.id} style={{ transform: `translate(${pos * 0.82}px, ${ship.y}%)`, filter: 'url(#shipGlow)' }}>
            <g style={{ transform: flip, transformOrigin: '8px 5px' }}>
              <polygon points="0,5 6,1 16,1 16,9 6,9" fill={color} opacity="0.9" />
              <rect x="2" y="3" width="3" height="4" fill="rgba(255,255,255,0.3)" rx="0.5" />
              <polygon points="16,3 20,5 16,7" fill={color} opacity="0.7" />
            </g>
          </g>
        )
      })}
    </svg>
  )
}
