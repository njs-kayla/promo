import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/DoHyeon/style.css";
import "../../assets/fonts/ArchivoNarrow/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import { getPublicImage } from '@/service/util';
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


const bg      = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const mob_bg  = getPublicImage(import.meta.url, 'banner_img/mob_bg.webp');
const peoGirl = getPublicImage(import.meta.url, 'banner_img/peo_g.webp');
const peoCat  = getPublicImage(import.meta.url, 'banner_img/peo_cat.webp');
const peoMob  = getPublicImage(import.meta.url, 'banner_img/mob_peo.webp');
const coinL   = getPublicImage(import.meta.url, 'banner_img/coin_l.webp');
const coinR   = getPublicImage(import.meta.url, 'banner_img/coin_r.webp');

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
                        <img className="bn-bg" src={mob_bg} />
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay='400' src={HOST_URL + pageData.images.mobile_title} />
                        </div>
                        <div className="peo-mob">
                            <img data-aos="fade-up" data-aos-delay='800' src={peoMob} alt="Peo" />
                        </div>
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay='400' src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="peo-girl">
                            <img src={peoGirl} alt="Peo Girl" />
                        </div>
                        <div className="peo-cat">
                            <img src={peoCat} alt="Peo Cat" />
                        </div>
                        <div className="coin-l">
                            <img src={coinL} alt="Coin Left" />
                        </div>
                        <div className="coin-r">
                            <img src={coinR} alt="Coin Right" />
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