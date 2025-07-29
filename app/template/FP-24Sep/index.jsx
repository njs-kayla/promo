import './assets/scss/app.scss';
import '../../assets/fonts/roboto/style.css'
import '../../assets/fonts/KabelC/style.css'
import '../../assets/fonts/Impact/style.css'
import "../../assets/fonts/FugazOne/style.css";
import api from "@/service/api";
import { useEffect, useRef, useState } from 'react';
import bg from './assets/images/bg/bg.webp';
import bg_mb from './assets/images/bg/mb_bg.webp';
import RWD from '@/service/RWD';
import EventGroup from './EventGroup';
import DateHeading from './DateHeading';
import CustomTable from './CustomTable';
import Snow from "./Snow"
import MoreBtn from '@/component/Promo/MoreBtn'
import { mergedArray } from '@/service/util';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { t } from "i18next"

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);


    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        parseContent()

    }, [pageData])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec);
    }

    return (
        <main className={`type${pageData.theme_type} ${Object.keys(pageData.customizeData).length > 0 && pageData.customizeData.slug}`}>
            <section className="banner">
                <img className="bn-bg" src={isMobile ? bg_mb : bg} alt="" />
                {isMobile && <div className="bn-mobile">
                    <img src={HOST_URL + pageData.images.mobile} alt="" />
                </div>}
                {!isMobile &&
                    <>
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <div className="bn-money">
                            <img src={HOST_URL + pageData.images.money} alt="" />
                            <div style={{ maskImage: `url(${HOST_URL + pageData.images.money})` }} className="mask-img"></div>
                        </div>
                        <Snow />
                    </>
                }
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} GMT={pageData.GMT} />
            </section>
            <section className="index">
                {
                    mergedArray(pageData.eventList).length > 1 && <div className="info-block event-group">
                        {<EventGroup eventList={mergedArray(pageData.eventList)} themeType={pageData.theme_type} />}
                    </div>
                }
                {
                    pageData.theme_type === 'A' ? (
                        <>
                            <div className="info-block" dangerouslySetInnerHTML={{ __html: sec[0] }}></div>
                            {!isMobile ? (
                                <div className="info-block" dangerouslySetInnerHTML={{ __html: sec[1] }}></div>
                            ) : (
                                <CustomTable htmlString={sec[1]} type='custom' />
                            )}
                            <CustomTable htmlString={sec[2]} />
                        </>
                    ) : (
                        sec.map((content, i) => {
                            if (i === 0) return null;
                            return (
                                <div key={i} className="info-block" dangerouslySetInnerHTML={{ __html: content }}></div>
                            );
                        })
                    )
                }
                <MoreBtn html={pageData.terms_and_conditions} />
            </section>
        </main>
    );
};

export default TemplateComponent;