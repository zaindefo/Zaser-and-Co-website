'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

export function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    let seq: string[] = []

    const onKey = (e: KeyboardEvent) => {
      seq.push(e.code)
      if (seq.length > KONAMI.length) seq = seq.slice(-KONAMI.length)
      if (seq.length === KONAMI.length && seq.every((k, i) => k === KONAMI[i])) {
        // Scramble all numbers on page
        const monos = document.querySelectorAll('.font-mono')
        const originals = Array.from(monos).map((el) => el.textContent || '')
        const chars = '0123456789৳,.'
        let frame = 0
        const scramble = () => {
          monos.forEach((el) => {
            const len = (el.textContent || '').length
            el.textContent = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
          })
          frame++
          if (frame < 40) requestAnimationFrame(scramble)
          else monos.forEach((el, i) => { el.textContent = originals[i] })
        }
        requestAnimationFrame(scramble)
        setToast("Nice try — but your real numbers don't scramble that easily.")
        setTimeout(() => setToast(null), 4000)
        seq = []
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10001] card px-6 py-3 text-obsidian-ink font-twk-lausanne text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
