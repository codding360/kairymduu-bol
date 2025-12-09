import ProfileCard from './ProfileCard'

type DoctorCardProps = {
  doctor: {
    _id: string
    name: string
    slug: string
    avatar?: any
    currentTitle: string
    location?: string
    experience?: string
  }
}

export default function DoctorCard({doctor}: DoctorCardProps) {
  return (
    <ProfileCard
      type="doctor"
      profile={{
        _id: doctor._id,
        name: doctor.name,
        slug: doctor.slug,
        avatar: doctor.avatar,
        title: doctor.currentTitle,
        location: doctor.location,
        badge: doctor.experience,
      }}
    />
  )
}

