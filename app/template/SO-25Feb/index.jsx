import './assets/scss/app.scss';
import "../../assets/fonts/Helvetica/style.css";
import "../../assets/fonts/BubblegumSans/style.css";
import "../../assets/fonts/Impact/style.css";
import { t } from 'i18next';
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import CoinEffect from './CoinEffect';
import { htmlImg } from '@/service/util';
import MoreInfo from '@/component/Promo/MoreInfo';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'bg/bg.webp');


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const slug = pageData?.customizeData?.slug || null;


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
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className="bn-title">
                            <img data-aos="fade-up" src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="bonus">
                            <img data-aos="zoom-in-up" data-aos-delay="300" src={HOST_URL + pageData.images.money} alt="" />
                        </div>
                        <div className="bn-tag">
                            <img data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="600" src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                        </div>
                        <div className="logo">
                            <img src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
                <CoinEffect />
            </section>
            {mergedArray(pageData.eventList).length > 1 && <EventGroup GMT={pageData.GMT} eventList={mergedArray(pageData.eventList)} />}
            <section className="index">
                <div className="container">
                    {sec.map((item, index) => {
                        if (index !== 0) return <div className='points-block' dangerouslySetInnerHTML={{ __html: htmlImg(item) }}></div>
                    })}
                    {isMobile ?
                        <MoreInfo html={pageData.terms_and_conditions} /> :
                        <div className='TC'>
                            <strong className='title'>{t('TermsConditions')}</strong>
                            <div className='content' dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;