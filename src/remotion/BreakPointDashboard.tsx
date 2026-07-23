import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion'

const BG = '#050507'
const SURFACE = '#0C0D12'
const CHROME_DARK = '#5A5B66'
const CHROME = '#8B8D97'
const CHROME_PEAK = '#E2E4E9'
const ACCENT = '#1D2464'
const PROFIT = '#4ECDC4'
const CAUTION = '#b7791f'
const LOSS = '#E06C6C'
const BORDER = 'rgba(200,202,208,0.08)'

function formatBDT(n: number) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return `৳${s}`
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  const pairs = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return `৳${pairs},${last3}`
}

function GridBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={CHROME} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

function MetricCard({ label, value, color, x, y, delay, frame }: {
  label: string; value: string; color: string; x: number; y: number; delay: number; frame: number
}) {
  const entryProgress = interpolate(frame, [30 + delay, 45 + delay], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const opacity = entryProgress
  const translateY = interpolate(entryProgress, [0, 1], [20, 0])

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 200, padding: '14px 16px',
      background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8,
      opacity, transform: `translateY(${translateY}px)`,
    }}>
      <div style={{ fontFamily: 'monospace', fontSize: 10, color: CHROME_DARK, letterSpacing: '0.15em', marginBottom: 8, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 24, fontWeight: 600, color, lineHeight: 1 }}>
        {value}
      </div>
    </div>
  )
}

export const BreakPointDashboard: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Label typing
  const labelChars = Math.min(Math.floor(interpolate(frame, [5, 25], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })), 12)
  const labelText = 'BREAKPOINT™'.slice(0, labelChars)
  const subtitleOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Revenue counter
  const revenue = Math.round(interpolate(frame, [75, 240], [0, 731000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
  const breakEven = 682000
  const zeroDayCrossed = frame >= 180
  const progressPct = Math.min((revenue / breakEven) * 100, 100)

  // Progress bar
  const barWidth = interpolate(frame, [75, 210], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const barColor = zeroDayCrossed ? PROFIT : CAUTION

  // Chart line drawing
  const chartProgress = interpolate(frame, [120, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Zero Day celebration
  const zdScale = zeroDayCrossed ? spring({ fps, frame: frame - 180, config: { damping: 12, stiffness: 200 } }) : 0
  const zdRingScale = zeroDayCrossed ? 1 + Math.sin((frame - 180) * 0.15) * 0.08 : 0

  // Profit counter (after crossing)
  const profitValue = frame >= 210 ? Math.round(interpolate(frame, [210, 270], [0, 49000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })) : 0

  // WhatsApp notification
  const notifX = interpolate(frame, [215, 230, 255, 265], [120, 0, 0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Fade at end
  const fadeOut = interpolate(frame, [270, 295], [1, 0.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // Chart SVG points
  const chartPoints: string[] = []
  const breakEvenY = 420
  const chartStartX = 60
  const chartEndX = 900
  const chartStartY = 560
  for (let d = 0; d <= 31; d++) {
    const x = chartStartX + (d / 31) * (chartEndX - chartStartX)
    const revenueAtDay = (d / 31) * 731000
    const y = chartStartY - (revenueAtDay / 800000) * (chartStartY - 340)
    chartPoints.push(`${x},${y}`)
  }
  const visiblePoints = chartPoints.slice(0, Math.floor(chartProgress * 32))
  const chartPath = visiblePoints.length > 1 ? `M ${visiblePoints.join(' L ')}` : ''

  const breakEvenLineY = chartStartY - (breakEven / 800000) * (chartStartY - 340)

  return (
    <div style={{ width: 960, height: 640, background: BG, position: 'relative', overflow: 'hidden', opacity: fadeOut }}>
      <GridBg />

      {/* Label */}
      <div style={{ position: 'absolute', left: 40, top: 24, zIndex: 2 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: CHROME_DARK, letterSpacing: '0.15em' }}>
          {labelText}
          <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: CHROME_DARK, opacity: subtitleOpacity, marginTop: 4 }}>
          Financial Intelligence
        </div>
      </div>

      {/* Metric cards */}
      <MetricCard label="Break-Even" value={frame >= 75 ? formatBDT(breakEven) : 'calculating...'} color={CHROME_PEAK} x={40} y={70} delay={0} frame={frame} />
      <MetricCard label="Current Revenue" value={frame >= 75 ? formatBDT(revenue) : '—'} color={zeroDayCrossed ? PROFIT : CHROME_PEAK} x={260} y={70} delay={4} frame={frame} />
      <MetricCard label="Days Remaining" value={frame >= 40 ? `${31 - Math.floor(interpolate(frame, [75, 240], [1, 28], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))}` : '—'} color={CHROME} x={480} y={70} delay={8} frame={frame} />
      <MetricCard label="Profit Pulse" value={zeroDayCrossed ? '●' : '—'} color={zeroDayCrossed ? PROFIT : CHROME_DARK} x={700} y={70} delay={12} frame={frame} />

      {/* Progress bar */}
      <div style={{ position: 'absolute', left: 40, right: 40, top: 165, height: 3, background: BORDER, borderRadius: 2 }}>
        <div style={{ width: `${barWidth}%`, height: '100%', background: barColor, borderRadius: 2, transition: 'background 0.3s' }} />
      </div>

      {/* Chart area */}
      <svg style={{ position: 'absolute', left: 0, top: 0, width: 960, height: 640 }}>
        {/* Break-even dashed line */}
        {frame >= 120 && (
          <line x1={chartStartX} y1={breakEvenLineY} x2={chartEndX} y2={breakEvenLineY} stroke={CHROME_DARK} strokeWidth={1} strokeDasharray="6 4" opacity={0.5} />
        )}
        {frame >= 120 && (
          <text x={chartEndX + 8} y={breakEvenLineY + 4} fill={CHROME_DARK} fontSize={9} fontFamily="monospace">B/E</text>
        )}
        {/* Revenue line */}
        {chartPath && (
          <path d={chartPath} fill="none" stroke={zeroDayCrossed ? PROFIT : ACCENT} strokeWidth={2} />
        )}
        {/* Pulsing dot at tip */}
        {visiblePoints.length > 0 && frame >= 120 && (() => {
          const last = visiblePoints[visiblePoints.length - 1].split(',')
          const cx = parseFloat(last[0])
          const cy = parseFloat(last[1])
          return (
            <>
              <circle cx={cx} cy={cy} r={4 + Math.sin(frame * 0.2) * 1.5} fill={zeroDayCrossed ? PROFIT : ACCENT} opacity={0.8} />
              <circle cx={cx} cy={cy} r={2} fill="#fff" />
            </>
          )
        })()}
        {/* Zero Day crossing */}
        {zeroDayCrossed && (
          <>
            <circle cx={620} cy={breakEvenLineY} r={12 * zdRingScale} fill="none" stroke={PROFIT} strokeWidth={2} opacity={0.6} />
            <circle cx={620} cy={breakEvenLineY} r={4} fill={PROFIT} />
          </>
        )}
      </svg>

      {/* Zero Day text */}
      {zeroDayCrossed && (
        <div style={{
          position: 'absolute', left: 580, top: breakEvenLineY - 50,
          fontFamily: 'Impact, sans-serif', fontSize: 36, color: PROFIT,
          letterSpacing: '0.04em', transform: `scale(${zdScale})`, transformOrigin: 'center',
        }}>
          ZERO DAY
        </div>
      )}

      {/* Profit counter */}
      {frame >= 210 && (
        <div style={{ position: 'absolute', left: 40, bottom: 50, zIndex: 3 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: CHROME_DARK, letterSpacing: '0.15em', marginBottom: 6 }}>
            PROFIT THIS MONTH
          </div>
          <div style={{ fontFamily: 'Impact, sans-serif', fontSize: 44, color: CHROME_PEAK, lineHeight: 1 }}>
            {formatBDT(profitValue)}
          </div>
        </div>
      )}

      {/* WhatsApp notification */}
      <div style={{
        position: 'absolute', right: 24, bottom: 40,
        background: '#1a2e1a', border: '1px solid rgba(37,211,102,0.2)',
        borderRadius: 10, padding: '12px 16px', width: 280,
        transform: `translateX(${notifX}%)`, opacity: notifX < 100 ? 1 : 0,
        zIndex: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 14 }}>🎯</span>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 600, color: '#25D366' }}>WhatsApp Alert</span>
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: CHROME, lineHeight: 1.5 }}>
          Zero Day reached — Day 19. You&apos;re in profit.
        </div>
      </div>
    </div>
  )
}
