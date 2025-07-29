import './assets/scss/app.scss';
import '../../assets/fonts/Baloo/style.css'
import "../../assets/fonts/BalooBhai2/style.css";
import "../../assets/fonts/BaiJamjuree/style.css";
import "../../assets/fonts/Athiti/style.css";
import "../../assets/fonts/roboto/style.css";
import bg from "./assets/images/banner_img/bg.webp";
import bg_mb from './assets/images/banner_img/mb_bg.webp';
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import { t } from "i18next"
import MixBlock from './MixBlock';
import EventGroup from './EventGroup';
import MoreInfo from '@/component/Promo/MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const slug = pageData?.customizeData?.slug || null;

    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        const updatedContent = content.replace(
            /<strong>(.*?)<\/strong>/g,
            (_, innerText) => `<strong><span>${innerText}</span></strong>`
        );

        let secArr = updatedContent.split(pattern);
        let newSec = secArr.map((str, i) => (i > 0 ? pattern : '') + str);

        setSec(newSec);
    }



    return (
        <main className={loading ? `load-main ${slug}` : ` ${slug}`}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile || bg_mb} />
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.mobile_title} />
                        </div>
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                    </>
                )}
                <DateHeading
                    dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }}
                    GMT={pageData.GMT}
                />
            </section>
            <section className="index">
                <div className="container">
                    {sec.map((item, index) => {
                        if (index !== 0) return <div className='points-block' dangerouslySetInnerHTML={{ __html: item }}></div>
                    })}
                    <MixBlock data={pageData.customizeData} />
                </div>
                {isMobile ? <MoreInfo html={pageData.terms_and_conditions} /> : <div className="TC">
                    <h2>{t('TermsConditions')}</h2>
                    <ul dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></ul>
                </div>}
            </section>
        </main>
    );
};

export default TemplateComponent;