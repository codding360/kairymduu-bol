import {Suspense} from 'react'
import Link from 'next/link'

import {AllCampaigns} from '@/app/components/Campaigns'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <div className="relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Your home for help
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {settings?.description ? (
                // Simple text render if it's block content, or just use a static string for now if structure is complex
                "Fundraising for the people and causes you care about."
              ) : (
                "Fundraising for the people and causes you care about."
              )}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/start"
                className="rounded-full bg-[#02a95c] px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-[#028e4d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a95c]"
              >
                Start a kairymduu
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div>Loading campaigns...</div>}>
            <AllCampaigns />
          </Suspense>
        </div>
      </div>
    </>
  )
}
