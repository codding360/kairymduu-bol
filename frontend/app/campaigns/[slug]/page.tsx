import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'
import {type PortableTextBlock} from 'next-sanity'
import {Suspense} from 'react'

import Avatar from '@/app/components/Avatar'
import CoverImage from '@/app/components/CoverImage'
import PortableText from '@/app/components/PortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {campaignPagesSlugs, campaignQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: campaignPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: campaign} = await sanityFetch({
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

import DonateButton from '@/app/components/DonateButton'

export default async function CampaignPage(props: Props) {
  const params = await props.params
  const [{data: campaign}] = await Promise.all([sanityFetch({query: campaignQuery, params})])

  if (!campaign?._id) {
    return notFound()
  }

  const progress = campaign.goalAmount > 0 ? Math.min((campaign.raisedAmount || 0) / campaign.goalAmount * 100, 100) : 0

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8 lg:hidden">{campaign.title}</h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
               {campaign?.mainImage && <CoverImage image={campaign.mainImage} priority />}
            </div>
            
            <div className="lg:hidden mb-6 bg-white p-6 rounded-lg shadow-sm">
               {/* Mobile Donation Card */}
               <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900">
                    ${(campaign.raisedAmount || 0).toLocaleString()} <span className="text-base font-normal text-gray-500">raised of ${campaign.goalAmount.toLocaleString()} goal</span>
                  </p>
                  <div className="relative w-full bg-gray-200 rounded-full h-2 my-3">
                    <div className="bg-[#02a95c] h-2 rounded-full" style={{width: `${progress}%`}}></div>
                  </div>
               </div>
                <DonateButton />
            </div>

            <div className="flex items-center gap-3 mb-6">
               {campaign.organizer && (
                 <div className="flex items-center gap-3">
                   <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                     {/* Minimal avatar implementation if Avatar component is too complex for reuse or reuse it */}
                     <Avatar person={campaign.organizer} date={campaign.date} />
                   </div>
                   <div>
                     <p className="text-sm text-gray-500">Organizer</p>
                     <p className="font-medium">{campaign.organizer.firstName} {campaign.organizer.lastName}</p>
                   </div>
                 </div>
               )}
               <span className="mx-2 text-gray-300">|</span>
               <span className="text-sm text-gray-500">Created on {new Date(campaign.date).toLocaleDateString()}</span>
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
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-lg border border-gray-100">
               <p className="text-2xl font-bold text-gray-900 mb-2">
                  ${(campaign.raisedAmount || 0).toLocaleString()} <span className="text-base font-normal text-gray-500">raised of ${campaign.goalAmount.toLocaleString()} goal</span>
               </p>
               
               <div className="relative w-full bg-gray-200 rounded-full h-2 mb-6">
                 <div className="bg-[#02a95c] h-2 rounded-full" style={{width: `${progress}%`}}></div>
               </div>

               <div className="space-y-4">
                 <DonateButton />
                 
                 <button className="w-full bg-[#eba834] bg-opacity-20 text-black font-bold py-3 px-4 rounded shadow-sm hover:bg-opacity-30 transition-colors">
                   Share
                 </button>
               </div>

               <div className="mt-6 pt-6 border-t border-gray-100">
                 <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span>👥</span>
                    <span><strong>123</strong> people just donated</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
