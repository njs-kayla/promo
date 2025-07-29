import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/BungeeInline/style.css";
import "../../assets/fonts/ArchivoNarrow/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/Impact/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import "../../assets/fonts/BakbakOne/style.css";
import bg1 from "./assets/images/banner_img/bg_1.webp";
import bg2 from "./assets/images/banner_img/bg_2.webp";
import mob_bg1 from "./assets/images/banner_img/mob_bg1.webp";
import mob_bg2 from "./assets/images/banner_img/mob_bg2.webp";
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import { htmlImg, throttle } from '@/service/util';
import GameSlider from './GameSlider';
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
    const loading = useSelector((state) => state.loading.value);
    const [scrollEffect, setScrollEffect] = useState(350);
    const gameBlockRef = useRef(null)

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
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str);

        if (newSec[1]) {
            newSec[1] = newSec[1].replace(
                /<h3>(.*?)<\/h3>/,
                (match, p1) => `<h3 data-text="${p1}">${p1}</h3>`
            );
        }

        setSec(newSec);
    };

    useEffect(() => {
        if (loading || !gameBlockRef.current || isMobile) return;

        const handleScroll = throttle(() => {
            const gameBlock = gameBlockRef.current;
            const gameBlockTop = gameBlock.getBoundingClientRect().top;

            const min = -570;
            const max = window.innerHeight;


            if (gameBlockTop >= min && gameBlockTop <= max) {
                const effectValue = ((gameBlockTop - min) / (max - min)) * 350;
                setScrollEffect(effectValue);
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, isMobile]);



    return (
        <main className={loading ? 'load-main' : ''}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={mob_bg1} />
                        <img className="bn-bg" src={mob_bg2} />
                        <div className="bn-title">
                            <img  src={HOST_URL + pageData.images.mobile_title} />
                        </div>
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg1} />
                        <img className="bn-bg" src={bg2} />
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay='400' src={HOST_URL + pageData.images.title} />
                        </div>
                        <div data-aos="fade-up" data-aos-delay='800' className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="Money" />
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
                <EventGroup info={sec[0]} eventList={pageData.eventList} GMT={pageData.GMT} />
                {isMobile ? <GameSlider htmlStr={sec[1]} /> : <div ref={gameBlockRef} style={{ '--position': `-${scrollEffect}px` }} className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(sec[1]) }}></div>}
                <div className="container">
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