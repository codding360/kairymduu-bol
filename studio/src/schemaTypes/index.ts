import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {campaign} from './documents/campaign'
import {category} from './documents/category'
import {doctor} from './documents/doctor'
import {hospital} from './documents/hospital'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {doctorsGrid} from './objects/doctorsGrid'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {bank} from './documents/bank'
import {bankRelation} from './objects/bankRelation'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  campaign,
  category,
  person,
  doctor,
  hospital,
  bank,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  doctorsGrid,
  link,
  bankRelation,
]
