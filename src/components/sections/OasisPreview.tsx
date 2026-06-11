'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { staggerContainer, staggerItem } from '@/components/shared/Animations'
import { products } from '@/data/site'
import { formatPrice } from '@/lib/utils'

export function OasisPreview() {
  const physicalProducts = products.filter(p => p.type === 'physical')

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <SectionLabel>Oasis at Home</SectionLabel>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-bold mt-3">
            Bring the Magic Home
          </h2>
          <p className="text-warm-gray mt-4 max-w-xl mx-auto">
            Experience the YOASIS feeling anywhere, even from your living room.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
        >
          {physicalProducts.map((product) => (
            <motion.div key={product.id} variants={staggerItem}>
              <Link href={`/oasis-at-home#${product.slug}`} className="group block">
                <div className="bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-coral uppercase tracking-wider">
                      {product.collection}
                    </span>
                    <h3 className="font-heading text-lg text-charcoal font-bold mt-1 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-warm-gray mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <span className="text-lg font-semibold text-charcoal">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal className="text-center">
          <Button href="/oasis-at-home" variant="primary">
            View All Products
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
