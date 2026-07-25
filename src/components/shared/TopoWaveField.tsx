'use client'
import { useEffect, useRef } from 'react'

const P = new Uint8Array(512)
for (let i = 0; i < 256; i++) P[i] = i
for (let i = 255; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[P[i], P[j]] = [P[j], P[i]]
}
for (let i = 0; i < 256; i++) P[i + 256] = P[i]

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function grad(h: number, x: number, y: number) {
  const u = h & 1 ? x : -x
  const v = h & 2 ? y : -y
  return u + v
}
function noise(x: number, y: number) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255
  const xf = x - Math.floor(x), yf = y - Math.floor(y)
  const u = fade(xf), v = fade(yf)
  const aa = P[P[X] + Y], ab = P[P[X] + Y + 1]
  const ba = P[P[X + 1] + Y], bb = P[P[X + 1] + Y + 1]
  return lerp(
    lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
    lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
    v,
  )
}

const RESOLUTION = 3
const NOISE_SCALE = 0.003
const MOUSE_RADIUS = 220
const MOUSE_PUSH = 55

const THEMES = {
  light: {
    main: [15, 18, 53],
    accent: [140, 58, 26],
    mainWidth: 0.8,
    accentWidth: 1.2,
  },
  dark: {
    main: [246, 239, 228],
    accent: [196, 134, 106],
    mainWidth: 0.6,
    accentWidth: 1.0,
  },
} as const

interface Props {
  className?: string
  theme?: 'light' | 'dark'
  lineCount?: number
  amplitude?: number
  mouseInteraction?: boolean
  opacity?: number
  lineWidthScale?: number
}

export function TopoWaveField({
  className = '',
  theme = 'light',
  lineCount = 28,
  amplitude = 22,
  mouseInteraction = true,
  opacity = 1,
  lineWidthScale = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const smoothMouseRef = useRef({ x: -9999, y: -9999 })
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

    const rustLines = new Set<number>()
    const accentCount = Math.max(2, Math.round(lineCount / 7))
    for (let i = 0; i < accentCount; i++) {
      rustLines.add(Math.floor(Math.random() * lineCount))
    }

    function draw(t: number) {
      if (!visibleRef.current) {
        rafRef.current = 0
        return
      }

      ctx!.clearRect(0, 0, W, H)
      const time = t * 0.00025

      const sm = smoothMouseRef.current
      const m = mouseRef.current
      sm.x += (m.x - sm.x) * 0.08
      sm.y += (m.y - sm.y) * 0.08

      const spacing = H / (lineCount + 1)

      for (let i = 0; i < lineCount; i++) {
        const baseY = spacing * (i + 1)
        const isAccent = rustLines.has(i)
        const depth = Math.abs(i - lineCount / 2) / (lineCount / 2)
        const baseAlpha = (isAccent ? 0.18 + depth * 0.08 : 0.06 + depth * 0.06) * opacity

        ctx!.beginPath()

        for (let x = -10; x <= W + 10; x += RESOLUTION) {
          const n1 = noise(x * NOISE_SCALE, i * 0.8 + time)
          const n2 = noise(x * NOISE_SCALE * 0.5 + 100, i * 0.4 + time * 0.7)
          let y = baseY + n1 * amplitude + n2 * amplitude * 0.6

          if (mouseInteraction && sm.x > -999) {
            const dx = x - sm.x
            const dy = y - sm.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < MOUSE_RADIUS) {
              const force = (1 - dist / MOUSE_RADIUS)
              const push = force * force * MOUSE_PUSH
              y += (dy / (dist || 1)) * push
            }
          }

          if (x === -10) ctx!.moveTo(x, y)
          else ctx!.lineTo(x, y)
        }

        const c = isAccent ? colors.accent : colors.main
        ctx!.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${baseAlpha})`
        ctx!.lineWidth = (isAccent ? colors.accentWidth : colors.mainWidth) * lineWidthScale
        ctx!.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // IntersectionObserver — pause when off-screen
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
  }, [theme, lineCount, amplitude, mouseInteraction, opacity, lineWidthScale])

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
