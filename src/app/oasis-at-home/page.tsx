import type { Metadata } from 'next'
import { OasisAtHomeClient } from './OasisAtHomeClient'

export const metadata: Metadata = {
  title: 'Oasis at Home | Coloring Books and Creative Kits — YOASIS',
  description:
    'Shop Lakiyo\'s Oasis coloring books and digital creative products. Bring the YOASIS experience home anywhere in Kenya.',
}

export default function OasisAtHomePage() {
  return <OasisAtHomeClient />
}
