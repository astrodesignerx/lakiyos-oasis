import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({
      name: 'type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Physical Book', value: 'physical' },
          { title: 'Digital Download', value: 'digital' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'collection', title: 'Collection', type: 'string' }),
    defineField({ name: 'price', title: 'Price (KES)', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'stock', title: 'Stock', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'collection', media: 'image' },
  },
})
