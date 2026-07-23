import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Zaser & Co — Strategic & Management Consultancy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F1235',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '16px' }}>
          <span style={{ fontSize: '52px', fontWeight: 700, color: '#F6EFE4', letterSpacing: '0.05em' }}>
            ZASER
          </span>
          <span style={{ fontSize: '52px', fontWeight: 700, color: '#C4866A', letterSpacing: '0.05em', marginLeft: '12px' }}>
            & CO
          </span>
        </div>
        <div
          style={{
            width: '80px',
            height: '2px',
            background: '#C4866A',
            marginBottom: '32px',
          }}
        />
        <p style={{ fontSize: '36px', fontWeight: 300, color: '#F6EFE4', lineHeight: 1.3, maxWidth: '800px', marginBottom: '24px' }}>
          Strategic & Management Consultancy for Growing Businesses
        </p>
        <p style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(246,239,228,0.6)', lineHeight: 1.5 }}>
          Financial Clarity · Margin & Operations · AI Implementation · Content Systems · HR & Training
        </p>
        <div style={{ display: 'flex', position: 'absolute', bottom: '40px', left: '80px', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: 'rgba(246,239,228,0.4)', letterSpacing: '0.1em' }}>
            zaserandco.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
