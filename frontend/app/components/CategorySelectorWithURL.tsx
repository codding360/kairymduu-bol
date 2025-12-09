'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {CampaignCategory} from '../types/campaign'
import {useState, useEffect} from 'react'

type Props = {
  categories: CampaignCategory[]
  currentCategory: CampaignCategory | null
}

export default function CategorySelectorWithURL({categories, currentCategory}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.category-dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const getLabel = () => {
    return currentCategory?.title || 'Все категории'
  }

  const handleCategoryChange = (category: CampaignCategory | null) => {
    if (category) {
      router.push(`/campaigns?category=${category.slug}`)
    } else {
      router.push('/campaigns')
    }
    setIsDropdownOpen(false)
  }

  return (
    <div className="mb-8 category-dropdown-container">
      <div className="relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-full hover:border-gray-400 transition-colors bg-white"
        >
          <span className="font-medium text-gray-900">{getLabel()}</span>
          <svg 
            className={`w-5 h-5 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-2 left-0 bg-white border-2 border-gray-200 rounded-2xl shadow-lg py-2 min-w-[280px] max-h-[400px] overflow-y-auto z-10">
            {/* All Categories Option */}
            <button
              onClick={() => handleCategoryChange(null)}
              className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors ${
                !currentCategory ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">📋</span>
                <div className="flex-1">
                  <div className="font-medium">Все категории</div>
                  <div className="text-xs text-gray-500 mt-0.5">Показать все кампании</div>
                </div>
              </div>
            </button>

            {/* Category Options */}
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors ${
                  currentCategory?._id === category._id ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {category.icon && <span className="text-2xl">{category.icon}</span>}
                  <div className="flex-1">
                    <div className="font-medium">{category.title}</div>
                    {category.description && (
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{category.description}</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

