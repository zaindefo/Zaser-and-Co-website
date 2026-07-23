import React from 'react'
import { useCurrentFrame, interpolate } from 'remotion'

const NAVY = '#1D2464'
const RUST = '#8C3A1A'

// Ramanujan ellipse perimeter approximation
function ellipsePerim(rx: number, ry: number) {
  return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)))
}

const SPARK: [number, number][] = [
  [50, 270], [100, 248], [155, 264], [210, 222],
  [270, 238], [328, 195], [385, 210], [442, 170],
  [500, 182], [555, 145],
]

const SPARK_PATH = SPARK.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
const AREA_PATH = `${SPARK_PATH} L${SPARK[SPARK.length - 1][0]},330 L${SPARK[0][0]},330 Z`
const SPARK_LEN = 560

export function HeroBrandPattern() {
  const frame = useCurrentFrame()

  const clamp = (v: number) => ({ extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const })

  const grid  = interpolate(frame, [0,  40], [0, 1], clamp(0))
  const ell1  = interpolate(frame, [5,  50], [0, 1], clamp(0))
  const ell2  = interpolate(frame, [20, 60], [0, 1], clamp(0))
  const line  = interpolate(frame, [45, 95], [0, 1], clamp(0))
  const label = interpolate(frame, [55, 80], [0, 1], clamp(0))

  const rx1 = 268, ry1 = 104
  const rx2 = 192, ry2 = 72
  const p1 = ellipsePerim(rx1, ry1)
  const p2 = ellipsePerim(rx2, ry2)

  return (
    <svg viewBox="0 0 600 380" style={{ width: '100%', height: '100%' }}>
      {/* Diagonal ruled grid */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={-80 + i * 55} y1={0}
          x2={-80 + i * 55 + 220} y2={380}
          stroke={NAVY}
          strokeWidth={0.5}
          opacity={grid * 0.14}
        />
      ))}

      {/* Outer ellipse — midnight navy */}
      <ellipse
        cx={300} cy={168}
        rx={rx1} ry={ry1}
        fill="none"
        stroke={NAVY}
        strokeWidth={1.6}
        strokeDasharray={p1}
        strokeDashoffset={p1 * (1 - ell1)}
        opacity={0.7}
      />

      {/* Inner ellipse — rust */}
      <ellipse
        cx={300} cy={168}
        rx={rx2} ry={ry2}
        fill="none"
        stroke={RUST}
        strokeWidth={1}
        strokeDasharray={p2}
        strokeDashoffset={p2 * (1 - ell2)}
        opacity={0.6}
      />

      {/* Brand label inside ellipse */}
      <text
        x={300} y={172}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Bebas Neue', Impact, sans-serif"
        fontSize={13}
        letterSpacing={5}
        fill={NAVY}
        opacity={label * 0.2}
      >
        ZASER &amp; CO · EST. 2026
      </text>

      {/* Sparkline area */}
      <path d={AREA_PATH} fill={`rgba(29,36,100,${line * 0.07})`} />

      {/* Sparkline */}
      <path
        d={SPARK_PATH}
        fill="none"
        stroke={NAVY}
        strokeWidth={1.5}
        strokeDasharray={SPARK_LEN}
        strokeDashoffset={SPARK_LEN * (1 - line)}
        opacity={0.85}
      />

      {/* Diamond data points */}
      {SPARK.map(([x, y], i) => {
        const d = interpolate(frame, [82 + i * 4, 90 + i * 4], [0, 1], clamp(0))
        return (
          <rect
            key={i}
            x={x - 3} y={y - 3}
            width={6} height={6}
            fill={i === SPARK.length - 1 ? RUST : NAVY}
            opacity={d * 0.9}
            transform={`rotate(45,${x},${y})`}
          />
        )
      })}

      {/* Horizontal baseline */}
      <line
        x1={50} y1={330}
        x2={555} y2={330}
        stroke={NAVY}
        strokeWidth={0.5}
        opacity={grid * 0.25}
      />

      {/* Rust accent tick at chart peak */}
      <line
        x1={555} y1={135}
        x2={555} y2={155}
        stroke={RUST}
        strokeWidth={2}
        opacity={interpolate(frame, [95, 110], [0, 1], clamp(0)) * 0.9}
      />
    </svg>
  )
}
