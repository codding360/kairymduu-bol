'use client'

import {useMemo, useState} from 'react'

import CampaignCard from '@/app/components/CampaignCard'
import {CampaignCategory, CampaignSummary} from '@/app/types/campaign'

type Props = {
  campaigns: CampaignSummary[]
  categories: CampaignCategory[]
}

const sortOptions = [
  {label: 'Impact', value: 'impact'},
  {label: 'Newest', value: 'newest'},
  {label: 'Urgency', value: 'urgency'},
]

export default function CampaignGrid({campaigns, categories}: Props) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('impact')

  const filteredCampaigns = useMemo(() => {
    return campaigns
      .filter((campaign) => {
        if (category !== 'all' && campaign.category?.slug !== category) {
          return false
        }
        if (search) {
          const haystack = `${campaign.title} ${campaign.shortDescription}`.toLowerCase()
          return haystack.includes(search.toLowerCase())
        }
        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return (b.deadline || '').localeCompare(a.deadline || '')
          case 'urgency':
            return (urgencyWeight(b.urgency) - urgencyWeight(a.urgency)) || compareProgress(b, a)
          default:
            return compareProgress(b, a)
        }
      })
  }, [campaigns, category, search, sortBy])

  return (
    <div className="space-y-8" id="campaigns">
      <div className="glass-panel flex flex-wrap items-center gap-4 p-6">
        <input
          type="search"
          aria-label="Search campaigns"
          className="flex-1 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm focus:border-forest-500 focus:outline-none"
          placeholder="Search by name, cause, or city…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          aria-label="Filter by category"
          className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item._id} value={item.slug || ''}>
              {item.title}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                sortBy === option.value
                  ? 'bg-forest-600 text-white shadow-card'
                  : 'border border-stone-200 text-stone-600'
              }`}
              onClick={() => setSortBy(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-200 bg-white p-12 text-center text-stone-500">
          No campaigns match your filters yet. Try a different category.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  )
}

function compareProgress(a: CampaignSummary, b: CampaignSummary) {
  const progressA = percentage(a.amountRaised, a.goal)
  const progressB = percentage(b.amountRaised, b.goal)
  return progressA - progressB
}

function percentage(part?: number | null, total?: number | null) {
  if (!part || !total) return 0
  return part / total
}

function urgencyWeight(urgency?: string | null) {
  switch (urgency) {
    case 'critical':
      return 3
    case 'high':
      return 2
    default:
      return 1
  }
}

