export type CampaignCategory = {
  _id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  icon?: string | null
  accentColor?: string | null
}

export type OrganizerSummary = {
  fullName?: string | null
  verificationStatus?: string | null
  city?: string | null
  country?: string | null
  relationToBeneficiary?: string | null
}


export type CampaignSummary = {
  _id: string
  title?: string | null
  slug?: string | null
  shortDescription?: string | null
  beneficiaryName?: string | null
  goal?: number | null
  amountRaised?: number | null
  donorCount?: number | null
  status?: string | null
  urgency?: string | null
  deadline?: string | null
  location?: {
    city?: string | null
    country?: string | null
  } | null
  isFeatured?: boolean | null
  isTrending?: boolean | null
  coverImage?: any
  category?: CampaignCategory | null
  organizer?: OrganizerSummary | null
}

export type CampaignDetail = CampaignSummary & {
  tags?: string[] | null
  shareUrl?: string | null
  story?: any
  gallery?: any[]
  donorHighlights?: Array<{
    _key: string
    name?: string
    amount?: number
    message?: string
    timeAgo?: string
  }> | null
  updates?: Array<{
    _key: string
    title?: string
    publishedAt?: string
    body?: any
  }> | null
}

export type ImpactStory = {
  _id: string
  title?: string | null
  quote?: string | null
  personName?: string | null
  role?: string | null
  avatar?: any
  campaign?: {
    title?: string | null
    slug?: string | null
  } | null
}

