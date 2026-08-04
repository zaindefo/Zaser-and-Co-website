'use client'
import { useEffect, useRef } from 'react'

interface HeroOrganismProps {
  /** Accent colour for active nodes and pulse rings. */
  color?: string
  /** Connector colour as an "r, g, b" triplet. Default suits a dark ground. */
  lineRGB?: string
  /** Idle-node colour as an "r, g, b" triplet. Default suits a dark ground. */
  nodeRGB?: string
  nodeCount?: number
  opacity?: number
  className?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  isActive: boolean
}

interface Pulse {
  x: number
  y: number
  radius: number
  startTime: number
}

const LINK_DISTANCE = 150
const PULSE_MS = 600
const PULSE_MAX_RADIUS = 35
const MAX_PULSES = 10
const EDGE_MARGIN = 20

/* Mobile carries fewer nodes and sits fainter — less noise on a small panel. */
const MOBILE_NODES = 12
const MOBILE_OPACITY = 0.3

/**
 * Drifting node network laid over the hero illustration. Reads as a system being
 * observed: nodes breathe, near neighbours link up, and every few seconds one
 * fires a ring. Contained by the parent's overflow, so it never reaches the copy.
 */
export function HeroOrganism({
  color = '#F5D547',
  lineRGB = '255, 255, 255',
  nodeRGB = '255, 255, 255',
  nodeCount = 20,
  opacity = 0.4,
  className,
}: HeroOrganismProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Parse the accent once rather than per frame.
    const hex = color.replace('#', '')
    const ar = parseInt(hex.slice(0, 2), 16)
    const ag = parseInt(hex.slice(2, 4), 16)
    const ab = parseInt(hex.slice(4, 6), 16)
    const accent = (a: number) => `rgba(${ar}, ${ag}, ${ab}, ${a})`

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let raf = 0
    let count = nodeCount
    let alpha = opacity

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      // setTransform rather than scale — scale would compound across resizes.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const small = window.innerWidth < 768
      count = small ? Math.min(MOBILE_NODES, nodeCount) : nodeCount
      alpha = small ? Math.min(MOBILE_OPACITY, opacity) : opacity
    }

    const seed = () => {
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 2 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        isActive: Math.random() < 0.15,
      }))
      pulses = []
    }

    const draw = () => {
      const now = Date.now()
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < EDGE_MARGIN || n.x > width - EDGE_MARGIN) n.vx *= -1
        if (n.y < EDGE_MARGIN || n.y > height - EDGE_MARGIN) n.vy *= -1
        // Sine drift keeps the motion organic rather than dead-straight.
        n.x += Math.sin(now * 0.001 + n.pulsePhase) * 0.15
        n.y += Math.cos(now * 0.0008 + n.pulsePhase) * 0.15
        n.x = Math.max(0, Math.min(width, n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      }

      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist >= LINK_DISTANCE) continue
          ctx.strokeStyle = `rgba(${lineRGB}, ${(1 - dist / LINK_DISTANCE) * 0.25 * alpha})`
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const pulse = 1 + Math.sin(now * 0.002 + n.pulsePhase) * 0.3
        const r = n.radius * pulse

        if (n.isActive) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2)
          ctx.fillStyle = accent(0.06 * alpha)
          ctx.fill()

          ctx.beginPath()
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
          ctx.fillStyle = accent(0.7 * alpha)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${nodeRGB}, ${0.3 * alpha})`
          ctx.fill()
        }
      }

      // Fire roughly once every three seconds at 60fps.
      if (Math.random() < 0.005 && pulses.length < MAX_PULSES && nodes.length) {
        const n = nodes[Math.floor(Math.random() * nodes.length)]
        pulses.push({ x: n.x, y: n.y, radius: n.radius, startTime: now })
      }

      // Iterate backwards so removing a finished pulse cannot skip the next one.
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        const progress = Math.min((now - p.startTime) / PULSE_MS, 1)
        const r = p.radius + (PULSE_MAX_RADIUS - p.radius) * progress

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = accent(0.5 * (1 - progress) * alpha)
        ctx.lineWidth = 1
        ctx.stroke()

        if (progress >= 1) pulses.splice(i, 1)
      }

      raf = requestAnimationFrame(draw)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    resize()
    seed()

    if (reduced) {
      // One static frame keeps the texture without any motion.
      ctx.clearRect(0, 0, width, height)
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = n.isActive ? accent(0.7 * alpha) : `rgba(${nodeRGB}, ${0.3 * alpha})`
        ctx.fill()
      }
    } else {
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      resize()
      seed()
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [color, lineRGB, nodeRGB, nodeCount, opacity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}
