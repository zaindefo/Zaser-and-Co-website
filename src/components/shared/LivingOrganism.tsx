'use client'
import { useEffect, useRef } from 'react'

interface LivingOrganismProps {
  /** How much of the container width the network spans, 0–1. */
  spread?: number
  nodeCount?: number
  className?: string
  opacity?: number
  /** Connector colour as an "r, g, b" triplet. Defaults to the void-border tone
   *  used by the service sections; the footer overrides it with warm brown. */
  lineRGB?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  /** 0 = idle, counts down through a pulse when fired. */
  pulse: number
  active: boolean
}

const LINK_DISTANCE = 150
const PULSE_MS = 600

/**
 * Ambient node network — a slow-drifting mesh that reads as a nervous system
 * being observed. Deliberately near-invisible: if you can clearly make it out,
 * it is too strong. Atmosphere, not content.
 */
export function LivingOrganism({
  spread = 0.4,
  nodeCount = 20,
  className,
  opacity = 0.15,
  lineRGB = '26, 28, 40',
}: LivingOrganismProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let raf = 0
    let lastPulse = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      const bandW = width * spread
      nodes = Array.from({ length: nodeCount }, (_, i) => ({
        x: Math.random() * bandW,
        // Vertically centred band covering ~70% of the height.
        y: height * 0.15 + Math.random() * height * 0.7,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        pulse: 0,
        active: i < 2,
      }))
    }

    const draw = (now: number) => {
      const bandW = width * spread
      const top = height * 0.15
      const bottom = height * 0.85

      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= bandW) n.vx *= -1
        if (n.y <= top || n.y >= bottom) n.vy *= -1
        n.x = Math.max(0, Math.min(bandW, n.x))
        n.y = Math.max(top, Math.min(bottom, n.y))
        if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - 16.7)
      }

      // Fire one random node every 3–5s — a neuron going off.
      if (now - lastPulse > 3000 + Math.random() * 2000) {
        nodes[Math.floor(Math.random() * nodes.length)].pulse = PULSE_MS
        lastPulse = now
      }

      ctx.lineWidth = 0.5
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DISTANCE) continue
          ctx.strokeStyle = `rgba(${lineRGB}, ${1 - dist / LINK_DISTANCE})`
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        // Pulse rides a 1 → 1.8 → 1 arc across its lifetime.
        const t = n.pulse / PULSE_MS
        const scale = 1 + Math.sin(t * Math.PI) * 0.8
        const alpha = n.active ? 0.5 : 0.2

        if (n.pulse > 0) {
          ctx.fillStyle = `rgba(245, 213, 71, ${0.4 * Math.sin(t * Math.PI)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, 3 * scale * 2.2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(245, 213, 71, ${alpha})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 3 * scale, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    seed()

    if (reduced) {
      // Render one static frame so the texture is still present.
      draw(performance.now())
      cancelAnimationFrame(raf)
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
  }, [spread, nodeCount, lineRGB])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
      }}
    />
  )
}
