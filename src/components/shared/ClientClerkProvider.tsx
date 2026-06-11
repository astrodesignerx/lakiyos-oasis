'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

const clerkAppearance = {
  elements: {
    formButtonPrimary: 'bg-coral hover:bg-coral-dark text-white',
    footerActionLink: 'text-coral hover:text-coral-dark',
  },
}

export function ClientClerkProvider({ children }: { children: ReactNode }) {
  if (typeof window === 'undefined') {
    return <>{children}</>
  }

  return (
    <ClerkProvider appearance={clerkAppearance}>
      {children}
    </ClerkProvider>
  )
}
