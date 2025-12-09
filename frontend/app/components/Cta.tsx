import {Suspense} from 'react'
import Image from 'next/image'

import ResolvedLink from '@/app/components/ResolvedLink'
import {CallToAction} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'

type CtaProps = {
  block: CallToAction
  index: number
}

export default function CTA({block}: CtaProps) {
  return (
    <div className="container max-w-8xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row bg-gray-50 border border-gray-100 rounded-2xl items-center gap-6 px-6 sm:px-12 py-8 sm:py-12">
        <div className="flex flex-col gap-6 flex-1">
          <div className="max-w-xl flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              {block.heading}
            </h2>
            <p className="text-lg leading-8 text-gray-600">{block.text}</p>
          </div>

          <Suspense fallback={null}>
            <div className="flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <ResolvedLink
                link={block.link}
                className="rounded-full flex gap-2 items-center justify-center border bg-primary-600 hover:bg-primary-700 py-3 px-6 text-white transition-colors duration-200 font-semibold"
              >
                {block.buttonText}
              </ResolvedLink>
            </div>
          </Suspense>
        </div>
        {block?.image && (
          <div className="hidden lg:block relative lg:w-1/5 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
            <Image
              src={urlForImage(block.image)?.width(400).height(400).url() || ''}
              alt={block.image.alt || 'CTA image'}
              width={400}
              height={400}
              className="object-contain w-full h-auto"
              sizes="20vw"
            />
          </div>
        )}
      </div>
    </div>
  )
}
