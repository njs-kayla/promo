import './assets/scss/app.scss';
import "../../assets/fonts/Helvetica/style.css";
import "../../assets/fonts/Perpetua/style.css";
import "../../assets/fonts/Impact/style.css";
import "../../assets/fonts/BebasNeue/style.css";
import { t } from 'i18next';
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
import mon from './assets/images/deco/mon.webp';
import light from './assets/images/deco/light_coin.webp';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import { htmlImg } from '@/service/util';
import MoreInfo from '@/component/Promo/MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const slug = pageData?.customizeData?.slug || null;
    const [deco, setDeco] = useState([])


    useEffect(() => {
        parseContent()
        decoMouse()

    }, [pageData])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
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
        <main className={`type${pageData.theme_type} ${slug}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div style={{ transform: `translate(${deco[1]})` }} className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="bonus">
                            <img data-aos-delay="300" src={HOST_URL + pageData.images.money} alt="" />
                        </div>
                        <div className="bn-tag">
                            <img data-aos-anchor-placement="top-bottom" data-aos-delay="600" src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                        </div>
                        <div className="logo">
                            <img src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                        <div style={{ transform: `translate(${deco[1]})` }}  className="mon">
                            <img src={mon} alt="mon" />
                        </div>
                        <div style={{ transform: `translate(${deco[0]})` }}  className="light">
                            <img src={light} alt="light-coin" />
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
            </section>
            {mergedArray(pageData.eventList).length > 1 && <EventGroup GMT={pageData.GMT} eventList={mergedArray(pageData.eventList)} />}
            <section className="index">
                <div className="container">
                    {sec.map((item, index) => {
                        if (index !== 0) return <div className='points-block' dangerouslySetInnerHTML={{ __html: htmlImg(item) }}></div>
                    })}
                    {isMobile ?
                        <MoreInfo html={pageData.terms_and_conditions} /> :
                        <div className='TC'>
                            <strong className='title'>{t('TermsConditions')}</strong>
                            <div className='content' dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;