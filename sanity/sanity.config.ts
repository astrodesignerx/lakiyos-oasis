import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { eventSchema } from './schemas/event'
import { productSchema } from './schemas/product'
import { articleSchema } from './schemas/article'
import { testimonialSchema } from './schemas/testimonial'
import { gallerySchema } from './schemas/gallery'

export default defineConfig({
  name: 'lakiyos-oasis',
  title: "Lakiyo's Oasis",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [eventSchema, productSchema, articleSchema, testimonialSchema, gallerySchema],
  },
})
