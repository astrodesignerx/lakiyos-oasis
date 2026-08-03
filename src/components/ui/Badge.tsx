import { cn } from '@/lib/utils'
import type { AvailabilityStatus } from '@/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'coral' | 'yellow' | 'sage' | 'charcoal'
  className?: string
}

const badgeVariants = {
  coral: 'bg-pink text-white',
  yellow: 'bg-sunshine text-ink',
  sage: 'bg-green text-white',
  charcoal: 'bg-ink text-paper',
}

export function Badge({ children, variant = 'coral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0_0_var(--color-ink)]',
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  const config = {
    available: { label: 'Available', variant: 'sage' as const },
    limited: { label: 'Limited Spots', variant: 'yellow' as const },
    waitlist: { label: 'Waitlist', variant: 'coral' as const },
    'sold-out': { label: 'Sold Out', variant: 'charcoal' as const },
  }

  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}
