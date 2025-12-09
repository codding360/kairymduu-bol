import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Category schema for organizing campaigns
 */

export const category = defineType({
  name: 'category',
  title: 'Category',
  icon: TagIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Emoji icon for category (e.g., 🏥 for Medical)',
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color for category badge',
      options: {
        list: [
          {title: 'Medical', value: '#02A95C'},
          {title: 'Emergency', value: '#E02424'},
          {title: 'Education', value: '#1C64F2'},
          {title: 'Community', value: '#9333EA'},
          {title: 'Animals', value: '#F59E0B'},
          {title: 'Environment', value: '#10B981'},
          {title: 'Other', value: '#6B7280'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
    },
    prepare({title, color}) {
      return {
        title,
        subtitle: color ? `Color: ${color}` : undefined,
      }
    },
  },
})

