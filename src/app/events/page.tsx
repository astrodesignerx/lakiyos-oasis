import type { Metadata } from 'next'
import { EventsClient } from './EventsClient'
import { getEvents } from '@/lib/events'
import { eventSchema } from '@/lib/schema'
import { isUpcomingEvent } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Upcoming Events | Book a Creative Session in Nairobi — Lakiyo\'s Oasis',
  description:
    'See all upcoming sip and paint, flower workshop, and book club events in Nairobi. Book your spot at Lakiyo\'s Oasis today.',
  other: {
    'og:type': 'website',
  },
}

export default async function EventsPage() {
  const events = await getEvents()
  const schemas = events.filter((e) => isUpcomingEvent(e.date)).map((e) =>
    eventSchema({
      name: e.name,
      date: e.date,
      time: e.time.split(' - ')[0],
      venue: e.venue,
      price: e.price,
      description: e.description,
      url: `https://lakiyasoasis.com/events`,
    })
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <EventsClient events={events} />
    </>
  )
}
