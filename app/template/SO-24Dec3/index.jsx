import './assets/scss/app.scss';
import "../../assets/fonts/Kanit/style.css";
import "../../assets/fonts/poppins/style.css";
import api from "@/service/api";
import { useEffect, useState } from 'react';
import { t } from "i18next"
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import MoreBtn from '@/component/Promo/MoreBtn'
import TreasureChest from './TreasureChest';
import { mergedArray } from '@/service/util';
import { useSelector } from 'react-redux';
import { htmlImg } from '@/service/util';
import Redpackets from './Redpacket';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MoreInfo from '@/component/Promo/MoreInfo';
import { getPublicImage } from '@/service/util';

const bg = getPublicImage(import.meta.url, 'bg/bg.webp');


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);
    const slug = pageData?.customizeData?.slug || null;
    const exp = pageData?.customizeData?.exp || null;

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
    }

    return (
        <main className={loading ? `main-load type${pageData.theme_type} ${slug}` : `type${pageData.theme_type} ${slug}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className="bn-title">
                            <img data-aos="fade-up" data-aos-delay="300" src={HOST_URL + pageData.images.title} />
                            <img data-aos="zoom-out" data-aos-delay="1200" className='bn-tag' src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                        </div>
                        <div className="bonus">
                            <img data-aos="fade-up" data-aos-delay="600" src={HOST_URL + pageData.images.money} alt="" />
                        </div>
                        <div className="logo">
                            <img src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                        <Redpackets />
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />

            </section>
            <section className="index">
                {mergedArray(pageData.eventList).length > 1 && <div className="tournament-block">
                    <div className='tournament-head' dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                    <EventGroup eventList={mergedArray(pageData.eventList)} GMT={pageData.GMT}/>
                </div>}
                <div className="container">
                    {sec.map((item, index) => {
                        if (index !== 0) return <div className='points-block'>
                            <div dangerouslySetInnerHTML={{ __html: htmlImg(item) }}></div>
                            {index === 3 && exp && <TreasureChest data={pageData.customizeData} />}
                        </div>
                    })}
                    {slug === 'RPLAY' ? <MoreBtn html={pageData.terms_and_conditions} /> : isMobile ? <MoreInfo html={pageData.terms_and_conditions} /> : <div className='TC'>
                        <h2 className='title'>{t('TermsConditions')}</h2>
                        <ul className='content' dangerouslySetInnerHTML={{ __html: pageData.terms_and_conditions }}></ul>
                    </div>}
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;