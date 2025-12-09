import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {draftMode} from 'next/headers'
import {VisualEditing, toPlainText} from 'next-sanity'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {pagesQuery, settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from './client-utils'
import { Page } from '@/sanity.types'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || 'Кайрымдуу Бол'
  const description = settings?.description || 'Кайрымдуу Бол - №1 платформа для сбора средств в Кыргызстане'

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description as any),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  const {data: pages} = await sanityFetch({
    query: pagesQuery,
  })

  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          {/* Here a need to give on props dynamic navigations that created in sanity studio */}
          <Header title={settings?.title || 'Кайрымдуу Бол'} logo={(settings as any)?.logoUrl} pages={(pages || []) as unknown as Page[]} whatsappPhone={(settings as any)?.whatsappPhone} />
          <main className="pt-16 sm:pt-20 lg:pt-24">{children}</main>
          <Footer 
            heading={(settings as any)?.footerHeading}
            description={(settings as any)?.footerDescription}
            pages={(pages || []) as unknown as Page[]}
            socialLinks={(settings as any)?.socialLinks}
            copyrightText={(settings as any)?.copyrightText}
            whatsappPhone={(settings as any)?.whatsappPhone}
          />
        </section>
        <SpeedInsights />
      </body>
    </html>
  )
}
