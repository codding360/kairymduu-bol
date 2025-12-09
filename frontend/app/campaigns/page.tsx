import Link from 'next/link'
import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery, categoriesQuery} from '@/sanity/lib/queries'
import {formatWhatsAppLink} from '../lib/format'
import CategorySelectorWithURL from '../components/CategorySelectorWithURL'
import CampaignCard from '../components/CampaignCard'

// Revalidate страницу каждые 60 секунд (ISR - Incremental Static Regeneration)
export const revalidate = 60

export async function generateMetadata({searchParams}: {searchParams: Promise<{category?: string}>}): Promise<Metadata> {
  const params = await searchParams
  const categorySlug = params.category
  
  if (categorySlug) {
    const {data: categories} = await sanityFetch({query: categoriesQuery, stega: false})
    const category = categories?.find((c: any) => c.slug === categorySlug)
    
    return {
      title: `${category?.title || 'Категория'} - Кампании по сбору средств - Кайрымдуу Бол`,
      description: category?.description || `Просмотрите все кампании по сбору средств в категории ${category?.title}.`,
      alternates: {
        canonical: `/campaigns?category=${categorySlug}`,
      },
    }
  }

  return {
    title: 'Все кампании по сбору средств - Кайрымдуу Бол',
    description: 'Просмотрите все активные кампании по сбору средств в Кыргызстане. Помогите людям, нуждающимся в медицинской помощи, образовании и других видах поддержки.',
    keywords: ['кампании', 'сбор средств', 'благотворительность', 'помощь', 'Кыргызстан', 'пожертвования'],
    openGraph: {
      title: 'Все кампании по сбору средств - Кайрымдуу Бол',
      description: 'Помогите людям, которым нужна ваша поддержка. Просмотрите все активные кампании.',
      type: 'website',
      locale: 'ru_RU',
      url: 'https://kairymduu.kg/campaigns',
    },
    alternates: {
      canonical: '/campaigns',
    },
  }
}

type Props = {
  searchParams: Promise<{category?: string; page?: string}>
}

export default async function CampaignsPage({searchParams}: Props) {
  const params = await searchParams
  const categorySlug = params.category
  const page = parseInt(params.page || '1')
  const limit = 30

  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  // Получаем категории для фильтра
  const {data: categories} = await sanityFetch({
    query: categoriesQuery,
    stega: false,
  })

  // Фильтрованный запрос с пагинацией
  const categoryFilter = categorySlug 
    ? `&& category->slug.current == "${categorySlug}"` 
    : ''
  
  const offset = (page - 1) * limit
  
  const campaignsQuery = `*[_type == "campaign" && defined(slug.current) ${categoryFilter}] | order(startDate desc, _updatedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    goalAmount,
    raisedAmount,
    donorCount,
    excerpt,
    "category": category->{_id, title, "slug": slug.current, description, icon, color}
  }[${offset}...${offset + limit}]`

  const {data: campaigns} = await sanityFetch({
    query: campaignsQuery,
    stega: false,
  })

  // Подсчет общего количества
  const countQuery = `count(*[_type == "campaign" && defined(slug.current) ${categoryFilter}])`
  const {data: totalCount} = await sanityFetch({
    query: countQuery,
    stega: false,
  })

  const totalPages = Math.ceil((totalCount || 0) / limit)
  const hasMore = page < totalPages

  // Generate WhatsApp link
  const whatsappPhone = (settings as any)?.whatsappPhone

  // Найти текущую категорию для мета-данных
  const currentCategory = categorySlug 
    ? categories?.find((c: any) => c.slug === categorySlug)
    : null

  // JSON-LD для SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Все кампании по сбору средств',
    description: 'Просмотрите все активные кампании по сбору средств в Кыргызстане',
    url: 'https://kairymduu.kg/campaigns',
    numberOfItems: campaigns?.length || 0,
    itemListElement: campaigns?.slice(0, 10).map((campaign: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'DonateAction',
        name: campaign.title,
        url: `https://kairymduu.kg/campaigns/${campaign.slug}`,
        description: campaign.excerpt || campaign.title,
      },
    })) || [],
  }

  return (
    <>
      {/* JSON-LD для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <div className="bg-white min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
          <div className="container max-w-5xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {currentCategory ? currentCategory.title : 'Вместе мы можем сделать больше'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {currentCategory?.description || 'Здесь вы можете найти все кампании, которые проводятся в Кыргызстане, и помочь тем, кто в них нуждается.'}
            </p>

            <div className="flex justify-center items-center gap-4 w-full px-4">
              <a
                href={formatWhatsAppLink(whatsappPhone as string)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full flex gap-2 items-center justify-center border bg-primary-600 hover:bg-primary-700 py-3 px-6 text-white transition-colors duration-200 font-semibold"
              >
                <span className="whitespace-nowrap">Начать сбор ❤️</span>
              </a>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="bg-gray-50">
          <div className="container max-w-8xl mx-auto px-4 py-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
              Все кампании
            </h2>

            {/* Category Selector */}
            <CategorySelectorWithURL 
              categories={categories || []} 
              currentCategory={currentCategory || null}
            />

            {/* Campaigns Grid */}
            {campaigns && campaigns.length > 0 ? (
              <>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {campaigns.map((campaign: any) => (
                    <CampaignCard
                      key={campaign._id}
                      campaign={{
                        _id: campaign._id,
                        title: campaign.title,
                        slug: campaign.slug,
                        mainImage: campaign.mainImage,
                        goalAmount: campaign.goalAmount,
                        raisedAmount: campaign.raisedAmount || 0,
                        donorCount: campaign.donorCount || 0,
                        currency: 'KGS',
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    {page > 1 && (
                      <Link
                        href={`/campaigns?${categorySlug ? `category=${categorySlug}&` : ''}page=${page - 1}`}
                        className="px-6 py-3 rounded-full bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold transition-colors"
                      >
                        ← Предыдущая
                      </Link>
                    )}
                    
                    <span className="text-gray-600">
                      Страница {page} из {totalPages}
                    </span>

                    {hasMore && (
                      <Link
                        href={`/campaigns?${categorySlug ? `category=${categorySlug}&` : ''}page=${page + 1}`}
                        className="px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
                      >
                        Следующая →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 sm:py-20 px-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Кампаний не найдено</h3>
                <p className="text-gray-600 mt-2">
                  {categorySlug ? 'В этой категории пока нет кампаний' : 'Будьте первым, кто начнёт сбор средств!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

