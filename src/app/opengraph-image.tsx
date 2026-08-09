import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Zaser & Co | Advisory That Builds'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, color: '#F3EEE5', background: '#0F1428', fontFamily: 'Arial, sans-serif' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, textTransform: 'uppercase' }}><strong>Zaser &amp; Co</strong><span style={{ color: '#AAAAAA' }}>Dhaka / 2026</span></div><div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}><div style={{ maxWidth: 870, fontSize: 96, fontWeight: 700, lineHeight: .88, textTransform: 'uppercase' }}>Advisory<br />That <span style={{ color: '#8C2800' }}>Builds.</span></div><div style={{ width: 140, height: 140, border: '1px solid #F3EEE5', borderRadius: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>↗</div></div></div>, size)
}
