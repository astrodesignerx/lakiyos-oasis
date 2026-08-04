import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export function isUpcomingEvent(date: string) {
  const today = new Date().toISOString().slice(0, 10)
  return date >= today
}

export const experienceTypeLabels: Record<string, string> = {
  'sip-and-paint': 'Sip & Paint',
  'flower-workshop': 'Flower Workshop',
  'book-club': 'Book Club',
  corporate: 'Corporate',
}
