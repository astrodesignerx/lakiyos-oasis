import { cn } from '@/lib/utils'
import type { AvailabilityStatus } from '@/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'coral' | 'yellow' | 'sage' | 'charcoal'
  className?: string
}

const badgeVariants = {
  coral: 'bg-coral/15 text-coral border-coral/20',
  yellow: 'bg-yellow/20 text-yellow-dark border-yellow/30',
  sage: 'bg-sage/20 text-sage-dark border-sage/30',
  charcoal: 'bg-charcoal/10 text-warm-gray border-charcoal/10',
}

export function Badge({ children, variant = 'coral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
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
