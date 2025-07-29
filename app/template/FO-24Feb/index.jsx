import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/AlibabaSansThai/style.css";
import "../../assets/fonts/Impact/style.css";
import "../../assets/fonts/CocogooseCompressedTrial/style.css";
import "../../assets/fonts/KoreanSWGI3-R/style.css";
import "../../assets/fonts/TeXGyreAdventor/style.css";
import api from "@/service/api";
import bg from './assets/images/banner_img/bg.webp';
import sparkle from './assets/images/deco/sparkle.webp';
import { useEffect, useState } from 'react';
import contentFadeOut from './contentFadeOut';
import RWD from '@/service/RWD';
import DateHeading from './DateHeading';
import TermsConditions from '@/component/Promo/TermsConditions';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);

    useEffect(() => {
        parseContent();
    }, [pageData])

    useEffect(() => {
        if (!isMobile) {
            const cleanup = contentFadeOut();
            return () => {
                cleanup();
            };
        }
    }, [sec])

    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <main className={`type-${pageData.theme_type}`}>
            <section className="banner">
                {isMobile ? (
                    <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
                ) : <>
                    <img className="bg-bg" src={bg} />
                </>}
            </section>
            <section className="index">
                { !isMobile && <img className="logo" src={HOST_URL + pageData.images.logo} alt="" />}
                <div className="container">
                    { !isMobile && <div className="title-area">
                        <div className="bn-title">
                            <img src={HOST_URL + pageData.images.title} />
                        </div>
                        {/* excl */}
                        <img className='excl' src={HOST_URL + pageData.images.other[0]} alt="" />
                        {/* sparkle */}
                        <img className="sparkle-1" src={sparkle} alt="" />   
                        <img className="sparkle-2" src={sparkle} alt="" />  
                        <img className="sparkle-3" src={sparkle} alt="" />  
                    </div>}
                    <DateHeading dateData={{
                        startGroup: pageData.eventList[0],
                        endGroup: pageData.eventList[pageData.eventList.length - 1]
                    }} />
                    <div className='points-block' dangerouslySetInnerHTML={{__html: sec[1]}}></div>
                    <div className='points-block' dangerouslySetInnerHTML={{__html: sec[2]}}></div>
                    <div className='points-block' dangerouslySetInnerHTML={{__html: sec[3]}}></div>
                    <TermsConditions htmlString={pageData.terms_and_conditions}/>
                </div>
            </section>
        </main>
    );
};

export default TemplateComponent;