import { useContext, useEffect, useState } from "react";
import Header from "./Header"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "@/service/api";
import { ThemeContext } from "../../store/theme-context";
import Loader from "../../component/Loader";
import locale from "@/service/locale";
import Footer from "./Footer";
import i18n from "@/service/i18n";
import SideLink from "./SideLink";
import GoTopBtn from "../../component/GoTopBtn";
import { setLoading } from "../../component/Loader/loaderSlice";
import { useDispatch } from "react-redux";
import SEO from "../../component/SEO";

const Promo = () => {
    const { HOST_URL } = api();
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { getPageData, getLangList } = api();
    const { getDefaultLang } = locale()
    const { setThemeCode } = useContext(ThemeContext)
    const [importedComponent, setImportedComponent] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [langList, setLangList] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [preLang, setPreLang] = useState(null);

    useEffect(() => {
        console.log('promo');

        (async () => {
            // 取得語系列表
            const langList = await getLangList(params.slug);
            setLangList(langList)
            setPreLang(i18n.language)

            // 確認語系是否支援
            let newLang = searchParams.get('lang') || getDefaultLang()
            if (!langList.includes(newLang)) newLang = langList[0]
            i18n.changeLanguage(newLang);

            loadIndex();
        })()
    }, [searchParams]);

    useEffect(() => {
        importComponent();
    }, [pageData]);

    // 注入模板
    const importComponent = async () => {
        if (!pageData) return
        setThemeCode(pageData.theme);
        try {
            const module = await import(`../../template/${pageData.theme}/index.jsx`);
            const TemplateComponent = module.default;
            setImportedComponent(<TemplateComponent pageData={pageData} />);
            document.body.classList.remove(preLang)
            document.body.classList.add(i18n.language);
        } catch (error) {
            console.error(error)
            navigate('/');
        }
    };

    const loadIndex = async () => {
        dispatch(setLoading(true));
        const data = await getPageData(params.slug, i18n.language)
        if (!data.theme) {
            setLoading(false)
            return navigate('/')
        }
        setPageData(data);

        // 監聽圖片是否皆載入完成
        const CMSimgs = Object.values(data.images);

        Promise.all(
            CMSimgs.map(image => {
                if (Array.isArray(image)) {
                    return Promise.all(image.map(item => loadImage(HOST_URL + item)));
                } else {
                    return loadImage(HOST_URL + image);
                }
            })
        )
            .then(() => dispatch(setLoading(false)))
            .catch(err => console.log("Failed to load images", err));
    }

    // 載入圖片
    const loadImage = image => {
        return new Promise((resolve, reject) => {
            const loadImg = new Image()
            loadImg.src = image
            // wait 0.5 seconds to simulate loading time
            loadImg.onload = () =>
                setTimeout(() => {
                    resolve(image)
                }, 500)

            loadImg.onerror = err => reject({ err, image })

        })
    }

    return (
        <>
            <Loader />
            {pageData && <>
                <h1>{pageData.heading}</h1>
                <SEO title={pageData.heading}
                    description={pageData.heading}
                    image={HOST_URL + pageData.og_img}
                    type="article" />
            </>}
            <Header langList={langList} />
            {importedComponent}
            {pageData && <SideLink data={pageData.side_link} />}
            <GoTopBtn />
            <Footer />
        </>
    )
}

export default Promo