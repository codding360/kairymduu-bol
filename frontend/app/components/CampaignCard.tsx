import ProfileCard from './ProfileCard'

type CampaignCardProps = {
  campaign: {
    _id: string
    title: string
    slug: string
    mainImage?: any
    goalAmount: number
    raisedAmount: number
    donorCount?: number
    currency?: string
  }
}

export default function CampaignCard({campaign}: CampaignCardProps) {
  const progress = (raised: number, goal: number) => {
    return goal > 0 ? Math.min((raised / goal) * 100, 100) : 0
  }

  const progressPercent = progress(campaign.raisedAmount || 0, campaign.goalAmount)
  const donorCount = campaign.donorCount || 0

  return (
    <ProfileCard
      type="campaign"
      profile={{
        _id: campaign._id,
        name: campaign.title,
        slug: campaign.slug,
        avatar: campaign.mainImage,
        badge: donorCount > 0 ? `${donorCount.toLocaleString('ru-RU')} пожертвований` : undefined,
        progressPercent,
        raisedAmount: campaign.raisedAmount,
        goalAmount: campaign.goalAmount,
        currency: campaign.currency || 'KGS',
      }}
    />
  )
}
