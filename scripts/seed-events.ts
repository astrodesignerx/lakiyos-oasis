/**
 * Seeds the events table from the canonical list in src/data/site.ts.
 *
 *   pnpm db:push    # create the tables first, if you haven't
 *   pnpm db:seed
 *
 * Safe to re-run: rows are matched on id and updated in place, so existing
 * bookings that reference an event keep pointing at it.
 *
 * Runs on plain Node (v22.6+) via native type stripping — no tsx or dotenv needed.
 */
import { readFileSync } from 'node:fs'
import { neon } from '@neondatabase/serverless'
import { experiences } from '../src/data/site.ts'

function loadDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  try {
    const env = readFileSync('.env.local', 'utf8')
    const match = env.match(/^DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/m)
    if (match) return match[1]
  } catch {
    // fall through to the error below
  }
  throw new Error('DATABASE_URL is not set (checked the environment and .env.local).')
}

const url = loadDatabaseUrl()
// Matches src/lib/events.ts: the shipped placeholder uses the database name "dummy".
const isPlaceholder = (() => {
  try {
    return new URL(url).pathname === '/dummy'
  } catch {
    return true
  }
})()
if (isPlaceholder) {
  throw new Error(
    'DATABASE_URL is still the placeholder value (database "dummy"). ' +
      'Point it at a real Postgres database, then re-run pnpm db:seed.'
  )
}

const sql = neon(url)

console.log(`Seeding ${experiences.length} events…`)

for (const event of experiences) {
  // The UI type uses 'sold-out'; the database enum uses 'sold_out'.
  const status = event.status === 'sold-out' ? 'sold_out' : event.status

  await sql`
    insert into events (id, name, slug, type, date, time, venue, price, capacity, status, description, image)
    values (
      ${event.id}, ${event.name}, ${event.slug}, ${event.type}, ${event.date},
      ${event.time}, ${event.venue}, ${event.price}, ${event.capacity},
      ${status}, ${event.description}, ${event.image}
    )
    on conflict (id) do update set
      name = excluded.name,
      slug = excluded.slug,
      type = excluded.type,
      date = excluded.date,
      time = excluded.time,
      venue = excluded.venue,
      price = excluded.price,
      capacity = excluded.capacity,
      status = excluded.status,
      description = excluded.description,
      image = excluded.image,
      updated_at = now()
  `
  console.log(`  ✓ ${event.id} — ${event.name} (${event.date})`)
}

const [{ count }] = await sql`select count(*)::int as count from events`
console.log(`Done. events table now holds ${count} row(s).`)
