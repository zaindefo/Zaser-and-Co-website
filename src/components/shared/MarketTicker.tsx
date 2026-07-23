'use client'
import { TICKER_ITEMS } from '@/lib/constants'

const ROWS = [
  { items: [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS], duration: '30s', direction: 'normal' as const, opacity: 0.85 },
  { items: [...TICKER_ITEMS.slice(2), ...TICKER_ITEMS, ...TICKER_ITEMS.slice(0, 2), ...TICKER_ITEMS], duration: '45s', direction: 'reverse' as const, opacity: 0.5 },
  { items: [...TICKER_ITEMS.slice(4), ...TICKER_ITEMS, ...TICKER_ITEMS.slice(0, 4), ...TICKER_ITEMS], duration: '65s', direction: 'normal' as const, opacity: 0.3 },
]

export function MarketTicker({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const isDark = variant === 'dark'
  const textColor = isDark ? '#C8CAD0' : '#5A5B66'
  const dotColor = isDark ? '#5A5B66' : '#c8d2c8'
  const bg = isDark ? 'rgba(12,13,18,0.6)' : 'rgba(200,210,200,0.12)'
  const border = isDark ? 'rgba(200,202,208,0.08)' : 'rgba(200,210,200,0.25)'

  return (
    <div style={{
      width: '100%', overflow: 'hidden',
      background: bg,
      borderTop: `1px solid ${border}`,
      borderBottom: `1px solid ${border}`,
      padding: '14px 0',
      display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      {ROWS.map((row, ri) => (
        <div key={ri} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{
            display: 'inline-flex', gap: '56px',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '13px',
            fontWeight: 500,
            color: textColor,
            opacity: row.opacity,
            letterSpacing: '0.04em',
            animation: `market-ticker-scroll ${row.duration} linear infinite`,
            animationDirection: row.direction,
          }}>
            {row.items.map((item, i) => (
              <span key={i} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: dotColor, fontSize: '6px' }}>◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes market-ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  )
}
