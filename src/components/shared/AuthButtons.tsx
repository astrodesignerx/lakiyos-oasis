'use client'

import { useEffect, useState } from 'react'
import { UserButton, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

export function AuthButtons() {
  const [mounted, setMounted] = useState(false)
  const [clerk, setClerk] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    import('@clerk/nextjs').then((mod) => {
      setClerk(mod)
    })
  }, [])

  if (!mounted || !clerk) {
    return <div className="w-9 h-9" />
  }

  const { useUser } = clerk
  // We need to call useUser() here but it requires ClerkProvider context
  // Since this runs client-side and we wrap in ClientClerkProvider, it works via the actual ClerkProvider rendered at runtime
  return <ClerkAwareAuthButtons />
}

function ClerkAwareAuthButtons() {
  try {
    const { useUser } = require('@clerk/nextjs')
    const { isSignedIn } = useUser()

    return (
      <>
        {isSignedIn ? (
          <UserButton
            appearance={{ elements: { avatarBox: 'w-9 h-9' } }}
          />
        ) : (
          <SignInButton mode="modal">
            <button className="text-sm text-warm-gray hover:text-charcoal transition-colors font-medium">
              Sign In
            </button>
          </SignInButton>
        )}
      </>
    )
  } catch {
    return <div className="w-9 h-9" />
  }
}
