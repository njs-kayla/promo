import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/DINCondensed/style.css";
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const coin_L_1 = getPublicImage(import.meta.url, 'deco/coin_L_1.webp');
const coin_L_2 = getPublicImage(import.meta.url, 'deco/coin_L_2.webp');
const coin_R_1 = getPublicImage(import.meta.url, 'deco/coin_R_1.webp');
const coin_R_2 = getPublicImage(import.meta.url, 'deco/coin_R_2.webp');
const sparkle = getPublicImage(import.meta.url, 'deco/sparkle.webp');



const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

    useEffect(() => {
        parseContent();
    }, [pageData]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [sec])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let modifiedContent = content.replace(/<(h3|h4|table|p)/g, '<$1 data-aos="fade-up"');
        let secArr = modifiedContent.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)

        setSec(newSec);
    };


    return (
        <main className={`type${pageData.theme_type} ${Object.keys(pageData.customizeData).length > 0 && pageData.customizeData.slug}`}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-main">
                            <div className="bn-title">
                                <img src={HOST_URL + pageData.images.title} />
                            </div>
                            <img className="coin_L_1" src={coin_L_1} alt="" />
                            <img className="coin_L_2" src={coin_L_2} alt="" />
                            <img className="coin_R_1" src={coin_R_1} alt="" />
                            <img className="coin_R_2" src={coin_R_2} alt="" />
                            <img className='sparkle-1' src={sparkle} alt="" />
                            <img className='sparkle-2' src={sparkle} alt="" />
                            <img className='sparkle-3' src={sparkle} alt="" />
                            {pageData.theme_type !== 'A' && <>
                                <img className='sparkle-4' src={sparkle} alt="" />
                                <img className='sparkle-5' src={sparkle} alt="" />
                                <img className='sparkle-6' src={sparkle} alt="" />
                            </>}
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
                <div className="container">
                    {sec.map((content, i) => (
                        <div key={i} className="points-block" dangerouslySetInnerHTML={{ __html: content }}></div>
                    ))}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;