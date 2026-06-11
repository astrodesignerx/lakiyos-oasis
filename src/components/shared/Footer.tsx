import Link from 'next/link'
import { navLinks, siteConfig } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-beige border-t border-beige/50">
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="font-heading text-2xl font-bold text-charcoal tracking-tight">
              {siteConfig.shortName}
            </Link>
            <p className="text-sm text-warm-gray leading-relaxed">
              {siteConfig.tagline}. {siteConfig.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-gray hover:text-coral transition-colors"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-gray hover:text-coral transition-colors"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a
                href={siteConfig.social.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-gray hover:text-coral transition-colors"
                aria-label="Snapchat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.02c-5.066 0-9.172 3.943-9.172 8.808 0 2.146.926 4.086 2.404 5.512-.036.234-.06.474-.06.718 0 .525.113 1.022.296 1.474.267.214.623.315.998.315.069 0 .137-.004.206-.01.438.878 1.384 1.733 2.551 2.015 1.162.28 2.246.018 2.928-.74.106-.118.204-.248.295-.385.582.438 1.274.73 2.046.73.718 0 1.363-.265 1.926-.668.577.648 1.477.95 2.556.702 1.204-.276 2.182-1.175 2.626-2.08.067.005.134.01.2.01.354 0 .689-.105.949-.302.179-.466.289-.975.289-1.511 0-.246-.025-.488-.064-.725 1.462-1.426 2.376-3.356 2.376-5.487 0-4.865-4.106-8.808-9.172-8.808z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-gray hover:text-charcoal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-warm-gray hover:text-charcoal transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-warm-gray hover:text-charcoal transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <span className="text-sm text-warm-gray">{siteConfig.location}</span>
              </li>
              <li>
                <span className="text-xs text-warm-gray/70">{siteConfig.responseTime}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
              Stay Connected
            </h4>
            <p className="text-sm text-warm-gray mb-4">
              Join our WhatsApp broadcast list for early access to new events and exclusive updates.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi! I would like to join the YOASIS broadcast list.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-coral-dark transition-colors"
            >
              Join the Broadcast List
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-beige">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-warm-gray">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-warm-gray/60">
            Designed for {siteConfig.shortName}. Nairobi, Kenya.
          </p>
        </div>
      </div>
    </footer>
  )
}
