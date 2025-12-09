import DoctorCard from './DoctorCard'
import { Suspense } from 'react'

type Doctor = {
  _id: string
  name: string
  slug: { current: string }
  avatar?: any
  currentTitle: string
  location?: string
  experience?: string
}

type DoctorsGridProps = {
  block: {
    _type: 'doctorsGrid'
    heading?: string
    subheading?: string
    doctors?: Doctor[]
  }
  index: number
}


export const AllDoctors = ({ block }: DoctorsGridProps) => {
  return (
    <Suspense fallback={
      <div className="text-gray-500">Loading campaigns...</div>
    }>
      {block?.heading && (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
          {block?.heading}
        </h2>
      )}

      {/* Doctors Grid */}
      {block?.doctors && block?.doctors?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {block?.doctors?.map((doctor: Doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={{
                _id: doctor._id,
                name: doctor.name,
                slug: doctor.slug.current,
                avatar: doctor.avatar,
                currentTitle: doctor.currentTitle,
                location: doctor.location,
                experience: doctor.experience,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Докторов в этой категории пока нет</p>
        </div>
      )}
    </Suspense>
  )
}

