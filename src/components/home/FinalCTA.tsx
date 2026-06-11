'use client'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/shared/MagneticButton'

export function FinalCTA() {
  return (
    <section className="section-padding bg-linen border-t border-mist">
      <div className="page-container text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-obsidian-ink mb-40"
        >
          The clarity is yours to keep.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-body-sm-2 text-obsidian-ink mb-30 leading-relaxed"
        >
          Request a diagnostic. In 30 minutes, you'll know your Clarity Score, your biggest blind spots, and where the highest-impact opportunities are.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-body-sm text-sage mb-40"
        >
          The insight is free. What you do with it is up to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <MagneticButton href="/contact" size="lg">
            Request a diagnostic →
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: '48px' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="accent-tick mx-auto mt-60"
        />
      </div>
    </section>
  )
}
