'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import FilterSelector, {type FilterOption} from './FilterSelector'
import ProgressBar from './ProgressBar'
import CampaignCard from './CampaignCard'
import { Campaign, InitialCampaignsQueryResult } from '@/sanity.types'

interface CampaignSliderProps {
  campaigns: InitialCampaignsQueryResult
}

type FilterType = 'close-to-goal' | 'just-launched' | 'needs-momentum'

const FILTER_OPTIONS: FilterOption<FilterType>[] = [
  { 
    value: 'close-to-goal', 
    label: 'Близко к цели',
    icon: '🎯',
    description: 'Сбор средств в пределах 5% от цели'
  },
  { 
    value: 'just-launched', 
    label: 'Только что запущен',
    icon: '📢',
    description: 'Сбор средств начался в последние два дня'
  },
  { 
    value: 'needs-momentum', 
    label: 'Нужен импульс',
    icon: '⚡',
    description: 'Сборщики средств, которым нужна небольшая поддержка'
  },
]

export default function CampaignSlider({campaigns: initialCampaigns}: CampaignSliderProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('needs-momentum')
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [allCampaigns, setAllCampaigns] = useState<Campaign[] | InitialCampaignsQueryResult>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Количество карточек на странице в зависимости от размера экрана
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateCardsPerPage = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      if (mobile) {
        setCardsPerPage(10) // Mobile - показываем все 10 в списке
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2) // Tablet
      } else {
        setCardsPerPage(3) // Desktop
      }
    }

    updateCardsPerPage()
    window.addEventListener('resize', updateCardsPerPage)
    return () => window.removeEventListener('resize', updateCardsPerPage)
  }, [])

  // Загрузка кампаний при изменении фильтра
  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoadingMore(true)
    setCurrentPage(0)
      
      try {
        const response = await fetch(`/api/campaigns?offset=0&limit=30&filter=${selectedFilter}`)
        const data = await response.json()

        if (data.campaigns) {
          setAllCampaigns(data.campaigns)
          setHasMoreData(data.hasMore)
        }
      } catch (error) {
        console.error('Error loading campaigns:', error)
      } finally {
        setIsLoadingMore(false)
        setIsInitialLoad(false)
      }
    }

    loadCampaigns()
  }, [selectedFilter])

  // Load more campaigns from API with current filter
  const loadMoreCampaigns = async () => {
    if (isLoadingMore || !hasMoreData) return

    setIsLoadingMore(true)
    try {
      const response = await fetch(`/api/campaigns?offset=${allCampaigns.length}&limit=30&filter=${selectedFilter}`)
      const data = await response.json()

      if (data.campaigns && data.campaigns.length > 0) {
        setAllCampaigns(prev => [...prev, ...data.campaigns])
        setHasMoreData(data.hasMore)
      } else {
        setHasMoreData(false)
      }
    } catch (error) {
      console.error('Error loading more campaigns:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  // Используем кампании напрямую из API (уже отфильтрованные и отсортированные)
  const filteredCampaigns = allCampaigns

  // Вычисление страниц
  const totalPages = Math.ceil(filteredCampaigns.length / cardsPerPage)
  const startIndex = currentPage * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex)

  // Check if we need to show loading indicator
  const showLoadingIndicator = isLoadingMore && currentCampaigns.length < cardsPerPage

  // Навигация
  const goToNextPage = async () => {
    if (!isTransitioning && (currentPage < totalPages - 1 || (hasMoreData && !isLoadingMore))) {
      // Check if we need to load more data before going to next page
      const nextPageStartIndex = (currentPage + 1) * cardsPerPage
      
      // If next page doesn't have enough campaigns and we have more data, load it
      if (nextPageStartIndex >= filteredCampaigns.length - cardsPerPage && hasMoreData && !isLoadingMore) {
        setIsTransitioning(true)
        await loadMoreCampaigns()
        setIsTransitioning(false)
      }

      // Then move to next page
      if (nextPageStartIndex < filteredCampaigns.length || !isLoadingMore) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentPage(prev => prev + 1)
          setIsTransitioning(false)
        }, 300)
      }
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0 && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentPage(prev => prev - 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const canGoNext = currentPage < totalPages - 1 || hasMoreData
  const canGoPrev = currentPage > 0

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container max-w-8xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mx-auto max-w-4xl">
            {isMobile 
              ? 'Откройте для себя сборы средств' 
              : 'Откройте для себя сборы средств, вдохновленные тем, что вам небезразлично'
            }
          </h2>
        </div>

        {/* Filter and Navigation - Hide navigation on mobile */}
        <div className="flex items-center justify-between mb-8">
          {/* Filter Selector */}
          <FilterSelector
            options={FILTER_OPTIONS}
            selected={selectedFilter}
            onSelect={setSelectedFilter}
          />

          {/* Navigation Arrows - Hide on mobile */}
          {!isMobile && (
            <div className="flex gap-2">
              <button
                onClick={goToPrevPage}
                disabled={!canGoPrev}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                  canGoPrev 
                    ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 cursor-pointer' 
                    : 'border-gray-200 opacity-40 cursor-not-allowed'
                }`}
                aria-label="Previous"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                onClick={goToNextPage}
                disabled={!canGoNext}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                  canGoNext 
                    ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 cursor-pointer' 
                    : 'border-gray-200 opacity-40 cursor-not-allowed'
                }`}
                aria-label="Next"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isInitialLoad && isLoadingMore ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
            <span className="ml-4 text-gray-600">Загрузка...</span>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Кампаний не найдено</p>
          </div>
        ) : (
          <>
        {/* Campaign Cards/List */}
        {isMobile ? (
          /* Mobile - Vertical List */
          <div className="space-y-0 divide-y divide-gray-100">
            {filteredCampaigns.map((campaign) => {
              const donorCount = campaign.donorCount || 0

              return (
                <article
                  key={campaign._id}
                  className="py-4 hover:bg-gray-50 transition-colors"
                >
                  <Link href={`/campaigns/${campaign.slug}`} className="flex gap-4">
                    {/* Square Thumbnail */}
                    <div className="relative w-[120px] h-[120px] flex-shrink-0 rounded-xl overflow-hidden">
                      {campaign.mainImage ? (
                        <Image
                          src={urlForImage(campaign.mainImage)?.width(240).height(240).url() || ''}
                          alt={campaign.mainImage.alt || campaign.title}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <span className="text-3xl">📷</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      {/* Top Section */}
                      <div>
                        {/* Donor Count */}
                        {donorCount > 0 && (
                          <p className="text-sm text-gray-500 mb-2">
                            {donorCount.toLocaleString('ru-RU')} {donorCount === 1 ? 'пожертвование' : 'пожертвований'}
                          </p>
                        )}

                        {/* Title */}
                        <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-3 leading-snug">
                          {campaign.title}
                        </h3>
                      </div>

                      {/* Bottom Section */}
                      <ProgressBar current={campaign.raisedAmount || 0} goal={campaign.goalAmount} currency="KGS" />
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        ) : (
          /* Desktop/Tablet - Grid with Cards */
          <div className="relative min-h-[480px] sm:min-h-[520px]">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {currentCampaigns.map((campaign) => (
                <CampaignCard
                    key={campaign._id}
                  campaign={{
                    _id: campaign._id,
                    title: campaign.title,
                    slug: (typeof campaign.slug === 'object') ? campaign.slug.current : campaign.slug ,
                    mainImage: campaign.mainImage,
                    goalAmount: campaign.goalAmount,
                    raisedAmount: campaign.raisedAmount || 0,
                    donorCount: campaign.donorCount || 0,
                    currency: 'KGS',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Page Indicators - Only on desktop */}
        {!isMobile && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setCurrentPage(index)
                      setIsTransitioning(false)
                    }, 300)
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentPage === index ? 'w-8 bg-primary-600' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
            {isLoadingMore && (
              <div className="ml-2">
                <div className="animate-spin h-4 w-4 border-2 border-primary-600 border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        )}

        {/* Loading indicator for mobile */}
        {isMobile && isLoadingMore && !isInitialLoad && (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin h-6 w-6 border-2 border-primary-600 border-t-transparent rounded-full" />
            <span className="ml-3 text-gray-600">Загрузка...</span>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  )
}

