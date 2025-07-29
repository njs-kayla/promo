import './assets/scss/app.scss';
import '../../assets/fonts/ArchivoNarrow/style.css';
import '../../assets/fonts/YouSheBiaoTiHei/style.css';
import '../../assets/fonts/BebasNeue/style.css';
import '../../assets/fonts/PubgSans/style.css';
import '../../assets/fonts/KoreanSWGI3-R/style.css';
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
import tag_cn from './assets/images/deco/img_tag.webp'
import fox from './assets/images/deco/img_char.webp';
import redpacket from './assets/images/deco/img_redpacket.webp';
import char1 from './assets/images/deco/img_char_1.webp';
import char2 from './assets/images/deco/img_char_2.webp';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import TreasureChest from './TreasureChest'
import { mergedArray } from '@/service/util';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const [deco, setDeco] = useState(null)


    useEffect(() => {
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
        parseContent()
        decoMouse()

    }, [pageData, loading])

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
            let _depth1 = `${0 - (_mouseX - _w) * 0.008}%, ${0 - (_mouseY - _h) * 0.008}%`;
            setDeco(_depth1)
        }
    }

    return (
        <main className={loading ? `main-load type${pageData.theme_type} ${Object.keys(pageData.customizeData).length > 0 && pageData.customizeData.slug}` : `type${pageData.theme_type} ${Object.keys(pageData.customizeData).length > 0 && pageData.customizeData.slug}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className="bn-title">
                            <img data-aos="fade-right" data-aos-delay="500" src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className='title-area'>
                            <div className="won">
                                <img data-aos="zoom-out" data-aos-delay="1600" src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                            </div>
                            <div className="bonus">
                                <img data-aos="fade-right" data-aos-delay="500" src={HOST_URL + pageData.images.money} alt="" />
                            </div>
                        </div>
                        <div className="bn-tag">
                            <img data-aos='zoom-out' data-aos-delay="1600" src={tag_cn} alt="" />
                        </div>
                        <div className="logo">
                            <img src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                        {pageData.theme_type === 'C' ? <>
                            <div className="char-1">
                                <img data-aos="fade-right" src={char1} alt="" />
                            </div>
                            <div className="char-2">
                                <img data-aos="fade-right" src={char2} alt="" />
                            </div>
                            <img className="red_packet" style={{ transform: `translate(${deco})` }} src={redpacket} />
                        </> : <div className="fox">
                            <img data-aos="fade-right" src={fox} alt="" />
                        </div>}
                        <div className="coin-1"></div>
                        <div className="coin-2"></div>
                        <div className="coin-3"></div>
                        <div className="coin-4"></div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />

            </section>
            <section className="index">
                {mergedArray(pageData.eventList).length > 1 && <EventGroup eventList={mergedArray(pageData.eventList)} GMT={pageData.GMT} />}
                <div className='points-block' dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                <div className='points-block' dangerouslySetInnerHTML={{ __html: sec[2] }}></div>
                {pageData.customizeData && <TreasureChest data={pageData.customizeData} />}
                <div className='points-block' dangerouslySetInnerHTML={{ __html: sec[3] }}></div>
                <MoreBtn html={pageData.terms_and_conditions} />
            </section>
        </main>
    );
};

export default TemplateComponent;