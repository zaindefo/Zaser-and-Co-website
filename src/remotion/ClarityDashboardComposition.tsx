import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion'

const BG = '#0B0E2E'
const SURFACE = '#0F1235'
const ACCENT = '#1D2464'
const LINEN = '#F6EFE4'
const MUTED = 'rgba(246,239,228,0.4)'
const PROFIT = '#1a8a3e'
const BORDER = 'rgba(246,239,228,0.08)'

const DIMENSIONS = [
  { label: 'Financial visibility', score: 78 },
  { label: 'Operational efficiency', score: 65 },
  { label: 'AI readiness', score: 72 },
  { label: 'Growth trajectory', score: 81 },
  { label: 'Team capability', score: 60 },
]

const FINAL_SCORE = 28

function polarToXY(cx: number, cy: number, r: number, i: number, n: number) {
  const angle = ((360 / n) * i - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

export const ClarityDashboardComposition: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const n = DIMENSIONS.length

  const cx = 200
  const cy = 200
  const maxR = 140
  const gridLevels = [20, 40, 60, 80, 100]

  // Title
  const titleChars = Math.min(
    Math.floor(interpolate(frame, [5, 30], [0, 15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })),
    15,
  )
  const titleText = 'CLARITY SCORE™'.slice(0, titleChars)
  const subtitleOpacity = interpolate(frame, [28, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Grid draw
  const gridProgress = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Axis lines draw
  const axisProgress = (i: number) =>
    interpolate(frame, [50 + i * 6, 60 + i * 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Radar polygon trace — vertex by vertex
  const traceStartFrame = 80
  const tracePerVertex = 15
  const totalTraceFrames = n * tracePerVertex

  const vertices = DIMENSIONS.map((d, i) => {
    const vertexProgress = interpolate(
      frame,
      [traceStartFrame + i * tracePerVertex, traceStartFrame + (i + 1) * tracePerVertex],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    )
    return {
      target: polarToXY(cx, cy, (d.score / 100) * maxR, i, n),
      progress: vertexProgress,
    }
  })

  // Build animated polygon points
  const polygonPoints: string[] = []
  for (let i = 0; i < n; i++) {
    if (vertices[i].progress <= 0) break
    if (vertices[i].progress >= 1) {
      polygonPoints.push(`${vertices[i].target.x},${vertices[i].target.y}`)
    } else {
      const prev = i === 0
        ? { x: cx, y: cy - 0 }
        : vertices[i - 1].target
      const curr = vertices[i].target
      const x = prev.x + (curr.x - prev.x) * vertices[i].progress
      const y = prev.y + (curr.y - prev.y) * vertices[i].progress
      polygonPoints.push(`${x},${y}`)
    }
  }

  // Fill fade
  const fillOpacity = interpolate(
    frame,
    [traceStartFrame + totalTraceFrames, traceStartFrame + totalTraceFrames + 20],
    [0, 0.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

  // Labels type in
  const labelStartFrame = traceStartFrame + totalTraceFrames + 10
  const dimensionLabels = DIMENSIONS.map((d, i) => {
    const labelProgress = interpolate(
      frame,
      [labelStartFrame + i * 8, labelStartFrame + i * 8 + 12],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    )
    return { ...d, labelProgress }
  })

  // Score counter
  const scoreStartFrame = labelStartFrame + n * 8 + 15
  const scoreValue = Math.round(
    interpolate(frame, [scoreStartFrame, scoreStartFrame + 40], [0, FINAL_SCORE], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
  )

  // Diagnostic complete
  const completeOpacity = interpolate(
    frame,
    [scoreStartFrame + 50, scoreStartFrame + 65],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )

  return (
    <div style={{
      width: '100%', height: '100%', background: BG,
      display: 'flex', fontFamily: 'monospace',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.02 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cs-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke={LINEN} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cs-grid)" />
        </svg>
      </div>

      {/* Left: Radar */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        position: 'relative', zIndex: 2,
      }}>
        <svg width={400} height={400} viewBox="0 0 400 400">
          {/* Grid pentagons */}
          {gridLevels.map((level) => {
            const pts = Array.from({ length: n }, (_, i) => {
              const p = polarToXY(cx, cy, (level / 100) * maxR, i, n)
              return `${p.x},${p.y}`
            }).join(' ')
            return (
              <polygon
                key={level}
                points={pts}
                fill="none"
                stroke={LINEN}
                strokeWidth="0.5"
                opacity={gridProgress * 0.15}
              />
            )
          })}

          {/* Axis lines */}
          {Array.from({ length: n }, (_, i) => {
            const p = polarToXY(cx, cy, maxR, i, n)
            const progress = axisProgress(i)
            const endX = cx + (p.x - cx) * progress
            const endY = cy + (p.y - cy) * progress
            return (
              <line
                key={`axis-${i}`}
                x1={cx} y1={cy} x2={endX} y2={endY}
                stroke={LINEN} strokeWidth="0.5" opacity={0.2}
              />
            )
          })}

          {/* Data polygon fill */}
          {polygonPoints.length >= 3 && (
            <polygon
              points={polygonPoints.join(' ')}
              fill={ACCENT}
              opacity={fillOpacity}
            />
          )}

          {/* Data polygon stroke */}
          {polygonPoints.length >= 2 && (
            <polyline
              points={polygonPoints.join(' ') + (polygonPoints.length === n ? ` ${polygonPoints[0]}` : '')}
              fill="none"
              stroke={ACCENT}
              strokeWidth="2"
              strokeLinejoin="round"
              opacity={0.9}
            />
          )}

          {/* Vertex dots */}
          {vertices.map((v, i) => (
            v.progress >= 1 && (
              <circle
                key={`dot-${i}`}
                cx={v.target.x} cy={v.target.y} r={5}
                fill={ACCENT} stroke={LINEN} strokeWidth="2"
              />
            )
          ))}

          {/* Dimension labels */}
          {dimensionLabels.map((d, i) => {
            const p = polarToXY(cx, cy, maxR + 30, i, n)
            const chars = Math.floor(d.labelProgress * d.label.length)
            return (
              <text
                key={`label-${i}`}
                x={p.x} y={p.y}
                textAnchor="middle" dominantBaseline="middle"
                fill={LINEN} fontSize="9" opacity={d.labelProgress > 0 ? 0.5 : 0}
                fontStyle="italic"
              >
                {d.label.slice(0, chars)}
              </text>
            )
          })}
        </svg>
      </div>

      {/* Right: Score + details */}
      <div style={{
        width: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingRight: 40, position: 'relative', zIndex: 2,
      }}>
        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.2em', color: MUTED,
            marginBottom: 8,
          }}>
            DIAGNOSTIC
          </div>
          <div style={{
            fontSize: 22, fontWeight: 700, color: LINEN,
            letterSpacing: '0.04em', lineHeight: 1.1,
          }}>
            {titleText}
            <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>▌</span>
          </div>
          <div style={{ fontSize: 12, color: MUTED, marginTop: 6, opacity: subtitleOpacity }}>
            5-dimension business health scan
          </div>
        </div>

        {/* Score card */}
        <div style={{
          background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10,
          padding: '24px 20px', textAlign: 'center', marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: MUTED, letterSpacing: '0.1em', marginBottom: 8 }}>
            YOUR SCORE
          </div>
          <div style={{
            fontSize: 64, fontWeight: 700, color: LINEN,
            lineHeight: 1,
          }}>
            {scoreValue}
          </div>
          <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>out of 100</div>
        </div>

        {/* Dimension scores */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {dimensionLabels.map((d, i) => {
            const barProgress = interpolate(
              frame,
              [scoreStartFrame + i * 5, scoreStartFrame + i * 5 + 20],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            )
            return (
              <div key={i} style={{ opacity: d.labelProgress }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', fontSize: 9, color: MUTED, marginBottom: 3,
                }}>
                  <span>{d.label}</span>
                  <span style={{ color: LINEN, fontWeight: 600 }}>{Math.round(d.score * barProgress)}</span>
                </div>
                <div style={{
                  width: '100%', height: 3, background: BORDER, borderRadius: 2,
                }}>
                  <div style={{
                    width: `${barProgress * (d.score)}%`, height: '100%',
                    background: ACCENT, borderRadius: 2,
                  }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Diagnostic complete stamp */}
        <div style={{
          marginTop: 24, textAlign: 'center', opacity: completeOpacity,
        }}>
          <div style={{
            display: 'inline-block', border: `1px solid ${PROFIT}`,
            borderRadius: 6, padding: '6px 14px',
            fontSize: 10, letterSpacing: '0.15em', color: PROFIT,
            fontWeight: 700,
          }}>
            ✓ DIAGNOSTIC COMPLETE
          </div>
        </div>
      </div>
    </div>
  )
}
