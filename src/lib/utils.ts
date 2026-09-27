import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Event } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-KE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(date: string) {
  return new Date(date).toLocaleDateString('en-KE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function isUpcomingEvent(date: string) {
  const today = new Date().toISOString().slice(0, 10)
  return date >= today
}

/** The soonest event still ahead of us, or null when the calendar is empty. */
export function getNextEvent(events: Event[]): Event | null {
  return (
    events
      .filter((e) => isUpcomingEvent(e.date))
      .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
  )
}

export const experienceTypeLabels: Record<string, string> = {
  'sip-and-paint': 'Sip & Paint',
  'flower-workshop': 'Flower Workshop',
  'book-club': 'Book Club',
  corporate: 'Corporate',
}
