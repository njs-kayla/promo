import './assets/scss/app.scss';
import "../../assets/fonts/roboto/style.css";
import "../../assets/fonts/Sekate/style.css";
import api from "@/service/api";
import bg from './assets/images/banner_img/bg.webp';
import light from './assets/images/deco/light.webp';
import coin from './assets/images/deco/coin.webp';
import { useEffect, useRef, useState } from 'react';
import RWD from '@/service/RWD';
import MoblieTable from './MobileTable'
import DateHeading from './DateHeading';
import PointTable from '@/component/Promo/PointTable';
import TermsConditions from '@/component/Promo/TermsConditions';

const TemplateComponent = ({ pageData }) => {
    const { isMobile } = RWD()
    const { HOST_URL } = api();
    const [sec, setSec] = useState([]);
    const container = useRef();

    useEffect(() => {
        parseContent();
    }, [pageData])


    const parseContent = () => {
        const pattern = "<h"
        const { content } = pageData;
        let secArr = content.split(pattern);
        let newSec = secArr.map((str, i) => ((i > 0) ? pattern : '') + str)
        setSec(newSec)
    }

    return (
        <main className="">
        <section className="banner" style={{backgroundImage: !isMobile ?  `url(${bg})` : 'none'}}>
            {isMobile ? (
                <img className="bn-bg" src={HOST_URL + pageData.images.mobile} />
            ) : <>
                <div className="bn-title">
                    <img src={HOST_URL + pageData.images.title} />
                </div>
                <img className="logo" src={HOST_URL + pageData.images.logo} alt="" />
                <img className='light' src={light} alt="" />
                <img className='coin' src={coin} alt="" />
                <DateHeading dateData={{
                    startGroup: pageData.eventList[0],
                    endGroup: pageData.eventList[pageData.eventList.length - 1]
                }} />
            </>}
        </section>
        <section ref={container} className="index">
            <div className="container">
                <PointTable htmlString={sec[1]} type={"normal"}/>
                <MoblieTable htmlString={sec[2]}/>
                <PointTable htmlString={sec[3]} />
                <TermsConditions htmlString={pageData.terms_and_conditions}/>
            </div>
        </section>
    </main>
    );
};

export default TemplateComponent;