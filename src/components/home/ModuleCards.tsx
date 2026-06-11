'use client'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { BREAKPOINT_MODULE, STOCKPULSE_MODULE } from '@/lib/constants'

function ModuleCard({ module, href, flip = false }: { module: any; href: string; flip?: boolean }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-60 items-center py-60 ${flip ? 'lg:[direction:rtl]' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={flip ? 'lg:[direction:ltr]' : ''}
      >
        <span className="text-caption text-voltage font-550 uppercase tracking-widest">{module.tag}</span>
        <h3 className="text-heading-lg text-obsidian-ink mt-15 mb-30">{module.headline}</h3>
        <p className="text-body-sm-2 text-obsidian-ink mb-40 leading-relaxed">{module.description}</p>
        <ul className="space-y-12 mb-40">
          {module.features.map((f: any, i: number) => (
            <li key={i} className="flex items-start gap-10">
              <span className="text-voltage mt-2">◆</span>
              <span className="text-body-sm text-obsidian-ink">{f.text}</span>
            </li>
          ))}
        </ul>
        <blockquote className="border-l-4 border-voltage pl-20 mb-40">
          <p className="text-body-sm text-obsidian-ink italic">{module.quote}</p>
        </blockquote>
        <MagneticButton href={href} size="lg">
          Learn more →
        </MagneticButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: flip ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden lg:flex items-center justify-center"
      >
        <div className="w-full aspect-square bg-obsidian-ink rounded-card" />
      </motion.div>
    </div>
  )
}

export function ModuleCards() {
  return (
    <section className="section-padding bg-linen border-t border-mist">
      <div className="page-container">
        <ModuleCard module={BREAKPOINT_MODULE} href="/breakpoint" />
        <div className="my-60 border-t border-mist" />
        <ModuleCard module={STOCKPULSE_MODULE} href="/stockpulse" flip />
      </div>
    </section>
  )
}
