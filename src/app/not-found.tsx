import { MagneticButton } from '@/components/shared/MagneticButton'
import { TopoWaveField } from '@/components/shared/TopoWaveField'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative bg-linen">
      <TopoWaveField className="z-0" lineCount={22} amplitude={28} />
      <div className="text-center max-w-xl relative z-10">
        <p className="text-8xl font-medium text-obsidian-ink/10 mb-6" style={{ fontFamily: 'var(--font-dm-mono)' }}>404</p>
        <h1 className="font-twk-lausanne text-3xl md:text-4xl text-obsidian-ink mb-4 tracking-tight">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-sage text-lg mb-8 leading-relaxed">
          It looks like it exists, but it doesn&apos;t.
          Let&apos;s get you back to reality.
        </p>
        <MagneticButton href="/" size="lg">Return to clarity →</MagneticButton>
      </div>
    </main>
  )
}
