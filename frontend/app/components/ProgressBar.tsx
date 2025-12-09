interface ProgressBarProps {
  current: number
  goal: number
  currency: string
}

export default function ProgressBar({ current, goal, currency}: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / goal) * 100), 100)
  
  return (
    <div className="space-y-2">
      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-primary-500 h-2 rounded-full transition-all duration-500" 
          style={{width: `${percentage}%`}}
        />
      </div>
      
      {/* Amount Raised */}
      <p className="text-sm font-semibold text-gray-900">
        Собрано {new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: currency,
          maximumFractionDigits: 0,
        }).format(current)}
      </p>
    </div>
  )
}

