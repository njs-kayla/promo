import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/ProtestRiot/style.css";
import "../../assets/fonts/poppins/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import tag_cn from './assets/images/banner_img/icon_cn.webp'
import tag_en from './assets/images/banner_img/icon_en.webp'
import bg from './assets/images/banner_img/bg.webp';
import light from "./assets/images/deco/img_light.webp";
import cloud_L from "./assets/images/deco/img_cloud_L.webp";
import cloud_R from "./assets/images/deco/img_cloud_R.webp";
import i18n from '@/service/i18n';
import EventGroup from './EventGroup';
import CurrTable from './CurrTable';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import PointTable from '@/component/Promo/PointTable';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const [ cloudOpacity, setCloudOpacity ] = useState(1);


    useEffect(() => {
        parseContent();
        if (!loading) {
            AOS.init({ duration: 1000, once: true });
        }
    }, [pageData, loading])

    useEffect(() => {
        const handleSize = () => {
            if (window.scrollY > 0) {
                setCloudOpacity(0.8)
            } else {
                setCloudOpacity(1)
            }
        }
        window.addEventListener('scroll', handleSize);

        return () => window.removeEventListener('scroll', handleSize);
    }, [])


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
                    <div data-aos="show-out" className="bn-title first">
                        <img className='light' src={light}/>
                        <img src={HOST_URL + pageData.images.title} />
                    </div>
                    <div data-aos="show-out" className="bn-money second">
                        <img src={HOST_URL + pageData.images.money} />
                    </div>
                </>}
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT}/>
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
                { !isMobile && <>
                    <img className='cloud cloud_L left' style={{ scale: `${cloudOpacity}` }} data-aos="show-out" src={cloud_L} alt="" />
                    <img className='cloud cloud_R right' style={{ scale: `${cloudOpacity}`}} data-aos="show-out" src={cloud_R} alt="" />
                </> }
            </section>
        </main>
    );
};

export default TemplateComponent;