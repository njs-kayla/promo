import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/Kanit/style.css";
import "../../assets/fonts/poppins/style.css";
import api from "@/service/api";
import { useEffect, useState, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import { t } from "i18next"
import { htmlImg, getPublicImage } from '@/service/util';
import EventGroup from './EventGroup';
import MoreInfo from '@/component/Promo/MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';

const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const coin = getPublicImage(import.meta.url, 'deco/coin.webp');

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
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec);
    }


    return (
        <main className={`${loading ? 'load-main' : ''} ${pageData.theme_type ? `type${pageData.theme_type}` : ''}`}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay="300" src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="bn-money">
                            <img data-aos="fade-up" data-aos-delay="600" src={HOST_URL + pageData.images.money} />
                        </div>
                        {pageData.images?.other?.[0] && (
                            <div className="excl">
                                <img data-aos="zoom-out" data-aos-delay="1200" src={HOST_URL + pageData.images.other[0]} alt="" />
                            </div>
                        )}
                        <div className="coin">
                            <img data-aos="fade-up" data-aos-delay="600" src={coin} alt="" />
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
                    {sec.map((item, i) => (
                        <Fragment key={i}>
                            <div className='points-block' dangerouslySetInnerHTML={{ __html: htmlImg(item) }} />
                            {i === 1 && <EventGroup type={pageData.theme_type} eventList={pageData.eventList} GMT={pageData.GMT} />}
                        </Fragment>
                    ))}
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