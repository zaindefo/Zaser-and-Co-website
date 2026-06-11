'use client'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export function FeatureGrid({ features }: { features: { icon: string; text: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((f, i) => (
        <ScrollReveal key={i} delay={i * 0.07}>
          <div className="card p-5 flex items-start gap-3 h-full">
            <span className="text-voltage text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
            <p className="text-obsidian-ink text-sm leading-relaxed font-body">{f.text}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
