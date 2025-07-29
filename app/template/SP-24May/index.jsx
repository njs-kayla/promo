import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/agencyfb/style.css";
import "../../assets/fonts/poppins/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import i18n from '@/service/i18n';
import EventGroup from './EventGroup';
import CurrTable from '@/component/Promo/CurrTable';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import PointTable from '@/component/Promo/PointTable';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getPublicImage } from '@/service/util';

const tag_cn = getPublicImage(import.meta.url, 'banner_img/icon_cn.webp');
const tag_en = getPublicImage(import.meta.url, 'banner_img/icon_en.webp');
const bg = getPublicImage(import.meta.url, 'banner_img/bg.webp');
const house = getPublicImage(import.meta.url, 'banner_img/house.webp');
const peo = getPublicImage(import.meta.url, 'banner_img/peo.webp');
const peo2 = getPublicImage(import.meta.url, 'banner_img/peo2.webp');
const title = getPublicImage(import.meta.url, 'banner_img/title.webp');


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value)


    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
    }, [pageData, loading])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <main className={loading ? 'load-main' : ''}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? (HOST_URL + pageData.images.mobile) : bg} />
                {!isMobile && <>
                    <img className="bn-tag" src={i18n.language == 'zh-CN' ? tag_cn : tag_en} />
                    <img className="deco-1 up" src={house} data-aos="show-out" />
                    <img className="deco-2 left" src={peo} data-aos="show-out" style={{ animationDelay: '0.2s' }} />
                    <img className="deco-3 right" src={peo2} data-aos="show-out" style={{ animationDelay: '0.4s' }} />
                    <div className='bn-main up' data-aos="show-out" style={{ animationDelay: '0.6s' }}>
                        <span className='moon-light'></span>
                        <img className='bn-title' src={title} />
                        <div className="bn-money">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                    </div>
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </section>
            <section className="index">
                <div className="container">
                    <div className="event-block" data-aos="fade-up" data-aos-offset={isMobile ? '-300' : '0'}>
                        <EventGroup eventList={pageData.eventList} />
                        <div className="tournament-info" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                    </div>
                    <div data-aos="fade-up">
                        <PointTable htmlString={sec[1]} columeType />
                    </div>
                    <div data-aos="fade-up">
                        <CurrTable htmlString={sec[sec.length - 1]} />
                    </div>
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;