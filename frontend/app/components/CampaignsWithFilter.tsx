'use client'

import {useState} from 'react'
import CategorySelector from './CategorySelector'
import CampaignCard from './CampaignCard'
import {CampaignCategory} from '../types/campaign'

interface Campaign {
  _id: string
  title: string
  slug: string
  mainImage: any
  goalAmount: number
  raisedAmount: number
  donorCount?: number
  category?: CampaignCategory
}

interface Props {
  campaigns: Campaign[]
  categories: CampaignCategory[]
  heading?: string
}

export default function CampaignsWithFilter({campaigns, categories, heading}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory | null>(null)

  // Фильтрация кампаний по категории
  const filteredCampaigns = selectedCategory
    ? campaigns.filter(c => c.category?._id === selectedCategory._id)
    : campaigns


  return (
    <div className="container max-w-8xl mx-auto px-4 py-12">
      {heading && (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
          {heading}
        </h2>
      )}

      {/* Category Selector */}
      <CategorySelector 
        categories={categories} 
        value={selectedCategory} 
        onChange={setSelectedCategory} 
      />

      {/* Campaigns Grid */}
      {filteredCampaigns.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={{
                _id: campaign._id,
                title: campaign.title,
                slug: campaign.slug,
                mainImage: campaign.mainImage,
                goalAmount: campaign.goalAmount,
                raisedAmount: campaign.raisedAmount || 0,
                donorCount: campaign.donorCount || 0,
                currency: 'KGS',
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Кампаний в этой категории пока нет</p>
        </div>
      )}
    </div>
  )
}
