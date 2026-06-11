import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Dancing_Script } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat'
import { localBusinessSchema } from '@/lib/schema'
import { ClientClerkProvider } from '@/components/shared/ClientClerkProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Creative Experiences in Nairobi | Lakiyo\'s Oasis (YOASIS)',
    template: '%s | Lakiyo\'s Oasis (YOASIS)',
  },
  description:
    'Sip and paint, flower workshops, book clubs, and at-home creative kits in Nairobi. Book your next creative experience with Lakiyo\'s Oasis.',
  openGraph: {
    title: 'Lakiyo\'s Oasis (YOASIS) — Where Creativity Meets Connection',
    description:
    'A creative sanctuary in Nairobi for immersive experiences, emotional expression, and accessible creativity.',
    type: 'website',
    locale: 'en_KE',
    siteName: "Lakiyo's Oasis",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dancingScript.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <ClientClerkProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </ClientClerkProvider>
      </body>
    </html>
  )
}
