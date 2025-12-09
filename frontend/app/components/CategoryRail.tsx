import {CampaignCategory} from '@/app/types/campaign'

type Props = {
  categories: CampaignCategory[]
}

export default function CategoryRail({categories}: Props) {
  if (!categories.length) return null

  return (
    <section className="container">
      <div className="glass-panel flex flex-wrap gap-3 p-6">
        {categories.map((category) => (
          <span
            key={category._id}
            className="chip bg-white/80 text-sm font-semibold text-stone-700 shadow-card"
            style={{borderColor: category.accentColor || '#e5e7eb', color: category.accentColor || undefined}}
          >
            {category.icon} {category.title}
          </span>
        ))}
      </div>
    </section>
  )
}

