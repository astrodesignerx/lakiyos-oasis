import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us | Lakiyo\'s Oasis Nairobi',
  description:
    'Get in touch with Lakiyo\'s Oasis for bookings, corporate enquiries, or general questions. WhatsApp, email, or contact form.',
}

export default function ContactPage() {
  return <ContactClient />
}
