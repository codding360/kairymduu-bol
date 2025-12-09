'use client'

import {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'

type ImageGalleryProps = {
  images: any[] // Array of Sanity image objects
  mainImageAlt?: string
  className?: string
}

export default function ImageGallery({images, mainImageAlt, className = ''}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Минимальное расстояние свайпа для переключения
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div 
        ref={containerRef}
        className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden group mb-3 mx-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={urlForImage(currentImage)?.url() || ''}
          alt={currentImage.alt || mainImageAlt || 'Image'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={currentIndex === 0}
        />

        {/* Image Counter - только если больше 1 изображения */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-white text-sm font-semibold">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails - только если больше 1 изображения */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide gap-2 mx-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                currentIndex === index 
                  ? '' 
                  : 'opacity-40 hover:opacity-100 cursor-pointer'
              }`}
            >
              <Image
                src={urlForImage(image)?.width(160).height(160).url() || ''}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicators для мобильных - показываем только если нет thumbnails или на очень маленьких экранах */}
      {images.length > 1 && images.length <= 5 && (
        <div className="flex justify-center gap-1.5 mt-3 sm:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === index ? 'w-6 bg-primary-600' : 'w-1.5 bg-gray-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

