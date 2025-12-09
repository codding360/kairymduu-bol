import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const doctorsGrid = defineType({
  name: 'doctorsGrid',
  title: 'Doctors Grid',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'doctors',
      title: 'Doctors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'doctor'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      doctorsCount: 'doctors.length',
    },
    prepare({title, doctorsCount}) {
      return {
        title: title || 'Doctors Grid',
        subtitle: `${doctorsCount || 0} doctor(s)`,
      }
    },
  },
})

