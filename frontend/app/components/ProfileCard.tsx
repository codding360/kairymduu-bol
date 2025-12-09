import Link from 'next/link'
import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'

export type ProfileType = 'doctor' | 'hospital' | 'patient' | 'campaign'

type ProfileCardProps = {
  type: ProfileType
  profile: {
    _id: string
    name: string
    slug: string
    avatar?: any
    title?: string // currentTitle for doctor, specialty for hospital, condition for patient
    location?: string
    badge?: string // experience for doctor, accreditation for hospital, donor count for campaign
    // Campaign-specific fields
    progressPercent?: number
    raisedAmount?: number
    goalAmount?: number
    currency?: string
  }
}

const getTypeConfig = (type: ProfileType) => {
  switch (type) {
    case 'doctor':
      return {
        emoji: '👨‍⚕️',
        baseUrl: '/doctors',
      }
    case 'hospital':
      return {
        emoji: '🏥',
        baseUrl: '/hospitals',
      }
    case 'patient':
      return {
        emoji: '💚',
        baseUrl: '/patients',
      }
    case 'campaign':
      return {
        emoji: '📷',
        baseUrl: '/campaigns',
      }
  }
}

export default function ProfileCard({type, profile}: ProfileCardProps) {
  const {name, slug, avatar, title, location, badge, progressPercent, raisedAmount, goalAmount, currency} = profile
  const config = getTypeConfig(type)
  const isCampaign = type === 'campaign'

  return (
    <article className="w-full">
      <Link href={`${config.baseUrl}/${slug}`} className="group block">
        {/* Image Container */}
        <div className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden mb-4">
          {avatar ? (
            <Image
              src={urlForImage(avatar)?.width(800).height(800).url() || ''}
              alt={avatar.alt || name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-6xl">{config.emoji}</span>
            </div>
          )}
          
          {/* Badge */}
          {badge && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-semibold text-gray-900">
                {badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight">
            {name}
          </h3>

          {/* Campaign Progress or Title/Subtitle */}
          {isCampaign && typeof progressPercent === 'number' && typeof raisedAmount === 'number' ? (
            <div className="space-y-2">
              <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-500" 
                  style={{width: `${progressPercent}%`}}
                />
              </div>
              
              {/* Amount Raised */}
              <p className="text-base font-bold text-gray-900">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: currency || 'KGS',
                  maximumFractionDigits: 0,
                }).format(raisedAmount)} собрано
              </p>
            </div>
          ) : title ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {title}
              </p>
            </div>
          ) : null}

          {/* Location */}
          {location && !isCampaign && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{location}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

