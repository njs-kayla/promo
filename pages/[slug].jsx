import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { fetchPageData, fetchLangList } from '@/service/server_api'
import Cookies from 'js-cookie';
import { parse } from 'cookie'

import Header from '@/component/Header'
import Footer from '@/component/Footer'
import Loader from '@/component/Loader'
import GoTopBtn from '@/component/Promo/GoTopBtn'
import SideLink from '@/component/Promo/SideLink'
import { setLoading } from '@/component/Loader/loaderSlice'
import { ThemeContext } from '@/store/theme-context'
import api from '@/service/api'
import locale from '@/service/locale'
import i18n from '@/service/i18n';


export async function getServerSideProps({ params, query, req }) {
  const slug = params.slug;
  const langList = await fetchLangList(slug)
  const cookies = parse(req.headers.cookie || '')
  let lang = cookies.promo_lang;

  if (!langList.includes(lang)) {
    lang = langList[0]
  }

  const data = await fetchPageData(slug, lang);
  const brand = process.env.NEXT_PUBLIC_BRAND?.toLowerCase() || 'fs';
  const favicon = `/${brand}_favicon.ico`;

  return {
    props: {
      ogImage: process.env.NEXT_PUBLIC_API_HOST + process.env.NEXT_PUBLIC_API_BASE_HREF.slice(0, -1) + data?.og_img || null,
      icon: favicon
    },
  }
}
export default function PromoPage({ ogImage, icon }) {
  const router = useRouter()
  const { slug, lang: queryLang } = router.query
  const dispatch = useDispatch()
  const { setThemeCode } = useContext(ThemeContext)

  const [importedComponent, setImportedComponent] = useState(null)
  const [pageData, setPageData] = useState(null)
  const [langList, setLangList] = useState([])
  const [preLang, setPreLang] = useState(null)

  const { getPageData, getLangList, HOST_URL } = api()
  const { getDefaultLang } = locale()

  useEffect(() => {
    if (!slug) return
    const init = async () => {
      const langs = await getLangList(slug)
      setLangList(langs)
      setPreLang(i18n.language)

      let newLang = queryLang || getDefaultLang()
      if (!langs.includes(newLang)) newLang = langs[0]
      i18n.changeLanguage(newLang)
      Cookies.set('promo_lang', newLang, { expires: 7 })

      await loadIndex(newLang)
    }
    init()
  }, [slug, queryLang])

  useEffect(() => {
    importComponent()
  }, [pageData])

  const importComponent = async () => {
    if (!pageData) return
    setThemeCode(pageData.theme)
    try {
      const module = await import(`@/template/${pageData.theme}/index.jsx`)
      const TemplateComponent = module.default
      setImportedComponent(<TemplateComponent pageData={pageData} />)
      document.body.classList.remove(preLang)
      document.body.classList.add(i18n.language)
    } catch (e) {
      console.error(e)
      router.push('/')
    }
  }

  const loadIndex = async (lang) => {
    dispatch(setLoading(true))
    const data = await getPageData(slug, lang)
    if (!data.theme) {
      dispatch(setLoading(false))
      router.push('/')
      return
    }

    setPageData(data)

    const CMSimgs = Object.values(data.images || {})
    Promise.all(
      CMSimgs.map(image =>
        Array.isArray(image)
          ? Promise.all(image.map(i => loadImage(HOST_URL + i)))
          : loadImage(HOST_URL + image)
      )
    )
      .then(() => dispatch(setLoading(false)))
      .catch(err => console.warn('Failed to preload images', err))
  }

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => setTimeout(() => resolve(src), 500)
      img.onerror = (e) => reject(e)
    })

  return (
    <>
      <Loader />
      <Head>
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="twitter:image" content={ogImage} />
          </>
        )}
      </Head>
      {pageData && (
        <Head>
          <title>{pageData.heading}</title>
          <meta name="description" content={pageData.heading} />
          <meta property="og:title" content={pageData.heading} />
          <meta property="og:description" content={pageData.heading} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageData.heading} />
          <meta name="twitter:description" content={pageData.heading} />
          <link rel="shortcut icon" href={icon} type="image/x-icon" />
        </Head>
      )}
      <Header langList={langList} />
      {importedComponent}
      {pageData && <SideLink data={pageData.side_link} />}
      <GoTopBtn />
      <Footer />
    </>
  )
}