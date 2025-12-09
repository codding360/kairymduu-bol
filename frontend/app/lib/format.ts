const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'KGS',
  maximumFractionDigits: 0,
})

export function formatCurrency(value?: number | null) {
  return currencyFormatter.format(typeof value === 'number' ? value : 0)
}

export function formatPercentage(part?: number | null, total?: number | null) {
  if (!total || !part) {
    return 0
  }
  return Math.min(100, Math.round((part / total) * 100))
}

export function formatLocation(location?: {city?: string | null; country?: string | null}) {
  if (!location) return ''
  return [location.city, location.country].filter(Boolean).join(', ')
}

export const formatWhatsAppLink = (whatsappPhone: string) => {
  if (!whatsappPhone) return '/start-campaign'
  const phone = whatsappPhone.replace(/[^\d+]/g, '')
  const message = encodeURIComponent('Здравствуйте! Я хочу создать кампанию по сбору средств.')
  return `https://wa.me/${phone}?text=${message}`
}
