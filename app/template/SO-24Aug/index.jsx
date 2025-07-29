import './assets/scss/app.scss';
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import PointTable from './PointTable';
import FireflyEffect from './FireflyEffect';
import { mergedArray, getPublicImage } from '@/service/util';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { t } from "i18next";

const bg = getPublicImage(import.meta.url, 'bg/bg.webp');
const tag_cn = getPublicImage(import.meta.url, 'deco/img_tag.webp');
const red_packet = getPublicImage(import.meta.url, 'deco/img_red_packet.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const [Open, setOpen] = useState(false);
    const [btnBgHover, setBtnBgHover] = useState(true);
    const [deco, setDeco] = useState(null)


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
        decoMouse();
    }
    useEffect(() => {
        let timer;
        if (isMobile) {
            setBtnBgHover(false);
            return
        }
    
        if (Open) {
          setBtnBgHover(false);
        } else {
          timer = setTimeout(() => {
            setBtnBgHover(true);
          }, 500);
        }
        
        return () => clearTimeout(timer);
      }, [Open, isMobile]);

    const handleOpen = () => {
        setOpen(!Open);
    }
    const decoMouse = () => {
        if (isMobile) return;
        document.addEventListener("mousemove", parallax);

        function parallax(e) {
            let _w = window.innerWidth / 2;
            let _h = window.innerHeight / 2;
            let _mouseX = e.clientX;
            let _mouseY = e.clientY;
            let _depth1 = `${0 - (_mouseX - _w) * 0.008}%, ${0 - (_mouseY - _h) * 0.008}%`;
            setDeco(_depth1)
        }
    }

    return (
        <main className={loading ? `main-load type${pageData.theme_type}` : `type${pageData.theme_type}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className='title-area'>
                            <div className="bn-title">
                                <img data-aos="fade-down" src={HOST_URL + pageData.images.title} />
                            </div>
                            <div className="won">
                                <img data-aos="fade-down" data-aos-delay="500" src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                            </div>
                            <div className="bonus">
                                <img data-aos="zoom-out" data-aos-delay="1000" src={HOST_URL + pageData.images.money} alt="" />
                            </div>
                        </div>
                        <div className="bn-tag">
                            <img data-aos='zoom-in-up' data-aos-delay="1500" src={tag_cn} alt="" />
                        </div>
                        <div className="logo">
                            <img src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                        <img className="red_packet" style={{ transform: `translate(${deco})` }} src={red_packet} />
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />

            </section>
            <section className="index">
                {mergedArray(pageData.eventList).length > 1 && <EventGroup eventList={mergedArray(pageData.eventList)} />}
                <div className="info-block">
                    {sec.map((item, index) => {
                        if (index !== 0) return <PointTable key={index} htmlString={item} type='column' />
                    })}
                    <button className={`btn-more ${Open ? "active" : ""} ${btnBgHover ? "hover" : ""}`} onClick={handleOpen}>
                        <span>{t('TermsConditions')}</span>
                    </button >
                    <div className={`content ${Open ? "open" : ""}`} dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></div>
                </div>
            </section>
            { !isMobile && <FireflyEffect /> }
        </main>
    );
};

export default TemplateComponent;