import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/BungeeInline/style.css";
import "../../assets/fonts/ArchivoNarrow/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/Impact/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import bg from "./assets/images/banner_img/bg.webp";
import dragon from './assets/images/deco/dragon.webp'
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
import coin1 from './assets/images/deco/coin_1.webp';
import coin2 from './assets/images/deco/coin_2.webp';
import coin3 from './assets/images/deco/coin_3.webp';
import chest from './assets/images/deco/img_chest.webp';

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
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

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
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay='400' src={HOST_URL + pageData.images.title} />
                        </div>
                        <div data-aos="fade-up" data-aos-delay='800' className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="Money" />
                        </div>
                        <div data-aos="fade-right" className="dragon">
                            <img src={dragon} alt="" />
                        </div>
                        <div className="coin1">
                            <img src={coin1} alt="" />
                        </div>
                        <div className="coin2">
                            <img src={coin2} alt="" />
                        </div>
                        <div className="coin3">
                            <img src={coin3} alt="" />
                        </div>
                        <div className="chest" data-aos="fade-left" >
                            <img src={chest} alt="" />
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
                <EventGroup info={sec[0]} eventList={pageData.eventList} GMT={pageData.GMT} />
            </section>
            <section className="index">
                { isMobile ? <GameSlider htmlStr={sec[1]} /> : <div ref={gameBlockRef} style={{ '--position': `-${scrollEffect}px` }} className="game-list-block" dangerouslySetInnerHTML={{ __html: htmlImg(sec[1]) }}></div>}
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