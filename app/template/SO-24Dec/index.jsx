import './assets/scss/app.scss';
import "../../assets/fonts/Kanit/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import PointTable from './PointTable';
import { htmlImg } from '@/service/util';
import MoreBtn from '@/component/Promo/MoreBtn'
import { useSelector } from 'react-redux';
import RedPacketEffect from './RedPacketEffect';
import MoreInfo from '@/component/Promo/MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'bg/bg.webp');
const fox = getPublicImage(import.meta.url, 'deco/fox.webp');
const civet = getPublicImage(import.meta.url, 'deco/civet.webp');
const peo_L = getPublicImage(import.meta.url, 'deco/peo_L.webp');
const peo_R = getPublicImage(import.meta.url, 'deco/peo_R.webp');
const BAMAKO_bg = getPublicImage(import.meta.url, 'deco/BAMAKO_bg.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const slug = pageData.customizeData?.slug || null;


    useEffect(() => {
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
        parseContent()

    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec);
    }

    return (
        <main className={loading ? `main-load type${pageData.theme_type} ${slug}` : `type${pageData.theme_type} ${slug}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : pageData.theme_type === 'A' ? BAMAKO_bg : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className="bn-title">
                            <img data-aos="fade-down" data-aos-delay="600" src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="bonus">
                            <img data-aos="zoom-in-down" data-aos-delay="1000" src={HOST_URL + pageData.images.money} alt="" />
                        </div>
                        <div className="bn-tag">
                            <img data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="1400" src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                        </div>
                        <div className="logo">
                            <img src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                        <div className="char-wrap">
                            <div className="fox" data-aos="fade-right">
                                <img src={pageData.theme_type === 'A' ? peo_L : fox} alt="fox" />
                            </div>
                            <div className="civet" data-aos="fade-left">
                                <img src={pageData.theme_type === 'A' ? peo_R : civet} alt="civet" />
                            </div>
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />

            </section>
            <section className="index">
                <div className="container">
                    {mergedArray(pageData.eventList).length > 1 && <EventGroup eventList={mergedArray(pageData.eventList)} />}
                    {sec.map((item, index) => {
                        if (index !== 0) return (slug === "EXPIMZ" || slug === "UNI66") ? <PointTable key={index} htmlString={htmlImg(item)} /> : <div className='points-block' dangerouslySetInnerHTML={{ __html: htmlImg(item) }}></div>
                    })}
                    {isMobile ? <MoreInfo html={pageData.terms_and_conditions} /> : <MoreBtn html={pageData.terms_and_conditions} />}
                </div>
            </section>
            {!isMobile && <RedPacketEffect />}
        </main>
    );
};

export default TemplateComponent;