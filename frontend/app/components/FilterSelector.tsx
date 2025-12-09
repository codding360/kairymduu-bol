'use client'

import {useState, useEffect} from 'react'

export interface FilterOption<T = string> {
  value: T
  label: string
  icon: string
  description: string
}

interface FilterSelectorProps<T = string> {
  options: FilterOption<T>[]
  selected: T
  onSelect: (value: T) => void
  buttonLabel?: string
}

export default function FilterSelector<T extends string = string>({
  options,
  selected,
  onSelect,
  buttonLabel,
}: FilterSelectorProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Определение мобильного экрана
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
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

  // Предотвращение скролла body когда drawer открыт
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isDrawerOpen])

  const getSelectedLabel = () => {
    if (buttonLabel) return buttonLabel
    const option = options.find(o => o.value === selected)
    return option?.label || 'Выберите фильтр'
  }

  const handleFilterSelect = (value: T) => {
    onSelect(value)
    setIsDropdownOpen(false)
    setIsDrawerOpen(false)
  }

  return (
    <>
      {/* Filter Button */}
      <div className="relative dropdown-container">
        <button 
          onClick={() => {
            if (isMobile) {
              setIsDrawerOpen(true)
            } else {
              setIsDropdownOpen(!isDropdownOpen)
            }
          }}
          className="cursor-pointer flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-colors bg-white"
        >
          <span className="font-medium text-gray-900">{getSelectedLabel()}</span>
          <svg 
            className={`w-5 h-5 text-gray-600 transition-transform ${isDropdownOpen && !isMobile ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        {/* Dropdown Menu - Desktop only */}
        {!isMobile && isDropdownOpen && (
          <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-lg p-2 min-w-[320px] z-10">
            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterSelect(option.value)}
                  className={`cursor-pointer w-full text-left px-4 py-4 rounded-2xl transition-all ${
                    selected === option.value 
                      ? 'bg-primary-50 border-2 border-primary-500' 
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-2xl mt-0.5 ${
                      selected === option.value ? 'grayscale-0' : 'grayscale opacity-70'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-base mb-1 ${
                        selected === option.value ? 'text-primary-700' : 'text-gray-900'
                      }`}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                    {selected === option.value && (
                      <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer (Bottom Sheet) */}
      {isMobile && isDrawerOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
            <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col">
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Filter by</h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Filter Options - Scrollable */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="px-4 py-2 space-y-3">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterSelect(option.value)}
                      className={`w-full text-left px-4 py-4 rounded-2xl transition-all ${
                        selected === option.value 
                          ? 'bg-primary-50 border-2 border-primary-500' 
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300 active:scale-98'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`text-2xl mt-0.5 ${
                          selected === option.value ? 'grayscale-0' : 'grayscale opacity-70'
                        }`}>
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-base mb-1 ${
                            selected === option.value ? 'text-primary-700' : 'text-gray-900'
                          }`}>
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            {option.description}
                          </div>
                        </div>
                        {selected === option.value && (
                          <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {/* Bottom padding for safe scrolling */}
                <div className="h-6" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

