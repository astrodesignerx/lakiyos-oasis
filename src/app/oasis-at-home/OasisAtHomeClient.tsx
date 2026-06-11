'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CanvasColoring } from '@/components/sections/canvas/CanvasColoring'
import { products, siteConfig } from '@/data/site'
import { deliveryZones } from '@/data/delivery'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

export function OasisAtHomeClient() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [deliveryZone, setDeliveryZone] = useState('')
  const [orderForm, setOrderForm] = useState({ name: '', email: '', phone: '', address: '' })

  const addToCart = (product: Product) => {
    setCart([...cart, product])
    setCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-coral/5 via-yellow/5 to-sage/5 pt-24">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-accent text-coral text-lg">Oasis at Home</span>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mt-4 mb-6">
              Bring the Oasis Home
            </h1>
            <p className="text-warm-gray text-lg max-w-xl mx-auto">
              Shop physical coloring books, download creative pages, or play a multiplayer coloring session with friends.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-10">
            <SectionLabel>Coloring Book Collections</SectionLabel>
            <h2 className="font-heading text-3xl text-charcoal font-bold mt-3">
              Physical Products
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {products.filter(p => p.type === 'physical').map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <div className="bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-charcoal font-bold mb-1">{product.name}</h3>
                    <p className="text-sm text-warm-gray mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-charcoal">{formatPrice(product.price)}</span>
                      <span className="text-xs text-warm-gray/60">Delivery across Kenya</span>
                    </div>
                    <Button onClick={() => addToCart(product)} variant="primary" className="w-full">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mb-16">
            <div className="bg-sage/5 border border-sage/10 rounded-2xl p-8 md:p-10">
              <SectionLabel>Digital Downloads</SectionLabel>
              <h2 className="font-heading text-3xl text-charcoal font-bold mt-3 mb-8">
                Instant Creative Downloads
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {products.filter(p => p.type === 'digital').map((product, index) => (
                  <ScrollReveal key={product.id} delay={index * 0.1}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-sage/10">
                      <h3 className="font-heading text-lg text-charcoal font-bold mb-1">{product.name}</h3>
                      <p className="text-sm text-warm-gray mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-charcoal">{formatPrice(product.price)}</span>
                        <Button onClick={() => addToCart(product)} variant="secondary" size="sm">
                          Buy & Download
                        </Button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-coral/10 via-yellow/5 to-sage/10 p-8 md:p-12 text-center">
              <Badge variant="coral">Coming Soon</Badge>
              <h2 className="font-heading text-3xl text-charcoal font-bold mt-4 mb-4">
                Color Together, From Anywhere
              </h2>
              <p className="text-warm-gray max-w-2xl mx-auto mb-6 leading-relaxed">
                Imagine coloring alongside your friends — each on your own phone or laptop, connected in real time.
                Our upcoming multiplayer coloring experience lets you buy access, receive a unique session link,
                share it with your group, and everyone colors together on their own screen.
                No download needed. Works on any device.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8 text-sm">
                <div className="bg-white/80 rounded-xl p-4">
                  <span className="block font-bold text-charcoal mb-1">1. Purchase</span>
                  <span className="text-warm-gray">Buy session access</span>
                </div>
                <div className="bg-white/80 rounded-xl p-4">
                  <span className="block font-bold text-charcoal mb-1">2. Share</span>
                  <span className="text-warm-gray">Send link to friends</span>
                </div>
                <div className="bg-white/80 rounded-xl p-4">
                  <span className="block font-bold text-charcoal mb-1">3. Create</span>
                  <span className="text-warm-gray">Color together in real time</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hi! I am interested in the multiplayer coloring experience. Keep me updated!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-coral border-2 border-coral/30 rounded-xl hover:bg-coral/5 transition-all duration-300 min-h-[44px]"
              >
                Join the Waitlist for Early Access
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-16">
            <SectionLabel>Try It Now</SectionLabel>
            <h2 className="font-heading text-3xl text-charcoal font-bold mt-3 mb-6">
              Color & Relax — Right Here
            </h2>
            <p className="text-warm-gray mb-8 max-w-lg">
              A quick coloring session to calm your mind. Choose a color, adjust your brush, and create.
            </p>
            <CanvasColoring />
          </ScrollReveal>
        </div>
      </section>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl text-charcoal font-bold">Your Cart</h3>
                  <button onClick={() => setCartOpen(false)} className="text-warm-gray hover:text-charcoal transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-center">
                    <div>
                      <p className="text-warm-gray mb-2">Your cart is empty</p>
                      <p className="text-sm text-warm-gray/60">Browse our products and add items to your cart.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 space-y-4 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id + Math.random()} className="flex items-center gap-4 bg-beige rounded-xl p-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-charcoal truncate">{item.name}</p>
                            <p className="text-sm font-medium text-coral">{formatPrice(item.price)}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-warm-gray hover:text-coral transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-beige pt-4 mt-4 space-y-4">
                      {cart.some(p => p.type === 'physical') && (
                        <div>
                          <p className="text-xs font-medium text-charcoal/50 uppercase tracking-wider mb-2">Delivery Zone</p>
                          <select
                            value={deliveryZone}
                            onChange={(e) => setDeliveryZone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral outline-none text-sm bg-white"
                          >
                            <option value="">Select delivery zone</option>
                            {deliveryZones.map((z) => (
                              <option key={z.id} value={z.id}>{z.label} — KES {z.price.toLocaleString()}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-charcoal">Total</span>
                        <span className="text-xl font-bold text-coral">{formatPrice(total)}</span>
                      </div>
                      <Button onClick={() => { setCheckoutStep(1) }} variant="primary" className="w-full">
                        Checkout — {formatPrice(total)}
                      </Button>
                      <p className="text-xs text-warm-gray/60 text-center">
                        {siteConfig.responseTime}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCheckoutStep(0)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-xl text-charcoal font-bold mb-4">Complete Your Order</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-beige rounded-xl p-4 text-sm space-y-1">
                  {cart.map((item, i) => (
                    <p key={i} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </p>
                  ))}
                  <div className="border-t border-beige/50 pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <input placeholder="Full Name" value={orderForm.name} onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral outline-none text-sm" />
                <input type="email" placeholder="Email Address" value={orderForm.email} onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral outline-none text-sm" />
                <input type="tel" placeholder="WhatsApp Number" value={orderForm.phone} onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral outline-none text-sm" />
                {deliveryZone && <input placeholder="Delivery Address" value={orderForm.address} onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-beige focus:border-coral outline-none text-sm" />}
              </div>
              <Button onClick={async () => {
                setSubmitting(true)
                try {
                  await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      items: cart.map(i => ({ name: i.name, price: i.price })),
                      total,
                      customerName: orderForm.name,
                      customerEmail: orderForm.email,
                      customerPhone: orderForm.phone,
                      address: orderForm.address || undefined,
                      deliveryZone: deliveryZone || undefined,
                    }),
                  })
                  setCheckoutStep(2)
                  setCart([])
                  setCartOpen(false)
                } catch { /* silent */ } finally { setSubmitting(false) }
              }} variant="primary" className="w-full" disabled={submitting}>
                {submitting ? 'Processing...' : `Pay with M-Pesa — ${formatPrice(total)}`}
              </Button>
              <button onClick={() => setCheckoutStep(0)} className="w-full mt-2 text-sm text-warm-gray hover:text-charcoal py-2 transition-colors">
                Back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl text-charcoal font-bold mb-2">Order Confirmed!</h3>
              <p className="text-warm-gray text-sm mb-1">
                Your order has been placed successfully.
              </p>
              <p className="text-warm-gray text-sm mb-6">
                A confirmation has been sent to your email and WhatsApp.
              </p>
              <Button onClick={() => setCheckoutStep(0)} variant="primary">
                Continue Shopping
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
