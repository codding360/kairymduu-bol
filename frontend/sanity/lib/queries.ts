import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  ...,
  "logoUrl": logo.asset->url,
  whatsappPhone,
  footerHeading,
  footerDescription,
  footerLinks,
  socialLinks,
  copyrightText
}`)

export const pagesQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)] {
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    color,
  }
`)

const campaignFields = /* groq */ `
  _id,
  _createdAt,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  mainImage,
  gallery,
  goalAmount,
  raisedAmount,
  donorCount,
  currency,
  beneficiary,
  location,
  startDate,
  endDate,
  isUrgent,
  isFeatured,
  status,
  "date": coalesce(startDate, _updatedAt),
  "organizer": organizer->{firstName, lastName, picture, gallery},
  "category": category->{_id, title, "slug": slug.current, description, icon, color},
  "bankRelations": bankRelations[]{
    "bankName": bank->name,
    "bankLogo": bank->logo,
    "bankBackgroundColor": bank->backgroundColor,
    "bankTextColor": bank->textColor,
    reciver,
    url,
  },
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current,
    "campaign": campaign->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      _type == "doctorsGrid" => {
        ...,
        doctors[]->{
          _id,
          name,
          slug,
          avatar,
          gallery,
          currentTitle,
          location,
          experience,
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[(_type == "page" || _type == "post" || _type == "campaign") && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const allCampaignsQuery = defineQuery(`
  *[_type == "campaign" && defined(slug.current)] | order(startDate desc, _updatedAt desc) {
    ${campaignFields}
  }
`)

// Initial campaigns query (first 30 for SSR)
export const initialCampaignsQuery = defineQuery(`
  *[_type == "campaign" && defined(slug.current)] | order(startDate desc, _updatedAt desc) [0...30] {
    ${campaignFields}
  }
`)

// Paginated campaigns query with offset
export const paginatedCampaignsQuery = defineQuery(`
  *[_type == "campaign" && defined(slug.current)] | order(startDate desc, _updatedAt desc) [$offset...$limit] {
    ${campaignFields}
  }
`)

// Count total campaigns
export const campaignsCountQuery = defineQuery(`
  count(*[_type == "campaign" && defined(slug.current)])
`)

export const featuredCampaignsQuery = defineQuery(`
  *[_type == "campaign" && isFeatured == true && defined(slug.current)] | order(startDate desc, _updatedAt desc) [0...3] {
    ${campaignFields}
  }
`)

export const urgentCampaignsQuery = defineQuery(`
  *[_type == "campaign" && isUrgent == true && defined(slug.current)] | order(startDate desc, _updatedAt desc) [0...6] {
    ${campaignFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const campaignQuery = defineQuery(`
  *[_type == "campaign" && slug.current == $slug] [0] {
    ${campaignFields}
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
    }
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const campaignPagesSlugs = defineQuery(`
  *[_type == "campaign" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

const doctorFields = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  avatar,
  gallery,
  currentTitle,
  affiliation,
  location,
  specialities,
  education,
  experience,
  areasOfExpertise,
  careerPath,
  bio,
`

export const allDoctorsQuery = defineQuery(`
  *[_type == "doctor" && defined(slug.current)] | order(name asc) {
    ${doctorFields}
  }
`)

export const doctorQuery = defineQuery(`
  *[_type == "doctor" && slug.current == $slug] [0] {
    ${doctorFields}
  }
`)

export const doctorPagesSlugs = defineQuery(`
  *[_type == "doctor" && defined(slug.current)]
  {"slug": slug.current}
`)
