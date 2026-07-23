import React from 'react'
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

const BG = '#050507'
const SURFACE = '#0C0D12'
const CHROME_DARK = '#5A5B66'
const CHROME = '#8B8D97'
const CHROME_PEAK = '#E2E4E9'
const INFO = '#6CA0DC'
const PROFIT = '#4ECDC4'
const CAUTION = '#b7791f'
const LOSS = '#E06C6C'
const BORDER = 'rgba(200,202,208,0.08)'

const PRODUCTS = [
  { name: 'Premium Hijab Set', sku: 'HJB-401', stock: 142, velocity: 8.3, status: 'fast' },
  { name: 'Abaya Classic Black', sku: 'ABY-102', stock: 23, velocity: 4.1, status: 'medium' },
  { name: 'Kurti Printed Lawn', sku: 'KRT-287', stock: 312, velocity: 0.4, status: 'dead' },
  { name: 'Prayer Mat Deluxe', sku: 'PRM-055', stock: 8, velocity: 6.7, status: 'critical' },
  { name: 'Attar Rose 12ml', sku: 'ATR-019', stock: 67, velocity: 2.1, status: 'slow' },
]

const STATUS_COLORS: Record<string, string> = {
  fast: PROFIT, medium: INFO, dead: CHROME_DARK, critical: LOSS, slow: CAUTION,
}

function formatBDT(n: number) {
  const s = Math.round(n).toString()
  if (s.length <= 3) return `৳${s}`
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  const pairs = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return `৳${pairs},${last3}`
}

export const StockPulseDashboard: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const labelChars = Math.min(Math.floor(interpolate(frame, [5, 22], [0, 11], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })), 11)
  const labelText = 'STOCKPULSE™'.slice(0, labelChars)
  const subtitleOpacity = interpolate(frame, [18, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const tableOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const deadShelfValue = frame >= 120 ? Math.round(interpolate(frame, [120, 180], [0, 177000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })) : 0

  const alertSlide = interpolate(frame, [185, 200, 240, 250], [120, 0, 0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const fadeOut = interpolate(frame, [245, 265], [1, 0.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <div style={{ width: 960, height: 640, background: BG, position: 'relative', overflow: 'hidden', opacity: fadeOut }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="sgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={CHROME} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sgrid)" />
        </svg>
      </div>

      {/* Label */}
      <div style={{ position: 'absolute', left: 40, top: 24, zIndex: 2 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: INFO, letterSpacing: '0.15em' }}>
          {labelText}
          <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: CHROME_DARK, opacity: subtitleOpacity, marginTop: 4 }}>
          Inventory Intelligence
        </div>
      </div>

      {/* Summary cards */}
      {[
        { label: 'Total SKUs', value: '487', color: CHROME_PEAK, delay: 0 },
        { label: 'Dead Shelf', value: frame >= 120 ? formatBDT(deadShelfValue) : '—', color: LOSS, delay: 4 },
        { label: 'Velocity Avg', value: frame >= 60 ? '3.2/day' : '—', color: INFO, delay: 8 },
      ].map((card, i) => {
        const entryProgress = interpolate(frame, [30 + card.delay, 45 + card.delay], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return (
          <div key={i} style={{
            position: 'absolute', left: 40 + i * 220, top: 70,
            width: 200, padding: '14px 16px',
            background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 8,
            opacity: entryProgress, transform: `translateY(${interpolate(entryProgress, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ fontFamily: 'monospace', fontSize: 10, color: CHROME_DARK, letterSpacing: '0.15em', marginBottom: 8, textTransform: 'uppercase' }}>
              {card.label}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 24, fontWeight: 600, color: card.color, lineHeight: 1 }}>
              {card.value}
            </div>
          </div>
        )
      })}

      {/* Table */}
      <div style={{
        position: 'absolute', left: 40, right: 40, top: 170,
        opacity: tableOpacity, transform: `translateY(${interpolate(tableOpacity, [0, 1], [12, 0])}px)`,
      }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          padding: '10px 16px', borderBottom: `1px solid ${BORDER}`,
        }}>
          {['Product', 'SKU', 'Stock', 'Velocity', 'Status'].map((h) => (
            <div key={h} style={{ fontFamily: 'monospace', fontSize: 9, color: CHROME_DARK, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {h}
            </div>
          ))}
        </div>
        {/* Rows */}
        {PRODUCTS.map((p, i) => {
          const rowDelay = 50 + i * 8
          const rowOpacity = interpolate(frame, [rowDelay, rowDelay + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          const isHighlighted = p.status === 'dead' && frame >= 130
          const isCritical = p.status === 'critical' && frame >= 160

          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              padding: '12px 16px', borderBottom: `1px solid ${BORDER}`,
              opacity: rowOpacity,
              background: isHighlighted ? 'rgba(224,108,108,0.06)' : isCritical ? 'rgba(224,108,108,0.04)' : 'transparent',
              transition: 'background 0.4s',
            }}>
              <div style={{ fontFamily: 'sans-serif', fontSize: 13, color: CHROME_PEAK, fontWeight: 500 }}>
                {p.name}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: CHROME_DARK }}>
                {p.sku}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, color: p.stock < 10 ? LOSS : CHROME }}>
                {p.stock}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, color: STATUS_COLORS[p.status] || CHROME }}>
                {p.velocity}/d
              </div>
              <div style={{
                fontFamily: 'monospace', fontSize: 10, color: STATUS_COLORS[p.status] || CHROME,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: STATUS_COLORS[p.status] || CHROME,
                  opacity: p.status === 'critical' ? (frame % 20 < 10 ? 1 : 0.3) : 1,
                }} />
                {p.status}
              </div>
            </div>
          )
        })}
      </div>

      {/* Dead Shelf callout */}
      {frame >= 140 && (
        <div style={{
          position: 'absolute', right: 40, top: 70,
          width: 200, padding: '14px 16px',
          background: 'rgba(224,108,108,0.08)', border: `1px solid rgba(224,108,108,0.2)`, borderRadius: 8,
          opacity: interpolate(frame, [140, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <div style={{ fontFamily: 'monospace', fontSize: 10, color: LOSS, letterSpacing: '0.15em', marginBottom: 8 }}>
            DEAD SHELF ALERT
          </div>
          <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: CHROME, lineHeight: 1.5 }}>
            312 units of Kurti Printed Lawn — zero movement in 47 days.
          </div>
        </div>
      )}

      {/* Reorder alert */}
      <div style={{
        position: 'absolute', right: 24, bottom: 40,
        background: '#1a1e2e', border: `1px solid rgba(108,160,220,0.2)`,
        borderRadius: 10, padding: '12px 16px', width: 280,
        transform: `translateX(${alertSlide}%)`, opacity: alertSlide < 100 ? 1 : 0,
        zIndex: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 14 }}>📦</span>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 600, color: INFO }}>Reorder Alert</span>
        </div>
        <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: CHROME, lineHeight: 1.5 }}>
          Prayer Mat Deluxe — 8 units left, 1.2 days until stockout at current velocity.
        </div>
      </div>
    </div>
  )
}
