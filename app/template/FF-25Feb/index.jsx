import './assets/scss/app.scss';
import "../../assets/fonts/NotoSansTamil/style.css";
import "../../assets/fonts/BalooBhai2/style.css";
import "../../assets/fonts/SFProDisplay/style.css";
import "../../assets/fonts/Impact/style.css";
import bg from "./assets/images/banner_img/bg.webp";
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

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const loading = useSelector((state) => state.loading.value);

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
        setSec(newSec);

    }


    return (
        <main className={loading ? 'load-main' : ''}>
            <section className="banner">
                {isMobile ? (
                    <>
                        <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                    </>
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div data-aos="backInDown" data-aos-delay='200' className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <div data-aos="backInUp" data-aos-delay='200' className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="Money" />
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
                   { isMobile && <EventGroup info={sec[0]} eventList={pageData.eventList} GMT={pageData.GMT} />}
            </section>
            <section className="index">
                <div className="container">
                    { !isMobile && <EventGroup info={sec[0]} eventList={pageData.eventList} GMT={pageData.GMT} />}
                    <div className="main-block">
                        <MixTable prizeList={pageData.prizeListData} pointsSystem={pageData.pointsSystemData} gameList={sec[2]} heading={sec[1]} />
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