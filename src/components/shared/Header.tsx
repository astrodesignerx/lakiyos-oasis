'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { navLinks, siteConfig } from '@/data/site'
import { Button } from '@/components/ui/Button'

/* Clerk hooks require the provider, which only mounts client-side —
   so auth UI renders after mount, inside its own component. */
function AuthControls({ compact }: { compact?: boolean }) {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        <UserButton appearance={{ elements: { avatarBox: compact ? 'w-8 h-8' : 'w-9 h-9' } }} />
        {compact && (
          <Link href="/admin" className="text-sm text-pink-dark font-bold">
            Dashboard
          </Link>
        )}
      </div>
    )
  }

  return (
    <SignInButton mode="modal">
      <button className="text-sm text-ink/70 hover:text-ink transition-colors font-bold">
        Sign In
      </button>
    </SignInButton>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || menuOpen
          ? 'bg-paper border-b-2 border-ink'
          : 'bg-paper/80 backdrop-blur-sm border-b-2 border-transparent'
      )}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="font-heading text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
          {siteConfig.shortName}
          <span className="text-pink">.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-200',
                pathname === link.href
                  ? 'bg-ink text-paper'
                  : 'text-ink/70 hover:text-ink hover:bg-sunshine/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button href="/events" size="sm">
            Book an Experience
          </Button>
          {mounted && <AuthControls />}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-ink rounded-full"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-ink rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-ink rounded-full"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-paper border-t-2 border-ink overflow-hidden"
          >
            <div className="container-main py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-bold py-2 transition-colors',
                    pathname === link.href ? 'text-pink-dark' : 'text-ink/70'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t-2 border-ink/10 flex flex-col gap-3">
                <Button href="/events" className="w-full">
                  Book an Experience
                </Button>
                <div className="flex items-center justify-center gap-4 py-2">
                  {mounted && <AuthControls compact />}
                </div>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-ink/60 hover:text-ink transition-colors py-2 font-medium"
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
