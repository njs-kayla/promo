import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/AlibabaSansThai/style.css"
import "../../assets/fonts/KurriIslandPERSONAL/style.css";
import bg from "./assets/images/banner_img/bg.webp"
import api from "@/service/api";
import { Fragment, useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';
import TermsConditions from '@/component/Promo/TermsConditions';
import AOS from 'aos';
import 'aos/dist/aos.css';


const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD();
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

    useEffect(() => {
        parseContent();
    }, [pageData]);

    const parseContent = () => {
        const pattern = "<h";
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => (i > 0 ? pattern : '') + str);
        setSec(newSec);
    };

    return (
        <main className="">
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : (
                    <>
                        <img className="bn-bg" src={bg} />
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        <img className="logo" src={HOST_URL + pageData.images.logo} alt="" />
                    </>
                )}
                <DateHeading
                    dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }}
                />
            </section>
            <section className="index">
                <div className="container">
                        <PointTable htmlString={sec[1]} />
                        <div className='points-block' dangerouslySetInnerHTML={{__html: sec[2]}}></div>
                        <div className='points-block' dangerouslySetInnerHTML={{__html: sec[3]}}></div>
                        <TermsConditions htmlString={pageData.terms_and_conditions}/>
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;