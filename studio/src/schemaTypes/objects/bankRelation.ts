import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const bankRelation = defineType({
  name: 'bankRelation',
  title: 'Bank Relation',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'bank',
      title: 'Bank',
      type: 'reference',
      to: [{type: 'bank'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'reciver',
        title: 'Получатель',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    defineField({
      name: 'url',
      title: 'Bank URL',
      type: 'url',
      description: 'Direct payment URL for the selected bank.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      bank: 'bank.name',
      receiver: 'reciver',
      url: 'url',
    },
    prepare({bank, receiver, url}) {
      return {
        title: bank || 'Select bank',
        subtitle: [receiver, url].filter(Boolean).join(' • '),
      }
    },
  },
})

