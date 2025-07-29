import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/DoHyeon/style.css";
import "../../assets/fonts/ArchivoNarrow/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import BlossomEffect from './BlossomEffect';
import { t } from "i18next"
import MixTable from '@/component/Promo/MixTable';
import EventGroup from './EventGroup';
import MoreInfo from '@/component/Promo/MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const titleBar = getPublicImage(import.meta.url, 'deco/img_char_playwin.webp');


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
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec);
    }


    return (
        <main className={`${loading ? 'load-main' : ''} ${slug}`}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="title-area">
                            <div className="title-bar">
                                <img
                                    data-aos="zoom-in"
                                    src={
                                        slug !== "EUTournament"
                                            ? titleBar
                                            : pageData?.images?.other?.[0]
                                                ? HOST_URL + pageData.images.other[0]
                                                : ""
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="bn-title">
                                <img data-aos="fade-up" data-aos-delay='400' src={HOST_URL + pageData.images.title} />
                            </div>
                            <div data-aos="fade-up" data-aos-delay='800' className="bn-money">
                                <img src={HOST_URL + pageData.images.money} alt="Money" />
                            </div>
                        </div>
                    </>
                )}
                <BlossomEffect />
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
                    {slug !== "EUTournament" && <div className="main-block">
                        <MixTable prizeList={pageData.prizeListData} pointsSystem={pageData.pointsSystemData} />
                    </div>}
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