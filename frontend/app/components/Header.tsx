'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Page } from '@/sanity.types'
import { formatWhatsAppLink } from '../lib/format'

interface HeaderProps {
  title?: string
  logo?: string
  pages?: Page[]
  whatsappPhone?: string
}

export default function Header({ title, logo, pages, whatsappPhone }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)

  // Function to handle closing with animation
  const handleCloseMobileMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setMobileMenuOpen(false)
      setIsClosing(false)
    }, 300) // Match animation duration
  }

  // Trigger opening animation
  useEffect(() => {
    if (mobileMenuOpen) {
      setIsOpening(true)
      // Use requestAnimationFrame to ensure the initial state is rendered before transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsOpening(false)
        })
      })
    }
  }, [mobileMenuOpen])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.about-dropdown-container')) {
        setAboutDropdownOpen(false)
      }
    }

    if (aboutDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [aboutDropdownOpen])

  // Generate WhatsApp link


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 lg:h-22 bg-white/80 flex items-center backdrop-blur-lg">
        <div className="container max-w-8xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-5">
            {/* Mobile: Empty space for layout */}
            <div className="md:hidden w-10"></div>

            {/* Logo - centered on mobile, left on desktop */}
            <Link className="flex items-center gap-2 md:flex-grow-0 flex-grow justify-center md:justify-start" href="/">
              {logo ? (
                <Image
                  src={logo}
                  alt={title || 'Logo'}
                  width={120}
                  height={40}
                  className="h-8 sm:h-10 lg:h-12 w-auto"
                  priority
                />
              ) : (
                <span className="text-lg sm:text-2xl pl-2 font-semibold">
                  {title || 'kairymduu bol'}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul
                role="list"
                className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight"
              >
                <li>
                  <Link href="/" className="hover:text-primary-600 transition-colors">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link href="/campaigns" className="hover:text-primary-600 transition-colors">
                    Все сборы
                  </Link>
                </li>

                {/* About Us Dropdown */}
                <li className="relative about-dropdown-container">
                  <button
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    className="flex items-center gap-1 hover:text-primary-600 transition-colors cursor-pointer"
                  >
                    <span>Кайрымдуу бол</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {aboutDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                      {pages && pages.length > 0 && pages.map((page: Page) => (
                        <Link
                          key={page._id}
                          href={`/${page.slug.current}`}
                          className="block px-4 py-2 hover:bg-gray-50 transition-colors text-gray-900"
                          onClick={() => setAboutDropdownOpen(false)}
                        >
                          {page.name || 'Untitled'}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>

                <li>
                  <a
                    href={formatWhatsAppLink(whatsappPhone as string)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex rounded-full flex gap-2 items-center justify-center border border-primary-600 hover:bg-primary-700 hover:text-white py-3 px-6 text-primary-600 transition-colors duration-200 font-semibold"
                  >
                    <span className="whitespace-nowrap">Начать сбор ❤️</span>
                  </a>
                </li>
              </ul>

            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex cursor-pointer items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer - Right Side */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : isOpening ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleCloseMobileMenu}
          />

          {/* Drawer */}
          <div className={`md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isClosing ? 'translate-x-full' : isOpening ? 'translate-x-full' : 'translate-x-0'
          }`}>
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3">
              {/* Logo here */}
              <Link className="flex items-center justify-start" href="/" onClick={handleCloseMobileMenu}>
                {logo ? (
                  <Image
                    src={logo}
                    alt={title || 'Logo'}
                    width={100}
                    height={32}
                    className="h-8 w-auto"
                    priority
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    {title || 'kairymduu bol'}
                  </span>
                )}
              </Link>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={handleCloseMobileMenu}
                aria-label="Закрыть меню"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Content - Scrollable */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                <li>
                  <Link href="/" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={handleCloseMobileMenu}>Главная</Link>
                </li>
                <li>
                  <Link href="/campaigns" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={handleCloseMobileMenu}>Все сборы</Link>
                </li>
                {pages && pages.map((page: Page) => (
                  <li key={page._id}>
                    <Link href={`/${page.slug.current}`} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={handleCloseMobileMenu}>{page.name || 'Untitled Heading'}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Button - Fixed at Bottom */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <a
                href={formatWhatsAppLink(whatsappPhone as string)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full flex gap-2 items-center justify-center bg-primary-600 hover:bg-primary-700 py-3 px-6 text-white transition-colors duration-200 font-semibold shadow-lg"
                onClick={handleCloseMobileMenu}
              >
                <span className="whitespace-nowrap">Начать сбор ❤️</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
