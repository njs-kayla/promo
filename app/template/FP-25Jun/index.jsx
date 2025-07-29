import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/DreadRinger/style.css";
import "../../assets/fonts/ArchivoNarrow/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/SSQingBoTi/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import "../../assets/fonts/Impact/style.css";
import api from "@/service/api";
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import { t } from "i18next"
import MixTable from '@/component/Promo/MixTable';
import EventGroup from './EventGroup';
import MoreInfo from '@/component/Promo/MoreInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const fg_L = getPublicImage(import.meta.url, 'deco/pc_fg_L.webp');
const fg_R = getPublicImage(import.meta.url, 'deco/pc_fg_R.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const [deco, setDeco] = useState([])
    const loading = useSelector((state) => state.loading.value)

    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 800 });
        }
        decoMouse();
    }, [pageData, loading])

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern)

        setSec(secArr);
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
            setDeco([_depth1, _depth2])
        }
    }


    return (
        <main className={loading ? 'load-main' : ''}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                        <div data-aos="fade-up" data-aos-delay='300' className="bn-money">
                            <img src={HOST_URL + pageData.images.mobile_money} alt="Money" />
                            <div style={{ maskImage: `url(${HOST_URL + pageData.images.mobile_money})` }} className="mask-img"></div>
                        </div>
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.title} />
                        <div data-aos="fade-up" data-aos-delay='300' className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="Money" />
                            <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                        </div>
                        <div data-aos="fade-down" data-aos-delay='400' className="fg_L">
                            <img style={{ transform: `translate(${deco[0]})` }} src={fg_L} alt="" />
                        </div>
                        <div data-aos="fade-down" data-aos-delay='400' className="fg_R">
                            <img style={{ transform: `translate(${deco[0]})` }} src={fg_R} alt="" />
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
                <EventGroup eventList={pageData.eventList} GMT={pageData.GMT} />
                <div className="container">
                    {sec.map((item, i) => (
                        <div key={i} className='points-block' dangerouslySetInnerHTML={{ __html: item }}></div>
                    ))}
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