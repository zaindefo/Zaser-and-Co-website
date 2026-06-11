'use client'
import { motion } from 'framer-motion'
import { TICKER_ITEMS } from '@/lib/constants'

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="overflow-hidden border-t border-b border-mist bg-mist/30 py-3">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-sage font-mono text-sm flex-shrink-0">
            {item} <span className="text-sage/60 mx-4">&bull;</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
