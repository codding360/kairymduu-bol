import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'

import HowItWorksSlider from '@/app/components/HowItWorksSlider'
import { sanityFetch } from '@/sanity/lib/live'
import { initialCampaignsQuery, settingsQuery } from '@/sanity/lib/queries'
import CampaignSlider from './components/CampaignSlider'

export const metadata: Metadata = {
  title: 'Кайрымдуу Бол - №1 платформа для сбора средств в Кыргызстане',
  description: 'Сбор средств для людей и дел, которые вам небезразличны. Бесплатный запуск кампании, безопасные платежи, поддержка 24/7.',
  keywords: ['краудфандинг Кыргызстан', 'сбор средств', 'благотворительность', 'пожертвования', 'помощь'],
  openGraph: {
    title: 'Кайрымдуу Бол - №1 платформа для сбора средств',
    description: 'Запустите сбор средств за несколько минут. Более 50 кампаний запускается ежедневно.',
    type: 'website',
    locale: 'ru_RU',
  },
  alternates: {
    canonical: '/',
  },
}

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  // Load only first 30 campaigns for initial SSR (SEO optimization)
  const { data: campaigns } = await sanityFetch({
    query: initialCampaignsQuery,
  })

  // JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Кайрымдуу Бол',
    description: 'Платформа для сбора средств в Кыргызстане',
    url: 'https://kairymduu.kg',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kairymduu.kg/campaigns?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-7xl mx-auto pt-8 sm:pt-10 xl:pt-0 pb-12 sm:pb-16 lg:pb-20">
            <div className="flex items-center justify-center gap-8 lg:gap-12 xl:gap-16">

              {/* Left Side Circles - Hidden on mobile */}
              <div className="hidden lg:flex flex-col gap-6 xl:gap-8 flex-shrink-0">
                {/* Top Left - Семья */}
                <div className="animate-float-1 self-start ml-8 xl:ml-0">
                  <div className="relative">
                    <div className="w-32 h-32 xl:w-40 xl:h-40 rounded-full border-4 border-primary-400 overflow-hidden shadow-lg bg-white">
                      <img
                        src="https://sputnik.kg/img/104300/94/1043009461_0:0:2048:1364_600x0_80_0_0_2460c94f543d8e47969e06574ff0e346.jpg"
                        alt="Семья"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Семья
                    </div>
                  </div>
                </div>

                {/* Middle Left - Медицина */}
                <div className="animate-float-2 self-center">
                  <div className="relative">
                    <div className="w-36 h-36 xl:w-44 xl:h-44 rounded-full border-4 border-primary-400 overflow-hidden shadow-lg bg-white">
                      <img
                        src="https://cdn-1.aki.kg/st_runews/.storage/limon3/images/September2020/b6614abd5e419f220516378a124d703b.jpg"
                        alt="Медицина"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Медицина
                    </div>
                  </div>
                </div>

                {/* Bottom Left - Экстренная помощь */}
                <div className="animate-float-3 self-end mr-4 xl:mr-0">
                  <div className="relative">
                    <div className="w-36 h-36 xl:w-44 xl:h-44 rounded-full border-4 border-primary-400 overflow-hidden shadow-lg bg-white">
                      <img
                        src="https://sputnik.kg/img/07e7/02/10/1072938015_0:150:2048:1302_1920x0_80_0_0_e8a25d0069dcf7f5d8eb276253e8e9d0.jpg"
                        alt="Экстренная помощь"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Экстренная помощь
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex-1 max-w-4xl space-y-6 sm:space-y-8 flex flex-col items-center justify-center text-center py-8 sm:py-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-gray-900 px-4">
                  №1 платформа для сбора средств в Кыргызстане
                </h1>

                <div className="prose prose-base sm:prose-lg md:prose-xl text-gray-600 max-w-2xl px-4">
                  {settings?.description ? (
                    <PortableText value={settings.description} />
                  ) : (
                    <p>Сбор средств для людей и дел, которые вам небезразличны.</p>
                  )}
                </div>

                <div className="flex justify-center items-center gap-4 w-full px-4">
                  <Link
                    href="/campaigns"
                    rel="noopener noreferrer"
                    className="rounded-full flex gap-2 items-center justify-center border bg-primary-600 hover:bg-primary-700 py-3 px-6 text-white transition-colors duration-200 font-semibold"
                  >
                    <span className="whitespace-nowrap">Начать сбор ❤️</span>
                  </Link>
                </div>
              </div>

              {/* Right Side Circles - Hidden on mobile */}
              <div className="hidden lg:flex flex-col gap-6 xl:gap-8 flex-shrink-0">
                {/* Top Right - Образование */}
                <div className="animate-float-4 self-end mr-8 xl:mr-0">
                  <div className="relative">
                    <div className="w-36 h-36 xl:w-44 xl:h-44 rounded-full border-4 border-primary-400 overflow-hidden shadow-lg bg-white">
                      <img
                        src="https://eurasia-assembly.org/sites/default/files/styles/news_full/public/news/prevyu_206.jpg?itok=WCqXV4u5"
                        alt="Образование"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Образование
                    </div>
                  </div>
                </div>

                {/* Middle Right - Животные */}
                <div className="animate-float-5 self-center">
                  <div className="relative">
                    <div className="w-36 h-36 xl:w-44 xl:h-44 rounded-full border-4 border-primary-400 overflow-hidden shadow-lg bg-white">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFMfJ1YDcAwBWi0PQbmSwgcTmrbpgKuMvCvw&s"
                        alt="Детям"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Детям
                    </div>
                  </div>
                </div>

                {/* Bottom Right - Бизнес */}
                <div className="animate-float-6 self-start ml-4 xl:ml-0">
                  <div className="relative">
                    <div className="w-32 h-32 xl:w-40 xl:h-40 rounded-full border-4 border-primary-400 overflow-hidden shadow-lg bg-white">
                      <img
                        src="https://cdn-1.aki.kg/st_runews/.storage/limon3/images/FEBRUARY2025/a5b165a026b98b2cc9a1469a8bfaa28a.jpg"
                        alt="Бизнес"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Бизнес
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-y border-amber-200 py-5">
        <div className="container max-w-8xl mx-auto p-4">
          <div className="flex flex-wrap items-center justify-start md:justify-center gap-x-6 md:gap-x-12 gap-y-4 text-gray-800">
            {/* Item 1 */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <span className="text-sm md:text-base">
                Бесплатный запуск сбора средств
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base">
                <strong>1</strong> пожертвование каждую секунду
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base">
                <strong>50+</strong> кампаний запускается ежедневно
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorksSlider />


      {/* Campaigns Slider */}
      {campaigns && campaigns.length > 0 && (
        <CampaignSlider campaigns={campaigns}/>
      )}
    </>
  )
}