'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=800&fit=crop',
    title: 'Используйте наши инструменты для создания сбора',
    description: 'Вы будете пошагово направлены для добавления деталей сбора средств и установки цели. Обновляйте информацию в любое время.',
    link: '#',
    linkText: 'Получите советы по запуску сбора средств →'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop',
    title: 'Найдите доноров через распространение',
    description: 'Поделитесь ссылкой на ваш сбор средств и используйте ресурсы в личном кабинете для набора импульса.',
    link: null,
    linkText: null
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=800&fit=crop',
    title: 'Безопасно получайте средства',
    description: 'Добавьте информацию о банке или пригласите бенефициара сбора средств добавить свою, и начните получать средства.',
    link: null,
    linkText: null
  }
]

export default function HowItWorksSlider() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 150)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const handleSlideChange = (index: number) => {
    if (index !== activeSlide) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveSlide(index)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const currentSlide = slides[activeSlide]

  return (
    <div className="bg-gray-50 py-16 ">
      <div className="container max-w-8xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 tracking-tight mx-auto max-w-xl">
            Сбор средств на Кайрымдуу Бол — легко, мощно и надёжно
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center max-w-8xl mx-auto">
          {/* Left Side - Square Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl aspect-square">
              <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 600px"
                />
              </div>
            </div>
          </div>

            {/* Slide Indicators Mobile */}
          <div className="flex justify-center gap-2 flex-wrap lg:hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'w-8 bg-primary-600' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Side - Steps */}
          <div className="relative h-[240px] sm:h-[130px] lg:h-auto lg:space-y-10">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`gap-4 sm:gap-6 cursor-pointer transition-all duration-300 ${
                  activeSlide === index 
                    ? `flex ${isTransitioning ? 'opacity-0' : 'opacity-100'}` 
                    : 'hidden lg:flex opacity-40'
                } lg:static lg:relative absolute inset-0 lg:inset-auto`}
                onClick={() => handleSlideChange(index)}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors ${
                      activeSlide === index ? 'bg-gray-900' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`text-xl sm:text-2xl font-bold ${
                        activeSlide === index ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {slide.id}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-md sm:text-xl font-bold text-gray-900 mb-3">
                    {slide.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                    {slide.description}
                  </p>
                  {slide.link && slide.linkText && (
                    <a
                      href={slide.link || ''}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base underline"
                    >
                      {slide.linkText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 hidden lg:flex pt-18">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index ? 'w-8 bg-primary-600' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

