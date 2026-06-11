'use client'
import { PageTransition } from '@/components/shared/PageTransition'

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
