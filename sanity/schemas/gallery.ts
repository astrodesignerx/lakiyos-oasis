import { defineType, defineField } from 'sanity'

export const gallerySchema = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'event', title: 'Event', type: 'string' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'alt', subtitle: 'event', media: 'image' },
  },
})
