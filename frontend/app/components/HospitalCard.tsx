import ProfileCard from './ProfileCard'

type HospitalCardProps = {
  hospital: {
    _id: string
    name: string
    slug: string
    avatar?: any
    specialty: string
    location?: string
    accreditation?: string
  }
}

export default function HospitalCard({hospital}: HospitalCardProps) {
  return (
    <ProfileCard
      type="hospital"
      profile={{
        _id: hospital._id,
        name: hospital.name,
        slug: hospital.slug,
        avatar: hospital.avatar,
        title: hospital.specialty,
        location: hospital.location,
        badge: hospital.accreditation,
      }}
    />
  )
}

