import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/AlibabaSansThai/style.css";
import "../../assets/fonts/HokubaGrabs/style.css";
import bg from "./assets/images/banner_img/bg.webp";
import bg_raja from "./assets/images/banner_img/bg_raja.webp";
import dragon from './assets/images/deco/dragon.webp';
import door from './assets/images/deco/door.webp';
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { t } from 'i18next';
import i18n from '@/service/i18n';
import { useSelector } from 'react-redux';
import { htmlImg } from '@/service/util';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreInfo from '@/component/Promo/MoreInfo';
import snake from './assets/images/deco/title_snake.webp'
import MixTable from '@/component/Promo/MixTable';
import EventGroup from './EventGroup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const slug = pageData?.customizeData?.slug || null;
    const [scrolled, setScrolled] = useState(false);
    const loading = useSelector((state) => state.loading.value);

    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1000, once: true, disable: isMobile });
        }
    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;

        let secArr = content.split(pattern);

        let newSec = secArr.map((str, i) => {
            if (i === 0) return str;

            const updatedStr = str.replace(/<strong>(.*?)<\/strong>/g, (match, p1) => {
                return `<strong data-text="${p1}">${p1}</strong>`;
            });

            return `${pattern}${updatedStr}`;
        });

        setSec(newSec);
    }

    useEffect(() => {
        if (isMobile) return;

        const handeScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setScrolled(scrollTop > 50);
        }
        window.addEventListener('scroll', handeScroll);

        return () => {
            window.removeEventListener('scroll', handeScroll);
        }
    }, [pageData, isMobile])


    return (
        <main className={`type${pageData.theme_type} ${slug}`}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={pageData.theme_type === 'A' ? bg_raja : bg} />
                        <div className="logo">
                            <img src={HOST_URL + pageData.images.logo} alt="" />
                        </div>
                        <div className="dragon">
                            <img src={dragon} alt="" />
                        </div>
                        {
                            slug?.includes('BET') && <div className="snake">
                                <img src={snake} alt="" />
                            </div>
                        }
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        {pageData.images.money && (
                            <div className="bn-money">
                                <img src={HOST_URL + pageData.images.money} alt="Money" />
                            </div>
                        )}
                        {pageData.images.other?.length > 0 && (
                            <div className="excl">
                                <img src={HOST_URL + pageData.images.other[0]} alt="excl" />
                            </div>
                        )}
                        {pageData.theme_type === 'A' && (
                            <>
                                <div className={scrolled ? "scroll door_R" : "door_R"}>
                                    <img src={door} alt="" />
                                </div>
                                <div className={scrolled ? "scroll door_L" : "door_L"}>
                                    <img src={door} alt="" />
                                </div>
                            </>
                        )}
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
                {pageData.eventList[0].length > 1 && <EventGroup eventList={pageData.eventList} GMT={pageData.GMT} />}
                <div className="container">
                    {sec.map((item, index) => {
                        if (index !== 0) return <>
                            <div className='content-block' key={index} dangerouslySetInnerHTML={{ __html: htmlImg(item) }}></div>
                        </>
                    })}
                    {slug === 'tournament' &&
                        <div className="main-block">
                            <MixTable prizeList={pageData.prizeListData} pointsSystem={pageData.pointsSystemData} />
                        </div>
                    }
                </div>
                {isMobile ? <MoreInfo html={pageData.terms_and_conditions} /> : <div className="TC">
                    <h4 className='title'>{t('TermsConditions')}</h4>
                    <div className="content" dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                </div>}
            </section>
        </main>
    );
};

export default TemplateComponent;