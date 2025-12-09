'use client'
import {useState} from 'react'
import DonateButton from '@/app/components/DonateButton'
import DonateModal from '@/app/components/DonateModal'

interface CampaignSidebarProps {
  raisedAmount: number
  goalAmount: number
  currency: string
  donorCount?: number
  recentDonors?: number
  banks?: {
    name: string
    url?: string
    backgroundColor?: string
    textColor?: string
    bankLogo?: any
  }[]
}

export default function CampaignSidebar({
  raisedAmount,
  goalAmount,
  currency = 'KGS',
  donorCount = 0,
  recentDonors = 0,
  banks,
}: CampaignSidebarProps) {
  const [isDonateOpen, setIsDonateOpen] = useState(false)
  const percentage = Math.min(Math.round((raisedAmount / goalAmount) * 100), 100)
  
  // Calculate the stroke dashoffset for the circular progress
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}K`
    }
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      {/* Circular Progress */}
    
      <div className="flex items-center gap-3 mb-6">
        {/* Circle */}
        <div className="relative flex-shrink-0">
          <svg className="w-26 h-20 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#00858c"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Percentage in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">{percentage}%</span>
          </div>
        </div>

        {/* Amount Info */}
        <div className="flex-1 pt-2">
          <h3 className="text-sm sm:text-xl font-bold text-gray-900">
            {formatCurrency(raisedAmount)}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            собрано из {formatCurrency(goalAmount)}
          </p>
        </div>

        <p className="text-center">
          <span className="text-md font-bold font-bold text-gray-900">{formatNumber(donorCount)}</span>
          <br/>
          <span className="text-sm text-gray-600">пожертвований</span>
        </p>
      </div>
      <DonateButton className="w-full mb-4" onClick={() => setIsDonateOpen(true)}>
        Пожертвовать ❤️
      </DonateButton>
      {/* Recent Donations */}
      {recentDonors > 0 && (
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-purple-900">
            {recentDonors} человек только что пожертвовали
          </p>
        </div>
      )}
      <DonateModal open={isDonateOpen} onClose={() => setIsDonateOpen(false)} banks={banks} />
    </div>
  )
}

