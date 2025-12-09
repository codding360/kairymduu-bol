import type {Metadata} from 'next'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs, settingsQuery} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {PageOnboarding} from '@/app/components/Onboarding'
import Link from 'next/link'
import { formatWhatsAppLink } from '../lib/format'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({query: getPageQuery, params}),
    sanityFetch({query: settingsQuery})
  ])

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }


  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
        <div className="container max-w-8xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.heading}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {page.subheading}
          </p>

          <div className="flex justify-center items-center gap-4 w-full px-4">
            <Link
              href={formatWhatsAppLink(settings?.whatsappPhone as string)}
              className="rounded-full flex gap-2 items-center justify-center border bg-primary-600 hover:bg-primary-700 py-3 px-6 text-white transition-colors duration-200 font-semibold"
            >
              <span className="whitespace-nowrap">Начать сбор ❤️</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container max-w-8xl mx-auto px-4 py-12">
        {page && page._id && <PageBuilderPage page={page as GetPageQueryResult} />}
      </div>
    </div>
  )
}
