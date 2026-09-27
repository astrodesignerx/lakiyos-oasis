import type { Metadata } from 'next'
import { Young_Serif, DM_Sans, Caveat } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat'
import { localBusinessSchema } from '@/lib/schema'
import { ClientClerkProvider } from '@/components/shared/ClientClerkProvider'

// Young Serif ships a single weight. Bold headings are handled by disabling
// synthetic bolding in globals.css rather than by faking a heavier face.
const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-young-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'),
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
      className={`${youngSerif.variable} ${dmSans.variable} ${caveat.variable}`}
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
