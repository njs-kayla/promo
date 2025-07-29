import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/agencyfb/style.css";
import "../../assets/fonts/MarkerFelt/style.css";
import api from "@/service/api";
import bg from './assets/images/bg.webp'
import mob_bg from './assets/images/mob_bg.webp'
import p1 from './assets/images/deco/p1.webp';
import p2 from './assets/images/deco/p2.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import exclusive from './assets/images/banner_img/exclusive.webp'
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import { t } from 'i18next';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [logoScroll, setLogoScroll] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', bannerLogoScroll)

        return (() => {
            window.removeEventListener('scroll', bannerLogoScroll)
        })
    }, [])

    // banner logo scroll
    const bannerLogoScroll = () => {
        let scrollY = document.documentElement.scrollTop;
        let logoY = (scrollY > 100) ? 100 : scrollY;
        setLogoScroll(logoY)
    }

    return (
        <main className="">
            <section className="banner">
                <img className="bn-bg" src={isMobile ? mob_bg : bg} />
                {!isMobile && <>
                    <img className="deco-img-1" src={p1} />
                    <img className="deco-img-2" src={p2} />
                </>
                }
            </section>
            <img className="bn-logo" src={HOST_URL + pageData.images.logo} style={{ transform: `translateY(${logoScroll * -1}px)` }} />
            {!isMobile && <span className="logo-mask" style={{ height: `${logoScroll * 1 + 95}px` }}></span>}

            <section className="index">
                {!isMobile && <img className="bn-tag" src={exclusive} />}
                <div className="bn-money">
                    <img src={HOST_URL + (isMobile ? pageData.images.mobile : pageData.images.title)} />
                    {!isMobile && <>
                        <span className="shiney-1"></span>
                        <span className="shiney-2"></span>
                        <span className="shiney-3"></span>
                        <span className="shiney-4"></span>
                        <span className="shiney-5"></span>
                    </>}
                </div>
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
                <div className="event-block">
                    <h5 className="info-title">{t('EventTime')}</h5>
                    <EventGroup eventList={mergedArray(pageData.eventList)} />
                </div>
                <div className="rule-block" id="pageContent" dangerouslySetInnerHTML={{ __html: pageData.content }}>
                </div>
                {pageData.terms_and_conditions && <div className="info-block">
                    <h5 className="info-title">{t('TermsConditions')}</h5>
                    <div className="info-content" id="TCBlock" dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                </div>}
            </section>
        </main>
    );
};

export default TemplateComponent;