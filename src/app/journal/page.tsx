import type { Metadata } from 'next'
import { JournalClient } from './JournalClient'

export const metadata: Metadata = {
  title: 'Journal | Creative Inspiration and Stories — Lakiyo\'s Oasis',
  description:
    'Stories, inspiration, and creative guides from the Lakiyo\'s Oasis community in Nairobi.',
}

export default function JournalPage() {
  return <JournalClient />
}
