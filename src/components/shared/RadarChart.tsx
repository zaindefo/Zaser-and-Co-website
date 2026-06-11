'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CLARITY_DIMENSIONS, CLARITY_SAMPLE_SCORES } from '@/lib/constants'

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function polygon(cx: number, cy: number, values: number[], maxR: number) {
  const n = values.length
  return values
    .map((v, i) => {
      const { x, y } = polarToXY(cx, cy, (v / 100) * maxR, (360 / n) * i)
      return `${x},${y}`
    })
    .join(' ')
}

export function RadarChart({ values = CLARITY_SAMPLE_SCORES, size = 280 }: { values?: number[]; size?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })
  const cx = size / 2
  const cy = size / 2
  const maxR = size * 0.38
  const n = CLARITY_DIMENSIONS.length
  const gridLevels = [20, 40, 60, 80, 100]

  return (
    <div className="flex flex-col items-center gap-6">
      <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gridLevels.map((level) => {
          const pts = Array.from({ length: n }, (_, i) => {
            const { x, y } = polarToXY(cx, cy, (level / 100) * maxR, (360 / n) * i)
            return `${x},${y}`
          }).join(' ')
          return <polygon key={level} points={pts} fill="none" stroke="var(--z-border)" strokeWidth="1" />
        })}

        {Array.from({ length: n }, (_, i) => {
          const { x, y } = polarToXY(cx, cy, maxR, (360 / n) * i)
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--z-border)" strokeWidth="1" />
        })}

        <motion.polygon
          points={polygon(cx, cy, isInView ? values : values.map(() => 0), maxR)}
          fill="rgba(43,238,75,0.08)"
          stroke="var(--z-accent)"
          strokeWidth="2"
          initial={false}
          animate={{ points: polygon(cx, cy, isInView ? values : values.map(() => 0), maxR) }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {CLARITY_DIMENSIONS.map((label, i) => {
          const { x, y } = polarToXY(cx, cy, maxR + 28, (360 / n) * i)
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              fill="var(--z-secondary)" fontSize="10" fontFamily="Instrument Serif, Georgia, serif"
              fontStyle="italic"
            >
              {label}
            </text>
          )
        })}
      </svg>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
        {CLARITY_DIMENSIONS.map((dim, i) => (
          <div key={dim} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-voltage flex-shrink-0" />
            <span className="text-sage text-xs">
              {dim}: <span className="text-obsidian-ink font-mono">{values[i]}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
