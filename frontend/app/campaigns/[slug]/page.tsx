import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock } from 'next-sanity'

import Avatar from '@/app/components/Avatar'
import PortableText from '@/app/components/PortableText'
import ImageGallery from '@/app/components/ImageGallery'
import { sanityFetch } from '@/sanity/lib/live'
import { campaignPagesSlugs, campaignQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import CampaignSidebar from '@/app/components/CampaignSidebar'
import Location from '@/app/components/Location'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: campaignPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const { data: campaign } = await sanityFetch({
    query: campaignQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(campaign?.mainImage)

  return {
    title: campaign?.title,
    description: campaign?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}


export default async function CampaignPage(props: Props) {
  const params = await props.params
  const [{ data: campaign }] = await Promise.all([sanityFetch({ query: campaignQuery, params })])

  if (!campaign?._id) {
    return notFound()
  }

  const bankRelations = Array.isArray((campaign as any).bankRelations)
    ? ((campaign as any).bankRelations as any[])
    : []

  const campaignBanks = bankRelations.map((br) => ({
    name: br.bankName || br.reciver || 'Банк',
    url: br.url,
    backgroundColor: br.bankBackgroundColor,
    textColor: br.bankTextColor,
    bankLogo: br.bankLogo
  }))

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8 lg:hidden">{campaign.title}</h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <div className=" rounded-lg overflow-hidden mb-6">
            {campaign?.gallery && campaign.gallery.length > 0 && (
                <ImageGallery 
                  images={[...campaign.gallery, campaign.mainImage]} 
                  mainImageAlt={campaign.title}
                />
              )}
            </div>

            <div className="lg:hidden mb-6">
              <CampaignSidebar
                raisedAmount={campaign.raisedAmount || 0}
                goalAmount={campaign.goalAmount}
                currency={campaign.currency}
                donorCount={campaign.donorCount || 0}
                recentDonors={0}
                banks={campaignBanks}
              />
            </div>

            <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
              {campaign.organizer && (
                <div className="flex items-center gap-3">
                  <div className="relative overflow-hidden">
                    {/* Minimal avatar implementation if Avatar component is too complex for reuse or reuse it */}
                    {campaign.organizer && campaign.organizer.firstName && campaign.organizer.lastName && (
                      <Avatar person={campaign.organizer} date={campaign.date} small/>
                    )}
                  </div>
                </div>
              )}
              <span className="mx-2 text-gray-300">|</span>
              <Location location={campaign.location || ''} small/>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="hidden lg:block text-3xl font-bold text-gray-900 mb-6">{campaign.title}</h2>
              <div className="prose prose-lg max-w-none">
                {campaign.content?.length && (
                  <PortableText value={campaign.content as PortableTextBlock[]} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <CampaignSidebar
                raisedAmount={campaign.raisedAmount || 0}
                goalAmount={campaign.goalAmount}
                currency={campaign.currency}
                donorCount={campaign.donorCount || 0}
                recentDonors={0}
                banks={campaignBanks} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
