import type { Metadata } from 'next'
import { CommunityClient } from './CommunityClient'

export const metadata: Metadata = {
  title: 'Our Story | The YOASIS Community — Lakiyo\'s Oasis',
  description:
    'Learn the story behind Lakiyo\'s Oasis and the YOASIS community — a creative sanctuary for joy, connection, and emotional expression in Nairobi.',
}

export default function CommunityPage() {
  return <CommunityClient />
}
