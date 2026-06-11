import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'dark' | 'light' | 'positive' | 'negative'
}

export function Card({ children, className, variant = 'dark' }: CardProps) {
  const styles = {
    dark: 'card',
    light: 'card-light',
    positive: 'bg-[var(--z-profit-dim)] border border-[#6B9C7D]/20 rounded-card',
    negative: 'bg-[var(--z-loss-dim)] border border-[#C07256]/20 rounded-card',
  }
  return (
    <div className={cn(styles[variant], 'p-6', className)}>
      {children}
    </div>
  )
}
