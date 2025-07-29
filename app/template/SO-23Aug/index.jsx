import './assets/scss/app.scss';
import "../../assets/fonts/icomoon/style.css";
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/poppins/style.css";
import "../../assets/fonts/agencyfb/style.css";
import api from "@/service/api";
import { useEffect, useState } from 'react';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import Table from './Table'
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn';
import { useSelector } from 'react-redux';
import { getPublicImage } from '@/service/util';

const peo = getPublicImage(import.meta.url, 'peo.webp');
const webThunder = getPublicImage(import.meta.url, 'thunder.webp');
const mobThunder = getPublicImage(import.meta.url, 'mob_thunder.webp');
const bg = getPublicImage(import.meta.url, 'bg.webp');

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading =useSelector((state) => state.loading.value)
    const [decoStyle, setDecoStyle] = useState(1);

    useEffect(() => {
        parseContent();
        window.addEventListener('scroll', scrollAnimate)

        return () => window.removeEventListener('scroll', scrollAnimate)
    }, [pageData])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    const scrollAnimate = () => {
        let h = window.innerHeight / 2;
        let scrollY = document.documentElement.scrollTop;
        let opacity = (scrollY > h) ? 0 : ((h - scrollY) / h)
        setDecoStyle(opacity)
    }

    return (
        <main className={loading ? `load-main type${pageData.theme_type}` : `type${pageData.theme_type}`} style={{ backgroundImage: `url(${bg})` }}>
            <span className="deco-thunder" style={{ backgroundImage: isMobile ? `url(${mobThunder})` : `url(${webThunder})` }}></span>
            <span className="deco-thunder-bg"></span>
            { !isMobile && <img className="deco-bg" src={peo} style={{opacity: decoStyle}} alt="" />}
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                        <DateHeading dateData={{
                            startGroup: pageData.eventList[0],
                            endGroup: pageData.eventList[pageData.eventList.length - 1]
                        }} />
                    </>
                ) : <>
                    <div className="bn-title-block">
                        <img className='bn-title' src={HOST_URL + pageData.images.title} alt="" />
                        <DateHeading dateData={{
                            startGroup: pageData.eventList[0],
                            endGroup: pageData.eventList[pageData.eventList.length - 1]
                        }} />
                    </div>
                    <img className='bn-tag' src={HOST_URL + pageData.images.other[0]} alt="" />
                    <img className="bn-money" src={HOST_URL + pageData.images.money} />
                </>}
            </section>
            <section className="index">
                <div className="container">
                    <EventGroup eventList={pageData.eventList} />
                    { sec.map((item, i) => {
                        if (item.includes('table') && pageData.theme_type !== "B") {
                            return <Table key={i} htmlString={item}/>;
                        } else {
                            return <div key={i} className='points-block' dangerouslySetInnerHTML={{ __html: item }}></div>;
                        }
                    })}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;