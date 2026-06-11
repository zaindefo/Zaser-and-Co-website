'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { FAQ_ITEMS } from '@/lib/constants'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section-padding page-container bg-linen border-t border-mist">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-twk-lausanne text-3xl md:text-4xl text-obsidian-ink text-center mb-12 tracking-tight">
            Questions we get a lot.
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="card overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-chrome-bright focus-visible:ring-inset"
                >
                  <span className="font-twk-lausanne font-medium text-obsidian-ink text-base pr-4">{item.q}</span>
                  <motion.span
                    className="text-voltage text-xl flex-shrink-0 select-none"
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-obsidian-ink font-twk-lausanne text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
