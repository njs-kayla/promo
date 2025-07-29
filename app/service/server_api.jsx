export async function fetchLangList(slug) {
  const host = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '')
  const base = process.env.NEXT_PUBLIC_API_BASE_HREF?.replace(/\/$/, '')
  const url = `${host}${base}/${slug}/localeList.json`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch langList')
  return await res.json()
}

export async function fetchPageData(slug, lang) {
  const host = process.env.NEXT_PUBLIC_API_HOST?.replace(/\/$/, '')
  const base = process.env.NEXT_PUBLIC_API_BASE_HREF?.replace(/\/$/, '')
  const url = `${host}${base}/${slug}/${lang}.json`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch page data')
  return await res.json()
}