interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="font-accent text-coral text-lg md:text-xl">
      {children}
    </span>
  )
}
