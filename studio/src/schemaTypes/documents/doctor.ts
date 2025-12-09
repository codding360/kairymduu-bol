import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const doctor = defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Doctor Name',
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
      title: 'Avatar Image',
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
      description: 'Additional images for the doctor profile',
    }),
    defineField({
      name: 'currentTitle',
      title: 'Current Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'affiliation',
      title: 'Affiliation',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'specialities',
      title: 'Specialities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'blockContent',
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
    }),
    defineField({
      name: 'areasOfExpertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'careerPath',
      title: 'Career Path',
      type: 'blockContent',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'currentTitle',
      media: 'avatar',
    },
  },
})

