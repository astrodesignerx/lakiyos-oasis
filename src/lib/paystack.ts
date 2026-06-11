function getPaystack() {
  const axios = require('axios')
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY
  return axios.create({
    baseURL: 'https://api.paystack.co',
    headers: {
      Authorization: `Bearer ${paystackSecret}`,
      'Content-Type': 'application/json',
    },
  })
}

export async function initializeTransaction(params: {
  email: string
  amount: number
  currency?: string
  reference?: string
  channels?: string[]
  metadata?: Record<string, unknown>
}) {
  const api = getPaystack()
  const { data } = await api.post('/transaction/initialize', {
    email: params.email,
    amount: params.amount * 100,
    currency: params.currency || 'KES',
    reference: params.reference,
    channels: params.channels || ['mpesa'],
    metadata: params.metadata,
  })
  return data
}

export async function verifyTransaction(reference: string) {
  const api = getPaystack()
  const { data } = await api.get(`/transaction/verify/${reference}`)
  return data
}

export function generateReference() {
  return `YOASIS-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}
