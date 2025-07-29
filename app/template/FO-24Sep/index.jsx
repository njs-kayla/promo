import './assets/scss/app.scss';
import "../../assets/fonts/BebasNeue/style.css";
import "../../assets/fonts/Gurajada/style.css";
import "../../assets/fonts/AlibabaSansThai/style.css";
import "../../assets/fonts/roboto/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
import peo from './assets/images/deco/web_role.webp'
import coin from './assets/images/deco/web_coin.webp';
import coin2 from './assets/images/deco/coin2.webp'
import fire from './assets/images/deco/web_fire.webp'
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import { mergedArray, htmlImg } from '@/service/util';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [deco, setDeco] = useState([])


    useEffect(() => {
        parseContent()
        decoMouse()
    }, [pageData])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let tableCount = 0;
        let secArr = content.split(pattern);
        
        let newSec = secArr.map((str, i) => {
            if (str.includes("<table")) {
                tableCount++;
                if (tableCount === 2) {
                    str = str.replace('<table', '<table class="points-table"');
                }
            }
            return (i > 0 ? pattern : '') + str;
        });
    
        setSec(newSec);
    }

    const decoMouse = () => {
        if (isMobile) return;
        document.addEventListener("mousemove", parallax);

        function parallax(e) {
            let _w = window.innerWidth / 2;
            let _h = window.innerHeight / 2;
            let _mouseX = e.clientX;
            let _mouseY = e.clientY;
            let _depth1 = `${0 - (_mouseX - _w) * 0.005}%, ${0 - (_mouseY - _h) * 0.005}%`;
            let _depth2 = `${0 - (_mouseX - _w) * 0.0015}%, ${0 - (_mouseY - _h) * 0.0015}%`;
            let _depth3 = `${0 - (_mouseX - _w) * -0.0015}%, ${0 - (_mouseY - _h) * -0.0015}%`;
            setDeco([_depth1, _depth2, _depth3])
        }
    }

    return (
        <main className={`type${pageData.theme_type}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile ? (
                    <>
                        <div className='peo-area'>
                            <div style={{ transform: `translate(${deco[0]})` }} className="peo">
                                <img src={peo} />
                            </div>
                            <div style={{ transform: `translate(${deco[1]})` }} className="coin">
                                <img src={ Object.keys(pageData.customizeData).length > 0 && pageData.customizeData.slug ? coin2 : coin} alt="" />
                            </div>
                            <div style={{ transform: `translate(${deco[2]})` }} className="fire">
                                <img src={fire} />
                            </div>
                        </div>
                        <div className='title-area'>
                            <div className="won">
                                <img src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                            </div>
                            <div className='bn-title' >
                                <img src={HOST_URL + pageData.images.title} />
                            </div>
                            {pageData.theme_type !== 'A' && (
                                <DateHeading dateData={{
                                    startGroup: pageData.eventList[0],
                                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                                }} GMT={pageData.GMT} />
                            )}
                            {pageData.theme_type === 'A' && <div className="bn-money">
                                <img src={HOST_URL + pageData.images.money} />
                                <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                            </div>}
                        </div>
                    </>
                ) : (
                    pageData.theme_type !== 'A' && (
                        <DateHeading dateData={{
                            startGroup: pageData.eventList[0],
                            endGroup: pageData.eventList[pageData.eventList.length - 1]
                        }} GMT={pageData.GMT} />
                    )
                )}
            </section>
            <section className="index">
                {pageData.theme_type === 'A' && <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />}
                {pageData.eventList[0].length > 1 && <EventGroup eventList={mergedArray(pageData.eventList)} />}
                {sec.map((content, i) => {
                    if (i == 0) return
                    return (
                        <div key={i} className="info-block" dangerouslySetInnerHTML={{ __html: htmlImg(content) }}></div>
                    )
                }
                )}
                <MoreBtn html={pageData.terms_and_conditions} />
            </section>
        </main>
    );
};

export default TemplateComponent;