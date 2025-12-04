import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/lib/live'
import {allCampaignsQuery} from '@/sanity/lib/queries'
import DateComponent from '@/app/components/Date'
import {urlForImage} from '@/sanity/lib/utils'

const Campaign = ({campaign}: {campaign: any}) => {
  const {_id, title, slug, excerpt, mainImage, goalAmount, raisedAmount, date, organizer} = campaign

  const progress = goalAmount > 0 ? Math.min((raisedAmount || 0) / goalAmount * 100, 100) : 0

  return (
    <article
      key={_id}
      className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:-translate-y-1 bg-white border border-gray-100"
    >
      <Link className="group block relative h-48 w-full overflow-hidden bg-gray-100" href={`/campaigns/${slug}`}>
        {mainImage ? (
          <Image
            src={urlForImage(mainImage)?.width(800).height(600).url() || ''}
            alt={mainImage.alt || title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
             <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
              <span>No Image</span>
            </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex-1">
           <Link className="block mt-2" href={`/campaigns/${slug}`}>
            <p className="text-xl font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-2">{title}</p>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">{excerpt}</p>
          </Link>
        </div>
        
        <div className="mt-6">
           <div className="relative w-full bg-gray-200 rounded-full h-2 mb-2">
             <div 
               className="bg-[#02a95c] h-2 rounded-full" 
               style={{width: `${progress}%`}}
             ></div>
           </div>
           <p className="text-sm font-medium text-black">
             <strong>${(raisedAmount || 0).toLocaleString()}</strong> raised of ${goalAmount.toLocaleString()} goal
           </p>
        </div>

        <div className="mt-6 flex items-center">
           <div className="flex-shrink-0">
             {/* Organizer Avatar Placeholder or actual if available */}
             <span className="sr-only">{organizer?.firstName}</span>
           </div>
           <div className="">
             <p className="text-sm font-medium text-gray-900">
                {organizer?.firstName && organizer?.lastName ? `${organizer.firstName} ${organizer.lastName}` : 'Organizer'}
             </p>
             <div className="flex space-x-1 text-sm text-gray-500">
               <time dateTime={date}><DateComponent dateString={date} /></time>
             </div>
           </div>
        </div>
      </div>
    </article>
  )
}

const CampaignsGrid = ({
  children,
  heading,
}: {
  children: React.ReactNode
  heading?: string
}) => (
  <div className="py-12">
    {heading && (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        {heading}
      </h2>
    )}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  </div>
)

export const AllCampaigns = async () => {
  const {data} = await sanityFetch({query: allCampaignsQuery})

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold">No campaigns found</h3>
        <p className="text-gray-600 mt-2">Be the first to start a fundraiser!</p>
      </div>
    )
  }

  return (
    <CampaignsGrid
      heading="Top fundraisers"
    >
      {data.map((campaign: any) => (
        <Campaign key={campaign._id} campaign={campaign} />
      ))}
    </CampaignsGrid>
  )
}

