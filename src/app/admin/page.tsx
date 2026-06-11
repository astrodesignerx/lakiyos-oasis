import type { Metadata } from 'next'
import { AdminClient } from './AdminClient'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Lakiyo\'s Oasis',
  robots: 'noindex, nofollow',
}

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return <AdminClient />
}
