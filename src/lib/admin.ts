import { currentUser } from '@clerk/nextjs/server'

/**
 * Admin access is granted only to emails listed in the ADMIN_EMAILS env var
 * (comma-separated). Returns null when authorized, or a reason string.
 */
export async function checkAdmin(): Promise<string | null> {
  const allowlist = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (allowlist.length === 0) {
    return 'ADMIN_EMAILS is not configured'
  }

  const user = await currentUser().catch(() => null)
  if (!user) {
    return 'Not signed in'
  }

  const emails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase())
  if (!emails.some((e) => allowlist.includes(e))) {
    return 'Not an admin'
  }

  return null
}
