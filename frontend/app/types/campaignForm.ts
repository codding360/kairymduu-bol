export interface CampaignFormData {
  // Step 1: Basic Information
  title: string
  excerpt: string
  category: string
  location: string

  // Step 2: Campaign Story
  story: string
  beneficiary: string

  // Step 3: Fundraising Details
  goalAmount: number
  currency: string
  endDate?: string

  // Step 4: Media
  mainImage?: File
  additionalImages?: File[]

  // Step 5: Organizer Information
  organizerFirstName: string
  organizerLastName: string
  organizerEmail: string
  organizerPhone: string
  organizerRelationship: string

  // Optional
  isUrgent?: boolean
}

export interface CampaignFormErrors {
  title?: string
  excerpt?: string
  category?: string
  location?: string
  story?: string
  beneficiary?: string
  goalAmount?: string
  currency?: string
  mainImage?: string
  organizerFirstName?: string
  organizerLastName?: string
  organizerEmail?: string
  organizerPhone?: string
  organizerRelationship?: string
}

export const CURRENCY_OPTIONS = [
  { value: 'KGS', label: 'KGS (сом)', symbol: 'с' },
  { value: 'USD', label: 'USD ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR (€)', symbol: '€' },
  { value: 'GBP', label: 'GBP (£)', symbol: '£' },
]

export const RELATIONSHIP_OPTIONS = [
  'Я сам бенефициар',
  'Член семьи',
  'Друг',
  'Коллега',
  'Представитель организации',
  'Другое',
]

export const CATEGORY_OPTIONS = [
  { value: 'medical', label: 'Медицинская помощь', icon: '🏥' },
  { value: 'emergency', label: 'Экстренная помощь', icon: '🚨' },
  { value: 'education', label: 'Образование', icon: '🎓' },
  { value: 'community', label: 'Общественные проекты', icon: '🤝' },
  { value: 'animals', label: 'Помощь животным', icon: '🐾' },
  { value: 'memorial', label: 'Мемориал', icon: '🕯️' },
  { value: 'other', label: 'Другое', icon: '💡' },
]

