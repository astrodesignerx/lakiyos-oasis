'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navLinks, siteConfig } from '@/data/site'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const ClerkRef = useRef<{ UserButton: any; SignInButton: any; useUser: any } | null>(null)
  const [clerkState, setClerkState] = useState<{ isSignedIn: boolean } | null>(null)

  useEffect(() => {
    setMounted(true)
    import('@clerk/nextjs').then((mod) => {
      ClerkRef.current = mod
      try {
        const { isSignedIn } = mod.useUser()
        setClerkState({ isSignedIn: !!isSignedIn })
      } catch {
        setClerkState({ isSignedIn: false })
      }
    })
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const UserButton = mounted && ClerkRef.current ? ClerkRef.current.UserButton : null
  const SignInButton = mounted && ClerkRef.current ? ClerkRef.current.SignInButton : null

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="font-heading text-xl md:text-2xl font-bold text-charcoal tracking-tight">
          {siteConfig.shortName}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors duration-200 relative py-1',
                pathname === link.href
                  ? 'text-coral'
                  : 'text-charcoal/70 hover:text-charcoal'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-coral rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button href="/events" size="sm">
            Book an Experience
          </Button>
          {UserButton && clerkState?.isSignedIn ? (
            <UserButton appearance={{ elements: { avatarBox: 'w-9 h-9' } }} />
          ) : SignInButton ? (
            <SignInButton mode="modal">
              <button className="text-sm text-warm-gray hover:text-charcoal transition-colors font-medium">
                Sign In
              </button>
            </SignInButton>
          ) : null}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-charcoal rounded-full"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-charcoal rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-charcoal rounded-full"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-beige overflow-hidden"
          >
            <div className="container-main py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-medium py-2 transition-colors',
                    pathname === link.href ? 'text-coral' : 'text-charcoal/70'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-beige flex flex-col gap-3">
                <Button href="/events" className="w-full">
                  Book an Experience
                </Button>
                <div className="flex items-center justify-center gap-4 py-2">
                  {UserButton && clerkState?.isSignedIn ? (
                    <>
                      <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
                      <Link href="/admin" className="text-sm text-coral font-medium">
                        Dashboard
                      </Link>
                    </>
                  ) : SignInButton ? (
                    <SignInButton mode="modal">
                      <button className="text-sm text-warm-gray hover:text-charcoal transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                  ) : null}
                </div>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-charcoal/60 hover:text-charcoal transition-colors py-2"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
