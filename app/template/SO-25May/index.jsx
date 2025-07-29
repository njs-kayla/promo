import './assets/scss/app.scss';
import "../../assets/fonts/Kanit/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/NotoSansTamil/style.css";
import api from "@/service/api";
import { Fragment, useEffect, useRef, useState } from 'react';
import { t } from "i18next"
import bg from './assets/images/bg/bg.webp';
import mob_bg from './assets/images/bg/mob_bg.webp';
import exp from './assets/images/deco/Excl.webp';
import rich from './assets/images/deco/riches.webp';
import coin_L from './assets/images/deco/coin_l.webp';
import coin_R from './assets/images/deco/coin_r.webp';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import { useSelector } from 'react-redux';
import { htmlImg } from '@/service/util';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MoreInfo from '@/component/Promo/MoreInfo';
import peo from './assets/images/deco/peo.webp';
import i18n from '@/service/i18n';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const slug = pageData?.customizeData?.slug || null;
    const frontText = pageData?.customizeData[i18n.language]?.front || null;
    const behindText = pageData?.customizeData[i18n.language]?.behind || null;

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
                <img className="bn-bg" src={isMobile ? mob_bg : bg} alt="" />
                <div className="bn-title">
                    <img data-aos="fade-up" data-aos-delay="300" src={isMobile ? HOST_URL + pageData.images.mobile : HOST_URL + pageData.images.title} />
                </div>
                <div className="bonus">
                    <img className='bonus-img' data-aos="fade-up" data-aos-delay="600" src={isMobile ? HOST_URL + pageData.images.mobile_money : HOST_URL + pageData.images.money} alt="" />
                    {!isMobile && <>
                        <div className="front moneyText" data-aos="fade-up" data-aos-delay="600">{frontText}</div>
                        <div className="behind moneyText" data-aos="fade-up" data-aos-delay="600">{behindText}</div>
                        <div className="exp">
                            <img src={exp} data-aos="showOut" style={{ animationDelay: '1500ms', opacity: 0 }} alt="" />
                        </div>
                        <div className="rich" data-aos="showOut" style={{ animationDelay: '1500ms', opacity: 0 }}>
                            <img src={rich} alt="" />
                        </div>
                    </>}
                </div>
                <div className="logo">
                    <img data-aos="fade-up" data-aos-delay="800" src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                </div>
                <div className="peo">
                    <img src={peo} data-aos="showOut" style={{ animationDelay: '1200ms', opacity: 0 }} alt="" />
                </div>
                {!isMobile && <>
                    <div className="coin_L">
                        <img data-aos="showOut" style={{ animationDelay: '900ms', opacity: 0 }} src={coin_L} alt="" />
                    </div>
                    <div className="coin_R">
                        <img data-aos="showOut" style={{ animationDelay: '900ms', opacity: 0 }} src={coin_R} alt="" />
                    </div>
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />

            </section>
            <section className="index">
                {mergedArray(pageData.eventList).length > 1 && <div className="tournament-block">
                    <div className='tournament-head' dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                    <EventGroup eventList={mergedArray(pageData.eventList)} GMT={pageData.GMT} />
                </div>}
                <div className="container">
                    {sec.map((item, index) => {
                        if (slug === 'NEXUS') {
                            if (index > 1) {
                                return <div className='points-block'>
                                    <div dangerouslySetInnerHTML={{ __html: htmlImg(item) }}></div>
                                </div>
                            }
                        } else if (index !== 0) {
                            return <div className='points-block'>
                                <div dangerouslySetInnerHTML={{ __html: htmlImg(item) }}></div>
                            </div>
                        }
                    })}
                    {isMobile ? <MoreInfo html={pageData.terms_and_conditions} /> : <div className='TC'>
                        <h2 className='title'>{t('TermsConditions')}</h2>
                        <ul className='content' dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></ul>
                    </div>}
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;