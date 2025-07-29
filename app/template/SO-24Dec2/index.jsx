import './assets/scss/app.scss';
import "../../assets/fonts/Kanit/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
import char1 from './assets/images/deco/char01.webp'
import char2 from './assets/images/deco/char02.webp'
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import { mergedArray } from '@/service/util';
import PointTable from './PointTable'
import MoreBtn from '@/component/Promo/MoreBtn';
import Snow from './Snow'
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);

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
        <main className={loading ? `main-load type${pageData.theme_type}` : `type${pageData.theme_type}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? HOST_URL + pageData.images.mobile : bg} alt="" />
                {!isMobile &&
                    <>
                        <div className="bn-title">
                            <img data-aos="fade-down" data-aos-delay="600" src={HOST_URL + pageData.images.title} />
                            <img data-aos="fade-down" data-aos-delay="600" className='bn-tag' src={pageData.images.other && HOST_URL + pageData.images.other[0]} />
                        </div>
                        <div className="bonus">
                            <img data-aos="zoom-in-down" data-aos-delay="1000" src={HOST_URL + pageData.images.money} alt="" />
                        </div>
                        <div className="logo">
                            <img src={pageData.images.logo && HOST_URL + pageData.images.logo} />
                        </div>
                        <div className="char1" data-aos="fade-right">
                            <img src={char1} alt="char" />
                        </div>
                        <div className="char2" data-aos="fade-left">
                            <img src={char2} alt="char" />
                        </div>
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />

            </section>
            <section className="index">
                <div className="container">
                    {mergedArray(pageData.eventList).length > 1 && <EventGroup eventList={mergedArray(pageData.eventList)} />}
                    {sec.map((item, index) => {
                        if (index !== 0) return <PointTable key={index} htmlString={item}/>
                    })}
                    <MoreBtn html={pageData.terms_and_conditions} />
                </div>
            </section>
            { !isMobile && <Snow /> }
        </main>
    );
};

export default TemplateComponent;