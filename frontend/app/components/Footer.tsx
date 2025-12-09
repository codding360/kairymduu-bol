import Link from "next/link";
import { Page } from "@/sanity.types";

interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
}

interface FooterProps {
  heading?: string
  description?: string
  pages?: Page[]
  socialLinks?: SocialLinks
  copyrightText?: string
  whatsappPhone?: string
}

export default function Footer({
  heading = "Кайрымдуу Бол - №1 платформа для сбора средств в Кыргызстане",
  description,
  pages = [],
  socialLinks = {},
  copyrightText = "© 2024 Кайрымдуу Бол. Бардык укуктар корголгон.",
  whatsappPhone
}: FooterProps) {
  const getWhatsAppLink = () => {
    if (!whatsappPhone) return '/start-campaign'
    const phone = whatsappPhone.replace(/[^\d+]/g, '')
    const message = encodeURIComponent('Здравствуйте! Я хочу создать кампанию по сбору средств.')
    return `https://wa.me/${phone}?text=${message}`
  }
  return (
      <footer className="bg-gradient-to-r from-amber-100 to-yellow-100">      
        {/* Main Footer Content */}
        <div className="container max-w-8xl mx-auto px-4 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Heading & Description */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {heading}
          </h3>
              {description && (
                <p className="text-gray-700 text-base md:text-lg mb-6">
                  {description}
                </p>
              )}
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Начать сбор ❤️
              </a>
            </div>

            {/* Right Column - Links & Social */}
            <div className="space-y-8">
              {/* Navigation Links */}
              {pages && pages.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Навигация
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">Главная</Link>
                    </li>
                    <li>
                      <Link href="/campaigns" className="text-gray-700 hover:text-primary-600 transition-colors">Все сборы</Link>
                    </li>
                    {pages.map((page: Page) => (
                      <li key={page._id}>
                        <Link href={`/${page.slug.current}`} className="text-gray-700 hover:text-primary-600 transition-colors">{page.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Social Links */}
              {Object.values(socialLinks).some(link => link) && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Социальные сети
                  </h4>
                  <div className="flex gap-4">
                    {socialLinks.facebook && (
                      <a 
                        href={socialLinks.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white hover:bg-primary-600 flex items-center justify-center transition-colors group shadow-md"
                        aria-label="Facebook"
                      >
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                    {socialLinks.instagram && (
                      <a 
                        href={socialLinks.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white hover:bg-primary-600 flex items-center justify-center transition-colors group shadow-md"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                    {socialLinks.twitter && (
                      <a 
                        href={socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white hover:bg-primary-600 flex items-center justify-center transition-colors group shadow-md"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                    {socialLinks.youtube && (
                      <a 
                        href={socialLinks.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white hover:bg-primary-600 flex items-center justify-center transition-colors group shadow-md"
                        aria-label="YouTube"
                      >
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-amber-200 relative">
        <div className="container max-w-8xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-700">
            <p>{copyrightText}</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-primary-600 transition-colors font-medium">
                О нас
              </Link>
              <Link href={socialLinks.instagram || '/'} className="hover:text-primary-600 transition-colors font-medium">
                Кампании
            </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
