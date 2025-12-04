import {HeartIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Campaign schema. Define and edit the fields for fundraising campaigns.
 */

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  icon: HeartIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the campaign to be accessible at a URL',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Story',
      type: 'blockContent',
      description: 'Tell the story of why you are fundraising.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A short summary shown on the home page cards.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.mainImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'goalAmount',
      title: 'Goal Amount',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'raisedAmount',
      title: 'Raised Amount',
      type: 'number',
      initialValue: 0,
      readOnly: false, // Ideally updated via API, but editable for demo
    }),
    defineField({
      name: 'organizer',
      title: 'Organizer',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'date',
      title: 'Created Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      goal: 'goalAmount',
      raised: 'raisedAmount',
      media: 'mainImage',
    },
    prepare({title, media, goal, raised}) {
      return {
        title,
        media,
        subtitle: `Raised: ${raised || 0} / ${goal}`,
      }
    },
  },
})

