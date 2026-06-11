import { MagneticButton } from '@/components/shared/MagneticButton'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <p className="font-mono text-8xl font-medium text-obsidian-ink/10 mb-6">404</p>
        <h1 className="font-twk-lausanne text-3xl md:text-4xl text-obsidian-ink mb-4 tracking-tight">
          This page has Ghost Profit.
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
