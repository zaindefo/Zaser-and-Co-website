'use client'
import Link from 'next/link'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  glowBorder?: boolean
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}: MagneticButtonProps) {
  // Size padding maps
  const sizePadding = {
    sm: 'px-25 py-10',
    md: 'px-40 py-15',
    lg: 'px-50 py-20',
  }

  // Variant styles
  const variantClasses = {
    primary: 'bg-voltage text-obsidian-ink font-550 uppercase text-caption tracking-widest hover:opacity-90',
    ghost: 'bg-transparent text-obsidian-ink border border-obsidian-ink hover:bg-obsidian-ink hover:text-linen',
  }

  const classes = `${variantClasses[variant]} ${sizePadding[size]} rounded-btn transition-all duration-200 font-twk-lausanne inline-flex items-center justify-center gap-8 focus:outline-none focus:ring-2 focus:ring-voltage focus:ring-offset-4 focus:ring-offset-linen ${className}`

  // Voltage shadow for primary CTA
  const shadowStyle = variant === 'primary' ? {
    boxShadow: 'rgba(16, 94, 29, 0.45) 1px 8px 20px 0px, rgba(18, 146, 39, 0.25) 1px 8px 20px 0px'
  } : {}

  if (href) {
    return (
      <Link href={href} className={classes} style={shadowStyle}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes} style={shadowStyle}>
      {children}
    </button>
  )
}
