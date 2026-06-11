export interface DeliveryZone {
  id: string
  label: string
  price: number
  estimatedDays: string
}

export const deliveryZones: DeliveryZone[] = [
  { id: 'nairobi-cbd', label: 'Nairobi CBD', price: 200, estimatedDays: '1-2 days' },
  { id: 'nairobi-suburbs', label: 'Nairobi Suburbs', price: 350, estimatedDays: '1-3 days' },
  { id: 'upcountry', label: 'Upcountry Kenya', price: 600, estimatedDays: '3-5 days' },
  { id: 'international', label: 'International', price: 2500, estimatedDays: '7-14 days' },
]
