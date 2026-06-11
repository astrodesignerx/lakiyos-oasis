'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants = {
  primary: 'bg-coral text-white hover:bg-coral-dark shadow-md hover:shadow-lg',
  secondary: 'bg-yellow text-charcoal hover:bg-yellow-dark shadow-md hover:shadow-lg',
  outline: 'border-2 border-white text-white hover:bg-white/10',
  ghost: 'text-coral hover:text-coral-dark underline underline-offset-4 decoration-1',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({ children, href, variant = 'primary', size = 'md', className, onClick, type, disabled }: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300',
    'min-h-[44px]',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <motion.div whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : 0.98 }}>
        <Link href={href} className={base}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={base}
      onClick={disabled ? undefined : onClick}
      type={type ?? 'button'}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}
