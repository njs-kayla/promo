const api = () => {
    const timestamp = new Date().getTime()

    const isLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname === '')

    const HOST_URL = typeof window !== 'undefined'
        ? (isLocalhost
            ? `${process.env.NEXT_PUBLIC_API_HOST}${process.env.NEXT_PUBLIC_API_BASE_HREF || ''}`
            : `${process.env.NEXT_PUBLIC_API_HOST}${process.env.NEXT_PUBLIC_API_BASE_HREF || ''}`)
        : '';

    const fetchData = (apiUrl) => {
        const fullUrl = `${HOST_URL}${apiUrl}?t=${timestamp}`
        return fetch(fullUrl)
            .then((response) => {
                const clone = response.clone()
                return clone.json()
            })
            .catch((error) => {
                console.error('fetchData error:', error)
                return error
            })
    }

    const getPromoList = () => fetchData('promoList.json')
    const getLangList = (slug) => fetchData(`${slug}/localeList.json`)
    const getPageData = (slug, locale) => fetchData(`${slug}/${locale}.json`)

    return {
        getPageData,
        getLangList,
        getPromoList,
        HOST_URL
    }
}

export default api