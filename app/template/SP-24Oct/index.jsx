import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/BebasNeue/style.css";
import "../../assets/fonts/ArchivoNarrow/style.css";
import "../../assets/fonts/Bronco/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import bg from "./assets/images/banner_img/bg.webp";
import titleBar from './assets/images/deco/img_char_playwin.webp';
import coin from './assets/images/deco/img_coin.webp';
import smoke_L from './assets/images/deco/smoke-L.webp';
import smoke_R from './assets/images/deco/smoke-R.webp';
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';
import CurrTable from './CurrTable'
import EventGroup from './EventGroup';
import MoreBtn from '@/component/Promo/MoreBtn';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [deco, setDeco] = useState([])
    const loading = useSelector((state) => state.loading.value)

    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
        decoMouse();
    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern);

        let newSec = secArr.map((str, i) => {
            if (i === 0) return str;
            const updatedStr1 = str.replace(/<strong>(.*?)<\/strong>/g, (match, p1) => {
                return `<strong data-text="${p1}">${p1}</strong>`;
            });

            const updatedStr2 = updatedStr1.replace(/<br>/g, '');

            return `${pattern}${updatedStr2}`;
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
            setDeco(_depth1)
        }
    }


    return (
        <main className={loading ? 'load-main' : ''}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="title-area">
                            <div className="title-bar">
                                <img data-aos="zoom-in" src={titleBar} alt="" />
                            </div>
                            <div className="bn-title">
                                <img data-aos="fade-down" data-aos-delay='400' src={HOST_URL + pageData.images.title} />
                            </div>
                            <div data-aos="fade-down" data-aos-delay='800' className="bn-money">
                                <img src={HOST_URL + pageData.images.money} alt="Money" />
                                <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                            </div>
                        </div>
                        <img className="coin" style={{ transform: `translate(${deco})` }} src={coin} />
                        <img src={smoke_L} className="smoke-L"></img>
                        <img src={smoke_R} className="smoke-R"></img>
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
                <EventGroup eventList={pageData.eventList} GMT={pageData.GMT} />
                <div className="container">
                    <div className='points-block' dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                    <PointTable htmlString={sec[2]} columeType />
                    <div className='points-block'>
                        <CurrTable htmlString={sec[3]} />
                    </div>
                </div>
                <MoreBtn html={pageData.terms_and_conditions} />
            </section>
        </main>
    );
};

export default TemplateComponent;