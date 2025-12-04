'use client'

import { useState } from 'react'

export default function DonateButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDonate = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      alert("This is a demo! In a real app, this would open Stripe Checkout.")
      setIsLoading(false)
    }, 500)
  }

  return (
    <button 
      onClick={handleDonate}
      disabled={isLoading}
      className="w-full bg-[#ffa400] hover:bg-[#ffb833] text-black font-bold py-4 px-4 rounded shadow transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : 'Donate now'}
    </button>
  )
}

