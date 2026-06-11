'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linen border-b border-mist">
      <div className="max-w-page mx-auto px-20 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex gap-1 items-baseline">
          <span className="text-heading-sm md:text-heading text-obsidian-ink">Zaser</span>
          <span className="text-heading-sm md:text-heading text-voltage">&amp; Co</span>
        </Link>

        {/* Desktop Menu Links */}
        <nav className="hidden md:flex items-center gap-40">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-sm-2 text-obsidian-ink hover:text-voltage transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-obsidian-ink p-8 -mr-8"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={open ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-6 flex flex-col justify-center gap-1.5"
          >
            <div className={`h-0.5 w-full bg-obsidian-ink transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`h-0.5 w-full bg-obsidian-ink ${open ? 'opacity-0' : 'opacity-100'}`} />
            <div className={`h-0.5 w-full bg-obsidian-ink transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-linen border-t border-mist overflow-hidden"
          >
            <nav className="px-20 py-20 flex flex-col gap-15">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-body-sm-2 text-obsidian-ink hover:text-voltage transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
