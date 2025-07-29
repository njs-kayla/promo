import './assets/scss/app.scss';
import "../../assets/fonts/bigjohn/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
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
        <main className={`type${pageData.theme_type}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className='bn-title'>
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <DateHeading dateData={{
                            startGroup: pageData.eventList[0],
                            endGroup: pageData.eventList[pageData.eventList.length - 1]
                        }} GMT={pageData.GMT} />
                    </>
                }
            </section>
            <section className="index">
                <div className="container">
                    {pageData.eventList.length > 1 && <EventGroup eventList={mergedArray(pageData.eventList)} />}
                    {sec.map((content, i) => (
                        <div key={i} className="info-block" dangerouslySetInnerHTML={{ __html: htmlImg(content) }}></div>
                    ))}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;