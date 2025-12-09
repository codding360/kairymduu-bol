import Link from 'next/link'
import {Image} from 'next-sanity/image'

import {formatCurrency, formatPercentage, formatLocation} from '@/app/lib/format'
import PortableText from '@/app/components/PortableText'
import {CampaignDetail} from '@/app/types/campaign'
import {urlForImage} from '@/sanity/lib/utils'

type Props = {
  campaign: CampaignDetail | null | undefined
}

export default function CampaignHighlight({campaign}: Props) {
  if (!campaign) return null

  const location = formatLocation(campaign.location || undefined)
  const progress = formatPercentage(campaign.amountRaised, campaign.goal)

  return (
    <section className="container grid gap-6 lg:grid-cols-[1.2fr,0.8fr]" id="highlight">
      <div className="overflow-hidden rounded-[32px] relative">
        {campaign.coverImage && (
          <Image
            className="h-full w-full object-cover rounded-[32px]"
            height={760}
            width={1080}
            src={urlForImage(campaign.coverImage)?.width(1200).height(900).fit('crop').url() || ''}
            alt={campaign.coverImage?.alt || campaign.title || ''}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-white/80">Featured campaign</p>
          <h2 className="text-4xl font-display">{campaign.title}</h2>
          {location && <p className="text-sm text-white/80">{location}</p>}
        </div>
      </div>

      <div className="glass-panel flex flex-col gap-6 p-8">
        <div className="space-y-3">
          <h3 className="text-2xl font-display text-ink">Why it matters</h3>
          {campaign.story && (
            <div className="prose prose-stone text-stone-600">
              <PortableText value={campaign.story} />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between font-semibold text-stone-700">
            <span>{formatCurrency(campaign.amountRaised || 0)}</span>
            <span className="text-stone-400">of {formatCurrency(campaign.goal || 0)}</span>
          </div>
          <div className="h-2 rounded-full bg-stone-200">
            <div className="h-full rounded-full bg-forest-600" style={{width: `${progress}%`}}></div>
          </div>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-stone-500">
            <span>{progress}% funded</span>
            <span>{campaign.donorCount || 0} donors</span>
          </div>
        </div>

        {campaign.donorHighlights && campaign.donorHighlights.length > 0 && (
          <div className="rounded-2xl bg-white/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500 mb-2">
              Latest supporters
            </p>
            <ul className="space-y-2 text-sm text-stone-700">
              {campaign.donorHighlights.slice(0, 3).map((donor) => (
                <li className="flex items-center justify-between" key={donor._key}>
                  <span>{donor.name}</span>
                  <span className="font-semibold text-forest-600">
                    {formatCurrency(donor.amount || 0)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          className="inline-flex rounded-full bg-forest-600 px-6 py-3 text-white font-semibold text-center justify-center"
          href={campaign.slug ? `/campaigns/${campaign.slug}` : '#'}
        >
          View campaign
        </Link>
      </div>
    </section>
  )
}

