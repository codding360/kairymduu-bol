import DateComponent from '@/app/components/Date'

type Props = {
  location: string
  small?: boolean
}

export default function Location({location, small = false}: Props) {
  return (
    <div className="flex items-center font-mono">
      <div
        className={`${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'} flex items-center justify-center rounded-full bg-gray-100 text-gray-700`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`${small ? 'h-4 w-4' : 'h-5 w-5'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className={`font-bold ${small ? 'text-sm' : ''}`}>Адресс</div>
        <div className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>
            {location}
        </div>
      </div>
    </div>
  )
}
 