import {type PortableTextBlock} from 'next-sanity'
import Image from 'next/image'
import {Suspense} from 'react'

import PortableText from '@/app/components/PortableText'
import ResolvedLink from '@/app/components/ResolvedLink'
import {InfoSection} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'

type InfoProps = {
  block: InfoSection
  index: number
}

export default function InfoSectionComponent({block}: InfoProps) {
  const hasImage = block?.image
  const imageOnLeft = block?.imageOnLeft || false

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8 lg:gap-12 items-center`}>
          {/* Image Column - Shown first on mobile, positioned by imageOnLeft on desktop */}
          {hasImage && block.image && (
            <div className={`${imageOnLeft ? 'lg:order-1' : 'lg:order-2'} order-1`}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={urlForImage(block.image)?.width(800).height(600).url() || ''}
                  alt={block.image.alt || block.heading || 'Info section image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}

          {/* Content Column */}
          <div className={`${imageOnLeft ? 'lg:order-2' : 'lg:order-1'} order-2 ${!hasImage ? 'max-w-4xl mx-auto text-center' : ''}`}>
        {block?.heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                {block.heading}
              </h2>
        )}
        {block?.subheading && (
              <p className="text-lg sm:text-xl font-light text-gray-600 mb-6">
            {block.subheading}
              </p>
        )}
          {block?.content?.length && (
              <div className={`prose prose-lg ${!hasImage ? 'prose-center mx-auto' : ''} text-gray-700 max-w-none`}>
                <PortableText value={block.content as PortableTextBlock[]} />
              </div>
          )}
            {block?.buttonText && block?.link && (
              <Suspense fallback={null}>
                <div className={`mt-8 ${!hasImage ? 'flex justify-center' : ''}`}>
                  <ResolvedLink
                    link={block.link}
                    className="inline-flex items-center justify-center gap-2 rounded-full border bg-primary-600 hover:bg-primary-700 py-3 px-8 text-white transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                  >
                    {block.buttonText}
                  </ResolvedLink>
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
