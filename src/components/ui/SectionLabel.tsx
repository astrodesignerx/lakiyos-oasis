interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-block font-accent text-xl md:text-2xl font-bold text-ink bg-sunshine border-2 border-ink rounded-full px-4 py-0.5 -rotate-2 shadow-[3px_3px_0_0_var(--color-ink)]">
      {children}
    </span>
  )
}
