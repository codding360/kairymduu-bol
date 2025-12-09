import {NextRequest, NextResponse} from 'next/server'
import {sanityFetch} from '@/sanity/lib/live'

// Enable caching for 1 minute
export const revalidate = 60

type FilterType = 'close-to-goal' | 'just-launched' | 'needs-momentum' | 'all'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const offset = parseInt(searchParams.get('offset') || '0')
  const limit = parseInt(searchParams.get('limit') || '10')
  const filter = (searchParams.get('filter') || 'needs-momentum') as FilterType

  try {
    // Базовый запрос для получения кампаний
    const campaignFields = `
      _id,
      _createdAt,
      "title": coalesce(title, "Untitled"),
      "slug": slug.current,
      mainImage,
      gallery,
      goalAmount,
      raisedAmount,
      donorCount,
    `

    let orderClause = ''
    let filterClause = ''

    switch (filter) {
      case 'close-to-goal':
        // Близко к цели - сортировка по проценту достижения цели
        orderClause = 'order(raisedAmount / goalAmount desc)'
        filterClause = '&& goalAmount > 0'
        break
      case 'just-launched':
        // Только что запущен - сортировка по дате создания
        orderClause = 'order(_createdAt desc)'
        break
      case 'needs-momentum':
        // Нужен импульс - сортировка по собранной сумме (меньше собрано = выше)
        orderClause = 'order(coalesce(raisedAmount, 0) asc)'
        break
      case 'all':
      default:
        orderClause = 'order(_createdAt desc)'
        break
    }

    const query = `*[_type == "campaign" && defined(slug.current) ${filterClause}] | ${orderClause} [$offset...$limit] {
      ${campaignFields}
    }`

    const {data: campaigns} = await sanityFetch({
      query,
      params: {offset, limit: offset + limit},
    })

    return NextResponse.json({
      campaigns: campaigns || [],
      offset,
      limit,
      filter,
      hasMore: campaigns && campaigns.length === limit,
    })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json({error: 'Failed to fetch campaigns'}, {status: 500})
  }
}

