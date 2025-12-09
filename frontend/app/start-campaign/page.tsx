import Link from 'next/link'

export default function StartCampaignPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Начните свою кампанию
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Поделитесь своей историей, найдите поддержку и воплотите свою мечту в реальность
          </p>
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-6 py-3 rounded-full font-semibold text-sm md:text-base">
            ✓ Бесплатное создание • ✓ Без комиссии до успеха
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Почему выбирают Кайрымдуу Бол?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-3xl text-primary-600">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Низкие комиссии</h3>
                  <p className="text-gray-600">Больше средств идут напрямую на вашу цель</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-3xl text-primary-600">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Экспертная поддержка</h3>
                  <p className="text-gray-600">Служба поддержки 24/7 поможет вам добиться успеха</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-3xl text-primary-600">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Инструменты для продвижения</h3>
                  <p className="text-gray-600">Встроенные инструменты для охвата большей аудитории</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-3xl text-primary-600">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Безопасность и доверие</h3>
                  <p className="text-gray-600">Гарантированная безопасная обработка платежей</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Присоединяйтесь к тысячам успешных кампаний
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Наше сообщество собрало миллионы для поддержки важных целей
          </p>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg"
          >
            Посмотреть истории успеха →
          </Link>
        </div>
      </div>
    </div>
  )
}

