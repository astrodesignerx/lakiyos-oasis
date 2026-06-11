import { defineType, defineField } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Event Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({
      name: 'type',
      title: 'Experience Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sip & Paint', value: 'sip-and-paint' },
          { title: 'Flower Workshop', value: 'flower-workshop' },
          { title: 'Book Club', value: 'book-club' },
          { title: 'Corporate', value: 'corporate' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: 'Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'time', title: 'Time', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'venue', title: 'Venue', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'price', title: 'Price (KES)', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'capacity', title: 'Capacity', type: 'number', validation: (r) => r.required() }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Limited Spots', value: 'limited' },
          { title: 'Waitlist', value: 'waitlist' },
          { title: 'Sold Out', value: 'sold-out' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'type', media: 'image' },
  },
})
