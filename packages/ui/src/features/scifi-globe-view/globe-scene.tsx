// @ts-nocheck
'use client'

import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import type { GlobeNode, GlobeRoute } from './types'
import { latLonToVec3, generateArcPoints, GLOBE_RADIUS } from './types'

// ─── Props ────────────────────────────────────────────────────

interface GlobeSceneProps {
  nodes: GlobeNode[]
  routes: GlobeRoute[]
  accentColor: string
}

// ─── Globe Grid ───────────────────────────────────────────────

function GlobeGrid({ accentColor }: { accentColor: string }) {
  const gridMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: new THREE.Color(accentColor), transparent: true, opacity: 0.12 }),
    [accentColor],
  )
  useEffect(() => () => { gridMaterial.dispose() }, [gridMaterial])

  const gridLines = useMemo(() => {
    const lines: { points: [number, number, number][]; key: string }[] = []
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: [number, number, number][] = []
      for (let lon = 0; lon <= 360; lon += 5) pts.push(latLonToVec3(lat, lon - 180, GLOBE_RADIUS + 0.002))
      lines.push({ points: pts, key: `lat-${lat}` })
    }
    for (let lon = -180; lon < 180; lon += 20) {
      const pts: [number, number, number][] = []
      for (let lat = -90; lat <= 90; lat += 5) pts.push(latLonToVec3(lat, lon, GLOBE_RADIUS + 0.002))
      lines.push({ points: pts, key: `lon-${lon}` })
    }
    return lines
  }, [])

  return (
    <group>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial color="#050510" transparent opacity={0.85} />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.04, 64, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
      {gridLines.map((line) => (
        <Line key={line.key} points={line.points} color={accentColor} transparent opacity={0.1} lineWidth={0.5} />
      ))}
    </group>
  )
}

// ─── Node Marker ──────────────────────────────────────────────

function NodeMarker({ node }: { node: GlobeNode }) {
  const glowRef = useRef<THREE.Mesh>(null)
  const color = node.color ?? '#00e5ff'
  const position = useMemo(() => latLonToVec3(node.lat, node.lon, GLOBE_RADIUS + 0.005), [node])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2 + node.lat) * 0.3)
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 2 + node.lat) * 0.15
    }
  })

  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <Html position={position} center distanceFactor={4} style={{ pointerEvents: 'none' }} zIndexRange={[0, 0]}>
        <div className="font-mono text-[9px] sm:text-[10px] whitespace-nowrap px-1.5 py-0.5 rounded-sm"
          style={{ color, backgroundColor: 'rgba(5, 5, 16, 0.8)', border: `1px solid ${color}30`, textShadow: `0 0 6px ${color}60`, opacity: 0.9 }}>
          {node.label}
        </div>
      </Html>
    </group>
  )
}

// ─── Route Arc ────────────────────────────────────────────────

function RouteArc({ route, nodes }: { route: GlobeRoute; nodes: GlobeNode[] }) {
  const src = nodes.find((n) => n.id === route.sourceId)
  const dst = nodes.find((n) => n.id === route.destId)
  if (!src || !dst) return null

  const points = useMemo(
    () => generateArcPoints(src.lat, src.lon, dst.lat, dst.lon, GLOBE_RADIUS, 64, 0.12),
    [src, dst],
  )
  const color = route.color ?? '#00e5ff'

  return (
    <group>
      <Line points={points} color={color} transparent opacity={0.15} lineWidth={(route.thickness ?? 2) + 3} />
      <Line points={points} color={color} transparent opacity={0.7} lineWidth={route.thickness ?? 2}
        dashed={route.dashed} dashSize={0.05} gapSize={0.03} />
    </group>
  )
}

// ─── Auto-rotating Scene ─────────────────────────────────────

function GlobeSceneContent({ nodes, routes, accentColor }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useFrame(() => {
    if (groupRef.current && !hovered) groupRef.current.rotation.y += 0.00175
  })

  return (
    <group ref={groupRef} onPointerEnter={() => setHovered('globe')} onPointerLeave={() => setHovered(null)}>
      <GlobeGrid accentColor={accentColor} />
      {nodes.map((node) => <NodeMarker key={node.id} node={node} />)}
      {routes.map((route) => <RouteArc key={route.id} route={route} nodes={nodes} />)}
    </group>
  )
}

// ─── Canvas wrapper (exported) ────────────────────────────────

export function GlobeCanvas({ nodes, routes, accentColor }: GlobeSceneProps) {
  return (
    <Canvas frameloop="demand" gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <GlobeSceneContent nodes={nodes} routes={routes} accentColor={accentColor} />
        <OrbitControls enablePan={false} enableZoom minDistance={1.8} maxDistance={5} rotateSpeed={0.5} zoomSpeed={0.8} />
      </Suspense>
    </Canvas>
  )
}
