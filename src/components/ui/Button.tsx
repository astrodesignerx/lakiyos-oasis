'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-dark' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants = {
  primary: 'bg-pink text-white border-2 border-ink',
  secondary: 'bg-sunshine text-ink border-2 border-ink',
  outline: 'bg-paper text-ink border-2 border-ink',
  'outline-dark': 'bg-transparent text-ink border-2 border-ink',
  ghost: 'text-pink-dark hover:text-pink underline underline-offset-4 decoration-2',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({ children, href, variant = 'primary', size = 'md', className, onClick, type, disabled }: ButtonProps) {
  const solid = variant !== 'ghost'
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-heading font-bold transition-all duration-150',
    'min-h-[44px]',
    solid && 'rounded-2xl shadow-[4px_4px_0_0_var(--color-ink)]',
    solid && !disabled && 'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  if (href && disabled) {
    return <span className={base}>{children}</span>
  }

  return (
    <button
      className={base}
      onClick={disabled ? undefined : onClick}
      type={type ?? 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
