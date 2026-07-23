'use client'
import { useEffect, useRef } from 'react'

const THEMES = {
  light: {
    main: [15, 18, 53],
    accent: [140, 58, 26],
    mainWidth: 0.7,
    accentWidth: 1.6,
  },
  dark: {
    main: [246, 239, 228],
    accent: [196, 134, 106],
    mainWidth: 0.6,
    accentWidth: 1.2,
  },
} as const

const RIPPLE_RADIUS = 140
const RESOLUTION = 3

interface Props {
  className?: string
  theme?: 'light' | 'dark'
  lineCount?: number
  amplitude?: number
  mouseInteraction?: boolean
  opacity?: number
}

export function ParticleField({
  className = '',
  theme = 'light',
  lineCount = 24,
  amplitude = 18,
  mouseInteraction = true,
  opacity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = THEMES[theme]
    let W = 0, H = 0
    const dpr = window.devicePixelRatio || 1

    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      W = rect.width
      H = rect.height
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      canvas!.style.width = W + 'px'
      canvas!.style.height = H + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(canvas!.parentElement!)

    let onMove: ((e: MouseEvent) => void) | null = null
    let onLeave: (() => void) | null = null

    if (mouseInteraction) {
      onMove = (e: MouseEvent) => {
        const rect = canvas!.getBoundingClientRect()
        mouseRef.current.x = e.clientX - rect.left
        mouseRef.current.y = e.clientY - rect.top
      }
      onLeave = () => {
        mouseRef.current.x = -9999
        mouseRef.current.y = -9999
      }
      canvas.addEventListener('mousemove', onMove)
      canvas.addEventListener('mouseleave', onLeave)
    }

    const accentLines = new Set<number>()
    const accentCount = Math.max(2, Math.round(lineCount / 7))
    for (let i = 0; i < accentCount; i++) {
      accentLines.add(Math.floor(Math.random() * lineCount))
    }

    function draw(t: number) {
      if (!visibleRef.current) {
        rafRef.current = 0
        return
      }

      ctx!.clearRect(0, 0, W, H)
      const time = t * 0.001

      const mouse = mouseRef.current
      const spacing = H / (lineCount + 1)

      for (let l = 0; l < lineCount; l++) {
        const baseY = spacing * (l + 1)
        const isAccent = accentLines.has(l)
        const depth = Math.abs(l - lineCount / 2) / (lineCount / 2)
        const baseAlpha = (isAccent ? 0.22 + depth * 0.1 : 0.06 + depth * 0.1) * opacity

        const c = isAccent ? colors.accent : colors.main
        ctx!.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${baseAlpha})`
        ctx!.lineWidth = isAccent ? colors.accentWidth : colors.mainWidth
        ctx!.beginPath()

        for (let x = -10; x <= W + 10; x += RESOLUTION) {
          const wave1 = Math.sin(x * 0.007 + time * 2.2 + l * 0.55) * amplitude * 0.5
          const wave2 = Math.sin(x * 0.014 + time * 1.4 + l * 0.28) * amplitude * 0.25
          const wave3 = Math.sin(x * 0.003 + time * 0.8 + l * 0.9) * amplitude * 0.33
          let y = baseY + wave1 + wave2 + wave3

          if (mouseInteraction && mouse.x > -999) {
            const dx = x - mouse.x
            const dy = baseY - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < RIPPLE_RADIUS) {
              const strength = (RIPPLE_RADIUS - dist) / RIPPLE_RADIUS
              const ripple = Math.sin(dist * 0.06 - time * 4) * 12
              y += strength * strength * (ripple + 20 * Math.sign(dy || 1))
            }
          }

          if (x === -10) ctx!.moveTo(x, y)
          else ctx!.lineTo(x, y)
        }
        ctx!.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      if (entry.isIntersecting && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }, { threshold: 0.05 })
    observer.observe(canvas)

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      resizeObserver.disconnect()
      if (onMove) canvas.removeEventListener('mousemove', onMove)
      if (onLeave) canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [theme, lineCount, amplitude, mouseInteraction, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: mouseInteraction ? 'auto' : 'none',
      }}
    />
  )
}
