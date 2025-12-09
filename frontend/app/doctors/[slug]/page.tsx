import {type Metadata} from 'next'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'

import {sanityFetch} from '@/sanity/lib/live'
import {doctorQuery, doctorPagesSlugs} from '@/sanity/lib/queries'
import ImageGallery from '@/app/components/ImageGallery'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: doctor} = await sanityFetch({
    query: doctorQuery,
    params,
  })

  return {
    title: doctor?.name ? `${doctor.name} - Кайрымдуу Бол` : 'Врач - Кайрымдуу Бол',
    description: doctor?.currentTitle || 'Информация о враче',
  }
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: doctorPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export default async function DoctorPage(props: Props) {
  const params = await props.params
  const {data: doctor} = await sanityFetch({query: doctorQuery, params})

  if (!doctor) {
    notFound()
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-blue-50 py-12 sm:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Doctor Image Gallery */}
            <div className="lg:col-span-1">
              {doctor.gallery && doctor.gallery.length > 0 ? (
                <div className="sticky top-8">
                  <ImageGallery 
                    images={doctor.gallery} 
                    mainImageAlt={doctor.name}
                  />
                </div>
              ) : doctor.avatar ? (
                <div className="sticky top-8">
                  <ImageGallery 
                    images={[doctor.avatar]} 
                    mainImageAlt={doctor.name}
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-white flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-400">
                  <span className="text-9xl">👨‍⚕️</span>
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  {doctor.name}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 font-medium">
                  {doctor.currentTitle}
                </p>
              </div>

              {doctor.affiliation && (
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 leading-relaxed">{doctor.affiliation}</p>
                </div>
              )}

              {doctor.location && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 font-medium">{doctor.location}</p>
                </div>
              )}

              {doctor.experience && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700 font-medium">{doctor.experience}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {doctor.bio && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">О враче</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <PortableText value={doctor.bio} />
                </div>
              </div>
            )}

            {doctor.education && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Образование</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <PortableText value={doctor.education} />
                </div>
              </div>
            )}

            {doctor.careerPath && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Карьерный путь</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <PortableText value={doctor.careerPath} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {doctor.specialities && doctor.specialities.length > 0 && (
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Специализации</h3>
                <ul className="space-y-2">
                  {doctor.specialities.map((speciality, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{speciality}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {doctor.areasOfExpertise && doctor.areasOfExpertise.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Области экспертизы</h3>
                <ul className="space-y-2">
                  {doctor.areasOfExpertise.map((area, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

