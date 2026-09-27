// Server-only: pulls in the database client, so never import this from a
// component marked 'use client'.
import { db } from '@/db'
import { events as eventsTable } from '@/db/schema'
import { experiences } from '@/data/site'
import type { AvailabilityStatus, Event, ExperienceType } from '@/types'

type EventRow = typeof eventsTable.$inferSelect

/**
 * The database enum uses snake_case ('sold_out') while the UI type uses a hyphen
 * ('sold-out'), so the two never line up without this step.
 */
function toAvailabilityStatus(status: EventRow['status']): AvailabilityStatus {
  return status === 'sold_out' ? 'sold-out' : status
}

/** DB rows store a timestamp; the rest of the app compares plain YYYY-MM-DD strings. */
function rowToEvent(row: EventRow): Event {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    type: row.type as ExperienceType,
    date: row.date.toISOString().slice(0, 10),
    time: row.time,
    venue: row.venue,
    price: row.price,
    capacity: row.capacity,
    status: toAvailabilityStatus(row.status),
    description: row.description ?? '',
    image: row.image ?? '',
  }
}

/**
 * .env.example ships `…@localhost:5432/dummy`; treat that as "not set up yet"
 * rather than an outage. Matched on the database name so a port or credential
 * change doesn't defeat the check.
 */
export function isPlaceholderDatabaseUrl(url: string) {
  try {
    return new URL(url).pathname === '/dummy'
  } catch {
    return true
  }
}

function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL
  return Boolean(url) && !isPlaceholderDatabaseUrl(url!)
}

let warned = false
function warnOnce(message: string) {
  if (warned) return
  warned = true
  console.warn(`[events] ${message} Falling back to the seed data in src/data/site.ts.`)
}

/**
 * Every event, soonest first.
 *
 * Falls back to the static seed list when the database isn't configured or the
 * query fails, so a database problem degrades the site rather than taking it down.
 * Once DATABASE_URL points at a seeded database this returns live rows instead.
 */
export async function getEvents(): Promise<Event[]> {
  if (!isDatabaseConfigured()) {
    warnOnce('DATABASE_URL is not configured.')
    return [...experiences].sort((a, b) => a.date.localeCompare(b.date))
  }

  try {
    const rows = await db.select().from(eventsTable).orderBy(eventsTable.date)
    if (rows.length === 0) {
      warnOnce('The events table is empty — run `pnpm db:seed`.')
      return [...experiences].sort((a, b) => a.date.localeCompare(b.date))
    }
    return rows.map(rowToEvent)
  } catch (error) {
    console.error('[events] Query failed:', error)
    warnOnce('Could not read the events table.')
    return [...experiences].sort((a, b) => a.date.localeCompare(b.date))
  }
}
