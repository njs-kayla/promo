import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/DoHyeon/style.css";
import "../../assets/fonts/ArchivoNarrow/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import bg from "./assets/images/banner_img/bg.webp";
import fox from './assets/images/deco/peo_b.webp';
import fox_m from './assets/images/deco/peo_mob.webp';
import deco_l from './assets/images/deco/wa_l.webp';
import deco_r from './assets/images/deco/wa_r.webp';
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import { t } from "i18next"
import MixTable from '@/component/Promo/MixTable';
import EventGroup from './EventGroup';
import MoreInfo from '@/component/Promo/MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value)

    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 800 });
        }
    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern)

        setSec(secArr);
    }


    return (
        <main className={loading ? 'load-main' : ''}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                        <div className="fox">
                            <img data-aos="fade-up" data-aos-delay='400' src={fox_m} />
                        </div>
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay='800' src={HOST_URL + pageData.images.mobile_title} />
                        </div>
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay='400' src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="fox">
                            <img data-aos="fade-up" data-aos-delay='400' src={fox} />
                        </div>
                        <div data-aos="fade-up" data-aos-delay='800' className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="Money" />
                        </div>
                        <div className="deco-l">
                            <img src={deco_l} alt="" />
                        </div>
                        <div className="deco-r">
                            <img src={deco_r} alt="" />
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
                <EventGroup eventList={pageData.eventList} GMT={pageData.GMT} />
                <div className="container">
                    <p className="info-text">
                        {t('infoText')}
                    </p>
                    {sec.map((item, i) => (
                        <div key={i} className='points-block' dangerouslySetInnerHTML={{ __html: item }}></div>
                    ))}
                    <div className="main-block">
                        <MixTable prizeList={pageData.prizeListData} pointsSystem={pageData.pointsSystemData} />
                    </div>
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