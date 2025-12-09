'use client'

import React from 'react'

type DonateButtonProps = {
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

export default function DonateButton({
  onClick,
  className = '',
  children,
  disabled = false,
}: DonateButtonProps) {
  const baseClasses =
    'cursor-pointer w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 text-lg shadow-sm active:scale-[0.98]'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      {children || 'Пожертвовать'}
    </button>
  )
}

