'use client'
import { useSmoothScroll } from '@/lib/lenis'
import { CustomCursor } from '@/components/shared/CustomCursor'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { EasterEggs } from '@/components/shared/EasterEggs'

export function GlobalEffects() {
  useSmoothScroll()

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <EasterEggs />
    </>
  )
}
