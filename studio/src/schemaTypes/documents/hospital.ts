import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const hospital = defineType({
  name: 'hospital',
  title: 'Hospital',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Hospital Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Hospital Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      description: 'Additional images for the hospital',
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'affiliation',
      title: 'Affiliation / Network',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'accreditation',
      title: 'Accreditation',
      type: 'string',
      description: 'E.g., "JCI Accredited", "ISO Certified"',
    }),
    defineField({
      name: 'departments',
      title: 'Departments',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'specialty',
      media: 'avatar',
    },
  },
})

