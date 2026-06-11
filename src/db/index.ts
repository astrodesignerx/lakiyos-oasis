import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

function createDb() {
  const sql = neon(process.env.DATABASE_URL!)
  return drizzle({ client: sql, schema })
}

let _db: ReturnType<typeof createDb> | null = null

function getDb() {
  if (!_db) {
    _db = createDb()
  }
  return _db
}

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_, prop) {
    return (getDb() as any)[prop]
  },
}) as ReturnType<typeof createDb>
