import {HeartIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Campaign schema for crowdfunding campaigns
 */

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  icon: HeartIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Campaign Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bankRelations',
      title: 'Bank & Receiver Links',
      type: 'array',
      of: [{type: 'bankRelation'}],
      description: 'Map this campaign to one or more banks with receiver and payment URL.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the campaign to show up',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Campaign Story',
      type: 'blockContent',
      description: 'Tell the story behind this campaign',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      description: 'Brief summary shown in listings',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Campaign Image',
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
      description: 'Additional images for the campaign',
    }),
    defineField({
      name: 'goalAmount',
      title: 'Fundraising Goal',
      type: 'number',
      description: 'Target amount to raise',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'raisedAmount',
      title: 'Current Amount Raised',
      type: 'number',
      description: 'Amount raised so far',
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'donorCount',
      title: 'Number of Donors',
      type: 'number',
      description: 'Total number of people who donated',
      initialValue: 0,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          {title: 'USD ($)', value: 'USD'},
          {title: 'EUR (€)', value: 'EUR'},
          {title: 'GBP (£)', value: 'GBP'},
          {title: 'KGS (сом)', value: 'KGS'},
        ],
      },
      initialValue: 'KGS',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'organizer',
      title: 'Campaign Organizer',
      type: 'reference',
      to: [{type: 'person'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beneficiary',
      title: 'Beneficiary',
      type: 'string',
      description: 'Who will receive the funds',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'Optional deadline for the campaign',
    }),
    defineField({
      name: 'isUrgent',
      title: 'Mark as Urgent',
      type: 'boolean',
      description: 'Highlight this campaign as urgent',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Campaign',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Campaign Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Completed', value: 'completed'},
          {title: 'Paused', value: 'paused'},
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'updates',
      title: 'Campaign Updates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Update Title',
            },
            {
              name: 'content',
              type: 'text',
              title: 'Update Content',
            },
            {
              name: 'date',
              type: 'datetime',
              title: 'Date',
              initialValue: () => new Date().toISOString(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      organizerFirstName: 'organizer.firstName',
      organizerLastName: 'organizer.lastName',
      currentAmount: 'raisedAmount',
      goalAmount: 'goalAmount',
      media: 'mainImage',
      status: 'status',
    },
    prepare({title, media, organizerFirstName, organizerLastName, currentAmount, goalAmount, status}) {
      const percentage = goalAmount ? Math.round((currentAmount / goalAmount) * 100) : 0
      const subtitles = [
        organizerFirstName && organizerLastName && `by ${organizerFirstName} ${organizerLastName}`,
        `${percentage}% funded`,
        status && `(${status})`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})

