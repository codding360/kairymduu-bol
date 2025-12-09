import {CreditCardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const bank = defineType({
  name: 'bank',
  title: 'Bank',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Bank Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the logo for accessibility.',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex code or tailwind color token for the bank button background.',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex code or tailwind color token for the bank button text.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      background: 'backgroundColor',
    },
    prepare(selection) {
      const {title, media, background} = selection
      return {
        title,
        subtitle: background,
        media,
      }
    },
  },
})

